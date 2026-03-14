import { useState } from 'react';
import './../styles.css';

export default function Traceability() {
    const [orderId, setOrderId] = useState('');
    const [tracked, setTracked] = useState(false);
    const [nodes, setNodes] = useState([]);

    const handleTrack = (e) => {
        e.preventDefault();
        if (!orderId) return;

        // Simulate finding order
        setTracked(true);
        // Sequence of animation
        setNodes([]);

        setTimeout(() => setNodes(['coimbatore']), 500);
        setTimeout(() => setNodes(['coimbatore', 'tiruppur']), 1500);
        setTimeout(() => setNodes(['coimbatore', 'tiruppur', 'chennai']), 2500);
    };
    return (
    <main className="traceability-page app--internal">
      <section className="internal-hero">
        <div className="internal-hero__inner">
          <span className="section-subtitle">Transparency First</span>
          <h1 className="internal-hero__title">Material Traceability</h1>
          <p>Track your garment's journey from raw cotton to the final stitch with our secure traceability map.</p>
        </div>
      </section>

      <div className="page-container" style={{ marginBottom: '80px' }}>
        <section className="trace-search pro-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-header">
            <span className="section-subtitle">Search</span>
            <h2>Track Your Order</h2>
          </div>
          <form onSubmit={handleTrack} className="pro-form" style={{ display: 'flex', gap: '15px' }}>
            <input
              type="text"
              placeholder="Enter Order ID (e.g. ORD-2026)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="pro-input"
              style={{ flex: 1 }}
              required
            />
            <button type="submit" className="pro-button" style={{ padding: '0 40px' }}>Trace</button>
          </form>
        </section>

        {tracked && (
          <div className="grid grid--two" style={{ marginTop: '40px' }}>
            <section className="trace-info pro-card">
              <div className="section-header">
                <span className="section-subtitle">Status</span>
                <h2>Batch: {orderId}</h2>
              </div>
              <div className="trace-steps">
                <div className="contact-item" style={{ 
                  padding: '15px', 
                  borderRadius: 'var(--radius)', 
                  borderLeft: `4px solid ${nodes.includes('coimbatore') ? '#10B981' : 'var(--border)'}`,
                  background: nodes.includes('coimbatore') ? '#F0FDF4' : 'transparent',
                  marginBottom: '15px'
                }}>
                  <span className="section-subtitle" style={{ margin: 0 }}>Cotton Source</span>
                  <p className="contact-text" style={{ fontSize: '1.2rem' }}>Coimbatore</p>
                </div>
                <div className="contact-item" style={{ 
                  padding: '15px', 
                  borderRadius: 'var(--radius)', 
                  borderLeft: `4px solid ${nodes.includes('tiruppur') ? '#3B82F6' : 'var(--border)'}`,
                  background: nodes.includes('tiruppur') ? '#EFF6FF' : 'transparent',
                  marginBottom: '15px'
                }}>
                  <span className="section-subtitle" style={{ margin: 0 }}>Spinning Mill</span>
                  <p className="contact-text" style={{ fontSize: '1.2rem' }}>Tiruppur</p>
                </div>
                <div className="contact-item" style={{ 
                  padding: '15px', 
                  borderRadius: 'var(--radius)', 
                  borderLeft: `4px solid ${nodes.includes('chennai') ? '#8B5CF6' : 'var(--border)'}`,
                  background: nodes.includes('chennai') ? '#F5F3FF' : 'transparent'
                }}>
                  <span className="section-subtitle" style={{ margin: 0 }}>Export Unit</span>
                  <p className="contact-text" style={{ fontSize: '1.2rem' }}>Chennai</p>
                </div>
              </div>
            </section>

            <section className="trace-map pro-card center">
              <svg viewBox="0 0 500 600" style={{ width: '100%', height: 'auto', maxHeight: '450px' }}>
                <path d="M100,50 L300,50 L400,200 L350,450 L200,550 L50,400 Z" fill="#F8FAFC" stroke="var(--border)" strokeWidth="2" />
                
                {/* Coimbatore */}
                <g style={{ opacity: nodes.includes('coimbatore') ? 1 : 0.2, transition: '0.5s' }} transform="translate(150, 350)">
                  <circle r="10" fill="#10B981" />
                  <text y="25" textAnchor="middle" fill="var(--primary)" fontSize="12" fontWeight="700">Coimbatore</text>
                </g>

                {/* Path 1 */}
                <line x1="150" y1="350" x2="250" y2="300" stroke="#10B981" strokeWidth="3" strokeDasharray="6" style={{ opacity: nodes.includes('tiruppur') ? 1 : 0 }} />

                {/* Tiruppur */}
                <g style={{ opacity: nodes.includes('tiruppur') ? 1 : 0, transition: '0.5s' }} transform="translate(250, 300)">
                  <circle r="10" fill="#3B82F6" />
                  <text y="25" textAnchor="middle" fill="var(--primary)" fontSize="12" fontWeight="700">Tiruppur</text>
                </g>

                {/* Path 2 */}
                <line x1="250" y1="300" x2="350" y2="150" stroke="#3B82F6" strokeWidth="3" strokeDasharray="6" style={{ opacity: nodes.includes('chennai') ? 1 : 0 }} />

                {/* Chennai */}
                <g style={{ opacity: nodes.includes('chennai') ? 1 : 0, transition: '0.5s' }} transform="translate(350, 150)">
                  <circle r="10" fill="#8B5CF6" />
                  <text y="25" textAnchor="middle" fill="var(--primary)" fontSize="12" fontWeight="700">Chennai</text>
                </g>
              </svg>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
