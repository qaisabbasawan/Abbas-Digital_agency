import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, BookOpen, TrendingUp, Eye, ArrowUpRight, PenSquare, Activity, Globe, Smartphone, Monitor } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const weekData = [65, 78, 52, 88, 94, 71, 83]
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const sources = [
  { label: 'Organic Search', pct: 48, color: '#3B82F6' },
  { label: 'Direct',         pct: 22, color: '#E8155A' },
  { label: 'Social Media',   pct: 18, color: '#8B5CF6' },
  { label: 'Referral',       pct: 12, color: '#10B981' },
]

const recentLeads = [
  { name: 'Ahmed Raza',   email: 'ahmed@example.com',  service: 'Web Development',   time: '2h ago',  status: 'New' },
  { name: 'Sara Ali',     email: 'sara@example.com',   service: 'E-Commerce',        time: '5h ago',  status: 'Contacted' },
  { name: 'John Miller',  email: 'john@example.com',   service: 'Mobile Apps',       time: '1d ago',  status: 'New' },
  { name: 'Fatima Khan',  email: 'fatima@example.com', service: 'Digital Marketing', time: '2d ago',  status: 'Qualified' },
]

const statusColors = {
  New:       'bg-blue-500/15 text-blue-400',
  Contacted: 'bg-amber-500/15 text-amber-400',
  Qualified: 'bg-green-500/15 text-green-400',
}

function StatCard({ icon: Icon, label, value, change, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-5 rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[50px] pointer-events-none" style={{ background: `${color}20` }} />
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
          <Icon size={18} style={{ color }} strokeWidth={1.8} />
        </div>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${change >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
      <p className="text-white font-bold text-2xl leading-none mb-1">{value}</p>
      <p className="text-white/40 text-[12px]">{label}</p>
    </motion.div>
  )
}

export default function Dashboard() {
  const { blogs, users } = useAuth()
  const published = blogs.filter(b => b.status === 'published').length

  const stats = [
    { icon: Eye,       label: 'Monthly Visitors',  value: '48,291', change: 12,  color: '#3B82F6' },
    { icon: TrendingUp, label: 'Total Leads',       value: '234',    change: 8,   color: '#E8155A' },
    { icon: BookOpen,  label: 'Published Blogs',   value: String(published || 0), change: published > 0 ? 20 : 0, color: '#8B5CF6' },
    { icon: Users,     label: 'Team Members',      value: String(users.length),   change: 5,   color: '#10B981' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-xl">Welcome back 👋</h1>
          <p className="text-white/40 text-[13px] mt-0.5">Here's what's happening with your website today.</p>
        </div>
        <Link to="/admin/blogs/create"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
          <PenSquare size={14} /> New Blog Post
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.08} />)}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Weekly traffic chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
          className="lg:col-span-2 p-5 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-white font-semibold text-[14px]">Website Traffic</p>
              <p className="text-white/35 text-[11px]">Daily visitors this week</p>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-green-500/10 text-green-400">+12% vs last week</span>
          </div>
          <div className="flex items-end gap-2 h-32">
            {weekData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }} animate={{ height: `${v}%` }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.6, ease: 'easeOut' }}
                  className="w-full rounded-t-lg"
                  style={{ background: i === 4 ? '#3B82F6' : 'rgba(59,130,246,0.3)', minHeight: 4 }}
                />
                <span className="text-white/25 text-[10px]">{days[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Traffic sources */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="p-5 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-white font-semibold text-[14px] mb-1">Traffic Sources</p>
          <p className="text-white/35 text-[11px] mb-5">Where visitors come from</p>
          <div className="space-y-3.5">
            {sources.map((s, i) => (
              <div key={s.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-white/60 text-[12px]">{s.label}</span>
                  <span className="text-white/60 text-[12px] font-medium">{s.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.7, ease: 'easeOut' }}
                    className="h-full rounded-full" style={{ background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Recent leads */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
          className="lg:col-span-2 p-5 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-5">
            <p className="text-white font-semibold text-[14px]">Recent Leads</p>
            <span className="text-white/30 text-[11px]">Contact form submissions</span>
          </div>
          <div className="space-y-1">
            {recentLeads.map((lead) => (
              <div key={lead.email} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-[11px] font-bold text-white/60 shrink-0">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-[13px] font-medium truncate">{lead.name}</p>
                  <p className="text-white/30 text-[11px] truncate">{lead.service}</p>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[lead.status]}`}>{lead.status}</span>
                <span className="text-white/25 text-[11px] shrink-0">{lead.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Device breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="p-5 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-white font-semibold text-[14px] mb-1">Devices</p>
          <p className="text-white/35 text-[11px] mb-6">Visitor device breakdown</p>
          {[
            { label: 'Mobile',  icon: Smartphone, pct: 58, color: '#E8155A' },
            { label: 'Desktop', icon: Monitor,    pct: 34, color: '#3B82F6' },
            { label: 'Tablet',  icon: Globe,      pct: 8,  color: '#8B5CF6' },
          ].map((d, i) => (
            <div key={d.label} className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${d.color}18` }}>
                <d.icon size={15} style={{ color: d.color }} strokeWidth={1.7} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-white/60 text-[12px]">{d.label}</span>
                  <span className="text-white/60 text-[12px]">{d.pct}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${d.pct}%` }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                    className="h-full rounded-full" style={{ background: d.color }} />
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Activity size={13} className="text-green-400" />
              <p className="text-white/40 text-[11px]"><span className="text-green-400 font-medium">127</span> active visitors right now</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'New Blog Post', path: '/admin/blogs/create', color: '#3B82F6', icon: PenSquare },
          { label: 'View Blogs',    path: '/admin/blogs/history', color: '#8B5CF6', icon: BookOpen },
          { label: 'Manage Users',  path: '/admin/users',         color: '#10B981', icon: Users },
          { label: 'Settings',      path: '/admin/settings',      color: '#E8155A', icon: ArrowUpRight },
        ].map(q => (
          <Link key={q.label} to={q.path}
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[12px] font-medium text-white/60 hover:text-white transition-all duration-200 group"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <q.icon size={14} style={{ color: q.color }} />
            {q.label}
          </Link>
        ))}
      </motion.div>
    </div>
  )
}
