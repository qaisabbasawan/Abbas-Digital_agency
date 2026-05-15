import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, User, Tag, BookOpen } from 'lucide-react'
import Footer from '../components/Footer'
import { useAuth } from '../admin/context/AuthContext'

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

export default function BlogDetailPage() {
  const { slug } = useParams()
  const { blogs } = useAuth()
  const navigate = useNavigate()

  const blog = blogs.find(b => b.slug === slug && b.status === 'published')

  if (!blog) {
    return (
      <div className="min-h-screen bg-bg-dark pt-[72px] flex flex-col items-center justify-center text-center px-5">
        <BookOpen size={52} className="text-white/10 mb-5" />
        <h1 className="text-white font-bold text-2xl mb-2">Article not found</h1>
        <p className="text-white/40 text-[14px] mb-6">This article may have been removed or is not published yet.</p>
        <Link to="/blog" className="flex items-center gap-2 text-brand-pink text-[13px] hover:underline">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>
    )
  }

  const color = catColors[blog.category] || '#6366F1'

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">

      {/* Hero / cover */}
      <div className="relative w-full" style={{ minHeight: 320 }}>
        {blog.image ? (
          <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(7,12,27,0.3) 0%, rgba(7,12,27,0.85) 100%)' }} />
          </div>
        ) : (
          <div className="w-full h-[220px] md:h-[300px]"
            style={{ background: `linear-gradient(135deg, ${color}20, ${color}08)` }}>
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen size={56} className="text-white/10" />
            </div>
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/35 text-[13px] hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Blog
          </button>
        </motion.div>

        {/* Category + read time */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex items-center gap-3 flex-wrap mb-4">
          {blog.category && (
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full"
              style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}>
              {blog.category}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-white/30 text-[12px]">
            <Clock size={11} /> {readTime(blog.content)} min read
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.6 }}
          className="text-white font-bold leading-tight mb-4" style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)' }}>
          {blog.title}
        </motion.h1>

        {/* Meta */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-wrap items-center gap-4 text-white/30 text-[12px] mb-6 pb-6 border-b border-white/[0.07]">
          {blog.author && (
            <span className="flex items-center gap-1.5"><User size={11} /> {blog.author}</span>
          )}
          {blog.date && (
            <span className="flex items-center gap-1.5"><Calendar size={11} /> {blog.date}</span>
          )}
        </motion.div>

        {/* Meta description as lead */}
        {blog.metaDesc && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/55 text-[16px] leading-relaxed mb-8 italic border-l-2 pl-4"
            style={{ borderColor: color }}>
            {blog.metaDesc}
          </motion.p>
        )}

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
          className="prose-blog text-white/75 text-[15px] leading-[1.85] whitespace-pre-wrap">
          {blog.content || <span className="text-white/25 italic">No content available.</span>}
        </motion.div>

        {/* Tags */}
        {(() => {
          const tagList = blog.tags
            ? (Array.isArray(blog.tags) ? blog.tags : blog.tags.split(',').map(t => t.trim()).filter(Boolean))
            : []
          return tagList.length > 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="mt-10 pt-6 border-t border-white/[0.07]">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={13} className="text-white/25" />
                {tagList.map(tag => (
                  <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] text-white/40 border border-white/[0.07]">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : null
        })()}

        {/* Back to blog CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/[0.07] text-center">
          <p className="text-white/30 text-[13px] mb-4">Want to read more?</p>
          <Link to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
            <ArrowLeft size={14} /> Browse All Articles
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
