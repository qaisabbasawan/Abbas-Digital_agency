import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* supabase-js (~50 KB) is loaded on demand so it stays out of the bundle
   every public page needs before it can render */
const getDb = () => import('../../lib/supabase').then(m => m.supabase)

const AuthContext = createContext(null)

const initialsOf = (name = '') =>
  name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2)

/* The signed-in admin, from a Supabase Auth session. Admin rights live in
   app_metadata ({ admin_role, admin_active }), which only the server can set
   (admin-users edge function / bootstrap_super_admin), so a browser can never
   grant itself access. */
function adminFromSession(session) {
  const meta = session?.user?.app_metadata
  if (!meta?.admin_active || !meta?.admin_role) return null
  const email = session.user.email
  const name = session.user.user_metadata?.name || email.split('@')[0]
  return { id: session.user.id, email, name, role: meta.admin_role, initials: initialsOf(name) }
}

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
    role:      u.role,
    status:    u.status,
    lastLogin: u.last_login,
    initials:  u.initials,
    hasLogin:  !!u.auth_user_id,
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
  const [users,   setUsers]   = useState([])
  const [blogs,   setBlogs]   = useState(seedBlogs)
  const [leads,   setLeads]   = useState([])
  const [sessionChecked, setSessionChecked] = useState(false)
  const [adminLoaded, setAdminLoaded] = useState(false)

  const { pathname } = useLocation()
  const onAdmin = pathname.startsWith('/admin')
  // Admin routes wait for the session (and, once signed in, their data);
  // public pages never block on either
  const loading = onAdmin && (!sessionChecked || (!!user && !adminLoaded))

  // Every page: refresh published blogs with live data once the browser is
  // idle (the prerendered seed covers the first paint)
  useEffect(() => {
    let cancelled = false
    // the old browser-side "session" is no longer used
    try { localStorage.removeItem('ada_admin_user') } catch { /* storage unavailable */ }

    const refreshBlogs = async () => {
      const supabase = await getDb()
      const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
      if (data && !cancelled) setBlogs(data.map(blogFromDb))
    }
    const idle = window.requestIdleCallback || (cb => setTimeout(cb, 2000))
    const cancelIdle = window.cancelIdleCallback || clearTimeout
    const id = idle(() => { refreshBlogs() })
    return () => { cancelled = true; cancelIdle(id) }
  }, [])

  // Admin routes only: restore the Supabase Auth session and follow changes
  // (sign-in, sign-out, token refresh)
  useEffect(() => {
    if (!onAdmin) return
    let unsubscribe = () => {}
    let cancelled = false
    const watch = async () => {
      const supabase = await getDb()
      const { data: { session } } = await supabase.auth.getSession()
      if (cancelled) return
      setUser(adminFromSession(session))
      setSessionChecked(true)
      const { data } = supabase.auth.onAuthStateChange((_event, next) => {
        const admin = adminFromSession(next)
        setUser(admin)
        if (!admin) {   // signed out: drop everything only admins may see
          setAdminLoaded(false)
          setLeads([])
          setUsers([])
        }
      })
      unsubscribe = () => data.subscription.unsubscribe()
    }
    watch()
    return () => { cancelled = true; unsubscribe() }
  }, [onAdmin])

  // Signed-in admins only: blogs (drafts included), leads and the team.
  // Row Level Security returns nothing for anyone else.
  useEffect(() => {
    if (!user || adminLoaded) return
    const load = async () => {
      const supabase = await getDb()
      const [blogsRes, leadsRes, usersRes] = await Promise.all([
        supabase.from('blogs').select('*').order('created_at', { ascending: false }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('admin_users').select('*'),
      ])
      if (blogsRes.data) setBlogs(blogsRes.data.map(blogFromDb))
      if (leadsRes.data) setLeads(leadsRes.data.map(leadFromDb))
      if (usersRes.data) setUsers(usersRes.data.map(userFromDb))
      setAdminLoaded(true)
    }
    load()
  }, [user, adminLoaded])

  // ── blogs CRUD ────────────────────────────────────────────────────────────

  const persistBlogs = async (newBlogs) => {
    const supabase = await getDb()
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
    const supabase = await getDb()
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
    const supabase = await getDb()
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

  // ── team (all changes go through the admin-users edge function) ─────────

  const reloadUsers = async () => {
    const supabase = await getDb()
    const { data } = await supabase.from('admin_users').select('*')
    if (data) setUsers(data.map(userFromDb))
  }

  const callTeamFunction = async (body) => {
    const supabase = await getDb()
    const { error } = await supabase.functions.invoke('admin-users', { body })
    if (error) {
      let message = error.message
      try {
        const detail = await error.context?.json()
        if (detail?.error) message = detail.error
      } catch { /* keep the generic message */ }
      return { ok: false, error: message }
    }
    await reloadUsers()
    return { ok: true }
  }

  // { id?, name, email, password?, role, status } — creates when there is no id
  const saveTeamMember = (member) =>
    callTeamFunction({ action: member.id ? 'update' : 'create', ...member })

  const deleteTeamMember = (id) => callTeamFunction({ action: 'delete', id })

  const updateOwnProfile = async (name) => {
    const res = await callTeamFunction({ action: 'update-self', name })
    if (res.ok) {
      const supabase = await getDb()
      await supabase.auth.refreshSession()   // picks up the new name
    }
    return res
  }

  const changePassword = async (current, next) => {
    const supabase = await getDb()
    const { error: wrong } = await supabase.auth.signInWithPassword({ email: user.email, password: current })
    if (wrong) return { ok: false, error: 'Your current password is incorrect.' }
    const { error } = await supabase.auth.updateUser({ password: next })
    return error ? { ok: false, error: error.message } : { ok: true }
  }

  // ── auth ──────────────────────────────────────────────────────────────────

  const login = async (email, password) => {
    const supabase = await getDb()
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) {
      return {
        ok: false,
        error: /banned/i.test(error.message)
          ? 'This account is inactive. Contact your Super Admin.'
          : 'Invalid email or password.',
      }
    }

    const admin = adminFromSession(data.session)
    if (!admin) {
      await supabase.auth.signOut()
      return { ok: false, error: 'This account does not have admin access.' }
    }

    setUser(admin)
    setSessionChecked(true)
    await supabase.rpc('record_admin_login')
    return { ok: true }
  }

  const logout = async () => {
    const supabase = await getDb()
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user, users, blogs, leads,
      login, logout,
      persistBlogs, persistLeads,
      saveTeamMember, deleteTeamMember, updateOwnProfile, changePassword,
      addLead,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
