import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import RevealText from './anim/RevealText'
import { EmailText } from './EmailLink'
import { useAuth } from '../admin/context/AuthContext'

const svcList = [
  'Web Development', 'E-Commerce', 'Mobile Apps',
  'AI & Chatbots', 'Digital Marketing', 'Branding & Design',
]

const info = [
  { Icon: Mail,   label: 'Email',           val: '', email: true, color: '#E8155A' },
  { Icon: MapPin, label: 'Visit Us',        val: 'H 1-A, IVY Street, Banigala, Islamabad, Pakistan', color: '#2E55E0' },
  { Icon: MapPin, label: 'Mailing Address', val: '1001 S Main St Ste 500, Kalispell, MT 59901, USA', color: '#7C3AED' },
]

export default function Contact() {
  const { addLead } = useAuth()
  const [form, setForm]     = useState({ name:'', email:'', phone:'', service:'', message:'' })
  const [errors, setErrors] = useState({})
  const [sent, setSent]     = useState(false)

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
    addLead({ name: form.name, email: form.email, phone: form.phone, service: form.service, message: form.message })
    setSent(true)
    setForm({ name:'', email:'', phone:'', service:'', message:'' })
    setTimeout(() => setSent(false), 6000)
  }

  const inputCls = f =>
    `w-full rounded-xl bg-white/[0.03] border ${errors[f] ? 'border-red-500/60' : 'border-white/10'} px-4 py-3.5 text-[14.5px] text-white placeholder-white/30 focus:outline-none focus:border-brand-pink/60 focus:bg-white/[0.05] focus:shadow-[0_0_28px_rgba(232,21,90,0.14)] transition-all duration-300`

  return (
    <section id="contact" className="py-28 lg:py-36 bg-bg-dark2 relative overflow-hidden">

      {/* Backdrop — dot grid + aurora */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 60% 45%, #000 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 60% 45%, #000 25%, transparent 75%)',
        }}
      />
      <div className="absolute top-0 right-0 w-[460px] h-[460px] bg-brand-pink/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] bg-brand-blue/[0.08] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-20 items-start">

          {/* ── Left — heading + info ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
            >
              Contact Us
            </motion.p>
            <h2
              className="font-bold leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(2.1rem, 4vw, 3.4rem)' }}
            >
              <RevealText as="span" className="text-white inline-block" stagger={0.07}>
                Let's Build
              </RevealText>{' '}
              <RevealText as="span" className="inline-block" gradient delay={0.22} stagger={0.08}>
                Something Great.
              </RevealText>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="text-white/45 text-[15px] leading-relaxed mb-9"
            >
              Ready to grow your business? Drop us a message and we will get back to you within 24 hours.
            </motion.p>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 animate-ping-soft" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-green-400" />
              </span>
              <span className="text-green-400 text-[12px] font-medium tracking-wide">Available for new projects</span>
            </motion.div>

            {/* Info rows */}
            <div className="space-y-3">
              {info.map(({ Icon, label, val, email, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 6 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl cursor-default"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}14`, border: `1px solid ${color}30`, boxShadow: `0 0 18px ${color}1E` }}
                  >
                    <Icon size={17} style={{ color }} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-white/35 text-[10.5px] uppercase tracking-[0.2em] mb-0.5">{label}</p>
                    <p className="text-white text-[13.5px]">{email ? <EmailText /> : val}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right — form with spinning gradient border ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl p-[1.5px] overflow-hidden"
          >
            {/* animated conic border */}
            <div
              className="absolute -inset-[150%] animate-spin-slower pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent 8%, #2E55E0 22%, transparent 38%, transparent 55%, #E8155A 72%, transparent 88%)',
              }}
            />

            <div
              className="relative rounded-3xl p-8 sm:p-10"
              style={{
                background: 'linear-gradient(165deg, #0B1232, #080E2A 60%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input type="text" name="name" placeholder="Full Name *" value={form.name} onChange={onChange} className={inputCls('name')} />
                    {errors.name && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input type="email" name="email" placeholder="Email Address *" value={form.email} onChange={onChange} className={inputCls('email')} />
                    {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email}</p>}
                  </div>
                </div>

                <input type="tel" name="phone" placeholder="Phone Number (Optional)" value={form.phone} onChange={onChange} className={inputCls('phone')} />

                <div>
                  <select
                    name="service" value={form.service} onChange={onChange}
                    className={`${inputCls('service')} ${!form.service ? 'text-white/30' : ''} appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-[#080E2A] text-white/50">Select a Service *</option>
                    {svcList.map(s => <option key={s} value={s} className="bg-[#080E2A] text-white">{s}</option>)}
                  </select>
                  {errors.service && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.service}</p>}
                </div>

                <div>
                  <textarea name="message" placeholder="Tell us about your project *" rows={4} value={form.message} onChange={onChange} className={`${inputCls('message')} resize-none`} />
                  {errors.message && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  data-hc-target="contact"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="group w-full shimmer-btn rounded-xl py-4 text-sm tracking-[0.14em] uppercase text-white font-medium flex items-center justify-center gap-2.5"
                >
                  Send Message
                  <Send size={15} strokeWidth={1.9} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </motion.button>

                <AnimatePresence>
                  {sent && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-green-500/[0.08] border border-green-500/25"
                    >
                      <motion.span
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                        className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-sm shrink-0"
                      >
                        ✓
                      </motion.span>
                      <p className="text-green-400 text-sm">Message sent! We will contact you within 24 hours.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
