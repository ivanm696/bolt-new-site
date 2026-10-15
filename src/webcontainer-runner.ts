import { WebContainer } from '@webcontainer/api'

// One WebContainer per page. boot() may only be called once, so cache the promise.
let containerPromise: Promise<WebContainer> | null = null

export function getContainer(): Promise<WebContainer> {
  if (!containerPromise) {
    // coep must match the header set by public/coi-serviceworker.js (credentialless).
    const boot = WebContainer.boot({ coep: 'credentialless', workdirName: 'demo' })
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('WebContainer не запустился за 30 секунд: проверьте сеть и изоляцию страницы')), 30_000),
    )
    containerPromise = Promise.race([boot, timeout])
    containerPromise.catch(() => { containerPromise = null })
  }
  return containerPromise
}

// Writes a tiny Node script into the container, runs it and streams its output.
export async function runNodeDemo(onOutput: (text: string) => void): Promise<number> {
  const wc = await getContainer()
  await wc.mount({
    'index.js': {
      file: {
        contents: "console.log('Привет из WebContainer! Node', process.version)\n",
      },
    },
  })
  const proc = await wc.spawn('node', ['index.js'])
  proc.output.pipeTo(new WritableStream({ write: chunk => onOutput(chunk) }))
  return proc.exit
}
