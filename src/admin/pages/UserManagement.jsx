import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Trash2, PenSquare, X, Shield } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { roleColors } from '../AdminLayout'

const roles = ['Super Admin', 'Admin', 'Editor', 'SEO Manager', 'Content Writer', 'Analyst', 'Viewer']

const EMPTY_FORM = { name: '', email: '', role: 'Editor', status: 'Active' }

export default function UserManagement() {
  const { users, persistUsers, user: me } = useAuth()
  const [search, setSearch]   = useState('')
  const [modal, setModal]     = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [form, setForm]       = useState(EMPTY_FORM)
  const [deleteId, setDeleteId] = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const openAdd  = () => { setForm(EMPTY_FORM); setEditUser(null); setModal(true) }
  const openEdit = (u) => { setForm({ name: u.name, email: u.email, role: u.role, status: u.status }); setEditUser(u); setModal(true) }

  const handleSave = () => {
    if (!form.name || !form.email) return
    if (editUser) {
      persistUsers(users.map(u => u.id === editUser.id ? { ...u, ...form } : u))
    } else {
      const newUser = { id: Date.now(), ...form, lastLogin: '—', initials: form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) }
      persistUsers([...users, newUser])
    }
    setModal(false)
  }

  const filtered = users.filter(u =>
    !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  )

  const confirmDelete = (id) => { persistUsers(users.filter(u => u.id !== id)); setDeleteId(null) }

  return (
    <div className="max-w-6xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-lg">User Management</h1>
          <p className="text-white/35 text-[12px] mt-0.5">{users.length} team members · Manage roles and permissions</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
          <Plus size={14} /> Add User
        </button>
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
          className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl pl-9 pr-4 py-2.5 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/15" />
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hidden sm:grid grid-cols-5 gap-4 px-5 py-3 border-b border-white/[0.06] text-white/30 text-[10px] uppercase tracking-widest">
          <span className="col-span-2">User</span>
          <span>Role</span>
          <span>Status</span>
          <span>Last Login</span>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {filtered.map((u, i) => (
            <motion.div key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
              className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors items-center">
              {/* Avatar + Name */}
              <div className="flex items-center gap-3 sm:col-span-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                  style={{ background: u.id === 1 ? 'linear-gradient(135deg,#2E55E0,#E8155A)' : 'rgba(255,255,255,0.07)' }}>
                  {u.initials}
                </div>
                <div>
                  <p className="text-white/85 text-[13px] font-medium">{u.name}</p>
                  <p className="text-white/30 text-[11px]">{u.email}</p>
                </div>
                {u.email === me?.email && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/40">You</span>}
              </div>
              {/* Role */}
              <div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${roleColors[u.role] || 'bg-white/10 text-white/50 border-white/10'}`}>
                  {u.role}
                </span>
              </div>
              {/* Status */}
              <div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${u.status === 'Active' ? 'bg-green-500/15 text-green-400' : 'bg-white/10 text-white/40'}`}>
                  {u.status}
                </span>
              </div>
              {/* Last login + actions */}
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-[12px]">{u.lastLogin}</span>
                <div className="flex gap-1.5">
                  <button onClick={() => openEdit(u)}
                    className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                    <PenSquare size={12} />
                  </button>
                  {u.email !== me?.email && (
                    <button onClick={() => setDeleteId(u.id)}
                      className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
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
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Doe' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'john@example.com' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">{f.label}</label>
                  <input type={f.type} value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/20" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Role</label>
                  <select value={form.role} onChange={e => set('role', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-[13px] focus:outline-none focus:border-white/20">
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Status</label>
                  <select value={form.status} onChange={e => set('status', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-[13px] focus:outline-none focus:border-white/20">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(false)} className="flex-1 py-3 rounded-xl text-[13px] text-white/50 border border-white/[0.1] hover:border-white/25 hover:text-white transition-all">Cancel</button>
              <button onClick={handleSave} disabled={!form.name || !form.email}
                className="flex-1 py-3 rounded-xl text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg,#2E55E0,#E8155A)' }}>
                {editUser ? 'Save Changes' : 'Add User'}
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
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl text-[13px] text-white/50 border border-white/[0.1] hover:border-white/25 hover:text-white transition-all">Cancel</button>
              <button onClick={() => confirmDelete(deleteId)} className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-red-500/80 hover:bg-red-500 transition-colors">Remove</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
