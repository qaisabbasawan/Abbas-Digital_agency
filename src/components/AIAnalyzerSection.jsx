import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Cpu, BarChart2, Target, Zap, TrendingUp, Star,
  ArrowRight, Sparkles, CheckCircle2, AlertTriangle, Globe,
} from 'lucide-react'
import RevealText from './anim/RevealText'
import TiltCard from './anim/TiltCard'
import Magnetic from './anim/Magnetic'

/* ── Animated SVG ring score ─────────────────────────────────── */
function ScoreRing({ score, color, label, delay = 0, active }) {
  const [displayed, setDisplayed] = useState(0)
  const R = 38
  const circ = 2 * Math.PI * R
  const dashOffset = circ - (circ * (active ? score : 0)) / 100

  useEffect(() => {
    if (!active) { setDisplayed(0); return }
    let cur = 0
    const target = score
    const duration = 1600
    const step = target / (duration / 16)
    const id = setInterval(() => {
      cur += step
      if (cur >= target) { setDisplayed(target); clearInterval(id) }
      else setDisplayed(Math.round(cur))
    }, 16)
    return () => clearInterval(id)
  }, [active, score])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative w-24 h-24">
        {/* Glow backdrop */}
        <div
          className="absolute inset-2 rounded-full blur-[14px] opacity-30"
          style={{ background: color }}
        />
        <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle cx="48" cy="48" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          {/* Progress */}
          <motion.circle
            cx="48" cy="48" r={R}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: active ? dashOffset : circ }}
            transition={{ duration: 1.6, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `drop-shadow(0 0 6px ${color}99)` }}
          />
        </svg>
        {/* Number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white font-bold text-[22px] leading-none tabular-nums">{displayed}</span>
          <span className="text-white/30 text-[9px] mt-0.5">/ 100</span>
        </div>
      </div>
      <span className="text-white/50 text-[11px] text-center leading-tight max-w-[80px]">{label}</span>
    </motion.div>
  )
}

/* ── Scanning beam ───────────────────────────────────────────── */
function ScanBeam({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="beam"
          initial={{ top: '0%', opacity: 0.8 }}
          animate={{ top: ['0%', '100%', '0%'] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
          className="absolute left-0 right-0 pointer-events-none z-10"
          style={{ height: 2 }}
        >
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(46,85,224,0.6), rgba(232,21,90,0.6), transparent)',
              boxShadow: '0 0 16px 2px rgba(46,85,224,0.35)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Typewriter text ─────────────────────────────────────────── */
function Typewriter({ text, active, delay = 0 }) {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (!active) { setShown(0); return }
    const t = setTimeout(() => {
      let i = 0
      const id = setInterval(() => {
        i++
        setShown(i)
        if (i >= text.length) clearInterval(id)
      }, 28)
      return () => clearInterval(id)
    }, delay * 1000)
    return () => clearTimeout(t)
  }, [active, text, delay])
  return (
    <span>
      {text.slice(0, shown)}
      {shown < text.length && active && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-[2px] h-[14px] bg-brand-pink align-middle ml-[1px]"
        />
      )}
    </span>
  )
}

/* ── Insight chip ────────────────────────────────────────────── */
function InsightChip({ Icon, label, type, delay, active }) {
  const isWarn = type === 'warn'
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
      style={{
        background: isWarn ? 'rgba(249,115,22,0.08)' : 'rgba(34,197,94,0.08)',
        border: `1px solid ${isWarn ? 'rgba(249,115,22,0.25)' : 'rgba(34,197,94,0.25)'}`,
      }}
    >
      {isWarn
        ? <AlertTriangle size={13} className="text-orange-400 shrink-0" />
        : <CheckCircle2 size={13} className="text-green-400 shrink-0" />}
      <span className="text-white/70 text-[12px]">{label}</span>
    </motion.div>
  )
}

/* ── Feature pill ────────────────────────────────────────────── */
function FeaturePill({ Icon, label, color, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
      style={{
        background: 'rgba(8,14,42,0.5)',
        border: `1px solid ${color}30`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.2), 0 0 18px ${color}0F`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Icon size={14} style={{ color }} />
      <span className="text-white/70 text-[13px] font-medium">{label}</span>
    </motion.div>
  )
}

/* ── Main section ────────────────────────────────────────────── */
export default function AIAnalyzerSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const features = [
    { Icon: BarChart2,  label: 'Digital Presence Score',   color: '#2E55E0' },
    { Icon: Target,     label: 'Lead Generation Analysis',  color: '#E8155A' },
    { Icon: Zap,        label: 'Automation Readiness',      color: '#8B5CF6' },
    { Icon: TrendingUp, label: 'Growth Opportunity Map',    color: '#059669' },
    { Icon: Star,       label: 'Brand Strength Rating',     color: '#D97706' },
    { Icon: Globe,      label: 'SEO & Marketing Score',     color: '#0891B2' },
  ]

  const rings = [
    { score: 74, color: '#2E55E0', label: 'Digital Presence', delay: 0.1 },
    { score: 42, color: '#E8155A', label: 'Lead Generation',  delay: 0.25 },
    { score: 88, color: '#8B5CF6', label: 'Brand Strength',   delay: 0.4 },
  ]

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-40"
        style={{ background: 'rgba(46,85,224,0.09)' }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-40"
        style={{ background: 'rgba(232,21,90,0.08)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT — copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-7"
              style={{
                background: 'rgba(46,85,224,0.08)',
                border: '1px solid rgba(46,85,224,0.28)',
              }}
            >
              <Cpu size={13} className="text-brand-blue-light" />
              <span className="text-brand-blue-light text-[11px] font-semibold tracking-[0.26em] uppercase">AI-Powered Tool</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-light animate-pulse" />
            </motion.div>

            <RevealText
              as="h2"
              delay={0.05}
              stagger={0.07}
              className="font-bold text-white leading-[1.07] mb-2"
              style={{ fontSize: 'clamp(2rem,3.8vw,3.2rem)' }}
            >
              Discover what's
            </RevealText>
            <RevealText
              as="h2"
              delay={0.22}
              stagger={0.07}
              gradient
              className="font-bold leading-[1.07] mb-5"
              style={{ fontSize: 'clamp(2rem,3.8vw,3.2rem)' }}
            >
              holding your business back
            </RevealText>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="text-white/45 text-[15px] leading-relaxed mb-9 max-w-lg"
            >
              Answer 5 quick questions and our AI engine scores your business across
              six key growth dimensions — then delivers a personalised action plan
              showing exactly where to focus to scale faster.
            </motion.p>

            {/* Feature pills grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-10">
              {features.map((f, i) => (
                <FeaturePill key={f.label} {...f} i={i} />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.55 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a
                  href="https://abbasdigitalagency.com/analyzer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 shimmer-btn px-8 py-4 rounded-full text-sm tracking-[0.1em] uppercase text-white font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200"
                >
                  <Sparkles size={15} />
                  Analyse My Business Free
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </Magnetic>
              <span className="text-white/25 text-[12px]">Takes under 2 minutes · No sign-up</span>
            </motion.div>
          </div>

          {/* RIGHT — animated preview card */}
          <div ref={ref}>
            <TiltCard max={5} glareColor="rgba(46,85,224,0.12)" glareSize={500}>
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(8,14,42,0.55)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 48px rgba(46,85,224,0.1), inset 0 1px 0 rgba(255,255,255,0.07)',
                }}
              >
                <div className="holo-sweep z-20" />
                <ScanBeam active={inView} />

                {/* Terminal title bar */}
                <div
                  className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06]"
                  style={{ background: 'rgba(8,14,42,0.4)' }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-white/25 text-[11px] font-mono tracking-wider">ADA — Business Intelligence Engine v2.1</span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-green-400"
                    />
                    <span className="text-green-400/70 text-[10px] font-mono">LIVE</span>
                  </div>
                </div>

                <div className="p-7 pb-8 space-y-6">

                  {/* Scanning status */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      animate={inView ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                    >
                      <Cpu size={15} className="text-brand-pink" />
                    </motion.div>
                    <span className="font-mono text-[12px] text-white/50">
                      <Typewriter text="Analyzing: Ahmad's E-Commerce Store · Islamabad, PK" active={inView} delay={0.3} />
                    </span>
                  </motion.div>

                  {/* Score rings */}
                  <div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-5"
                    >
                      Growth Dimension Scores
                    </motion.p>
                    <div className="grid grid-cols-3 gap-4">
                      {rings.map((r) => (
                        <ScoreRing key={r.label} {...r} active={inView} />
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.06]" />

                  {/* Overall score bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-white/40 text-[11px] uppercase tracking-[0.18em]">Overall Digital Score</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 1.2 }}
                        className="text-white font-bold text-[15px]"
                      >
                        68 / 100
                      </motion.span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={inView ? { width: '68%' } : { width: '0%' }}
                        transition={{ duration: 1.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #2E55E0, #E8155A)',
                          boxShadow: '0 0 12px rgba(46,85,224,0.5)',
                        }}
                      />
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 1.5 }}
                      className="text-yellow-400/70 text-[11px] mt-2 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/70 shrink-0" />
                      Growing Digital Business — 3 priority actions identified
                    </motion.p>
                  </div>

                  {/* Insight chips */}
                  <div className="space-y-2">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 1.7 }}
                      className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-3"
                    >
                      AI Insights
                    </motion.p>
                    <InsightChip Icon={AlertTriangle} label="Lead capture system needs optimising" type="warn" delay={1.8} active={inView} />
                    <InsightChip Icon={AlertTriangle} label="No CRM or follow-up automation detected" type="warn" delay={1.95} active={inView} />
                    <InsightChip Icon={CheckCircle2}  label="Strong social media presence identified" type="good" delay={2.1} active={inView} />
                  </div>

                  {/* CTA inside card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 2.3, duration: 0.5 }}
                  >
                    <a
                      href="https://abbasdigitalagency.com/analyzer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[13px] font-semibold tracking-wide transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(46,85,224,0.18), rgba(232,21,90,0.18))',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.8)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(46,85,224,0.3), rgba(232,21,90,0.3))'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                        e.currentTarget.style.color = '#fff'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(46,85,224,0.18), rgba(232,21,90,0.18))'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                        e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                      }}
                    >
                      <Sparkles size={14} />
                      Run the full analysis on your business
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  )
}
