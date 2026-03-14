import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function UserLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const data = await login(email, password)
            if (data.success) {
                navigate('/products') // Redirect to products or dashboard after login
            }
        } catch (err) {
            setError(err.message || 'Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="user-auth-page app--internal" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
            <div className="auth-container" style={{ width: '100%', maxWidth: '450px', padding: '20px' }}>
                <div className="pro-card" style={{ padding: '40px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.1)' }}>
                    <header className="auth-header center" style={{ marginBottom: '30px' }}>
                        <span className="section-subtitle">Secure Access</span>
                        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Buyer Portal</h1>
                        <p className="cap-desc">Manage your orders and specifications</p>
                    </header>

                    <form className="pro-form" onSubmit={handleSubmit}>
                        <div className="pro-field" style={{ marginBottom: '20px' }}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                className="pro-input"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="pro-field" style={{ marginBottom: '30px' }}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="pro-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="error-message" style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: '20px', textAlign: 'center', fontSize: '14px' }}>
                                {error}
                            </div>
                        )}

                        <button type="submit" className="pro-button" style={{ width: '100%', height: '52px' }} disabled={loading}>
                            {loading ? 'Sign-in in progress...' : 'Sign In to Portal'}
                        </button>
                    </form>

                    <footer className="auth-footer center" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                        <p className="cap-desc">Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create Account</Link></p>
                        <button
                            className="filter-btn"
                            style={{ marginTop: '20px', width: '100%', height: '44px' }}
                            onClick={() => navigate('/')}
                        >
                            ← Back to Home
                        </button>
                    </footer>
                </div>
            </div>
        </main>
    )
}
