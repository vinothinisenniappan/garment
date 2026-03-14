import { useState } from 'react';

export default function TechPackBuilder() {
    const [step, setStep] = useState(1);
    const [pack, setPack] = useState({
        garment: 'T-Shirt',
        gsm: '160',
        pantone: '#ffffff',
        logo: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        // Generate JSON and save to localStorage
        const packs = JSON.parse(localStorage.getItem('techPacks') || '[]');
        const newPack = { ...pack, id: 'TP-' + Date.now().toString().slice(-6), date: new Date().toISOString() };
        packs.push(newPack);
        localStorage.setItem('techPacks', JSON.stringify(packs));
        setSubmitted(true);
    };

    const handleNext = () => setStep(s => s + 1);
    const handlePrev = () => setStep(s => s - 1);
    return (
    <main className="techpack-page app--internal">
      <section className="internal-hero">
        <div className="internal-hero__inner">
          <span className="section-subtitle">Intuitive Design</span>
          <h1 className="internal-hero__title">Tech-Pack Builder</h1>
          <p>Design your product specifications in minutes with our guided professional builder.</p>
        </div>
      </section>

      <div className="page-container" style={{ marginBottom: '80px' }}>
        {submitted ? (
          <div className="pro-card center" style={{ maxWidth: '600px', margin: '60px auto' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>✓</div>
            <h2>Tech Pack Generated!</h2>
            <p className="cap-desc">Your specifications have been saved and sent to our production dashboard.</p>
            <button className="pro-button" onClick={() => { setSubmitted(false); setStep(1); }} style={{ marginTop: '30px' }}>Create Another Tech Pack</button>
          </div>
        ) : (
          <div className="pro-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="builder-header" style={{ marginBottom: '40px' }}>
              <div className="builder-progress" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                {['Garment', 'Fabric', 'Details', 'Review'].map((label, i) => (
                  <div key={label} className="progress-step" style={{ 
                    flex: 1, 
                    textAlign: 'center',
                    paddingBottom: '15px',
                    borderBottom: `3px solid ${step > i ? 'var(--primary)' : 'var(--border)'}`,
                    color: step > i ? 'var(--primary)' : 'var(--muted)',
                    fontWeight: step === i + 1 ? '700' : '500',
                    fontSize: '14px'
                  }}>
                    {i + 1}. {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="builder-content" style={{ minHeight: '350px' }}>
              {step === 1 && (
                <div className="step-pane">
                  <div className="section-header">
                    <span className="section-subtitle">Step 1</span>
                    <h2>Select Base Garment</h2>
                  </div>
                  <div className="grid grid--two">
                    {['T-Shirt', 'Polo Shirt', 'Hoodie', 'Pyjamas'].map(g => (
                      <div
                        key={g}
                        className={`pro-card pro-card--compact center ${pack.garment === g ? 'is-selected' : ''}`}
                        style={{ 
                          cursor: 'pointer',
                          border: pack.garment === g ? '2px solid var(--primary)' : '1px solid var(--border)',
                          background: pack.garment === g ? '#F8FAFC' : 'white'
                        }}
                        onClick={() => setPack({ ...pack, garment: g })}
                      >
                        <h3 style={{ margin: 0 }}>{g}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="step-pane">
                  <div className="section-header">
                    <span className="section-subtitle">Step 2</span>
                    <h2>Fabric Weight (GSM)</h2>
                  </div>
                  <div className="grid grid--three">
                    {['140', '160', '180', '220', '300'].map(g => (
                      <div
                        key={g}
                        className="pro-card pro-card--compact center"
                        style={{ 
                          cursor: 'pointer',
                          border: pack.gsm === g ? '2px solid var(--primary)' : '1px solid var(--border)',
                          background: pack.gsm === g ? '#F8FAFC' : 'white'
                        }}
                        onClick={() => setPack({ ...pack, gsm: g })}
                      >
                        <h3 style={{ margin: 0 }}>{g} GSM</h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="step-pane">
                  <div className="section-header">
                    <span className="section-subtitle">Step 3</span>
                    <h2>Color & Artwork</h2>
                  </div>
                  <div className="pro-form">
                    <div className="pro-field">
                      <label>Select Pantone / Color</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <input
                          type="color"
                          value={pack.pantone}
                          onChange={(e) => setPack({ ...pack, pantone: e.target.value })}
                          style={{ width: '80px', height: '50px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        />
                        <span className="pro-input" style={{ flex: 1, textTransform: 'uppercase', fontWeight: 600 }}>{pack.pantone}</span>
                      </div>
                    </div>
                    <div className="pro-field">
                      <label>Upload Artwork Ref (Optional)</label>
                      <input
                        type="file"
                        className="pro-input"
                        onChange={(e) => setPack({ ...pack, logo: e.target.files[0]?.name || '' })}
                      />
                      {pack.logo && <p className="cap-desc" style={{ marginTop: '10px' }}>Attached: <strong>{pack.logo}</strong></p>}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="step-pane">
                  <div className="section-header">
                    <span className="section-subtitle">Final Step</span>
                    <h2>Review Specifications</h2>
                  </div>
                  <pre style={{ 
                    background: '#0F172A', 
                    color: '#94A3B8', 
                    padding: '30px', 
                    borderRadius: '12px', 
                    fontFamily: 'monospace',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    overflowX: 'auto'
                  }}>
                    {JSON.stringify(pack, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="builder-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', paddingTop: '30px', borderTop: '1px solid var(--border)' }}>
              {step > 1 ? (
                <button className="filter-btn" onClick={handlePrev} style={{ height: '48px', padding: '0 30px' }}>Back</button>
              ) : <div />}
              
              {step < 4 ? (
                <button className="pro-button" onClick={handleNext} style={{ height: '48px', padding: '0 40px' }}>Next Step</button>
              ) : (
                <button className="pro-button" onClick={handleSubmit} style={{ height: '48px', padding: '0 40px', background: '#10B981' }}>Generate Tech-Pack</button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

