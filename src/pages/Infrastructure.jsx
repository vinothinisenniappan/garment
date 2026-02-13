import { Link } from 'react-router-dom'

export default function AmeedInfrastructure() {
  const galleryImages = [
    '/assets/infrastructure/i1.jpeg',
    '/assets/infrastructure/i2.jpeg',
    '/assets/infrastructure/i3.jpeg',
    '/assets/infrastructure/i4.jpeg',
    '/assets/infrastructure/i5.jpeg',
  ]

  return (
    <main className="page infrastructure">
      <section
        className="infra-banner"
        aria-label="Infrastructure hero"
        style={{ '--infra-banner-img': "url('/assets/infrastructure/main.webp')" }}
      >
        <div className="infra-banner__inner">
          <h1 className="infra-banner__title">INFRASTRUCTURE</h1>
          <p className="infra-banner__tag">Organized manufacturing • Clean & well-lit • QA at stages</p>
        </div>
      </section>

      <section className="infra-hero">
        <div className="infra-hero__media infra-hero__media--decor">
          <img
            src="/assets/infrastructure/o.jpg"
            alt="Manufacturing floor with workers and machinery"
            loading="lazy"
          />
          <div className="infra-hero__caption">
            <h2>Working &amp; Workers</h2>
            <p>Organized lines, trained operators, and attentive supervision.</p>
          </div>
        </div>

        <div className="infra-hero__content">
          <h2>Manufacturing Floor</h2>
          <p>
            Our facility layout supports efficient line balancing, smooth material movement, and
            quality assurance at every stage for reliable, on-time deliveries.
          </p>
          <ul className="infra-list">
            <li>Dedicated stitching and finishing zones</li>
            <li>Process checkpoints with documented QA</li>
            <li>Experienced team focused on precision</li>
            <li>Clean, well-lit work environment</li>
          </ul>
        </div>
      </section>

      <section className="infra-stats" aria-label="Key production stats">
        <div className="infra-stat">
          <span className="stat-value">12+</span>
          <span className="stat-label">Sewing Lines</span>
        </div>
        <div className="infra-stat">
          <span className="stat-value">5k+</span>
          <span className="stat-label">Units / Day</span>
        </div>
        <div className="infra-stat">
          <span className="stat-value">80+</span>
          <span className="stat-label">Skilled Operators</span>
        </div>
        <div className="infra-stat">
          <span className="stat-value">100%</span>
          <span className="stat-label">QA Coverage</span>
        </div>
      </section>

      <section className="infra-details" aria-label="Capabilities overview">
        <article className="infra-card">
          <h3>Quality &amp; Compliance</h3>
          <p>Structured checks and documentation ensure consistent output and buyer confidence.</p>
        </article>
        <article className="infra-card">
          <h3>Capacity &amp; Workflow</h3>
          <p>Balanced workflows maintain stitch accuracy and finishing quality across lines.</p>
        </article>
        <article className="infra-card">
          <h3>Skilled Workforce</h3>
          <p>Trained operators and supervisors collaborate to achieve high-quality standards.</p>
        </article>
      </section>

      <section className="infra-gallery" aria-label="Photo gallery">
        <h2 className="section-title">On the Floor</h2>
        <div className="infra-gallery__grid">
          {galleryImages.map((src, i) => (
            <figure key={src} className="infra-gallery__item">
              <img src={src} alt={`Infrastructure photo ${i + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="infra-cta" aria-label="Contact and inquiries">
        <div className="infra-cta__card">
          <h3>Want a detailed walkthrough?</h3>
          <p className="muted">We’re happy to share layout details, capacities, and compliance documents.</p>
          <div className="infra-cta__actions">
            <Link className="back-link" to="/contact">Contact Us</Link>
            <Link className="back-link" to="/buyer-inquiry">Buyer Inquiry</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
