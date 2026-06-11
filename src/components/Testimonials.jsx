import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import RevealText from './anim/RevealText'

const list = [
  {
    quote: 'Abbas Digital Agency transformed our online store completely. Sales increased by 200% within 3 months of launching our new WooCommerce site.',
    name: 'Ahmed Khan',
    role: 'CEO, FashionHub PK',
    initials: 'AK',
  },
  {
    quote: 'Professional team, on-time delivery, and the website looks absolutely stunning. Best digital agency in Pakistan without a doubt.',
    name: 'Sara Malik',
    role: 'Owner, Sara\'s Boutique',
    initials: 'SM',
  },
  {
    quote: 'Their SEO work got us to Page 1 of Google in just 2 months. The ROI has been incredible for our business.',
    name: 'Bilal Hussain',
    role: 'Director, TechSolutions PK',
    initials: 'BH',
  },
]

export default function Testimonials() {
  const [cur, setCur] = useState(0)
  const [dir, setDir] = useState(1)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const id = setInterval(() => { setDir(1); setCur(p => (p + 1) % list.length) }, 5000)
    return () => clearInterval(id)
  }, [])

  const go = (i) => { setDir(i > cur ? 1 : -1); setCur(i) }
  const t  = list[cur]

  return (
    <section id="testimonials" className="py-28 lg:py-36 bg-bg-dark" ref={ref}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-center">

          {/* Left label */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3"
            >
              Testimonials
            </motion.p>
            <RevealText as="h2" className="font-bold text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }} delay={0.1} stagger={0.07}>
              What Our Clients Say
            </RevealText>

            {/* Dot navigation */}
            <div className="flex items-center gap-3">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === cur
                      ? 'w-7 h-2 bg-brand-pink'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right — quote card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 sm:p-10 overflow-hidden"
          >
            {/* Decorative quote mark */}
            <div className="absolute top-4 right-6 text-[7rem] text-white/[0.04] leading-none font-bold select-none pointer-events-none">
              "
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg star-glow">★</span>
              ))}
            </div>

            {/* Quote */}
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={cur}
                custom={dir}
                initial={{ opacity: 0, x: dir * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -30 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
              >
                <blockquote className="text-white/80 text-[17px] sm:text-[19px] leading-relaxed mb-8">
                  "{t.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-blue to-brand-pink flex items-center justify-center font-bold text-white text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-[15px]">{t.name}</p>
                    <p className="text-white/40 text-[13px] mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
