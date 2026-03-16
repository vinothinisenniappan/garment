import React from 'react';
import { Building2, Target, Eye, ShieldCheck, Handshake, Package, Phone, Mail, MapPin, Globe, Award } from 'lucide-react';

export default function About() {
  const legacyPoints = [
    'Strong technical know-how in knitted garments',
    'Responsible and ethical manufacturing practices',
    'Long-term relationships with buyers and suppliers',
    'Continuous investment in people, systems, and technology'
  ];

  const infrastructurePoints = [
    'Streamlined production flow',
    'Consistent product quality',
    'Efficient lead-time management',
    'Reliable performance at global standards'
  ];

  const supplierStrength = [
    'Imported knitting',
    'Compacting (Tubetex)',
    'Rotary printing (Stormac RD IV)',
    'Soft flow dyeing and yarn dyeing (Thies)',
    'Bleaching (JEMCO)',
    'Computer embroidery and applique (Barudan / Tajima)',
    'Mercerizing (Dornier)',
    'Peach finishing',
    'MHM chest printing (Austria)'
  ];

  const fabricTypes = [
    'Jersey',
    'Interlock',
    'Rib',
    'Pique',
    'Terry and Velour',
    'Fleece',
    'Yarn Dyed (Feeder, 4-color, 5/6-color Auto Striper)',
    'Polar Fleece and Micro Fleece',
    'Single and Double Knit Jacquard',
    'Mercerized (Single and Double)',
    'Tie and Dye'
  ];

  return (
    <main className="about-page app--internal">
      <section className="internal-hero">
        <div className="internal-hero__inner scale-reveal">
          <span className="section-subtitle">Sree Anjaneya Exports</span>
          <h1 className="internal-hero__title">About Us</h1>
          <p>Your Vision, Our Fabrication. Innovating Textile Solutions for the Future.</p>
        </div>
      </section>

      <div className="page-container" style={{ marginBottom: '50px' }}>
        <section className="about-intro reveal-on-scroll">
          <div className="pro-card">
            <h2>Who We Are</h2>
            <p>
              Welcome to Sree Anjaneya Exports, a trusted apparel manufacturing and export company established in 1997 in
              Tiruppur, Tamil Nadu, the textile hub of India. With decades of industry experience, we specialize in premium
              knitwear and apparel solutions for global markets, combining craftsmanship, process discipline, and customer-first
              execution.
            </p>
            <p>
              At Sree Anjaneya Exports, we believe manufacturing is more than production, it is partnership. From concept to
              shipment, we work with transparency, precision, and speed to deliver garments that meet international expectations
              in quality, consistency, and timeline reliability.
            </p>
          </div>
        </section>

        {/* Export Projects Banner */}
        <section className="reveal-on-scroll" style={{ marginTop: '30px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f2e5a 0%, #1a4a8f 60%, #1565c0 100%)',
            borderRadius: '28px',
            padding: '32px 36px',
            color: '#fff',
            boxShadow: '0 20px 50px rgba(15, 46, 90, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ position: 'absolute', bottom: '-60px', right: '80px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', position: 'relative', zIndex: 1 }}>
              <div style={{ maxWidth: '580px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <Globe size={20} style={{ color: '#90caf9' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff' }}>International Export Projects</span>
                </div>
                <h2 style={{ fontSize: '1.7rem', fontWeight: 900, marginBottom: '10px', fontFamily: 'Outfit, sans-serif', lineHeight: 1.15 }}>
                  Made in India — Shipped to the World
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.94)', lineHeight: 1.7, marginBottom: '20px' }}>
                  We manufacture and export garments to leading international brands. Our products are currently retailing across Europe under the <strong style={{ color: '#fff' }}>Navigare</strong> brand (est. 1961, Italy) — produced in our certified Tamil Nadu facility under ISO 9002 quality standards and Sedex ethical compliance.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {[
                    { label: 'Navigare — Italy', icon: '🇮🇹' },
                    { label: 'Lonsdale — UK', icon: '🇬🇧' },
                    { label: 'Disney — USA', icon: '🇺🇸' }
                  ].map(({ label, icon }) => (
                    <span key={label} style={{
                      background: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '50px',
                      padding: '8px 18px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px'
                    }}>{icon} {label}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '200px' }}>
                {[
                  { Icon: Package, label: 'Combed Cotton Pyjamas', sub: 'Navigare — boxed premium sets' },
                  { Icon: Award, label: 'ISO 9002 Certified', sub: 'Sedex audited factory' },
                  { Icon: Globe, label: 'Exported to Italy', sub: 'Now retailing in Europe' }
                ].map(({ Icon, label, sub }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      <Icon size={18} style={{ color: '#90caf9' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.88)' }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-legacy reveal-on-scroll" style={{ marginTop: '30px' }}>
          <div className="section-header center">
            <span className="section-subtitle">Our Foundation</span>
            <h2>Our Legacy Is Built On</h2>
          </div>
          <div className="grid grid--two">
            {legacyPoints.map((point) => (
              <div className="about-list-card" key={point}>
                <ShieldCheck size={20} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="about-vision-mission reveal-on-scroll" style={{ marginTop: '40px' }}>
          <div className="grid grid--two" style={{ alignItems: 'stretch' }}>
            <article className="pro-card">
              <div className="about-headline">
                <Eye size={22} />
                <h3>Vision</h3>
              </div>
              <p>
                To be a globally respected apparel manufacturer known for uncompromising quality, ethical business practices,
                and sustainable innovation, enriching the lives of customers, employees, and communities.
              </p>
            </article>
            <article className="pro-card">
              <div className="about-headline">
                <Target size={22} />
                <h3>Mission</h3>
              </div>
              <p>
                To consistently deliver high-quality garments through trusted manufacturing processes and customer-focused
                service, while upholding social responsibility and operational excellence.
              </p>
            </article>
          </div>
        </section>

        <section className="about-overview reveal-on-scroll" style={{ marginTop: '30px' }}>
          <div className="pro-card">
            <div className="about-headline">
              <Building2 size={22} />
              <h3>Industry Overview</h3>
            </div>
            <p>
              The global textile and apparel industry is one of the world&apos;s most dynamic sectors, driving large-scale employment,
              trade, and innovation. In this competitive landscape, success depends on agility, quality assurance, and responsible
              production. Sree Anjaneya Exports aligns with these demands through integrated manufacturing, dependable quality
              systems, and scalable capabilities for international buyers.
            </p>
          </div>
        </section>

        <section className="about-infrastructure reveal-on-scroll" style={{ marginTop: '30px' }}>
          <div className="pro-card">
            <div className="about-headline">
              <Building2 size={22} />
              <h3>Infrastructure</h3>
            </div>
            <p>
              Our fully integrated facility in Tiruppur includes modern knitting, dyeing, printing, embroidery, and stitching units,
              enabling seamless control from development to dispatch. With advanced machinery and a skilled team, our
              infrastructure delivers:
            </p>
            <div className="grid grid--two" style={{ marginTop: '16px' }}>
              {infrastructurePoints.map((point) => (
                <div className="about-list-card" key={point}>
                  <ShieldCheck size={20} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-business reveal-on-scroll" style={{ marginTop: '40px' }}>
          <div className="section-header center" style={{ marginBottom: '20px' }}>
            <span className="section-subtitle">Our Business, Our Way</span>
            <h2>Partnership and Product Strength</h2>
          </div>
          <div className="grid grid--two" style={{ alignItems: 'start' }}>
            <article className="pro-card">
              <div className="about-headline">
                <Handshake size={22} />
                <h3>Partnership and Supplier Strength</h3>
              </div>
              <ul className="about-bullets">
                {supplierStrength.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="pro-card">
              <div className="about-headline">
                <Package size={22} />
                <h3>Fabrics We Offer</h3>
              </div>
              <ul className="about-bullets">
                {fabricTypes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="about-quality-products reveal-on-scroll" style={{ marginTop: '30px' }}>
          <div className="grid grid--two" style={{ alignItems: 'stretch' }}>
            <article className="pro-card">
              <h3>Quality Commitment</h3>
              <p>
                Quality is embedded at every stage of our process. Our internal quality assurance systems cover raw material
                checks, inline monitoring, final inspections, and packaging validation.
              </p>
              <p>
                We work to stringent AQL standards and continuously improve through training, process control, and
                compliance-focused execution.
              </p>
            </article>
            <article className="pro-card">
              <h3>Our Products and Packaging</h3>
              <p>
                From everyday essentials to specialized knitwear programs, our product portfolio is built to match buyer
                requirements in fit, finish, performance, and presentation.
              </p>
              <p>
                Each shipment is packed with care to ensure product integrity and market-ready delivery.
              </p>
            </article>
          </div>
        </section>

        <section className="about-contact reveal-on-scroll" style={{ marginTop: '40px' }}>
          <div className="pro-card about-contact-card">
            <div className="section-header center" style={{ marginBottom: '18px' }}>
              <span className="section-subtitle">Contact Information</span>
              <h2>Sree Anjaneya Exports</h2>
              <p style={{ margin: 0, color: 'var(--muted)' }}>Innovating Textile Solutions for the Future</p>
            </div>

            <div className="about-contact-grid">
              <div>
                <h4><MapPin size={16} /> Address</h4>
                <p>145, Chitra Garden, Tiruppur, Tamil Nadu, 641604</p>
              </div>
              <div>
                <h4><Phone size={16} /> Phone</h4>
                <p><a href="tel:+919843734959">+91 98437 34959</a></p>
              </div>
              <div>
                <h4><Mail size={16} /> Email</h4>
                <p><a href="mailto:selva.saemd@gmail.com">selva.saemd@gmail.com</a></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
