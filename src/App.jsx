import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Sections from './components/Sections'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import './fonts.css'

const translations = {
  ar: {
    brand: 'كورنر العقارية',
    brandFull: 'كورنر العقارية | Corner Real Estate',
    nav: { home: 'الرئيسية', about: 'من نحن', services: 'الخدمات', projects: 'المشاريع', contact: 'تواصل معنا' },
    hero: {
      title: 'كورنر العقارية – خبراء في الاستثمار العقاري في سلطنة عمان',
      cta: 'اكتشف مشاريعنا',
      subtitle: 'حلول عقارية متكاملة في مسقط والباطنة والداخلية'
    },
    quickProjects: 'أهم المشاريع',
    about: {
      title: 'من نحن',
      text: 'نحن كورنر العقارية، شركة عمانية رائدة تقدم حلولًا احترافية في الاستثمار وبيع وشراء العقارات. رؤيتنا أن نكون الشريك العقاري الأكثر ثقة، ورسالتنا تقديم قيمة حقيقية عبر استشارات دقيقة وخدمة عملاء متميزة، وأهدافنا بناء علاقات طويلة الأمد وتحقيق أعلى عائد ممكن لعملائنا.',
      team: 'يمتلك فريقنا خبرة واسعة في السوق العماني ويغطي مناطق مسقط، الباطنة، الداخلية، وظفار. نحرص على دراسة السوق وتقديم حلول مبتكرة تلائم تطلعات المستثمرين والأفراد.'
    },
    services: {
      title: 'خدماتنا',
      items: [
        { title: 'بيع وشراء العقارات', desc: 'تسويق وشراء وبيع الشقق والفلل والأراضي بأفضل الأسعار.' },
        { title: 'إدارة الأملاك', desc: 'إدارة شاملة للعقارات لضمان عائد مستقر وصيانة مستمرة.' },
        { title: 'التسويق العقاري', desc: 'حملات تسويقية حديثة مدعومة بالتحليلات والوسائط الرقمية.' },
        { title: 'الاستشارات العقارية', desc: 'دراسات جدوى وتقييمات دقيقة لاتخاذ قرارات استثمارية صائبة.' }
      ]
    },
    projects: {
      title: 'المشاريع',
      details: 'تفاصيل المشروع',
      location: 'الموقع',
      price: 'السعر',
      features: 'المميزات',
      book: 'احجز زيارة'
    },
    contact: {
      title: 'تواصل معنا',
      name: 'الاسم',
      phone: 'الهاتف',
      message: 'الرسالة',
      send: 'إرسال',
      address: 'مسقط، عمان'
    },
    footer: '© 2025 Corner Real Estate – جميع الحقوق محفوظة.'
  },
  en: {
    brand: 'Corner Real Estate',
    brandFull: 'Corner Real Estate | كورنر العقارية',
    nav: { home: 'Home', about: 'About', services: 'Services', projects: 'Projects', contact: 'Contact' },
    hero: {
      title: 'Corner Real Estate – Experts in Real Estate Investment in Oman',
      cta: 'Explore Our Projects',
      subtitle: 'Integrated real estate solutions across Muscat, Al Batinah, and Ad Dakhiliyah'
    },
    quickProjects: 'Featured Projects',
    about: {
      title: 'About Us',
      text: 'We are Corner Real Estate, an Omani company providing professional solutions in real estate investment, buying and selling. Our vision is to be the most trusted real estate partner; our mission is to deliver real value through precise advisory and superior service; our goals are long-term relationships and maximizing clients’ returns.',
      team: 'Our experienced team covers Muscat, Al Batinah, Ad Dakhiliyah, and Dhofar, offering market-driven and innovative solutions for investors and individuals.'
    },
    services: {
      title: 'Our Services',
      items: [
        { title: 'Property Sales & Purchase', desc: 'Marketing, buying and selling apartments, villas, and land at the best prices.' },
        { title: 'Property Management', desc: 'Full property management for stable returns and proactive maintenance.' },
        { title: 'Real Estate Marketing', desc: 'Modern campaigns powered by analytics and digital media.' },
        { title: 'Real Estate Advisory', desc: 'Feasibility studies and accurate valuations for informed decisions.' }
      ]
    },
    projects: {
      title: 'Projects',
      details: 'Project Details',
      location: 'Location',
      price: 'Price',
      features: 'Features',
      book: 'Book a Visit'
    },
    contact: {
      title: 'Contact Us',
      name: 'Name',
      phone: 'Phone',
      message: 'Message',
      send: 'Send',
      address: 'Muscat, Oman'
    },
    footer: '© 2025 Corner Real Estate – All rights reserved.'
  }
}

const sampleProjects = [
  {
    id: 'muscat-royal-residence',
    title: { ar: 'الإقامة الملكية - مسقط', en: 'Royal Residence - Muscat' },
    location: { ar: 'مسقط، القرم', en: 'Qurum, Muscat' },
    price: { ar: 'ابتداءً من 145,000 ر.ع', en: 'From OMR 145,000' },
    features: {
      ar: ['إطلالة بحرية', 'تشطيب فاخر', 'قرب الخدمات'],
      en: ['Sea view', 'Premium finishes', 'Near amenities']
    },
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    id: 'seeb-garden-villas',
    title: { ar: 'فلل حدائق السيب', en: 'Seeb Garden Villas' },
    location: { ar: 'ولاية السيب', en: 'Seeb' },
    price: { ar: 'ابتداءً من 95,000 ر.ع', en: 'From OMR 95,000' },
    features: {
      ar: ['حديقة خاصة', 'موقف مغطى', 'حي هادئ'],
      en: ['Private garden', 'Covered parking', 'Quiet neighborhood']
    },
    images: [
      'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    id: 'nizwa-business-tower',
    title: { ar: 'برج نزوى للأعمال', en: 'Nizwa Business Tower' },
    location: { ar: 'نزوى، الداخلية', en: 'Nizwa, Ad Dakhiliyah' },
    price: { ar: 'مساحات مكتبية مختلفة', en: 'Flexible office spaces' },
    features: {
      ar: ['مواقف واسعة', 'حراسة 24/7', 'موقع استراتيجي'],
      en: ['Ample parking', '24/7 security', 'Strategic location']
    },
    images: [
      'https://images.unsplash.com/photo-1497215728101-495aca0f84c6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1463819146669-e29bffc2a048?q=80&w=1600&auto=format&fit=crop'
    ]
  }
]

export default function App() {
  const [lang, setLang] = useState('ar')
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const storedLang = localStorage.getItem('lang')
    const storedTheme = localStorage.getItem('theme')
    if (storedLang) setLang(storedLang)
    if (storedTheme) {
      const isDark = storedTheme === 'dark'
      setDark(isDark)
      document.documentElement.classList.toggle('dark', isDark)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en'
  }, [lang])

  const t = useMemo(() => translations[lang], [lang])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <div className={`${lang === 'ar' ? 'ar' : 'en'} min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors`}>      
      <Header t={t} lang={lang} setLang={setLang} dark={dark} toggleTheme={toggleTheme} />

      <main id="home" className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1582582429416-b4bd7a03c3ba?q=80&w=2000&auto=format&fit=crop" alt="Luxury property in Oman" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative container mx-auto px-4 py-24 md:py-36">
            <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t.hero.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="text-white/90 text-lg md:text-xl mb-8">
              {t.hero.subtitle}
            </motion.p>
            <motion.a href="#projects" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="inline-block px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg">
              {t.hero.cta}
            </motion.a>
          </div>
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-[120%] h-28 bg-white dark:bg-slate-950 rounded-t-[50%] blur-[1px]" />
        </section>

        {/* Quick projects carousel */}
        <section className="container mx-auto px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">{t.quickProjects}</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x">
            {sampleProjects.map((p) => (
              <a key={p.id} href="#projects" className="min-w-[280px] snap-start bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={p.images[0]} alt={p.title[lang]} className="h-40 w-full object-cover" />
                <div className="p-3">
                  <div className="font-medium mb-1">{p.title[lang]}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">{p.location[lang]}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <Sections t={t} lang={lang} projects={sampleProjects} />
      </main>

      <Footer t={t} />
      <FloatingWhatsApp phone="99100882" lang={lang} />

      <AnimatePresence>
        {/* Light/dark background gradient accent */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.04 }} exit={{ opacity: 0 }} className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent" />
      </AnimatePresence>
    </div>
  )
}
