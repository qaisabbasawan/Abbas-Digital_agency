import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Clock, ArrowRight, ArrowUpRight, BookOpen, Sparkles, PenTool, Layers } from 'lucide-react'
import Footer from '../components/Footer'
import BlogScene from '../components/BlogScene'
import RevealText from '../components/anim/RevealText'
import TiltCard from '../components/anim/TiltCard'
import Magnetic from '../components/anim/Magnetic'
import { useAuth } from '../admin/context/AuthContext'
import SEO from '../components/SEO'

const catColors = {
  'Web Development':   '#2E55E0',
  'E-Commerce':        '#E8155A',
  'Mobile Apps':       '#8B5CF6',
  'AI & Chatbots':     '#0891B2',
  'Digital Marketing': '#059669',
  'Branding & Design': '#D97706',
  'Case Studies':      '#F59E0B',
  'Industry Insights': '#6366F1',
}

const categories = ['All', 'Web Development', 'E-Commerce', 'Mobile Apps', 'AI & Chatbots', 'Digital Marketing', 'Branding & Design', 'Case Studies', 'Industry Insights']

function readTime(content = '') {
  const words = content.split(' ').filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

/* Floating glass chip under the hero heading */
function HeroChip({ Icon, label, value, color, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.55 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        className="flex items-center gap-3 px-5 py-3.5 rounded-2xl"
        style={{
          background: 'rgba(8,14,42,0.45)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid ${color}35`,
          boxShadow: `0 10px 36px rgba(0,0,0,0.35), 0 0 22px ${color}1C, inset 0 1px 0 rgba(255,255,255,0.07)`,
        }}
      >
        <Icon size={16} style={{ color }} />
        <div>
          <div className="text-white font-bold text-[15px] leading-none">{value}</div>
          <div className="text-white/35 text-[9px] uppercase tracking-[0.2em] mt-1">{label}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* Featured article — wide holographic tilt panel */
function FeaturedCard({ blog }) {
  const color = catColors[blog.category] || '#2E55E0'
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14"
    >
      <TiltCard max={4} glareColor={`${color}1A`} glareSize={620}>
        <Link
          to={`/blog/${blog.slug}`}
          className="group relative grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden block"
          style={{
            background: 'rgba(8,14,42,0.5)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: `1px solid ${color}30`,
            boxShadow: `0 24px 70px rgba(0,0,0,0.45), 0 0 40px ${color}14, inset 0 1px 0 rgba(255,255,255,0.06)`,
          }}
        >
          <div className="holo-sweep z-20" />

          {/* Visual */}
          <div className="h-60 lg:h-auto lg:min-h-[340px] relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${color}30, ${color}08 70%)` }}>
            {blog.image
              ? <img src={blog.image} alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                  onError={e => e.target.style.display = 'none'} />
              : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-[-26px] rounded-full animate-spin-slower"
                      style={{
                        background: `conic-gradient(from 0deg, transparent 20%, ${color}66 45%, transparent 70%)`,
                        WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                        mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                      }} />
                    <BookOpen size={56} style={{ color: `${color}90` }} strokeWidth={1.4} />
                  </div>
                </div>
              )}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/55 via-transparent to-transparent lg:bg-gradient-to-r" />
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full text-white"
                style={{ background: color, boxShadow: `0 0 18px ${color}70` }}>
                <Sparkles size={10} /> FEATURED
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-50"
              style={{ background: `${color}18` }} />
            <span className="self-start text-[11px] font-semibold px-3 py-1 rounded-full mb-5"
              style={{ background: `${color}1C`, color, border: `1px solid ${color}38` }}>
              {blog.category}
            </span>
            <h2 className="text-white font-bold leading-tight mb-4 group-hover:text-white/90 transition-colors"
              style={{ fontSize: 'clamp(1.5rem,2.6vw,2.3rem)' }}>
              {blog.title}
            </h2>
            {blog.metaDesc && <p className="text-white/40 text-[14px] leading-relaxed mb-6 line-clamp-3">{blog.metaDesc}</p>}
            <div className="flex items-center gap-4 text-white/30 text-[12px] mb-7">
              <span>By {blog.author}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{blog.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1"><Clock size={11} /> {readTime(blog.content)} min read</span>
            </div>
            <span className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide group-hover:gap-3.5 transition-all" style={{ color }}>
              Read Article <ArrowRight size={15} />
            </span>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  )
}

/* Standard article card — 3D tilt + holo sweep + colour-glow hover */
function ArticleCard({ blog, i }) {
  const color = catColors[blog.category] || '#6366F1'
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (i % 3) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <TiltCard max={8} glareColor={`${color}22`} glareSize={380}>
        <Link
          to={`/blog/${blog.slug}`}
          className="group relative flex flex-col h-full rounded-2xl overflow-hidden transition-shadow duration-500"
          style={{
            background: 'rgba(8,14,42,0.45)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          }}
        >
          <div className="holo-sweep z-20" />
          {/* hover glow border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ border: `1px solid ${color}55`, boxShadow: `0 0 32px ${color}20, inset 0 0 24px ${color}0A` }} />

          {/* Thumbnail */}
          <div className="h-44 relative overflow-hidden shrink-0"
            style={{ background: `linear-gradient(135deg, ${color}26, ${color}08)` }}>
            {blog.image
              ? <img src={blog.image} alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700 ease-out"
                  onError={e => e.target.style.display = 'none'} />
              : <div className="w-full h-full flex items-center justify-center">
                  <BookOpen size={34} style={{ color: `${color}70` }} strokeWidth={1.5} />
                </div>
            }
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/45 to-transparent" />
            <span className="absolute top-4 left-4 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md"
              style={{ background: `${color}28`, color: '#fff', border: `1px solid ${color}50` }}>
              {blog.category}
            </span>
          </div>

          {/* Body */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-white/90 font-semibold text-[15px] leading-snug mb-2 group-hover:text-white transition-colors line-clamp-2">
              {blog.title}
            </h3>
            {blog.metaDesc && <p className="text-white/35 text-[12px] leading-relaxed mb-4 line-clamp-2">{blog.metaDesc}</p>}
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 text-white/25 text-[11px]">
                <span>{blog.date}</span>
                <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                <span className="flex items-center gap-1"><Clock size={10} /> {readTime(blog.content)} min</span>
              </div>
              <span className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: `${color}1A`, border: `1px solid ${color}30` }}>
                <ArrowUpRight size={13} style={{ color }} className="group-hover:rotate-45 transition-transform duration-300" />
              </span>
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  )
}

export default function BlogPage() {
  const { blogs } = useAuth()
  const published = blogs.filter(b => b.status === 'published')

  const [search, setSearch] = useState('')
  const [active, setActive] = useState('All')

  const filtered = published
    .filter(b => active === 'All' || b.category === active)
    .filter(b => !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.category?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const featured = filtered[0]
  const rest = filtered.slice(1)
  const catCount = new Set(published.map(b => b.category).filter(Boolean)).size

  return (
    <div className="min-h-screen bg-bg-dark">
      <SEO
        title="Digital Marketing Blog | Abbas Digital Agency Pakistan"
        description="Expert articles on web development, SEO, digital marketing, AI chatbots, and e-commerce growth strategies. Insights from Abbas Digital Agency Islamabad."
        keywords="digital marketing blog Pakistan, SEO tips Pakistan, web development blog, digital agency blog Islamabad"
        path="/blog"
      />

      {/* ── 3D Hero ── */}
      <section className="relative min-h-[82vh] flex items-center overflow-hidden pt-[72px]">
        <div className="absolute inset-0">
          <BlogScene />
        </div>
        {/* readability gradients */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-bg-dark/85 via-bg-dark/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-bg-dark to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(232,21,90,0.08)', border: '1px solid rgba(232,21,90,0.25)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse" />
            <span className="text-brand-pink text-[11px] tracking-[0.28em] uppercase">The Knowledge Hub</span>
          </motion.div>

          <RevealText as="h1" delay={0.15} stagger={0.08}
            className="font-bold text-white leading-[1.04] mb-3"
            style={{ fontSize: 'clamp(2.7rem,6.5vw,5.4rem)' }}>
            Ideas that move
          </RevealText>
          <RevealText as="h1" delay={0.35} stagger={0.08} gradient
            className="font-bold leading-[1.04] mb-6"
            style={{ fontSize: 'clamp(2.7rem,6.5vw,5.4rem)' }}>
            businesses forward
          </RevealText>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/45 text-[16px] max-w-xl leading-relaxed mb-9"
          >
            Expert articles on web development, digital marketing, AI, and growing
            your business online — written by the team that builds it every day.
          </motion.p>

          {/* Glowing search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="group/search relative max-w-md mb-10"
          >
            <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-focus-within/search:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, #2E55E0, #E8155A)', filter: 'blur(6px)' }} />
            <div className="relative rounded-2xl"
              style={{ background: 'rgba(8,14,42,0.7)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/search:text-brand-pink transition-colors" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
                className="w-full bg-transparent rounded-2xl pl-11 pr-4 py-3.5 text-white text-[14px] placeholder:text-white/25 focus:outline-none" />
            </div>
          </motion.div>

          {/* Floating stat chips */}
          <div className="flex flex-wrap gap-4">
            <HeroChip Icon={PenTool} label="Articles" value={`${published.length}+`} color="#2E55E0" i={0} />
            <HeroChip Icon={Layers} label="Topics" value={catCount || categories.length - 1} color="#E8155A" i={1} />
            <HeroChip Icon={Sparkles} label="Fresh Insights" value="Weekly" color="#7C3AED" i={2} />
          </div>
        </div>
      </section>

      {/* ── Category orbit bar ── */}
      <div className="sticky top-[72px] z-30 border-y border-white/[0.06]"
        style={{ background: 'rgba(5,9,26,0.82)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex gap-1.5 overflow-x-auto py-3 scrollbar-hide">
            {categories.map(c => {
              const color = catColors[c] || '#ffffff'
              const isActive = active === c
              return (
                <button key={c} onClick={() => setActive(c)}
                  className="relative shrink-0 px-4 py-2 rounded-full text-[12px] font-medium transition-colors duration-300"
                  style={isActive
                    ? { color: '#fff' }
                    : { color: 'rgba(255,255,255,0.4)' }}>
                  {isActive && (
                    <motion.span
                      layoutId="blog-cat-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full"
                      style={c === 'All'
                        ? { background: 'linear-gradient(90deg, rgba(46,85,224,0.3), rgba(232,21,90,0.3))', border: '1px solid rgba(255,255,255,0.18)' }
                        : { background: `${color}26`, border: `1px solid ${color}55`, boxShadow: `0 0 18px ${color}30` }} />
                  )}
                  <span className="relative z-10">{c}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Articles ── */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="absolute top-20 left-0 w-[480px] h-[480px] rounded-full blur-[150px] pointer-events-none opacity-50" style={{ background: 'rgba(46,85,224,0.07)' }} />
        <div className="absolute bottom-20 right-0 w-[420px] h-[420px] rounded-full blur-[140px] pointer-events-none opacity-50" style={{ background: 'rgba(232,21,90,0.06)' }} />

        {/* Empty states */}
        {published.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="relative flex flex-col items-center justify-center py-28 text-center">
            <div className="relative mb-7">
              <div className="absolute inset-[-22px] rounded-full animate-spin-slower"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 20%, rgba(46,85,224,0.5) 45%, transparent 70%)',
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                }} />
              <BookOpen size={52} className="text-white/15" strokeWidth={1.3} />
            </div>
            <h2 className="text-white/60 text-xl font-semibold mb-2">No articles published yet</h2>
            <p className="text-white/25 text-[14px] max-w-sm">Our team is working on insightful content. Check back soon.</p>
          </motion.div>
        )}

        {published.length > 0 && filtered.length === 0 && (
          <div className="relative flex flex-col items-center justify-center py-24 text-center">
            <Search size={38} className="text-white/10 mb-4" />
            <p className="text-white/40 text-[15px]">No articles match your search.</p>
            <button onClick={() => { setSearch(''); setActive('All') }}
              className="mt-4 px-5 py-2 rounded-full text-[13px] text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(90deg, rgba(46,85,224,0.35), rgba(232,21,90,0.35))', border: '1px solid rgba(255,255,255,0.14)' }}>
              Clear filters
            </button>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {featured && <FeaturedCard key={featured.id} blog={featured} />}
        </AnimatePresence>

        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((blog, i) => <ArticleCard key={blog.id} blog={blog} i={i} />)}
          </div>
        )}

        {/* ── CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          className="relative mt-20 rounded-3xl overflow-hidden p-10 lg:p-14 text-center"
          style={{
            background: 'rgba(8,14,42,0.5)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 70px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full blur-[110px] pointer-events-none" style={{ background: 'rgba(46,85,224,0.14)' }} />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-[110px] pointer-events-none" style={{ background: 'rgba(232,21,90,0.12)' }} />
          <RevealText as="h2" className="relative font-bold text-white mb-4" style={{ fontSize: 'clamp(1.6rem,3.4vw,2.6rem)' }}>
            Ready to put these ideas to work?
          </RevealText>
          <p className="relative text-white/40 text-[15px] max-w-lg mx-auto mb-8 leading-relaxed">
            Reading is the first step. Let's turn strategy into a website, store, or campaign that actually grows your business.
          </p>
          <Magnetic>
            <Link to="/contact"
              className="relative inline-flex items-center gap-2.5 shimmer-btn px-9 py-4 rounded-full text-sm tracking-[0.12em] uppercase text-white font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200">
              Start a Project <ArrowRight size={15} />
            </Link>
          </Magnetic>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
