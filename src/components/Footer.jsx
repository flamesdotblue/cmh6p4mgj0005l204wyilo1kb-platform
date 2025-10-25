export default function Footer({ t }) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-8">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-emerald-500 text-white grid place-items-center font-bold">C</div>
          <div className="text-sm text-slate-600 dark:text-slate-300">{t.brandFull}</div>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{t.footer}</div>
      </div>
    </footer>
  )
}
