import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Clock, Send, ArrowRight, Check, ChevronDown } from 'lucide-react'
import Footer from '../components/Footer'
import ContactScene from '../components/ContactScene'
import RevealText from '../components/anim/RevealText'
import TiltCard from '../components/anim/TiltCard'
import Magnetic from '../components/anim/Magnetic'
import { useAuth } from '../admin/context/AuthContext'
import SEO from '../components/SEO'

const svcList = [
  'Web Development', 'E-Commerce', 'Mobile Apps',
  'AI & Chatbots', 'Digital Marketing', 'Branding & Design',
]
const budgets = ['Under $500', '$500 – $1,000', '$1,000 – $3,000', '$3,000 – $10,000', '$10,000+']

const infoItems = [
  { Icon: Mail,   color: '#E8155A', label: 'Email',           val: 'info@abbasdigitalagency.com' },
  { Icon: MapPin, color: '#2E55E0', label: 'Visit Us',        val: 'H 1-A, IVY Street, Banigala, Islamabad, Pakistan' },
  { Icon: MapPin, color: '#7C3AED', label: 'Mailing Address', val: '1001 S Main St Ste 500, Kalispell, MT 59901, USA' },
  { Icon: Clock,  color: '#0891B2', label: 'Response Time',   val: 'Within 24 hours' },
]

/* Spinning conic energy ring around an icon */
function InfoOrb({ Icon, color }) {
  return (
    <div className="relative shrink-0 w-12 h-12">
      <div
        className="absolute inset-0 rounded-full animate-spin-slow"
        style={{
          background: `conic-gradient(from 0deg, transparent 15%, ${color} 40%, transparent 65%)`,
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
        }}
      />
      <div
        className="absolute inset-[4px] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
        style={{
          background: `radial-gradient(circle at 32% 28%, ${color}55, ${color}10 72%)`,
          boxShadow: `0 0 22px ${color}38`,
        }}
      >
        <Icon size={17} color="#fff" strokeWidth={1.7} />
      </div>
    </div>
  )
}

/* Floating-label text input with gradient focus glow */
function Field({ label, error, textarea = false, ...props }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div>
      <div className="group/field relative">
        <div className="absolute -inset-[1px] rounded-xl opacity-0 group-focus-within/field:opacity-70 transition-opacity duration-400 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #2E55E0, #E8155A)', filter: 'blur(5px)' }} />
        <Tag
          {...props}
          placeholder=" "
          className={`peer relative w-full rounded-xl px-4 ${textarea ? 'pt-6 pb-3 resize-none' : 'pt-5 pb-2'} text-[15px] text-white focus:outline-none transition-colors duration-300`}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${error ? 'rgba(248,113,113,0.55)' : 'rgba(255,255,255,0.1)'}`,
          }}
        />
        <label className={`absolute left-4 text-white/30 pointer-events-none transition-all duration-200
          ${textarea ? 'top-5' : 'top-1/2 -translate-y-1/2'}
          peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:text-brand-pink-light peer-focus:tracking-[0.14em] peer-focus:uppercase
          peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-[0.14em] peer-[:not(:placeholder-shown)]:uppercase
          text-[14px]`}>
          {label}
        </label>
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5 ml-1">{error}</p>}
    </div>
  )
}

/* Styled select with the same glass treatment */
function SelectField({ label, error, value, options, ...props }) {
  return (
    <div>
      <div className="group/field relative">
        <div className="absolute -inset-[1px] rounded-xl opacity-0 group-focus-within/field:opacity-70 transition-opacity duration-400 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #2E55E0, #E8155A)', filter: 'blur(5px)' }} />
        <select
          {...props}
          value={value}
          className={`relative w-full appearance-none rounded-xl px-4 py-3.5 text-[14px] focus:outline-none transition-colors duration-300 ${value ? 'text-white' : 'text-white/30'}`}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${error ? 'rgba(248,113,113,0.55)' : 'rgba(255,255,255,0.1)'}`,
          }}
        >
          <option value="" className="bg-[#080E2A] text-white/50">{label}</option>
          {options.map(o => <option key={o} value={o} className="bg-[#080E2A] text-white">{o}</option>)}
        </select>
        <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5 ml-1">{error}</p>}
    </div>
  )
}

export default function ContactPage() {
  const { addLead } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', message: '' })
  const [errors, setErr] = useState({})
  const [sent, setSent] = useState(false)

  const onChange = e => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErr(p => ({ ...p, [e.target.name]: '' }))
  }
  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
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
    setForm({ name: '', email: '', phone: '', service: '', budget: '', message: '' })
    setTimeout(() => setSent(false), 6000)
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      <SEO
        title="Contact Abbas Digital Agency — Islamabad & Montana USA"
        description="Get in touch with Abbas Digital Agency. Contact our offices in Islamabad, Pakistan or Montana, USA. Free consultation for SEO, web design & digital marketing."
        keywords="contact Abbas Digital Agency, digital marketing agency Islamabad contact, SEO agency Pakistan contact"
        path="/contact"
      />

      {/* ── 3D Hero ── */}
      <section className="relative min-h-[74vh] flex items-center overflow-hidden pt-[72px]">
        <div className="absolute inset-0">
          <ContactScene />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-bg-dark/85 via-bg-dark/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-bg-dark to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(232,21,90,0.08)', border: '1px solid rgba(232,21,90,0.25)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse" />
            <span className="text-brand-pink text-[11px] tracking-[0.28em] uppercase">Get In Touch</span>
          </motion.div>

          <RevealText as="h1" delay={0.15} stagger={0.08}
            className="font-bold text-white leading-[1.04] mb-3"
            style={{ fontSize: 'clamp(3rem,7vw,6rem)' }}>
            Your signal,
          </RevealText>
          <RevealText as="h1" delay={0.35} stagger={0.08} gradient
            className="font-bold leading-[1.04] mb-6"
            style={{ fontSize: 'clamp(3rem,7vw,6rem)' }}>
            our mission
          </RevealText>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}
            className="text-white/45 text-[16px] max-w-md leading-relaxed mb-9"
          >
            Have a project in mind? Send it through — every message reaches a real
            human on our team, and we reply within 24 hours.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Magnetic>
              <a href="#contact-form"
                className="inline-flex items-center gap-2.5 shimmer-btn px-8 py-3.5 rounded-full text-sm tracking-[0.12em] uppercase text-white font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200">
                Start the Conversation <ArrowRight size={15} />
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* ── Main ── */}
      <section id="contact-form" className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute top-32 left-0 w-[460px] h-[460px] rounded-full blur-[150px] pointer-events-none opacity-50" style={{ background: 'rgba(46,85,224,0.08)' }} />
        <div className="absolute bottom-24 right-0 w-[420px] h-[420px] rounded-full blur-[140px] pointer-events-none opacity-50" style={{ background: 'rgba(232,21,90,0.07)' }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16">

            {/* Left — info orbs */}
            <div>
              <div className="space-y-4 mb-8">
                {infoItems.map((it, i) => (
                  <motion.div
                    key={it.label}
                    initial={{ opacity: 0, x: -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:translate-x-1.5"
                      style={{
                        background: 'rgba(8,14,42,0.45)',
                        backdropFilter: 'blur(14px)',
                        WebkitBackdropFilter: 'blur(14px)',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}>
                      <InfoOrb Icon={it.Icon} color={it.color} />
                      <div className="min-w-0">
                        <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-1">{it.label}</p>
                        <p className="text-white text-[14px] leading-snug">{it.val}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Explore card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="relative overflow-hidden p-7 rounded-2xl"
                style={{
                  background: 'rgba(8,14,42,0.5)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[80px] pointer-events-none" style={{ background: 'rgba(232,21,90,0.14)' }} />
                <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2">Not ready to reach out?</p>
                <p className="text-white/50 text-[14px] leading-relaxed mb-5">
                  Browse our services or portfolio to learn more about what we build.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/services"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] text-white transition-all hover:opacity-90"
                    style={{ background: 'rgba(46,85,224,0.22)', border: '1px solid rgba(46,85,224,0.45)' }}>
                    View Services <ArrowRight size={12} />
                  </Link>
                  <Link to="/portfolio"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] text-white/60 hover:text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    See Our Work <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right — holographic form panel */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard max={3} glareColor="rgba(255,255,255,0.06)" glareSize={640}>
                <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10"
                  style={{
                    background: 'rgba(8,14,42,0.55)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow: '0 24px 70px rgba(0,0,0,0.45), 0 0 40px rgba(46,85,224,0.1), inset 0 1px 0 rgba(255,255,255,0.07)',
                  }}>
                  {/* corner glows */}
                  <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full blur-[90px] pointer-events-none" style={{ background: 'rgba(46,85,224,0.16)' }} />
                  <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full blur-[90px] pointer-events-none" style={{ background: 'rgba(232,21,90,0.13)' }} />

                  <div className="relative mb-8">
                    <h2 className="text-white font-bold text-2xl mb-1.5">Tell us about your project</h2>
                    <p className="text-white/35 text-[13px]">Fields marked * are required.</p>
                  </div>

                  <form onSubmit={onSubmit} className="relative space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Full Name *" type="text" name="name" value={form.name} onChange={onChange} error={errors.name} />
                      <Field label="Email Address *" type="email" name="email" value={form.email} onChange={onChange} error={errors.email} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Phone (Optional)" type="tel" name="phone" value={form.phone} onChange={onChange} />
                      <SelectField label="Select a Service *" name="service" value={form.service} onChange={onChange} options={svcList} error={errors.service} />
                    </div>

                    <SelectField label="Project Budget (Optional)" name="budget" value={form.budget} onChange={onChange} options={budgets} />

                    <Field label="Tell us about your project *" textarea rows={5} name="message" value={form.message} onChange={onChange} error={errors.message} />

                    <button type="submit"
                      className="group/btn w-full flex items-center justify-center gap-2.5 shimmer-btn py-4 rounded-xl text-sm tracking-[0.12em] uppercase text-white font-medium hover:opacity-90 active:scale-[0.99] transition-all duration-200">
                      Send Message
                      <Send size={15} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                    </button>
                  </form>

                  {/* Success overlay */}
                  <AnimatePresence>
                    {sent && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-8"
                        style={{ background: 'rgba(5,9,26,0.88)', backdropFilter: 'blur(16px)' }}
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -40 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                          className="relative w-20 h-20 rounded-full flex items-center justify-center mb-6"
                          style={{
                            background: 'radial-gradient(circle at 32% 28%, rgba(34,197,94,0.45), rgba(34,197,94,0.08) 72%)',
                            border: '1px solid rgba(34,197,94,0.5)',
                            boxShadow: '0 0 44px rgba(34,197,94,0.3)',
                          }}
                        >
                          <motion.span
                            className="absolute inset-0 rounded-full"
                            style={{ border: '1px solid rgba(34,197,94,0.5)' }}
                            animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                          />
                          <Check size={34} className="text-green-400" strokeWidth={2.4} />
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                          className="text-white font-bold text-2xl mb-2">
                          Signal received!
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                          className="text-white/45 text-[14px] max-w-xs leading-relaxed">
                          Your message is on its way to our team. We will get back to you within 24 hours.
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
