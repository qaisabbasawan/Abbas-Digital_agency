import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, PenSquare, Trash2, Eye, EyeOff, Plus, BookOpen } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

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

export default function BlogHistory() {
  const { blogs, persistBlogs } = useAuth()
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('all')
  const [deleteId, setDeleteId] = useState(null)

  const filtered = blogs
    .filter(b => filter === 'all' || b.status === filter)
    .filter(b => !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.category?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const toggleStatus = (id) => {
    const updated = blogs.map(b => b.id === id ? { ...b, status: b.status === 'published' ? 'draft' : 'published' } : b)
    persistBlogs(updated)
  }

  const confirmDelete = (id) => { persistBlogs(blogs.filter(b => b.id !== id)); setDeleteId(null) }

  const published = blogs.filter(b => b.status === 'published').length
  const drafts    = blogs.filter(b => b.status === 'draft').length

  return (
    <div className="max-w-6xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-lg">Blog History</h1>
          <p className="text-white/35 text-[12px] mt-0.5">{blogs.length} total posts · {published} published · {drafts} drafts</p>
        </div>
        <Link to="/admin/blogs/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
          <Plus size={14} /> New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Posts', value: blogs.length, color: '#6366F1' },
          { label: 'Published',   value: published,    color: '#10B981' },
          { label: 'Drafts',      value: drafts,       color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="font-bold text-2xl mb-0.5" style={{ color: s.color }}>{s.value}</p>
            <p className="text-white/40 text-[11px] uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search blogs..."
            className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl pl-9 pr-4 py-2.5 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/15" />
        </div>
        <div className="flex gap-2">
          {['all', 'published', 'draft'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-[12px] font-medium transition-all capitalize ${
                filter === f ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'
              }`}>
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Blog list */}
      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen size={36} className="text-white/15 mb-4" />
          <p className="text-white/40 text-[14px] font-medium mb-2">No blog posts yet</p>
          <p className="text-white/25 text-[12px] mb-5">Create your first blog post to get started</p>
          <Link to="/admin/blogs/create" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-medium text-white"
            style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
            <Plus size={14} /> Create First Post
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30 text-[13px]">No posts match your search.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((blog, i) => {
            const color = catColors[blog.category] || '#6366F1'
            return (
              <motion.div key={blog.id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex items-start gap-4 p-4 rounded-2xl group hover:bg-white/[0.02] transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>

                {/* Image */}
                <div className="w-16 h-16 rounded-xl shrink-0 overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}40, ${color}20)` }}>
                  {blog.image && <img src={blog.image} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${blog.status === 'published' ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'}`}>
                      {blog.status}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
                      {blog.category}
                    </span>
                  </div>
                  <h3 className="text-white/85 text-[14px] font-semibold leading-snug mb-1 truncate">{blog.title}</h3>
                  <p className="text-white/30 text-[11px]">By {blog.author} · {blog.date} · {blog.views || 0} views</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => toggleStatus(blog.id)} title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      blog.status === 'published' ? 'text-green-400 bg-green-500/10 hover:bg-green-500/20' : 'text-white/30 bg-white/[0.04] hover:bg-white/[0.08]'}`}>
                    {blog.status === 'published' ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <Link to={`/admin/blogs/create?edit=${blog.id}`}
                    className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                    <PenSquare size={14} />
                  </Link>
                  <button onClick={() => setDeleteId(blog.id)}
                    className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm p-6 rounded-2xl"
            style={{ background: '#0D1526', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 className="text-white font-bold text-lg mb-2">Delete Blog Post?</h3>
            <p className="text-white/45 text-[13px] mb-6">This action cannot be undone. The post will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl text-[13px] text-white/50 border border-white/[0.1] hover:border-white/25 hover:text-white transition-all">Cancel</button>
              <button onClick={() => confirmDelete(deleteId)} className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-red-500/80 hover:bg-red-500 transition-colors">Delete</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
