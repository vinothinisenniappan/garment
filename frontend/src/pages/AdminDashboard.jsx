import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  Boxes, 
  Tags, 
  BarChart3, 
  Image as ImageIcon, 
  LogOut,
  Bell,
  Search,
  RefreshCcw,
  Zap,
  ClipboardList
} from 'lucide-react'
import { apiBaseUrl, apiFetch } from '../lib/api'

// Import Modular Sections
import DashboardHome from '../components/admin/DashboardHome'
import ProductManager from '../components/admin/ProductManager'
import OrderManager from '../components/admin/OrderManager'
import CustomerList from '../components/admin/CustomerList'
import InventoryMatrix from '../components/admin/InventoryMatrix'
import CategoryManager from '../components/admin/CategoryManager'
import SalesAnalytics from '../components/admin/SalesAnalytics'
import ProductForm from '../components/admin/ProductForm'
import SampleInquiryManager from '../components/admin/SampleInquiryManager'
import BuyerInquiryManager from '../components/admin/BuyerInquiryManager'
import InquiryManager from '../components/admin/InquiryManager'

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalBuyers: 0,
    totalOrders: 0,
    ordersToday: 0,
    totalRevenue: 0,
    lowStockAlerts: 0,
    newInquiries: 0,
    engagementRate: 0,
    inquiryTrend: '0%',
    trendData: [0, 0, 0, 0, 0, 0, 0]
  })
  
  const [data, setData] = useState({
    products: [],
    orders: [],
    buyers: [],
    categories: [],
    recentOrders: []
  })

  const [liveNotification, setLiveNotification] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showProductForm, setShowProductForm] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Products', icon: ShoppingBag },
    { name: 'Orders', icon: ShoppingCart },
    { name: 'Buyer Database', icon: Users },
    { name: 'Inquiries', icon: Users },
    { name: 'Sample Inquiries', icon: ClipboardList },
    { name: 'Inventory', icon: Boxes },
    { name: 'Categories', icon: Tags },
    { name: 'Analytics', icon: BarChart3 }
  ]

  const fetchAllData = async () => {
    try {
      setLoading(true)
      const res = await apiFetch('/api/admin/dashboard')
      if (res.success) {
        setStats(res.stats)
        setData(prev => ({ ...prev, recentOrders: res.recentOrders }))
      }

      // Fetch specific module data based on active section or all at once?
      // For a "Pro" feel, we'll fetch what's needed
      const [pRes, oRes, bRes, cRes] = await Promise.all([
        apiFetch('/api/admin/products'),
        apiFetch('/api/admin/orders'),
        apiFetch('/api/admin/buyers'),
        apiFetch('/api/admin/categories')
      ])

      setData({
        products: pRes.products || [],
        orders: oRes.orders || [],
        buyers: bRes.buyers || [],
        categories: cRes.categories || [],
        recentOrders: res.recentOrders || []
      })

      setLastUpdated(new Date())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProduct = async (formData) => {
    try {
      const method = formData._id ? 'PUT' : 'POST'
      const url = formData._id ? `/api/admin/products/${formData._id}` : '/api/admin/products'
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.success) {
        setShowProductForm(false)
        fetchAllData()
      }
    } catch (e) {
      alert(`Error saving product: ${e.message}`)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await apiFetch(`/api/admin/products/${id}`, { method: 'DELETE' })
        if (res.success) fetchAllData()
      } catch (e) {
        alert(e.message)
      }
    }
  }

  useEffect(() => {
    fetchAllData()
    const socket = io(apiBaseUrl || window.location.origin, { withCredentials: true })
    socket.on('new-inquiry', (msg) => {
      setLiveNotification(msg?.message || 'New inquiry received!')
      fetchAllData()
    })
    return () => socket.disconnect()
  }, [])

  const renderContent = () => {
    switch(activeSection) {
      case 'Dashboard': return <DashboardHome stats={stats} recentOrders={data.recentOrders} />;
      case 'Products': return (
        <ProductManager 
          products={data.products} 
          onAdd={() => { setCurrentProduct(null); setShowProductForm(true); }} 
          onEdit={(p) => { setCurrentProduct(p); setShowProductForm(true); }}
          onDelete={handleDeleteProduct}
        />
      );
      case 'Orders': return <OrderManager orders={data.orders} onUpdateStatus={(id, status) => alert(`Update Order ${id}`)} />;
      case 'Buyer Database': return <BuyerInquiryManager buyers={data.buyers} onRefresh={fetchAllData} />;
      case 'Inquiries': return <InquiryManager onRefresh={fetchAllData} />;
      case 'Sample Inquiries': return <SampleInquiryManager />;
      case 'Inventory': return <InventoryMatrix products={data.products} />;
      case 'Categories': return <CategoryManager categories={data.categories} onAdd={(cat) => alert('Add Category')} />;
      case 'Analytics': return <SalesAnalytics stats={stats} />;
      default: return <div className="pro-card center cap-desc">Coming Soon: {activeSection}</div>;
    }
  }

  return (
    <main className="admin-pro-shell" style={{ display: 'flex', height: '100vh', background: '#f8fafc', overflow: 'hidden' }}>
      {/* Premium Sidebar */}
      <aside style={{ width: '280px', background: '#0f172a', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '35px 30px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
            <div style={{ width: '36px', height: '36px', background: 'var(--accent)', borderRadius: '10px', display: 'grid', placeItems: 'center' }}>
              <Zap size={20} fill="white" color="white" />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>
              Sree Anjaneye Exports
            </span>
          </div>
          <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '10px', fontWeight: 700 }}>Admin Cloud v2.5</div>
        </div>

        <nav style={{ flex: 1, padding: '25px 20px', overflowY: 'auto' }}>
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.name)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                borderRadius: '12px',
                border: 'none',
                background: activeSection === item.name ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                color: activeSection === item.name ? '#38bdf8' : '#94a3b8',
                cursor: 'pointer',
                marginBottom: '4px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <item.icon size={20} style={{ opacity: activeSection === item.name ? 1 : 0.6 }} />
              <span style={{ fontWeight: activeSection === item.name ? 700 : 500, fontSize: '14px' }}>{item.name}</span>
            </button>
          ))}
        </nav>

        <div style={{ padding: '25px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'white', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '12px', display: 'grid', placeItems: 'center', fontWeight: 800 }}>SA</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>Selva</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Master Account</div>
            </div>
          </div>
          <button 
            onClick={() => window.location.href='/admin-login'}
            style={{ width: '100%', padding: '12px', borderRadius: '10px', background: '#334155', color: 'white', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ height: '80px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ padding: '8px 12px', background: '#f1f5f9', borderRadius: '10px', color: '#64748b', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div>
              System Live
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell size={22} color="#64748b" />
              {stats.newInquiries > 0 && (
                <span style={{ position: 'absolute', top: '-5px', right: '-5px', width: '18px', height: '18px', background: '#ef4444', color: 'white', borderRadius: '50%', fontSize: '10px', fontWeight: 900, display: 'grid', placeItems: 'center', border: '2px solid white' }}>
                  {stats.newInquiries}
                </span>
              )}
            </div>
            <button 
              className="icon-btn" 
              onClick={fetchAllData}
              disabled={loading}
              style={{ background: '#f1f5f9', color: 'var(--primary)', padding: '10px', borderRadius: '10px' }}
            >
              <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </header>

        <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
          {liveNotification && (
            <div className="pro-card animate-slide-in" style={{ marginBottom: '30px', padding: '15px 25px', borderLeft: '5px solid #10b981', background: '#f0fdf4', color: '#065f46', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Bell size={20} />
              <span style={{ fontWeight: 700 }}>{liveNotification}</span>
              <button 
                onClick={() => setLiveNotification('')}
                style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 900 }}
              >✕</button>
            </div>
          )}

          <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span className="section-subtitle">System Hub / {activeSection}</span>
              <h1 style={{ margin: '5px 0 0', fontSize: '2.4rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-1px' }}>
                {activeSection}
              </h1>
              <p className="cap-desc" style={{ marginTop: '5px' }}>
                Last synced: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="pro-button--compact" style={{ height: '48px', padding: '0 25px', background: 'white', border: '1px solid #e2e8f0', color: 'var(--primary)' }}>
                View Logs
              </button>
              <button className="pro-button" style={{ height: '48px', padding: '0 25px' }}>
                Quick Action
              </button>
            </div>
          </div>

          {loading && !lastUpdated ? (
            <div style={{ height: '300px', display: 'grid', placeItems: 'center' }}>
              <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: 'var(--primary)', borderRadius: '50%' }}></div>
            </div>
          ) : (
            renderContent()
          )}
        </div>

        {showProductForm && (
          <ProductForm 
            product={currentProduct} 
            categories={data.categories}
            onClose={() => setShowProductForm(false)} 
            onSave={handleSaveProduct} 
          />
        )}
      </section>

      <style>{`
        .admin-nav-item:hover {
          background: rgba(56, 189, 248, 0.05) !important;
          color: #38bdf8 !important;
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </main>
  )
}

