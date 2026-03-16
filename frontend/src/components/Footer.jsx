import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col" aria-label="Company Branding">
            <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>SREE ANJANEYA<br />EXPORTS</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>Manufacturers & Exporters of high-quality hosiery garments for global markets.</p>
          </div>

          <nav className="footer-col" aria-label="Company Links">
            <h3>Company</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/history">Our History</Link></li>
              <li><Link to="/partnership">Partnership</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Information">
            <h3>Information</h3>
            <ul>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/infrastructure">Infrastructure</Link></li>
              <li><Link to="/quality-policy">Quality Policy</Link></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Business Services">
            <h3>Services</h3>
            <ul>
              <li><Link to="/buyer-inquiry">Buyer Inquiry</Link></li>
              <li><Link to="/sample-inquiry">Sample Inquiry</Link></li>
            </ul>
          </nav>

          <section className="footer-col footer-contact" aria-label="Contact Information" style={{ gridColumn: '1 / -1', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', marginTop: '10px' }}>
            <h3 style={{ marginBottom: '20px' }}>Office / Contact</h3>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <li style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 0 }}>
                <span style={{ color: '#ffd900ff', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Address</span>
                <span>Chitra Garden, 45, Chadrapuram (E),<br/>Tirupur - 641608, India</span>
              </li>
              <li style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 0 }}>
                <span style={{ color: '#ffd900ff', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone</span>
                <a href="tel:+914212428422" style={{ fontSize: '16px' }}>+91 9843734959</a>
              </li>
              <li style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 0 }}>
                <span style={{ color: '#ffd900ff', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</span>
                <a href="mailto:sreeanjaneya@sify.com" style={{ fontSize: '16px' }}>sreeanjaneya@sify.com</a>
              </li>
            </ul>
          </section>
        </div>

        <div className="footer-bottom">
          <span>© {year} Sree Anjaneya Exports. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/admin-login" style={{ color: 'inherit', textShadow: 'none' }}>Administrator Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

