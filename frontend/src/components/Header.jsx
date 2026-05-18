import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const guestLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/partnership', label: 'Partnership' },
  { to: '/contact', label: 'Contact' },
]

const buyerLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/buyer-inquiry', label: 'Buyer Inquiry' },
  { to: '/sample-inquiry', label: 'Sample Inquiry' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const navLinks = user ? buyerLinks : guestLinks

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setProfileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const headerClass = `header ${isHome
    ? (!isScrolled ? 'header--transparent' : 'header--scrolled')
    : `header--internal ${isScrolled ? 'header--scrolled' : ''}`
  } ${isHome ? 'header--on-home' : ''}`

  return (
    <header className={headerClass}>
      <div className="header-inner">
        <Link to="/" className="brand">Sree Anjaneya Exports</Link>

        <nav className="nav" aria-label="Main">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="nav-link">{link.label}</Link>
          ))}

          {user ? (
            <div className="profile-container">
              <button
                type="button"
                className="profile-trigger"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="User profile"
                aria-expanded={profileOpen}
              >
                <div className="profile-icon-wrapper" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <p className="user-name">{user.contactPerson}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <div className="dropdown-divider" />
                  <Link to="/profile" className="dropdown-item">My Profile</Link>
                  <Link to="/inventory" className="dropdown-item">Orders &amp; Tracking</Link>
                  <button type="button" onClick={() => logout()} className="dropdown-item logout-item">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-link nav-link--cta">Login</Link>
          )}
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          className="nav-menu-icon"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-overlay ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(false)}>
        <div className="nav-overlay__content">
          <div className="nav-overlay__panel" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="nav-overlay__close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              &times;
            </button>
            <div className="nav-overlay__title">Menu</div>
            <div className="nav-overlay__links">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="nav-overlay__link">{link.label}</Link>
              ))}
              {!user && (
                <>
                  <Link to="/history" className="nav-overlay__link">History</Link>
                  <Link to="/infrastructure" className="nav-overlay__link">Infrastructure</Link>
                  <Link to="/quality-policy" className="nav-overlay__link">Quality Policy</Link>
                </>
              )}
              {user ? (
                <>
                  <Link to="/profile" className="nav-overlay__link">My Profile</Link>
                  <Link to="/inventory" className="nav-overlay__link">Orders &amp; Tracking</Link>
                  <div className="nav-overlay__divider" />
                  <p className="nav-overlay__user-info">Signed in as {user.contactPerson}</p>
                  <button type="button" onClick={() => logout()} className="nav-overlay__link nav-overlay__logout">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="nav-overlay__link nav-overlay__link--cta">Login</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
