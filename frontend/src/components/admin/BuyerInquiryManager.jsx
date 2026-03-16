import React, { useState } from 'react';
import {
  Users,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Loader2
} from 'lucide-react';
import { apiFetch } from '../../lib/api';

const PIPELINE_STAGES = ['Sourcing', 'Cutting', 'Stitching', 'QC', 'Shipping'];

const STAGE_COLORS = {
  New:       { bg: '#dbeafe', text: '#2563eb' },
  Sourcing:  { bg: '#fef3c7', text: '#d97706' },
  Cutting:   { bg: '#fde68a', text: '#b45309' },
  Stitching: { bg: '#fed7aa', text: '#c2410c' },
  QC:        { bg: '#e0e7ff', text: '#4338ca' },
  Shipping:  { bg: '#a7f3d0', text: '#047857' },
  Completed: { bg: '#dcfce7', text: '#16a34a' },
  Rejected:  { bg: '#fee2e2', text: '#dc2626' }
};

function PipelineBar({ currentStatus }) {
  const activeIndex = PIPELINE_STAGES.indexOf(currentStatus);
  if (activeIndex === -1) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'nowrap' }}>
      {PIPELINE_STAGES.map((stage, i) => {
        const isDone = i < activeIndex;
        const isActive = i === activeIndex;
        return (
          <React.Fragment key={stage}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              <div style={{
                width: '26px', height: '26px', borderRadius: '50%',
                background: isDone ? '#10b981' : isActive ? '#f59e0b' : '#e2e8f0',
                color: isDone || isActive ? 'white' : '#94a3b8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: 800, flexShrink: 0,
                border: isActive ? '2px solid #f59e0b' : '2px solid transparent',
                boxShadow: isActive ? '0 0 0 3px rgba(245,158,11,0.2)' : 'none'
              }}>
                {isDone ? <CheckCircle2 size={13} /> : isActive ? <Loader2 size={13} /> : <Circle size={13} />}
              </div>
              <span style={{
                fontSize: '9px', fontWeight: isActive ? 700 : 500,
                color: isDone ? '#10b981' : isActive ? '#f59e0b' : '#94a3b8',
                whiteSpace: 'nowrap'
              }}>{stage}</span>
            </div>
            {i < PIPELINE_STAGES.length - 1 && (
              <div style={{
                height: '2px', width: '18px', flexShrink: 0, marginBottom: '14px',
                background: isDone ? '#10b981' : '#e2e8f0', borderRadius: '2px'
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }) {
  const col = STAGE_COLORS[status] || STAGE_COLORS.New;
  return (
    <span style={{
      padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
      background: col.bg, color: col.text, display: 'inline-block', whiteSpace: 'nowrap'
    }}>
      {status || 'New'}
    </span>
  );
}

const BuyerInquiryManager = ({ buyers, onRefresh }) => {
  const [selectedBuyer, setSelectedBuyer] = useState(null);

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
          alert('Inquiry confirmed. A linked inventory order has been created for this buyer.');
        }
      }
    } catch {
      alert('Failed to update status');
    }
  };

  if (selectedBuyer) {
    const activeIndex = PIPELINE_STAGES.indexOf(selectedBuyer.status);
    const inPipeline = activeIndex !== -1;
    return (
      <div className="pro-card animate-slide-in" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '25px 30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px' }}>
                {selectedBuyer.companyName?.charAt(0) || 'B'}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{selectedBuyer.companyName}</h2>
              <StatusBadge status={selectedBuyer.status} />
            </div>
            <p className="cap-desc" style={{ margin: 0, marginLeft: '55px' }}>
              Submitted by {selectedBuyer.contactPerson} on {new Date(selectedBuyer.submittedAt).toLocaleString()}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <select
              value={selectedBuyer.status || 'New'}
              onChange={(e) => handleUpdateStatus(selectedBuyer._id, e.target.value)}
              style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 600, color: '#0f172a' }}
            >
              <option value="New">New</option>
              <optgroup label="Production Pipeline">
                <option value="Sourcing">Sourcing — In Progress</option>
                <option value="Cutting">Cutting — In Progress</option>
                <option value="Stitching">Stitching — In Progress</option>
                <option value="QC">QC — In Progress</option>
                <option value="Shipping">Shipping — In Progress</option>
              </optgroup>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button onClick={() => setSelectedBuyer(null)} className="btn btn--secondary" style={{ padding: '0 20px' }}>Back to List</button>
          </div>
        </div>

        {/* Pipeline Progress Banner */}
        {inPipeline && (
          <div style={{ padding: '20px 30px', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', borderBottom: '1px solid #1e3a5f' }}>
            <div style={{ marginBottom: '12px', fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Production Pipeline
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0' }}>
              {PIPELINE_STAGES.map((stage, i) => {
                const isDone = i < activeIndex;
                const isActive = i === activeIndex;
                return (
                  <React.Fragment key={stage}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '70px' }}>
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '50%',
                        background: isDone ? '#10b981' : isActive ? '#f59e0b' : 'rgba(255,255,255,0.08)',
                        color: isDone || isActive ? 'white' : '#64748b',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 900, fontSize: '13px',
                        border: isActive ? '2px solid #f59e0b' : isDone ? '2px solid #10b981' : '2px solid rgba(255,255,255,0.1)',
                        boxShadow: isActive ? '0 0 0 4px rgba(245,158,11,0.25)' : 'none'
                      }}>
                        {isDone ? '✓' : i + 1}
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: isActive ? 800 : 600, color: isDone ? '#10b981' : isActive ? '#f59e0b' : '#64748b', textAlign: 'center' }}>{stage}</div>
                      <div style={{ fontSize: '10px', color: isDone ? '#6ee7b7' : isActive ? '#fcd34d' : '#475569', textAlign: 'center' }}>
                        {isDone ? 'Completed' : isActive ? 'In Progress' : 'Pending'}
                      </div>
                    </div>
                    {i < PIPELINE_STAGES.length - 1 && (
                      <div style={{ flex: 1, height: '2px', background: isDone ? '#10b981' : 'rgba(255,255,255,0.1)', margin: '22px 8px 0', borderRadius: '2px' }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ padding: '30px', overflowY: 'auto', flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '30px' }}>
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
                  {selectedBuyer.requirements || 'No details provided.'}
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
                <th style={{ padding: '20px', fontWeight: 600, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Pipeline / Status</th>
                <th style={{ padding: '20px 25px', fontWeight: 600, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((customer) => {
                const inPipeline = PIPELINE_STAGES.includes(customer.status);
                return (
                  <tr key={customer._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} className="table-row-hover">
                    <td style={{ padding: '20px 25px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
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
                          <Mail size={12} color="#64748b" />
                          <span style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{customer.email}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                          <Phone size={12} color="#64748b" />
                          <span>{customer.phone || 'N/A'}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px' }}>
                        <Calendar size={14} />
                        {new Date(customer.submittedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      {inPipeline
                        ? <PipelineBar currentStatus={customer.status} />
                        : <StatusBadge status={customer.status} />
                      }
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
                );
              })}
            </tbody>
          </table>
          <style>{`.table-row-hover:hover { background: #f8fafc; cursor: pointer; }`}</style>
        </div>
      </div>
    </div>
  );
};

export default BuyerInquiryManager;
