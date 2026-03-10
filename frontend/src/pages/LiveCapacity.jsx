import { useState } from 'react';

export default function LiveCapacity() {
    const [product, setProduct] = useState('T-Shirts');
    const [quantity, setQuantity] = useState(1000);
    const [result, setResult] = useState(null);

    const calculateCapacity = (e) => {
        e.preventDefault();
     
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() + 14); 

        const daysToProduce = Math.ceil(quantity / 500); 
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + daysToProduce);

        setResult({
            start: startDate.toLocaleDateString(),
            end: endDate.toLocaleDateString(),
            duration: daysToProduce
        });
    };

    return (
        <div className="page-container capacity-page">
            <div className="capacity-header page-header-overlay">
                <h1>Live Capacity Planner</h1>
                <p>Book your production slots instantly backed by our real-time factory data.</p>
            </div>

            <div className="capacity-content page-content">
                <form onSubmit={calculateCapacity} className="capacity-form glassmorphic" style={{ maxWidth: '600px', margin: '0 auto', padding: '30px' }}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Product Category</label>
                        <select value={product} onChange={(e) => setProduct(e.target.value)} className="pro-input" style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                            <option value="T-Shirts">T-Shirts</option>
                            <option value="Polo Shirts">Polo Shirts</option>
                            <option value="Hoodies">Hoodies</option>
                            <option value="Pyjamas">Pyjamas</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Order Quantity (Pieces)</label>
                        <input
                            type="number"
                            min="500"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="pro-input"
                            style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px' }}
                            required
                        />
                    </div>

                    <button type="submit" className="pro-btn" style={{ width: '100%', padding: '14px', fontSize: '16px', background: 'var(--accent)', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Check Availability</button>
                </form>

                {result && (
                    <div className="capacity-result glassmorphic" style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--accent)', marginBottom: '20px', fontSize: '24px' }}>Production Slot Available!</h3>
                        <div className="timeline-estimate" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '30px 0' }}>
                            <div className="timeline-node" style={{ textAlign: 'center' }}>
                                <span className="node-label" style={{ display: 'block', fontSize: '14px', color: 'var(--muted)', marginBottom: '8px' }}>Start Stitching</span>
                                <strong style={{ fontSize: '18px', color: 'var(--nav-bg)' }}>{result.start}</strong>
                            </div>
                            <div className="timeline-line" style={{ flex: 1, height: '4px', background: 'var(--accent)', margin: '0 20px', position: 'relative', top: '10px' }}></div>
                            <div className="timeline-node" style={{ textAlign: 'center' }}>
                                <span className="node-label" style={{ display: 'block', fontSize: '14px', color: 'var(--muted)', marginBottom: '8px' }}>Completion</span>
                                <strong style={{ fontSize: '18px', color: 'var(--nav-bg)' }}>{result.end}</strong>
                            </div>
                        </div>
                        <p className="estimate-note" style={{ fontSize: '14px', color: 'var(--muted)', background: 'rgba(3,70,148,0.05)', padding: '10px', borderRadius: '6px' }}>Estimated production time: <strong>{result.duration} days</strong> based on current line efficiency.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
