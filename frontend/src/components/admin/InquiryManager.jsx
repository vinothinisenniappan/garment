import { useState, useEffect } from 'react'
import { CheckCircle2, Clock, XCircle, Search, Box, ChevronDown } from 'lucide-react'
import { apiFetch } from '../../lib/api'

export default function InquiryManager({ onRefresh }) {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterMode, setFilterMode] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [confirmingId, setConfirmingId] = useState(null)
  
  const fetchInquiries = async () => {
    try {
      setLoading(true)
      const res = await apiFetch('/api/admin/inquiries')
      if (res.success) {
        setInquiries(res.inquiries)
      } else {
        setError(res.message || 'Error fetching inquiries')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  const handleConfirm = async (id) => {
    try {
      setConfirmingId(id)
      const res = await apiFetch(`/api/admin/inquiries/${id}/confirm`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: 'Confirmed by Admin via Dashboard' })
      })

      if (res.success) {
        // Optimistic UI update or re-fetch
        fetchInquiries()
        if (onRefresh) onRefresh()
        alert('Inquiry confirmed successfully and inventory updated!')
      } else {
        alert(`Error: ${res.message}`)
      }
    } catch (err) {
      alert(`Error confirming inquiry: ${err.message}`)
    } finally {
      setConfirmingId(null)
    }
  }

  const filteredInquiries = inquiries.filter(inq => {
    if (filterMode !== 'All' && inq.status !== filterMode) return false
    
    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      const searchStr = `${inq.companyName} ${inq.contactPerson} ${inq.email} ${inq.productId?.name}`.toLowerCase()
      if (!searchStr.includes(q)) return false
    }
    return true
  })

  if (loading) return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto 20px' }}></div>
      <p className="cap-desc">Loading inquiries...</p>
    </div>
  )

  if (error) return (
    <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>
      <p>{error}</p>
      <button onClick={fetchInquiries} className="pro-button mt-4">Retry</button>
    </div>
  )

  return (
    <div className="inquiry-manager">
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search company, contact, email or product name..." 
            className="pro-input" 
            style={{ paddingLeft: '45px', width: '100%' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="pro-input" 
          value={filterMode} 
          onChange={e => setFilterMode(e.target.value)}
          style={{ width: '160px' }}
        >
          <option value="All">All Inquiries</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button className="pro-button--compact" onClick={fetchInquiries}>
          Refresh
        </button>
      </div>

      <div className="pro-card" style={{ padding: 0, overflow: 'hidden' }}>
        {filteredInquiries.length === 0 ? (
          <div style={{ padding: '60px 40px', textAlign: 'center', color: '#64748b' }}>
            <Box size={40} style={{ margin: '0 auto 15px', opacity: 0.3 }} />
            <h3 style={{ fontSize: '1.2rem', color: '#334155', fontWeight: 700 }}>No inquiries found</h3>
            <p style={{ marginTop: '5px' }}>Try adjusting your search criteria</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 700 }}>Buyer Details</th>
                  <th style={{ padding: '16px 24px', fontWeight: 700 }}>Product Details</th>
                  <th style={{ padding: '16px 24px', fontWeight: 700 }}>Req. Qty</th>
                  <th style={{ padding: '16px 24px', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '16px 24px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map(inq => (
                  <tr key={inq._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>{inq.companyName || inq.contactPerson || 'Unknown Buyer'}</div>
                      <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', gap: '10px' }}>
                        <span>{inq.email}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                        ID: {inq.buyerId ? inq.buyerId.substring(18).toUpperCase() : 'N/A'}
                      </div>
                    </td>
                    
                    <td style={{ padding: '20px 24px' }}>
                      {inq.productId ? (
                        <>
                          <div style={{ fontWeight: 600 }}>{inq.productId.name}</div>
                          <div style={{ fontSize: '13px', color: '#64748b' }}>
                            {inq.productId.category} • {inq.fabricType}
                          </div>
                        </>
                      ) : (
                        <div style={{ fontStyle: 'italic', color: '#94a3b8' }}>General Inquiry ({inq.fabricType})</div>
                      )}
                    </td>
                    
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{inq.quantity}</div>
                    </td>

                    <td style={{ padding: '20px 24px' }}>
                      <span style={{ 
                        padding: '6px 12px', 
                        borderRadius: '50px', 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        ...(inq.status === 'Confirmed' || inq.status === 'Approved' ? { background: '#dcfce7', color: '#166534' } :
                           inq.status === 'Pending' ? { background: '#fef3c7', color: '#92400e' } :
                           { background: '#f1f5f9', color: '#475569' })
                      }}>
                        {inq.status === 'Confirmed' || inq.status === 'Approved' ? <CheckCircle2 size={12}/> : 
                         inq.status === 'Pending' ? <Clock size={12}/> : null}
                        {inq.status}
                      </span>
                    </td>

                    <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                      {inq.status === 'Pending' && (
                        <button 
                          onClick={() => handleConfirm(inq._id)}
                          disabled={confirmingId === inq._id}
                          style={{
                            padding: '8px 16px',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            opacity: confirmingId === inq._id ? 0.7 : 1
                          }}
                        >
                          {confirmingId === inq._id ? 'Confirming...' : 'Confirm Inquiry'}
                        </button>
                      )}
                      
                      {inq.status !== 'Pending' && (
                        <span style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>No action needed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
