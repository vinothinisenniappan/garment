import { useEffect, useState } from 'react'

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
        const backendUrl = 'http://localhost:5001/api/admin/dashboard-public'
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
    const id = setInterval(fetchDashboard, 30000) // refresh every 30s
    return () => clearInterval(id)
  }, [])

  const statCards = [
    { label: 'New Inquiries', value: String(stats.newInquiries), color: 'var(--nav-bg)' },
    { label: 'Pending Samples', value: String(stats.pendingSamples), color: '#f39c12' },
    { label: 'Total Products', value: String(stats.totalProducts), color: '#27ae60' }
  ]

  return (
    <main className="admin-dashboard-page">
      <section className="history-hero">
        <div className="history-hero__inner">
          <div className="history-hero__text-group">
            <h1 className="history-hero__title">Management Console</h1>
          </div>
        </div>
      </section>

      <div className="page-container" style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
          <div style={{ color: 'var(--muted)', fontSize: '13px' }}>
            {lastUpdated ? `Last updated: ${lastUpdated.toLocaleString()}` : 'Loading…'}
          </div>
          {error && (<div style={{ color: 'crimson', fontSize: '13px', fontWeight: 600 }}>{error}</div>)}
        </div>
        <div className="grid grid--three" style={{ marginBottom: '40px' }}>
          {statCards.map(stat => (
            <div key={stat.label} className="pro-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>{stat.label}</div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="pro-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ color: 'var(--nav-bg)' }}>Recent Buyer Inquiries</h2>
            <button className="pro-button" style={{ padding: '8px 16px', fontSize: '12px' }}>View All</button>
          </div>
          {loading ? (
            <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '20px 0' }}>Loading inquiries…</p>
          ) : recentBuyers.length === 0 ? (
            <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '40px 0', border: '1px dashed var(--border)', borderRadius: '8px' }}>
              No inquiries yet.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {recentBuyers.map(b => (
                <div key={b._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 16px' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{b.contactPerson} {(b.companyName ? `• ${b.companyName}` : '')}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{b.email} • {b.country}</div>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{new Date(b.submittedAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

