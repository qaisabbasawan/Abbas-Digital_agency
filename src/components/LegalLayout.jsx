import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import Footer from './Footer'
import RevealText from './anim/RevealText'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
})

/* Shared shell for legal pages (Privacy Policy, Terms & Conditions).
   Renders a branded hero + a styled long-form content column. `sections`
   is an array of { id, heading, body } where `body` is JSX. The in-page
   table of contents is built from the same array so the two never drift. */
export default function LegalLayout({ eyebrow, title, intro, updated, sections }) {
  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      {/* ── Hero ── */}
      <section className="relative py-20 lg:py-24 border-b border-white/[0.06] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(ellipse 70% 80% at 35% 50%, #000 25%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 35% 50%, #000 25%, transparent 75%)',
          }}
        />
        <div className="absolute -top-20 right-0 w-[440px] h-[440px] bg-brand-blue/[0.09] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[360px] h-[360px] bg-brand-pink/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-5">
            {eyebrow}
          </motion.p>
          <h1 className="font-bold leading-[1.04] mb-6" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.4rem)' }}>
            <RevealText as="span" className="text-white inline-block" stagger={0.08}>
              {title}
            </RevealText>
          </h1>
          <motion.p {...fade(0.25)} className="text-white/50 text-[15px] max-w-2xl leading-relaxed">
            {intro}
          </motion.p>
          {updated && (
            <motion.p {...fade(0.35)} className="inline-flex items-center gap-2 mt-7 text-white/40 text-[12px] px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07]">
              <ShieldCheck size={13} className="text-brand-pink" />
              Last updated: {updated}
            </motion.p>
          )}
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-1/3 -right-24 w-[380px] h-[380px] bg-brand-pink/[0.05] rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative grid lg:grid-cols-[200px_1fr] gap-10 lg:gap-14">
          {/* Table of contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-[96px]">
              <p className="text-white/35 text-[11px] uppercase tracking-[0.22em] mb-4">On This Page</p>
              <ul className="space-y-2.5">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-white/45 text-[13px] hover:text-white transition-colors duration-200 flex items-start gap-2 group leading-snug"
                    >
                      <span className="text-brand-pink/60 text-[11px] mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Body */}
          <div className="min-w-0">
            {sections.map((s, i) => (
              <motion.section
                key={s.id}
                id={s.id}
                {...fade(0)}
                className="scroll-mt-[96px] mb-11 last:mb-0"
              >
                <h2 className="text-white font-bold text-[22px] sm:text-[26px] leading-tight mb-4 flex items-baseline gap-3">
                  <span className="text-brand-pink/70 text-[15px] font-semibold">{String(i + 1).padStart(2, '0')}</span>
                  {s.heading}
                </h2>
                <div className="legal-body space-y-4 text-white/55 text-[15px] leading-relaxed">
                  {s.body}
                </div>
              </motion.section>
            ))}

            {/* Footer CTA */}
            <div className="mt-14 pt-10 border-t border-white/[0.07]">
              <p className="text-white/45 text-[14px] leading-relaxed">
                Questions about this policy? Reach our team at{' '}
                <a href="mailto:info@abbasdigitalagency.com" className="text-brand-pink hover:underline">
                  info@abbasdigitalagency.com
                </a>{' '}
                or visit our{' '}
                <Link to="/contact" className="text-brand-pink hover:underline">contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
