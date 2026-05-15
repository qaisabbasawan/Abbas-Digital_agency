import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import useCountUp from '../hooks/useCountUp'

const stats = [
  { value: 10,  suffix: '+', label: 'Years Experience' },
  { value: 500, suffix: '+', label: 'Projects Done' },
  { value: 50,  suffix: '+', label: 'Happy Clients' },
  { value: 5,   suffix: '★', label: 'Star Rating' },
]

function StatCard({ stat, i }) {
  const { count, ref } = useCountUp(stat.value, 1800)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.58 }}
      className="p-7 bg-white/[0.03] border border-white/[0.07] rounded-xl"
    >
      <p className="font-bold text-white text-4xl leading-none mb-2">
        {count}{stat.suffix}
      </p>
      <p className="text-white/40 text-[12px] uppercase tracking-[0.18em]">{stat.label}</p>
    </motion.div>
  )
}

export default function About() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const slide = (delay) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.62, ease: [0.25, 0.46, 0.45, 0.94] },
  })

  return (
    <section id="about" className="py-28 lg:py-36 bg-bg-dark2 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 -translate-y-1/2 bg-brand-blue/[0.07] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 -translate-y-1/2 bg-brand-pink/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — stats */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3"
            >
              About Us
            </motion.p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {stats.map((s, i) => <StatCard key={s.label} stat={s} i={i} />)}
            </div>

            {/* Founder badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.55 }}
              className="mt-3 flex items-center gap-4 p-5 bg-white/[0.03] border border-white/[0.07] rounded-xl"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-blue to-brand-pink flex items-center justify-center text-white font-bold text-sm shrink-0">
                MQ
              </div>
              <div>
                <p className="text-white text-sm font-medium">Muhammad Qais Abbas</p>
                <p className="text-white/40 text-xs mt-0.5">Founder & CEO · Est. 2012</p>
              </div>
            </motion.div>
          </div>

          {/* Right — text */}
          <div ref={ref}>
            <motion.h2 {...slide(0.05)} className="font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}>
              A Decade of{' '}
              <span className="gradient-text">Digital Excellence</span>
            </motion.h2>

            <motion.p {...slide(0.18)} className="text-white/55 text-[15px] leading-relaxed mb-4">
              Abbas Digital Agency was founded in 2012 by Muhammad Qais Abbas with a clear vision —
              to help businesses thrive in the digital world. Based in Islamabad, we have grown into
              a leading full-service agency trusted by clients across Pakistan and globally.
            </motion.p>

            <motion.p {...slide(0.28)} className="text-white/55 text-[15px] leading-relaxed mb-10">
              We specialise in WordPress, WooCommerce, e-commerce, mobile apps, AI solutions and
              digital marketing. Over 500 successful projects, one consistent standard: excellence.
            </motion.p>

            <motion.div {...slide(0.38)} className="flex flex-wrap gap-3">
              <Link
                to="/about"
                className="shimmer-btn inline-flex items-center gap-2 px-7 py-3.5 text-sm text-white hover:opacity-90 transition-opacity"
              >
                Our Full Story
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm text-white/60 border border-white/15 hover:text-white hover:border-white/35 transition-all duration-250"
              >
                Work With Us
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
