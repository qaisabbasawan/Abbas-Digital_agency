import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const svcList = [
  'Web Development', 'E-Commerce', 'Mobile Apps',
  'AI & Chatbots', 'Digital Marketing', 'Branding & Design',
]

const info = [
  { icon: '✉', label: 'Email',    val: 'info@abbasonline.com' },
  { icon: '📍', label: 'Location', val: 'Islamabad, Pakistan' },
]

export default function Contact() {
  const [form, setForm]     = useState({ name:'', email:'', phone:'', service:'', message:'' })
  const [errors, setErrors] = useState({})
  const [sent, setSent]     = useState(false)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const onChange = e => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name    = 'Required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.service)      e.service = 'Please select'
    if (!form.message.trim()) e.message = 'Required'
    return e
  }

  const onSubmit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSent(true)
    setForm({ name:'', email:'', phone:'', service:'', message:'' })
    setTimeout(() => setSent(false), 6000)
  }

  const inputCls = f =>
    `w-full bg-transparent border-b ${errors[f] ? 'border-red-500/70' : 'border-white/12'} py-3 text-[15px] text-white placeholder-white/25 focus:outline-none focus:border-white/40 transition-colors duration-200`

  return (
    <section id="contact" className="py-28 lg:py-36 bg-bg-dark2 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(232,21,90,0.05),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65 }}
          >
            <p className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3">
              Contact Us
            </p>
            <h2 className="font-bold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
              Let's Work<br />Together
            </h2>
            <p className="text-white/45 text-[15px] leading-relaxed mb-10">
              Ready to grow your business? Drop us a message and we will get back to you within 24 hours.
            </p>

            <div className="space-y-5 mb-10">
              {info.map(it => (
                <div key={it.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-brand-pink text-sm shrink-0">
                    {it.icon}
                  </div>
                  <div>
                    <p className="text-white/35 text-[11px] uppercase tracking-[0.18em] mb-0.5">{it.label}</p>
                    <p className="text-white text-[14px]">{it.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/[0.07]">
              <p className="text-white/30 text-[11px] uppercase tracking-[0.18em] mb-3">Follow Us</p>
              <div className="flex gap-2">
                {['f','in','📸','💬'].map((ic,i) => (
                  <button key={i} className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-white/45 hover:text-white hover:border-white/20 transition-all duration-200 text-xs font-bold">
                    {ic}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-8 sm:p-10"
          >
            <form onSubmit={onSubmit} className="space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div>
                  <input type="text" name="name" placeholder="Full Name *" value={form.name} onChange={onChange} className={inputCls('name')} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input type="email" name="email" placeholder="Email Address *" value={form.email} onChange={onChange} className={inputCls('email')} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <input type="tel" name="phone" placeholder="Phone Number (Optional)" value={form.phone} onChange={onChange} className={inputCls('phone')} />

              <div>
                <select name="service" value={form.service} onChange={onChange}
                  className={`${inputCls('service')} ${!form.service ? 'text-white/25' : ''} bg-transparent`}
                  style={{ background: 'transparent' }}
                >
                  <option value="" className="bg-[#080E2A] text-white/50">Select a Service *</option>
                  {svcList.map(s => <option key={s} value={s} className="bg-[#080E2A] text-white">{s}</option>)}
                </select>
                {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
              </div>

              <div>
                <textarea name="message" placeholder="Tell us about your project *" rows={4} value={form.message} onChange={onChange} className={`${inputCls('message')} resize-none`} />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button type="submit" className="w-full shimmer-btn py-3.5 text-sm tracking-[0.12em] uppercase text-white font-medium hover:opacity-90 active:scale-[0.99] transition-all duration-200">
                Send Message →
              </button>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-green-500/[0.08] border border-green-500/25"
                  >
                    <span className="text-green-400 text-lg">✓</span>
                    <p className="text-green-400 text-sm">Message sent! We will contact you within 24 hours.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
