import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, BookOpen, TrendingUp, ArrowUpRight, PenSquare, ExternalLink, BarChart2, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const GA_ID = 'G-B7C1MH1KZQ'

const statusColors = {
  New:       'bg-blue-500/15 text-blue-400',
  Contacted: 'bg-amber-500/15 text-amber-400',
  Qualified: 'bg-green-500/15 text-green-400',
  Closed:    'bg-green-600/20 text-green-300',
}

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso)) / 1000
  if (diff < 60)   return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function StatCard({ icon: Icon, label, value, color, delay, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-5 rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[50px] pointer-events-none" style={{ background: `${color}20` }} />
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
        <Icon size={18} style={{ color }} strokeWidth={1.8} />
      </div>
      <p className="text-white font-bold text-2xl leading-none mb-1">{value}</p>
      <p className="text-white/40 text-[12px]">{label}</p>
      {sub && <p className="text-white/25 text-[11px] mt-0.5">{sub}</p>}
    </motion.div>
  )
}

export default function Dashboard() {
  const { blogs, users, leads } = useAuth()
  const published = blogs.filter(b => b.status === 'published').length
  const drafts    = blogs.filter(b => b.status === 'draft').length
  const newLeads  = leads.filter(l => l.status === 'New').length
  const recentLeads = leads.slice(0, 5)

  // Blog activity: count posts per last 7 days
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split('T')[0]
  })
  const blogByDay = last7.map(day => blogs.filter(b => b.date === day || b.updatedAt === day).length)
  const maxBar = Math.max(...blogByDay, 1)
  const dayLabels = last7.map(d => new Date(d).toLocaleDateString('en', { weekday: 'short' }))

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-xl">Welcome back</h1>
          <p className="text-white/40 text-[13px] mt-0.5">Here's a real-time overview of your website activity.</p>
        </div>
        <Link to="/admin/blogs/create"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
          <PenSquare size={14} /> New Blog Post
        </Link>
      </div>

      {/* Real stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen}   label="Published Blogs" value={published}      sub={`${drafts} drafts`}        color="#8B5CF6" delay={0}    />
        <StatCard icon={TrendingUp} label="Total Leads"      value={leads.length}   sub={`${newLeads} new`}         color="#E8155A" delay={0.08} />
        <StatCard icon={Users}      label="Team Members"     value={users.length}   sub="Active users"              color="#10B981" delay={0.16} />
        <StatCard icon={Mail}       label="Unread Leads"     value={newLeads}       sub="Awaiting response"         color="#3B82F6" delay={0.24} />
      </div>

      {/* GA4 connected status */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl"
        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(16,185,129,0.12)' }}>
          <BarChart2 size={18} style={{ color: '#10B981' }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-white font-semibold text-[14px]">Google Analytics Connected</p>
            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live · {GA_ID}
            </span>
          </div>
          <p className="text-white/40 text-[12px]">All pages are being tracked. View detailed visitor analytics, traffic sources, and devices in Google Analytics.</p>
        </div>
        <a href={`https://analytics.google.com/analytics/web/#/p${GA_ID.replace('G-','')}/reports/reportinghub`}
          target="_blank" rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)' }}>
          Open Analytics <ExternalLink size={11} />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Blog activity chart (real) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="lg:col-span-2 p-5 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-white font-semibold text-[14px]">Blog Activity</p>
              <p className="text-white/35 text-[11px]">Posts created or updated — last 7 days</p>
            </div>
            <Link to="/admin/blogs/history" className="text-[11px] text-white/30 hover:text-white/60 transition-colors">View all →</Link>
          </div>
          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <p className="text-white/25 text-[13px]">No blog posts yet</p>
              <Link to="/admin/blogs/create" className="text-blue-400 text-[11px] mt-1 hover:underline">Create your first post →</Link>
            </div>
          ) : (
            <div className="flex items-end gap-2 h-32">
              {blogByDay.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col justify-end" style={{ height: '100%' }}>
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: v > 0 ? `${(v / maxBar) * 100}%` : 4 }}
                      transition={{ delay: 0.5 + i * 0.07, duration: 0.55, ease: 'easeOut' }}
                      className="w-full rounded-t-md"
                      style={{ background: v > 0 ? '#8B5CF6' : 'rgba(255,255,255,0.06)', minHeight: 4 }} />
                  </div>
                  <span className="text-white/25 text-[10px]">{dayLabels[i]}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Blog stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-5 rounded-2xl space-y-4"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-white font-semibold text-[14px]">Content Overview</p>
          {[
            { label: 'Published',  value: published,             color: '#10B981' },
            { label: 'Drafts',     value: drafts,                color: '#F59E0B' },
            { label: 'Total Posts',value: blogs.length,          color: '#8B5CF6' },
            { label: 'Total Leads',value: leads.length,          color: '#E8155A' },
            { label: 'New Leads',  value: newLeads,              color: '#3B82F6' },
            { label: 'Team Size',  value: users.length,          color: '#6366F1' },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between">
              <span className="text-white/50 text-[12px]">{s.label}</span>
              <span className="font-bold text-[15px]" style={{ color: s.color }}>{s.value}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Recent leads (real) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        className="p-5 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-white font-semibold text-[14px]">Recent Leads</p>
            <p className="text-white/35 text-[11px]">Real submissions from your contact form</p>
          </div>
          <span className="text-white/30 text-[11px]">{leads.length} total</span>
        </div>
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Mail size={28} className="text-white/10 mb-3" />
            <p className="text-white/35 text-[13px]">No leads yet</p>
            <p className="text-white/20 text-[11px] mt-1">When visitors submit your contact form, they'll appear here</p>
          </div>
        ) : (
          <div className="space-y-1">
            {recentLeads.map(lead => (
              <div key={lead.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-[11px] font-bold text-white/60 shrink-0">
                  {lead.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-[13px] font-medium truncate">{lead.name}</p>
                  <p className="text-white/30 text-[11px] truncate">{lead.service || lead.email}</p>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[lead.status] || statusColors.New}`}>
                  {lead.status}
                </span>
                <span className="text-white/25 text-[11px] shrink-0">{timeAgo(lead.date)}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Recent blog posts */}
      {blogs.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="p-5 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-white font-semibold text-[14px]">Recent Blog Posts</p>
            <Link to="/admin/blogs/history" className="text-[11px] text-white/30 hover:text-white/60 transition-colors">View all →</Link>
          </div>
          <div className="space-y-2">
            {blogs.slice(0,4).map(b => (
              <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${b.status === 'published' ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'}`}>
                  {b.status}
                </span>
                <p className="text-white/75 text-[13px] flex-1 truncate">{b.title}</p>
                <span className="text-white/25 text-[11px] shrink-0">{b.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'New Blog Post', path: '/admin/blogs/create',  color: '#3B82F6', icon: PenSquare },
          { label: 'View Blogs',    path: '/admin/blogs/history', color: '#8B5CF6', icon: BookOpen },
          { label: 'Manage Users',  path: '/admin/users',         color: '#10B981', icon: Users },
          { label: 'Settings',      path: '/admin/settings',      color: '#E8155A', icon: ArrowUpRight },
        ].map(q => (
          <Link key={q.label} to={q.path}
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[12px] font-medium text-white/60 hover:text-white transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <q.icon size={14} style={{ color: q.color }} />
            {q.label}
          </Link>
        ))}
      </motion.div>
    </div>
  )
}
