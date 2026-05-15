import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Building2, Bell, Shield, Check, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const tabs = [
  { id: 'profile',  label: 'Profile',  icon: User },
  { id: 'password', label: 'Password', icon: Lock },
  { id: 'company',  label: 'Company',  icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
]

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">{label}</label>
      {children}
    </div>
  )
}

function Input({ ...props }) {
  return (
    <input {...props}
      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all" />
  )
}

export default function Settings() {
  const { user, users, persistUsers } = useAuth()
  const [tab, setTab]   = useState('profile')
  const [saved, setSaved] = useState('')
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const me = users.find(u => u.email === user?.email) || user || {}

  const [profile, setProfile] = useState({ name: me.name || '', email: me.email || '', phone: me.phone || '', bio: me.bio || '' })
  const [pwForm,  setPwForm]  = useState({ old: '', new1: '', new2: '' })
  const [company, setCompany] = useState({
    name:    'Abbas Digital Agency',
    website: 'https://abbasdigital.com',
    tagline: 'Building Digital Excellence',
    address: 'H 1-A, IVY Street, Banigala, Islamabad, Pakistan',
  })
  const [notifs, setNotifs] = useState({ newLead: true, blogComment: true, userAdded: false, weeklyReport: true })

  const flash = (msg) => { setSaved(msg); setTimeout(() => setSaved(''), 3000) }

  const saveProfile = () => {
    if (!profile.name || !profile.email) return
    const updated = users.map(u => u.email === user?.email ? { ...u, ...profile, initials: profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) } : u)
    persistUsers(updated)
    flash('Profile updated successfully')
  }

  const savePassword = () => {
    if (!pwForm.old || !pwForm.new1 || pwForm.new1 !== pwForm.new2) return
    flash('Password changed successfully')
    setPwForm({ old: '', new1: '', new2: '' })
  }

  const saveCompany = () => flash('Company info updated')
  const saveNotifs  = () => flash('Notification preferences saved')

  const sp = (k, v) => setProfile(f => ({ ...f, [k]: v }))
  const sc = (k, v) => setCompany(f => ({ ...f, [k]: v }))

  return (
    <div className="max-w-4xl mx-auto space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-white font-bold text-lg">Settings</h1>
        <p className="text-white/35 text-[12px] mt-0.5">Manage your account and panel preferences</p>
      </div>

      {/* Success toast */}
      {saved && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-[12px] text-green-400"
          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <Check size={14} /> {saved}
        </motion.div>
      )}

      <div className="flex gap-5 flex-col lg:flex-row">

        {/* Tabs sidebar */}
        <div className="lg:w-44 shrink-0">
          <div className="space-y-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  tab === t.id ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
                }`}>
                <t.icon size={15} strokeWidth={tab === t.id ? 2.2 : 1.8} />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <div className="flex-1 p-5 rounded-2xl space-y-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>

          {/* Profile tab */}
          {tab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
              <div className="flex items-center gap-4 pb-4 border-b border-white/[0.06]">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
                  {me.initials || profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) || 'U'}
                </div>
                <div>
                  <p className="text-white font-semibold">{profile.name || 'Your Name'}</p>
                  <p className="text-white/40 text-[12px]">{me.role || 'Admin'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name">
                  <Input value={profile.name} onChange={e => sp('name', e.target.value)} placeholder="John Doe" />
                </Field>
                <Field label="Email Address">
                  <Input value={profile.email} onChange={e => sp('email', e.target.value)} placeholder="john@example.com" type="email" />
                </Field>
                <Field label="Phone Number">
                  <Input value={profile.phone} onChange={e => sp('phone', e.target.value)} placeholder="+1 234 567 8900" />
                </Field>
              </div>

              <Field label="Short Bio">
                <textarea value={profile.bio} onChange={e => sp('bio', e.target.value)} rows={3}
                  placeholder="A brief description about yourself..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all resize-none" />
              </Field>

              <div className="flex items-center gap-2 pt-2">
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <Shield size={12} className="text-amber-400" />
                </div>
                <p className="text-white/30 text-[11px]">Your profile is visible to other admins in the panel.</p>
              </div>

              <button onClick={saveProfile} disabled={!profile.name || !profile.email}
                className="px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
                Save Profile
              </button>
            </motion.div>
          )}

          {/* Password tab */}
          {tab === 'password' && (
            <motion.div key="password" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-4">
              <p className="text-white/50 text-[13px] pb-2 border-b border-white/[0.06]">Choose a strong password with at least 8 characters, including a number and symbol.</p>

              {[
                { label: 'Current Password', key: 'old', show: showOld, toggle: () => setShowOld(v => !v) },
                { label: 'New Password',     key: 'new1', show: showNew, toggle: () => setShowNew(v => !v) },
                { label: 'Confirm New Password', key: 'new2', show: showNew, toggle: () => setShowNew(v => !v) },
              ].map(f => (
                <Field key={f.key} label={f.label}>
                  <div className="relative">
                    <input type={f.show ? 'text' : 'password'} value={pwForm[f.key]}
                      onChange={e => setPwForm(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 pr-10 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all" />
                    <button onClick={f.toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                      {f.show ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </Field>
              ))}

              {pwForm.new1 && pwForm.new2 && pwForm.new1 !== pwForm.new2 && (
                <p className="text-red-400 text-[11px]">Passwords do not match</p>
              )}

              <button onClick={savePassword}
                disabled={!pwForm.old || !pwForm.new1 || pwForm.new1 !== pwForm.new2}
                className="px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
                Update Password
              </button>
            </motion.div>
          )}

          {/* Company tab */}
          {tab === 'company' && (
            <motion.div key="company" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Company Name">
                  <Input value={company.name} onChange={e => sc('name', e.target.value)} placeholder="Abbas Digital Agency" />
                </Field>
                <Field label="Website">
                  <Input value={company.website} onChange={e => sc('website', e.target.value)} placeholder="https://example.com" />
                </Field>
              </div>
              <Field label="Tagline">
                <Input value={company.tagline} onChange={e => sc('tagline', e.target.value)} placeholder="Your tagline..." />
              </Field>
              <Field label="Primary Address">
                <Input value={company.address} onChange={e => sc('address', e.target.value)} placeholder="Street, City, Country" />
              </Field>
              <button onClick={saveCompany}
                className="px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
                Save Company Info
              </button>
            </motion.div>
          )}

          {/* Notifications tab */}
          {tab === 'notifications' && (
            <motion.div key="notifications" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-4">
              {[
                { key: 'newLead',       label: 'New Lead',            desc: 'Alert when someone submits the contact form' },
                { key: 'blogComment',   label: 'Blog Comments',       desc: 'Notify on new blog post comments' },
                { key: 'userAdded',     label: 'User Added/Removed',  desc: 'Alert when team members are modified' },
                { key: 'weeklyReport',  label: 'Weekly Report',       desc: 'Summary of traffic and activity every Monday' },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
                  <div>
                    <p className="text-white/80 text-[13px] font-medium">{n.label}</p>
                    <p className="text-white/35 text-[11px] mt-0.5">{n.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifs(v => ({ ...v, [n.key]: !v[n.key] }))}
                    className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 ${notifs[n.key] ? 'bg-brand-pink' : 'bg-white/10'}`}
                    style={{ width: 40, height: 22 }}>
                    <span className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform duration-200 ${notifs[n.key] ? 'translate-x-5' : 'translate-x-0.5'}`}
                      style={{ width: 18, height: 18, top: 2, left: notifs[n.key] ? 20 : 2 }} />
                  </button>
                </div>
              ))}
              <button onClick={saveNotifs}
                className="px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-opacity hover:opacity-90 mt-2"
                style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
                Save Preferences
              </button>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  )
}
