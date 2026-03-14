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
    <main className="admin-login-page app--internal" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F172A' }}>
      <div className="admin-login-container" style={{ width: '100%', maxWidth: '400px', padding: '20px', position: 'relative', zIndex: 1 }}>
        <div className="pro-card" style={{ padding: '40px', background: '#1E293B', border: '1px solid #334155', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <header className="admin-login-header center" style={{ marginBottom: '35px' }}>
            <div className="admin-login-logo" style={{ fontSize: '3rem', color: '#38BDF8', marginBottom: '15px' }}>◎</div>
            <h1 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '8px', letterSpacing: '1px' }}>Control Center</h1>
            <p className="cap-desc" style={{ color: '#94A3B8' }}>Authorized Personnel Only</p>
          </header>

          <form className="pro-form" onSubmit={handleSubmit}>
            <div className="pro-field" style={{ marginBottom: '20px' }}>
              <label htmlFor="adminId" style={{ color: '#E2E8F0' }}>Administrator ID</label>
              <input
                id="adminId"
                type="text"
                className="pro-input"
                placeholder="system_admin"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                style={{ background: '#0F172A', border: '1px solid #334155', color: 'white' }}
                autoFocus
              />
            </div>
            <div className="pro-field" style={{ marginBottom: '30px' }}>
              <label htmlFor="passphrase" style={{ color: '#E2E8F0' }}>Secure Passphrase</label>
              <input
                id="passphrase"
                type="password"
                className="pro-input"
                placeholder="••••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                style={{ background: '#0F172A', border: '1px solid #334155', color: 'white' }}
              />
            </div>

            {error && (
              <div className="admin-login-error-msg" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#F87171', padding: '12px', borderRadius: '8px', marginBottom: '25px', fontSize: '13px', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <button type="submit" className="pro-button" style={{ width: '100%', height: '52px', background: 'var(--primary)', color: 'white', fontWeight: 'bold' }}>
              Validate & Access
            </button>
          </form>

          <footer className="admin-login-footer center" style={{ marginTop: '35px', paddingTop: '25px', borderTop: '1px solid #334155' }}>
            <button
              className="filter-btn"
              onClick={() => navigate('/')}
              style={{ width: '100%', height: '44px', color: '#94A3B8' }}
            >
              ← System Exit
            </button>
            <div style={{ marginTop: '20px', fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Protected by Quantum Encryption Layer
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}

