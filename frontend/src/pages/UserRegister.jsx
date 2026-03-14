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
        <main className="user-auth-page app--internal" style={{ minHeight: '100vh', padding: '60px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
            <div className="auth-container register-container" style={{ width: '100%', maxWidth: '800px' }}>
                <div className="pro-card" style={{ padding: '50px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.1)' }}>
                    <header className="auth-header" style={{ marginBottom: '40px', textAlign: 'center' }}>
                        <span className="section-subtitle">Registration</span>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Create Buyer Account</h1>
                        <p className="cap-desc">Join our global supply chain network</p>
                    </header>

                    <form className="pro-form" onSubmit={handleSubmit}>
                        <div className="grid grid--two" style={{ rowGap: '25px' }}>
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
                                    placeholder="Full name"
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
                                    placeholder="+91 98437 34959"
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
                                    placeholder="e.g. United Kingdom"
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
                            <div className="error-message" style={{ color: 'var(--accent)', fontWeight: 600, margin: '25px 0', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        <button type="submit" className="pro-button" style={{ width: '100%', height: '56px', marginTop: '30px' }} disabled={loading}>
                            {loading ? 'Processing Registration...' : 'Register as Partner'}
                        </button>
                    </form>

                    <footer className="auth-footer center" style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--border)' }}>
                        <p className="cap-desc">Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign In</Link></p>
                        <button
                            className="filter-btn"
                            style={{ marginTop: '20px', width: '200px' }}
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
