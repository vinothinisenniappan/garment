import React from 'react';

export default function Partnership() {
    const partners = [
        {
            title: "Imported Knitting",
            image: "/assets/partnership/knitting.png",
            desc: "Advanced imported circular knitting machines ensuring high-quality fabric structures and consistent GSM."
        },
        {
            title: "Compacting (Tubetex)",
            image: "/assets/partnership/compacting.png",
            desc: "State-of-the-art Tubetex compacting machines providing excellent dimensional stability and a superior finish."
        },
        {
            title: "Rotary Printing (Stormac RD IV)",
            image: "/assets/partnership/printing.png",
            desc: "Precision rotary screen printing with Stormac RD IV for vibrant, sharp, and consistent all-over prints."
        },
        {
            title: "Soft flow Dyeing / Yarn Dyeing (Thies)",
            image: "/assets/partnership/dyeing.png",
            desc: "Eco-friendly Thies soft flow and yarn dyeing units, guaranteeing excellent color fastness and even dyeing."
        },
        {
            title: "Bleaching (JEMCO)",
            image: "/assets/partnership/bleaching.png",
            desc: "Continuous bleaching range from JEMCO ensuring brilliant whites and perfect fabric preparation."
        },
        {
            title: "Computer Embroidery / Applique",
            image: "/assets/partnership/embroidery.png",
            desc: "High-precision Baurudan and Tajima multi-head machines for intricate embroidery and applique work."
        },
        {
            title: "Mercerising (Dornier)",
            image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800",
            desc: "Dornier tubular mercerising plants enhancing luster, strength, and dye affinity of cotton fabrics."
        },
        {
            title: "Peach Finishing",
            image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800",
            desc: "Specialized peach finishing machines for a luxurious, ultra-soft hand feel on the fabric surface."
        },
        {
            title: "MHM (Austria) Chest Printing",
            image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=800",
            desc: "Automated MHM Austrian chest printing carousels for high-quality, precise placement prints."
        }
    ];

    return (
        <main className="partnership-page app--internal">
            <section className="internal-hero">
                <div className="internal-hero__inner">
                    <span className="section-subtitle">Since 1997</span>
                    <h1 className="internal-hero__title">Production Ecosystem</h1>
                    <p>We bridge the gap between world-class technology and Tirupur's legendary craftsmanship through our strategic supplier network.</p>
                </div>
            </section>

            <div className="page-container" style={{ marginBottom: '40px' }}>
                <section className="partnership-intro center">
                    <div className="badge">
                        <span>Global Standards, Local Excellence</span>
                    </div>
                    <h2>Unparalleled Infrastructure</h2>
                    <p className="intro-text">
                        Sree Anjaneya Exports is proud to have long-standing arrangements with the best suppliers
                        and specialized processing units in Tirupur. This integrated network allows us to ensure
                        unparalleled quality, scalable capacity, and timely delivery across all our product lines.
                    </p>
                </section>

                <section className="partnership-grid">
                    <div className="grid grid--three">
                        {partners.map((partner, index) => (
                            <div key={index} className="pro-card">
                                <div className="spec-card__image" style={{ height: '240px' }}>
                                    <img src={partner.image} alt={partner.title} className="pro-image" loading="lazy" />
                                    <div className="spec-card__overlay"></div>
                                </div>
                                <div className="pro-card__content" style={{ padding: '25px' }}>
                                    <h3 style={{ marginBottom: '12px', fontSize: '1.4rem' }}>{partner.title}</h3>
                                    <p className="cap-desc">{partner.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="partnership-cta" style={{ marginTop: '60px' }}>
                    <div className="cta-box" style={{ background: 'white', padding: '60px 40px', borderRadius: 'var(--radius)', textAlign: 'center', color: 'white' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Ready to scale your production?</h2>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '35px' }}>Experience the efficiency of a fully integrated supply chain partner.</p>
                        <a href="/buyer-inquiry" className="pro-button" style={{ background: 'white', color: 'var(--primary)' }}>Start a Partnership Inquiry</a>
                    </div>
                </section>
            </div>
        </main>
    );
}
