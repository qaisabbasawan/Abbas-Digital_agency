import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import RevealText from './anim/RevealText'
import TiltCard from './anim/TiltCard'
import Magnetic from './anim/Magnetic'

const list = [
  {
    quote: 'Abbas Digital Agency transformed our online store completely. Sales increased by 200% within 3 months of launching our new WooCommerce site.',
    name: 'Ahmed Khan',
    role: 'CEO, FashionHub PK',
    initials: 'AK',
    color: '#2E55E0',
  },
  {
    quote: 'Professional team, on-time delivery, and the website looks absolutely stunning. Best digital agency in Pakistan without a doubt.',
    name: 'Sara Malik',
    role: 'Owner, Sara\'s Boutique',
    initials: 'SM',
    color: '#E8155A',
  },
  {
    quote: 'Their SEO work got us to Page 1 of Google in just 2 months. The ROI has been incredible for our business.',
    name: 'Bilal Hussain',
    role: 'Director, TechSolutions PK',
    initials: 'BH',
    color: '#7C3AED',
  },
]

const AUTOPLAY_MS = 6500

export default function Testimonials() {
  const [cur, setCur] = useState(0)
  const [dir, setDir] = useState(1)

  /* autoplay — resets whenever the slide changes (manual or auto) */
  useEffect(() => {
    const id = setTimeout(() => { setDir(1); setCur(p => (p + 1) % list.length) }, AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [cur])

  const go   = (i) => { setDir(i > cur ? 1 : -1); setCur(i) }
  const next = () => { setDir(1);  setCur(p => (p + 1) % list.length) }
  const prev = () => { setDir(-1); setCur(p => (p - 1 + list.length) % list.length) }

  const t = list[cur]

  return (
    <section id="testimonials" className="py-28 lg:py-36 bg-bg-dark relative overflow-hidden">

      {/* Ambient aurora */}
      <div className="absolute top-1/2 -left-32 w-[420px] h-[420px] -translate-y-1/2 bg-brand-blue/[0.08] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[360px] h-[360px] bg-brand-pink/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-20 items-center">

          {/* ── Left — heading, rating, controls ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
            >
              Testimonials
            </motion.p>
            <h2
              className="font-bold leading-[1.05] mb-8"
              style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.3rem)' }}
            >
              <RevealText as="span" className="text-white inline-block" stagger={0.07}>
                Loved by
              </RevealText>{' '}
              <RevealText as="span" className="inline-block" gradient delay={0.22} stagger={0.09}>
                Our Clients.
              </RevealText>
            </h2>

            {/* Rating block */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-5 mb-10"
            >
              <span
                className="font-bold leading-none"
                style={{
                  fontSize: '3.4rem',
                  background: 'linear-gradient(135deg, #fff, #9db4ff)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                5.0
              </span>
              <div>
                <div className="flex gap-1 mb-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -90 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ delay: 0.35 + i * 0.09, type: 'spring', stiffness: 280, damping: 14 }}
                      className="text-yellow-400 text-lg star-glow"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="text-white/35 text-[12px] tracking-wide">50+ happy clients · since 2012</p>
              </div>
            </motion.div>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="flex items-center gap-5"
            >
              <div className="flex gap-2.5">
                <Magnetic strength={0.25}>
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <ArrowLeft size={16} strokeWidth={1.8} />
                  </button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <ArrowRight size={16} strokeWidth={1.8} />
                  </button>
                </Magnetic>
              </div>

              {/* Dots — active one fills up over the autoplay window */}
              <div className="flex items-center gap-2.5">
                {list.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`relative rounded-full overflow-hidden transition-all duration-400 ${
                      i === cur ? 'w-9 h-[7px] bg-white/15' : 'w-[7px] h-[7px] bg-white/20 hover:bg-white/40'
                    }`}
                  >
                    {i === cur && (
                      <motion.span
                        key={`fill-${cur}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                        className="absolute inset-0 origin-left rounded-full"
                        style={{ background: 'linear-gradient(90deg, #2E55E0, #E8155A)' }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right — 3D flipping quote stage ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1400 }}
          >
            <TiltCard max={5} glareColor="rgba(255,255,255,0.06)">
              <div
                className="relative rounded-3xl p-8 sm:p-11 overflow-hidden min-h-[340px] flex flex-col"
                style={{
                  background: 'linear-gradient(160deg, rgba(46,85,224,0.09), rgba(8,14,42,0.7) 55%, rgba(232,21,90,0.06))',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
                }}
              >
                {/* Giant gradient quote mark */}
                <span
                  aria-hidden
                  className="absolute -top-5 right-6 leading-none select-none pointer-events-none font-bold"
                  style={{
                    fontSize: '9rem',
                    background: `linear-gradient(135deg, ${t.color}40, transparent 75%)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    transition: 'all 0.6s',
                  }}
                >
                  "
                </span>

                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={cur}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 90, rotateY: dir * 16, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: dir * -90, rotateY: dir * -16, filter: 'blur(8px)' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col flex-1"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Quote — words cascade in */}
                    <blockquote className="text-white/85 text-[17px] sm:text-[20px] leading-relaxed mb-9 flex-1">
                      {t.quote.split(' ').map((w, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          transition={{ delay: 0.2 + i * 0.018, duration: 0.4 }}
                          className="inline-block mr-[0.28em]"
                        >
                          {w}
                        </motion.span>
                      ))}
                    </blockquote>

                    {/* Author — avatar with spinning energy ring */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 shrink-0">
                        <div
                          className="absolute inset-0 rounded-full animate-spin-slower"
                          style={{
                            background: `conic-gradient(from 0deg, transparent 20%, ${t.color} 45%, transparent 70%)`,
                            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                            mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                          }}
                        />
                        <div
                          className="absolute inset-[4px] rounded-full flex items-center justify-center font-bold text-white text-sm"
                          style={{
                            background: `linear-gradient(135deg, ${t.color}, ${t.color}77)`,
                            boxShadow: `0 0 22px ${t.color}50`,
                          }}
                        >
                          {t.initials}
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-[15.5px]">{t.name}</p>
                        <p className="text-white/40 text-[13px] mt-0.5">{t.role}</p>
                      </div>
                      <div className="ml-auto hidden sm:flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm star-glow">★</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
