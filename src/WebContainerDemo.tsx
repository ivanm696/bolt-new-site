import { useState } from 'react'
import { runNodeDemo } from './webcontainer-runner'

export default function WebContainerDemo() {
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRun = async () => {
    setRunning(true)
    setError(null)
    setOutput('')
    try {
      const code = await runNodeDemo(text => setOutput(prev => prev + text))
      setOutput(prev => prev + `\n[процесс завершился с кодом ${code}]`)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setRunning(false)
    }
  }

  return (
    <section className="relative py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-white text-2xl font-bold mb-2">Запуск кода в браузере</h2>
        <p className="text-dark-300 text-sm mb-6">
          Нажмите кнопку: Node.js запустится прямо в этой вкладке через WebContainer.
          При первом открытии страница перезагрузится один раз — так включается нужная изоляция.
        </p>
        <button
          onClick={handleRun}
          disabled={running}
          className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          {running ? 'Запуск…' : 'Запустить Node.js'}
        </button>
        {error && <p className="text-red-400 text-sm mt-4">Ошибка: {error}</p>}
        {output && (
          <pre className="mt-4 bg-dark-950 border border-white/10 rounded-lg p-4 text-dark-200 text-sm font-mono whitespace-pre-wrap">
            {output}
          </pre>
        )}
      </div>
    </section>
  )
}
