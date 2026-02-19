import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const headerClass = `header ${
    isHome
      ? (!isScrolled ? 'header--transparent' : 'header--scrolled')
      : `header--internal ${isScrolled ? 'header--scrolled' : ''}`
  }`;

  return (
    <header className={headerClass}>
      <div className="header-inner">
        <Link to="/" className="brand">SREE ANJANEYA EXPORTS</Link>
        <nav className="nav">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/contact" className="nav-link">CONTACT</Link>
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
              <Link to="/history" className="nav-overlay__link">History</Link>
              <Link to="/products" className="nav-overlay__link">Products</Link>
              <Link to="/infrastructure" className="nav-overlay__link">Infrastructure</Link>
              <Link to="/buyer-inquiry" className="nav-overlay__link">Buyer Inquiry</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

