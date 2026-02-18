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
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/infrastructure">Infrastructure</Link></li>
              <li><Link to="/history">History</Link></li>
              <li><Link to="/buyer-inquiry">Buyer Inquiry</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Corporate">
            <h3>Corporate</h3>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Compliance</a></li>
              <li><a href="#">Quality Policy</a></li>
            </ul>
          </nav>

          <section className="footer-col footer-contact" aria-label="Contact Information">
            <h3>Office</h3>
            <ul>
              <li>
                <span>Address</span>
                <span>Chitra Garden, 45, Chadrapuram (E), Tirupur - 641608, India</span>
              </li>
              <li>
                <span>Phone</span>
                <a href="tel:+914212428422">+91 9843734959</a>
              </li>
              <li>
                <span>Email</span>
                <a href="mailto:sreeanjaneya@sify.com">sreeanjaneya@sify.com</a>
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

