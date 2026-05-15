import { motion } from 'framer-motion'
import { TrendingUp, Users, Eye, MousePointer, ArrowUpRight, Globe, Smartphone, Monitor } from 'lucide-react'

const monthData = [42, 58, 71, 65, 83, 77, 91, 88, 102, 95, 118, 134]
const months    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const maxMonth  = Math.max(...monthData)

const topPages = [
  { path: '/',              label: 'Home',              views: 18_420, bounce: '34%', time: '2m 18s' },
  { path: '/services',      label: 'Services',          views: 9_840,  bounce: '41%', time: '3m 05s' },
  { path: '/portfolio',     label: 'Portfolio',         views: 7_210,  bounce: '38%', time: '2m 52s' },
  { path: '/about',         label: 'About',             views: 4_930,  bounce: '29%', time: '1m 44s' },
  { path: '/contact',       label: 'Contact',           views: 3_760,  bounce: '22%', time: '4m 10s' },
  { path: '/blog',          label: 'Blog',              views: 2_140,  bounce: '55%', time: '1m 20s' },
]

const countries = [
  { name: 'Pakistan',       pct: 52, color: '#2E55E0' },
  { name: 'United States',  pct: 21, color: '#E8155A' },
  { name: 'United Kingdom', pct: 9,  color: '#8B5CF6' },
  { name: 'Canada',         pct: 7,  color: '#10B981' },
  { name: 'Other',          pct: 11, color: '#6B7280' },
]

const kpis = [
  { icon: Eye,          label: 'Total Pageviews',    value: '142,810', change: '+18%', color: '#3B82F6' },
  { icon: Users,        label: 'Unique Visitors',    value: '48,291',  change: '+12%', color: '#E8155A' },
  { icon: MousePointer, label: 'Avg. Session',       value: '2m 34s',  change: '+5%',  color: '#8B5CF6' },
  { icon: TrendingUp,   label: 'Conversion Rate',    value: '3.8%',    change: '+0.4%',color: '#10B981' },
]

export default function Analytics() {
  return (
    <div className="max-w-6xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-lg">Analytics</h1>
          <p className="text-white/35 text-[12px] mt-0.5">Last 30 days · Updated just now</p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live
        </span>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="p-4 rounded-2xl relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-[40px] pointer-events-none" style={{ background: `${k.color}25` }} />
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${k.color}18`, border: `1px solid ${k.color}30` }}>
              <k.icon size={16} style={{ color: k.color }} strokeWidth={1.8} />
            </div>
            <p className="text-white font-bold text-xl leading-none mb-1">{k.value}</p>
            <p className="text-white/40 text-[11px] mb-2">{k.label}</p>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">{k.change}</span>
          </motion.div>
        ))}
      </div>

      {/* Monthly traffic chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
        className="p-5 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white font-semibold text-[14px]">Monthly Traffic</p>
            <p className="text-white/35 text-[11px]">Visitor trend over the past 12 months</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: '#3B82F6' }} />
            <span className="text-white/40 text-[11px]">Visitors</span>
          </div>
        </div>
        <div className="flex items-end gap-1.5 h-40">
          {monthData.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <motion.div
                initial={{ height: 0 }} animate={{ height: `${(v / maxMonth) * 100}%` }}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.55, ease: 'easeOut' }}
                className="w-full rounded-t-md cursor-pointer group relative"
                style={{ background: i === 11 ? '#3B82F6' : 'rgba(59,130,246,0.25)', minHeight: 4 }}>
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0D1526] border border-white/10 rounded px-1.5 py-0.5 text-[9px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {v.toLocaleString()}
                </div>
              </motion.div>
              <span className="text-white/25 text-[9px]">{months[i]}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Top pages */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
          className="p-5 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-white font-semibold text-[14px] mb-1">Top Pages</p>
          <p className="text-white/35 text-[11px] mb-4">Most visited pages this month</p>
          <div className="space-y-1">
            {topPages.map((p, i) => (
              <div key={p.path} className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <span className="text-white/20 text-[11px] w-4 shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white/75 text-[12px] font-medium">{p.label}</p>
                  <p className="text-white/25 text-[10px] font-mono">{p.path}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-white/60 text-[12px] font-medium">{p.views.toLocaleString()}</p>
                  <p className="text-white/25 text-[10px]">{p.time}</p>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${
                  parseInt(p.bounce) < 35 ? 'bg-green-500/10 text-green-400' : 'bg-white/[0.06] text-white/35'
                }`}>{p.bounce}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Country breakdown */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="p-5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Globe size={14} className="text-white/40" />
              <p className="text-white font-semibold text-[14px]">Top Countries</p>
            </div>
            <div className="space-y-3">
              {countries.map((c, i) => (
                <div key={c.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/60 text-[12px]">{c.name}</span>
                    <span className="text-white/60 text-[12px] font-medium">{c.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
                      transition={{ delay: 0.55 + i * 0.08, duration: 0.65, ease: 'easeOut' }}
                      className="h-full rounded-full" style={{ background: c.color }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Device + referral quick stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
            className="p-5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-white font-semibold text-[14px] mb-4">Device Split</p>
            <div className="flex items-end gap-3 mb-4">
              {[
                { label: 'Mobile',  pct: 58, color: '#E8155A', icon: Smartphone },
                { label: 'Desktop', pct: 34, color: '#3B82F6', icon: Monitor },
                { label: 'Tablet',  pct: 8,  color: '#8B5CF6', icon: Globe },
              ].map(d => (
                <div key={d.label} className="flex-1 text-center">
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${d.color}18` }}>
                      <d.icon size={14} style={{ color: d.color }} />
                    </div>
                    <p className="text-white font-bold text-lg leading-none" style={{ color: d.color }}>{d.pct}%</p>
                    <p className="text-white/35 text-[10px]">{d.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
              {[{ pct: 58, color: '#E8155A' }, { pct: 34, color: '#3B82F6' }, { pct: 8, color: '#8B5CF6' }].map((d, i) => (
                <motion.div key={i} initial={{ flex: 0 }} animate={{ flex: d.pct }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.7, ease: 'easeOut' }}
                  className="h-full rounded-full" style={{ background: d.color }} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* SEO metrics */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Domain Authority',   value: '28',     sub: 'Moz DA score',           color: '#3B82F6' },
          { label: 'Backlinks',          value: '342',    sub: '+18 this month',          color: '#8B5CF6' },
          { label: 'Indexed Pages',      value: '47',     sub: 'Google Search Console',   color: '#10B981' },
          { label: 'Avg. Position',      value: '14.2',   sub: 'Google organic rank',     color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="font-bold text-2xl mb-0.5" style={{ color: s.color }}>{s.value}</p>
            <p className="text-white/70 text-[12px] font-medium">{s.label}</p>
            <p className="text-white/30 text-[10px] mt-0.5">{s.sub}</p>
          </div>
        ))}
      </motion.div>

    </div>
  )
}
