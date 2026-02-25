import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ newInquiries: 0, pendingSamples: 0, totalProducts: 0 })
  const [recentBuyers, setRecentBuyers] = useState([])
  const [lastUpdated, setLastUpdated] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      setError('')
      // Helper to fetch JSON and validate content-type
      const fetchJson = async (url) => {
        const res = await fetch(url)
        const ct = res.headers.get('content-type') || ''
        if (!ct.includes('application/json')) {
          const txt = await res.text()
          throw new Error(`Non-JSON response (${res.status}): ${txt.slice(0, 80)}...`)
        }
        const data = await res.json()
        return { res, data }
      }

      let data
      try {
        ({ data } = await fetchJson('/api/admin/dashboard-public'))
      } catch (proxyErr) {
        // Fallback to direct backend URL in dev if proxy fails
        const backendUrl = 'http://localhost:5001/api/admin/dashboard-public';
        ({ data } = await fetchJson(backendUrl))
      }
      if (!data.success) {
        throw new Error(data.message || 'Failed to load dashboard')
      }
      setStats({
        newInquiries: data.stats?.newInquiries || 0,
        pendingSamples: data.stats?.pendingSamples || 0,
        totalProducts: data.stats?.totalProducts || 0
      })
      setRecentBuyers(Array.isArray(data.recentBuyers) ? data.recentBuyers : [])
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
    const socketUrl = window.location.hostname === 'localhost' ? 'http://localhost:5001' : '/';
    const socket = io(socketUrl);

    socket.on('new-inquiry', (data) => {
      console.log('Real-time update received:', data);
      fetchDashboard();
    });

    const id = setInterval(fetchDashboard, 30000) // refresh every 30s
    return () => {
      clearInterval(id);
      socket.disconnect();
    }
  }, [])

  const sidebarItems = ['Dashboard', 'Recent Inquiries', 'Product Catalog', 'Buyer Analytics', 'Notifications', 'Settings']

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
    { label: 'New Inquiries', value: String(stats.newInquiries), trend: '+12%', color: 'var(--accent)' },
    { label: 'Pending Samples', value: String(stats.pendingSamples), trend: '+4%', color: '#f59e0b' },
    { label: 'Total Products', value: String(stats.totalProducts), trend: '+2%', color: '#10b981' }
  ]

  return (
    <main className="admin-analytics-page">
      <div className="admin-analytics-shell">
        <aside className="admin-analytics-sidebar">
          <div className="admin-analytics-brand">
            <span className="admin-analytics-brand__dot">◎</span>
            <span>Garment Admin</span>
          </div>

          <nav className="admin-analytics-nav">
            {sidebarItems.map((item, idx) => (
              <button key={item} className={`admin-analytics-nav__item ${idx === 0 ? 'is-active' : ''}`}>
                <span className="admin-analytics-nav__bullet">{idx === 0 ? '✦' : '●'}</span>
                <span>{item}</span>
              </button>
            ))}
          </nav>

          <div className="admin-analytics-sidebar-footer">
            <div className="admin-analytics-profile">
              <div className="admin-analytics-avatar">JS</div>
              <div className="admin-analytics-profile-info">
                <div className="admin-analytics-profile__name">Sivakumar V</div>
                <div className="admin-analytics-profile__sub">Administrator</div>
              </div>
            </div>
            <button className="admin-logout-btn" onClick={() => {
              window.localStorage.removeItem('adminAuth');
              window.location.href = '/admin-login';
            }}>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <section className="admin-analytics-main">
          <header className="admin-analytics-topbar">
            <div className="admin-analytics-tabs">
              <button className="admin-analytics-tab is-active">Overview</button>
              <button className="admin-analytics-tab">Analytics</button>
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
              <h1>Analytics Dashboard</h1>
              <p>Welcome back! Last sync: {formatShortTime(lastUpdated)}</p>
            </div>
            <div className="admin-analytics-headline__actions">
              <button className="admin-analytics-pill is-primary" onClick={fetchDashboard}>Refresh Data</button>
              <button className="admin-analytics-pill">Generate Report</button>
            </div>
          </div>

          {error && <div className="admin-analytics-error">{error}</div>}

          <div className="admin-analytics-cards-row">
            <article className="admin-analytics-card">
              <h3>Engagement Rate</h3>
              <div className="admin-analytics-donut-wrap">
                <div className="admin-analytics-donut">84%</div>
                <div className="admin-analytics-lines">
                  <span style={{ width: '80%' }} />
                  <span style={{ width: '60%' }} />
                  <span style={{ width: '45%' }} />
                </div>
              </div>
            </article>

            <article className="admin-analytics-card">
              <h3>Inquiry Trends</h3>
              <div className="admin-analytics-chart">
                <span style={{ height: '40%' }} />
                <span style={{ height: '60%' }} />
                <span style={{ height: '50%' }} />
                <span style={{ height: '80%' }} />
                <span style={{ height: '70%' }} />
                <span style={{ height: '90%' }} />
                <span style={{ height: '100%' }} />
                <span style={{ height: '85%' }} />
              </div>
            </article>

            <article className="admin-analytics-card">
              <h3>Inventory Health</h3>
              <div className="admin-analytics-metrics">
                <div><span>Fabric Stock</span><em className="is-wide" /></div>
                <div><span>Sample Pipeline</span><em style={{ width: '60%', background: '#f59e0b' }} /></div>
                <div><span>Production Capacity</span><em style={{ width: '90%', background: '#10b981' }} /></div>
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
                    <small>{card.trend}</small>
                  </div>
                ))}
              </div>
              <div className="admin-analytics-wave">
                <span />
                <span />
              </div>
            </article>

            <article className="admin-analytics-card admin-analytics-card--feed">
              <div className="admin-analytics-feed-head">
                <h3>Recent Inquiries</h3>
                <span>{loading ? 'Syncing...' : `${recentBuyers.length} active`}</span>
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
        </section>
      </div>

    </main>
  )
}

