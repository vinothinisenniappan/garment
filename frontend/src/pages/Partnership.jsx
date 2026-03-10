import React from 'react';

export default function Partnership() {
    const partners = [
        { title: "Imported Knitting", icon: "🧶", desc: "Advanced imported circular knitting machines ensuring high-quality fabric structures and consistent GSM." },
        { title: "Compacting (Tubetex)", icon: "⚙️", desc: "State-of-the-art Tubetex compacting machines providing excellent dimensional stability and a superior finish." },
        { title: "Rotary Printing (Stormac RD IV)", icon: "🎨", desc: "Precision rotary screen printing with Stormac RD IV for vibrant, sharp, and consistent all-over prints." },
        { title: "Soft flow Dyeing / Yarn Dyeing (Thies)", icon: "🧪", desc: "Eco-friendly Thies soft flow and yarn dyeing units, guaranteeing excellent color fastness and even dyeing." },
        { title: "Bleaching (JEMCO)", icon: "✨", desc: "Continuous bleaching range from JEMCO ensuring brilliant whites and perfect fabric preparation." },
        { title: "Computer Embroidery / Applique", icon: "🧵", desc: "High-precision Baurudan and Tajima multi-head machines for intricate embroidery and applique work." },
        { title: "Mercerising (Dornier)", icon: "🌟", desc: "Dornier tubular mercerising plants enhancing luster, strength, and dye affinity of cotton fabrics." },
        { title: "Peach Finishing", icon: "🍑", desc: "Specialized peach finishing machines for a luxurious, ultra-soft hand feel on the fabric surface." },
        { title: "MHM (Austria) Chest Printing", icon: "👕", desc: "Automated MHM Austrian chest printing carousels for high-quality, precise placement prints." }
    ];

    return (
        <main className="partnership-page">
            <section className="history-hero" style={{ '--hero-bg': "url('/assets/infrastructure/maine.png')", padding: '120px 20px 60px', textAlign: 'center' }}>
                <div className="history-hero__inner">
                    <div className="history-hero__text-group">
                        <div className="history-hero__tagline">Strength Through Unity</div>
                        <h1 className="history-hero__title">Our Supplier Network</h1>
                    </div>
                </div>
            </section>

            <div className="page-container" style={{ marginTop: '50px', marginBottom: '80px' }}>
                <section className="partnership-intro" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
                    <h2 style={{ fontSize: '28px', color: 'var(--text)', marginBottom: '20px' }}>A Robust Production Ecosystem in Tirupur</h2>
                    <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.8' }}>
                        We believe that the foundation of exceptional manufacturing lies in strong partnerships.
                        Sree Anjaneya Exports is proud to have long-standing arrangements with the best suppliers
                        and specialized processing units in Tirupur. This integrated network allows us to ensure unparalleled
                        quality, scalable capacity, and timely delivery across all our product lines.
                    </p>
                </section>

                <section className="partnership-grid">
                    <div className="grid grid--three">
                        {partners.map((partner, index) => (
                            <div key={index} className="pro-card pro-card--compact" style={{ padding: '30px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                                <div style={{ fontSize: '40px', marginBottom: '20px', display: 'inline-block', padding: '15px', background: 'var(--accent)', borderRadius: '50%', color: 'white' }}>
                                    {partner.icon}
                                </div>
                                <h3 style={{ fontSize: '20px', marginBottom: '15px', color: 'var(--text)' }}>{partner.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6' }}>{partner.desc}</p>
                            </div>
                        ))}
                    </div>
                    <style>{`
                .partnership-grid .pro-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }
                [data-theme='dark'] .partnership-grid .pro-card:hover {
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
            `}</style>
                </section>

                <section className="cta-section" style={{ marginTop: '80px', textAlign: 'center', padding: '60px 20px', background: 'var(--nav-bg)', borderRadius: 'var(--radius)' }}>
                    <h2 style={{ fontSize: '28px', color: 'white', marginBottom: '20px' }}>Leverage Our Network</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', maxWidth: '600px', margin: '0 auto 30px' }}>
                        Tap into the finest manufacturing capabilities Tirupur has to offer through our established partnerships.
                    </p>
                    <a href="/buyer-inquiry" className="btn btn--primary" style={{ display: 'inline-block', background: 'var(--accent)', color: 'white', border: 'none' }}>Start an Inquiry</a>
                </section>
            </div>
        </main>
    );
}
