import { motion } from 'framer-motion'
import { ExternalLink, Globe, Smartphone, Monitor, BookOpen, TrendingUp, Users, Mail, BarChart2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const GA_ID   = 'G-B7C1MH1KZQ'
const GA_LINK = 'https://analytics.google.com/analytics/web/'

export default function Analytics() {
  const { blogs, users, leads } = useAuth()

  const published = blogs.filter(b => b.status === 'published').length
  const drafts    = blogs.filter(b => b.status === 'draft').length
  const newLeads  = leads.filter(l => l.status === 'New').length

  // Leads by service (real)
  const serviceCount = leads.reduce((acc, l) => {
    if (l.service) acc[l.service] = (acc[l.service] || 0) + 1
    return acc
  }, {})
  const topServices = Object.entries(serviceCount).sort((a, b) => b[1] - a[1]).slice(0, 5)

  // Blog posts by month (real — last 6 months)
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date()
    d.setMonth(d.getMonth() - (5 - i))
    return { label: d.toLocaleDateString('en', { month: 'short' }), key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` }
  })
  const blogsByMonth = months.map(m => ({
    ...m,
    count: blogs.filter(b => (b.date || b.updatedAt || '').startsWith(m.key)).length,
  }))
  const maxBlogs = Math.max(...blogsByMonth.map(m => m.count), 1)

  // Lead status breakdown (real)
  const leadStatuses = ['New', 'Contacted', 'Qualified', 'Closed']
  const leadStatusData = leadStatuses.map(s => ({
    label: s,
    count: leads.filter(l => l.status === s).length,
    color: s === 'New' ? '#3B82F6' : s === 'Contacted' ? '#F59E0B' : s === 'Qualified' ? '#10B981' : '#8B5CF6',
  }))

  return (
    <div className="max-w-6xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-lg">Analytics</h1>
          <p className="text-white/35 text-[12px] mt-0.5">Real data from your website · Powered by Google Analytics {GA_ID}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live Tracking
          </span>
          <a href={GA_LINK} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full bg-white/[0.05] text-white/50 border border-white/[0.08] hover:text-white hover:border-white/20 transition-colors">
            Open in GA4 <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Real stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: BookOpen,   label: 'Published Blogs', value: published,    sub: `${drafts} drafts`,       color: '#8B5CF6' },
          { icon: TrendingUp, label: 'Total Leads',      value: leads.length, sub: `${newLeads} new`,        color: '#E8155A' },
          { icon: Users,      label: 'Team Members',     value: users.length, sub: 'Active accounts',        color: '#10B981' },
          { icon: Mail,       label: 'New Leads',        value: newLeads,     sub: 'Awaiting response',      color: '#3B82F6' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="p-4 rounded-2xl relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-[40px] pointer-events-none" style={{ background: `${s.color}25` }} />
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
              <s.icon size={16} style={{ color: s.color }} strokeWidth={1.8} />
            </div>
            <p className="text-white font-bold text-2xl leading-none mb-0.5">{s.value}</p>
            <p className="text-white/50 text-[12px]">{s.label}</p>
            <p className="text-white/25 text-[10px] mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* GA4 visitor analytics banner */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-5 rounded-2xl"
        style={{ background: 'rgba(46,85,224,0.07)', border: '1px solid rgba(46,85,224,0.18)' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(46,85,224,0.15)' }}>
            <BarChart2 size={18} style={{ color: '#3B82F6' }} />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-[14px] mb-0.5">Visitor Analytics — View in Google Analytics</p>
            <p className="text-white/45 text-[12px]">
              Your site is being tracked with GA4 ({GA_ID}). Pageviews, traffic sources, devices, sessions, bounce rate and geographic data are all collected — open GA4 to view real-time and historical visitor reports.
            </p>
          </div>
          <a href={GA_LINK} target="_blank" rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
            Open Google Analytics <ExternalLink size={12} />
          </a>
        </div>
        <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {['Pageviews', 'Sessions', 'Traffic Sources', 'Device Types'].map(m => (
            <div key={m}>
              <p className="text-white/25 text-[10px] uppercase tracking-wide mb-1">{m}</p>
              <a href={GA_LINK} target="_blank" rel="noopener noreferrer"
                className="text-blue-400 text-[11px] hover:underline flex items-center justify-center gap-1">
                View in GA4 <ExternalLink size={9} />
              </a>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Blog activity chart (real) */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
          className="p-5 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-white font-semibold text-[14px] mb-1">Blog Posts by Month</p>
          <p className="text-white/35 text-[11px] mb-5">Posts created or updated — last 6 months</p>
          {blogs.length === 0 ? (
            <div className="flex items-center justify-center h-28 text-white/25 text-[13px]">No blog posts yet</div>
          ) : (
            <div className="flex items-end gap-2 h-28">
              {blogsByMonth.map((m, i) => (
                <div key={m.key} className="flex-1 flex flex-col items-center gap-1.5">
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: m.count > 0 ? `${(m.count / maxBlogs) * 100}%` : 4 }}
                    transition={{ delay: 0.45 + i * 0.07, duration: 0.55, ease: 'easeOut' }}
                    className="w-full rounded-t-md relative group"
                    style={{ background: m.count > 0 ? '#8B5CF6' : 'rgba(255,255,255,0.05)', minHeight: 4 }}>
                    {m.count > 0 && (
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/60 font-medium">{m.count}</span>
                    )}
                  </motion.div>
                  <span className="text-white/30 text-[10px]">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Lead status breakdown (real) */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
          className="p-5 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-white font-semibold text-[14px] mb-1">Lead Status Breakdown</p>
          <p className="text-white/35 text-[11px] mb-5">Current status of all contact form submissions</p>
          {leads.length === 0 ? (
            <div className="flex items-center justify-center h-28 text-white/25 text-[13px]">No leads yet — submissions will appear here</div>
          ) : (
            <div className="space-y-3.5">
              {leadStatusData.map((s, i) => (
                <div key={s.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-white/60 text-[12px]">{s.label}</span>
                    <span className="text-white/60 text-[12px] font-medium">{s.count} lead{s.count !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div initial={{ width: 0 }}
                      animate={{ width: leads.length ? `${(s.count / leads.length) * 100}%` : '0%' }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.65, ease: 'easeOut' }}
                      className="h-full rounded-full" style={{ background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Top services from leads (real) */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46 }}
        className="p-5 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-white font-semibold text-[14px] mb-1">Most Requested Services</p>
        <p className="text-white/35 text-[11px] mb-5">Based on real contact form submissions</p>
        {leads.length === 0 ? (
          <div className="text-center py-8 text-white/25 text-[13px]">No leads yet — service data will appear once visitors submit the contact form</div>
        ) : topServices.length === 0 ? (
          <div className="text-center py-8 text-white/25 text-[13px]">No service data available yet</div>
        ) : (
          <div className="space-y-3">
            {topServices.map(([service, count], i) => (
              <div key={service} className="flex items-center gap-4 py-2.5 px-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <span className="text-white/25 text-[12px] w-5 shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-white/70 text-[13px] font-medium">{service}</span>
                    <span className="text-white/50 text-[12px]">{count} lead{count !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div initial={{ width: 0 }}
                      animate={{ width: `${(count / leads.length) * 100}%` }}
                      transition={{ delay: 0.55 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                      className="h-full rounded-full" style={{ background: '#E8155A' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Device/geo — redirect to GA4 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: Smartphone, label: 'Mobile vs Desktop', desc: 'Device breakdown of your visitors', color: '#E8155A' },
          { icon: Globe,      label: 'Geographic Data',   desc: 'Countries and cities your traffic comes from', color: '#3B82F6' },
          { icon: BarChart2,  label: 'Traffic Sources',   desc: 'Organic, direct, social, referral split', color: '#8B5CF6' },
        ].map(c => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${c.color}15` }}>
              <c.icon size={15} style={{ color: c.color }} />
            </div>
            <p className="text-white/70 text-[13px] font-medium mb-1">{c.label}</p>
            <p className="text-white/30 text-[11px] mb-3">{c.desc}</p>
            <a href={GA_LINK} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-blue-400 hover:underline">
              View in Google Analytics <ExternalLink size={9} />
            </a>
          </motion.div>
        ))}
      </div>

    </div>
  )
}
