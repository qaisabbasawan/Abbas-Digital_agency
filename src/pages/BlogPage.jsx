import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react'
import Footer from '../components/Footer'
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

export default function BlogPage() {
  const { blogs } = useAuth()
  const published = blogs.filter(b => b.status === 'published')

  const [search, setSearch]   = useState('')
  const [active, setActive]   = useState('All')

  const filtered = published
    .filter(b => active === 'All' || b.category === active)
    .filter(b => !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.category?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const featured = filtered[0]
  const rest     = filtered.slice(1)

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px]">
      <SEO
        title="Digital Marketing Blog | Abbas Digital Agency Pakistan"
        description="Expert articles on web development, SEO, digital marketing, AI chatbots, and e-commerce growth strategies. Insights from Abbas Digital Agency Islamabad."
        keywords="digital marketing blog Pakistan, SEO tips Pakistan, web development blog, digital agency blog Islamabad"
        path="/blog"
      />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 border-b border-white/[0.06] overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-60" style={{ background: 'rgba(46,85,224,0.08)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full blur-[130px] pointer-events-none" style={{ background: 'rgba(232,21,90,0.06)' }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-brand-pink text-[11px] tracking-[0.28em] uppercase mb-4">Our Blog</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.6 }}
            className="font-bold text-white leading-tight mb-5" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
            Insights & Guides
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            className="text-white/45 text-[16px] max-w-xl leading-relaxed mb-8">
            Expert articles on web development, digital marketing, AI, and growing your business online.
          </motion.p>
          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
            className="relative max-w-md">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
              className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-white text-[14px] placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-all" />
          </motion.div>
        </div>
      </section>

      {/* Category tabs */}
      <div className="border-b border-white/[0.06] sticky top-[72px] z-30 bg-bg-dark/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map(c => (
              <button key={c} onClick={() => setActive(c)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                  active === c ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14">

        {/* No posts state */}
        {published.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BookOpen size={48} className="text-white/10 mb-5" />
            <h2 className="text-white/50 text-xl font-semibold mb-2">No articles published yet</h2>
            <p className="text-white/25 text-[14px] max-w-sm">Our team is working on insightful content. Check back soon.</p>
          </div>
        )}

        {/* No search results */}
        {published.length > 0 && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search size={36} className="text-white/10 mb-4" />
            <p className="text-white/40 text-[15px]">No articles match your search.</p>
            <button onClick={() => { setSearch(''); setActive('All') }} className="mt-3 text-brand-pink text-[13px] hover:underline">Clear filters</button>
          </div>
        )}

        {/* Featured post */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-12">
            <Link to={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/[0.14] transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              {/* Image */}
              <div className="h-56 lg:h-auto relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${catColors[featured.category] || '#2E55E0'}30, ${catColors[featured.category] || '#2E55E0'}10)` }}>
                {featured.image
                  ? <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e => e.target.style.display='none'} />
                  : <div className="w-full h-full flex items-center justify-center"><BookOpen size={48} className="text-white/10" /></div>
                }
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: catColors[featured.category] || '#2E55E0' }}>
                    FEATURED
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: `${catColors[featured.category] || '#2E55E0'}20`, color: catColors[featured.category] || '#2E55E0' }}>
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-white font-bold text-2xl lg:text-3xl leading-tight mb-3 group-hover:text-white/90 transition-colors">
                  {featured.title}
                </h2>
                {featured.metaDesc && <p className="text-white/40 text-[14px] leading-relaxed mb-5 line-clamp-2">{featured.metaDesc}</p>}
                <div className="flex items-center gap-4 text-white/30 text-[12px] mb-6">
                  <span>By {featured.author}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {readTime(featured.content)} min read</span>
                </div>
                <span className="inline-flex items-center gap-2 text-brand-pink text-[13px] font-medium group-hover:gap-3 transition-all">
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Rest of posts grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((blog, i) => {
              const color = catColors[blog.category] || '#6366F1'
              return (
                <motion.div key={blog.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}>
                  <Link to={`/blog/${blog.slug}`}
                    className="group flex flex-col h-full rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/[0.14] transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    {/* Thumbnail */}
                    <div className="h-44 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}25, ${color}10)` }}>
                      {blog.image
                        ? <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e => e.target.style.display='none'} />
                        : <div className="w-full h-full flex items-center justify-center"><BookOpen size={32} className="text-white/10" /></div>
                      }
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
                          {blog.category}
                        </span>
                      </div>
                      <h3 className="text-white/85 font-semibold text-[15px] leading-snug mb-2 group-hover:text-white transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      {blog.metaDesc && <p className="text-white/35 text-[12px] leading-relaxed mb-3 line-clamp-2">{blog.metaDesc}</p>}
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/25 text-[11px]">
                          <span>{blog.date}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Clock size={10} /> {readTime(blog.content)} min</span>
                        </div>
                        <ArrowRight size={14} className="text-white/20 group-hover:text-brand-pink group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
