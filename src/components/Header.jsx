import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">SREE ANJANEYA EXPORTS</div>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/buyer-inquiry" className="nav-link">Buyer Inquiry</Link>
          <Link to="/#products" className="nav-link">Products</Link>
          <Link to="/infrastructure" className="nav-link">Infrastructure</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
          <Link to="/admin-login" className="nav-link">Admin</Link>
        </nav>
      </div>
      <p className="subtext">Mfrs. & Exportsers of Hoseiry Garments</p>
    </header>
  )
}
