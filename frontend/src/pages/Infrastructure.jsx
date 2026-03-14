import { Factory, Zap, ShieldCheck, Globe, Cpu, Users, Layers, Box } from 'lucide-react';

export default function Infrastructure() {
  const coreCapabilities = [
    { title: "Sewing Lines", icon: <Layers size={21} />, desc: "12+ specialized lines for diverse hosiery products.", color: "#6366F1" },
    { title: "Daily Capacity", icon: <Zap size={21} />, desc: "Output capabilities exceeding 5,000 units per day.", color: "#38BDF8" },
    { title: "Quality Control", icon: <ShieldCheck size={21} />, desc: "AQL 2.5 standard inspections at multiple stages.", color: "#0F2E5A" },
    { title: "Compliance", icon: <Globe size={21} />, desc: "Strict adherence to global manufacturing standards.", color: "#10B981" }
  ];

  return (
    <main className="infrastructure-page app--internal">
      <section className="internal-hero">
        <div className="internal-hero__inner scale-reveal">
          <span className="section-subtitle">Dressing The Future</span>
          <h1 className="internal-hero__title">Our Infrastructure</h1>
          <p>World-class manufacturing facilities designed for precision, sustainability, and worker well-being.</p>
        </div>
      </section>

      <div className="page-container">
        <section className="infra-intro reveal-on-scroll" style={{ marginBottom: '60px' }}>
          <div className="grid grid--two" style={{ alignItems: 'center', gap: '40px' }}>
            <div className="content">
              <div className="section-header" style={{ textAlign: 'left', margin: '0 0 30px 0' }}>
                <span className="section-subtitle">Smart Manufacturing</span>
                <h2 style={{ fontSize: '2.5rem' }}>Optimized Production Floor</h2>
              </div>
              <p style={{ fontSize: '1.1rem', color: 'var(--muted)', marginBottom: '30px' }}>
                Our facility layout is engineered for maximum efficiency, featuring organized workflow lines and advanced machinery. We prioritize a safe, clean, and well-lit environment for our skilled workforce.
              </p>
              <div className="grid grid--two" style={{ gap: '20px' }}>
                {[
                  { icon: <Cpu size={20} />, text: "Digitalized tracking" },
                  { icon: <Box size={20} />, text: "Sampling zones" },
                  { icon: <Layers size={20} />, text: "Fabric storage" },
                  { icon: <Users size={20} />, text: "Skilled workforce" }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary)', fontWeight: '500' }}>
                    <span style={{ color: 'var(--secondary)' }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
            <div className="media floating-frame">
              <img src="/assets/infrastructure/f7.JPG" alt="Production Floor" />
            </div>
          </div>
        </section>

        <section className="infra-capabilities reveal-on-scroll" style={{ marginBottom: '60px' }}>
          <div className="section-header center">
            <span className="section-subtitle">Operational Excellence</span>
            <h2>Core Capabilities</h2>
          </div>
          <div className="grid grid--four">
            {coreCapabilities.map((cap) => (
              <div key={cap.title} className="pro-card pro-card--compact" style={{ textAlign: 'center' }}>
                <div className="cap-icon" style={{ margin: '0 auto 20px' }}>
                  <span style={{ color: cap.color }}>{cap.icon}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{cap.title}</h3>
                <p className="cap-desc">{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="infra-gallery-pro reveal-on-scroll" style={{ marginBottom: '80px' }}>
          <div className="section-header center" style={{ marginBottom: '50px' }}>
            <span className="section-subtitle">Our Premises</span>
            <h2>Inland Facilities</h2>
          </div>
          <div className="grid grid--complex" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '30px', gridAutoRows: 'minmax(100px, auto)' }}>
            <div className="floating-frame" style={{ gridColumn: '1 / 6', gridRow: '1 / 4' }}>
              <img src="/assets/infrastructure/a.webp" alt="Machinery" style={{ height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="floating-frame" style={{ gridColumn: '6 / 13', gridRow: '1 / 6' }}>
              <img src="/assets/infrastructure/maine.png" alt="Production Line" style={{ height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="floating-frame" style={{ gridColumn: '1 / 6', gridRow: '4 / 6' }}>
              <img src="/assets/infrastructure/o.jpg" alt="Quality Check" style={{ height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

