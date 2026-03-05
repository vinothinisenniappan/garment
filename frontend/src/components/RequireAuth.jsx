import { Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'

export default function RequireAuth({ children }) {
  const location = useLocation()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    let isMounted = true

    const checkAuth = async () => {
      try {
        const data = await apiFetch('/api/admin/check-auth')
        if (isMounted) {
          setIsAuthed(Boolean(data.authenticated))
        }
      } catch (error) {
        if (isMounted) {
          setIsAuthed(false)
        }
      } finally {
        if (isMounted) {
          setIsChecking(false)
        }
      }
    }

    checkAuth()

    return () => {
      isMounted = false
    }
  }, [])

  if (isChecking) {
    return null
  }

  if (!isAuthed) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />
  }
  return children
}
