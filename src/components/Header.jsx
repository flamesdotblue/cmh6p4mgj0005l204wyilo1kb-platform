import { Moon, Sun, Globe } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Header({ t, lang, setLang, dark, toggleTheme }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onResize = () => setOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact }
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 dark:bg-slate-950/60 border-b border-slate-200/60 dark:border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <div className="h-9 w-9 rounded-lg bg-emerald-500 text-white grid place-items-center font-bold">C</div>
          <div className="leading-tight">
            <div className="font-semibold">{t.brand}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Corner Real Estate</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-sm text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button aria-label="language" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">
            <Globe size={16} />
            <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
          </button>
          <button aria-label="theme" onClick={toggleTheme} className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="md:hidden p-2 rounded-md bg-slate-100 dark:bg-slate-800" onClick={() => setOpen((v) => !v)}>
            <span className="block w-5 h-0.5 bg-slate-700 dark:bg-slate-200 mb-1" />
            <span className="block w-5 h-0.5 bg-slate-700 dark:bg-slate-200 mb-1" />
            <span className="block w-5 h-0.5 bg-slate-700 dark:bg-slate-200" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} className="text-sm text-slate-700 dark:text-slate-200">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
