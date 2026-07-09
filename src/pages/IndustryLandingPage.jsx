import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin, Target, Monitor, Sparkles, RefreshCw, Star,
  TrendingDown, DollarSign, Search, Clock,
  Flag, Brain, BarChart3, Lock,
  Package, Globe, MessageCircle,
  ChevronDown, Phone, ArrowUpRight,
} from 'lucide-react'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { useAuth } from '../admin/context/AuthContext'

/* Positional icon sets — every vertical's content follows the same rhythm
   (foundational → paid → platform → showcase → automation → trust for
   services; specialization → ownership → transparency → track-record for
   differentiators), so one fixed icon-per-position mapping stays visually
   consistent across all 14 pages without hand-picking 80+ icons. */
const PAIN_ICONS = [TrendingDown, DollarSign, Search, Clock]
const SERVICE_ICONS = [MapPin, Target, Monitor, Sparkles, RefreshCw, Star]
const WHY_ICONS = [Flag, Brain, BarChart3, Lock]
const EXTRA_ICONS = [Monitor, Package, Globe, BarChart3, MessageCircle]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.62 },
})

function trackCta(location, page) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'cta_click', { cta_location: location, page })
  }
}

function CtaButton({ href = '#get-plan', location, page, children, ghost = false }) {
  return (
    <a
      href={href}
      onClick={() => trackCta(location, page)}
      className={
        ghost
          ? 'inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-[14.5px] font-semibold text-white hover:border-brand-pink/60 hover:shadow-[0_0_32px_rgba(232,21,90,0.18)] transition-all duration-300'
          : 'group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-pink via-brand-pink-light to-brand-blue-light px-8 py-4 text-[14.5px] font-semibold text-white shadow-[0_8px_32px_rgba(232,21,90,0.35)] hover:shadow-[0_12px_44px_rgba(232,21,90,0.5)] hover:-translate-y-0.5 transition-all duration-300'
      }
    >
      {children}
      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}

/* Animated counter — counts up when scrolled into view */
function Counter({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)
  const isFloat = Math.abs(to % 1) > 0.001

  useEffect(() => {
    if (!inView) return
    let raf, start
    const dur = 1500
    const tick = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      const eased = to * (1 - Math.pow(1 - p, 3))
      setVal(isFloat ? Math.round(eased * 10) / 10 : Math.round(eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, isFloat])

  return (
    <span ref={ref} className="bg-gradient-to-r from-brand-pink via-brand-pink-light to-brand-blue-light bg-clip-text text-transparent">
      {isFloat ? val.toFixed(1) : val}{suffix}
    </span>
  )
}

/* 3D rotating cube hero visual — brand-themed CSS 3D, one face swapped per
   industry so the hero visual still feels distinct per vertical. */
function HeroCube({ icon, proof }) {
  const faces = ['✨', '📈', icon, '📍', '⭐', '📞']
  const transforms = [
    'translateZ(80px)', 'rotateY(90deg) translateZ(80px)', 'rotateY(180deg) translateZ(80px)',
    'rotateY(-90deg) translateZ(80px)', 'rotateX(90deg) translateZ(80px)', 'rotateX(-90deg) translateZ(80px)',
  ]
  return (
    <div className="relative h-[420px] hidden lg:flex items-center justify-center" style={{ perspective: '1100px' }} aria-hidden="true">
      <div className="absolute top-6 left-8 w-28 h-28 rounded-full bg-brand-pink/25 blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-6 w-20 h-20 rounded-full bg-brand-blue-light/30 blur-2xl animate-pulse" style={{ animationDelay: '1.2s' }} />

      <div className="relative w-40 h-40" style={{ transformStyle: 'preserve-3d', animation: 'il-spin 16s linear infinite' }}>
        {faces.map((f, i) => (
          <div
            key={i}
            className="absolute inset-0 grid place-items-center rounded-2xl border border-brand-pink/30 text-4xl backdrop-blur-sm"
            style={{
              transform: transforms[i],
              background: 'linear-gradient(135deg, rgba(232,21,90,0.12), rgba(46,85,224,0.12))',
              boxShadow: 'inset 0 0 40px rgba(232,21,90,0.08)',
            }}
          >
            {f}
          </div>
        ))}
      </div>

      {[
        { icon: <Phone size={15} className="text-brand-pink" />, big: proof[0].big, small: proof[0].small, cls: 'top-4 right-0', delay: '0s' },
        { icon: <MapPin size={15} className="text-brand-blue-light" />, big: proof[1].big, small: proof[1].small, cls: 'bottom-8 left-0', delay: '-2s' },
        { icon: <Star size={15} className="text-yellow-400" />, big: '4.9 rating', small: '100+ reviews', cls: 'top-1/2 -right-4', delay: '-4s' },
      ].map((c, i) => (
        <div
          key={i}
          className={`absolute ${c.cls} flex items-center gap-3 rounded-2xl border border-white/10 bg-bg-dark2/85 px-4 py-3 backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.45)]`}
          style={{ animation: 'il-float 6s ease-in-out infinite', animationDelay: c.delay }}
        >
          <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-white/[0.06]">{c.icon}</span>
          <span>
            <b className="block text-[14px] text-white leading-tight">{c.big}</b>
            <span className="text-[11px] text-white/40">{c.small}</span>
          </span>
        </div>
      ))}

      <style>{`
        @keyframes il-spin { from { transform: rotateX(-18deg) rotateY(0) } to { transform: rotateX(-18deg) rotateY(360deg) } }
        @keyframes il-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
      `}</style>
    </div>
  )
}

const PROCESS_STEPS = [
  { n: '01', title: 'Free Audit', desc: 'We analyze your rankings, website, reviews and competitors in your market.' },
  { n: '02', title: 'Custom Strategy', desc: 'You get a clear marketing plan with keywords, budget and lead targets — free.' },
  { n: '03', title: 'Launch Campaigns', desc: 'SEO, ads and every channel in your plan go live, engineered for your market.' },
  { n: '04', title: 'Track & Scale Leads', desc: 'We optimize weekly, cut wasted spend and scale what fills your pipeline.' },
]

export default function IndustryLandingPage({ data }) {
  const { addLead } = useAuth()
  const [openFaq, setOpenFaq] = useState(null)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', business: '', city: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((p) => ({ ...p, [e.target.name]: '' }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.business.trim()) errs.business = 'Required'
    if (!form.city.trim()) errs.city = 'Required'
    if (!form.phone.trim()) errs.phone = 'Required'
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required'
    if (Object.keys(errs).length) { setErrors(errs); return }
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { form: `${data.slug}_marketing_plan`, page: data.routeSlug })
    }
    addLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: `${data.name} Marketing Plan`,
      message: `Business: ${form.business}\nCity: ${form.city}\n\n${form.message || ''}`.trim(),
    })
    setSent(true)
    setForm({ name: '', business: '', city: '', phone: '', email: '', message: '' })
  }

  const inputCls = (f) =>
    `w-full rounded-xl bg-white/[0.03] border ${errors[f] ? 'border-red-500/60' : 'border-white/10'} px-4 py-3.5 text-[14.5px] text-white placeholder-white/30 focus:outline-none focus:border-brand-pink/60 focus:bg-white/[0.05] focus:shadow-[0_0_28px_rgba(232,21,90,0.14)] transition-all duration-300`

  const pageSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: `Abbas Digital Agency — Digital Marketing for ${data.name}`,
      description: data.metaDesc,
      url: `https://abbasdigitalagency.com/${data.routeSlug}`,
      foundingDate: '2012',
      areaServed: { '@type': 'Country', name: 'United States' },
      address: { '@type': 'PostalAddress', addressRegion: 'MT', addressCountry: 'US' },
      priceRange: '$$',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  const proof = [
    { big: `+${Math.round(data.stats[0].to)}${data.stats[0].suffix}`, small: data.stats[0].label },
    { big: '#1 on Google', small: `"${data.keywords[0]}"` },
  ]

  const beforeBullets = data.painPoints.map((p) => p.title)
  const afterBullets = data.stats.map((s) => `${s.to}${s.suffix} ${s.label}`)

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO
        title={`${data.metaTitle} | Abbas Digital Agency`}
        description={data.metaDesc}
        keywords={data.keywords.join(', ')}
        path={`/${data.routeSlug}`}
        schema={pageSchema}
      />

      {/* ── Hero ── */}
      <section className="relative py-20 lg:py-28 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-brand-blue/[0.1] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 -left-24 w-[420px] h-[420px] bg-brand-pink/[0.08] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 items-center">
          <div>
            <motion.div {...fade(0)} className="flex items-center gap-2 mb-4">
              <Sparkles size={14} className="text-brand-pink" />
              <span className="text-brand-pink text-[11px] tracking-[0.28em] uppercase">{data.badge}</span>
            </motion.div>

            <motion.h1
              {...fade(0.08)}
              className="font-heading font-bold text-white leading-[1.08] mb-6"
              style={{ fontSize: 'clamp(2.3rem, 5vw, 4.2rem)' }}
            >
              {data.h1Pre}
              {data.h1Highlight && (
                <span className="bg-gradient-to-r from-brand-pink via-brand-pink-light to-brand-blue-light bg-clip-text text-transparent">
                  {data.h1Highlight}
                </span>
              )}
            </motion.h1>

            <motion.p {...fade(0.16)} className="text-white/50 text-[15.5px] leading-relaxed max-w-xl mb-8">
              {data.sub}
            </motion.p>

            <motion.div {...fade(0.24)} className="flex flex-wrap gap-3 mb-9">
              {[['Since 2012', 'in business'], ['500+', 'projects completed'], ['US-registered', 'LLC (Montana)']].map(([b, s]) => (
                <div key={b} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <strong className="text-white font-semibold">{b}</strong>
                  <span className="text-white/45">{s}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...fade(0.32)}>
              <CtaButton location="hero" page={data.routeSlug}>Get My Free Marketing Plan</CtaButton>
            </motion.div>
          </div>

          <HeroCube icon={data.icon} proof={proof} />
        </div>
      </section>

      {/* ── Pain points ── */}
      <section className="py-20 lg:py-28 bg-bg-dark2">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">Sound Familiar?</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            Great {data.name} Businesses Lose to{' '}
            <span className="bg-gradient-to-r from-brand-pink to-brand-blue-light bg-clip-text text-transparent">Better-Marketed</span> Competitors
          </motion.h2>
          <motion.p {...fade(0.12)} className="text-white/45 text-[15px] text-center max-w-2xl mx-auto mb-14">
            You deliver great work — but if the right people can't find you online, they're going
            to a competitor. Here's what holds most {data.name} businesses back:
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.painPoints.map((p, i) => {
              const Icon = PAIN_ICONS[i % PAIN_ICONS.length]
              return (
                <motion.div
                  key={p.title}
                  {...fade(0.08 * i)}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 hover:border-brand-pink/40 hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-brand-pink/10 border border-brand-pink/20">
                    <Icon size={20} className="text-brand-pink" />
                  </div>
                  <h3 className="text-white font-semibold text-[16px] mb-2.5">{p.title}</h3>
                  <p className="text-white/45 text-[13.5px] leading-relaxed">{p.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">The Solution</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            Everything Your {data.name} Business Needs to{' '}
            <span className="bg-gradient-to-r from-brand-pink to-brand-blue-light bg-clip-text text-transparent">Get More Clients Online</span>
          </motion.h2>
          <motion.p {...fade(0.12)} className="text-white/45 text-[15px] text-center max-w-2xl mx-auto mb-14">
            A complete growth system — not random tactics. Every service is built around one goal:
            more booked business at a profitable cost per lead.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.services.map((s, i) => {
              const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length]
              return (
                <motion.div
                  key={s.title}
                  {...fade(0.06 * i)}
                  className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 hover:border-brand-blue-light/40 hover:bg-white/[0.04] hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-pink/15 to-brand-blue/15 border border-white/10 group-hover:border-brand-pink/30 transition-colors">
                    <Icon size={20} className="text-brand-pink-light" />
                  </div>
                  <h3 className="text-white font-semibold text-[16px] mb-2.5">{s.title}</h3>
                  <p className="text-white/45 text-[13.5px] leading-relaxed">{s.desc}</p>
                </motion.div>
              )
            })}
          </div>

          <motion.div {...fade(0.2)} className="text-center mt-12">
            <CtaButton href="#process" location="services" page={data.routeSlug} ghost>See How It Works</CtaButton>
          </motion.div>
        </div>
      </section>

      {/* ── Extra section (POS for restaurants, LMS for schools) ── */}
      {data.extra && (
        <section className="py-20 lg:py-28 bg-bg-dark2">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">{data.extra.title}</motion.p>
            <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
              {data.extra.title}
            </motion.h2>
            <motion.p {...fade(0.12)} className="text-white/45 text-[15px] text-center max-w-2xl mx-auto mb-14">
              {data.extra.subtitle}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.extra.features.map((f, i) => {
                const Icon = EXTRA_ICONS[i % EXTRA_ICONS.length]
                return (
                  <motion.div
                    key={f.title}
                    {...fade(0.08 * i)}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 hover:border-brand-pink/40 hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-brand-blue/15 border border-brand-blue-light/25">
                      <Icon size={20} className="text-brand-blue-light" />
                    </div>
                    <h3 className="text-white font-semibold text-[16px] mb-2.5">{f.title}</h3>
                    <p className="text-white/45 text-[13.5px] leading-relaxed">{f.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Why us ── */}
      <section className={`py-20 lg:py-28 ${data.extra ? '' : 'bg-bg-dark2'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">Why Abbas Digital Agency</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            A Marketing Agency Built for {data.name} Businesses
          </motion.h2>
          <motion.p {...fade(0.12)} className="text-white/45 text-[15px] text-center max-w-2xl mx-auto mb-14">
            Since 2012 we've helped businesses grow with digital marketing that pays for itself.
            Here's why {data.name} business owners choose us:
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.whyUs.map((w, i) => {
              const Icon = WHY_ICONS[i % WHY_ICONS.length]
              return (
                <motion.div
                  key={w.title}
                  {...fade(0.08 * i)}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 hover:border-brand-pink/40 hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-brand-blue/15 border border-brand-blue-light/25">
                    <Icon size={20} className="text-brand-blue-light" />
                  </div>
                  <h3 className="text-white font-semibold text-[16px] mb-2.5">{w.title}</h3>
                  <p className="text-white/45 text-[13.5px] leading-relaxed">{w.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" className={`py-20 lg:py-28 ${data.extra ? 'bg-bg-dark2' : ''}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">Our Process</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-16" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            From Audit to a{' '}
            <span className="bg-gradient-to-r from-brand-pink to-brand-blue-light bg-clip-text text-transparent">Full Pipeline</span> in 4 Steps
          </motion.h2>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            <motion.div
              className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px origin-left bg-gradient-to-r from-brand-pink via-brand-pink-light to-brand-blue-light"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            {PROCESS_STEPS.map((s, i) => (
              <motion.div key={s.n} {...fade(0.12 * i)} className="text-center relative">
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full border-2 border-brand-pink/50 bg-bg-dark text-brand-pink font-bold shadow-[0_0_24px_rgba(232,21,90,0.25)] relative z-10">
                  {s.n}
                </div>
                <h3 className="text-white font-semibold text-[16px] mb-2">{s.title}</h3>
                <p className="text-white/45 text-[13.5px] leading-relaxed max-w-[240px] mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="py-20 lg:py-28 bg-bg-dark2">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">Real Results</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-14" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            The Numbers {data.name} Owners{' '}
            <span className="bg-gradient-to-r from-brand-pink to-brand-blue-light bg-clip-text text-transparent">Care About</span>
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {data.stats.map((s, i) => (
              <motion.div key={s.label} {...fade(0.08 * i)} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] py-9 px-4 text-center">
                <div className="font-heading font-bold" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)' }}>
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <p className="text-white/45 text-[13px] mt-1.5">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade(0.1)} className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-white/[0.07]">
            <div className="p-9 bg-red-500/[0.04]">
              <h3 className="text-red-400 text-[12px] tracking-[0.2em] uppercase font-semibold mb-5">Before — Typical {data.name} Business</h3>
              <ul className="space-y-3">
                {beforeBullets.map((li) => (
                  <li key={li} className="flex gap-3 text-white/50 text-[14px] leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-red-400" />{li}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-9 bg-emerald-500/[0.04]">
              <h3 className="text-emerald-400 text-[12px] tracking-[0.2em] uppercase font-semibold mb-5">After Working With Us</h3>
              <ul className="space-y-3">
                {afterBullets.map((li) => (
                  <li key={li} className="flex gap-3 text-white/50 text-[14px] leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-400" />{li}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div {...fade(0.16)} className="text-center mt-12">
            <CtaButton location="results" page={data.routeSlug}>Get Similar Results</CtaButton>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">Client Love</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-14" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            Trusted by {data.name} Businesses Across the USA
          </motion.h2>

          <motion.div {...fade(0.1)} className="flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-9 hover:border-brand-pink/30 transition-colors duration-300">
            <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, j) => <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />)}
            </div>
            <p className="text-white/55 text-[15px] leading-relaxed italic flex-1 mb-6">"{data.testimonial.quote}"</p>
            <div>
              <b className="block text-white text-[14.5px]">{data.testimonial.name}</b>
              <span className="text-white/35 text-[12.5px]">{data.testimonial.role}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 lg:py-28 bg-bg-dark2">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">Simple Pricing</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-12" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            Plans Built Around{' '}
            <span className="bg-gradient-to-r from-brand-pink to-brand-blue-light bg-clip-text text-transparent">Your Growth Goals</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
            {data.pricingPlans.map((p, i) => (
              <motion.div
                key={p.name}
                {...fade(0.08 * i)}
                className={`relative flex flex-col rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-2 ${
                  p.highlight
                    ? 'border-brand-pink/50 bg-gradient-to-b from-brand-pink/[0.09] to-brand-blue/[0.07] shadow-[0_20px_60px_rgba(232,21,90,0.16)]'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-brand-pink/30 hover:shadow-[0_20px_60px_rgba(232,21,90,0.1)]'
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-pink to-brand-blue-light px-4 py-1 text-[10.5px] font-bold tracking-[0.14em] uppercase text-white shadow-[0_6px_20px_rgba(232,21,90,0.4)]">
                    Most Popular
                  </span>
                )}

                <h3 className="text-white font-heading font-bold text-[19px] mb-1">{p.name}</h3>
                <p className="text-white/40 text-[12.5px] leading-snug mb-5 min-h-[34px]">{p.tagline}</p>

                <div className="mb-6">
                  <span className={`font-heading font-bold text-[2.1rem] leading-none ${
                    p.highlight
                      ? 'bg-gradient-to-r from-brand-pink via-brand-pink-light to-brand-blue-light bg-clip-text text-transparent'
                      : 'text-white'
                  }`}>
                    {p.price}
                  </span>
                  {p.period && <span className="text-white/40 text-[13.5px] font-medium">{p.period}</span>}
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-white/50 text-[13px] leading-relaxed">
                      <span className="text-emerald-400 font-bold flex-none">✓</span>{f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#get-plan"
                  onClick={() => trackCta(`pricing_${p.name.toLowerCase()}`, data.routeSlug)}
                  className={`block rounded-full px-6 py-3 text-center text-[13.5px] font-semibold transition-all duration-300 ${
                    p.highlight
                      ? 'bg-gradient-to-r from-brand-pink via-brand-pink-light to-brand-blue-light text-white shadow-[0_8px_28px_rgba(232,21,90,0.35)] hover:shadow-[0_12px_40px_rgba(232,21,90,0.5)]'
                      : 'border border-white/15 text-white hover:border-brand-pink/60 hover:shadow-[0_0_28px_rgba(232,21,90,0.16)]'
                  }`}
                >
                  {p.name === 'Custom' ? 'Request a Custom Quote' : 'Get Started'}
                </a>
              </motion.div>
            ))}
          </div>

          <motion.p {...fade(0.2)} className="text-center text-white/30 text-[12.5px] mt-10">
            All plans are month-to-month with no long-term contracts — and every engagement starts
            with a free audit &amp; marketing plan before you pay.
          </motion.p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">FAQ</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-12" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            Questions {data.name} Business Owners Ask Us
          </motion.h2>

          <div className="space-y-3">
            {data.faq.map((f, i) => (
              <motion.div
                key={f.q}
                {...fade(0.04 * i)}
                className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${openFaq === i ? 'border-brand-pink/40 bg-white/[0.03]' : 'border-white/[0.07] bg-white/[0.02]'}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-white text-[15px] font-semibold"
                >
                  {f.q}
                  <ChevronDown size={16} className={`flex-none text-brand-pink transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid transition-all duration-400 ${openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`} style={{ transitionDuration: '400ms' }}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-white/45 text-[14px] leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA / lead form ── */}
      <section id="get-plan" className="relative py-20 lg:py-28 bg-bg-dark2 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-blue/[0.1] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-brand-pink/[0.07] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">Limited Onboarding Slots Each Month</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3rem)' }}>
            Your Competitors Are Booking{' '}
            <span className="bg-gradient-to-r from-brand-pink via-brand-pink-light to-brand-blue-light bg-clip-text text-transparent">Your Customers</span> Right Now
          </motion.h2>
          <motion.p {...fade(0.12)} className="text-white/45 text-[15px] text-center max-w-2xl mx-auto mb-12">
            Get a free, no-obligation {data.name} marketing plan — your rankings, your
            competitors, your fastest path to more booked business. Delivered within 48 hours.
          </motion.p>

          <motion.div {...fade(0.16)} className="max-w-2xl mx-auto rounded-3xl border border-white/[0.08] bg-bg-dark/85 backdrop-blur-xl p-8 sm:p-11 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            {sent ? (
              <div className="text-center py-10">
                <p className="text-emerald-400 text-lg font-semibold mb-2">✅ Thank you! Your request is in.</p>
                <p className="text-white/45 text-[14px]">We'll deliver your free {data.name} marketing plan within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="il-name" className="block text-white/55 text-[12.5px] font-semibold mb-1.5">Your Name *</label>
                    <input id="il-name" name="name" type="text" value={form.name} onChange={onChange} placeholder="John Smith" className={inputCls('name')} />
                  </div>
                  <div>
                    <label htmlFor="il-business" className="block text-white/55 text-[12.5px] font-semibold mb-1.5">Business Name *</label>
                    <input id="il-business" name="business" type="text" value={form.business} onChange={onChange} placeholder="Your Company LLC" className={inputCls('business')} />
                  </div>
                  <div>
                    <label htmlFor="il-city" className="block text-white/55 text-[12.5px] font-semibold mb-1.5">City / State *</label>
                    <input id="il-city" name="city" type="text" value={form.city} onChange={onChange} placeholder="Austin, TX" className={inputCls('city')} />
                  </div>
                  <div>
                    <label htmlFor="il-phone" className="block text-white/55 text-[12.5px] font-semibold mb-1.5">Phone *</label>
                    <input id="il-phone" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="(555) 123-4567" className={inputCls('phone')} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="il-email" className="block text-white/55 text-[12.5px] font-semibold mb-1.5">Email *</label>
                    <input id="il-email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@yourcompany.com" className={inputCls('email')} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="il-message" className="block text-white/55 text-[12.5px] font-semibold mb-1.5">Tell us about your business (optional)</label>
                    <textarea id="il-message" name="message" rows={4} value={form.message} onChange={onChange} placeholder="Current monthly leads? Growth goals?" className={inputCls('message') + ' resize-y'} />
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={() => trackCta('final', data.routeSlug)}
                  className="mt-7 w-full rounded-full bg-gradient-to-r from-brand-pink via-brand-pink-light to-brand-blue-light px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_32px_rgba(232,21,90,0.35)] hover:shadow-[0_12px_44px_rgba(232,21,90,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get My Free {data.name} Marketing Plan
                </button>
                <p className="text-center text-white/30 text-[12px] mt-4">🔒 No spam, no obligation. Your info stays private.</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
