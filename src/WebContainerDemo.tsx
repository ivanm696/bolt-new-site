import { useEffect, useRef, useState } from 'react'
import type { WebContainer } from '@webcontainer/api'
import { DEFAULT_INDEX_JS, getContainer, runCommand, writeProject } from './webcontainer-runner'

type Proc = { kill: () => void }

export default function WebContainerDemo() {
  const [code, setCode] = useState(DEFAULT_INDEX_JS)
  const [terminal, setTerminal] = useState('WebContainer Terminal\n')
  const [busy, setBusy] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const installedRef = useRef(false)
  const serverRef = useRef<Proc | null>(null)
  const wcRef = useRef<WebContainer | null>(null)

  const log = (text: string) => setTerminal(prev => prev + text)

  // Attach to the container once: listen for the dev server's ready event.
  const ensureContainer = async (): Promise<WebContainer> => {
    if (wcRef.current) return wcRef.current
    const wc = await getContainer()
    wc.on('server-ready', (_port, url) => setPreviewUrl(url))
    wcRef.current = wc
    return wc
  }

  const npmInstall = async (wc: WebContainer) => {
    log('\n$ npm install\n')
    const p = await runCommand(wc, 'npm', ['install'], log)
    const code = await p.exit
    log(`\n[npm install завершился с кодом ${code}]\n`)
    if (code !== 0) throw new Error(`npm install завершился с кодом ${code}`)
    installedRef.current = true
  }

  const handleInstall = async () => {
    setBusy(true)
    setError(null)
    try {
      const wc = await ensureContainer()
      await writeProject(wc, code)
      installedRef.current = false
      await npmInstall(wc)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  const handleRun = async () => {
    setBusy(true)
    setError(null)
    try {
      const wc = await ensureContainer()
      serverRef.current?.kill()
      await writeProject(wc, code)
      if (!installedRef.current) await npmInstall(wc)
      log('\n$ npm start\n')
      const p = await runCommand(wc, 'npm', ['start'], log)
      serverRef.current = p
      p.exit.then(c => log(`\n[сервер остановлен, код ${c}]\n`))
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  const handleClear = () => setTerminal('WebContainer Terminal\n')

  useEffect(() => () => serverRef.current?.kill(), [])

  return (
    <section className="relative py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-white text-2xl font-bold mb-2">Запуск кода в браузере</h2>
        <p className="text-dark-300 text-sm mb-6">
          Редактируйте index.js и запускайте Node.js/Express прямо в этой вкладке через WebContainer.
          Первый запуск выполнит npm install (нужен интернет).
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={handleRun} disabled={busy}
            className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            {busy ? 'Выполняется…' : '▶ Запустить'}
          </button>
          <button onClick={handleInstall} disabled={busy}
            className="border border-dark-600 hover:border-dark-400 disabled:opacity-50 text-dark-200 px-4 py-2 rounded-lg text-sm font-medium">
            📦 npm install
          </button>
          <button onClick={handleClear}
            className="border border-dark-600 hover:border-dark-400 text-dark-200 px-4 py-2 rounded-lg text-sm font-medium">
            🧹 Очистить
          </button>
        </div>

        <label className="block text-dark-300 text-sm mb-2">index.js</label>
        <textarea value={code} onChange={e => setCode(e.target.value)} spellCheck={false}
          className="w-full h-48 bg-dark-950 border border-white/10 rounded-lg p-4 text-dark-100 text-sm font-mono" />

        {error && <p className="text-red-400 text-sm mt-3">Ошибка: {error}</p>}

        <pre className="mt-4 bg-dark-950 border border-white/10 rounded-lg p-4 text-dark-200 text-sm font-mono whitespace-pre-wrap max-h-72 overflow-auto">
          {terminal}
        </pre>

        {previewUrl && (
          <div className="mt-4">
            <p className="text-dark-300 text-sm mb-2">Предпросмотр сервера: <a className="underline" href={previewUrl} target="_blank" rel="noreferrer">{previewUrl}</a></p>
            <iframe src={previewUrl} title="preview" className="w-full h-64 rounded-lg border border-white/10 bg-white" />
          </div>
        )}
      </div>
    </section>
  )
}
