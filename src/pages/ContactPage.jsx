import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useAuth } from '../admin/context/AuthContext'

const svcList = [
  'Web Development','E-Commerce','Mobile Apps',
  'AI & Chatbots','Digital Marketing','Branding & Design',
]
const budgets = ['Under $500','$500 – $1,000','$1,000 – $3,000','$3,000 – $10,000','$10,000+']

const fade = (delay=0) => ({
  initial:{ opacity:0, y:24 },
  animate:{ opacity:1, y:0 },
  transition:{ delay, duration:0.62, ease:[0.25,0.46,0.45,0.94] },
})

export default function ContactPage() {
  const { addLead } = useAuth()
  const [form, setForm]   = useState({ name:'', email:'', phone:'', service:'', budget:'', message:'' })
  const [errors, setErr]  = useState({})
  const [sent, setSent]   = useState(false)

  const onChange = e => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErr(p => ({ ...p, [e.target.name]:'' }))
  }
  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name = 'Required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.service) e.service = 'Please select'
    if (!form.message.trim()) e.message = 'Required'
    return e
  }
  const onSubmit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErr(errs); return }
    addLead({ name: form.name, email: form.email, phone: form.phone, service: form.service, budget: form.budget, message: form.message })
    setSent(true)
    setForm({ name:'', email:'', phone:'', service:'', budget:'', message:'' })
    setTimeout(() => setSent(false), 6000)
  }

  const ic = f =>
    `w-full bg-transparent border-b ${errors[f] ? 'border-red-500/70' : 'border-white/12'} py-3 text-[15px] text-white placeholder-white/25 focus:outline-none focus:border-white/35 transition-colors duration-200`

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">

      {/* Page hero */}
      <section className="py-20 lg:py-24 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4">Get In Touch</motion.p>
          <motion.h1 {...fade(0.08)}
            className="font-bold text-white leading-tight mb-5"
            style={{ fontSize:'clamp(3rem,7vw,6rem)' }}
          >
            Let's Talk
          </motion.h1>
          <motion.p {...fade(0.18)} className="text-white/50 text-[15px] max-w-md leading-relaxed">
            Have a project in mind? We would love to hear about it. Fill in the form below and we will get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20">

            {/* Left — info */}
            <motion.div {...fade(0.1)}>
              <div className="space-y-5 mb-10">
                {[
                  { icon:'✉', label:'Email',            val:'mqaisawan@gmail.com' },
                  { icon:'📍', label:'Visit Us',         val:'H 1-A, IVY Street, Banigala, Islamabad, Pakistan' },
                  { icon:'📍', label:'Mailing Address',  val:'1001 S Main St Ste 500, Kalispell, MT 59901, USA' },
                  { icon:'🕐', label:'Response Time',    val:'Within 24 hours' },
                ].map(it => (
                  <div key={it.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-brand-pink text-sm shrink-0">{it.icon}</div>
                    <div>
                      <p className="text-white/30 text-[11px] uppercase tracking-[0.18em] mb-0.5">{it.label}</p>
                      <p className="text-white text-[14px]">{it.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-7 border-t border-white/[0.07] mb-7">
                <p className="text-white/30 text-[11px] uppercase tracking-[0.18em] mb-3">Follow Us</p>
                <div className="flex gap-2">
                  {['f','in','📸','💬'].map((ic,i) => (
                    <button key={i} className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-white/45 hover:text-white hover:border-white/20 transition-all duration-200 text-xs font-bold">
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white/[0.02] border border-white/[0.07] rounded-xl">
                <p className="text-white/30 text-[11px] uppercase tracking-[0.18em] mb-2">Not ready to reach out?</p>
                <p className="text-white/50 text-[14px] leading-relaxed mb-4">
                  Browse our services or portfolio to learn more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/services" className="text-brand-pink text-[13px] hover:underline">View Services →</Link>
                  <Link to="/portfolio" className="text-white/45 text-[13px] hover:text-white transition-colors">See Our Work →</Link>
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div {...fade(0.2)}
              className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-8 sm:p-10"
            >
              <form onSubmit={onSubmit} className="space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div>
                    <input type="text" name="name" placeholder="Full Name *" value={form.name} onChange={onChange} className={ic('name')} />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input type="email" name="email" placeholder="Email Address *" value={form.email} onChange={onChange} className={ic('email')} />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <input type="tel" name="phone" placeholder="Phone (Optional)" value={form.phone} onChange={onChange} className={ic('phone')} />
                  <div>
                    <select name="service" value={form.service} onChange={onChange}
                      className={`${ic('service')} ${!form.service ? 'text-white/25':''}`}
                      style={{ background:'transparent' }}
                    >
                      <option value="" className="bg-[#05091A] text-white/50">Select a Service *</option>
                      {svcList.map(s => <option key={s} value={s} className="bg-[#05091A] text-white">{s}</option>)}
                    </select>
                    {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                  </div>
                </div>

                <select name="budget" value={form.budget} onChange={onChange}
                  className={`${ic('budget')} ${!form.budget ? 'text-white/25':''}`}
                  style={{ background:'transparent' }}
                >
                  <option value="" className="bg-[#05091A] text-white/50">Project Budget (Optional)</option>
                  {budgets.map(b => <option key={b} value={b} className="bg-[#05091A] text-white">{b}</option>)}
                </select>

                <div>
                  <textarea name="message" placeholder="Tell us about your project *" rows={5} value={form.message} onChange={onChange} className={`${ic('message')} resize-none`} />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                <button type="submit" className="w-full shimmer-btn py-3.5 text-sm tracking-[0.12em] uppercase text-white font-medium hover:opacity-90 active:scale-[0.99] transition-all duration-200">
                  Send Message →
                </button>

                <AnimatePresence>
                  {sent && (
                    <motion.div
                      initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-green-500/[0.07] border border-green-500/20"
                    >
                      <span className="text-green-400 text-lg font-bold">✓</span>
                      <div>
                        <p className="text-green-400 text-sm font-medium">Message received!</p>
                        <p className="text-green-400/65 text-xs mt-0.5">We will get back to you within 24 hours.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
