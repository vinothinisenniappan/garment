import { createContext, useContext, useState, useEffect } from 'react'
import { apiFetch } from '../lib/api'

const AuthContext = createContext({
  user: null,
  admin: null,
  loading: true,
  login: () => { },
  adminLogin: () => { },
  logout: () => { },
  register: () => { }
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      // Check user session
      const userData = await apiFetch('/api/user/profile')
      if (userData.success) {
        setUser(userData.user)
      }
    } catch (err) {
      // Not logged in as user or error
    }

    try {
      // Check admin session (if applicable)
      const adminData = await apiFetch('/api/admin/check-auth')
      if (adminData.success && adminData.authenticated) {
        setAdmin(adminData.admin)
      }
    } catch (err) {
      // Not logged in as admin or error
    }

    setLoading(false)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (email, password) => {
    const data = await apiFetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (data.success) {
      setUser(data.user)
    }
    return data
  }

  const register = async (formData) => {
    const data = await apiFetch('/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (data.success) {
      setUser(data.user)
    }
    return data
  }

  const adminLogin = async (username, password) => {
    const data = await apiFetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (data.success) {
      setAdmin(data.admin)
    }
    return data
  }

  const logout = async (type = 'user') => {
    if (type === 'admin') {
      await apiFetch('/api/admin/logout')
      setAdmin(null)
    } else {
      await apiFetch('/api/user/logout', { method: 'POST' })
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, admin, loading, login, adminLogin, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
