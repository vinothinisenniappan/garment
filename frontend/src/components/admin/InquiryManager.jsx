import { useState, useEffect } from 'react'
import { CheckCircle2, Clock, Search, Box, Truck, XCircle } from 'lucide-react'
import { apiFetch } from '../../lib/api'

export default function InquiryManager({ onRefresh }) {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterMode, setFilterMode] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [actionId, setActionId] = useState(null)

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

  const handleApprove = async (id) => {
    try {
      setActionId(id)
      const res = await apiFetch(`/api/admin/inquiries/${id}/accept`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: 'Approved by admin from Buyer Inquiries dashboard' })
      })

      if (res.success) {
        await fetchInquiries()
        if (onRefresh) onRefresh()
        alert('Inquiry approved successfully and buyer notified!')
      } else {
        alert(`Error: ${res.message}`)
      }
    } catch (err) {
      alert(`Error approving inquiry: ${err.message}`)
    } finally {
      setActionId(null)
    }
  }

  const handleReject = async (id) => {
    try {
      setActionId(id)
      const res = await apiFetch(`/api/admin/inquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Rejected', adminNotes: 'Rejected by admin' })
      })

      if (res.success) {
        await fetchInquiries()
        if (onRefresh) onRefresh()
      } else {
        alert(`Error: ${res.message}`)
      }
    } catch (err) {
      alert(`Error rejecting inquiry: ${err.message}`)
    } finally {
      setActionId(null)
    }
  }

  const handleShip = async (id) => {
    try {
      setActionId(id)
      const res = await apiFetch(`/api/admin/inquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Shipped', adminNotes: 'Product shipped by admin' })
      })

      if (res.success) {
        await fetchInquiries()
        if (onRefresh) onRefresh()
      } else {
        alert(`Error: ${res.message}`)
      }
    } catch (err) {
      alert(`Error updating shipping status: ${err.message}`)
    } finally {
      setActionId(null)
    }
  }

  const filteredInquiries = inquiries.filter((inq) => {
    if (filterMode !== 'All' && inq.status !== filterMode) return false

    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      const buyerName = inq.companyName || inq.buyerId?.companyName || inq.contactPerson || inq.buyerId?.contactPerson || ''
      const buyerEmail = inq.email || inq.buyerId?.email || ''
      const searchStr = `${buyerName} ${buyerEmail} ${inq.productId?.name || ''} ${inq.inquiryMessage || ''}`.toLowerCase()
      if (!searchStr.includes(q)) return false
    }
    return true
  })

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto 20px' }}></div>
        <p className="cap-desc">Loading inquiries...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>
        <p>{error}</p>
        <button onClick={fetchInquiries} className="pro-button mt-4">Retry</button>
      </div>
    )
  }

  return (
    <div className="inquiry-manager">
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search company, contact, email, product, or message..."
            className="pro-input"
            style={{ paddingLeft: '45px', width: '100%' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="pro-input"
          value={filterMode}
          onChange={(e) => setFilterMode(e.target.value)}
          style={{ width: '170px' }}
        >
          <option value="All">All Inquiries</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Approved">Approved</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Shipped">Shipped</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button className="pro-button--compact" onClick={fetchInquiries}>Refresh</button>
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
                  <th style={{ padding: '16px 24px', fontWeight: 700 }}>Product / Inquiry Details</th>
                  <th style={{ padding: '16px 24px', fontWeight: 700 }}>Req. Qty</th>
                  <th style={{ padding: '16px 24px', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '16px 24px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inq) => {
                  const buyerCompany = inq.companyName || inq.buyerId?.companyName || inq.contactPerson || inq.buyerId?.contactPerson || 'Unknown Buyer'
                  const buyerEmail = inq.email || inq.buyerId?.email || 'N/A'
                  const buyerIdValue = typeof inq.buyerId === 'string' ? inq.buyerId : inq.buyerId?._id

                  return (
                    <tr key={inq._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                      <td style={{ padding: '20px 24px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>{buyerCompany}</div>
                        <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', gap: '10px' }}>
                          <span>{buyerEmail}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                          ID: {buyerIdValue ? buyerIdValue.toString().slice(-6).toUpperCase() : 'N/A'}
                        </div>
                      </td>

                      <td style={{ padding: '20px 24px' }}>
                        {inq.productId ? (
                          <>
                            <div style={{ fontWeight: 600 }}>{inq.productId.name}</div>
                            <div style={{ fontSize: '13px', color: '#64748b' }}>
                              {inq.productId.category} • {inq.fabricType}
                            </div>
                            {inq.inquiryMessage && (
                              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                                {inq.inquiryMessage.slice(0, 90)}{inq.inquiryMessage.length > 90 ? '...' : ''}
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <div style={{ fontStyle: 'italic', color: '#475569' }}>General Inquiry ({inq.fabricType})</div>
                            {inq.inquiryMessage && (
                              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                                {inq.inquiryMessage.slice(0, 90)}{inq.inquiryMessage.length > 90 ? '...' : ''}
                              </div>
                            )}
                          </>
                        )}
                      </td>

                      <td style={{ padding: '20px 24px' }}>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{inq.quantity}</div>
                      </td>

                      <td style={{ padding: '20px 24px' }}>
                        <span
                          style={{
                            padding: '6px 12px',
                            borderRadius: '50px',
                            fontSize: '11px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            ...(inq.status === 'Shipped'
                              ? { background: '#dbeafe', color: '#1d4ed8' }
                              : inq.status === 'Confirmed' || inq.status === 'Approved' || inq.status === 'Accepted'
                              ? { background: '#dcfce7', color: '#166534' }
                              : inq.status === 'Rejected'
                              ? { background: '#fee2e2', color: '#b91c1c' }
                              : inq.status === 'Pending'
                              ? { background: '#fef3c7', color: '#92400e' }
                              : { background: '#f1f5f9', color: '#475569' })
                          }}
                        >
                          {inq.status === 'Shipped' ? <Truck size={12} /> :
                           (inq.status === 'Confirmed' || inq.status === 'Approved' || inq.status === 'Accepted') ? <CheckCircle2 size={12} /> :
                           inq.status === 'Rejected' ? <XCircle size={12} /> :
                           inq.status === 'Pending' ? <Clock size={12} /> : null}
                          {inq.status}
                        </span>
                      </td>

                      <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                          {inq.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(inq._id)}
                                disabled={actionId === inq._id}
                                style={{ padding: '8px 12px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer', opacity: actionId === inq._id ? 0.7 : 1 }}
                              >
                                {actionId === inq._id ? 'Saving...' : 'Approve'}
                              </button>
                              <button
                                onClick={() => handleReject(inq._id)}
                                disabled={actionId === inq._id}
                                style={{ padding: '8px 12px', background: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3', borderRadius: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {(inq.status === 'Accepted' || inq.status === 'Approved' || inq.status === 'Confirmed') && (
                            <button
                              onClick={() => handleShip(inq._id)}
                              disabled={actionId === inq._id}
                              style={{ padding: '8px 12px', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', borderRadius: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}
                            >
                              Mark Shipped
                            </button>
                          )}

                          {inq.status === 'Shipped' && <span style={{ fontSize: '13px', color: '#1d4ed8', fontStyle: 'italic' }}>Shipped</span>}
                          {inq.status === 'Rejected' && <span style={{ fontSize: '13px', color: '#b91c1c', fontStyle: 'italic' }}>Rejected</span>}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
