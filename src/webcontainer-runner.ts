import { WebContainer } from '@webcontainer/api'

// One WebContainer per page. boot() may only be called once, so cache the promise.
let containerPromise: Promise<WebContainer> | null = null

export function getContainer(): Promise<WebContainer> {
  if (!containerPromise) {
    // coep must match the header set by public/coi-serviceworker.js (credentialless).
    const boot = WebContainer.boot({ coep: 'credentialless', workdirName: 'project' })
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('WebContainer не запустился за 30 секунд: проверьте сеть и изоляцию страницы')), 30_000),
    )
    containerPromise = Promise.race([boot, timeout])
    containerPromise.catch(() => { containerPromise = null })
  }
  return containerPromise
}

export const DEFAULT_INDEX_JS = `import express from 'express';
const app = express();
app.get('/', (req, res) => res.json({ hello: 'from WebContainer!' }));
app.listen(3000, () => console.log('Server on :3000'));
`

const PACKAGE_JSON = JSON.stringify(
  {
    name: 'demo',
    type: 'module',
    private: true,
    scripts: { start: 'node index.js' },
    dependencies: { express: '^4.19.2' },
  },
  null,
  2,
)

// Writes index.js and package.json into the container's working directory.
export async function writeProject(wc: WebContainer, indexJs: string): Promise<void> {
  await wc.mount({
    'index.js': { file: { contents: indexJs } },
    'package.json': { file: { contents: PACKAGE_JSON } },
  })
}

// Runs a command and streams its output (stdout and stderr) to onOutput.
export async function runCommand(
  wc: WebContainer,
  cmd: string,
  args: string[],
  onOutput: (text: string) => void,
): Promise<{ exit: Promise<number>; kill: () => void }> {
  const proc = await wc.spawn(cmd, args)
  proc.output.pipeTo(new WritableStream({ write: chunk => onOutput(chunk) }))
  return { exit: proc.exit, kill: () => proc.kill() }
}
