import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const AuthContext = createContext(null)

const SUPER_ADMIN = {
  email:    'mqaisawan@gmail.com',
  password: 'Admin@2025',
  name:     'Qais Abbas',
  role:     'Super Admin',
  initials: 'QA',
}

const DEFAULT_USERS = [
  { id: '1', name: 'Qais Abbas',   email: 'mqaisawan@gmail.com',    role: 'Super Admin',    status: 'Active',   lastLogin: '2025-05-15', initials: 'QA', password: 'Admin@2025' },
  { id: '2', name: 'Abbas Wali',   email: 'abbas@abbasdigital.com', role: 'Admin',          status: 'Active',   lastLogin: '2025-05-14', initials: 'AW', password: '' },
  { id: '3', name: 'Sara Khan',    email: 'sara@abbasdigital.com',  role: 'Editor',         status: 'Active',   lastLogin: '2025-05-13', initials: 'SK', password: '' },
  { id: '4', name: 'Usman Raza',   email: 'usman@abbasdigital.com', role: 'SEO Manager',    status: 'Active',   lastLogin: '2025-05-10', initials: 'UR', password: '' },
  { id: '5', name: 'Fatima Malik', email: 'fatima@abbasdigital.com',role: 'Content Writer', status: 'Inactive', lastLogin: '2025-04-28', initials: 'FM', password: '' },
]

// ── mapping helpers ──────────────────────────────────────────────────────────

function blogFromDb(b) {
  return {
    id:        b.id,
    title:     b.title,
    slug:      b.slug,
    content:   b.content,
    category:  b.category,
    status:    b.status,
    author:    b.author,
    date:      b.date,
    updatedAt: b.updated_at,
    image:     b.image,
    metaTitle: b.meta_title,
    metaDesc:  b.meta_desc,
    tags:      b.tags || '',
    views:     b.views || 0,
  }
}

function blogToDb(b) {
  return {
    id:         b.id,
    title:      b.title,
    slug:       b.slug,
    content:    b.content,
    category:   b.category,
    status:     b.status,
    author:     b.author,
    date:       b.date,
    updated_at: b.updatedAt,
    image:      b.image,
    meta_title: b.metaTitle,
    meta_desc:  b.metaDesc,
    tags:       b.tags || '',
    views:      b.views || 0,
  }
}

function leadFromDb(l) {
  return {
    id:      l.id,
    name:    l.name,
    email:   l.email,
    phone:   l.phone,
    service: l.service,
    budget:  l.budget,
    message: l.message,
    status:  l.status,
    date:    l.date,
  }
}

function leadToDb(l) {
  return {
    id:      l.id?.toString(),
    name:    l.name,
    email:   l.email,
    phone:   l.phone,
    service: l.service,
    budget:  l.budget,
    message: l.message,
    status:  l.status,
    date:    l.date,
  }
}

function userFromDb(u) {
  return {
    id:        u.id,
    name:      u.name,
    email:     u.email,
    password:  u.password || '',
    role:      u.role,
    status:    u.status,
    lastLogin: u.last_login,
    initials:  u.initials,
  }
}

function userToDb(u) {
  return {
    id:         u.id?.toString(),
    name:       u.name,
    email:      u.email,
    password:   u.password || '',
    role:       u.role,
    status:     u.status,
    last_login: u.lastLogin,
    initials:   u.initials,
  }
}

// ── Provider ─────────────────────────────────────────────────────────────────

/* Blogs prerendered into the page at build time (see scripts/prerender.mjs).
   On the client they're read from the injected global so the first render
   matches the server HTML and hydration stays clean; the useEffect below then
   refreshes them with live data from Supabase. */
function getSsgBlogs(initialBlogs) {
  if (initialBlogs && initialBlogs.length) return initialBlogs
  if (typeof window !== 'undefined' && window.__SSG_DATA__?.blogs) return window.__SSG_DATA__.blogs
  return []
}

export function AuthProvider({ children, initialBlogs }) {
  const seedBlogs = getSsgBlogs(initialBlogs)
  const [user,    setUser]    = useState(null)
  const [users,   setUsers]   = useState(DEFAULT_USERS)
  const [blogs,   setBlogs]   = useState(seedBlogs)
  const [leads,   setLeads]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      // Restore admin session
      try {
        const saved = localStorage.getItem('ada_admin_user')
        if (saved) setUser(JSON.parse(saved))
      } catch { localStorage.removeItem('ada_admin_user') }

      // Load all data from Supabase in parallel
      const [blogsRes, leadsRes, usersRes] = await Promise.all([
        supabase.from('blogs').select('*').order('created_at', { ascending: false }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('admin_users').select('*'),
      ])

      if (blogsRes.data) setBlogs(blogsRes.data.map(blogFromDb))
      if (leadsRes.data) setLeads(leadsRes.data.map(leadFromDb))

      if (usersRes.data && usersRes.data.length > 0) {
        setUsers(usersRes.data.map(userFromDb))
      } else {
        // Seed default users on first run
        await supabase.from('admin_users').upsert(DEFAULT_USERS.map(userToDb))
        setUsers(DEFAULT_USERS)
      }

      setLoading(false)
    }

    init()
  }, [])

  // ── blogs CRUD ────────────────────────────────────────────────────────────

  const persistBlogs = async (newBlogs) => {
    // Optimistic update
    setBlogs(newBlogs)

    // Upsert all blogs in the new array
    if (newBlogs.length > 0) {
      await supabase.from('blogs').upsert(newBlogs.map(blogToDb))
    }

    // Delete any blogs that were removed
    const deletedIds = blogs
      .filter(b => !newBlogs.find(n => n.id === b.id))
      .map(b => b.id)
    if (deletedIds.length > 0) {
      await supabase.from('blogs').delete().in('id', deletedIds)
    }
  }

  // ── leads CRUD ────────────────────────────────────────────────────────────

  const addLead = async (lead) => {
    const newLead = {
      id:     Date.now().toString(),
      ...lead,
      status: 'New',
      date:   new Date().toISOString(),
    }
    setLeads(prev => [newLead, ...prev])
    await supabase.from('leads').insert(leadToDb(newLead))
    // Fire email notification — non-blocking so form doesn't wait
    supabase.functions.invoke('send-lead-email', { body: { lead: newLead } })
      .catch(err => console.error('Email notification failed:', err))
  }

  const persistLeads = async (newLeads) => {
    setLeads(newLeads)
    if (newLeads.length > 0) {
      await supabase.from('leads').upsert(newLeads.map(leadToDb))
    }
    const deletedIds = leads
      .filter(l => !newLeads.find(n => n.id?.toString() === l.id?.toString()))
      .map(l => l.id?.toString())
    if (deletedIds.length > 0) {
      await supabase.from('leads').delete().in('id', deletedIds)
    }
  }

  // ── users CRUD ────────────────────────────────────────────────────────────

  const persistUsers = async (newUsers) => {
    setUsers(newUsers)
    if (newUsers.length > 0) {
      await supabase.from('admin_users').upsert(newUsers.map(userToDb))
    }
    const deletedIds = users
      .filter(u => !newUsers.find(n => n.id?.toString() === u.id?.toString()))
      .map(u => u.id?.toString())
    if (deletedIds.length > 0) {
      await supabase.from('admin_users').delete().in('id', deletedIds)
    }
  }

  // ── auth ──────────────────────────────────────────────────────────────────

  const login = async (email, password, role) => {
    const normalised = email.toLowerCase().trim()

    // Super Admin — always works, hardcoded
    if (normalised === SUPER_ADMIN.email && password === SUPER_ADMIN.password) {
      if (role && role !== SUPER_ADMIN.role)
        return { ok: false, error: `This account is ${SUPER_ADMIN.role}, not ${role}.` }
      const sessionUser = {
        email:    SUPER_ADMIN.email,
        name:     SUPER_ADMIN.name,
        role:     SUPER_ADMIN.role,
        initials: SUPER_ADMIN.initials,
      }
      setUser(sessionUser)
      localStorage.setItem('ada_admin_user', JSON.stringify(sessionUser))
      return { ok: true }
    }

    // Find in users state (loaded from Supabase)
    const match = users.find(u => u.email.toLowerCase() === normalised)

    if (match) {
      if (match.status === 'Inactive')
        return { ok: false, error: 'This account is inactive. Contact your Super Admin.' }
      if (!match.password)
        return { ok: false, error: 'No password set for this account. Ask your Super Admin.' }
      if (match.password !== password)
        return { ok: false, error: 'Invalid email or password.' }
      if (role && match.role !== role)
        return { ok: false, error: `This account has role "${match.role}", not "${role}".` }

      const sessionUser = {
        email:    match.email,
        name:     match.name,
        role:     match.role,
        initials: match.initials || match.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      }
      setUser(sessionUser)
      localStorage.setItem('ada_admin_user', JSON.stringify(sessionUser))

      // Update lastLogin in Supabase
      const today = new Date().toISOString().split('T')[0]
      await supabase.from('admin_users').update({ last_login: today }).eq('email', normalised)
      setUsers(prev => prev.map(u => u.email.toLowerCase() === normalised ? { ...u, lastLogin: today } : u))

      return { ok: true }
    }

    return { ok: false, error: 'Invalid email or password.' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ada_admin_user')
  }

  return (
    <AuthContext.Provider value={{
      user, users, blogs, leads,
      login, logout,
      persistBlogs, persistLeads, persistUsers,
      addLead,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
