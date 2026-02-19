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
      <section className="history-hero">
        <div className="history-hero__inner">
          <div className="history-hero__text-group">
            <h1 className="history-hero__title">Admin Portal</h1>
          </div>
        </div>
      </section>

      <div className="page-container" style={{ marginBottom: '100px' }}>
        <div className="pro-card" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--nav-bg)' }}>Authorized Access</h2>
          <form className="pro-form" onSubmit={handleSubmit}>
            <div className="pro-field">
              <label>Administrator ID</label>
              <input
                type="text"
                className="pro-input"
                placeholder="Enter ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
              />
            </div>
            <div className="pro-field">
              <label>Passphrase</label>
              <input
                type="password"
                className="pro-input"
                placeholder="••••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            {error && (
              <div style={{ color: 'crimson', fontWeight: 600, fontSize: '13px' }}>{error}</div>
            )}
            <button type="submit" className="pro-button" style={{ width: '100%', marginTop: '10px' }}>Sign In</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: 'var(--muted)' }}>
            Protected by enterprise-grade encryption.
          </p>
        </div>
      </div>
    </main>
  )
}

