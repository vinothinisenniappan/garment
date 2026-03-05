import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function UserRegister() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        country: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match')
        }

        setLoading(true)
        try {
            const { confirmPassword, ...registerData } = formData
            const data = await register(registerData)
            if (data.success) {
                navigate('/products')
            }
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="user-auth-page">
            <div className="auth-container register-container">
                <div className="auth-box glassmorphic">
                    <header className="auth-header">
                        <h1>Create Account</h1>
                        <p>Join our garment export network</p>
                    </header>

                    <form className="pro-form" onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="pro-field">
                                <label htmlFor="companyName">Company Name</label>
                                <input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    className="pro-input"
                                    placeholder="e.g. Global Apparel Ltd"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pro-field">
                                <label htmlFor="contactPerson">Contact Person</label>
                                <input
                                    id="contactPerson"
                                    name="contactPerson"
                                    type="text"
                                    className="pro-input"
                                    placeholder="Your full name"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pro-field">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="pro-input"
                                    placeholder="contact@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pro-field">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    className="pro-input"
                                    placeholder="+1 234 567 890"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pro-field">
                                <label htmlFor="country">Country</label>
                                <input
                                    id="country"
                                    name="country"
                                    type="text"
                                    className="pro-input"
                                    placeholder="Country name"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pro-field">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="pro-input"
                                    placeholder="Min 6 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength="6"
                                />
                            </div>
                            <div className="pro-field">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className="pro-input"
                                    placeholder="Repeat password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="auth-error-msg">
                                <span>⚠</span> {error}
                            </div>
                        )}

                        <button type="submit" className="pro-button primary-btn" disabled={loading}>
                            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                            {!loading && (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            )}
                        </button>
                    </form>

                    <footer className="auth-footer">
                        <p>Already have an account? <Link to="/login">Sign In</Link></p>
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
