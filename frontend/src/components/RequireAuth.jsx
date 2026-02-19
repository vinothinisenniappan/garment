import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const location = useLocation()
  const isAuthed = typeof window !== 'undefined' && window.localStorage.getItem('adminAuth') === 'true'
  if (!isAuthed) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />
  }
  return children
}
