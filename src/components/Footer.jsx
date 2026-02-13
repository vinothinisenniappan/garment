import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid footer-grid--four">
          <nav className="footer-col" aria-label="Company">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Sree Anjaneya Exports</a></li>
              <li><a href="#">History</a></li>
              <li><Link to="/infrastructure">Infrastructure</Link></li>
              <li><a href="#">People</a></li>
              <li><a href="#">Leadership</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Subsidiaries">
            <h3>Subsidiaries</h3>
            <ul>
              <li><a href="#">Crocodile Products Private Limited</a></li>
              <li><a href="#">S.P. Apparels (UK) (P) Limited</a></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Legal">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Cookie policy</a></li>
            </ul>
          </nav>

          <section className="footer-col footer-contact" aria-label="Contact">
            <h3>Contact</h3>
            <ul>
              <li>
                <span>Address</span>
                <span>Chitra Garden,
                      45, Chadrapuram (EAST),
                      Sevanthampalayam Road,
                      K.N.P. Colony (Post),
                      Tirupur - 641608.
                      Tamilnadu, India
                </span>
              </li>
              <li>
                <span>Phone</span>
                <a href="tel:+914296714000">+91-4296-714000</a>
              </li>
              <li>
                <span>Email</span>
                <a href="mailto:spindia@s-p-apparels.com">spindia@s-p-apparels.com</a>
              </li>
            </ul>
          </section>
        </div>

        <div className="footer-bottom">
          <span>© {year} Sree Anjaneya Exports</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
