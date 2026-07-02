import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin, Target, Building2, Monitor, Star, Share2,
  TrendingDown, Trophy, CalendarX, Users, Flag, Brain,
  BarChart3, Lock, ChevronDown, Phone, Sparkles, ArrowUpRight,
} from 'lucide-react'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

/* ───────────────────────── data ───────────────────────── */

const painPoints = [
  { icon: TrendingDown, title: 'Inconsistent Leads', desc: 'One month you\'re slammed, the next your calendar has gaps. Without lead generation for cleaning companies that runs 24/7, revenue stays unpredictable.' },
  { icon: Trophy, title: 'Invisible on Google', desc: 'Competitors with worse service outrank you on Google Maps and search. Every day you\'re not on page one, they\'re taking your jobs.' },
  { icon: CalendarX, title: 'Empty Schedule Gaps', desc: 'Idle crews and unbooked time slots are pure lost profit. You need a steady flow of recurring residential and commercial contracts.' },
  { icon: Users, title: 'Referral-Only Growth', desc: 'Word-of-mouth is great — until it isn\'t. Relying only on referrals caps your growth and leaves you exposed when they slow down.' },
]

const services = [
  { icon: MapPin, title: 'Local SEO for Cleaning Business', desc: 'Rank in the Google Map Pack for "house cleaning near me" and city-level searches across your entire service area.' },
  { icon: Target, title: 'Google Ads for Cleaning Companies', desc: 'High-intent PPC campaigns that put you in front of people searching for cleaning services right now — leads in weeks, not months.' },
  { icon: Building2, title: 'Google Business Profile Optimization', desc: 'Google Business Profile optimization for cleaning services: categories, photos, posts and Q&A tuned to win calls straight from Maps.' },
  { icon: Monitor, title: 'Cleaning Company Website Design', desc: 'Fast, mobile-first websites with online booking and quote forms — designed to convert visitors into scheduled jobs.' },
  { icon: Star, title: 'Review & Reputation Management', desc: 'Automated review requests that build a 5-star reputation — the #1 trust signal for homeowners choosing a cleaner.' },
  { icon: Share2, title: 'Social Media Marketing', desc: 'Before/after content and targeted social campaigns that keep your cleaning brand in front of your local market.' },
]

const whyUs = [
  { icon: Flag, title: 'US-Registered LLC', desc: 'Registered in Montana, USA — a real, accountable business partner serving cleaning companies in all 50 states.' },
  { icon: Brain, title: 'Service-Industry Experience', desc: '13+ years marketing local service businesses. We know how cleaning customers search, compare and book.' },
  { icon: BarChart3, title: 'Results, Not Reports', desc: 'We measure success in booked jobs and cost per lead — and you see every number in a live dashboard.' },
  { icon: Lock, title: 'No Long-Term Contracts', desc: 'Month-to-month engagements. We earn your business every 30 days by delivering leads that turn into revenue.' },
]

const steps = [
  { n: '01', title: 'Free Audit', desc: 'We analyze your rankings, website, reviews and competitors in your service area.' },
  { n: '02', title: 'Custom Strategy', desc: 'You get a clear marketing plan with keywords, budget and lead targets — free.' },
  { n: '03', title: 'Launch Campaigns', desc: 'SEO, Google Ads and profile optimization go live, engineered for your market.' },
  { n: '04', title: 'Track & Scale Leads', desc: 'We optimize weekly, cut wasted spend and scale what fills your calendar.' },
]

const stats = [
  { to: 3, suffix: 'x', label: 'Organic traffic growth' },
  { to: 40, suffix: '%', label: 'Lower cost-per-lead' },
  { to: 120, suffix: '+', label: 'Monthly leads generated' },
  { to: 90, suffix: ' days', label: 'To page-one rankings' },
]

const testimonials = [
  { quote: 'Within 60 days our phone started ringing with actual booked jobs, not tire-kickers. We hired two new crews to keep up. Best marketing decision we\'ve made.', name: 'Sarah M.', role: 'Owner, Residential Cleaning Company — Texas' },
  { quote: 'They rebuilt our website and got our Google Business Profile ranking in the Map Pack. Our cost per lead dropped by almost half compared to our old agency.', name: 'David R.', role: 'Commercial Cleaning & Janitorial — Florida' },
  { quote: 'Transparent, responsive and focused on numbers. Every month I know exactly how many leads came in and what each one cost. That\'s all I ever wanted.', name: 'Jennifer K.', role: 'Maid Service Owner — Arizona' },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '$500',
    period: '/month',
    tagline: 'For new cleaning businesses getting found online',
    features: [
      'Google Business Profile optimization',
      'Local SEO for 1 service area',
      'Review management setup',
      'On-page website SEO fixes',
      'Monthly performance report',
    ],
    highlight: false,
  },
  {
    name: 'Basic',
    price: '$700',
    period: '/month',
    tagline: 'For growing companies that want steady leads',
    features: [
      'Everything in Starter',
      'Google Ads campaign management',
      'Landing page optimization',
      'Automated review requests',
      'Local SEO for up to 3 service areas',
      'Bi-weekly performance reports',
    ],
    highlight: false,
  },
  {
    name: 'Advance',
    price: '$1,000',
    period: '/month',
    tagline: 'For established companies ready to dominate their market',
    features: [
      'Everything in Basic',
      'Cleaning company website design',
      'Social media marketing & content',
      'Commercial cleaning ad campaigns',
      'Local SEO for unlimited service areas',
      'Dedicated account manager',
      'Live reporting dashboard',
    ],
    highlight: true,
  },
  {
    name: 'Custom',
    price: 'Your Call',
    period: '',
    tagline: 'Built around your requirements, goals and budget',
    features: [
      'Pick only the services you need',
      'Multi-location & franchise support',
      'Custom ad budget management',
      'Priority support & strategy calls',
      'Flexible scaling as you grow',
    ],
    highlight: false,
  },
]

const faqs = [
  { q: 'How long until my cleaning company sees results?', a: 'Google Ads for cleaning companies can generate leads within the first 1–2 weeks. Local SEO for a cleaning business typically shows meaningful ranking and traffic gains within 60–90 days — and keeps compounding month over month after that.' },
  { q: 'Do you have experience with cleaning businesses specifically?', a: 'Yes. We build campaigns around how homeowners and facility managers actually search — house cleaning, maid service, janitorial and commercial cleaning keywords — paired with landing pages engineered to turn clicks into booked jobs.' },
  { q: 'Do I need a long-term contract?', a: 'No. We work month-to-month. We keep clients by delivering leads and booked jobs, not by locking you into a contract.' },
  { q: 'Do you work with both residential and commercial cleaning companies?', a: 'Absolutely. We run local SEO and Google Ads for house cleaning and maid services, plus account-based commercial cleaning marketing for janitorial companies targeting offices, medical facilities and property managers.' },
  { q: 'What does digital marketing for a cleaning company cost?', a: 'Plans start at $500/month (Starter), with Basic at $700/month and Advance at $1,000/month. Custom plans are built around your exact requirements and budget. Every engagement starts with a free marketing plan, so you know exactly what you\'re investing in before you spend a dollar.' },
  { q: 'Is Abbas Digital Agency a US company?', a: 'Yes — Abbas Digital Agency is a US-registered LLC (Montana) operating since 2012, serving cleaning companies and service businesses across all 50 states.' },
]

/* ───────────────────────── schema ───────────────────────── */

const pageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Abbas Digital Agency — Digital Marketing for Cleaning Companies',
    description: 'Cleaning business marketing agency in the USA. Local SEO for cleaning business, Google Ads for cleaning companies, Google Business Profile optimization for cleaning services, cleaning company website design and lead generation for cleaning companies.',
    url: 'https://abbasdigitalagency.com/cleaningservices',
    foundingDate: '2012',
    areaServed: { '@type': 'Country', name: 'United States' },
    address: { '@type': 'PostalAddress', addressRegion: 'MT', addressCountry: 'US' },
    priceRange: '$$',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
]

/* ───────────────────────── helpers ───────────────────────── */

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.62 },
})

const trackCta = (location) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'cta_click', { cta_location: location, page: 'cleaningservices' })
  }
}

function CtaButton({ href = '#get-plan', location, children, ghost = false }) {
  return (
    <a
      href={href}
      onClick={() => trackCta(location)}
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

  useEffect(() => {
    if (!inView) return
    let raf, start
    const dur = 1500
    const tick = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref} className="bg-gradient-to-r from-brand-pink via-brand-pink-light to-brand-blue-light bg-clip-text text-transparent">
      {val}{suffix}
    </span>
  )
}

/* 3D rotating cube hero visual — brand-themed CSS 3D */
function HeroCube() {
  const faces = ['✨', '📈', '🧹', '📍', '⭐', '📞']
  const transforms = [
    'translateZ(80px)', 'rotateY(90deg) translateZ(80px)', 'rotateY(180deg) translateZ(80px)',
    'rotateY(-90deg) translateZ(80px)', 'rotateX(90deg) translateZ(80px)', 'rotateX(-90deg) translateZ(80px)',
  ]
  return (
    <div className="relative h-[420px] hidden lg:flex items-center justify-center" style={{ perspective: '1100px' }} aria-hidden="true">
      {/* glow orbs */}
      <div className="absolute top-6 left-8 w-28 h-28 rounded-full bg-brand-pink/25 blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-6 w-20 h-20 rounded-full bg-brand-blue-light/30 blur-2xl animate-pulse" style={{ animationDelay: '1.2s' }} />

      {/* spinning cube */}
      <div className="relative w-40 h-40" style={{ transformStyle: 'preserve-3d', animation: 'cs-spin 16s linear infinite' }}>
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

      {/* floating proof cards */}
      {[
        { icon: <Phone size={15} className="text-brand-pink" />, big: '+38 calls', small: 'this week', cls: 'top-4 right-0', delay: '0s' },
        { icon: <MapPin size={15} className="text-brand-blue-light" />, big: '#1 on Maps', small: '"house cleaning near me"', cls: 'bottom-8 left-0', delay: '-2s' },
        { icon: <Star size={15} className="text-yellow-400" />, big: '4.9 rating', small: '217 reviews', cls: 'top-1/2 -right-4', delay: '-4s' },
      ].map((c, i) => (
        <div
          key={i}
          className={`absolute ${c.cls} flex items-center gap-3 rounded-2xl border border-white/10 bg-bg-dark2/85 px-4 py-3 backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.45)]`}
          style={{ animation: 'cs-float 6s ease-in-out infinite', animationDelay: c.delay }}
        >
          <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-white/[0.06]">{c.icon}</span>
          <span>
            <b className="block text-[14px] text-white leading-tight">{c.big}</b>
            <span className="text-[11px] text-white/40">{c.small}</span>
          </span>
        </div>
      ))}

      <style>{`
        @keyframes cs-spin { from { transform: rotateX(-18deg) rotateY(0) } to { transform: rotateX(-18deg) rotateY(360deg) } }
        @keyframes cs-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
      `}</style>
    </div>
  )
}

/* ───────────────────────── page ───────────────────────── */

export default function CleaningServicesPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', business: '', city: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})

  const onChange = e => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' }))
  }

  const onSubmit = e => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.business.trim()) errs.business = 'Required'
    if (!form.city.trim()) errs.city = 'Required'
    if (!form.phone.trim()) errs.phone = 'Required'
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required'
    if (Object.keys(errs).length) { setErrors(errs); return }
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { form: 'cleaning_marketing_plan', page: 'cleaningservices' })
    }
    setSent(true)
    setForm({ name: '', business: '', city: '', phone: '', email: '', message: '' })
  }

  const inputCls = f =>
    `w-full rounded-xl bg-white/[0.03] border ${errors[f] ? 'border-red-500/60' : 'border-white/10'} px-4 py-3.5 text-[14.5px] text-white placeholder-white/30 focus:outline-none focus:border-brand-pink/60 focus:bg-white/[0.05] focus:shadow-[0_0_28px_rgba(232,21,90,0.14)] transition-all duration-300`

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO
        title="Digital Marketing for Cleaning Companies in the USA | Abbas Digital Agency"
        description="Digital marketing for cleaning companies that fills your schedule. Local SEO, Google Ads & lead generation for cleaning businesses across the USA. Get a free marketing plan from a US-registered agency operating since 2012."
        keywords="digital marketing for cleaning companies, cleaning business marketing agency USA, SEO for cleaning services, Google Ads for cleaning companies, local SEO for cleaning business, lead generation for cleaning companies, commercial cleaning marketing, cleaning company website design"
        path="/cleaningservices"
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
              <span className="text-brand-pink text-[11px] tracking-[0.28em] uppercase">For US Cleaning Business Owners</span>
            </motion.div>

            <motion.h1
              {...fade(0.08)}
              className="font-heading font-bold text-white leading-[1.08] mb-6"
              style={{ fontSize: 'clamp(2.3rem, 5vw, 4.2rem)' }}
            >
              Digital Marketing for Cleaning Companies That{' '}
              <span className="bg-gradient-to-r from-brand-pink via-brand-pink-light to-brand-blue-light bg-clip-text text-transparent">
                Fills Your Schedule
              </span>
            </motion.h1>

            <motion.p {...fade(0.16)} className="text-white/50 text-[15.5px] leading-relaxed max-w-xl mb-8">
              We're a cleaning business marketing agency in the USA that turns Google searches into
              booked jobs — with local SEO, Google Ads and websites built to convert homeowners and
              facility managers into paying clients.
            </motion.p>

            {/* trust bar */}
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
              <CtaButton location="hero">Get My Free Marketing Plan</CtaButton>
            </motion.div>
          </div>

          <HeroCube />
        </div>
      </section>

      {/* ── Pain points ── */}
      <section className="py-20 lg:py-28 bg-bg-dark2">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">Sound Familiar?</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            Great Cleaning Crews Lose to{' '}
            <span className="bg-gradient-to-r from-brand-pink to-brand-blue-light bg-clip-text text-transparent">Better-Marketed</span> Competitors
          </motion.h2>
          <motion.p {...fade(0.12)} className="text-white/45 text-[15px] text-center max-w-2xl mx-auto mb-14">
            You deliver spotless results — but if homeowners and facility managers can't find you
            online, they're booking someone else. Here's what holds most cleaning companies back:
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {painPoints.map((p, i) => (
              <motion.div
                key={p.title}
                {...fade(0.08 * i)}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 hover:border-brand-pink/40 hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-brand-pink/10 border border-brand-pink/20">
                  <p.icon size={20} className="text-brand-pink" />
                </div>
                <h3 className="text-white font-semibold text-[16px] mb-2.5">{p.title}</h3>
                <p className="text-white/45 text-[13.5px] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">The Solution</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            Everything Your Cleaning Business Needs to{' '}
            <span className="bg-gradient-to-r from-brand-pink to-brand-blue-light bg-clip-text text-transparent">Get More Clients Online</span>
          </motion.h2>
          <motion.p {...fade(0.12)} className="text-white/45 text-[15px] text-center max-w-2xl mx-auto mb-14">
            A complete growth system — not random tactics. Every service is built around one goal:
            more booked cleaning jobs at a profitable cost per lead.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                {...fade(0.06 * i)}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 hover:border-brand-blue-light/40 hover:bg-white/[0.04] hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-pink/15 to-brand-blue/15 border border-white/10 group-hover:border-brand-pink/30 transition-colors">
                  <s.icon size={20} className="text-brand-pink-light" />
                </div>
                <h3 className="text-white font-semibold text-[16px] mb-2.5">{s.title}</h3>
                <p className="text-white/45 text-[13.5px] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade(0.2)} className="text-center mt-12">
            <CtaButton href="#process" location="services" ghost>See How It Works</CtaButton>
          </motion.div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="py-20 lg:py-28 bg-bg-dark2">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">Why Abbas Digital Agency</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            A Marketing Agency for House Cleaning &amp; Commercial Cleaning Businesses
          </motion.h2>
          <motion.p {...fade(0.12)} className="text-white/45 text-[15px] text-center max-w-2xl mx-auto mb-14">
            Since 2012 we've helped service businesses grow with digital marketing that pays for
            itself. Here's why cleaning company owners choose us:
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((w, i) => (
              <motion.div
                key={w.title}
                {...fade(0.08 * i)}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 hover:border-brand-pink/40 hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-brand-blue/15 border border-brand-blue-light/25">
                  <w.icon size={20} className="text-brand-blue-light" />
                </div>
                <h3 className="text-white font-semibold text-[16px] mb-2.5">{w.title}</h3>
                <p className="text-white/45 text-[13.5px] leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">Our Process</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-16" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            From Audit to a{' '}
            <span className="bg-gradient-to-r from-brand-pink to-brand-blue-light bg-clip-text text-transparent">Full Schedule</span> in 4 Steps
          </motion.h2>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {/* connecting beam */}
            <motion.div
              className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px origin-left bg-gradient-to-r from-brand-pink via-brand-pink-light to-brand-blue-light"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            {steps.map((s, i) => (
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
            The Numbers Cleaning Companies{' '}
            <span className="bg-gradient-to-r from-brand-pink to-brand-blue-light bg-clip-text text-transparent">Care About</span>
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...fade(0.08 * i)} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] py-9 px-4 text-center">
                <div className="font-heading font-bold" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)' }}>
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <p className="text-white/45 text-[13px] mt-1.5">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* before / after case study */}
          <motion.div {...fade(0.1)} className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-white/[0.07]">
            <div className="p-9 bg-red-500/[0.04]">
              <h3 className="text-red-400 text-[12px] tracking-[0.2em] uppercase font-semibold mb-5">Before — Local Cleaning Company</h3>
              <ul className="space-y-3">
                {['Buried on page 3 of Google, invisible in the Map Pack', '8–10 leads per month, almost all from referrals', 'Outdated website with no booking or quote form', '23 reviews and no strategy to earn more'].map(li => (
                  <li key={li} className="flex gap-3 text-white/50 text-[14px] leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-red-400" />{li}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-9 bg-emerald-500/[0.04]">
              <h3 className="text-emerald-400 text-[12px] tracking-[0.2em] uppercase font-semibold mb-5">After 6 Months With Us</h3>
              <ul className="space-y-3">
                {['Top-3 Map Pack for 14 "cleaning service" keywords', '120+ leads per month from SEO + Google Ads combined', 'New conversion-focused site booking jobs while they sleep', '200+ reviews at 4.9 stars — the market leader signal'].map(li => (
                  <li key={li} className="flex gap-3 text-white/50 text-[14px] leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-400" />{li}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div {...fade(0.16)} className="text-center mt-12">
            <CtaButton location="results">Get Similar Results</CtaButton>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">Client Love</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-14" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            Trusted by Service Businesses Across the USA
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} {...fade(0.1 * i)} className="flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 hover:border-brand-pink/30 transition-colors duration-300">
                <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, j) => <Star key={j} size={15} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-white/55 text-[14px] leading-relaxed italic flex-1 mb-6">"{t.quote}"</p>
                <div>
                  <b className="block text-white text-[14.5px]">{t.name}</b>
                  <span className="text-white/35 text-[12.5px]">{t.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing teaser ── */}
      <section className="py-20 lg:py-28 bg-bg-dark2">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase text-center mb-4">Simple Pricing</motion.p>
          <motion.h2 {...fade(0.06)} className="font-heading font-bold text-white text-center leading-tight mb-12" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)' }}>
            Plans Built Around{' '}
            <span className="bg-gradient-to-r from-brand-pink to-brand-blue-light bg-clip-text text-transparent">Your Growth Goals</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
            {pricingPlans.map((p, i) => (
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
                  {p.features.map(f => (
                    <li key={f} className="flex gap-2.5 text-white/50 text-[13px] leading-relaxed">
                      <span className="text-emerald-400 font-bold flex-none">✓</span>{f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#get-plan"
                  onClick={() => trackCta(`pricing_${p.name.toLowerCase()}`)}
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
            Questions Cleaning Business Owners Ask Us
          </motion.h2>

          <div className="space-y-3">
            {faqs.map((f, i) => (
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
            Get a free, no-obligation cleaning business marketing plan — your rankings, your
            competitors, your fastest path to more booked jobs. Delivered within 48 hours.
          </motion.p>

          <motion.div {...fade(0.16)} className="max-w-2xl mx-auto rounded-3xl border border-white/[0.08] bg-bg-dark/85 backdrop-blur-xl p-8 sm:p-11 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            {sent ? (
              <div className="text-center py-10">
                <p className="text-emerald-400 text-lg font-semibold mb-2">✅ Thank you! Your request is in.</p>
                <p className="text-white/45 text-[14px]">We'll deliver your free cleaning business marketing plan within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cs-name" className="block text-white/55 text-[12.5px] font-semibold mb-1.5">Your Name *</label>
                    <input id="cs-name" name="name" type="text" value={form.name} onChange={onChange} placeholder="John Smith" className={inputCls('name')} />
                  </div>
                  <div>
                    <label htmlFor="cs-business" className="block text-white/55 text-[12.5px] font-semibold mb-1.5">Business Name *</label>
                    <input id="cs-business" name="business" type="text" value={form.business} onChange={onChange} placeholder="Sparkle Cleaning Co." className={inputCls('business')} />
                  </div>
                  <div>
                    <label htmlFor="cs-city" className="block text-white/55 text-[12.5px] font-semibold mb-1.5">City / State *</label>
                    <input id="cs-city" name="city" type="text" value={form.city} onChange={onChange} placeholder="Austin, TX" className={inputCls('city')} />
                  </div>
                  <div>
                    <label htmlFor="cs-phone" className="block text-white/55 text-[12.5px] font-semibold mb-1.5">Phone *</label>
                    <input id="cs-phone" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="(555) 123-4567" className={inputCls('phone')} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cs-email" className="block text-white/55 text-[12.5px] font-semibold mb-1.5">Email *</label>
                    <input id="cs-email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@yourcompany.com" className={inputCls('email')} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cs-message" className="block text-white/55 text-[12.5px] font-semibold mb-1.5">Tell us about your cleaning business (optional)</label>
                    <textarea id="cs-message" name="message" rows={4} value={form.message} onChange={onChange} placeholder="Residential or commercial? Current monthly leads? Growth goals?" className={inputCls('message') + ' resize-y'} />
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={() => trackCta('final')}
                  className="mt-7 w-full rounded-full bg-gradient-to-r from-brand-pink via-brand-pink-light to-brand-blue-light px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_32px_rgba(232,21,90,0.35)] hover:shadow-[0_12px_44px_rgba(232,21,90,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get My Free Cleaning Business Marketing Plan
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
