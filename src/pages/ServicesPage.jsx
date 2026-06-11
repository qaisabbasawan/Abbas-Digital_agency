import { useRef, useState, useEffect } from 'react'
import SEO from '../components/SEO'
import {
  motion, useInView, useScroll, useTransform,
  useMotionValueEvent,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Globe, ShoppingCart, Smartphone, Bot, TrendingUp, Palette,
  ArrowRight, ArrowUpRight, Zap, Users, Award, Clock,
} from 'lucide-react'
import Footer from '../components/Footer'
import ServicesScene from '../components/ServicesScene'
import NeuralSpine from '../components/NeuralSpine'
import RevealText from '../components/anim/RevealText'
import TiltCard from '../components/anim/TiltCard'
import Magnetic from '../components/anim/Magnetic'
import useCountUp from '../hooks/useCountUp'

/* ── Service data ── */
const services = [
  {
    n: '01', Icon: Globe, title: 'Web Development', sub: 'WordPress, React & Next.js',
    color: '#2E55E0', slug: 'web-development', ambient: 'rain',
    desc: 'Custom WordPress, WooCommerce and React/Next.js websites built for performance, SEO and conversions.',
  },
  {
    n: '02', Icon: ShoppingCart, title: 'E-Commerce', sub: 'Shopify, WooCommerce & Amazon',
    color: '#E8155A', slug: 'ecommerce', ambient: 'gold',
    desc: 'End-to-end online stores on Shopify, WooCommerce, Amazon and eBay — from setup to conversion optimisation.',
  },
  {
    n: '03', Icon: Smartphone, title: 'Mobile Apps', sub: 'Native iOS & Android',
    color: '#7C3AED', slug: 'mobile-apps', ambient: 'phone',
    desc: 'Native iOS and Android apps from concept to App Store with clean code and ongoing post-launch support.',
  },
  {
    n: '04', Icon: Bot, title: 'AI & Chatbots', sub: 'WhatsApp Bots & GPT Integrations',
    color: '#0891B2', slug: 'ai-chatbots', ambient: 'neural',
    desc: 'WhatsApp and Facebook chatbots, ChatGPT integrations and workflow automations saving hours every day.',
  },
  {
    n: '05', Icon: TrendingUp, title: 'Digital Marketing', sub: 'SEO, Google Ads & Social Media',
    color: '#059669', slug: 'digital-marketing', ambient: 'bars',
    desc: 'SEO, Google Ads, social media and email campaigns designed to drive qualified traffic and real ROI.',
  },
  {
    n: '06', Icon: Palette, title: 'Branding & Design', sub: 'Logo, Identity & UI/UX',
    color: '#D97706', slug: 'branding-design', ambient: 'blobs',
    desc: 'Logo design, full brand identity, UI/UX and marketing materials that make your business unforgettable.',
  },
]

const COLORS = services.map(s => s.color)

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

/* ── Glitch / scramble text reveal ── */
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIK0123456789'

function ScrambleText({ text, active, className, style }) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!active) return
    let frame = 0
    const total = 20
    const id = setInterval(() => {
      frame++
      const reveal = Math.floor((frame / total) * text.length)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { out += ' '; continue }
        out += i < reveal
          ? text[i]
          : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }
      if (frame >= total) { setDisplay(text); clearInterval(id) }
      else setDisplay(out)
    }, 34)
    return () => clearInterval(id)
  }, [active, text])

  return <span className={className} style={style}>{display}</span>
}

/* ── Per-service ambient animation inside the card ── */
function CardAmbient({ type, color }) {
  if (type === 'rain') {
    return (
      <div
        className="ambient-rain absolute inset-0 opacity-[0.16] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(180deg, transparent 0 14px, ${color}66 14px 17px, transparent 17px 38px), repeating-linear-gradient(90deg, transparent 0 26px, rgba(5,9,26,0.9) 26px 30px)`,
        }}
      />
    )
  }
  if (type === 'gold') {
    return (
      <div className="ambient-rise absolute inset-0 opacity-70 pointer-events-none">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${8 + (i * 11) % 86}%`,
              width: i % 3 === 0 ? 4 : 3,
              height: i % 3 === 0 ? 4 : 3,
              background: '#F59E0B',
              boxShadow: '0 0 8px #F59E0B',
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2.8 + (i % 4) * 0.5}s`,
            }}
          />
        ))}
      </div>
    )
  }
  if (type === 'phone') {
    return (
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[88px] h-[160px] opacity-25 pointer-events-none">
        <div className="absolute inset-0 rounded-[18px] border-2" style={{ borderColor: color }} />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-7 h-1 rounded-full" style={{ background: color }} />
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '11s' }}>
          <span className="absolute -left-3 top-1/2 w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
        </div>
        <div className="absolute -inset-4 animate-spin-slower" style={{ animationDirection: 'reverse' }}>
          <span className="absolute -right-1 top-1/3 w-1.5 h-1.5 rounded-full" style={{ background: '#fff', boxShadow: `0 0 6px ${color}` }} />
        </div>
      </div>
    )
  }
  if (type === 'neural') {
    const nodes = [[15, 25], [38, 12], [62, 28], [85, 18], [25, 62], [50, 50], [75, 60], [88, 80], [12, 82], [45, 85]]
    return (
      <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        {nodes.slice(0, -1).map((n, i) => (
          <line key={i} x1={n[0]} y1={n[1]} x2={nodes[i + 1][0]} y2={nodes[i + 1][1]} stroke={color} strokeWidth="0.35" opacity="0.5" />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n[0]} cy={n[1]} r="1.6" fill={color} className="ambient-node" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </svg>
    )
  }
  if (type === 'bars') {
    return (
      <div className="absolute inset-x-8 bottom-6 h-[42%] flex items-end gap-2.5 opacity-25 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="ambient-bar flex-1 rounded-t"
            style={{
              height: `${30 + (i * 17) % 70}%`,
              background: `linear-gradient(180deg, ${color}, transparent)`,
              animationDelay: `${i * 0.22}s`,
            }}
          />
        ))}
      </div>
    )
  }
  /* blobs — branding */
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
      <div className="nebula-blob absolute -top-10 -right-10 w-48 h-48 rounded-full" style={{ background: `radial-gradient(circle, ${color}55, transparent 65%)` }} />
      <div className="nebula-blob absolute -bottom-12 -left-8 w-52 h-52 rounded-full" style={{ background: 'radial-gradient(circle, #E8155A40, transparent 65%)', animationDelay: '-7s', animationDirection: 'reverse' }} />
    </div>
  )
}

/* ── Card panel content (shared by carousel + mobile stack) ── */
function CardPanel({ svc, active }) {
  return (
    <div
      className="group relative w-full h-full rounded-[26px] overflow-hidden flex flex-col p-8 sm:p-9"
      style={{
        background: 'rgba(10,17,48,0.5)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: `1px solid ${svc.color}55`,
        boxShadow: `0 30px 90px rgba(0,0,0,0.55), 0 0 50px ${svc.color}22, inset 0 1px 0 rgba(255,255,255,0.09)`,
      }}
    >
      <CardAmbient type={svc.ambient} color={svc.color} />
      <div className="holo-sweep" />

      {/* top row */}
      <div className="relative flex items-start justify-between mb-7">
        <IconOrb Icon={svc.Icon} color={svc.color} size={58} iconSize={22} />
        <span
          className="font-bold leading-none select-none"
          style={{ fontSize: 64, color: 'transparent', WebkitTextStroke: `1.4px ${svc.color}55` }}
        >
          {svc.n}
        </span>
      </div>

      {/* glitch title */}
      <h3 className="relative text-white font-bold leading-tight mb-1.5" style={{ fontSize: 'clamp(1.5rem, 2vw, 1.9rem)' }}>
        <ScrambleText text={svc.title} active={active} />
      </h3>
      <p className="relative text-[12px] font-semibold tracking-[0.16em] uppercase mb-5" style={{ color: svc.color }}>
        {svc.sub}
      </p>

      <p className="relative text-white/55 text-[14px] leading-relaxed max-w-sm">{svc.desc}</p>

      {/* CTA */}
      <Link
        to={`/services/${svc.slug}`}
        className="relative mt-auto inline-flex items-center gap-2.5 text-[11.5px] tracking-[0.22em] uppercase font-bold transition-all duration-300 hover:gap-4 w-fit"
        style={{ color: svc.color }}
      >
        Explore
        <span
          className="flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 group-hover:rotate-45"
          style={{ border: `1px solid ${svc.color}66`, background: `${svc.color}18` }}
        >
          <ArrowUpRight size={14} strokeWidth={2.2} />
        </span>
      </Link>
    </div>
  )
}

/* ── One spine card — orbits around the spine as it takes the stage ──
   u = p*5 - i is the card's local progress: it swings in from behind one
   side, rolls around the FRONT of the spine at full size at u=0, then
   rolls away behind the other side as the next card arrives. */
const CARD_W = 470
const CARD_H = 360
const ORBIT_R = 440          // orbit radius in px

function SpineCard({ svc, i, p, active }) {
  const u = useTransform(p, v => v * 5 - i)
  const theta = useTransform(u, v => v * Math.PI * 1.1)

  const x = useTransform(theta, t => Math.sin(t) * ORBIT_R)
  const depth = useTransform(theta, t => Math.cos(t))            // 1 = front, -1 = behind
  const y = useTransform(u, v => -v * 150)                       // slight helix climb

  const scale = useTransform(depth, d => 0.62 + ((d + 1) / 2) * 0.43)
  const opacity = useTransform([u, depth], ([v, d]) => {
    const edge = Math.max(0, 1 - Math.max(0, Math.abs(v) - 0.72) / 0.2)
    return edge * (0.28 + ((d + 1) / 2) * 0.72)
  })
  const blurPx = useTransform([u, depth], ([v, d]) =>
    (1 - (d + 1) / 2) * 5 + Math.max(0, Math.abs(v) - 0.72) * 10
  )
  const filter = useTransform(blurPx, v => `blur(${v}px)`)
  const rotateY = useTransform(theta, t => -Math.sin(t) * 24)    // card faces the spine
  const zIndex = useTransform(depth, d => Math.round(60 + d * 40))

  /* neural threads — reach from the card's inner edge back to the spine,
     switching sides as the card orbits */
  const threadRightW = useTransform(x, v => Math.max(-v - CARD_W / 2 - 12, 0))
  const threadLeftW  = useTransform(x, v => Math.max(v - CARD_W / 2 - 12, 0))

  return (
    <motion.div
      style={{
        x, y, opacity, scale, rotateY, filter, zIndex,
        left: '50%',
        marginLeft: -CARD_W / 2,
        width: CARD_W,
        height: CARD_H,
        marginTop: -CARD_H / 2,
      }}
      className="absolute top-1/2"
    >
      {/* thread to the right of the card (card is left of the spine) */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-px pointer-events-none"
        style={{
          left: '100%',
          width: threadRightW,
          background: `linear-gradient(90deg, ${svc.color}AA, transparent)`,
        }}
      >
        <span
          className="thread-dot absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: svc.color, boxShadow: `0 0 10px ${svc.color}`, animationDirection: 'reverse' }}
        />
      </motion.div>
      {/* thread to the left of the card (card is right of the spine) */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-px pointer-events-none"
        style={{
          right: '100%',
          width: threadLeftW,
          background: `linear-gradient(270deg, ${svc.color}AA, transparent)`,
        }}
      >
        <span
          className="thread-dot absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: svc.color, boxShadow: `0 0 10px ${svc.color}` }}
        />
      </motion.div>

      <motion.div whileHover={{ scale: 1.035 }} transition={{ duration: 0.3 }} className="w-full h-full">
        <CardPanel svc={svc} active={active} />
      </motion.div>
    </motion.div>
  )
}

/* ── The pinned neural spine experience ── */
function NeuralServices() {
  const ref = useRef(null)
  const storeRef = useRef({ p: 0 })
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const p = useTransform(scrollYProgress, [0.02, 0.97], [0, 1], { clamp: true })

  useMotionValueEvent(p, 'change', v => {
    storeRef.current.p = v
    const idx = Math.min(5, Math.max(0, Math.round(v * 5)))
    setActive(prev => (prev === idx ? prev : idx))
  })

  const jumpTo = (i) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const travel = el.offsetHeight - window.innerHeight
    const target = top + (0.02 + (i / 5) * 0.95) * travel
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.4 })
    else window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="relative hidden lg:block bg-bg-dark" style={{ height: '680vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: 1500 }}>

        {/* faint sci-fi grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, #000 20%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, #000 20%, transparent 78%)',
          }}
        />

        {/* the neural spine */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <NeuralSpine store={storeRef.current} />
        </div>

        {/* heading */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-30 w-full px-6 pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-2.5"
          >
            What We Do
          </motion.p>
          <h2 className="font-bold leading-[1.04]" style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)' }}>
            <RevealText as="span" className="text-white inline-block" stagger={0.07}>
              One Brain.
            </RevealText>{' '}
            <RevealText as="span" className="inline-block" gradient delay={0.22} stagger={0.09}>
              Six Services.
            </RevealText>
          </h2>
        </div>

        {/* the six cards riding the spine */}
        {services.map((svc, i) => (
          <SpineCard key={svc.n} svc={svc} i={i} p={p} active={active === i} />
        ))}

        {/* side progress dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
          {services.map((s, i) => (
            <button
              key={s.n}
              onClick={() => jumpTo(i)}
              aria-label={`Go to ${s.title}`}
              className="relative rounded-full transition-all duration-400"
              style={{
                width: 8,
                height: active === i ? 30 : 8,
                background: active === i ? s.color : 'rgba(255,255,255,0.18)',
                boxShadow: active === i ? `0 0 14px ${s.color}` : 'none',
              }}
            />
          ))}
        </div>

        {/* counter */}
        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/30 text-[10px] tracking-[0.3em] uppercase">
          0{active + 1} / 06 — {services[active].title}
        </span>
      </div>
    </section>
  )
}


/* ── Mobile: stacked glass panels ── */
function MobileServices() {
  return (
    <section className="lg:hidden py-16 bg-bg-dark relative overflow-hidden">
      <div className="max-w-xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <p className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3">What We Do</p>
          <h2 className="font-bold leading-[1.05]" style={{ fontSize: 'clamp(2rem, 8vw, 2.6rem)' }}>
            <RevealText as="span" className="text-white inline-block" stagger={0.07}>
              Six Services.
            </RevealText>{' '}
            <RevealText as="span" className="inline-block" gradient delay={0.22} stagger={0.09}>
              One Vision.
            </RevealText>
          </h2>
        </div>
        <div className="space-y-5">
          {services.map((svc, i) => (
            <motion.div
              key={svc.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-[400px]"
            >
              <CardPanel svc={svc} active />
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

        <div className="absolute inset-0 z-0 pointer-events-none">
          <ServicesScene />
        </div>

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

          <div className="flex flex-wrap gap-3 sm:gap-4 max-w-2xl">
            <HeroStat value={500} suffix="+" label="Projects" color="#2E55E0" i={0} />
            <HeroStat value={10}  suffix="+" label="Years"    color="#E8155A" i={1} />
            <HeroStat value={50}  suffix="+" label="Clients"  color="#7C3AED" i={2} />
            <HeroStat value={6}   suffix=""  label="Services" color="#059669" i={3} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SERVICES — 3D horizontal carousel
      ══════════════════════════════════ */}
      <NeuralServices />
      <MobileServices />

      {/* ══════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-bg-dark">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.013)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-pink/[0.05] blur-[120px] pointer-events-none" />

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
            initial={{ opacity: 0, y: 90, rotateX: -22, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 100%' }}
          >
            <TiltCard max={4} glareColor="rgba(255,255,255,0.06)">
              {/* breathing border glow */}
              <motion.div
                animate={{ boxShadow: [
                  '0 0 32px rgba(232,21,90,0.16), 0 0 60px rgba(46,85,224,0.10)',
                  '0 0 52px rgba(232,21,90,0.32), 0 0 90px rgba(46,85,224,0.20)',
                  '0 0 32px rgba(232,21,90,0.16), 0 0 60px rgba(46,85,224,0.10)',
                ] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative rounded-[30px] p-[1.5px] overflow-hidden"
              >
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
              </motion.div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
