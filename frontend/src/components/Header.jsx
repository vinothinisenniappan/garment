import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Close on Escape or click outside
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const headerClass = `header ${isHome
    ? (!isScrolled ? 'header--transparent' : 'header--scrolled')
    : `header--internal ${isScrolled ? 'header--scrolled' : ''}`
    } ${isHome ? 'header--on-home' : ''}`;

  return (
    <>
      <header className={headerClass} style={{ top: '0' }}>
        <div className="header-inner">
          <Link to="/" className="brand">SREE ANJANEYA EXPORTS</Link>
          <nav className="nav">
            {!user ? (
              // Navigation for NOT logged in users
              <>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/products" className="nav-link">Products</Link>
                <Link to="/partnership" className="nav-link">Partnership</Link>
              </>
            ) : (
              // Navigation for LOGGED IN users
              <>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/products" className="nav-link">Products</Link>

                <Link to="/buyer-inquiry" className="nav-link">Buyer Inquiry</Link>
                <Link to="/sample-inquiry" className="nav-link">Sample Inquiry</Link>
              </>
            )}

            {user ? (
              <div className="profile-container">
                <button
                  className="profile-trigger"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-label="User profile"
                >
                  <div className="profile-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </button>

                {profileOpen && (
                  <div className="profile-dropdown glassmorphic">
                    <div className="dropdown-header">
                      <p className="user-name">{user.contactPerson}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/profile" className="dropdown-item">My Profile</Link>
                    <Link to="/inventory" className="dropdown-item">Orders & Tracking</Link>
                    <button onClick={() => logout()} className="dropdown-item logout-item">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="nav-link auth-link">Login</Link>
            )}
          </nav>
          <button aria-label="Open menu" className="nav-menu-icon" onClick={() => setMenuOpen(v => !v)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={`nav-overlay ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(false)}>
          <div className="nav-overlay__content">
            <div className="nav-overlay__panel" onClick={(e) => e.stopPropagation()}>
              <button className="nav-overlay__close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
              <div className="nav-overlay__title">Explore</div>
              <div className="nav-overlay__links">
                {!user ? (
                  // Mobile Navigation for NOT logged in users
                  <>
                    <Link to="/" className="nav-overlay__link">Home</Link>
                    <Link to="/about" className="nav-overlay__link">About Us</Link>
                    <Link to="/history" className="nav-overlay__link">History</Link>
                    <Link to="/products" className="nav-overlay__link">Products</Link>
                    <Link to="/partnership" className="nav-overlay__link">Partnership</Link>
                    <Link to="/infrastructure" className="nav-overlay__link">Infrastructure</Link>
                    <Link to="/contact" className="nav-overlay__link">Contact</Link>
                    <Link to="/login" className="nav-overlay__link">Login</Link>
                  </>
                ) : (
                  // Mobile Navigation for LOGGED IN users
                  <>
                    <Link to="/" className="nav-overlay__link">Home</Link>
                    <Link to="/about" className="nav-overlay__link">About Us</Link>
                    <Link to="/products" className="nav-overlay__link">Products</Link>
                    <Link to="/buyer-inquiry" className="nav-overlay__link">Buyer Inquiry</Link>
                    <Link to="/sample-inquiry" className="nav-overlay__link">Sample Inquiry</Link>
                    <Link to="/profile" className="nav-overlay__link">My Profile</Link>
                    <Link to="/inventory" className="nav-overlay__link">Orders & Tracking</Link>

                    <div className="nav-overlay__divider"></div>
                    <p className="nav-overlay__user-info">Logged in as {user.contactPerson}</p>
                    <button onClick={() => logout()} className="nav-overlay__link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: '#FCA5A5' }}>Logout</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

