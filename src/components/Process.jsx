import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Paintbrush, Code2, Rocket } from 'lucide-react'

const steps = [
  {
    n: '01',
    Icon: Search,
    title: 'Discovery',
    desc: 'We dive deep into your goals, target audience and competitors to craft a strategy built for success.',
    color: '#2E55E0',
    glow: 'rgba(46,85,224,0.25)',
  },
  {
    n: '02',
    Icon: Paintbrush,
    title: 'Design',
    desc: 'Conversion-focused UI/UX designs tailored to your brand. Every pixel is purposeful and precise.',
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.25)',
  },
  {
    n: '03',
    Icon: Code2,
    title: 'Development',
    desc: 'Clean code, modern frameworks and best practices. Built fast, secure and ready to scale.',
    color: '#E8155A',
    glow: 'rgba(232,21,90,0.25)',
  },
  {
    n: '04',
    Icon: Rocket,
    title: 'Launch',
    desc: 'Thorough testing, smooth deployment and ongoing support. We stay with you long after launch.',
    color: '#059669',
    glow: 'rgba(5,150,105,0.25)',
  },
]

export default function Process() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" className="py-28 lg:py-36 bg-bg-dark relative overflow-hidden">

      {/* Ambient background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-pink/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative" ref={ref}>

        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3"
          >
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.62 }}
            className="font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
          >
            Our Process
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 48 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.13, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.03] p-7 cursor-default"
            >
              {/* Hover glow bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${step.glow}, transparent 70%)` }}
              />

              {/* Top border accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
              />

              {/* Number */}
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.13, duration: 0.5 }}
                className="text-[11px] font-bold tracking-[0.2em] mb-5 block"
                style={{ color: step.color }}
              >
                {step.n}
              </motion.span>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${step.color}15`,
                  border: `1px solid ${step.color}35`,
                  boxShadow: `0 0 20px ${step.color}00`,
                }}
              >
                <step.Icon
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: step.color }}
                />
              </div>

              {/* Title */}
              <h3
                className="font-bold text-white text-[19px] mb-3 transition-colors duration-300"
                style={{ color: 'white' }}
              >
                {step.title}
              </h3>

              {/* Desc */}
              <p className="text-white/45 text-[14px] leading-relaxed flex-1">{step.desc}</p>

              {/* Bottom connector arrow (not on last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center">
                  <motion.svg
                    initial={{ opacity: 0, x: -6 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                    width="20" height="20" viewBox="0 0 20 20" fill="none"
                  >
                    <path d="M5 10h10M11 6l4 4-4 4" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Animated connecting line (desktop) */}
        <div className="hidden lg:block relative mt-8">
          <div className="absolute left-[12.5%] right-[12.5%] top-0 h-px bg-white/[0.05]" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
            className="absolute left-[12.5%] right-[12.5%] top-0 h-px bg-gradient-to-r from-brand-blue-light via-brand-pink to-transparent"
          />
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.55 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-white/40 text-[14px]">Ready to start your project?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] tracking-widest uppercase font-medium text-brand-pink hover:gap-4 transition-all duration-250"
          >
            Let's Talk
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
