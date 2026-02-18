import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          <Link to="/history" className="nav-link">HISTORY</Link>
          <Link to="/infrastructure" className="nav-link">INFRASTRUCTURE</Link>
          <Link to="/contact" className="nav-link">CONTACT</Link>
        </nav>
        <div className="nav-menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  )
}

