import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { breadcrumbSchema } from '../lib/schema'
import { clientSites } from '../data/clientSites'
import RevealText from '../components/anim/RevealText'
import TiltCard from '../components/anim/TiltCard'
import Magnetic from '../components/anim/Magnetic'

/* Only real, live client work is listed — every card links to the site */
const projects = clientSites

/* Filter tabs: "All" plus each category that actually has projects */
const tabs = ['All', ...new Set(projects.map(p => p.cat))]

/* ItemList of the live client sites, so search and AI engines can read the portfolio */
const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Abbas Digital Agency client websites',
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'CreativeWork',
      name: p.title,
      url: p.url,
      description: p.desc,
      image: p.img,
      creator: { '@type': 'Organization', name: 'Abbas Digital Agency' },
    },
  })),
}

const catColors = {
  Web: '#2E55E0',
  'E-Commerce': '#E8155A',
  Mobile: '#A855F7',
  AI: '#0891B2',
  Marketing: '#F97316',
  Branding: '#D97706',
}

/* Live client sites open in a new tab; case studies render as plain cards */
function CardShell({ url, title, children, ...rest }) {
  if (!url) return <div {...rest}>{children}</div>
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" title={`Visit ${title} website`} {...rest}>
      {children}
    </a>
  )
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.62 },
})

export default function PortfolioPage() {
  const [active, setActive] = useState('All')
  const list = active === 'All' ? projects : projects.filter(p => p.cat === active)

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO
        title="Our Work & Portfolio | Abbas Digital Agency Pakistan"
        description="Live client websites built by Abbas Digital Agency: e-commerce stores, booking platforms and business sites for clients in the UK, Europe and Asia."
        keywords="Abbas Digital Agency portfolio, web design portfolio Pakistan, digital marketing projects Pakistan"
        path="/portfolio"
        image="/og/portfolio.jpg"
        schema={[portfolioSchema, breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
        ])]}
      />

      {/* Page hero */}
      <section className="relative py-20 lg:py-28 border-b border-white/6 overflow-hidden">
        {/* dot grid + aurora */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(ellipse 70% 80% at 35% 50%, #000 25%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 35% 50%, #000 25%, transparent 75%)',
          }}
        />
        <div className="absolute -top-24 right-0 w-[460px] h-[460px] bg-brand-pink/[0.07] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[380px] h-[380px] bg-brand-blue/8 rounded-full blur-[120px] pointer-events-none" />

        {/* ghost watermark */}
        <span
          aria-hidden
          className="absolute right-2 lg:right-10 bottom-0 font-bold leading-none select-none pointer-events-none hidden md:block"
          style={{
            fontSize: 'clamp(130px, 15vw, 240px)',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(255,255,255,0.055)',
          }}
        >
          500+
        </span>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
          <motion.p {...fade(0)} className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-5">
            Our Portfolio
          </motion.p>
          <h1 className="font-bold leading-none mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            <RevealText as="span" className="text-white inline-block" stagger={0.09}>
              Selected
            </RevealText>{' '}
            <RevealText as="span" className="inline-block" gradient delay={0.22} stagger={0.1}>
              Work.
            </RevealText>
          </h1>
          <motion.p {...fade(0.3)} className="text-white/50 text-[15px] max-w-md leading-relaxed">
            {projects.length} live client websites you can visit today — from e-commerce stores to booking platforms, across the UK, Europe, Pakistan and Indonesia.
          </motion.p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {tabs.map(t => {
              const count = t === 'All' ? projects.length : projects.filter(p => p.cat === t).length
              const isActive = active === t
              return (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={`relative px-4 py-2 text-xs tracking-widest uppercase rounded-full transition-colors duration-300 ${
                    isActive ? 'text-white font-semibold' : 'text-white/45 hover:text-white'
                  }`}
                  style={!isActive ? { border: '1px solid rgba(255,255,255,0.12)' } : { border: '1px solid transparent' }}
                >
                  {/* sliding gradient pill */}
                  {isActive && (
                    <motion.span
                      layoutId="portfolio-tab-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #2E55E0, #E8155A)',
                        boxShadow: '0 4px 24px rgba(232,21,90,0.35)',
                      }}
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    {t}
                    <span className={`text-[9px] ${isActive ? 'text-white/80' : 'text-white/30'}`}>{count}</span>
                  </span>
                </button>
              )
            })}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <TiltCard max={8} glareColor={`${p.from}29`}>
                    <CardShell
                      url={p.url}
                      title={p.title}
                      className="group relative flex flex-col h-full rounded-3xl overflow-hidden cursor-pointer"
                      style={{
                        background: `linear-gradient(165deg, ${p.from}1C, transparent 50%), linear-gradient(#0A1130, #0A1130)`,
                        border: `1px solid ${p.from}33`,
                      }}
                    >
                      {/* hover accent line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(90deg, ${p.from}, ${p.to})` }}
                      />

                      {/* Image area */}
                      <div
                        className="relative h-48 overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
                      >
                        <img
                          src={p.img}
                          alt={p.url ? `${p.title} website homepage` : p.title}
                          className={`w-full h-full object-cover ${p.url ? 'object-top' : ''} transition-transform duration-700 ease-out group-hover:scale-110`}
                          loading="lazy"
                          onError={e => { e.target.style.display = 'none' }}
                        />
                        {/* colour wash + dark blend */}
                        <div
                          className="absolute inset-0 mix-blend-soft-light pointer-events-none"
                          style={{ background: `linear-gradient(135deg, ${p.from}66, transparent 60%)` }}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#0A1130] via-black/15 to-black/10 pointer-events-none" />

                        {/* Category chip */}
                        <div
                          className="absolute top-3 left-3 px-2.5 py-1 rounded-full backdrop-blur-md"
                          style={{
                            background: `${catColors[p.cat]}30`,
                            border: `1px solid ${catColors[p.cat]}55`,
                          }}
                        >
                          <span className="text-white text-[10px] tracking-widest uppercase font-medium">{p.cat}</span>
                        </div>

                        {/* Year */}
                        <span className="absolute top-3.5 right-4 text-white/45 text-[11px] tracking-wider">{p.yr}</span>

                        {/* Metric — gradient numeral badge */}
                        <div
                          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full backdrop-blur-md"
                          style={{ background: 'rgba(5,9,26,0.65)', border: `1px solid ${p.to}55` }}
                        >
                          <span
                            className="text-[11px] font-bold tracking-wide"
                            style={{
                              background: `linear-gradient(90deg, ${p.to}, #fff)`,
                              WebkitBackgroundClip: 'text',
                              backgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            {p.metric}
                          </span>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="relative p-5 flex flex-col flex-1">
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold text-white text-[17px] leading-snug">{p.title}</h3>
                            <p className="text-white/40 text-[11px] mt-0.5 tracking-wide uppercase">{p.client}</p>
                          </div>
                          {/* hover arrow */}
                          <span
                            className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 group-hover:rotate-45"
                            style={{ border: `1px solid ${p.to}55`, background: `${p.to}14`, color: p.to }}
                          >
                            <ArrowUpRight size={14} strokeWidth={2} />
                          </span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {p.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full text-[10px] tracking-wide"
                              style={{
                                background: `${p.from}22`,
                                border: `1px solid ${p.from}44`,
                                color: p.from,
                                filter: 'brightness(1.6)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardShell>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 bg-bg-dark2 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.p
            {...fade(0)}
            className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4"
          >
            Start a Project
          </motion.p>
          <h2 className="font-bold leading-[1.08] mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            <RevealText as="span" className="text-white block" stagger={0.06}>
              Ready to Add Your Project
            </RevealText>
            <RevealText as="span" className="block" gradient delay={0.3} stagger={0.08}>
              to This List?
            </RevealText>
          </h2>
          <motion.p
            {...fade(0.3)}
            className="text-white/45 text-[15px] mb-10 max-w-sm mx-auto leading-relaxed"
          >
            Tell us about your idea — we will turn it into something remarkable.
          </motion.p>
          <motion.div {...fade(0.4)}>
            <Magnetic>
              <Link
                to="/contact"
                className="shimmer-btn inline-flex items-center gap-2 px-10 py-3.5 text-sm text-white hover:opacity-90 transition-opacity"
              >
                Start Your Project
                <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
