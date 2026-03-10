import React from 'react';

export default function QualityPolicy() {
    const qualityPoints = [
        { title: "Stringent Material Testing", icon: "🔬", desc: "Rigorous testing of yarn and fabrics for shrinkage, color fastness, pilling, and dimensional stability before production begins." },
        { title: "Inline Inspections", icon: "👀", desc: "Continuous monitoring during cutting, sewing, and finishing to identify and rectify defects immediately on the production line." },
        { title: "Final Random Inspection (FRI)", icon: "📦", desc: "Comprehensive final audits conducted per international standards to guarantee that only flawless garments ship out." },
        { title: "Safety & Compliance", icon: "🧲", desc: "Strict needle detector procedures and compliance checks to ensure all garments are safe and meet global retail standards." },
        { title: "Continuous Training", icon: "📈", desc: "Regular skill enhancement and calibration for our quality assurance personnel to stay updated with industry best practices." }
    ];

    return (
        <main className="quality-page">
            <section className="history-hero" style={{ '--hero-bg': "url('/assets/infrastructure/o.jpg')", padding: '120px 20px 60px', textAlign: 'center' }}>
                <div className="history-hero__inner">
                    <div className="history-hero__text-group">
                        <div className="history-hero__tagline">Uncompromising Standards</div>
                        <h1 className="history-hero__title">Quality Policy</h1>
                    </div>
                </div>
            </section>

            <div className="page-container" style={{ marginTop: '50px', marginBottom: '80px' }}>
                <section className="quality-intro" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
                    <div style={{ display: 'inline-block', padding: '10px 20px', background: 'rgba(255, 215, 0, 0.1)', border: '1px solid var(--accent)', borderRadius: '30px', marginBottom: '30px' }}>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--accent)' }}>Achieving 1.5 AQL Standard</span>
                    </div>
                    <h2 style={{ fontSize: '32px', color: 'var(--text)', marginBottom: '20px' }}>Excellence in Every Stitch</h2>
                    <p style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: '1.8' }}>
                        Our Quality Standards are incredibly high. We conduct rigorous internal quality assurance at every stage of production. From initial raw material sourcing to the final packaged product, our dedicated QC team ensures that every stage meets the exact specification to deliver premium quality garments.
                    </p>
                </section>

                <section className="quality-grid">
                    <div className="grid grid--three">
                        {qualityPoints.map((point, index) => (
                            <div key={index} className="pro-card pro-card--compact" style={{ padding: '30px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                                <div style={{ fontSize: '40px', marginBottom: '20px', display: 'inline-block', padding: '15px', background: 'var(--accent)', borderRadius: '50%', color: 'white' }}>
                                    {point.icon}
                                </div>
                                <h3 style={{ fontSize: '20px', marginBottom: '15px', color: 'var(--text)' }}>{point.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6' }}>{point.desc}</p>
                            </div>
                        ))}
                    </div>
                    <style>{`
                .quality-grid .pro-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }
                [data-theme='dark'] .quality-grid .pro-card:hover {
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
            `}</style>
                </section>
            </div>
        </main>
    );
}
