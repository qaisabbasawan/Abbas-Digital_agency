import { useRef } from 'react'
import SEO from '../components/SEO'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Globe, ShoppingCart, Smartphone, Bot, TrendingUp, Palette,
  ArrowRight, ArrowUpRight, Zap, Users, Award, Clock,
} from 'lucide-react'
import Footer from '../components/Footer'
import ServicesScene from '../components/ServicesScene'
import RevealText from '../components/anim/RevealText'
import TiltCard from '../components/anim/TiltCard'
import Magnetic from '../components/anim/Magnetic'
import useCountUp from '../hooks/useCountUp'

/* ── Service data ── */
const services = [
  {
    n: '01', Icon: Globe,        title: 'Web Development',   color: '#2E55E0', slug: 'web-development',
    desc: 'Custom WordPress, WooCommerce and React/Next.js websites built for performance, SEO and conversions.',
    includes: ['WordPress', 'WooCommerce', 'React / Next.js', 'Landing Pages', 'SEO Structure', 'Speed Optimisation'],
  },
  {
    n: '02', Icon: ShoppingCart, title: 'E-Commerce',         color: '#E8155A', slug: 'ecommerce',
    desc: 'End-to-end online stores on Shopify, WooCommerce, Amazon and eBay — from setup to conversion optimisation.',
    includes: ['Shopify', 'WooCommerce', 'Amazon / eBay', 'Payment Gateways', 'Product Catalogue', 'CRO'],
  },
  {
    n: '03', Icon: Smartphone,   title: 'Mobile Apps',        color: '#7C3AED', slug: 'mobile-apps',
    desc: 'Native iOS and Android apps from concept to App Store with clean code and ongoing post-launch support.',
    includes: ['iOS Development', 'Android', 'React Native', 'UI/UX Design', 'App Store Launch', 'Maintenance'],
  },
  {
    n: '04', Icon: Bot,          title: 'AI & Chatbots',      color: '#0891B2', slug: 'ai-chatbots',
    desc: 'WhatsApp and Facebook chatbots, ChatGPT integrations and workflow automations saving hours every day.',
    includes: ['WhatsApp Bot', 'Messenger', 'ChatGPT API', 'Lead Generation', 'Automation', 'CRM Integration'],
  },
  {
    n: '05', Icon: TrendingUp,   title: 'Digital Marketing',  color: '#059669', slug: 'digital-marketing',
    desc: 'SEO, Google Ads, social media and email campaigns designed to drive qualified traffic and real ROI.',
    includes: ['SEO', 'Google Ads', 'Facebook Ads', 'Social Media', 'Email Marketing', 'Analytics'],
  },
  {
    n: '06', Icon: Palette,      title: 'Branding & Design',  color: '#D97706', slug: 'branding-design',
    desc: 'Logo design, full brand identity, UI/UX and marketing materials that make your business unforgettable.',
    includes: ['Logo Design', 'Brand Identity', 'UI/UX', 'Social Graphics', 'Print', 'Brand Guidelines'],
  },
]

/* ── Spinning energy ring icon orb ── */
function IconOrb({ Icon, color, size = 60, iconSize = 22 }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full animate-spin-slow"
        style={{
          background: `conic-gradient(from 0deg, transparent 15%, ${color} 40%, transparent 65%)`,
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
        }}
      />
      <div
        className="absolute inset-[5px] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
        style={{
          background: `radial-gradient(circle at 32% 28%, ${color}66, ${color}14 72%)`,
          boxShadow: `0 0 26px ${color}40`,
        }}
      >
        <Icon size={iconSize} color="#fff" strokeWidth={1.7} />
      </div>
    </div>
  )
}

/* ── Hero stat with count-up ── */
function HeroStat({ value, suffix, label, color, i }) {
  const { count, ref } = useCountUp(value, 1800)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
      className="bg-white/[0.03] px-6 py-5 text-center"
    >
      <div className="font-bold text-white text-2xl tracking-tight">
        {count}<span style={{ color }}>{suffix}</span>
      </div>
      <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-1">{label}</div>
    </motion.div>
  )
}

export default function ServicesPage() {
  const heroRef    = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <div className="min-h-screen bg-bg-dark overflow-hidden pt-[72px]">
      <SEO
        title="Digital Marketing Services Pakistan | Abbas Digital Agency"
        description="SEO, web design, social media marketing, PPC & branding services for businesses in Pakistan & USA. US-registered agency. Get a free quote today."
        keywords="digital marketing services Pakistan, SEO services Pakistan, web design company Pakistan, social media marketing Pakistan, PPC advertising Pakistan, branding agency Pakistan"
        path="/services"
      />

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="relative pt-20 pb-24 lg:pt-24 lg:pb-32 overflow-hidden min-h-[82vh]" ref={heroRef}>

        {/* ── 3D atom scene: six electron services orbiting one nucleus ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ServicesScene />
        </div>

        {/* Text-protection gradient (left) + bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: 'linear-gradient(100deg, rgba(5,9,26,0.88) 35%, rgba(5,9,26,0.45) 62%, rgba(5,9,26,0.05) 100%)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-[1]"
          style={{ background: 'linear-gradient(to top, #05091A, transparent)' }}
        />

        {/* Ambient blobs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-blue/[0.07] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-pink/[0.05] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-brand-pink text-[11px] tracking-[0.32em] uppercase mb-6"
          >
            What We Do
          </motion.p>

          <h1 className="font-bold leading-[1.0] tracking-tight mb-7" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>
            <RevealText as="span" className="text-white block" stagger={0.09}>
              Six Services.
            </RevealText>
            <RevealText as="span" className="block" gradient delay={0.3} stagger={0.08}>
              One Digital Vision.
            </RevealText>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-white/45 text-[16px] leading-relaxed max-w-lg mb-12"
          >
            From your first pixel to your thousandth customer — we build, grow and scale
            digital experiences that deliver real business results.
          </motion.p>

          {/* Stats row — counts up */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden max-w-2xl">
            <HeroStat value={500} suffix="+" label="Projects" color="#2E55E0" i={0} />
            <HeroStat value={10}  suffix="+" label="Years"    color="#E8155A" i={1} />
            <HeroStat value={50}  suffix="+" label="Clients"  color="#7C3AED" i={2} />
            <HeroStat value={6}   suffix=""  label="Services" color="#059669" i={3} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════ */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(46,85,224,0.06), transparent)' }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* perspective stage — cards stand up from the floor in 3D */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: 1600 }}>
            {services.map((svc, i) => (
              <motion.div
                key={svc.n}
                initial={{ opacity: 0, y: 110, rotateX: -32, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: (i % 3) * 0.14, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 100%' }}
                className="h-full"
              >
                {/* idle levitation — each card breathes on its own rhythm */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5 + i * 0.55, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
                  className="h-full"
                >
                <TiltCard max={8} glareColor={`${svc.color}26`}>
                  <Link
                    to={`/services/${svc.slug}`}
                    className="group relative flex flex-col h-full p-7 rounded-3xl overflow-hidden"
                    style={{
                      background: `linear-gradient(165deg, ${svc.color}16 0%, transparent 45%), linear-gradient(#0A1130, #0A1130)`,
                      border: `1px solid ${svc.color}30`,
                    }}
                  >
                    {/* hover bloom */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: `radial-gradient(120% 60% at 50% 0%, ${svc.color}24, transparent 65%)` }}
                    />
                    {/* accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)` }}
                    />
                    {/* faint grid texture */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-[0.03]"
                      style={{
                        backgroundImage: `linear-gradient(${svc.color}50 1px, transparent 1px), linear-gradient(90deg, ${svc.color}50 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                      }}
                    />

                    {/* Header — orb + ghost number */}
                    <div className="relative flex items-start justify-between mb-7">
                      <IconOrb Icon={svc.Icon} color={svc.color} />
                      <span
                        className="font-bold leading-none select-none transition-transform duration-500 group-hover:scale-110"
                        style={{
                          fontSize: 56,
                          color: 'transparent',
                          WebkitTextStroke: `1.2px ${svc.color}45`,
                        }}
                      >
                        {svc.n}
                      </span>
                    </div>

                    <h2 className="font-bold text-white text-[21px] mb-3 leading-snug">{svc.title}</h2>
                    <p className="text-white/45 text-[13.5px] leading-relaxed mb-6 flex-1">{svc.desc}</p>

                    {/* Include tags — staggered pop */}
                    <div className="flex flex-wrap gap-1.5 mb-7">
                      {svc.includes.map((tag, j) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.7 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ delay: 0.25 + j * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="px-2.5 py-1 rounded-full text-[10.5px] tracking-wide font-medium"
                          style={{
                            background: `${svc.color}14`,
                            border: `1px solid ${svc.color}30`,
                            color: svc.color,
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* CTA */}
                    <span
                      className="inline-flex items-center gap-2 text-[11.5px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 group-hover:gap-3.5"
                      style={{ color: svc.color }}
                    >
                      Explore Service
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-300 group-hover:rotate-45"
                        style={{ border: `1px solid ${svc.color}55`, background: `${svc.color}14` }}
                      >
                        <ArrowUpRight size={13} strokeWidth={2} />
                      </span>
                    </span>
                  </Link>
                </TiltCard>
                </motion.div>
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
              className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
            >
              Why Abbas
            </motion.p>
            <h2 className="font-bold leading-[1.05]" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}>
              <RevealText as="span" className="text-white inline-block" stagger={0.07}>
                Built to Deliver
              </RevealText>{' '}
              <RevealText as="span" className="inline-block" gradient delay={0.25} stagger={0.1}>
                Results.
              </RevealText>
            </h2>
          </div>

          {/* perspective stage — cards swing in from the sides */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ perspective: 1600 }}>
            {[
              { Icon: Clock, color: '#2E55E0', title: '10+ Years',       desc: 'A decade of delivering digital solutions that actually work.' },
              { Icon: Users, color: '#E8155A', title: '50+ Clients',     desc: 'Trusted by businesses across Pakistan, UAE and beyond.' },
              { Icon: Zap,   color: '#7C3AED', title: 'End-to-End',      desc: 'From strategy to launch to growth — all under one roof.' },
              { Icon: Award, color: '#D97706', title: 'Proven Results',  desc: '500+ projects delivered with real measurable impact.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  x: i < 2 ? -90 : 90,
                  rotateY: i < 2 ? -38 : 38,
                  scale: 0.9,
                }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: Math.abs(i - 1.5) * 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className="h-full"
              >
                {/* idle hologram float */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 4.5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  className="h-full"
                >
                <TiltCard max={7} glareColor={`${item.color}22`}>
                  <div
                    className="group relative p-6 rounded-2xl overflow-hidden h-full"
                    style={{
                      background: `linear-gradient(150deg, ${item.color}10, transparent 45%), rgba(255,255,255,0.02)`,
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${item.color}20, transparent 70%)` }}
                    />
                    <div className="mb-5">
                      <IconOrb Icon={item.Icon} color={item.color} size={52} iconSize={19} />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                    <p className="text-white/45 text-[13px] leading-relaxed">{item.desc}</p>
                  </div>
                </TiltCard>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(46,85,224,0.08) 0%, rgba(232,21,90,0.06) 100%)' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-brand-blue/[0.07] blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10" style={{ perspective: 1400 }}>

          {/* Floating geometry around the panel */}
          <motion.div
            aria-hidden
            className="absolute -top-12 -left-4 lg:-left-14 w-11 h-11 rounded-xl border pointer-events-none"
            style={{ borderColor: 'rgba(46,85,224,0.45)', boxShadow: '0 0 22px rgba(46,85,224,0.25)' }}
            animate={{ y: [0, -16, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-8 -right-2 lg:-right-12 w-8 h-8 rounded-full border pointer-events-none"
            style={{ borderColor: 'rgba(232,21,90,0.5)', boxShadow: '0 0 20px rgba(232,21,90,0.3)' }}
            animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute top-1/3 -right-6 lg:-right-20 w-6 h-6 border pointer-events-none rotate-45"
            style={{ borderColor: 'rgba(124,58,237,0.5)', boxShadow: '0 0 18px rgba(124,58,237,0.3)' }}
            animate={{ y: [0, -12, 0], rotate: [45, 225, 405] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
          />

          {/* 3D hologram panel — flips up, tilts toward cursor, spinning border */}
          <motion.div
            initial={{ opacity: 0, y: 90, rotateX: -22, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 100%' }}
          >
            <TiltCard max={4} glareColor="rgba(255,255,255,0.06)">
              <div className="relative rounded-[30px] p-[1.5px] overflow-hidden">
                {/* spinning conic border */}
                <div
                  className="absolute -inset-[150%] animate-spin-slower pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 8%, #2E55E0 22%, transparent 38%, transparent 55%, #E8155A 72%, transparent 88%)',
                  }}
                />
                <div
                  className="relative rounded-[30px] px-6 sm:px-12 py-14 lg:py-16 text-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(165deg, #0B1232, #080E2A 60%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                  }}
                >
                  {/* inner glow + dot grid */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[200px] bg-brand-pink/[0.08] blur-[90px] rounded-full pointer-events-none" />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                      maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, #000 30%, transparent 78%)',
                      WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, #000 30%, transparent 78%)',
                    }}
                  />

                  <div className="relative">
                    <motion.p
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                      className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
                    >
                      Let's Build Together
                    </motion.p>
                    <h2 className="font-bold leading-[1.06] mb-5" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
                      <RevealText as="span" className="text-white block" stagger={0.07}>
                        Ready to Grow
                      </RevealText>
                      <RevealText as="span" className="block" gradient delay={0.28} stagger={0.09}>
                        Your Business?
                      </RevealText>
                    </h2>
                    <motion.p
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-white/45 text-[15px] mb-10 max-w-md mx-auto leading-relaxed"
                    >
                      Free consultation, no commitment. Tell us about your project and we'll get back within 24 hours.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                      <Magnetic>
                        <Link
                          to="/contact"
                          className="shimmer-btn inline-flex items-center gap-2.5 px-8 py-3.5 text-sm tracking-wide text-white font-medium hover:opacity-90 transition-opacity"
                        >
                          Get a Free Quote
                          <ArrowRight size={15} strokeWidth={2} />
                        </Link>
                      </Magnetic>
                      <Magnetic>
                        <Link
                          to="/portfolio"
                          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm tracking-wide text-white/60 border border-white/15 rounded-sm hover:text-white hover:border-white/35 transition-all duration-250"
                        >
                          View Our Work
                        </Link>
                      </Magnetic>
                    </motion.div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
