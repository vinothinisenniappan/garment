import React, { useState } from 'react';
import { 
  Ticket, 
  Plus, 
  Calendar, 
  Percent,
  CircleCheck
} from 'lucide-react';

const CouponManager = ({ coupons, onAdd }) => {
  const [formData, setFormData] = useState({ code: '', discount: '', expiry: '' });

  return (
    <div className="coupon-manager animate-fade-in">
      <div className="grid grid--two" style={{ gap: '30px', alignItems: 'start' }}>
        <div className="pro-card" style={{ padding: '25px' }}>
          <div className="section-header" style={{ marginBottom: '20px' }}>
            <span className="section-subtitle">Promotions</span>
            <h2>Create Coupon</h2>
          </div>
          <div style={{ display: 'grid', gap: '15px' }}>
            <div className="pro-field">
              <label>Coupon Code</label>
              <input type="text" className="pro-input" placeholder="e.g. SUMMER25" />
            </div>
            <div className="grid grid--two" style={{ gap: '15px' }}>
              <div className="pro-field" style={{ margin: 0 }}>
                <label>Discount %</label>
                <input type="number" className="pro-input" placeholder="20" />
              </div>
              <div className="pro-field" style={{ margin: 0 }}>
                <label>Expiry Date</label>
                <input type="date" className="pro-input" />
              </div>
            </div>
            <button className="pro-button" style={{ width: '100%' }}>
              <Ticket size={18} />
              <span>Generate Coupon</span>
            </button>
          </div>
        </div>

        <div className="pro-card" style={{ padding: '25px' }}>
          <div className="section-header" style={{ marginBottom: '20px' }}>
            <span className="section-subtitle">Live Offers</span>
            <h2>Active Coupons</h2>
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {coupons.map((coupon) => (
              <div key={coupon._id} className="pro-field" style={{ 
                margin: 0, 
                padding: '15px 20px', 
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                border: '1px dashed #cbd5e1',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px' }}>{coupon.code}</div>
                  <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
                    <span className="cap-desc" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Percent size={12} /> {coupon.discountPercentage}% OFF
                    </span>
                    <span className="cap-desc" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> Exp: {new Date(coupon.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '4px 10px', background: '#dcfce7', color: '#166534', borderRadius: '20px', fontSize: '10px', fontWeight: 800 }}>
                  ACTIVE
                </div>
              </div>
            ))}
            {coupons.length === 0 && (
              <div className="center cap-desc" style={{ padding: '20px' }}>No active coupons. Create one to drive sales.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponManager;
