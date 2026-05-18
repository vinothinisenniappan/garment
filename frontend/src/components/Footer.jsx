import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <h3>SREE ANJANEYA EXPORTS</h3>
            <p>Manufacturers and exporters of high-quality hosiery garments for global markets.</p>
          </div>

          <nav className="footer-col" aria-label="Company">
            <h3>Company</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/history">Our History</Link></li>
              <li><Link to="/partnership">Partnership</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Information">
            <h3>Information</h3>
            <ul>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/infrastructure">Infrastructure</Link></li>
              <li><Link to="/quality-policy">Quality Policy</Link></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Buyer services">
            <h3>Buyer Portal</h3>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/buyer-inquiry">Buyer Inquiry</Link></li>
              <li><Link to="/sample-inquiry">Sample Inquiry</Link></li>
            </ul>
          </nav>
        </div>

        <section className="footer-contact" aria-label="Contact">
          <h3>Office &amp; Contact</h3>
          <ul className="footer-contact-list">
            <li>
              <span className="footer-contact-label">Address</span>
              <span>Chitra Garden, 45, Chadrapuram (E), Tirupur - 641608, India</span>
            </li>
            <li>
              <span className="footer-contact-label">Phone</span>
              <a href="tel:+919843734959">+91 9843734959</a>
            </li>
            <li>
              <span className="footer-contact-label">Email</span>
              <a href="mailto:sreeanjaneya@sify.com">sreeanjaneya@sify.com</a>
            </li>
          </ul>
        </section>

        <div className="footer-bottom">
          <span>&copy; {year} Sree Anjaneya Exports. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
