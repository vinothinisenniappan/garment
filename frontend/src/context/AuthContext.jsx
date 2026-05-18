import { createContext, useContext, useState, useEffect } from 'react'
import { apiFetch } from '../lib/api'

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  register: () => {}
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await apiFetch('/api/user/profile')
        if (userData.success) {
          setUser(userData.user)
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
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

  const logout = async () => {
    await apiFetch('/api/user/logout', { method: 'POST' })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
