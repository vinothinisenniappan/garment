import React from 'react';
import { Microscope, Eye, Archive, ShieldAlert, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function QualityPolicy() {
    const qualityPoints = [
        { title: "Material Testing", icon: <Microscope size={24} />, desc: "Rigorous testing of yarn and fabrics for pilling, and dimensional stability before production.", color: "#6366F1" },
        { title: "Inline Inspections", icon: <Eye size={24} />, desc: "Continuous monitoring during cutting and sewing to rectify defects immediately on the line.", color: "#38BDF8" },
        { title: "Final Audits (FRI)", icon: <Archive size={24} />, desc: "Comprehensive final audits conducted per AQL 2.5 standards to guarantee flawless delivery.", color: "#0F2E5A" },
        { title: "Global Compliance", icon: <ShieldAlert size={24} />, desc: "Strict needle detector procedures and compliance checks to meet global retail standards.", color: "#10B981" },
        { title: "Skill Enhancement", icon: <TrendingUp size={24} />, desc: "Regular training and calibration for our QA personnel to stay updated with industry best practices.", color: "#F59E0B" }
    ];

    return (
    <main className="quality-page app--internal">
      <section className="internal-hero">
        <div className="internal-hero__inner scale-reveal">
          <span className="section-subtitle">Uncompromising Trust</span>
          <h1 className="internal-hero__title">Quality Assurance</h1>
          <p>Defining excellence through rigorous testing, continuous monitoring, and absolute compliance with global hosiery standards.</p>
        </div>
      </section>

        <div className="page-container" style={{ marginBottom: '80px' }}>
          <section className="quality-intro reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 50px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(15, 46, 90, 0.05)', borderRadius: '50px', color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '25px' }}>
              <CheckCircle2 size={18} color="var(--secondary)" />
              Achieving 1.5 AQL Global Standard
            </div>
            <h2 style={{ fontSize: '2.8rem', marginBottom: '20px' }}>Excellence in Every Stitch</h2>
            <p className="intro-text" style={{ fontSize: '1.2rem', color: 'var(--muted)', lineHeight: '1.8' }}>
              Our Quality Standards are set beyond industry benchmarks. We conduct rigorous internal quality assurance at every stage—from initial raw material sourcing to the final packaged product—ensuring zero-defect delivery.
            </p>
          </section>

          <section className="quality-grid">
            <div className="grid grid--three" style={{ gap: '30px' }}>
              {qualityPoints.map((point, index) => (
                <div key={index} className="pro-card reveal-on-scroll" style={{ animationDelay: `${index * 0.15}s`, padding: '40px' }}>
                  <div className="cap-icon" style={{ marginBottom: '30px', background: `${point.color}10` }}>
                    <span style={{ color: point.color }}>{point.icon}</span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>{point.title}</h3>
                  <p className="cap-desc" style={{ fontSize: '1rem', lineHeight: '1.6' }}>{point.desc}</p>
                </div>
              ))}
              
              {/* Specialized trust card */}
              <div className="pro-card reveal-on-scroll" style={{ gridColumn: 'span 1', background: 'var(--primary)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px', animationDelay: '0.9s' }}>
                 <h2 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '15px' }}>Global Certifications</h2>
                 <p style={{ opacity: '0.8', marginBottom: '25px' }}>Our facilities are audited for social, environmental, and technical compliance by leading global agencies.</p>
                 <button className="pro-button" style={{ background: 'white', color: 'var(--primary)', border: 'none', width: 'fit-content' }}>View Compliance Docs</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
}
