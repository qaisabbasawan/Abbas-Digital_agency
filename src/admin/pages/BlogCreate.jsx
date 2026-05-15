import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save, Send, ArrowLeft, Image, Tag, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const categories = ['Web Development', 'E-Commerce', 'Mobile Apps', 'AI & Chatbots', 'Digital Marketing', 'Branding & Design', 'Case Studies', 'Industry Insights']

export default function BlogCreate() {
  const { blogs, persistBlogs, user } = useAuth()
  const navigate = useNavigate()
  const [params]  = useSearchParams()
  const editId    = params.get('edit')
  const existing  = editId ? blogs.find(b => b.id === editId) : null

  const [form, setForm] = useState({
    title:       existing?.title || '',
    category:    existing?.category || categories[0],
    tags:        existing?.tags || '',
    image:       existing?.image || '',
    content:     existing?.content || '',
    metaTitle:   existing?.metaTitle || '',
    metaDesc:    existing?.metaDesc || '',
    status:      existing?.status || 'draft',
  })
  const [saved, setSaved] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = (status) => {
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const post = {
      id:       existing?.id || Date.now().toString(),
      ...form,
      status,
      slug,
      author:   user?.name || 'Admin',
      date:     existing?.date || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      views:    existing?.views || 0,
    }
    const updated = existing
      ? blogs.map(b => b.id === editId ? post : b)
      : [...blogs, post]
    persistBlogs(updated)
    setSaved(true)
    setTimeout(() => navigate('/admin/blogs/history'), 800)
  }

  const Input = ({ label, ...props }) => (
    <div>
      {label && <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">{label}</label>}
      <input {...props} className={`w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all ${props.className || ''}`} />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-white transition-colors">
          <ArrowLeft size={15} />
        </button>
        <div>
          <h1 className="text-white font-bold text-lg">{existing ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
          <p className="text-white/35 text-[12px]">Fill in the details and publish to the website</p>
        </div>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-[12px] text-green-400"
          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
          ✓ Blog post saved successfully! Redirecting...
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <Input label="Blog Title" placeholder="Enter a compelling blog title..." value={form.title} onChange={e => set('title', e.target.value)} />

            {form.title && (
              <div className="flex items-center gap-2">
                <span className="text-white/25 text-[11px]">URL slug:</span>
                <span className="text-blue-400 text-[11px] font-mono">/blog/{form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'your-post-title'}</span>
              </div>
            )}

            <div>
              <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Content</label>
              <textarea
                rows={14} value={form.content} onChange={e => set('content', e.target.value)}
                placeholder="Write your blog content here...&#10;&#10;Use headings, paragraphs and structure your article clearly."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all resize-none leading-relaxed"
              />
              <p className="text-white/20 text-[11px] mt-1">{form.content.length} characters · ~{Math.ceil(form.content.split(' ').filter(Boolean).length / 200)} min read</p>
            </div>
          </div>

          {/* SEO */}
          <div className="p-5 rounded-2xl space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 className="text-white/60 text-[11px] tracking-widest uppercase font-medium">SEO Settings</h3>
            <Input label="Meta Title" placeholder="SEO page title (60 chars max)" value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} />
            <div>
              <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Meta Description</label>
              <textarea rows={3} value={form.metaDesc} onChange={e => set('metaDesc', e.target.value)}
                placeholder="Brief description for search engines (160 chars max)"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all resize-none" />
              <p className={`text-[11px] mt-1 ${form.metaDesc.length > 160 ? 'text-red-400' : 'text-white/20'}`}>{form.metaDesc.length}/160</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">

          {/* Publish */}
          <div className="p-5 rounded-2xl space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 className="text-white/60 text-[11px] tracking-widest uppercase font-medium">Publish</h3>
            <div>
              <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-[13px] focus:outline-none focus:border-white/20">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleSave('published')} disabled={!form.title || !form.content}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
                <Send size={14} /> Publish Now
              </button>
              <button onClick={() => handleSave('draft')} disabled={!form.title}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium text-white/60 border border-white/[0.1] hover:text-white hover:border-white/20 transition-all disabled:opacity-40">
                <Save size={14} /> Save Draft
              </button>
            </div>
          </div>

          {/* Category & Tags */}
          <div className="p-5 rounded-2xl space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 className="text-white/60 text-[11px] tracking-widest uppercase font-medium">Category & Tags</h3>
            <div>
              <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-[13px] focus:outline-none focus:border-white/20">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Tags</label>
              <div className="relative">
                <Tag size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input value={form.tags} onChange={e => set('tags', e.target.value)}
                  placeholder="react, seo, web dev..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-3 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/20" />
              </div>
              <p className="text-white/20 text-[10px] mt-1">Comma-separated</p>
            </div>
          </div>

          {/* Featured image */}
          <div className="p-5 rounded-2xl space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 className="text-white/60 text-[11px] tracking-widest uppercase font-medium">Featured Image</h3>
            <div>
              <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Image URL</label>
              <div className="relative">
                <Image size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input value={form.image} onChange={e => set('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-3 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/20" />
              </div>
            </div>
            {form.image && (
              <div className="relative rounded-xl overflow-hidden h-32">
                <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                <button onClick={() => set('image', '')} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white/60 hover:text-white">
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
