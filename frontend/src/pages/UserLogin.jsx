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
        <main className="user-auth-page">
            <div className="auth-container">
                <div className="auth-box glassmorphic">
                    <header className="auth-header">
                        <h1>Welcome Back</h1>
                        <p>Sign in to your buyer account</p>
                    </header>

                    <form className="pro-form" onSubmit={handleSubmit}>
                        <div className="pro-field">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                className="pro-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                        <div className="pro-field">
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
                            <div className="auth-error-msg">
                                <span>⚠</span> {error}
                            </div>
                        )}

                        <button type="submit" className="pro-button primary-btn" disabled={loading}>
                            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                            {!loading && (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            )}
                        </button>
                    </form>

                    <footer className="auth-footer">
                        <p>Don't have an account? <Link to="/register">Register Now</Link></p>
                        <button
                            className="back-home-btn"
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
