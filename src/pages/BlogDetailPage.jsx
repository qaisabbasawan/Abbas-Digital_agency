import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Calendar, User, Tag, BookOpen, Sparkles } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import Footer from '../components/Footer'
import TiltCard from '../components/anim/TiltCard'
import Magnetic from '../components/anim/Magnetic'
import { useAuth } from '../admin/context/AuthContext'
import { mdComponents } from '../lib/mdComponents'
import SEO from '../components/SEO'
import { articleSchema, breadcrumbSchema } from '../lib/schema'

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

function readTime(content = '') {
  const words = content.split(' ').filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

/* Small glass meta chip in the hero */
function MetaChip({ Icon, children, color }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] text-white/70"
      style={{
        background: 'rgba(8,14,42,0.55)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
      <Icon size={12} style={{ color }} /> {children}
    </span>
  )
}

/* Compact related-article tilt card */
function RelatedCard({ blog, i }) {
  const color = catColors[blog.category] || '#6366F1'
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <TiltCard max={8} glareColor={`${color}22`} glareSize={340}>
        <Link
          to={`/blog/${blog.slug}`}
          className="group relative flex flex-col h-full rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(8,14,42,0.45)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="holo-sweep z-20" />
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ border: `1px solid ${color}55`, boxShadow: `0 0 28px ${color}1E` }} />
          <div className="h-36 relative overflow-hidden shrink-0"
            style={{ background: `linear-gradient(135deg, ${color}26, ${color}08)` }}>
            {blog.image
              ? <img src={blog.image} alt={blog.title} decoding="async" fetchPriority="high"
                  className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700 ease-out"
                  onError={e => e.target.style.display = 'none'} />
              : <div className="w-full h-full flex items-center justify-center">
                  <BookOpen size={28} style={{ color: `${color}70` }} strokeWidth={1.5} />
                </div>
            }
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/45 to-transparent" />
          </div>
          <div className="p-4 flex flex-col flex-1">
            <span className="self-start text-[9.5px] font-semibold px-2 py-0.5 rounded-full mb-2.5"
              style={{ background: `${color}1C`, color, border: `1px solid ${color}38` }}>
              {blog.category}
            </span>
            <h3 className="text-white/90 font-semibold text-[14px] leading-snug group-hover:text-white transition-colors line-clamp-2 mb-3">
              {blog.title}
            </h3>
            <div className="mt-auto flex items-center justify-between">
              <span className="flex items-center gap-1 text-white/25 text-[11px]">
                <Clock size={10} /> {readTime(blog.content)} min
              </span>
              <ArrowUpRight size={13} className="text-white/25 group-hover:rotate-45 transition-all duration-300" style={{ color: undefined }} />
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  )
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const { blogs } = useAuth()
  const navigate = useNavigate()

  const published = blogs.filter(b => b.status === 'published')
  const blog = published.find(b => b.slug === slug)

  if (!blog) {
    return (
      <div className="min-h-screen bg-bg-dark pt-[72px] flex flex-col items-center justify-center text-center px-5">
        <div className="relative mb-7">
          <div className="absolute inset-[-22px] rounded-full animate-spin-slower"
            style={{
              background: 'conic-gradient(from 0deg, transparent 20%, rgba(46,85,224,0.5) 45%, transparent 70%)',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
            }} />
          <BookOpen size={48} className="text-white/15" strokeWidth={1.3} />
        </div>
        <h1 className="text-white font-bold text-2xl mb-2">Article not found</h1>
        <p className="text-white/40 text-[14px] mb-7">This article may have been removed or is not published yet.</p>
        <Link to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-semibold text-white shimmer-btn hover:opacity-90 transition-opacity">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>
    )
  }

  const color = catColors[blog.category] || '#6366F1'
  const tagList = blog.tags
    ? (Array.isArray(blog.tags) ? blog.tags : blog.tags.split(',').map(t => t.trim()).filter(Boolean))
    : []

  const related = [
    ...published.filter(b => b.slug !== slug && b.category === blog.category),
    ...published.filter(b => b.slug !== slug && b.category !== blog.category),
  ].slice(0, 3)

  return (
    <div className="min-h-screen bg-bg-dark">
      <SEO
        title={`${blog.title} | Abbas Digital Agency`}
        description={blog.metaDesc || blog.title}
        keywords={tagList.join(', ')}
        path={`/blog/${blog.slug}`}
        image={blog.image || undefined}
        type="article"
        publishedTime={blog.date ? new Date(blog.date).toISOString() : undefined}
        modifiedTime={(blog.updatedAt || blog.date) ? new Date(blog.updatedAt || blog.date).toISOString() : undefined}
        schema={[
          articleSchema(blog),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: blog.title, path: `/blog/${blog.slug}` },
          ]),
        ]}
      />

      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-5 sm:px-8 pt-[88px] pb-1">
        <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-white/40">
          <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
          <li aria-hidden className="text-white/25">/</li>
          <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          <li aria-hidden className="text-white/25">/</li>
          <li className="text-white/70 line-clamp-1 max-w-[60vw]" aria-current="page">{blog.title}</li>
        </ol>
      </nav>

      {/* ── Cinematic cover hero ── */}
      <section className="relative overflow-hidden pt-[72px]">
        <div className="relative w-full h-[46vh] min-h-[340px] md:h-[56vh] overflow-hidden">
          {blog.image ? (
            <motion.img
              src={blog.image} alt={blog.title}
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-cover"
              onError={e => e.target.style.display = 'none'}
            />
          ) : (
            <div className="w-full h-full" style={{ background: `radial-gradient(ellipse 80% 90% at 50% 10%, ${color}30, transparent 70%)` }} />
          )}
          {/* readability gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/55 to-bg-dark/20" />
          <div className="absolute inset-0 opacity-50 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${color}1E, transparent 70%)` }} />

          {/* hero content pinned to bottom */}
          <div className="absolute inset-x-0 bottom-0 pb-10">
            <div className="max-w-4xl mx-auto px-5 sm:px-8">
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="flex items-center gap-2.5 flex-wrap mb-5">
                <button onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] text-white/60 hover:text-white transition-colors"
                  style={{
                    background: 'rgba(8,14,42,0.55)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                  <ArrowLeft size={12} /> Back
                </button>
                {blog.category && (
                  <span className="text-[11px] font-bold px-3.5 py-1.5 rounded-full text-white"
                    style={{ background: color, boxShadow: `0 0 18px ${color}60` }}>
                    {blog.category}
                  </span>
                )}
              </motion.div>

              <div className="overflow-hidden pb-[0.1em] -mb-[0.1em]" style={{ perspective: 900 }}>
                <motion.h1
                  initial={{ y: '105%', rotateX: -55, opacity: 0 }}
                  animate={{ y: 0, rotateX: 0, opacity: 1 }}
                  transition={{ delay: 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className="text-white font-bold leading-[1.12] mb-5"
                  style={{ fontSize: 'clamp(1.8rem,4.2vw,3.2rem)', transformOrigin: '50% 100%' }}
                >
                  {blog.title}
                </motion.h1>
              </div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
                className="flex flex-wrap gap-2.5">
                {blog.author && <MetaChip Icon={User} color={color}>{blog.author}</MetaChip>}
                {blog.date && <MetaChip Icon={Calendar} color={color}>{blog.date}</MetaChip>}
                <MetaChip Icon={Clock} color={color}>{readTime(blog.content)} min read</MetaChip>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article body ── */}
      <div className="relative overflow-hidden">
        <div className="absolute top-40 -left-32 w-[420px] h-[420px] rounded-full blur-[140px] pointer-events-none opacity-40" style={{ background: `${color}14` }} />
        <div className="absolute bottom-40 -right-32 w-[380px] h-[380px] rounded-full blur-[130px] pointer-events-none opacity-40" style={{ background: 'rgba(232,21,90,0.08)' }} />

        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-12">

          {/* Lead / standfirst */}
          {blog.metaDesc && (
            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="relative mb-10 p-6 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(8,14,42,0.45)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: `inset 3px 0 0 ${color}`,
              }}
            >
              <Sparkles size={14} className="mb-2.5" style={{ color }} />
              <p className="text-white/65 text-[16px] leading-relaxed">{blog.metaDesc}</p>
            </motion.div>
          )}

          {/* Markdown content */}
          <motion.article
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            {blog.content
              ? <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={mdComponents}>{blog.content}</ReactMarkdown>
              : <p className="text-white/25 italic">No content available.</p>
            }
          </motion.article>

          {/* Tags */}
          {tagList.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="mt-12 pt-7 border-t border-white/[0.07]">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={13} style={{ color }} />
                {tagList.map(tag => (
                  <span key={tag} className="text-[11px] px-3 py-1.5 rounded-full text-white/55 transition-colors hover:text-white"
                    style={{ background: `${color}10`, border: `1px solid ${color}30` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Author card */}
          {blog.author && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6 }}
              className="mt-10 flex items-center gap-4 p-5 rounded-2xl"
              style={{
                background: 'rgba(8,14,42,0.45)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-white text-lg"
                style={{ background: `radial-gradient(circle at 32% 28%, ${color}66, ${color}1A 75%)`, border: `1px solid ${color}45`, boxShadow: `0 0 20px ${color}30` }}>
                {blog.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white/35 text-[10px] uppercase tracking-[0.2em] mb-0.5">Written by</p>
                <p className="text-white text-[15px] font-semibold">{blog.author}</p>
                <p className="text-white/35 text-[12px]">Abbas Digital Agency</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Related articles ── */}
      {related.length > 0 && (
        <section className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <p className="text-[11px] tracking-[0.28em] uppercase mb-2" style={{ color }}>Keep Reading</p>
              <h2 className="text-white font-bold" style={{ fontSize: 'clamp(1.4rem,2.6vw,2rem)' }}>Related Articles</h2>
            </div>
            <Link to="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-[13px] text-white/45 hover:text-white transition-colors">
              All articles <ArrowRight size={13} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((b, i) => <RelatedCard key={b.id} blog={b} i={i} />)}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden p-10 lg:p-14 text-center"
          style={{
            background: 'rgba(8,14,42,0.5)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 70px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full blur-[110px] pointer-events-none" style={{ background: `${color}1E` }} />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-[110px] pointer-events-none" style={{ background: 'rgba(232,21,90,0.12)' }} />
          <h2 className="relative font-bold text-white mb-4" style={{ fontSize: 'clamp(1.5rem,3vw,2.3rem)' }}>
            Want results like the ones you just read about?
          </h2>
          <p className="relative text-white/40 text-[15px] max-w-lg mx-auto mb-8 leading-relaxed">
            Let's talk about your project — free consultation, reply within 24 hours.
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
