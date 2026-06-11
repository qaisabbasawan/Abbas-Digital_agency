import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Search, Paintbrush, Code2, Rocket } from 'lucide-react'
import RevealText from './anim/RevealText'
import TiltCard from './anim/TiltCard'
import Magnetic from './anim/Magnetic'

const steps = [
  {
    n: '01',
    Icon: Search,
    title: 'Discovery',
    desc: 'We dive deep into your goals, target audience and competitors to craft a strategy built for success.',
    color: '#2E55E0',
    points: ['Goals & KPIs', 'Market research', 'Roadmap'],
  },
  {
    n: '02',
    Icon: Paintbrush,
    title: 'Design',
    desc: 'Conversion-focused UI/UX designs tailored to your brand. Every pixel is purposeful and precise.',
    color: '#8B5CF6',
    points: ['Wireframes', 'UI/UX design', 'Prototype'],
  },
  {
    n: '03',
    Icon: Code2,
    title: 'Development',
    desc: 'Clean code, modern frameworks and best practices. Built fast, secure and ready to scale.',
    color: '#E8155A',
    points: ['Clean code', 'QA testing', 'Optimisation'],
  },
  {
    n: '04',
    Icon: Rocket,
    title: 'Launch',
    desc: 'Thorough testing, smooth deployment and ongoing support. We stay with you long after launch.',
    color: '#059669',
    points: ['Deployment', 'Training', 'Ongoing support'],
  },
]

/* ── Igniting node on the beam ── */
function Node({ color }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 17, delay: 0.1 }}
      className="relative w-5 h-5"
    >
      <span className="absolute inset-0 rounded-full animate-ping-soft" style={{ background: `${color}55` }} />
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: color, boxShadow: `0 0 18px ${color}, 0 0 40px ${color}66` }}
      />
      <span className="absolute inset-[6px] rounded-full bg-white/90" />
    </motion.div>
  )
}

/* ── One step row — card / node / ghost number, sides alternate ── */
function StepRow({ step, i }) {
  const { Icon, n, title, desc, color, points } = step
  const left = i % 2 === 0     // card on the left for even steps (desktop)

  const card = (
    <motion.div
      initial={{ opacity: 0, x: left ? -56 : 56, y: 24 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full max-w-[460px] ${left ? 'lg:justify-self-end' : 'lg:justify-self-start'}`}
    >
      <TiltCard max={7} glareColor={`${color}26`}>
        <div
          className="group relative p-7 rounded-3xl overflow-hidden"
          style={{
            background: `linear-gradient(${left ? '150deg' : '210deg'}, ${color}14, rgba(8,14,42,0.6) 48%)`,
            border: `1px solid ${color}2E`,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {/* hover bloom */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: `radial-gradient(110% 70% at 50% 0%, ${color}24, transparent 65%)` }}
          />

          {/* header row */}
          <div className="flex items-center gap-4 mb-5">
            {/* spinning energy ring orb */}
            <div className="relative w-14 h-14 shrink-0">
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
                  boxShadow: `0 0 24px ${color}40`,
                }}
              >
                <Icon size={20} color="#fff" strokeWidth={1.8} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-1" style={{ color }}>
                Step {n}
              </p>
              <h3 className="text-white font-bold text-[22px] leading-tight">{title}</h3>
            </div>
          </div>

          <p className="text-white/50 text-[14px] leading-relaxed mb-5">{desc}</p>

          {/* deliverables */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {points.map((p, j) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: 0.35 + j * 0.12, duration: 0.45 }}
                className="inline-flex items-center gap-2 text-[12.5px] text-white/55"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                {p}
              </motion.span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )

  const ghost = (
    <motion.div
      initial={{ opacity: 0, x: left ? 48 : -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`hidden lg:flex items-center ${left ? 'justify-start pl-10' : 'justify-end pr-10'}`}
    >
      <span
        className="font-bold leading-none select-none"
        style={{
          fontSize: 'clamp(96px, 9vw, 140px)',
          color: 'transparent',
          WebkitTextStroke: `1.5px ${color}45`,
          textShadow: `0 0 60px ${color}25`,
        }}
      >
        {n}
      </span>
    </motion.div>
  )

  return (
    <div className="relative pl-14 lg:pl-0 lg:grid lg:grid-cols-[1fr_96px_1fr] lg:items-center">
      {/* node — pinned to the beam */}
      <div className="absolute left-[22px] top-9 -translate-x-1/2 lg:relative lg:left-auto lg:top-auto lg:translate-x-0 lg:order-2 lg:justify-self-center">
        <Node color={color} />
      </div>

      <div className={left ? 'lg:order-1' : 'lg:order-3'}>{card}</div>
      <div className={left ? 'lg:order-3' : 'lg:order-1'}>{ghost}</div>
    </div>
  )
}

export default function Process() {
  const timelineRef = useRef(null)

  /* Scroll-driven energy beam */
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.72', 'end 0.55'],
  })
  const beam = useSpring(scrollYProgress, { stiffness: 70, damping: 22, restDelta: 0.001 })
  const cometTop = useTransform(beam, v => `${v * 100}%`)
  const cometOpacity = useTransform(beam, [0, 0.02, 0.96, 1], [0, 1, 1, 0])

  return (
    <section id="process" className="py-28 lg:py-36 bg-bg-dark relative overflow-hidden">

      {/* Ambient background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-pink/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative">

        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
          >
            How We Work
          </motion.p>
          <h2
            className="font-bold leading-[1.04]"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
          >
            <RevealText as="span" className="text-white inline-block" stagger={0.08}>
              From Idea to
            </RevealText>{' '}
            <RevealText as="span" className="inline-block" gradient delay={0.28} stagger={0.1}>
              Launch.
            </RevealText>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.55 }}
            className="text-white/40 text-[15px] mt-5 max-w-md mx-auto"
          >
            Four steps. Zero guesswork. Watch the beam — that's your project moving forward.
          </motion.p>
        </div>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="relative">

          {/* beam track */}
          <div className="absolute left-[22px] lg:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/[0.06]" />
          {/* energy beam */}
          <motion.div
            className="absolute left-[22px] lg:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 origin-top rounded-full"
            style={{
              scaleY: beam,
              background: 'linear-gradient(180deg, #2E55E0, #8B5CF6 45%, #E8155A)',
              boxShadow: '0 0 16px rgba(124,58,237,0.5)',
            }}
          />
          {/* comet head */}
          <motion.div
            className="absolute left-[22px] lg:left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{ top: cometTop, opacity: cometOpacity }}
          >
            <div className="relative w-4 h-4">
              <span className="absolute inset-0 rounded-full bg-white blur-[2px]" />
              <span className="absolute -inset-2 rounded-full bg-brand-pink/40 blur-md" />
              <span className="absolute -inset-4 rounded-full bg-brand-blue/25 blur-xl" />
            </div>
          </motion.div>

          <div className="space-y-14 lg:space-y-24 py-2">
            {steps.map((s, i) => <StepRow key={s.n} step={s} i={i} />)}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-5 text-center"
        >
          <p className="text-white/40 text-[14px]">Ready to start your project?</p>
          <Magnetic>
            <a
              href="/contact"
              className="shimmer-btn inline-flex items-center gap-2 px-7 py-3.5 text-[12px] tracking-[0.15em] uppercase text-white font-medium hover:opacity-90 transition-opacity"
            >
              Let's Talk
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </Magnetic>
        </motion.div>

      </div>
    </section>
  )
}
