import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Rss, Clock, Tag, PenLine } from 'lucide-react'
import Footer from '../components/Footer'

/* Fake upcoming article cards */
const upcoming = [
  { tag: 'Web Dev',        color: '#2E55E0', title: '10 Next.js Performance Tricks That Actually Matter',       read: '6 min' },
  { tag: 'E-Commerce',     color: '#E8155A', title: 'How We Scaled a Shopify Store to $1M in 90 Days',          read: '8 min' },
  { tag: 'AI & Chatbots',  color: '#0891B2', title: 'Building a WhatsApp Bot with GPT-4 — Step by Step',        read: '10 min' },
  { tag: 'Marketing',      color: '#059669', title: 'The SEO Checklist We Use on Every Client Site',             read: '5 min' },
  { tag: 'Branding',       color: '#D97706', title: 'Why Most Logo Designers Get Brand Identity Wrong',          read: '7 min' },
  { tag: 'Mobile Apps',    color: '#7C3AED', title: 'React Native vs Flutter in 2025 — An Honest Comparison',   read: '9 min' },
]

const topics = ['Web Development', 'E-Commerce', 'Mobile Apps', 'AI & Chatbots', 'Digital Marketing', 'Branding & Design', 'Case Studies', 'Industry Insights']

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-[72px] overflow-hidden">

      {/* ══════════ HERO ══════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden border-b border-white/[0.06]">
        {/* Blobs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-70"
          style={{ background: 'rgba(46,85,224,0.07)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: 'rgba(232,21,90,0.06)' }} />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-16">

            {/* Left */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/[0.1] mb-8"
              >
                <Rss size={11} className="text-brand-pink" />
                <span className="text-white/50 text-[11px] tracking-[0.22em] uppercase">Abbas Blog</span>
              </motion.div>

              <div className="overflow-hidden mb-7">
                {['Insights, Guides', '& Case Studies.'].map((line, i) => (
                  <motion.h1
                    key={line}
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 + i * 0.13, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
                    className="font-bold leading-[0.9] tracking-tight block"
                    style={{
                      fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
                      ...(i === 1 ? {
                        backgroundImage: 'linear-gradient(135deg, #2E55E0, #E8155A)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        transform: 'translateZ(0)',
                      } : { color: 'white' }),
                    }}
                  >
                    {line}
                  </motion.h1>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.6 }}
                className="text-white/50 text-[15px] leading-relaxed max-w-lg mb-10"
              >
                Practical articles on web development, e-commerce, AI, marketing and branding — written by the team behind 500+ delivered projects.
              </motion.p>

              {/* Topics */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.55 }}
                className="flex flex-wrap gap-2"
              >
                {topics.map((t, i) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-[11px] tracking-wide border border-white/[0.1] text-white/40"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — floating article previews */}
            <div className="lg:w-[380px] relative h-[340px] hidden lg:block">
              {upcoming.slice(0, 3).map((a, i) => (
                <motion.div
                  key={a.title}
                  className="absolute w-full rounded-2xl p-4 overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    top: `${i * 90}px`,
                    right: 0,
                    zIndex: 3 - i,
                    opacity: 1 - i * 0.25,
                    scale: 1 - i * 0.05,
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-widest uppercase"
                      style={{ background: `${a.color}20`, color: a.color, border: `1px solid ${a.color}35` }}>
                      {a.tag}
                    </span>
                    <span className="text-white/25 text-[10px] flex items-center gap-1">
                      <Clock size={9} /> {a.read} read
                    </span>
                  </div>
                  <p className="text-white/75 text-[12.5px] font-medium leading-snug line-clamp-2">{a.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ COMING SOON ══════════ */}
      <section className="py-28 lg:py-36 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,21,90,0.05), transparent)' }} />

        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center relative z-10">

          {/* Animated icon */}
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [-3, 3, -3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-10"
            style={{ background: 'rgba(232,21,90,0.1)', border: '1px solid rgba(232,21,90,0.25)' }}
          >
            <PenLine size={38} className="text-brand-pink" strokeWidth={1.5} />
          </motion.div>

          {/* Coming soon label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-brand-pink/40" />
            <span className="text-brand-pink text-[11px] tracking-[0.32em] uppercase font-medium">Coming Soon</span>
            <div className="h-px w-12 bg-brand-pink/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold text-white mb-6 leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            We're Writing Something<br />Worth Reading.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/45 text-[15px] leading-relaxed max-w-xl mx-auto mb-14"
          >
            Our blog is in the works. We're crafting in-depth guides, real case studies and practical tips drawn from 10+ years of building digital products. Check back soon — it'll be worth the wait.
          </motion.p>

          {/* Progress bars */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-2xl p-6 mb-10 text-left max-w-md mx-auto"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-white/30 text-[10px] uppercase tracking-[0.22em] mb-5 text-center">Build Progress</p>
            {[
              { label: 'Design',      pct: 95, color: '#2E55E0' },
              { label: 'Articles',    pct: 40, color: '#E8155A' },
              { label: 'Dev',         pct: 70, color: '#7C3AED' },
              { label: 'Launch',      pct: 20, color: '#059669' },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-3 mb-3 last:mb-0">
                <span className="text-white/40 text-[11px] w-16 shrink-0">{item.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.9, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                  />
                </div>
                <span className="text-white/25 text-[11px] w-8 text-right">{item.pct}%</span>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.55 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/" className="shimmer-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm tracking-wide text-white font-medium hover:opacity-90 transition-opacity">
              ← Back to Home
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm text-white/55 border border-white/[0.14] rounded-sm hover:text-white hover:border-white/30 transition-all duration-250">
              Get in Touch
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════ PREVIEW ARTICLES ══════════ */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-3"
          >
            Coming Up
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.6 }}
            className="font-bold text-white mb-12"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
          >
            Articles in the Pipeline
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-6 rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Top border accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: a.color }} />

                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase"
                    style={{ background: `${a.color}18`, color: a.color, border: `1px solid ${a.color}35` }}>
                    {a.tag}
                  </span>
                  <span className="text-white/25 text-[11px] flex items-center gap-1.5">
                    <Clock size={10} /> {a.read} read
                  </span>
                </div>

                <h4 className="text-white/80 text-[14.5px] font-semibold leading-snug mb-4 group-hover:text-white transition-colors">
                  {a.title}
                </h4>

                <div className="flex items-center gap-1.5 text-white/25 text-[11px]">
                  <BookOpen size={11} />
                  <span>Notify me when published</span>
                </div>

                {/* Locked overlay */}
                <div className="absolute inset-0 rounded-2xl flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(to top left, ${a.color}08, transparent)` }}>
                  <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{ background: `${a.color}20`, color: a.color, border: `1px solid ${a.color}40` }}>
                    Coming Soon
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
