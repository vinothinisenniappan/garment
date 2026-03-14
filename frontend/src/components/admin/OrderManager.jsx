import React from 'react';
import { 
  ClipboardList, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Truck,
  ArrowRight
} from 'lucide-react';

const OrderManager = ({ orders, onUpdateStatus }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' };
      case 'Shipped': return { bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe' };
      case 'Confirmed': return { bg: '#fdf4ff', text: '#701a75', border: '#f5d0fe' };
      case 'Cancelled': return { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' };
      default: return { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' };
    }
  };

  return (
    <div className="order-manager animate-fade-in">
      <div className="grid grid--one" style={{ gap: '20px' }}>
        {orders.map((order) => {
          const style = getStatusStyle(order.status);
          return (
            <div key={order._id} className="pro-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '20px 25px', background: '#f8fafc', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ padding: '10px', background: 'white', borderRadius: '10px', border: '1px solid var(--border)', color: 'var(--primary)' }}>
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>#ORD-{order._id.slice(-6).toUpperCase()}</h3>
                    <p className="cap-desc" style={{ fontSize: '12px' }}>{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>₹{order.totalAmount?.toLocaleString()}</div>
                    <div className="cap-desc" style={{ fontSize: '11px' }}>{order.items?.length || 0} Items</div>
                  </div>
                  <span style={{ 
                    background: style.bg, 
                    color: style.text, 
                    borderColor: style.border,
                    border: '1px solid',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div style={{ padding: '25px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div>
                  <h4 style={{ margin: '0 0 15px', color: '#64748B', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px' }}>Customer & Shipping</h4>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                      {order.buyerId?.companyName?.charAt(0) || 'G'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{order.buyerId?.companyName || 'Guest Customer'}</div>
                      <div className="cap-desc">{order.buyerId?.email}</div>
                      <div style={{ marginTop: '10px', display: 'flex', gap: '8px', alignItems: 'center', color: '#475569', fontSize: '13px' }}>
                        <MapPin size={14} />
                        <span>{order.shippingAddress?.city}, {order.shippingAddress?.country || 'India'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 15px', color: '#64748B', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px' }}>Tracking Operations</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <select 
                      className="pro-input" 
                      style={{ height: '40px', borderRadius: '10px' }}
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order._id, { status: e.target.value })}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button className="pro-button--compact" style={{ width: '100%', height: '40px', borderRadius: '10px', background: '#f1f5f9', color: 'var(--primary)', border: 'none', fontWeight: 700 }}>
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {orders.length === 0 && (
          <div className="pro-card center cap-desc" style={{ padding: '60px' }}>No orders found in the system.</div>
        )}
      </div>
    </div>
  );
};

export default OrderManager;
