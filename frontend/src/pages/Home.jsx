export default function Home() {
  return (
    <main className="home-page">
      <section
        className="hero-home"
        style={{ backgroundImage: "url('/assets/infrastructure/main.jpg')" }}
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
            <img src="/assets/infrastructure/f4.avif" alt="T-Shirts" />
            <h3>Basic T-Shirts</h3>
            <p>High-quality hosiery cotton basics.</p>
          </div>
          <div className="card">
            <img src="/assets/infrastructure/f6.jpg" alt="Polo Shirts" />
            <h3>Premium Polos</h3>
            <p>Refined knits for global markets.</p>
          </div>
          <div className="card">
            <img src="/assets/infrastructure/f8.jpg" alt="Activewear" />
            <h3>Activewear</h3>
            <p>Performance fabrics and precise stitching.</p>
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

