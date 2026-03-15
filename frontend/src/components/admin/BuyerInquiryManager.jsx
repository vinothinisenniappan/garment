import React, { useState } from 'react';
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar,
  Briefcase,
  MapPin,
  FileText,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { apiFetch } from '../../lib/api';

const BuyerInquiryManager = ({ buyers, onRefresh }) => {
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return { bg: '#dbeafe', text: '#2563eb' }; // Blue
      case 'Contacted': return { bg: '#fef3c7', text: '#d97706' }; // Yellow
      case 'Qualified': return { bg: '#dcfce3', text: '#16a34a' }; // Green
      case 'Rejected': return { bg: '#fee2e2', text: '#dc2626' }; // Red
      default: return { bg: '#f1f5f9', text: '#64748b' };
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await apiFetch(`/api/admin/buyers/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.success) {
        if (selectedBuyer?._id === id) setSelectedBuyer(res.buyer);
        if (onRefresh) onRefresh();
        if (res.autoOrderCreated) {
          alert('Inquiry confirmed. A linked inventory order with product details has been created for this buyer.');
        }
      }
    } catch (error) {
      alert('Failed to update status');
    }
  };

  if (selectedBuyer) {
    return (
      <div className="pro-card animate-slide-in" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '25px 30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
          <div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px'
              }}>
                {selectedBuyer.companyName?.charAt(0) || 'B'}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{selectedBuyer.companyName}</h2>
              <span style={{ 
                padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                background: getStatusColor(selectedBuyer.status).bg,
                color: getStatusColor(selectedBuyer.status).text
              }}>
                {selectedBuyer.status || 'New'}
              </span>
            </div>
            <p className="cap-desc" style={{ margin: 0, marginLeft: '55px' }}>Submitted by {selectedBuyer.contactPerson} on {new Date(selectedBuyer.submittedAt).toLocaleString()}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <select 
              value={selectedBuyer.status} 
              onChange={(e) => handleUpdateStatus(selectedBuyer._id, e.target.value)}
              style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 600, color: '#0f172a' }}
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Rejected</option>
            </select>
            <button onClick={() => setSelectedBuyer(null)} className="btn btn--secondary" style={{ padding: '0 20px' }}>Back to List</button>
          </div>
        </div>

        <div style={{ padding: '30px', overflowY: 'auto', flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '30px' }}>
          
          {/* Contact Details */}
          <div className="pro-card" style={{ padding: '25px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <Users size={18} /> Contact & Company
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}><label className="cap-desc">Contact Person</label><div style={{ fontWeight: 600 }}>{selectedBuyer.contactPerson}</div></div>
                <div style={{ flex: 1 }}><label className="cap-desc">Business Type</label><div style={{ fontWeight: 600 }}>{selectedBuyer.businessType || 'N/A'}</div></div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}><label className="cap-desc">Email</label><div><a href={`mailto:${selectedBuyer.email}`}>{selectedBuyer.email}</a></div></div>
                <div style={{ flex: 1 }}><label className="cap-desc">Phone</label><div>{selectedBuyer.phone}</div></div>
              </div>
              <div>
                <label className="cap-desc">Location</label>
                <div>{selectedBuyer.address && `${selectedBuyer.address}, `}{selectedBuyer.country}</div>
              </div>
            </div>
          </div>

          {/* Sourcing Requirements */}
          <div className="pro-card" style={{ padding: '25px', background: '#f8fafc' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <Briefcase size={18} /> Sourcing Requirements
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label className="cap-desc">Expected Annual Volume / Quantity</label>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>{selectedBuyer.annualVolume || 'Not Specified'}</div>
              </div>
              <div>
                <label className="cap-desc">Detailed Requirements</label>
                <div style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', lineHeight: '1.6' }}>
                  {selectedBuyer.requirements ? selectedBuyer.requirements : 'No details provided.'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="customer-list animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="pro-card" style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div className="pro-table-wrap" style={{ flex: 1, overflowY: 'auto' }}>
          <table className="pro-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '20px 25px', fontWeight: 600, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Company & Contact</th>
                <th style={{ padding: '20px', fontWeight: 600, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Info</th>
                <th style={{ padding: '20px', fontWeight: 600, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</th>
                <th style={{ padding: '20px', fontWeight: 600, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                <th style={{ padding: '20px 25px', fontWeight: 600, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((customer) => {
                const statusColors = getStatusColor(customer.status);
                return (
                  <tr key={customer._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} className="table-row-hover">
                    <td style={{ padding: '20px 25px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ 
                          width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px'
                        }}>
                          {customer.companyName?.charAt(0) || 'B'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{customer.companyName}</div>
                          <div className="cap-desc" style={{ fontSize: '11px' }}>{customer.contactPerson}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                          <Mail size={12} color="#64748B" />
                          <span style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{customer.email}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                          <Phone size={12} color="#64748B" />
                          <span>{customer.phone || 'N/A'}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '13px' }}>
                        <Calendar size={14} />
                        {new Date(customer.submittedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <span style={{ 
                        padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                        background: statusColors.bg, color: statusColors.text, display: 'inline-block'
                      }}>
                        {customer.status || 'New'}
                      </span>
                    </td>
                    <td style={{ padding: '20px 25px', textAlign: 'right' }}>
                      <button 
                        onClick={() => setSelectedBuyer(customer)}
                        className="btn btn--secondary" 
                        style={{ padding: '8px 12px', fontSize: '13px', border: '1px solid #e2e8f0', background: 'white' }}
                      >
                        Review <ArrowUpRight size={14} style={{ marginLeft: '5px' }} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <style>{`
            .table-row-hover:hover { background: #f8fafc; cursor: pointer; }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default BuyerInquiryManager;
