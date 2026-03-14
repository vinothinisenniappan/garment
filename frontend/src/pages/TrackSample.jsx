import { useState } from 'react';
import { apiFetch } from '../lib/api';
import './../styles.css';
import { Search, PackageSearch, MapPin, Truck, CheckCircle2, Clock, Check } from 'lucide-react';

export default function TrackSample() {
  const [inquiryId, setInquiryId] = useState('');
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!inquiryId.trim()) return;

    setLoading(true);
    setError('');
    setInquiry(null);

    try {
      const res = await apiFetch(`/api/sample-inquiries/track/${inquiryId.trim()}`);
      if (res.success) {
        setInquiry(res.inquiry);
      } else {
        setError(res.message || 'Inquiry not found.');
      }
    } catch (err) {
      setError('A network error occurred or Inquiry not found.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Under Review': return 2;
      case 'Sample in Development': return 3;
      case 'Shipped': return 4;
      default: return 1;
    }
  };

  return (
    <div className="track-sample-page" style={{ paddingTop: '120px', paddingBottom: '80px', background: '#f8fafc', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary)', color: 'white', marginBottom: '20px' }}>
            <PackageSearch size={30} />
          </div>
          <h1 className="section-title">Live Inquiry Tracking</h1>
          <p className="cap-desc">Enter your Inquiry ID (e.g., SMP-2026-0012) to track the real-time status of your sample development.</p>
        </div>

        <div className="pro-card" style={{ padding: '30px', marginBottom: '40px' }}>
          <form onSubmit={handleTrack} style={{ display: 'flex', gap: '15px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <div style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                <Search size={20} />
              </div>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter Inquiry ID" 
                value={inquiryId} 
                onChange={(e) => setInquiryId(e.target.value)}
                style={{ paddingLeft: '45px', height: '60px', fontSize: '1.2rem', textTransform: 'uppercase' }}
                required
              />
            </div>
            <button type="submit" className="btn btn--primary" style={{ padding: '0 40px', height: '60px', fontSize: '1.1rem' }} disabled={loading}>
              {loading ? 'Searching...' : 'Track'}
            </button>
          </form>
          {error && <div style={{ color: '#ef4444', marginTop: '15px', fontWeight: 500 }}>{error}</div>}
        </div>

        {inquiry && (
          <div className="pro-card animate-slide-in" style={{ overflow: 'hidden' }}>
            <div style={{ background: '#0f172a', padding: '25px 30px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Inquiry Details</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent)' }}>{inquiry.inquiryId}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Date Submitted</div>
                <div style={{ fontWeight: 600 }}>{new Date(inquiry.createdAt).toLocaleDateString()}</div>
              </div>
            </div>

            <div style={{ padding: '40px 30px' }}>
              
              {/* Stepper */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', marginBottom: '50px' }}>
                <div style={{ position: 'absolute', top: '20px', left: '10%', right: '10%', height: '4px', background: '#e2e8f0', zIndex: 0 }}></div>
                
                {['Pending', 'Under Review', 'Sample in Development', 'Shipped'].map((step, idx) => {
                  const stepNum = idx + 1;
                  const currentStep = getStatusStep(inquiry.status);
                  const isCompleted = stepNum < currentStep;
                  const isActive = stepNum === currentStep;

                  let bgColor = '#e2e8f0';
                  let iconColor = '#94a3b8';
                  if (isActive) { bgColor = 'var(--primary)'; iconColor = 'white'; }
                  if (isCompleted) { bgColor = '#10b981'; iconColor = 'white'; }

                  return (
                    <div key={idx} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                      <div style={{ 
                        width: '44px', height: '44px', borderRadius: '50%', background: bgColor, color: iconColor, 
                        display: 'grid', placeItems: 'center', transition: 'all 0.3s',
                        boxShadow: isActive ? '0 0 0 5px rgba(15, 23, 42, 0.1)' : 'none'
                      }}>
                        {isCompleted ? <Check size={20} /> : 
                          idx === 0 ? <Clock size={20} /> :
                          idx === 1 ? <Search size={20} /> :
                          idx === 2 ? <Ruler size={20} /> : <Truck size={20} />
                        }
                      </div>
                      <div style={{ fontWeight: isActive ? 800 : 500, color: isActive ? 'var(--primary)' : '#64748b', fontSize: '14px', width: '100px', textAlign: 'center', lineHeight: '1.2' }}>
                        {step}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Info Grid */}
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '25px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px' }}>
                <div>
                  <div className="cap-desc" style={{ marginBottom: '5px' }}>Product</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{inquiry.product?.type} {inquiry.product?.category}</div>
                </div>
                <div>
                  <div className="cap-desc" style={{ marginBottom: '5px' }}>Fabric</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{inquiry.fabric?.type} {inquiry.fabric?.gsm}</div>
                </div>
                <div>
                  <div className="cap-desc" style={{ marginBottom: '5px' }}>Quantity requested</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{inquiry.product?.quantity} units</div>
                </div>
                <div>
                  <div className="cap-desc" style={{ marginBottom: '5px' }}>Shipping To</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{inquiry.shipping?.city}, {inquiry.shipping?.country}</div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Temporary workaround for Ruler icon which might not be imported if unused before
import { Ruler } from 'lucide-react';
