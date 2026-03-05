import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../lib/api'

export default function AdminLogin() {
  const [adminId, setAdminId] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await apiFetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: adminId.trim().toLowerCase(),
          password: pass
        })
      })

      if (!data.success) {
        throw new Error(data.message || 'Login failed')
      }

      setError('')
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Invalid Administrator ID or Passphrase')
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
            <button
              className="admin-login-back-btn"
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                cursor: 'pointer',
                fontSize: '14px',
                marginBottom: '10px',
                display: 'block',
                width: '100%',
                textAlign: 'center'
              }}
            >
              ← Back to Home Page
            </button>
            <p>© 2026 Admin Control System</p>
            <span>Protected by enterprise-level encryption</span>
          </footer>
        </div>
      </div>
    </main>
  )
}

