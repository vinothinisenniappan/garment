export default function Infrastructure() {
  const coreCapabilities = [
    { title: "Sewing Lines", icon: "🧵", desc: "12+ specialized lines for diverse hosiery products." },
    { title: "Daily Capacity", icon: "👕", desc: "Output capabilities exceeding 5,000 units per day." },
    { title: "Quality Control", icon: "🛡️", desc: "AQL 2.5 standard inspections at multiple stages." },
    { title: "Compliance", icon: "✅", desc: "Strict adherence to global manufacturing standards." }
  ];

  return (
    <main className="infrastructure-page">
      <section className="history-hero">
        <div className="history-hero__inner">
          <div className="history-hero__text-group">
            <h1 className="history-hero__title">Manufacturing Infrastructure</h1>
          
          </div>
        </div>
      </section>

      <div className="page-container">
        <section className="infra-intro pro-card" style={{ marginBottom: '60px' }}>
          <div className="grid grid--two">
            <div className="content">
              <h2 className="section-title" style={{ color: 'var(--nav-bg)', fontSize: '28px' }}>Optimized Production Floor</h2>
              <p>Our facility layout is engineered for maximum efficiency, featuring organized workflow lines and advanced machinery. We prioritize a safe, clean, and well-lit environment for our skilled workforce.</p>
              <ul className="infra-list" style={{ marginTop: '20px' }}>
                <li>Dedicated sampling and pattern-making zones</li>
                <li>Climate-controlled fabric storage</li>
                <li>Advanced finishing and packing departments</li>
                <li>Digitalized production tracking systems</li>
              </ul>
            </div>
            <div className="media">
              <img src="/assets/infrastructure/main.png" alt="Production Floor" style={{ width: '100%', borderRadius: 'var(--radius)', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        <section className="infra-capabilities" style={{ marginBottom: '80px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px' }}>Operational Excellence</h2>
          <div className="grid">
            {coreCapabilities.map((cap) => (
              <div key={cap.title} className="pro-card pro-card--compact">
                <div style={{ fontSize: '32px', marginBottom: '15px' }}>{cap.icon}</div>
                <h3 style={{ marginBottom: '10px' }}>{cap.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '15px' }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="infra-gallery-pro" style={{ marginBottom: '80px' }}>
          <h2 style={{ marginBottom: '30px' }}>Inland Facilities</h2>
          <div className="grid grid--three">
            <img src="/assets/infrastructure/i1.jpeg" alt="Machinery" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
            <img src="/assets/infrastructure/i2.jpeg" alt="Production Line" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
            <img src="/assets/infrastructure/i3.jpeg" alt="Quality Check" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
          </div>
        </section>
      </div>
    </main>
  )
}

