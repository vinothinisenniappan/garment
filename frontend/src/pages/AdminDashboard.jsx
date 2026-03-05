import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { apiBaseUrl, apiFetch } from '../lib/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    newInquiries: 0,
    pendingSamples: 0,
    totalProducts: 0,
    engagementRate: 0,
    inquiryTrend: '0%',
    trendData: [0, 0, 0, 0, 0, 0, 0]
  })
  const [recentBuyers, setRecentBuyers] = useState([])
  const [products, setProducts] = useState([])
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [liveNotification, setLiveNotification] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await apiFetch('/api/admin/dashboard')
      if (!data.success) {
        throw new Error(data.message || 'Failed to load dashboard')
      }
      setStats({
        newInquiries: data.stats?.newInquiries || 0,
        pendingSamples: data.stats?.pendingSamples || 0,
        totalProducts: data.stats?.totalProducts || 0,
        engagementRate: data.stats?.engagementRate || 0,
        inquiryTrend: data.stats?.inquiryTrend || '0%',
        trendData: data.stats?.trendData || [0, 0, 0, 0, 0, 0, 0]
      })
      setRecentBuyers(Array.isArray(data.recentBuyers) ? data.recentBuyers : [])
      setProducts(Array.isArray(data.products) ? data.products : [])
      setLastUpdated(new Date())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()

    // Connect to Socket.io for real-time updates
    const socketUrl = apiBaseUrl || window.location.origin
    const socket = io(socketUrl, { withCredentials: true })

    socket.on('new-inquiry', (data) => {
      console.log('Real-time update received:', data)
      setLiveNotification(data?.message || `You got a order message from the buyer(${data?.buyerName || 'Unknown Buyer'}).`)
      fetchDashboard()
    })

    const id = setInterval(fetchDashboard, 60000) // refresh every 1m
    const clearNotificationId = setInterval(() => {
      setLiveNotification('')
    }, 20000)

    return () => {
      clearInterval(id)
      clearInterval(clearNotificationId)
      socket.disconnect()
    }
  }, [])

  const sidebarItems = ['Dashboard', 'Recent Inquiries', 'Product Catalog', 'Settings']

  const formatShortTime = (date) => {
    if (!date) return 'just now'
    const diffMs = Date.now() - date.getTime()
    const minutes = Math.floor(diffMs / 60000)
    if (minutes <= 1) return 'just now'
    if (minutes < 60) return `${minutes} minutes ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hours ago`
    return `${Math.floor(hours / 24)} days ago`
  }

  const statCardsData = [
    { label: 'New Inquiries', value: String(stats.newInquiries), trend: stats.inquiryTrend, color: 'var(--accent)' },
    { label: 'Pending Samples', value: String(stats.pendingSamples), trend: '+0%', color: '#f59e0b' },
    { label: 'Total Products', value: String(stats.totalProducts), trend: '+0%', color: '#10b981' }
  ]

  const renderContent = () => {
    if (activeSection === 'Recent Inquiries') {
      return (
        <article className="admin-analytics-card" style={{ marginTop: '20px' }}>
          <h3>Inquiry Database</h3>
          <div className="admin-table-wrap" style={{ overflowX: 'auto', marginTop: '15px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '12px' }}>Buyer / Person</th>
                  <th style={{ padding: '12px' }}>Email</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBuyers.map(buyer => (
                  <tr key={buyer._id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600 }}>{buyer.companyName}</div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{buyer.contactPerson}</div>
                    </td>
                    <td style={{ padding: '12px' }}>{buyer.email}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        background: buyer.status === 'New' ? 'rgba(3,70,148,0.1)' : 'rgba(16,185,129,0.1)',
                        color: buyer.status === 'New' ? 'var(--accent)' : '#10b981'
                      }}>
                        {buyer.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>{new Date(buyer.submittedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      )
    }

    if (activeSection === 'Product Catalog') {
      return (
        <article className="admin-analytics-card" style={{ marginTop: '20px' }}>
          <h3>Product Catalog</h3>
          <div className="admin-table-wrap" style={{ overflowX: 'auto', marginTop: '15px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '12px' }}>Product</th>
                  <th style={{ padding: '12px' }}>Category</th>
                  <th style={{ padding: '12px' }}>Fabric</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map(prod => (
                  <tr key={prod._id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600 }}>{prod.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{prod.sizeRange}</div>
                    </td>
                    <td style={{ padding: '12px' }}>{prod.category}</td>
                    <td style={{ padding: '12px' }}>{prod.fabricType}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ color: prod.isActive ? '#10b981' : '#ef4444' }}>
                        {prod.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      )
    }

    // Default Dashboard View
    return (
      <>
        <div className="admin-analytics-cards-row">
          <article className="admin-analytics-card">
            <h3>Engagement Rate</h3>
            <div className="admin-analytics-donut-wrap">
              <div
                className="admin-analytics-donut"
                style={{
                  background: `radial-gradient(circle closest-side, #fff 72%, transparent 73% 100%), conic-gradient(var(--accent) 0 ${stats.engagementRate * 3.6}deg, #f1f5f9 ${stats.engagementRate * 3.6}deg 360deg)`
                }}
              >
                {stats.engagementRate}%
              </div>
              <div className="admin-analytics-lines">
                <span style={{ width: `${stats.engagementRate}%` }} />
                <span style={{ width: `${Math.max(0, stats.engagementRate - 20)}%` }} />
                <span style={{ width: `${Math.max(0, stats.engagementRate - 40)}%` }} />
              </div>
            </div>
          </article>

          <article className="admin-analytics-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0 }}>Inquiry Trends (7 Days)</h3>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)' }}>
                {stats.trendData.reduce((a, b) => a + b, 0)} Total
              </span>
            </div>
            <div className="admin-analytics-chart">
              {stats.trendData.map((count, i) => {
                const max = Math.max(...stats.trendData, 1)
                const height = (count / max) * 100
                return <span key={i} style={{ height: `${height}%` }} title={`Day ${i + 1}: ${count}`} />
              })}
            </div>
          </article>

          <article className="admin-analytics-card">
            <h3>Inventory Summary</h3>
            <div className="admin-analytics-metrics">
              <div><span>Total Products</span><em className="is-wide" style={{ width: '100%' }} /></div>
              <div><span>Pending Samples</span><em style={{ width: '40%', background: '#f59e0b' }} /></div>
              <div><span>Engaged Buyers</span><em style={{ width: `${stats.engagementRate}%`, background: '#10b981' }} /></div>
            </div>
          </article>
        </div>

        <div className="admin-analytics-grid-bottom">
          <article className="admin-analytics-card admin-analytics-card--stats">
            <h3>Key Performance Indicators</h3>
            <div className="admin-analytics-stats-grid">
              {statCardsData.map((card) => (
                <div key={card.label} className="admin-analytics-stat">
                  <p>{card.label}</p>
                  <strong style={{ color: card.color }}>{card.value}</strong>
                  <small style={{ color: card.trend.startsWith('+') ? '#10b981' : '#ef4444' }}>{card.trend}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="admin-analytics-card admin-analytics-card--feed">
            <div className="admin-analytics-feed-head">
              <h3>Recent Activity</h3>
              <span>{loading ? 'Syncing...' : `${recentBuyers.length} records`}</span>
            </div>
            <div className="admin-analytics-feed">
              {loading ? (
                <p className="admin-analytics-empty">Loading records…</p>
              ) : recentBuyers.length === 0 ? (
                <p className="admin-analytics-empty">No inquiries yet.</p>
              ) : (
                recentBuyers.slice(0, 4).map((buyer) => (
                  <div key={buyer._id} className="admin-analytics-feed__item">
                    <div>
                      <strong>{buyer.contactPerson}</strong>
                      <p>{buyer.email}</p>
                    </div>
                    <time>{new Date(buyer.submittedAt).toLocaleDateString()}</time>
                  </div>
                ))
              )}
            </div>
          </article>
        </div>
      </>
    )
  }

  return (
    <main className="admin-analytics-page">
      <div className="admin-analytics-shell">
        <aside className="admin-analytics-sidebar">
          <div className="admin-analytics-brand">
            <span className="admin-analytics-brand__dot">◎</span>
            <span>Garment Admin</span>
          </div>

          <nav className="admin-analytics-nav">
            {sidebarItems.map((item) => (
              <button
                key={item}
                className={`admin-analytics-nav__item ${activeSection === item ? 'is-active' : ''}`}
                onClick={() => setActiveSection(item)}
              >
                <span className="admin-analytics-nav__bullet">{activeSection === item ? '✦' : '●'}</span>
                <span>{item}</span>
              </button>
            ))}
          </nav>

          <div className="admin-analytics-sidebar-footer">
            <div className="admin-analytics-profile">
              <div className="admin-analytics-avatar">SA</div>
              <div className="admin-analytics-profile-info">
                <div className="admin-analytics-profile__name">Admin Panel</div>
                <div className="admin-analytics-profile__sub">Administrator</div>
              </div>
            </div>
            <button className="admin-logout-btn" onClick={() => {
              apiFetch('/api/admin/logout', { method: 'POST' })
                .catch(() => null)
                .finally(() => {
                  window.location.href = '/admin-login'
                })
            }}>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <section className="admin-analytics-main">
          <header className="admin-analytics-topbar">
            <div className="admin-analytics-tabs">
              <button className="admin-analytics-tab is-active">Overview</button>
              <button className="admin-analytics-tab" onClick={() => setActiveSection('Dashboard')}>Analytics</button>
              <button className="admin-analytics-tab">System Log</button>
            </div>
            <div className="admin-analytics-topbar__actions">
              <button className="admin-analytics-ghost">Support</button>
              <button className="admin-analytics-icon">🔔</button>
              <button className="admin-analytics-icon">⚙</button>
            </div>
          </header>

          <div className="admin-analytics-headline">
            <div>
              <h1>{activeSection} View</h1>
              <p>Welcome back! Last sync: {formatShortTime(lastUpdated)}</p>
            </div>
            <div className="admin-analytics-headline__actions">
              <button className="admin-analytics-pill is-primary" onClick={fetchDashboard}>Refresh Data</button>
              <button className="admin-analytics-pill">Generate Report</button>
            </div>
          </div>

          {liveNotification && (
            <div className="admin-analytics-error" style={{ marginBottom: '14px', background: 'rgba(16,185,129,.18)', borderColor: 'rgba(16,185,129,.45)', color: '#065f46' }}>
              {liveNotification}
            </div>
          )}

          {error && <div className="admin-analytics-error">{error}</div>}

          {renderContent()}
        </section>
      </div>
    </main>
  )
}

