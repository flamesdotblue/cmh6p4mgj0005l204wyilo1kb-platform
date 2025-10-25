import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Home, BarChart3, Landmark, MapPin, Phone, Mail, Instagram, Twitter, MessageCircle, X } from 'lucide-react'
import { useMemo, useState } from 'react'

const icons = [Home, Building2, BarChart3, Landmark]

export default function Sections({ t, lang, projects }) {
  const [activeProject, setActiveProject] = useState(null)

  const serviceCards = useMemo(() => t.services.items.map((s, i) => ({ ...s, Icon: icons[i % icons.length] })), [t])

  return (
    <>
      {/* About */}
      <section id="about" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.about.title}</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-8 mb-4">{t.about.text}</p>
            <p className="text-slate-600 dark:text-slate-300 leading-8">{t.about.team}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1600&auto=format&fit=crop" alt="Our team" className="rounded-xl shadow-lg w-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">{t.services.title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCards.map(({ title, desc, Icon }, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.05 }} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 hover:shadow-md">
              <div className="w-11 h-11 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 grid place-items-center mb-3">
                <Icon size={22} />
              </div>
              <div className="font-semibold mb-1">{title}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 leading-6">{desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">{t.projects.title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <motion.button key={p.id} onClick={() => setActiveProject(p)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: idx * 0.05 }} className="text-left rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 hover:shadow-lg">
              <img src={p.images[0]} alt={p.title[lang]} className="h-44 w-full object-cover" />
              <div className="p-4">
                <div className="font-semibold mb-1">{p.title[lang]}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1"><MapPin size={14} />{p.location[lang]}</div>
                <div className="mt-2 text-emerald-600 dark:text-emerald-400 text-sm">{p.price[lang]}</div>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {activeProject && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/60 grid place-items-center px-4">
              <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-white dark:bg-slate-950">
                <button className={`absolute top-3 ${lang==='ar' ? 'left-3' : 'right-3'} p-2 rounded-full bg-slate-100 dark:bg-slate-800`} onClick={() => setActiveProject(null)} aria-label="close">
                  <X size={18} />
                </button>
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-full">
                    <img src={activeProject.images[0]} alt={activeProject.title[lang]} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{activeProject.title[lang]}</h3>
                    <div className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1 mb-2"><MapPin size={14} />{activeProject.location[lang]}</div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-medium mb-3">{activeProject.price[lang]}</div>
                    <div className="mb-2 font-semibold">{t.projects.features}</div>
                    <ul className="list-disc ps-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                      {activeProject.features[lang].map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                    <a href={`https://wa.me/96899100882?text=${encodeURIComponent((lang==='ar'?'مرحبا، أود حجز زيارة إلى: ':'Hello, I would like to book a visit to: ')+activeProject.title[lang])}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white">
                      <MessageCircle size={18} /> {t.projects.book}
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto px-4 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">{t.contact.title}</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.form onSubmit={(e) => {
            e.preventDefault()
            const form = e.currentTarget
            const name = form.name.value
            const phone = form.phone.value
            const message = form.message.value
            const subject = lang==='ar' ? 'استفسار عبر الموقع' : 'Website Inquiry'
            const body = `${lang==='ar' ? 'الاسم' : 'Name'}: ${name}\n${lang==='ar' ? 'الهاتف' : 'Phone'}: ${phone}\n\n${lang==='ar' ? 'الرسالة' : 'Message'}:\n${message}`
            window.location.href = `mailto:info@cornerom.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
          }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">{t.contact.name}</label>
                <input required name="name" className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm mb-1">{t.contact.phone}</label>
                <input required name="phone" className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm mb-1">{t.contact.message}</label>
              <textarea required name="message" rows="5" className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <button type="submit" className="mt-4 px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white">{t.contact.send}</button>

            <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><Phone size={16}/> 99100882</div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><Mail size={16}/> info@cornerom.com</div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><MapPin size={16}/> {t.contact.address}</div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"><Instagram size={16}/> Instagram</a>
              <a href="https://wa.me/96899100882" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"><MessageCircle size={16}/> WhatsApp</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"><Twitter size={16}/> Twitter</a>
            </div>
          </motion.form>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-xl overflow-hidden min-h-[320px] h-full border border-slate-200 dark:border-slate-800">
            <iframe title="Corner Office Map" src="https://www.google.com/maps?q=Muscat,%20Oman&output=embed" className="w-full h-full" loading="lazy" allowFullScreen />
          </motion.div>
        </div>
      </section>
    </>
  )
}
