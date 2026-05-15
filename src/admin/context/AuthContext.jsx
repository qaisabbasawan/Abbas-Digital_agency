import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Super Admin is always valid regardless of the users array
const SUPER_ADMIN = {
  email: 'mqaisawan@gmail.com',
  password: 'Admin@2025',
  name: 'Qais Abbas',
  role: 'Super Admin',
  initials: 'QA',
}

const DEFAULT_USERS = [
  { id: 1, name: 'Qais Abbas',   email: 'mqaisawan@gmail.com',    role: 'Super Admin',    status: 'Active',   lastLogin: '2025-05-15', initials: 'QA', password: 'Admin@2025' },
  { id: 2, name: 'Abbas Wali',   email: 'abbas@abbasdigital.com', role: 'Admin',          status: 'Active',   lastLogin: '2025-05-14', initials: 'AW', password: '' },
  { id: 3, name: 'Sara Khan',    email: 'sara@abbasdigital.com',  role: 'Editor',         status: 'Active',   lastLogin: '2025-05-13', initials: 'SK', password: '' },
  { id: 4, name: 'Usman Raza',   email: 'usman@abbasdigital.com', role: 'SEO Manager',    status: 'Active',   lastLogin: '2025-05-10', initials: 'UR', password: '' },
  { id: 5, name: 'Fatima Malik', email: 'fatima@abbasdigital.com',role: 'Content Writer', status: 'Inactive', lastLogin: '2025-04-28', initials: 'FM', password: '' },
]

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [users, setUsers]     = useState(DEFAULT_USERS)
  const [blogs, setBlogs]     = useState([])
  const [leads, setLeads]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ada_admin_user')
      if (saved) setUser(JSON.parse(saved))

      const savedUsers = localStorage.getItem('ada_users')
      if (savedUsers) setUsers(JSON.parse(savedUsers))

      const savedBlogs = localStorage.getItem('ada_blogs')
      if (savedBlogs) setBlogs(JSON.parse(savedBlogs))

      const savedLeads = localStorage.getItem('ada_leads')
      if (savedLeads) setLeads(JSON.parse(savedLeads))
    } catch {
      localStorage.removeItem('ada_admin_user')
    } finally {
      setLoading(false)
    }
  }, [])

  const persistBlogs = (b) => { setBlogs(b); localStorage.setItem('ada_blogs', JSON.stringify(b)) }
  const persistUsers = (u) => { setUsers(u); localStorage.setItem('ada_users', JSON.stringify(u)) }
  const persistLeads = (l) => { setLeads(l); localStorage.setItem('ada_leads', JSON.stringify(l)) }

  const addLead = (lead) => {
    const newLead = { id: Date.now(), ...lead, status: 'New', date: new Date().toISOString() }
    persistLeads([newLead, ...leads])
  }

  const login = (email, password, role) => {
    const normalised = email.toLowerCase().trim()

    // Super Admin hardcoded — always works regardless of localStorage state
    if (normalised === SUPER_ADMIN.email && password === SUPER_ADMIN.password) {
      if (role && role !== SUPER_ADMIN.role) return { ok: false, error: `This account is ${SUPER_ADMIN.role}, not ${role}.` }
      const sessionUser = { email: SUPER_ADMIN.email, name: SUPER_ADMIN.name, role: SUPER_ADMIN.role, initials: SUPER_ADMIN.initials }
      setUser(sessionUser)
      localStorage.setItem('ada_admin_user', JSON.stringify(sessionUser))
      return { ok: true }
    }

    // Check against users list (merged: localStorage overrides defaults)
    const currentUsers = (() => {
      try {
        const saved = localStorage.getItem('ada_users')
        if (!saved) return users
        const parsed = JSON.parse(saved)
        // Merge DEFAULT_USERS passwords into localStorage users that are missing passwords
        return parsed.map(u => {
          const def = DEFAULT_USERS.find(d => d.email.toLowerCase() === u.email.toLowerCase())
          return { ...u, password: u.password || def?.password || '' }
        })
      } catch { return users }
    })()

    const match = currentUsers.find(u => u.email.toLowerCase() === normalised)

    if (match) {
      if (match.status === 'Inactive')  return { ok: false, error: 'This account is inactive. Contact your Super Admin.' }
      if (!match.password)              return { ok: false, error: 'No password set for this account. Ask your Super Admin.' }
      if (match.password !== password)  return { ok: false, error: 'Invalid email or password.' }
      if (role && match.role !== role)  return { ok: false, error: `This account has role "${match.role}", not "${role}".` }

      const sessionUser = {
        email: match.email,
        name:  match.name,
        role:  match.role,
        initials: match.initials || match.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      }
      setUser(sessionUser)
      localStorage.setItem('ada_admin_user', JSON.stringify(sessionUser))

      // Update lastLogin
      persistUsers(currentUsers.map(u =>
        u.email.toLowerCase() === normalised ? { ...u, lastLogin: new Date().toISOString().split('T')[0] } : u
      ))

      return { ok: true }
    }

    return { ok: false, error: 'Invalid email or password.' }
  }

  const logout = () => { setUser(null); localStorage.removeItem('ada_admin_user') }

  return (
    <AuthContext.Provider value={{ user, users, blogs, leads, login, logout, persistBlogs, persistUsers, persistLeads, addLead, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
