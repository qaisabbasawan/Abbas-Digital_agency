import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import RevealText from './anim/RevealText'
import { HOMEPAGE_FAQS } from '../data/faqs'

/* Accessible FAQ accordion. The same Q&A is emitted as FAQPage JSON-LD via
   homepageFaqSchema() so the visible content and structured data stay in sync. */
export default function FAQ({ faqs = HOMEPAGE_FAQS, eyebrow = 'Questions & Answers', heading = 'Frequently Asked Questions' }) {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-bg-dark overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand-blue/[0.06] blur-[130px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
          >
            {eyebrow}
          </motion.p>
          <RevealText as="h2" className="font-bold text-white leading-[1.06]" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.4rem)' }} stagger={0.07}>
            {heading}
          </RevealText>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.5 }}
                className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(8,14,42,0.5)', border: `1px solid ${isOpen ? 'rgba(46,85,224,0.4)' : 'rgba(255,255,255,0.08)'}` }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-5"
                >
                  <h3 className="text-white font-semibold text-[15px] sm:text-base">{f.q}</h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(46,85,224,0.16)', border: '1px solid rgba(46,85,224,0.4)' }}
                  >
                    <Plus size={15} className="text-brand-blue-light" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 text-white/55 text-[14px] leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
