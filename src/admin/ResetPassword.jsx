import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Shield } from 'lucide-react'
import { useAuth } from './context/AuthContext'
import { ForgotPassword } from './AdminLogin'

const MIN_LENGTH = 10   // same rule as accounts created in User Management

/* Landing page for the reset link in Supabase's "Reset Password" email.
   The link signs the user in with a short-lived recovery session; here they
   choose a new password, then sign in again with it. */
export default function ResetPassword() {
  const { checkRecoveryLink, completePasswordReset } = useAuth()
  const navigate = useNavigate()
  const [link,     setLink]     = useState({ checking: true })
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState('')

  useEffect(() => {
    let cancelled = false
    checkRecoveryLink().then(res => { if (!cancelled) setLink(res) })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- check the link once, on arrival
  }, [])

  const tooShort = password.length > 0 && password.length < MIN_LENGTH
  const mismatch = confirm.length > 0 && password !== confirm
  const canSave  = password.length >= MIN_LENGTH && password === confirm && !saving

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSave) return
    setError('')
    setSaving(true)
    const res = await completePasswordReset(password)
    setSaving(false)
    if (res.ok) {
      navigate('/admin/login', { replace: true, state: { notice: 'Password updated. Sign in with your new password.' } })
    } else {
      setError(res.error)
    }
  }

  return (
    <div className="min-h-screen bg-[#070C1B] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md">

        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
            <Shield size={15} className="text-white" />
          </div>
          <span className="text-white font-bold">Abbas Digital Agency</span>
        </div>

        {link.checking && (
          <p className="text-white/50 text-[13px] flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
            Checking your reset link…
          </p>
        )}

        {!link.checking && !link.ok && (
          <>
            <div className="flex items-center gap-2 px-3.5 py-2.5 mb-8 rounded-xl text-[12px] text-amber-300"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
              <span>⚠</span> {link.error}
            </div>
            <ForgotPassword onBack={() => navigate('/admin/login')} />
          </>
        )}

        {link.ok && (
          <>
            <h1 className="text-white font-bold text-2xl mb-1">Choose a new password</h1>
            <p className="text-white/40 text-[13px] mb-8">
              For <span className="text-white/70">{link.email}</span>. Use at least {MIN_LENGTH} characters.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: 'new-password',     label: 'New Password',     value: password, set: setPassword },
                { id: 'confirm-password', label: 'Confirm Password', value: confirm,  set: setConfirm },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-white/50 text-[11px] tracking-widest uppercase mb-2">{f.label}</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                    <input id={f.id} type={showPw ? 'text' : 'password'} required autoComplete="new-password"
                      value={f.value} onChange={e => f.set(e.target.value)}
                      className="w-full bg-white/4 border border-white/8 rounded-xl pl-10 pr-10 py-3 text-white text-[13px] focus:outline-hidden focus:border-white/20 focus:bg-white/6 transition-all" />
                    {f.id === 'new-password' && (
                      <button type="button" onClick={() => setShowPw(v => !v)} aria-label={showPw ? 'Hide passwords' : 'Show passwords'}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {(tooShort || mismatch || error) && (
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[12px] text-red-400"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <span>⚠</span>
                  {error || (tooShort ? `Use at least ${MIN_LENGTH} characters.` : 'The passwords don’t match.')}
                </div>
              )}

              <button type="submit" disabled={!canSave}
                className="w-full py-3.5 rounded-xl text-white text-[13px] font-semibold tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
                {saving
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                  : 'Save New Password'}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  )
}
