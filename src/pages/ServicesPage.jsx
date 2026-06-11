import { useRef, useState } from 'react'
import SEO from '../components/SEO'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Globe, ShoppingCart, Smartphone, Bot, TrendingUp, Palette,
  ArrowRight, ArrowUpRight, Zap, Users, Award, Clock,
} from 'lucide-react'
import Footer from '../components/Footer'
import ServicesScene from '../components/ServicesScene'
import CoreElement from '../components/CoreElement'
import RevealText from '../components/anim/RevealText'
import TiltCard from '../components/anim/TiltCard'
import Magnetic from '../components/anim/Magnetic'
import useCountUp from '../hooks/useCountUp'

/* ── Service data ── */
const services = [
  {
    n: '01', Icon: Globe,        title: 'Web Development',   color: '#2E55E0', slug: 'web-development',
    desc: 'Custom WordPress, WooCommerce and React/Next.js websites built for performance, SEO and conversions.',
  },
  {
    n: '02', Icon: ShoppingCart, title: 'E-Commerce',         color: '#E8155A', slug: 'ecommerce',
    desc: 'End-to-end online stores on Shopify, WooCommerce, Amazon and eBay — from setup to conversion optimisation.',
  },
  {
    n: '03', Icon: Smartphone,   title: 'Mobile Apps',        color: '#7C3AED', slug: 'mobile-apps',
    desc: 'Native iOS and Android apps from concept to App Store with clean code and ongoing post-launch support.',
  },
  {
    n: '04', Icon: Bot,          title: 'AI & Chatbots',      color: '#0891B2', slug: 'ai-chatbots',
    desc: 'WhatsApp and Facebook chatbots, ChatGPT integrations and workflow automations saving hours every day.',
  },
  {
    n: '05', Icon: TrendingUp,   title: 'Digital Marketing',  color: '#059669', slug: 'digital-marketing',
    desc: 'SEO, Google Ads, social media and email campaigns designed to drive qualified traffic and real ROI.',
  },
  {
    n: '06', Icon: Palette,      title: 'Branding & Design',  color: '#D97706', slug: 'branding-design',
    desc: 'Logo design, full brand identity, UI/UX and marketing materials that make your business unforgettable.',
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

/* ── Floating glass stat panel with count-up ── */
function HeroStat({ value, suffix, label, color, i }) {
  const { count, ref } = useCountUp(value, 1800)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.2 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.45 }}
        className="px-7 py-5 rounded-2xl text-center"
        style={{
          background: 'rgba(8,14,42,0.45)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid ${color}35`,
          boxShadow: `0 10px 36px rgba(0,0,0,0.35), 0 0 22px ${color}1C, inset 0 1px 0 rgba(255,255,255,0.07)`,
        }}
      >
        <div className="font-bold text-white text-[26px] tracking-tight leading-none">
          {count}<span style={{ color }}>{suffix}</span>
        </div>
        <div className="text-white/35 text-[10px] uppercase tracking-[0.2em] mt-2">{label}</div>
      </motion.div>
    </motion.div>
  )
}

/* ── CTA button that fires a particle burst on hover ── */
function BurstButton({ children }) {
  const [bursts, setBursts] = useState([])
  const fire = () => {
    const id = Date.now()
    setBursts(b => [...b, id])
    setTimeout(() => setBursts(b => b.filter(x => x !== id)), 900)
  }
  return (
    <span className="relative inline-block" onMouseEnter={fire}>
      {children}
      {bursts.map(id =>
        Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2
          const d = 52 + (i % 3) * 16
          return (
            <motion.span
              key={`${id}-${i}`}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: Math.cos(a) * d, y: Math.sin(a) * d, scale: 0.2 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full pointer-events-none z-20"
              style={{
                background: i % 2 ? '#FF2D72' : '#7C3AED',
                boxShadow: `0 0 10px ${i % 2 ? '#FF2D72' : '#7C3AED'}`,
              }}
            />
          )
        })
      )}
    </span>
  )
}

/* ── Compact holographic service card (orbit + mobile stack) ── */
function CompactCard({ svc }) {
  return (
    <TiltCard max={8} glareColor={`${svc.color}29`}>
      <Link
        to={`/services/${svc.slug}`}
        className="group relative flex flex-col gap-2.5 p-5 rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${svc.color}1A, transparent 50%), linear-gradient(#0A1130, #0A1130)`,
          border: `1px solid ${svc.color}38`,
          boxShadow: `0 18px 50px rgba(0,0,0,0.5), 0 0 28px ${svc.color}16, inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
      >
        <div className="holo-sweep" />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
          style={{ background: `radial-gradient(110% 70% at 50% 0%, ${svc.color}22, transparent 65%)` }}
        />

        <div className="flex items-center justify-between">
          <IconOrb Icon={svc.Icon} color={svc.color} size={46} iconSize={17} />
          <span
            className="font-bold leading-none select-none"
            style={{ fontSize: 34, color: 'transparent', WebkitTextStroke: `1.2px ${svc.color}50` }}
          >
            {svc.n}
          </span>
        </div>

        <h3 className="text-white font-bold text-[16.5px] leading-tight">{svc.title}</h3>
        <p className="text-white/45 text-[12px] leading-relaxed line-clamp-2">{svc.desc}</p>

        <span
          className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 group-hover:gap-3"
          style={{ color: svc.color }}
        >
          Explore
          <ArrowUpRight size={11} strokeWidth={2.2} />
        </span>
      </Link>
    </TiltCard>
  )
}

/* ── Orbit showcase — cards emerge from the 3D core one by one on scroll ── */
const SLOTS = [
  { x: -480, y: -218 },  // 01 left top
  { x: 480,  y: -218 },  // 02 right top
  { x: -555, y: 22 },    // 03 left mid
  { x: 555,  y: 22 },    // 04 right mid
  { x: -440, y: 258 },   // 05 left bottom
  { x: 440,  y: 258 },   // 06 right bottom
]

const slotTiming = (i) => {
  const start = 0.06 + i * 0.145
  return [start, start + 0.115]
}

function OrbitCard({ svc, i, progress }) {
  const [start, end] = slotTiming(i)
  const slot = SLOTS[i]
  const opacity = useTransform(progress, [start, start + 0.03, end], [0, 0.55, 1])
  const scale   = useTransform(progress, [start, end], [0.22, 1])
  const x       = useTransform(progress, [start, end], [0, slot.x])
  const y       = useTransform(progress, [start, end], [0, slot.y])
  const blur    = useTransform(progress, [start, end], [8, 0])
  const filter  = useTransform(blur, v => `blur(${v}px)`)

  return (
    <motion.div
      style={{ opacity, scale, x, y, filter }}
      className="absolute left-1/2 top-1/2 -ml-[150px] -mt-[86px] w-[300px] z-20"
    >
      <CompactCard svc={svc} />
    </motion.div>
  )
}

function OrbitLine({ i, progress }) {
  const [start, end] = slotTiming(i)
  const slot = SLOTS[i]
  const pathLength = useTransform(progress, [start, end], [0, 1])
  const opacity    = useTransform(progress, [start, end], [0, 0.45])
  return (
    <motion.line
      x1={620} y1={420}
      x2={620 + slot.x} y2={420 + slot.y}
      stroke={services[i].color}
      strokeWidth="1.2"
      style={{ pathLength, opacity }}
    />
  )
}

function OrbitShowcase() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const hintOpacity = useTransform(scrollYProgress, [0, 0.05, 0.85, 0.95], [1, 1, 1, 0])

  return (
    <section ref={ref} className="relative hidden lg:block bg-bg-dark" style={{ height: '340vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* ambient */}
        <div className="absolute top-1/4 left-0 w-[460px] h-[460px] bg-brand-blue/[0.06] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-brand-pink/[0.05] rounded-full blur-[120px] pointer-events-none" />

        {/* heading */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 text-center z-30 w-full px-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3"
          >
            What We Do
          </motion.p>
          <h2 className="font-bold leading-[1.04]" style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)' }}>
            <RevealText as="span" className="text-white inline-block" stagger={0.07}>
              One Core.
            </RevealText>{' '}
            <RevealText as="span" className="inline-block" gradient delay={0.22} stagger={0.09}>
              Six Services.
            </RevealText>
          </h2>
        </div>

        {/* connection lines — drawn from the core to each card */}
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
          width="1240" height="840" viewBox="0 0 1240 840" fill="none"
        >
          {services.map((_, i) => <OrbitLine key={i} i={i} progress={scrollYProgress} />)}
        </svg>

        {/* central 3D core */}
        <div className="relative w-[460px] h-[460px] z-10 mt-10">
          {/* pulsing glow behind */}
          <div
            className="animate-glow-pulse absolute inset-6 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(46,85,224,0.22), rgba(232,21,90,0.08) 55%, transparent 72%)', filter: 'blur(14px)' }}
          />
          <CoreElement />
        </div>

        {/* the six cards, emerging one by one */}
        {services.map((svc, i) => (
          <OrbitCard key={svc.n} svc={svc} i={i} progress={scrollYProgress} />
        ))}

        {/* scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-white/25 text-[10px] uppercase tracking-[0.25em]">Keep scrolling</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-7 bg-gradient-to-b from-white/25 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ── Mobile: simple stacked cards ── */
function MobileServices() {
  return (
    <section className="lg:hidden py-16 bg-bg-dark relative">
      <div className="max-w-xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <p className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3">What We Do</p>
          <h2 className="font-bold leading-[1.05]" style={{ fontSize: 'clamp(2rem, 8vw, 2.6rem)' }}>
            <RevealText as="span" className="text-white inline-block" stagger={0.07}>
              One Core.
            </RevealText>{' '}
            <RevealText as="span" className="inline-block" gradient delay={0.22} stagger={0.09}>
              Six Services.
            </RevealText>
          </h2>
        </div>
        <div className="space-y-4">
          {services.map((svc, i) => (
            <motion.div
              key={svc.n}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 2) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <CompactCard svc={svc} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const heroRef    = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO
        title="Digital Marketing Services Pakistan | Abbas Digital Agency"
        description="SEO, web design, social media marketing, PPC & branding services for businesses in Pakistan & USA. US-registered agency. Get a free quote today."
        keywords="digital marketing services Pakistan, SEO services Pakistan, web design company Pakistan, social media marketing Pakistan, PPC advertising Pakistan, branding agency Pakistan"
        path="/services"
      />

      {/* ══════════════════════════════════
          HERO — atom scene contained here
      ══════════════════════════════════ */}
      <section className="relative pt-20 pb-24 lg:pt-24 lg:pb-32 overflow-hidden min-h-[86vh]" ref={heroRef}>

        {/* 3D atom: six electron services orbiting one nucleus */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ServicesScene />
        </div>

        {/* Text-protection gradient (left) + bottom fade into solid bg */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: 'linear-gradient(100deg, rgba(5,9,26,0.88) 35%, rgba(5,9,26,0.45) 62%, rgba(5,9,26,0.05) 100%)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[1]"
          style={{ background: 'linear-gradient(to top, #05091A, transparent)' }}
        />

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

          {/* Stats — floating glass panels */}
          <div className="flex flex-wrap gap-3 sm:gap-4 max-w-2xl">
            <HeroStat value={500} suffix="+" label="Projects" color="#2E55E0" i={0} />
            <HeroStat value={10}  suffix="+" label="Years"    color="#E8155A" i={1} />
            <HeroStat value={50}  suffix="+" label="Clients"  color="#7C3AED" i={2} />
            <HeroStat value={6}   suffix=""  label="Services" color="#059669" i={3} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SERVICES — pinned orbit showcase
      ══════════════════════════════════ */}
      <OrbitShowcase />
      <MobileServices />

      {/* ══════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-bg-dark">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.013)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-pink/[0.05] blur-[120px] pointer-events-none" />

        {/* Rotating holographic rings behind the section */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] pointer-events-none hidden md:block" aria-hidden>
          <div
            className="absolute inset-0 rounded-full animate-spin-slower"
            style={{
              border: '1px solid rgba(255,255,255,0.05)',
              borderTopColor: 'rgba(232,21,90,0.3)',
              borderRightColor: 'rgba(46,85,224,0.22)',
            }}
          />
          <div
            className="absolute inset-20 rounded-full animate-spin-slow"
            style={{
              animationDirection: 'reverse',
              border: '1px dashed rgba(255,255,255,0.05)',
              borderBottomColor: 'rgba(124,58,237,0.28)',
            }}
          />
        </div>

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
          CTA — hologram panel
      ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-bg-dark">
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

          {/* 3D hologram panel */}
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
                  {/* nebula fluid backdrop */}
                  <div
                    className="nebula-blob absolute -top-24 -left-20 w-[420px] h-[320px] rounded-full"
                    style={{ background: 'radial-gradient(circle at 35% 40%, rgba(46,85,224,0.28), transparent 60%)' }}
                  />
                  <div
                    className="nebula-blob absolute -bottom-28 -right-16 w-[460px] h-[340px] rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 60% 55%, rgba(232,21,90,0.22), transparent 60%)',
                      animationDelay: '-8s',
                      animationDirection: 'reverse',
                    }}
                  />
                  <div
                    className="nebula-blob absolute top-1/3 left-1/3 w-[340px] h-[260px] rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.18), transparent 60%)',
                      animationDelay: '-4s',
                    }}
                  />
                  {/* dot grid */}
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
                      <BurstButton>
                        <Magnetic>
                          <Link
                            to="/contact"
                            className="shimmer-btn inline-flex items-center gap-2.5 px-8 py-3.5 text-sm tracking-wide text-white font-medium hover:opacity-90 transition-opacity"
                          >
                            Get a Free Quote
                            <ArrowRight size={15} strokeWidth={2} />
                          </Link>
                        </Magnetic>
                      </BurstButton>
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
