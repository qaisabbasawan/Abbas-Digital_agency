import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
    <h1
      aria-label={text}
      className="font-bold leading-[0.92] tracking-tight text-white"
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
    </h1>
  )
}

/* ── Typewriter words ── */
const words = ['Web Development', 'E-Commerce', 'Mobile Apps', 'AI Solutions', 'Digital Marketing']

/* ── Floating service tags — all on the right side, staggered vertically ── */
const services = [
  {
    Icon: Globe,        label: 'Web Development',  color: '#2E55E0',
    float: { dur: 5.5, x: [0, 0, 0, 0, 0],     y: [0, -14, 0, -14, 0] },  // pure vertical bob
    pos: { top: '8%',  right: '3%'  }, delay: 0.3,
  },
  {
    Icon: ShoppingCart, label: 'E-Commerce',       color: '#E8155A',
    float: { dur: 6.4, x: [-9, 0, 9, 0, -9],   y: [0, -10, 0, 10, 0]  },  // oval orbit
    pos: { top: '22%', right: '20%' }, delay: 0.6,
  },
  {
    Icon: Smartphone,   label: 'Mobile Apps',      color: '#7C3AED',
    float: { dur: 5.8, x: [0, 10, 0, -10, 0],  y: [0, -6, 0, -6, 0]   },  // horizontal sway
    pos: { top: '38%', right: '4%'  }, delay: 0.9,
  },
  {
    Icon: Bot,          label: 'AI & Chatbots',    color: '#0891B2',
    float: { dur: 5.2, x: [0, -8, 0, 8, 0],    y: [-10, 0, 10, 0, -10] }, // phase-shifted orbit
    pos: { top: '54%', right: '22%' }, delay: 0.15,
  },
  {
    Icon: TrendingUp,   label: 'Digital Marketing',color: '#059669',
    float: { dur: 5.0, x: [0, 7, 0, -7, 0],    y: [0, -12, 0, -12, 0]  }, // diagonal drift
    pos: { top: '68%', right: '5%'  }, delay: 1.1,
  },
  {
    Icon: Palette,      label: 'Branding & Design',color: '#D97706',
    float: { dur: 7.0, x: [-7, 7, -7, 7, -7],  y: [-8, 0, 8, 0, -8]   },  // figure-8
    pos: { top: '80%', right: '20%' }, delay: 0.75,
  },
]

/* ── Floating tag component ── */
function FloatingTag({ svc, inView }) {
  const { Icon, label, color, float, pos, delay } = svc
  return (
    /* Outer: entry pop-in */
    <motion.div
      className="absolute hidden lg:block z-20"
      style={pos}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 1.4 + delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Inner: continuous unique float */}
      <motion.div
        animate={{ x: float.x, y: float.y }}
        transition={{ duration: float.dur, repeat: Infinity, ease: 'easeInOut', delay, repeatType: 'loop' }}
      >
        <Link to="/services" tabIndex={-1}>
          <motion.div
            whileHover={{ scale: 1.12, y: -6 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full cursor-pointer select-none"
            style={{
              background: 'rgba(5, 9, 26, 0.72)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: `1px solid ${color}45`,
              boxShadow: `0 4px 24px ${color}25, inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
              style={{ background: `${color}20` }}
            >
              <Icon size={13} style={{ color }} strokeWidth={2.2} />
            </div>
            <span className="text-white/90 text-[13px] font-medium whitespace-nowrap tracking-tight">
              {label}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
              style={{ background: color }}
            />
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
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

      {/* ── Floating service tags (all over the hero) ── */}
      {services.map(s => (
        <FloatingTag key={s.label} svc={s} inView={loaded} />
      ))}

      {/* ── Hero text ── */}
      <div className="relative z-20 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-28 pb-10">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2.5 mb-8 px-3 py-1.5 border border-white/10 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse" />
            <span className="text-white/50 text-[11px] tracking-[0.22em] uppercase">
              Islamabad · Pakistan · Est. 2012
            </span>
          </motion.div>

          {/* Headline — cinematic per-character 3D reveal */}
          <div className="mb-6 space-y-0">
            <HeadlineLine text="We Build"    lineIdx={0} />
            <HeadlineLine text="Digital"     lineIdx={1} gradient />
            <HeadlineLine text="Excellence." lineIdx={2} />
          </div>

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
