import { MessageCircle } from 'lucide-react'

export default function FloatingWhatsApp({ phone = '99100882', lang = 'ar' }) {
  const text = lang === 'ar' ? 'مرحبا، أود التحدث مع كورنر العقارية' : 'Hello, I would like to talk to Corner Real Estate'
  return (
    <a href={`https://wa.me/968${phone}?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg">
      <MessageCircle size={18} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
