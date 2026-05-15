import { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BarChart2, PenSquare, BookOpen, Users,
  Settings, LogOut, Menu, X, Bell, ChevronDown, Search,
  Globe, Layers,
} from 'lucide-react'
import { useAuth } from './context/AuthContext'

const nav = [
  { label: 'Dashboard',       icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Analytics',       icon: BarChart2,        path: '/admin/analytics' },
  { label: 'Create Blog',     icon: PenSquare,        path: '/admin/blogs/create' },
  { label: 'Blog History',    icon: BookOpen,         path: '/admin/blogs/history' },
  { label: 'Users',           icon: Users,            path: '/admin/users' },
  { label: 'Settings',        icon: Settings,         path: '/admin/settings' },
]

const roleColors = {
  'Super Admin':    'bg-red-500/15 text-red-400 border-red-500/25',
  'Admin':          'bg-blue-500/15 text-blue-400 border-blue-500/25',
  'Editor':         'bg-purple-500/15 text-purple-400 border-purple-500/25',
  'SEO Manager':    'bg-green-500/15 text-green-400 border-green-500/25',
  'Content Writer': 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  'Analyst':        'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  'Viewer':         'bg-white/10 text-white/50 border-white/10',
}

export { roleColors }

export default function AdminLayout() {
  const [sideOpen, setSideOpen]     = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate  = useNavigate()

  const handleLogout = () => { logout(); navigate('/admin') }
  const currentPage = nav.find(n => n.path === location.pathname)?.label || 'Dashboard'

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <Link to="/" target="_blank" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
            <Globe size={15} className="text-white" />
          </div>
          <div>
            <p className="text-white text-[12px] font-semibold leading-none">Abbas Digital</p>
            <p className="text-white/30 text-[10px] mt-0.5">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path
          return (
            <Link
              key={path} to={path}
              onClick={() => setSideOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                active
                  ? 'bg-white/[0.08] text-white'
                  : 'text-white/45 hover:text-white/80 hover:bg-white/[0.04]'
              }`}
            >
              <Icon size={16} strokeWidth={active ? 2.2 : 1.8} />
              {label}
              {active && <span className="ml-auto w-1 h-4 rounded-full" style={{ background: '#E8155A' }} />}
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-white/[0.06] space-y-2">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03]">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0"
            style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
            {user?.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[12px] font-medium truncate">{user?.name}</p>
            <p className="text-white/30 text-[10px] truncate">{user?.role}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-white/40 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-200">
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#070C1B] overflow-hidden">

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-56 shrink-0 bg-[#040810] border-r border-white/[0.06]">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sideOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setSideOpen(false)} />
            <motion.div initial={{ x: -224 }} animate={{ x: 0 }} exit={{ x: -224 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-56 bg-[#040810] border-r border-white/[0.06] z-50">
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="h-14 flex items-center gap-4 px-5 border-b border-white/[0.06] bg-[#070C1B] shrink-0">
          <button onClick={() => setSideOpen(true)} className="lg:hidden text-white/40 hover:text-white transition-colors">
            <Menu size={20} />
          </button>
          <div>
            <p className="text-white text-[14px] font-semibold">{currentPage}</p>
          </div>
          <div className="flex-1 hidden sm:flex items-center">
            <div className="relative ml-4 max-w-xs w-full">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
              <input placeholder="Search..." className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-8 pr-3 py-1.5 text-[12px] text-white/50 placeholder:text-white/20 focus:outline-none focus:border-white/15" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white transition-colors">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-pink" />
            </button>
            <div className="relative">
              <button onClick={() => setProfileOpen(v => !v)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] transition-colors">
                <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
                  {user?.initials}
                </div>
                <span className="text-white/60 text-[12px] hidden sm:block">{user?.name}</span>
                <ChevronDown size={12} className="text-white/30" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden z-50"
                    style={{ background: '#0D1526', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
                    <div className="px-4 py-3 border-b border-white/[0.06]">
                      <p className="text-white text-[13px] font-medium">{user?.name}</p>
                      <p className="text-white/35 text-[11px]">{user?.email}</p>
                    </div>
                    <Link to="/admin/settings" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-white/50 text-[12px] hover:text-white hover:bg-white/[0.04] transition-colors">
                      <Settings size={13} /> Settings
                    </Link>
                    <Link to="/" target="_blank" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-white/50 text-[12px] hover:text-white hover:bg-white/[0.04] transition-colors">
                      <Globe size={13} /> View Website
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-red-400/70 text-[12px] hover:text-red-400 hover:bg-red-500/[0.06] transition-colors border-t border-white/[0.06]">
                      <LogOut size={13} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
