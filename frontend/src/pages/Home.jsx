export default function Home() {
  return (
    <main className="home-page">
      <section
        className="hero-home"
        style={{ backgroundImage: "url('/assets/infrastructure/man.png')" }}
      >

        <div className="hero-home__content">
          <div className="hero-home__top-right">
            <h1 className="hero-home__outline-text">
              SREE<br />ANJANEYA
            </h1>
          </div>
          <div className="hero-home__bottom-right">
            <h1 className="hero-home__solid-text">
              EXPORTS
            </h1>
          </div>
        </div>
      </section>

      <section className="products" id="products">
        <h2>Our Core Specialization</h2>
        <div className="grid">
          <div className="card">
            <img src="/assets/infrastructure/f5.jpg" alt="Basic T-Shirts" />
            <h3>Basic T-Shirts</h3>
            <p>Premium cotton basics for everyday comfort.</p>
          </div>
          <div className="card">
            <img src="/assets/infrastructure/f4.avif" alt="Premium Polos" />
            <h3>Premium Polos</h3>
            <p>Refined pique knits for a professional look.</p>
          </div>
          <div className="card">
            <img src="/assets/infrastructure/f6.jpg" alt="Casual Shirts" />
            <h3>Casual Shirts</h3>
            <p>Stylish linen and cotton shirts for any occasion.</p>
          </div>
        </div>
      </section>

      <section className="certifications">
        <h2>Certifications</h2>

        <div className="cert-row">
          <span className="divider"></span>

          <div className="logos">
            <img src="/assets/infrastructure/c1.jpg" alt="Sedex" />
            <img src="/assets/infrastructure/c2.png" alt="BSCI" />
            <img src="/assets/infrastructure/c3.png" alt="WRAP" />
            <img src="/assets/infrastructure/c4.png" alt="APEDA" />
          </div>
        </div>
      </section>
    </main>
  )
}

