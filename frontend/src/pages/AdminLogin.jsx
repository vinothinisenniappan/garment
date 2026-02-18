export default function AdminLogin() {
  return (
    <main className="admin-login-page">
      <section className="internal-hero">
        <div className="container">
          <h1>Admin Portal</h1>
          <p>Secure access for production and catalog management.</p>
        </div>
      </section>

      <div className="container" style={{ marginBottom: '100px' }}>
        <div className="pro-card" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--nav-bg)' }}>Authorized Access</h2>
          <form className="pro-form">
            <div className="pro-field">
              <label>Administrator ID</label>
              <input type="text" className="pro-input" placeholder="Enter ID" />
            </div>
            <div className="pro-field">
              <label>Passphrase</label>
              <input type="password" className="pro-input" placeholder="••••••••" />
            </div>
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

