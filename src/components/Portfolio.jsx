import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import RevealText from './anim/RevealText'
import Magnetic from './anim/Magnetic'
import { clientSites } from '../data/clientSites'

const featured = clientSites.map(p => ({ ...p, metric: p.stat, metricLabel: p.statLabel }))

const catColors = {
  Web: '#2E55E0',
  'E-Commerce': '#E8155A',
  Mobile: '#A855F7',
  AI: '#0891B2',
  Marketing: '#F97316',
  Branding: '#D97706',
}

/* ── One stacking deck card ── */
function StackCard({ p, i, total, progress }) {
  /* Cards beneath the stack shrink progressively as new ones land on top */
  const targetScale = 1 - (total - 1 - i) * 0.045
  const scale = useTransform(progress, [i / total, 1], [1, targetScale])
  const catColor = catColors[p.cat]

  return (
    <div
      className="sticky mb-[7vh] lg:mb-[9vh]"
      style={{ top: `calc(13vh + ${i * 18}px)`, zIndex: i + 1 }}
    >
      <motion.div style={{ scale, transformOrigin: 'center top' }}>
        <div
          className="glass-card glass-card--solid group relative grid grid-cols-1 lg:grid-cols-[11fr_13fr] overflow-hidden rounded-[28px] border border-white/10 lg:h-[62vh] lg:max-h-[560px] lg:min-h-[440px]"
          style={{
            '--glass-tint': p.from,
            // opaque base layer underneath the colour tint — cards behind must not bleed through
            background: `linear-gradient(125deg, ${p.from}33 0%, transparent 52%, ${p.to}1C 100%), linear-gradient(#0A1130, #0A1130)`,
            boxShadow: '0 30px 90px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {/* ── Content ── */}
          <div className="relative flex flex-col p-7 sm:p-10 lg:p-12 order-last lg:order-first">
            {/* ghost watermark number */}
            <span
              aria-hidden
              className="absolute -bottom-6 right-4 font-bold leading-none select-none pointer-events-none"
              style={{
                fontSize: 'clamp(120px, 12vw, 190px)',
                color: 'transparent',
                WebkitTextStroke: `1.5px ${p.from}38`,
              }}
            >
              0{i + 1}
            </span>

            <div className="flex items-center justify-between mb-7">
              <span
                className="px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold text-white"
                style={{ background: `${catColor}26`, border: `1px solid ${catColor}55` }}
              >
                {p.cat}
              </span>
              <span className="text-white/30 text-[11px] tracking-[0.25em]">
                0{i + 1} / 0{total}
              </span>
            </div>

            <h3
              className="font-bold text-white leading-[1.05] mb-2"
              style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.5rem)' }}
            >
              {p.title}
            </h3>
            <p className="text-white/35 text-[11px] uppercase tracking-[0.2em] mb-5">{p.client} · {p.yr}</p>
            <p className="text-white/55 text-[14.5px] leading-relaxed max-w-md">{p.desc}</p>

            {/* Mini case study — Problem → Solution → Result (credibility + AI proof points) */}
            {(p.problem || p.solution || p.result) && (
              <dl className="mt-5 space-y-2.5 max-w-md">
                {[
                  { k: 'Problem',  v: p.problem,  c: '#E8155A' },
                  { k: 'Solution', v: p.solution, c: '#2E55E0' },
                  { k: 'Result',   v: p.result,   c: '#059669' },
                ].filter(r => r.v).map(r => (
                  <div key={r.k} className="flex gap-3">
                    <dt
                      className="shrink-0 text-[9.5px] font-bold uppercase tracking-[0.14em] pt-0.5 w-[58px]"
                      style={{ color: r.c }}
                    >
                      {r.k}
                    </dt>
                    <dd className="text-white/55 text-[13px] leading-relaxed">{r.v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {/* metric + tags + CTA pinned to the bottom */}
            <div className="mt-auto pt-8">
              <div className="flex items-end gap-3 mb-6">
                <span
                  className="font-bold leading-none"
                  style={{
                    fontSize: 'clamp(2.4rem, 3.6vw, 3.4rem)',
                    background: `linear-gradient(135deg, ${p.to}, #fff)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {p.metric}
                </span>
                <span className="text-white/40 text-[11px] uppercase tracking-[0.18em] pb-1.5">{p.metricLabel}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {p.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[11px] text-white/60"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {tag}
                  </span>
                ))}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Site: ${p.title}`}
                  className="ml-auto inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 hover:gap-3.5"
                  style={{ color: p.to }}
                >
                  Visit Site
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 group-hover:rotate-45"
                    style={{ border: `1px solid ${p.to}55`, background: `${p.to}14` }}
                  >
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Image ── */}
          <div className="relative h-60 sm:h-72 lg:h-auto overflow-hidden">
            <img
              src={p.img}
              alt={`${p.title} website homepage`}
              loading="lazy"
              onError={e => { e.target.style.display = 'none' }}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1200 ease-out group-hover:scale-[1.07]"
            />
            {/* blend into the card */}
            <div
              className="absolute inset-0 pointer-events-none hidden lg:block"
              style={{ background: 'linear-gradient(90deg, #0A1130 0%, transparent 32%)' }}
            />
            <div
              className="absolute inset-0 pointer-events-none lg:hidden"
              style={{ background: 'linear-gradient(0deg, transparent 55%, rgba(10,17,48,0.85) 100%)' }}
            />
            {/* colour wash */}
            <div
              className="absolute inset-0 mix-blend-soft-light pointer-events-none"
              style={{ background: `linear-gradient(135deg, ${p.from}66, transparent 60%)` }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Portfolio() {
  const deckRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="portfolio" className="py-28 lg:py-36 bg-bg-dark relative">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-16 lg:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
            >
              Our Work
            </motion.p>
            <h2
              className="font-bold leading-[1.04]"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
            >
              <RevealText as="span" className="text-white inline-block" stagger={0.08}>
                Work That
              </RevealText>{' '}
              <RevealText as="span" className="inline-block" gradient delay={0.25} stagger={0.09}>
                Performs.
              </RevealText>
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white/35 text-[13px] max-w-[230px] leading-relaxed sm:text-right"
          >
            Eight live client websites. Scroll through the deck — every card is a real site you can visit.
          </motion.p>
        </div>

        {/* ── Stacking deck ── */}
        <div ref={deckRef} className="relative">
          {featured.map((p, i) => (
            <StackCard key={p.id} p={p} i={i} total={featured.length} progress={scrollYProgress} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="mt-10 flex justify-center"
        >
          <Magnetic>
            <Link
              to="/portfolio"
              data-hc-target="portfolio"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-white/60 text-sm border border-white/15 hover:text-white hover:border-white/40 hover:bg-white/4 transition-all duration-300"
            >
              See All Projects
              <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/15 group-hover:border-white/40 group-hover:rotate-45 transition-all duration-300">
                <ArrowUpRight size={13} strokeWidth={2} />
              </span>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
