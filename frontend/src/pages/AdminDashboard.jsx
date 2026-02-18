export default function AdminDashboard() {
  const stats = [
    { label: "New Inquiries", value: "14", color: "var(--nav-bg)" },
    { label: "Pending Samples", value: "8", color: "#f39c12" },
    { label: "Total Products", value: "42", color: "#27ae60" }
  ];

  return (
    <main className="admin-dashboard-page">
      <section className="internal-hero">
        <div className="container">
          <h1>Management Console</h1>
          <p>Control your production catalog and review incoming buyer requests.</p>
        </div>
      </section>

      <div className="container" style={{ marginBottom: '80px' }}>
        <div className="grid grid--three" style={{ marginBottom: '40px' }}>
          {stats.map(stat => (
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
          <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '40px 0', border: '1px dashed var(--border)', borderRadius: '8px' }}>
            No new inquiries in the last 24 hours.
          </p>
        </div>
      </div>
    </main>
  )
}

