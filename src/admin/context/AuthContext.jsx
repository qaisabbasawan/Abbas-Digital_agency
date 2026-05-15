import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const CREDENTIALS = {
  'mqaisawan@gmail.com': { password: 'Admin@2025', role: 'Super Admin', name: 'Qais Abbas', initials: 'QA' },
}

const DEFAULT_USERS = [
  { id: 1, name: 'Qais Abbas',     email: 'mqaisawan@gmail.com',   role: 'Super Admin',    status: 'Active',    lastLogin: '2025-05-15', initials: 'QA' },
  { id: 2, name: 'Abbas Wali',     email: 'abbas@abbasdigital.com', role: 'Admin',          status: 'Active',    lastLogin: '2025-05-14', initials: 'AW' },
  { id: 3, name: 'Sara Khan',      email: 'sara@abbasdigital.com',  role: 'Editor',         status: 'Active',    lastLogin: '2025-05-13', initials: 'SK' },
  { id: 4, name: 'Usman Raza',     email: 'usman@abbasdigital.com', role: 'SEO Manager',    status: 'Active',    lastLogin: '2025-05-10', initials: 'UR' },
  { id: 5, name: 'Fatima Malik',   email: 'fatima@abbasdigital.com','role': 'Content Writer', status: 'Inactive', lastLogin: '2025-04-28', initials: 'FM' },
]

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null)
  const [users, setUsers] = useState(DEFAULT_USERS)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('ada_admin_user')
    if (saved) setUser(JSON.parse(saved))

    const savedUsers = localStorage.getItem('ada_users')
    if (savedUsers) setUsers(JSON.parse(savedUsers))

    const savedBlogs = localStorage.getItem('ada_blogs')
    if (savedBlogs) setBlogs(JSON.parse(savedBlogs))
  }, [])

  const persistBlogs = (b) => { setBlogs(b); localStorage.setItem('ada_blogs', JSON.stringify(b)) }
  const persistUsers = (u) => { setUsers(u); localStorage.setItem('ada_users', JSON.stringify(u)) }

  const login = (email, password) => {
    const cred = CREDENTIALS[email.toLowerCase()]
    if (cred && cred.password === password) {
      const u = { email: email.toLowerCase(), ...cred }
      setUser(u); localStorage.setItem('ada_admin_user', JSON.stringify(u))
      return { ok: true }
    }
    return { ok: false, error: 'Invalid email or password.' }
  }

  const logout = () => { setUser(null); localStorage.removeItem('ada_admin_user') }

  return (
    <AuthContext.Provider value={{ user, users, blogs, login, logout, persistBlogs, persistUsers }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
