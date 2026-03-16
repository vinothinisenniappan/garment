import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import { User, Mail, Building2, Phone, Bell, MessageSquare, Clock3 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { apiBaseUrl, apiFetch } from '../lib/api'

const statusStyles = {
  Pending: { bg: '#fff7ed', text: '#c2410c' },
  Accepted: { bg: '#ecfeff', text: '#0e7490' },
  Approved: { bg: '#ecfccb', text: '#4d7c0f' },
  Confirmed: { bg: '#dcfce7', text: '#166534' },
  Shipped: { bg: '#dbeafe', text: '#1d4ed8' },
  Rejected: { bg: '#fef2f2', text: '#b91c1c' },
  'Converted to Order': { bg: '#ede9fe', text: '#5b21b6' }
}

export default function BuyerProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    const res = await apiFetch('/api/user/profile')
    if (res.success) {
      setProfile(res.user)
    }
  }

  const fetchInquiries = async () => {
    const res = await apiFetch('/api/user/inquiries')
    if (res.success) {
      setInquiries(res.inquiries || [])
    }
  }

  useEffect(() => {
    const load = async () => {
      try {
        await Promise.all([fetchProfile(), fetchInquiries()])
      } finally {
        setLoading(false)
      }
    }

    load()

    const socket = io(apiBaseUrl || window.location.origin, { withCredentials: true })
    const refresh = () => {
      fetchInquiries().catch(() => {})
    }

    socket.on('inquiry-status-updated', refresh)
    socket.on('new-inquiry', refresh)

    return () => socket.disconnect()
  }, [])

  const timelineItems = useMemo(() => {
    const items = []

    inquiries.forEach((inquiry) => {
      items.push({
        id: `${inquiry._id}-submitted`,
        date: new Date(inquiry.createdAt),
        title: 'Inquiry Submitted',
        description: inquiry.inquiryMessage || `${inquiry.quantity} units requested for ${inquiry.fabricType}`,
        status: inquiry.status,
        inquiry
      })

      if (inquiry.adminNotes || inquiry.adminRespondedAt || inquiry.status !== 'Pending') {
        items.push({
          id: `${inquiry._id}-response`,
          date: new Date(inquiry.adminRespondedAt || inquiry.updatedAt || inquiry.createdAt),
          title: 'Admin Update',
          description: inquiry.adminNotes || `Status updated to ${inquiry.status}`,
          status: inquiry.status,
          inquiry
        })
      }
    })

    return items.sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [inquiries])

  if (loading) {
    return <div className="loading-screen">Loading your profile...</div>
  }

  return (
    <main className="buyer-profile-page app--internal">
      <section className="internal-hero">
        <div className="internal-hero__inner">
          <span className="section-subtitle">Buyer Workspace</span>
          <h1 className="internal-hero__title">My Profile & Inquiry Updates</h1>
          <p>Track all inquiry activity, admin responses, and status updates in one place.</p>
        </div>
      </section>

      <div className="page-container" style={{ marginBottom: '50px' }}>
        <section className="pro-card buyer-profile-details" style={{ marginBottom: '24px' }}>
          <div className="section-header" style={{ marginBottom: '16px' }}>
            <span className="section-subtitle">Profile Details</span>
            <h2>Buyer Information</h2>
          </div>

          <div className="buyer-profile-grid">
            <div className="buyer-profile-item"><User size={16} /><span>{profile?.contactPerson || user?.contactPerson || '-'}</span></div>
            <div className="buyer-profile-item"><Mail size={16} /><span>{profile?.email || user?.email || '-'}</span></div>
            <div className="buyer-profile-item"><Building2 size={16} /><span>{profile?.companyName || user?.companyName || '-'}</span></div>
            <div className="buyer-profile-item"><Phone size={16} /><span>{profile?.phone || '-'}</span></div>
          </div>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <div className="section-header" style={{ marginBottom: '14px' }}>
            <span className="section-subtitle">My Inquiries</span>
            <h2>All Product Inquiries</h2>
          </div>

          <div className="buyer-inquiry-cards">
            {inquiries.length === 0 ? (
              <div className="pro-card" style={{ textAlign: 'center', color: '#64748b' }}>No inquiries found yet.</div>
            ) : inquiries.map((inquiry) => {
              const style = statusStyles[inquiry.status] || { bg: '#f1f5f9', text: '#475569' }
              const image = inquiry.productId?.images?.[0]
              return (
                <article key={inquiry._id} className="pro-card buyer-inquiry-card">
                  <div className="buyer-inquiry-top">
                    <div className="buyer-inquiry-product">
                      <div className="buyer-inquiry-thumb">
                        {image ? <img src={image} alt={inquiry.productId?.name || 'Product'} /> : <MessageSquare size={18} />}
                      </div>
                      <div>
                        <h3>{inquiry.productId?.name || 'Custom Product Inquiry'}</h3>
                        <p>{new Date(inquiry.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="status-tag" style={{ background: style.bg, color: style.text }}>{inquiry.status}</span>
                  </div>

                  <p className="buyer-inquiry-message">
                    {inquiry.inquiryMessage || `${inquiry.quantity} units requested • Fabric: ${inquiry.fabricType}`}
                  </p>

                  {inquiry.adminNotes && (
                    <div className="buyer-admin-reply">
                      <strong>Admin Response</strong>
                      <p>{inquiry.adminNotes}</p>
                      <span>{new Date(inquiry.adminRespondedAt || inquiry.updatedAt).toLocaleString()}</span>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </section>

        <section>
          <div className="section-header" style={{ marginBottom: '14px' }}>
            <span className="section-subtitle">Inquiry Updates / Notifications</span>
            <h2>Latest Updates Timeline</h2>
          </div>

          <div className="buyer-timeline">
            {timelineItems.length === 0 ? (
              <div className="pro-card" style={{ textAlign: 'center', color: '#64748b' }}>No updates yet.</div>
            ) : timelineItems.map((item) => {
              const style = statusStyles[item.status] || { bg: '#f1f5f9', text: '#475569' }
              return (
                <article key={item.id} className="pro-card buyer-timeline-item">
                  <div className="buyer-timeline-head">
                    <div className="buyer-timeline-title">
                      <Bell size={16} />
                      <strong>{item.title}</strong>
                    </div>
                    <span className="status-tag" style={{ background: style.bg, color: style.text }}>{item.status}</span>
                  </div>
                  <p>{item.description}</p>
                  <div className="buyer-timeline-meta">
                    <Clock3 size={14} />
                    <span>{item.date.toLocaleString()}</span>
                    <span>Inquiry: {item.inquiry.productId?.name || 'Custom Product Inquiry'}</span>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
