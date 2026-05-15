import { useRef } from 'react'
import {
  motion,
  useMotionValue, useTransform, useSpring,
  useInView,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Globe, ShoppingCart, Smartphone, Bot, TrendingUp, Palette,
  ArrowRight, Zap, Users, Award, Clock,
} from 'lucide-react'
import Footer from '../components/Footer'

/* ── Service data ── */
const services = [
  {
    n: '01', Icon: Globe,        title: 'Web Development',   color: '#2E55E0', glow: 'rgba(46,85,224,0.28)', slug: 'web-development',
    desc: 'Custom WordPress, WooCommerce and React/Next.js websites built for performance, SEO and conversions.',
    includes: ['WordPress', 'WooCommerce', 'React / Next.js', 'Landing Pages', 'SEO Structure', 'Speed Optimisation'],
  },
  {
    n: '02', Icon: ShoppingCart, title: 'E-Commerce',         color: '#E8155A', glow: 'rgba(232,21,90,0.28)', slug: 'ecommerce',
    desc: 'End-to-end online stores on Shopify, WooCommerce, Amazon and eBay — from setup to conversion optimisation.',
    includes: ['Shopify', 'WooCommerce', 'Amazon / eBay', 'Payment Gateways', 'Product Catalogue', 'CRO'],
  },
  {
    n: '03', Icon: Smartphone,   title: 'Mobile Apps',        color: '#7C3AED', glow: 'rgba(124,58,237,0.28)', slug: 'mobile-apps',
    desc: 'Native iOS and Android apps from concept to App Store with clean code and ongoing post-launch support.',
    includes: ['iOS Development', 'Android', 'React Native', 'UI/UX Design', 'App Store Launch', 'Maintenance'],
  },
  {
    n: '04', Icon: Bot,          title: 'AI & Chatbots',      color: '#0891B2', glow: 'rgba(8,145,178,0.28)', slug: 'ai-chatbots',
    desc: 'WhatsApp and Facebook chatbots, ChatGPT integrations and workflow automations saving hours every day.',
    includes: ['WhatsApp Bot', 'Messenger', 'ChatGPT API', 'Lead Generation', 'Automation', 'CRM Integration'],
  },
  {
    n: '05', Icon: TrendingUp,   title: 'Digital Marketing',  color: '#059669', glow: 'rgba(5,150,105,0.28)', slug: 'digital-marketing',
    desc: 'SEO, Google Ads, social media and email campaigns designed to drive qualified traffic and real ROI.',
    includes: ['SEO', 'Google Ads', 'Facebook Ads', 'Social Media', 'Email Marketing', 'Analytics'],
  },
  {
    n: '06', Icon: Palette,      title: 'Branding & Design',  color: '#D97706', glow: 'rgba(217,119,6,0.28)', slug: 'branding-design',
    desc: 'Logo design, full brand identity, UI/UX and marketing materials that make your business unforgettable.',
    includes: ['Logo Design', 'Brand Identity', 'UI/UX', 'Social Graphics', 'Print', 'Brand Guidelines'],
  },
]

/* ── 3-D tilt card ── */
function TiltCard({ children, className, style }) {
  const ref = useRef(null)
  const mx  = useMotionValue(0)
  const my  = useMotionValue(0)
  const cfg = { stiffness: 220, damping: 28 }
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), cfg)
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), cfg)
  const sc   = useSpring(1, cfg)

  const move  = (e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width  - 0.5)
    my.set((e.clientY - r.top)  / r.height - 0.5)
  }
  const enter = () => sc.set(1.03)
  const leave = () => { mx.set(0); my.set(0); sc.set(1) }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rotX, rotateY: rotY, scale: sc, transformPerspective: 900, ...style }}
      onMouseMove={move} onMouseEnter={enter} onMouseLeave={leave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Animated number (counts up when in view) ── */
function AnimatedStat({ value, label, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <motion.div
        className="font-bold text-white leading-none mb-1"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
      >
        {value}
      </motion.div>
      <div className="text-white/35 text-[11px] uppercase tracking-[0.2em]">{label}</div>
    </motion.div>
  )
}

export default function ServicesPage() {
  const heroRef    = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <div className="min-h-screen bg-bg-dark overflow-hidden pt-[72px]">

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="relative py-24 lg:py-36 overflow-hidden" ref={heroRef}>

        {/* Ambient blobs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-blue/[0.07] blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-pink/[0.06] blur-[110px] pointer-events-none" />

        {/* Floating service icons in background */}
        {services.map((s, i) => (
          <motion.div
            key={s.n}
            className="absolute hidden lg:flex items-center justify-center rounded-2xl opacity-[0.07] pointer-events-none"
            style={{
              width: 64, height: 64,
              background: `${s.color}20`,
              border: `1px solid ${s.color}40`,
              top:  `${15 + i * 13}%`,
              left: i % 2 === 0 ? `${4 + i * 2}%` : undefined,
              right: i % 2 !== 0 ? `${4 + i * 2}%` : undefined,
            }}
            animate={{ y: [0, -18, 0], rotate: [0, 4, -4, 0] }}
            transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            <s.Icon size={26} style={{ color: s.color }} />
          </motion.div>
        ))}

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-brand-pink text-[11px] tracking-[0.32em] uppercase mb-6"
          >
            What We Do
          </motion.p>

          <div className="overflow-hidden mb-6">
            {['Six Services.', 'One Digital Vision.'].map((line, i) => (
              <motion.h1
                key={line}
                initial={{ y: 80, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.14, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="font-bold leading-[0.95] tracking-tight"
                style={{
                  fontSize: 'clamp(3rem, 7.5vw, 7rem)',
                  color: i === 0 ? 'white' : undefined,
                  backgroundImage: i === 1 ? 'linear-gradient(135deg,#2E55E0,#E8155A)' : undefined,
                  WebkitBackgroundClip: i === 1 ? 'text' : undefined,
                  backgroundClip: i === 1 ? 'text' : undefined,
                  WebkitTextFillColor: i === 1 ? 'transparent' : undefined,
                  transform: 'translateZ(0)',
                }}
              >
                {line}
              </motion.h1>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white/45 text-[16px] leading-relaxed max-w-lg mb-12"
          >
            From your first pixel to your thousandth customer — we build, grow and scale
            digital experiences that deliver real business results.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden max-w-2xl"
          >
            {[
              { v: '500+', l: 'Projects' },
              { v: '10+',  l: 'Years' },
              { v: '50+',  l: 'Clients' },
              { v: '6',    l: 'Services' },
            ].map((s, i) => (
              <div key={s.l} className="bg-white/[0.03] px-6 py-5 text-center">
                <div className="font-bold text-white text-2xl tracking-tight">{s.v}</div>
                <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════ */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(46,85,224,0.06), transparent)' }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <motion.div
                key={svc.n}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={`/services/${svc.slug}`} className="block h-full">
              <TiltCard className="group relative h-full rounded-2xl overflow-hidden cursor-pointer select-none" style={{ transformStyle: 'preserve-3d' }}>

                  {/* Card background */}
                  <div
                    className="absolute inset-0 rounded-2xl transition-opacity duration-500"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  />

                  {/* Top glow — stronger on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-40 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-t-2xl"
                    style={{ background: `radial-gradient(ellipse at 50% -10%, ${svc.glow}, transparent 70%)` }}
                  />

                  {/* Top accent border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: `linear-gradient(90deg, ${svc.color}, ${svc.color}60, transparent)` }}
                  />

                  {/* Subtle grid texture */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                      backgroundImage: `linear-gradient(${svc.color}50 1px, transparent 1px), linear-gradient(90deg, ${svc.color}50 1px, transparent 1px)`,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Card content */}
                  <div className="relative z-10 p-7 flex flex-col h-full" style={{ transformStyle: 'preserve-3d' }}>

                    {/* Header row */}
                    <div className="flex items-start justify-between mb-6">
                      {/* Icon circle */}
                      <motion.div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{
                          background: `${svc.color}18`,
                          border: `1px solid ${svc.color}35`,
                          boxShadow: `0 0 24px ${svc.color}20`,
                          transform: 'translateZ(20px)',
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svc.Icon size={24} style={{ color: svc.color }} strokeWidth={1.6} />
                      </motion.div>

                      {/* Number */}
                      <span
                        className="font-bold text-[32px] leading-none tabular-nums"
                        style={{ color: `${svc.color}20` }}
                      >
                        {svc.n}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="font-bold text-white text-xl mb-3 leading-snug"
                      style={{ transform: 'translateZ(12px)' }}
                    >
                      {svc.title}
                    </h2>

                    {/* Description */}
                    <p className="text-white/45 text-[13.5px] leading-relaxed mb-5 flex-1">
                      {svc.desc}
                    </p>

                    {/* Include tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {svc.includes.map(tag => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-[10.5px] tracking-wide font-medium"
                          style={{
                            background: `${svc.color}14`,
                            border: `1px solid ${svc.color}30`,
                            color: svc.color,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <span
                      className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase font-medium"
                      style={{ color: svc.color }}
                    >
                      Learn More
                      <ArrowRight size={13} strokeWidth={2} />
                    </span>
                  </div>
                </TiltCard>
              </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.013)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-pink/[0.05] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3"
            >
              Why Abbas
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.65 }}
              className="font-bold text-white"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}
            >
              Built to Deliver Results
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { Icon: Clock, color: '#2E55E0', title: '10+ Years',       desc: 'A decade of delivering digital solutions that actually work.' },
              { Icon: Users, color: '#E8155A', title: '50+ Clients',     desc: 'Trusted by businesses across Pakistan, UAE and beyond.' },
              { Icon: Zap,   color: '#7C3AED', title: 'End-to-End',      desc: 'From strategy to launch to growth — all under one roof.' },
              { Icon: Award, color: '#D97706', title: 'Proven Results',  desc: '500+ projects delivered with real measurable impact.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="group relative p-6 rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${item.color}20, transparent 70%)` }}
                />
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}35` }}
                >
                  <item.Icon size={20} style={{ color: item.color }} strokeWidth={1.7} />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/45 text-[13px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(46,85,224,0.08) 0%, rgba(232,21,90,0.06) 100%)' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-brand-blue/[0.07] blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
          >
            Let's Build Together
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.65 }}
            className="font-bold text-white leading-tight mb-5"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            Ready to Grow<br />Your Business?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.6 }}
            className="text-white/45 text-[15px] mb-10 max-w-md mx-auto leading-relaxed"
          >
            Free consultation, no commitment. Tell us about your project and we'll get back within 24 hours.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.24, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/contact"
              className="shimmer-btn inline-flex items-center gap-2.5 px-8 py-3.5 text-sm tracking-wide text-white font-medium hover:opacity-90 transition-opacity"
            >
              Get a Free Quote
              <ArrowRight size={15} strokeWidth={2} />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm tracking-wide text-white/60 border border-white/15 rounded-sm hover:text-white hover:border-white/35 transition-all duration-250"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
