import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Trash2, PenSquare, X, Shield, Eye, EyeOff, KeyRound } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { roleColors } from '../AdminLayout'

const roles = ['Super Admin', 'Admin', 'Editor', 'SEO Manager', 'Content Writer', 'Analyst', 'Viewer']

const EMPTY_FORM = { name: '', email: '', password: '', role: 'Editor', status: 'Active' }

export default function UserManagement() {
  const { users, saveTeamMember, deleteTeamMember, user: me } = useAuth()
  const canManage = me?.role === 'Super Admin'   // also enforced server-side
  const [search, setSearch]     = useState('')
  const [modal, setModal]       = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [form, setForm]         = useState(EMPTY_FORM)
  const [deleteId, setDeleteId] = useState(null)
  const [showPw, setShowPw]     = useState(false)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const openAdd = () => {
    setForm(EMPTY_FORM)
    setEditUser(null)
    setShowPw(false)
    setError('')
    setModal(true)
  }

  // Passwords are never readable — the field is only for setting a new one
  const openEdit = (u) => {
    setForm({ name: u.name, email: u.email, password: '', role: u.role, status: u.status })
    setEditUser(u)
    setShowPw(false)
    setError('')
    setModal(true)
  }

  const handleSave = async () => {
    if (!canSave || saving) return
    setSaving(true)
    setError('')
    const res = await saveTeamMember({
      ...(editUser ? { id: editUser.id } : { email: form.email }),
      name: form.name,
      role: form.role,
      status: form.status,
      ...(form.password ? { password: form.password } : {}),
    })
    setSaving(false)
    if (res.ok) setModal(false)
    else setError(res.error)
  }

  const filtered = users.filter(u =>
    !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  )

  const confirmDelete = async (id) => {
    const res = await deleteTeamMember(id)
    setDeleteId(null)
    if (!res.ok) window.alert(res.error)
  }

  const passwordOk = editUser ? (!form.password || form.password.length >= 10) : form.password.length >= 10
  const canSave = form.name && form.email && passwordOk

  return (
    <div className="max-w-6xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-lg">User Management</h1>
          <p className="text-white/35 text-[12px] mt-0.5">{users.length} team members · Manage roles and permissions</p>
        </div>
        {canManage && <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
          <Plus size={14} /> Add User
        </button>}
      </div>

      {/* Roles overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {['Super Admin', 'Admin', 'Editor', 'Other'].map(r => {
          const count = r === 'Other'
            ? users.filter(u => !['Super Admin', 'Admin', 'Editor'].includes(u.role)).length
            : users.filter(u => u.role === r).length
          const color = r === 'Super Admin' ? '#EF4444' : r === 'Admin' ? '#3B82F6' : r === 'Editor' ? '#8B5CF6' : '#6B7280'
          return (
            <div key={r} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="font-bold text-2xl mb-0.5" style={{ color }}>{count}</p>
              <p className="text-white/40 text-[11px]">{r}</p>
            </div>
          )
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
          className="w-full bg-white/4 border border-white/[0.07] rounded-xl pl-9 pr-4 py-2.5 text-white text-[13px] placeholder:text-white/20 focus:outline-hidden focus:border-white/15" />
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hidden sm:grid grid-cols-5 gap-4 px-5 py-3 border-b border-white/6 text-white/30 text-[10px] uppercase tracking-widest">
          <span className="col-span-2">User</span>
          <span>Role</span>
          <span>Status</span>
          <span>Last Login</span>
        </div>
        <div className="divide-y divide-white/4">
          {filtered.map((u, i) => (
            <motion.div key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
              className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4 px-5 py-4 hover:bg-white/2 transition-colors items-center">
              <div className="flex items-center gap-3 sm:col-span-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                  style={{ background: u.id === 1 ? 'linear-gradient(135deg,#2E55E0,#E8155A)' : 'rgba(255,255,255,0.07)' }}>
                  {u.initials}
                </div>
                <div>
                  <p className="text-white/85 text-[13px] font-medium">{u.name}</p>
                  <p className="text-white/30 text-[11px]">{u.email}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {u.email === me?.email && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/40">You</span>}
                  {u.hasLogin ? (
                    <span title="Can sign in" className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 flex items-center gap-1">
                      <KeyRound size={8} /> Login
                    </span>
                  ) : (
                    <span title="No login yet — set a password to create one" className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400">
                      No login
                    </span>
                  )}
                </div>
              </div>
              <div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${roleColors[u.role] || 'bg-white/10 text-white/50 border-white/10'}`}>
                  {u.role}
                </span>
              </div>
              <div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${u.status === 'Active' ? 'bg-green-500/15 text-green-400' : 'bg-white/10 text-white/40'}`}>
                  {u.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-[12px]">{u.lastLogin}</span>
                {canManage && <div className="flex gap-1.5">
                  <button onClick={() => openEdit(u)}
                    className="w-7 h-7 rounded-lg bg-white/4 flex items-center justify-center text-white/30 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                    <PenSquare size={12} />
                  </button>
                  {u.email !== me?.email && (
                    <button onClick={() => setDeleteId(u.id)}
                      className="w-7 h-7 rounded-lg bg-white/4 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-2xl"
            style={{ background: '#0D1526', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-brand-pink" />
                <h3 className="text-white font-bold text-lg">{editUser ? 'Edit User' : 'Add New User'}</h3>
              </div>
              <button onClick={() => setModal(false)} className="text-white/30 hover:text-white transition-colors"><X size={18} /></button>
            </div>

            <div className="space-y-4">
              {/* Name & Email */}
              {[
                { label: 'Full Name',      key: 'name',  type: 'text',  placeholder: 'John Doe' },
                { label: 'Email Address',  key: 'email', type: 'email', placeholder: 'john@example.com' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">{f.label}</label>
                  <input type={f.type} value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder}
                    disabled={f.key === 'email' && !!editUser}
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-[13px] placeholder:text-white/20 focus:outline-hidden focus:border-white/20 disabled:opacity-50" />
                </div>
              ))}

              {/* Password */}
              <div>
                <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">
                  {editUser ? 'New Password' : 'Password'} {editUser && <span className="normal-case tracking-normal text-white/25">(leave blank to keep current)</span>}
                </label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => set('password', e.target.value)}
                    placeholder={editUser ? 'Set a new password' : 'At least 10 characters'}
                    autoComplete="new-password"
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 pr-10 text-white text-[13px] placeholder:text-white/20 focus:outline-hidden focus:border-white/20"
                  />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <p className="text-white/25 text-[10px] mt-1">
                  At least 10 characters. Stored securely by Supabase Auth — it can't be viewed later, only replaced.
                </p>
              </div>

              {/* Role & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Role</label>
                  <select value={form.role} onChange={e => set('role', e.target.value)}
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-[13px] focus:outline-hidden focus:border-white/20">
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Status</label>
                  <select value={form.status} onChange={e => set('status', e.target.value)}
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-[13px] focus:outline-hidden focus:border-white/20">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {error && <p className="mt-4 text-red-400 text-[12px]">{error}</p>}

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(false)} className="flex-1 py-3 rounded-xl text-[13px] text-white/50 border border-white/10 hover:border-white/25 hover:text-white transition-all">Cancel</button>
              <button onClick={handleSave} disabled={!canSave || saving}
                className="flex-1 py-3 rounded-xl text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
                {saving ? 'Saving…' : editUser ? 'Save Changes' : 'Add User'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm p-6 rounded-2xl"
            style={{ background: '#0D1526', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 className="text-white font-bold text-lg mb-2">Remove User?</h3>
            <p className="text-white/45 text-[13px] mb-6">This user will lose all access to the admin panel.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl text-[13px] text-white/50 border border-white/10 hover:border-white/25 hover:text-white transition-all">Cancel</button>
              <button onClick={() => confirmDelete(deleteId)} className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-red-500/80 hover:bg-red-500 transition-colors">Remove</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
