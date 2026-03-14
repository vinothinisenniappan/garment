export default function Home() {
  return (
    <main className="home-page">
      <section className="hero-home">
        <div className="hero-home__overlay"></div>
        <div className="hero-home__content">
          <h1 className="hero-home__title">
            PRECISION IN <br />EVERY STITCH
          </h1>
          <p className="hero-home__description">
            Partnering with global brands to deliver excellence in sustainable garment production.
          </p>
          <div className="hero-home__actions">
            <a href="/products" className="hero-btn hero-btn--primary">Shop Collections</a>
            <a href="/buyer-inquiry" className="hero-btn hero-btn--secondary">Partner with Us</a>
          </div>
        </div>
      </section>

      <section className="specialization" id="specialization">
        <div className="page-container">
          <div className="specialization-header">
            <span className="section-subtitle">Excellence in Production</span>
            <h2 className="section-title">Our Core Specialization</h2>
          </div>

          <div className="specialization-grid">
            <div className="spec-card">
              <div className="spec-card__image">
                <img src="/assets/infrastructure/f5.jpg" alt="Basic T-Shirts" />
                <div className="spec-card__overlay"></div>
              </div>
              <div className="spec-card__content">
                <h3>Basic T-Shirts</h3>
                <p>Premium cotton basics for everyday comfort.</p>
                <a href="/products?category=tshirts" className="spec-card__link">Explore Collection</a>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-card__image">
                <img src="/assets/infrastructure/f4.avif" alt="Premium Polos" />
                <div className="spec-card__overlay"></div>
              </div>
              <div className="spec-card__content">
                <h3>Premium Polos</h3>
                <p>Refined pique knits for a professional look.</p>
                <a href="/products?category=polos" className="spec-card__link">Explore Collection</a>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-card__image">
                <img src="/assets/infrastructure/f6.jpg" alt="Casual Shirts" />
                <div className="spec-card__overlay"></div>
              </div>
              <div className="spec-card__content">
                <h3>Casual Shirts</h3>
                <p>Stylish linen and cotton shirts for any occasion.</p>
                <a href="/products?category=shirts" className="spec-card__link">Explore Collection</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="certifications">
        <div className="page-container">
          <div className="cert-header">
            <span className="section-subtitle">Globally Recognized Excellence</span>
            <h2>Our Certifications</h2>
            <p>We adhere to the highest international standards for ethical manufacturing, quality management, and environmental responsibility.</p>
          </div>

          <div className="logos-grid">
            <div className="cert-card">
              <img src="/assets/infrastructure/c1.jpg" alt="Sedex" />
              <h3>Sedex Member</h3>
            </div>
            <div className="cert-card">
              <img src="/assets/infrastructure/c2.png" alt="BSCI" />
              <h3>BSCI Compliant</h3>
            </div>
            <div className="cert-card">
              <img src="/assets/infrastructure/c3.png" alt="WRAP" />
              <h3>WRAP Certified</h3>
            </div>
            <div className="cert-card">
              <img src="/assets/infrastructure/c4.png" alt="APEDA" />
              <h3>APEDA Member</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

