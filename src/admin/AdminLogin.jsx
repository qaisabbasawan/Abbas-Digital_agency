import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react'
import { useAuth } from './context/AuthContext'

export default function AdminLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    const res = login(email, password)
    setLoading(false)
    if (res.ok) navigate('/admin/dashboard', { replace: true })
    else setError(res.error)
  }

  return (
    <div className="min-h-screen bg-[#070C1B] flex">

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#040810] p-12 border-r border-white/[0.06] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'rgba(46,85,224,0.12)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: 'rgba(232,21,90,0.08)' }} />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
              <Shield size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Abbas Digital Agency</span>
          </div>
          <p className="text-white/30 text-xs tracking-widest uppercase pl-12">Admin Panel</p>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-bold text-white mb-4 leading-tight" style={{ fontSize: 'clamp(2rem,3.5vw,3rem)' }}>
              Manage Your<br />
              <span style={{ backgroundImage: 'linear-gradient(135deg,#2E55E0,#E8155A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Digital Empire.
              </span>
            </h1>
            <p className="text-white/40 text-[14px] leading-relaxed max-w-sm">
              Full control over your website — blogs, analytics, leads, users and settings. All in one place.
            </p>
          </motion.div>

          <div className="mt-10 space-y-4">
            {[
              { label: 'Blog Management',    desc: 'Create, edit & publish articles' },
              { label: 'Real-time Analytics', desc: 'Track visitors & conversions' },
              { label: 'User & Role Control', desc: 'Manage team access & permissions' },
            ].map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: '#E8155A' }} />
                <div>
                  <p className="text-white/70 text-[13px] font-medium">{f.label}</p>
                  <p className="text-white/30 text-[11px]">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-white/20 text-[11px] relative z-10">
          © {new Date().getFullYear()} Abbas Digital Agency. Restricted Access.
        </p>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
              <Shield size={15} className="text-white" />
            </div>
            <span className="text-white font-bold">Abbas Digital Agency</span>
          </div>

          <h2 className="text-white font-bold text-2xl mb-1">Welcome back</h2>
          <p className="text-white/40 text-[13px] mb-8">Sign in to your admin account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-white/50 text-[11px] tracking-widest uppercase mb-2">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/50 text-[11px] tracking-widest uppercase mb-2">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type={showPw ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-10 py-3 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
                />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                  className="w-3.5 h-3.5 rounded accent-brand-pink" />
                <span className="text-white/40 text-[12px]">Remember me</span>
              </label>
              <button type="button" className="text-white/40 text-[12px] hover:text-white/70 transition-colors">Forgot password?</button>
            </div>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[12px] text-red-400"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <span>⚠</span> {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl text-white text-[13px] font-semibold tracking-wide transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #2E55E0, #E8155A)' }}
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : 'Sign In to Dashboard'}
            </button>
          </form>

          <p className="text-center text-white/20 text-[11px] mt-8">
            Restricted access. Authorised personnel only.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
