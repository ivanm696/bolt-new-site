import { useEffect, useRef, useState } from 'react'
import { startWebContainerLogin } from './webcontainer-auth'

// ---- Icon set (inline SVG, no external deps) ----

type IconProps = { className?: string }

const IconBolt = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
)
const IconGlobe = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)
const IconApp = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="2" width="10" height="20" rx="2" /><path d="M12 18h.01" />
  </svg>
)
const IconDatabase = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" />
  </svg>
)
const IconCloud = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8A7 7 0 1 0 4 14.5" />
  </svg>
)
const IconRocket = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)
const IconGitHub = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.59-4.04-1.59-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.84 0-1.29.47-2.35 1.23-3.18-.12-.3-.53-1.51.12-3.15 0 0 1-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.3-1.53 3.3-1.21 3.3-1.21.65 1.64.24 2.85.12 3.15.77.83 1.23 1.89 1.23 3.18 0 4.54-2.81 5.54-5.49 5.83.43.36.81 1.09.81 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
  </svg>
)
const IconFigma = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 24c2.21 0 4-1.79 4-4v-4H8c-2.21 0-4 1.79-4 4s1.79 4 4 4z" opacity=".6" /><path d="M4 12c0-2.21 1.79-4 4-4h4v8H8c-2.21 0-4-1.79-4-4z" opacity=".4" /><path d="M4 4c0-2.21 1.79-4 4-4h4v8H8C5.79 8 4 6.21 4 4z" opacity=".8" /><path d="M12 0h4c2.21 0 4 1.79 4 4s-1.79 4-4 4h-4V0z" opacity=".6" /><path d="M20 12c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" opacity=".4" />
  </svg>
)
const IconCode = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
)
const IconUsers = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const IconCheck = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const IconArrowRight = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)
const IconMenu = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)
const IconX = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const IconCpu = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="2" x2="9" y2="4" /><line x1="15" y1="2" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="22" /><line x1="15" y1="20" x2="15" y2="22" /><line x1="20" y1="9" x2="22" y2="9" /><line x1="20" y1="14" x2="22" y2="14" /><line x1="2" y1="9" x2="4" y2="9" /><line x1="2" y1="14" x2="4" y2="14" />
  </svg>
)
const IconShield = ({ className = '' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

// ---- Reveal-on-scroll hook ----

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ---- Navbar ----

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#features', label: 'Возможности' },
    { href: '#build', label: 'Что строить' },
    { href: '#cloud', label: 'Bolt Cloud' },
    { href: '#integrations', label: 'Интеграции' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass bg-dark-950/80' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 text-white font-bold text-xl">
            <IconBolt className="w-6 h-6 text-primary-400" />
            <span>Bolt<span className="text-primary-400">.new</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href} className="text-dark-300 hover:text-white transition-colors text-sm font-medium">
                {l.label}
              </a>
            ))}
            <button onClick={startWebContainerLogin}
              className="text-dark-300 hover:text-white transition-colors text-sm font-medium border border-dark-600 hover:border-dark-400 px-3 py-2 rounded-lg">
              Войти через WebContainer
            </button>
            <a href="https://bolt.new" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary-600/30">
              Начать <IconArrowRight className="w-4 h-4" />
            </a>
          </div>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-down">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="block text-dark-300 hover:text-white transition-colors py-2 text-sm font-medium">
                {l.label}
              </a>
            ))}
            <a href="https://bolt.new" target="_blank" rel="noopener noreferrer"
              className="block bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center mt-2">
              Начать строить
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

// ---- Hero ----

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/50 via-transparent to-dark-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              <span className="text-sm text-dark-300">AI-конструктор нового поколения</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight animate-fade-up">
              Опиши идею — <br />
              <span className="text-gradient">получи готовое приложение</span>
            </h1>
            <p className="mt-6 text-lg text-dark-300 max-w-xl animate-fade-up" style={{ animationDelay: '0.15s' }}>
              Bolt.new превращает текстовое описание в работающий веб-сайт, веб-приложение или мобильное приложение. Без установки, без кода, прямо в браузере.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <a href="https://bolt.new" target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary-600/30">
                <IconRocket className="w-5 h-5" /> Начать строить
                <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#features"
                className="flex items-center justify-center gap-2 glass hover:bg-white/10 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all">
                Узнать больше
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 animate-fade-up" style={{ animationDelay: '0.45s' }}>
              {['Без установки', 'Всё в браузере', 'Бесплатный план'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-dark-400">
                  <IconCheck className="w-4 h-4 text-accent-400" /> {t}
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass rounded-2xl p-2 glow">
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/4955393/pexels-photo-4955393.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Код на экране компьютера"
                  className="w-full h-[400px] object-cover"
                  loading="eager"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 animate-float hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
                  <IconBolt className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Build now</div>
                  <div className="text-dark-400 text-xs">Идея → готовое приложение</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Features ----

const features = [
  { icon: IconCpu, title: 'AI-агент на выбор', desc: 'Выбирайте AI-агента, который подходит для вашей задачи. Bolt работает с разными моделями.' },
  { icon: IconDatabase, title: 'Встроенная база данных', desc: 'База данных создаётся автоматически. Управляйте данными, пользователями и функциями прямо в проекте.' },
  { icon: IconCloud, title: 'Хостинг включён', desc: 'Каждый проект получает бесплатный поддомен bolt.host. На платных тарифах — свой домен.' },
  { icon: IconCode, title: 'Вы владеете кодом', desc: 'Код принадлежит вам. Используйте для любых целей, включая коммерческие проекты.' },
  { icon: IconUsers, title: 'Совместная работа', desc: 'Приглашайте коллег, работайте в реальном времени, делитесь интеграциями.' },
  { icon: IconShield, title: 'Безопасность', desc: 'Bolt соответствует стандарту SOC 2 Type II. Ваши данные под защитой.' },
]

function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Что делает <span className="text-gradient">Bolt уникальным</span>
            </h2>
            <p className="mt-4 text-lg text-dark-300">
              Всё необходимое для создания и запуска приложения — в одном месте, без внешних сервисов и настроек.
            </p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <div className="group glass rounded-2xl p-6 h-full hover:bg-white/10 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-900/20">
                <div className="w-12 h-12 bg-primary-600/15 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-600/25 transition-colors">
                  <f.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- What you can build ----

const buildTypes = [
  { icon: IconGlobe, title: 'Веб-сайты', items: ['Лендинги', 'Корпоративные сайты', 'Интернет-магазины', 'Портфолио'], img: 'https://images.pexels.com/photos/14553707/pexels-photo-14553707.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: IconCode, title: 'Веб-приложения', items: ['CRM-системы', 'Доски вакансий', 'SaaS-платформы', 'Системы бронирования'], img: 'https://images.pexels.com/photos/38440159/pexels-photo-38440159.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: IconApp, title: 'Мобильные приложения', items: ['Игры', 'Социальные приложения', 'Планировщики', 'Продуктивность'], img: 'https://images.pexels.com/photos/89955/pexels-photo-89955.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
]

function BuildSection() {
  return (
    <section id="build" className="relative py-24 lg:py-32 bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Что можно <span className="text-gradient">построить</span>
            </h2>
            <p className="mt-4 text-lg text-dark-300">
              От простой лендинг-страницы до полноценного SaaS-продукта — всё по одному описанию.
            </p>
          </div>
        </Reveal>
        <div className="grid lg:grid-cols-3 gap-8">
          {buildTypes.map((b, i) => (
            <Reveal key={b.title} delay={i * 150}>
              <div className="group glass rounded-2xl overflow-hidden h-full hover:bg-white/10 transition-all hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-dark-950/40" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
                      <b.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{b.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {b.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-dark-300 text-sm">
                        <IconCheck className="w-4 h-4 text-accent-400 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Bolt Cloud ----

function CloudSection() {
  const cloudFeatures = [
    { icon: IconDatabase, title: 'Базы данных', desc: 'Автоматическое создание, просмотр и редактирование данных. Пользователи, аутентификация, edge-функции — всё внутри.' },
    { icon: IconCloud, title: 'Хостинг', desc: 'Публикация в один клик на bolt.host. Подключение кастомных доменов на платных тарифах.' },
    { icon: IconGlobe, title: 'Домены', desc: 'Управление доменами прямо в Bolt. Настройки, подключение, мониторинг — без переключения между провайдерами.' },
  ]
  return (
    <section id="cloud" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-600/15 border border-primary-600/30 rounded-full px-4 py-1.5 mb-6">
                <IconCloud className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-primary-300 font-medium">Bolt Cloud</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Всё в <span className="text-gradient">одном месте</span>
              </h2>
              <p className="text-lg text-dark-300 mb-8">
                Вместо управления отдельными сервисами для баз данных, хостинга и доменов, делайте всё внутри Bolt. Это сохраняет фокус на создании продукта, а не настройке инфраструктуры.
              </p>
              <div className="space-y-6">
                {cloudFeatures.map(f => (
                  <div key={f.title} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-primary-600/15 rounded-xl flex items-center justify-center">
                      <f.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                      <p className="text-dark-400 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative">
              <div className="glass rounded-2xl p-2 glow">
                <div className="rounded-xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/39205127/pexels-photo-39205127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Команда за совместной работой"
                    className="w-full h-[420px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 glass rounded-xl px-4 py-3 animate-float hidden sm:block">
                <div className="text-xs text-dark-400">Публикация</div>
                <div className="text-sm text-white font-semibold">В один клик</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ---- Integrations ----

const integrations = [
  { icon: IconGitHub, name: 'GitHub', desc: 'Контроль версий, бэкапы, совместная работа' },
  { icon: IconFigma, name: 'Figma', desc: 'Импорт дизайнов в рабочий проект' },
  { icon: IconApp, name: 'Expo', desc: 'Создание и публикация мобильных приложений' },
  { icon: IconCpu, name: 'MCP-серверы', desc: 'Подключение внешних инструментов и данных' },
]

function Integrations() {
  return (
    <section id="integrations" className="relative py-24 lg:py-32 bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Интеграции с <span className="text-gradient">внешними инструментами</span>
            </h2>
            <p className="mt-4 text-lg text-dark-300">
              Bolt работает с популярными сервисами, чтобы расширить возможности вашего приложения.
            </p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrations.map((it, i) => (
            <Reveal key={it.name} delay={i * 100}>
              <div className="group glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all hover:-translate-y-1">
                <div className="w-14 h-14 mx-auto bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <it.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-1">{it.name}</h3>
                <p className="text-dark-400 text-xs leading-relaxed">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- CTA ----

function CTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 via-dark-950 to-accent-900/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <IconBolt className="w-16 h-16 text-primary-400 mx-auto mb-6 animate-float" />
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Готовы начать?
          </h2>
          <p className="text-lg sm:text-xl text-dark-300 mb-10 max-w-2xl mx-auto">
            Опишите свою идею, нажмите «Build now» — и получите работающее приложение за минуты. Без установки, без кода.
          </p>
          <a href="https://bolt.new" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary-600/40">
            <IconRocket className="w-6 h-6" /> Открыть Bolt.new
            <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="mt-6 text-sm text-dark-400">Бесплатный план · 1 млн токенов в месяц · Без кредитной карты</p>
        </Reveal>
      </div>
    </section>
  )
}

// ---- Footer ----

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <IconBolt className="w-5 h-5 text-primary-400" />
              <span>Bolt<span className="text-primary-400">.new</span></span>
            </div>
            <p className="text-dark-400 text-sm">AI-конструктор сайтов, веб- и мобильных приложений. От идеи до публикации — в браузере.</p>
          </div>
          {[
            { title: 'Продукт', links: ['Возможности', 'Bolt Cloud', 'Интеграции', 'Тарифы'] },
            { title: 'Ресурсы', links: ['Документация', 'QuickStart', 'FAQ', 'Поддержка'] },
            { title: 'Компания', links: ['О проекте', 'Безопасность', 'Контакты'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l}><a href="#" className="text-dark-400 hover:text-white transition-colors text-sm">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-xs">© 2026 Bolt.new — информационный сайт. Создано на основе документации Bolt.</p>
        </div>
      </div>
    </footer>
  )
}

// ---- App ----

export default function App() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      <Hero />
      <Features />
      <BuildSection />
      <CloudSection />
      <Integrations />
      <CTA />
      <Footer />
    </div>
  )
}
