import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [adminId, setAdminId] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (adminId.trim().toLowerCase() === 'vinothinis.23it@kongu.edu' && pass === '123456') {
      setError('')
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('adminAuth', 'true')
        window.localStorage.setItem('adminId', adminId.trim())
      }
      navigate('/admin')
    } else {
      setError('Invalid Administrator ID or Passphrase')
    }
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-overlay"></div>
      <div className="admin-login-container">
        <div className="admin-login-box glassmorphic">
          <header className="admin-login-header">
            <div className="admin-login-logo">◎</div>
            <h1>Admin Portal</h1>
            <p>Authorized access only</p>
          </header>

          <form className="pro-form" onSubmit={handleSubmit}>
            <div className="pro-field">
              <label htmlFor="adminId">Administrator ID</label>
              <input
                id="adminId"
                type="text"
                className="pro-input"
                placeholder="Enter email address"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                autoFocus
              />
            </div>
            <div className="pro-field">
              <label htmlFor="passphrase">Passphrase</label>
              <input
                id="passphrase"
                type="password"
                className="pro-input"
                placeholder="••••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            {error && (
              <div className="admin-login-error-msg">
                <span>⚠</span> {error}
              </div>
            )}

            <button type="submit" className="pro-button primary-btn">
              <span>Secure Sign In</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>

          <footer className="admin-login-footer">
            <p>© 2026 Admin Control System</p>
            <span>Protected by enterprise-level encryption</span>
          </footer>
        </div>
      </div>
    </main>
  )
}

