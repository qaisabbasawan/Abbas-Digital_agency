import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useAnimationFrame } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Globe, ShoppingCart, Smartphone,
  Bot, TrendingUp, Palette,
} from 'lucide-react'
import Magnetic from './anim/Magnetic'

/* ── Per-character 3D flip-up reveal for the headline.
     Gradient lines clip the gradient per character (background-clip: text
     breaks on transformed children), offsetting background-position so the
     gradient still flows continuously across the word. ── */
function HeadlineLine({ text, gradient, lineIdx }) {
  const charStyle = (i) => gradient
    ? {
        backgroundImage: 'linear-gradient(135deg, #2E55E0, #E8155A)',
        backgroundSize: `${text.length * 100}% 100%`,
        backgroundPosition: `${(i / Math.max(text.length - 1, 1)) * 100}% 0`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }
    : {}

  return (
    <span
      aria-label={text}
      className="block font-bold leading-[0.92] tracking-tight text-white"
      style={{ fontSize: 'clamp(3rem, 7.5vw, 7.2rem)', perspective: 900 }}
    >
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.1em', marginBottom: '-0.1em' }}
        >
          <motion.span
            initial={{ y: '115%', rotateX: -90, opacity: 0 }}
            animate={{ y: 0, rotateX: 0, opacity: 1 }}
            transition={{
              delay: 0.15 + lineIdx * 0.14 + i * 0.028,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: 'inline-block', transformOrigin: '50% 100%', willChange: 'transform', ...charStyle(i) }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ── Typewriter words ── */
const words = ['Web Development', 'E-Commerce', 'Mobile Apps', 'AI Solutions', 'Digital Marketing']

/* ── Services orbiting the 3D core like satellites ── */
const services = [
  { Icon: Globe,        label: 'Web Development',   color: '#2E55E0' },
  { Icon: ShoppingCart, label: 'E-Commerce',        color: '#E8155A' },
  { Icon: Smartphone,   label: 'Mobile Apps',       color: '#7C3AED' },
  { Icon: Bot,          label: 'AI & Chatbots',     color: '#0891B2' },
  { Icon: TrendingUp,   label: 'Digital Marketing', color: '#059669' },
  { Icon: Palette,      label: 'Branding & Design', color: '#D97706' },
]

/* Orbit geometry — a tilted elliptical ring, like Saturn's rings seen from above.
   Tags scale up / sharpen as they sweep in front, shrink / blur / dim behind. */
const ORBIT = { rx: 255, ry: 145, speed: 0.16, tilt: -9 }

function OrbitServices({ inView }) {
  const refs = useRef([])

  useAnimationFrame((t) => {
    const time = t / 1000
    const n = services.length
    for (let i = 0; i < n; i++) {
      const el = refs.current[i]
      if (!el) continue
      const angle = (i / n) * Math.PI * 2 + time * ORBIT.speed
      const x = Math.cos(angle) * ORBIT.rx
      const y = Math.sin(angle) * ORBIT.ry
      const depth = (Math.sin(angle) + 1) / 2          // 0 = behind core, 1 = in front
      const scale = 0.68 + depth * 0.42
      el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`
      el.style.opacity = 0.3 + depth * 0.7
      el.style.filter = `blur(${(1 - depth) * 2.4}px)`
      el.style.zIndex = String(Math.round(5 + depth * 20))
    }
  })

  return (
    <div
      className="absolute hidden lg:block pointer-events-none z-[15]"
      style={{ left: '71%', top: '44%', transform: `rotate(${ORBIT.tilt}deg)` }}
    >
      {/* Pulsing energy glow at the orbit centre (sits over the 3D core) */}
      <div
        className="absolute left-0 top-0"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div
          className="animate-glow-pulse rounded-full"
          style={{
            width: 360, height: 360,
            background: 'radial-gradient(circle, rgba(46,85,224,0.22), rgba(124,58,237,0.10) 45%, rgba(232,21,90,0.05) 60%, transparent 72%)',
            filter: 'blur(10px)',
          }}
        />
      </div>

      {/* Faint orbit guide rings */}
      <div
        className="absolute rounded-[50%] border border-white/[0.06]"
        style={{
          width: ORBIT.rx * 2 + 70, height: ORBIT.ry * 2 + 70,
          left: 0, top: 0, transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute rounded-[50%]"
        style={{
          width: ORBIT.rx * 2 + 110, height: ORBIT.ry * 2 + 110,
          left: 0, top: 0, transform: 'translate(-50%, -50%)',
          border: '1px dashed rgba(255,255,255,0.04)',
        }}
      />

      {services.map(({ Icon, label, color }, i) => (
        <div
          key={label}
          ref={el => { refs.current[i] = el }}
          className="absolute left-0 top-0"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          {/* Entry pop-in + tilt compensation so text stays level */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.5 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotate: -ORBIT.tilt }}
            className="pointer-events-auto"
          >
            <Link to="/services" tabIndex={-1}>
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full cursor-pointer select-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(13,20,48,0.92), rgba(5,9,26,0.85))',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: `1px solid ${color}50`,
                  boxShadow: `0 8px 32px ${color}30, 0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.08) inset`,
                }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, ${color}55, ${color}18)`,
                    boxShadow: `0 0 12px ${color}40`,
                  }}
                >
                  <Icon size={13} style={{ color: '#fff' }} strokeWidth={2.1} />
                </span>
                <span className="text-white/90 text-[12.5px] font-medium whitespace-nowrap tracking-tight">
                  {label}
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

/* ── Hero ── */
export default function Hero() {
  const [wordIdx, setWordIdx]   = useState(0)
  const [chars, setChars]       = useState('')
  const [deleting, setDeleting] = useState(false)
  const [loaded, setLoaded]     = useState(false)

  /* Scroll-into-background effect (driven by window scrollY so it works with sticky pin) */
  const { scrollY } = useScroll()
  const vh          = typeof window !== 'undefined' ? window.innerHeight : 800
  const scale       = useTransform(scrollY, [0, vh * 0.80], [1, 0.80])
  const opacity     = useTransform(scrollY, [0, vh * 0.55], [1, 0])
  const blurPx      = useTransform(scrollY, [0, vh * 0.60], [0, 10])
  const filterBlur  = useTransform(blurPx,  v => `blur(${v}px)`)

  /* Trigger "inView" after mount so tags animate in */
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t) }, [])

  /* Typewriter */
  useEffect(() => {
    const word = words[wordIdx]
    let t
    if (!deleting && chars.length < word.length)
      t = setTimeout(() => setChars(word.slice(0, chars.length + 1)), 75)
    else if (!deleting && chars.length === word.length)
      t = setTimeout(() => setDeleting(true), 2000)
    else if (deleting && chars.length > 0)
      t = setTimeout(() => setChars(word.slice(0, chars.length - 1)), 40)
    else { setDeleting(false); setWordIdx(p => (p + 1) % words.length) }
    return () => clearTimeout(t)
  }, [chars, deleting, wordIdx])

  return (
    <motion.section
      style={{ scale, opacity, filter: filterBlur, transformOrigin: 'center center' }}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'linear-gradient(105deg, rgba(5,9,26,.92) 42%, rgba(5,9,26,.5) 68%, rgba(5,9,26,.08) 100%)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #05091A, transparent)' }}
      />

      {/* ── Services orbiting the 3D core ── */}
      <OrbitServices inView={loaded} />

      {/* ── Hero text ── */}
      <div className="relative z-20 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-28 pb-10">

          {/* Headline — cinematic per-character 3D reveal.
              One <h1> for SEO; an sr-only phrase carries the primary keyword
              while the animated lines stay as the visible headline. */}
          <h1 className="mb-6 space-y-0">
            <span className="sr-only">Digital Marketing Agency in Islamabad &amp; Montana USA — We Build Digital Excellence</span>
            <HeadlineLine text="We Build"    lineIdx={0} />
            <HeadlineLine text="Digital"     lineIdx={1} gradient />
            <HeadlineLine text="Excellence." lineIdx={2} />
          </h1>

          {/* Typewriter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="text-white/50 text-base mb-3 flex items-center gap-2"
          >
            Experts in&nbsp;
            <span className="text-brand-pink font-medium min-w-[200px]">
              {chars}<span className="cursor-blink">|</span>
            </span>
          </motion.p>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.55 }}
            className="text-white/45 text-[15px] leading-relaxed max-w-md mb-10"
          >
            Full-service digital agency based in Islamabad.
            Transforming businesses since 2012 with world-class digital solutions.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <Magnetic>
              <Link
                to="/contact"
                className="shimmer-btn inline-flex items-center gap-2 px-7 py-3.5 text-sm tracking-wide text-white font-medium hover:opacity-90 transition-opacity"
              >
                Start a Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm tracking-wide text-white/65 border border-white/15 hover:text-white hover:border-white/35 transition-all duration-250"
              >
                View Our Work
              </Link>
            </Magnetic>
          </motion.div>

          {/* Mobile services hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="mt-8 text-white/25 text-xs tracking-widest uppercase lg:hidden"
          >
            Web · E-Commerce · Mobile · AI · Marketing · Branding
          </motion.p>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.55 }}
        className="relative z-20 border-t border-white/[0.07]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.07]">
            {[
              { v: '10+',  l: 'Years'    },
              { v: '500+', l: 'Projects' },
              { v: '50+',  l: 'Clients'  },
              { v: '5 ★',  l: 'Rating'   },
            ].map(s => (
              <div key={s.l} className="py-5 px-6 sm:px-8">
                <div className="text-white font-bold text-2xl tracking-tight">{s.v}</div>
                <div className="text-white/35 text-[11px] uppercase tracking-[0.18em] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col items-center gap-2 animate-bounce-slow"
      >
        <span className="text-white/25 text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </motion.section>
  )
}
