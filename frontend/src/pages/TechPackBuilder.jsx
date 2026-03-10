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

    if (submitted) {
        return (
            <div className="page-container techpack-page">
                <div className="techpack-success glassmorphic" style={{ maxWidth: '600px', margin: '100px auto', padding: '50px', textAlign: 'center' }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
                    <h2 style={{ fontSize: '32px', marginBottom: '15px', color: 'var(--nav-bg)' }}>Tech Pack Generated!</h2>
                    <p style={{ color: 'var(--muted)', marginBottom: '30px', fontSize: '18px' }}>Your specifications have been saved and sent to our production dashboard.</p>
                    <button className="pro-btn" onClick={() => { setSubmitted(false); setStep(1); }} style={{ padding: '12px 24px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>Create Another</button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container techpack-page">
            <div className="techpack-header page-header-overlay">
                <h1>Custom Tech-Pack Builder</h1>
                <p>Design your product specifications intuitively in minutes.</p>
            </div>

            <div className="techpack-builder glassmorphic page-content" style={{ maxWidth: '800px', margin: '40px auto', padding: '40px' }}>
                <div className="builder-progress" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '2px solid var(--border)', paddingBottom: '20px' }}>
                    <div className="progress-step" style={{ fontWeight: step >= 1 ? 'bold' : 'normal', color: step >= 1 ? 'var(--accent)' : 'var(--muted)' }}>1. Garment</div>
                    <div className="progress-step" style={{ fontWeight: step >= 2 ? 'bold' : 'normal', color: step >= 2 ? 'var(--accent)' : 'var(--muted)' }}>2. Fabric</div>
                    <div className="progress-step" style={{ fontWeight: step >= 3 ? 'bold' : 'normal', color: step >= 3 ? 'var(--accent)' : 'var(--muted)' }}>3. Color & Logo</div>
                    <div className="progress-step" style={{ fontWeight: step >= 4 ? 'bold' : 'normal', color: step >= 4 ? 'var(--accent)' : 'var(--muted)' }}>4. Review</div>
                </div>

                <div className="builder-content" style={{ minHeight: '300px' }}>
                    {step === 1 && (
                        <div className="step-pane animate-fade-in">
                            <h3 style={{ marginBottom: '20px', fontSize: '24px' }}>Select Base Garment</h3>
                            <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
                                {['T-Shirt', 'Polo Shirt', 'Hoodie', 'Pyjamas'].map(g => (
                                    <div
                                        key={g}
                                        className="option-card"
                                        style={{
                                            padding: '30px',
                                            border: pack.garment === g ? '2px solid var(--accent)' : '2px solid var(--border)',
                                            borderRadius: '12px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            background: pack.garment === g ? 'rgba(3,70,148,0.05)' : 'transparent',
                                            transition: 'all 0.2s',
                                            fontWeight: 'bold'
                                        }}
                                        onClick={() => setPack({ ...pack, garment: g })}
                                    >
                                        {g}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-pane animate-fade-in">
                            <h3 style={{ marginBottom: '20px', fontSize: '24px' }}>Select Fabric GSM</h3>
                            <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '20px' }}>
                                {['140', '160', '180', '220', '300'].map(g => (
                                    <div
                                        key={g}
                                        className="option-card"
                                        style={{
                                            padding: '30px',
                                            border: pack.gsm === g ? '2px solid var(--accent)' : '2px solid var(--border)',
                                            borderRadius: '12px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            background: pack.gsm === g ? 'rgba(3,70,148,0.05)' : 'transparent',
                                            transition: 'all 0.2s',
                                            fontWeight: 'bold'
                                        }}
                                        onClick={() => setPack({ ...pack, gsm: g })}
                                    >
                                        {g} GSM
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-pane animate-fade-in">
                            <h3 style={{ marginBottom: '20px', fontSize: '24px' }}>Choose Color & Artwork</h3>
                            <div className="form-group" style={{ marginBottom: '30px' }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Pantone / Color</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <input
                                        type="color"
                                        value={pack.pantone}
                                        onChange={(e) => setPack({ ...pack, pantone: e.target.value })}
                                        style={{ width: '60px', height: '60px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                                    />
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>{pack.pantone}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Upload Logo (Optional Simulation)</label>
                                <input
                                    type="file"
                                    className="pro-input"
                                    style={{ width: '100%', padding: '15px', border: '2px dashed var(--border)', borderRadius: '8px', background: 'transparent' }}
                                    onChange={(e) => setPack({ ...pack, logo: e.target.files[0]?.name || '' })}
                                />
                                {pack.logo && <p style={{ marginTop: '10px', color: 'var(--accent)', fontWeight: 'bold' }}>Attached: {pack.logo}</p>}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="step-pane review-pane animate-fade-in">
                            <h3 style={{ marginBottom: '20px', fontSize: '24px' }}>Review Specifications</h3>
                            <pre className="json-preview" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', padding: '20px', borderRadius: '12px', overflowX: 'auto', color: 'var(--nav-bg)', fontFamily: 'monospace', fontSize: '16px' }}>
                                {JSON.stringify(pack, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>

                <div className="builder-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                    {step > 1 ? (
                        <button className="ghost-btn" onClick={handlePrev} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', color: 'var(--nav-bg)' }}>Back</button>
                    ) : <div></div>}

                    {step < 4 ? (
                        <button className="pro-btn" onClick={handleNext} style={{ padding: '12px 24px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Next Step</button>
                    ) : (
                        <button className="pro-btn" onClick={handleSubmit} style={{ padding: '12px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Generate Tech-Pack</button>
                    )}
                </div>
            </div>
            <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
