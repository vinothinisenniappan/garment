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
        <div className="page-container traceability-page">
            <div className="traceability-header page-header-overlay">
                <h1>Material Traceability Map</h1>
                <p>Track your garment's journey from raw cotton to the final stitch.</p>
            </div>

            <div className="trace-search page-content">
                <form onSubmit={handleTrack} className="trace-form glassmorphic" style={{ maxWidth: '600px', margin: '0 auto', padding: '30px', display: 'flex', gap: '15px' }}>
                    <input
                        type="text"
                        placeholder="Enter Order ID (e.g. ORD-2026)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="pro-input"
                        style={{ flex: 1, padding: '12px', border: '1px solid var(--border)', borderRadius: '8px' }}
                        required
                    />
                    <button type="submit" className="pro-btn" style={{ padding: '12px 24px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Trace</button>
                </form>
            </div>

            {tracked && (
                <div className="trace-map-container page-content" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center', marginTop: '40px' }}>
                    <div className="trace-info glassmorphic" style={{ flex: '1 1 300px', maxWidth: '400px', padding: '30px' }}>
                        <h3 style={{ borderBottom: '2px solid var(--border)', paddingBottom: '15px', marginBottom: '20px' }}>Order: {orderId}</h3>
                        <ul className="trace-steps" style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ padding: '15px', marginBottom: '10px', borderRadius: '8px', transition: 'all 0.3s ease', background: nodes.includes('coimbatore') ? 'rgba(16,185,129,0.1)' : 'transparent', borderLeft: nodes.includes('coimbatore') ? '4px solid #10b981' : '4px solid transparent' }}>
                                <strong style={{ display: 'block', color: 'var(--nav-bg)' }}>Cotton Source:</strong> Coimbatore
                            </li>
                            <li style={{ padding: '15px', marginBottom: '10px', borderRadius: '8px', transition: 'all 0.3s ease', background: nodes.includes('tiruppur') ? 'rgba(59,130,246,0.1)' : 'transparent', borderLeft: nodes.includes('tiruppur') ? '4px solid #3b82f6' : '4px solid transparent' }}>
                                <strong style={{ display: 'block', color: 'var(--nav-bg)' }}>Spinning Mill:</strong> Tiruppur
                            </li>
                            <li style={{ padding: '15px', marginBottom: '10px', borderRadius: '8px', transition: 'all 0.3s ease', background: nodes.includes('chennai') ? 'rgba(139,92,246,0.1)' : 'transparent', borderLeft: nodes.includes('chennai') ? '4px solid #8b5cf6' : '4px solid transparent' }}>
                                <strong style={{ display: 'block', color: 'var(--nav-bg)' }}>Export Unit:</strong> Chennai
                            </li>
                        </ul>
                    </div>

                    <div className="trace-svg-wrapper glassmorphic" style={{ flex: '1 1 400px', maxWidth: '500px', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* Simple visual map of Tamil Nadu logic */}
                        <svg viewBox="0 0 500 600" className="tn-map-svg" style={{ width: '100%', height: 'auto', maxHeight: '500px' }}>
                            {/* Simplified TN map shape */}
                            <path d="M100,50 L300,50 L400,200 L350,450 L200,550 L50,400 Z" fill={typeof window !== 'undefined' && window.localStorage.getItem('theme') === 'dark' ? '#1e293b' : '#f1f5f9'} stroke="var(--border)" strokeWidth="2" />

                            {/* Nodes */}
                            <g className="map-node" style={{ opacity: nodes.includes('coimbatore') ? 1 : 0.3, transition: 'opacity 0.5s ease' }} transform="translate(150, 350)">
                                <circle cx="0" cy="0" r="12" fill="#10b981" />
                                <circle cx="0" cy="0" r="20" fill="transparent" stroke="#10b981" strokeWidth="2" strokeDasharray="4" style={{ animation: nodes.includes('coimbatore') ? 'spin 5s linear infinite' : 'none' }} />
                                <text x="25" y="5" fill="var(--nav-bg)" fontSize="16" fontWeight="bold">Coimbatore (Cotton)</text>
                            </g>

                            {/* Path 1 */}
                            <line x1="150" y1="350" x2="250" y2="300" stroke="#10b981" strokeWidth="4" strokeDasharray="8,8" style={{ strokeDashoffset: nodes.includes('tiruppur') ? 0 : 200, transition: 'stroke-dashoffset 1s ease', opacity: nodes.includes('tiruppur') ? 1 : 0 }} />

                            <g className="map-node" style={{ opacity: nodes.includes('tiruppur') ? 1 : 0, transition: 'opacity 0.5s ease 0.5s' }} transform="translate(250, 300)">
                                <circle cx="0" cy="0" r="12" fill="#3b82f6" />
                                <circle cx="0" cy="0" r="20" fill="transparent" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" style={{ animation: nodes.includes('tiruppur') ? 'spin 5s linear infinite' : 'none' }} />
                                <text x="25" y="5" fill="var(--nav-bg)" fontSize="16" fontWeight="bold">Tiruppur (Spinning)</text>
                            </g>

                            {/* Path 2 */}
                            <line x1="250" y1="300" x2="350" y2="150" stroke="#3b82f6" strokeWidth="4" strokeDasharray="8,8" style={{ strokeDashoffset: nodes.includes('chennai') ? 0 : 300, transition: 'stroke-dashoffset 1s ease', opacity: nodes.includes('chennai') ? 1 : 0 }} />

                            <g className="map-node" style={{ opacity: nodes.includes('chennai') ? 1 : 0, transition: 'opacity 0.5s ease 0.5s' }} transform="translate(350, 150)">
                                <circle cx="0" cy="0" r="12" fill="#8b5cf6" />
                                <circle cx="0" cy="0" r="24" fill="transparent" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4" style={{ animation: nodes.includes('chennai') ? 'spin 5s linear infinite' : 'none' }} />
                                <text x="25" y="5" fill="var(--nav-bg)" fontSize="16" fontWeight="bold">Chennai (Export Unit)</text>
                            </g>
                        </svg>
                        <style>{`
               @keyframes spin { 100% { transform: rotate(360deg); } }
               @keyframes draw { to { stroke-dashoffset: 0; } }
             `}</style>
                    </div>
                </div>
            )}
        </div>
    );
}
