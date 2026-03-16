import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Boxes, 
  Tags, 
  BarChart3, 
  LogOut,
  Bell,
  RefreshCcw,
  Zap,
  ClipboardList
} from 'lucide-react'
import { apiBaseUrl, apiFetch } from '../lib/api'

// Import Modular Sections
import DashboardHome from '../components/admin/DashboardHome'
import ProductManager from '../components/admin/ProductManager'
import CustomerList from '../components/admin/CustomerList'
import InventoryMatrix from '../components/admin/InventoryMatrix'
import CategoryManager from '../components/admin/CategoryManager'
import SalesAnalytics from '../components/admin/SalesAnalytics'
import ProductForm from '../components/admin/ProductForm'
import SampleInquiryManager from '../components/admin/SampleInquiryManager'
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
    categories: [],
    recentOrders: []
  })

  const [liveNotification, setLiveNotification] = useState('')
  const [notifications, setNotifications] = useState([])
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showProductForm, setShowProductForm] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const notificationRef = useRef(null)

  const unreadCount = notifications.filter((item) => !item.read).length

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Products', icon: ShoppingBag },
    { name: 'Buyer Inquiry', icon: Users },
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
      const [pRes, cRes] = await Promise.all([
        apiFetch('/api/admin/products'),
        apiFetch('/api/admin/categories')
      ])

      setData({
        products: pRes.products || [],
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

  const handleUpdateInventory = async (productId, inventory) => {
    const targetProduct = data.products.find((p) => p._id === productId)
    if (!targetProduct) {
      alert('Product not found')
      return false
    }

    const safeInventory = {
      S: Number(inventory.S) || 0,
      M: Number(inventory.M) || 0,
      L: Number(inventory.L) || 0,
      XL: Number(inventory.XL) || 0,
      XXL: Number(inventory.XXL) || 0
    }

    const payload = {
      name: targetProduct.name,
      category: targetProduct.category,
      description: targetProduct.description || '',
      fabricType: targetProduct.fabricType,
      gsm: targetProduct.gsm,
      sizeRange: targetProduct.sizeRange,
      price: Number(targetProduct.price) || 0,
      inventory: safeInventory,
      colors: Array.isArray(targetProduct.colors) ? targetProduct.colors : [],
      images: Array.isArray(targetProduct.images) ? targetProduct.images : [],
      isFeatured: Boolean(targetProduct.isFeatured),
      isActive: targetProduct.isActive !== false
    }

    try {
      const res = await apiFetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.success) {
        throw new Error(res.message || 'Failed to update inventory')
      }

      await fetchAllData()
      return true
    } catch (e) {
      alert(`Error updating inventory: ${e.message}`)
      return false
    }
  }

  const addNotification = (message, type = 'update') => {
    const item = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type,
      message,
      timestamp: new Date().toISOString(),
      read: false
    }

    setNotifications((prev) => [item, ...prev].slice(0, 30))
    setLiveNotification(message)
  }

  const formatNotificationMessage = (event, payload) => {
    if (event === 'new-inquiry') {
      return payload?.message || `${payload?.contactPerson || 'A buyer'} submitted a new inquiry.`
    }
    if (event === 'buyer-status-updated') {
      return `Buyer status updated to ${payload?.status || 'Unknown'}.`
    }
    if (event === 'orders-updated') {
      return `A new order was generated from a qualified buyer inquiry.`
    }
    if (event === 'inquiry-status-updated') {
      return `Inquiry status changed to ${payload?.status || 'Updated'}.`
    }
    if (event === 'products-updated') {
      return `Product inventory was updated.`
    }
    return payload?.message || 'New admin update received.'
  }

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))
  }

  useEffect(() => {
    fetchAllData()
    const socket = io(apiBaseUrl || window.location.origin, { withCredentials: true })

    const eventNames = [
      'new-inquiry',
      'buyer-status-updated',
      'orders-updated',
      'inquiry-status-updated',
      'products-updated'
    ]

    eventNames.forEach((eventName) => {
      socket.on(eventName, (payload) => {
        addNotification(formatNotificationMessage(eventName, payload), eventName)
      })
    })

    const refreshEvents = [
      'new-inquiry',
      'orders-updated',
      'buyer-status-updated',
      'inquiry-status-updated',
      'products-updated'
    ]

    refreshEvents.forEach((eventName) => {
      socket.on(eventName, () => {
        fetchAllData()
      })
    })

    return () => socket.disconnect()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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
      case 'Buyer Inquiry': return <InquiryManager onRefresh={fetchAllData} />;
      case 'Sample Inquiries': return <SampleInquiryManager />;
      case 'Inventory': return <InventoryMatrix products={data.products} onUpdateInventory={handleUpdateInventory} />;
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
            <div ref={notificationRef} style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  const nextOpen = !isNotificationOpen
                  setIsNotificationOpen(nextOpen)
                  if (nextOpen) markNotificationsAsRead()
                }}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', position: 'relative', padding: 0, display: 'grid', placeItems: 'center' }}
                aria-label="Toggle notifications"
              >
                <Bell size={22} color="#64748b" />
                {unreadCount > 0 && (
                  <span style={{ position: 'absolute', top: '-5px', right: '-8px', minWidth: '18px', height: '18px', padding: '0 5px', background: '#ef4444', color: 'white', borderRadius: '999px', fontSize: '10px', fontWeight: 900, display: 'grid', placeItems: 'center', border: '2px solid white' }}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div style={{ position: 'absolute', top: '34px', right: '-10px', width: '380px', maxHeight: '420px', overflowY: 'auto', background: 'white', border: '1px solid #e2e8f0', borderRadius: '14px', boxShadow: '0 18px 45px rgba(15, 23, 42, 0.16)', zIndex: 20 }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '14px', color: '#0f172a' }}>Notifications</strong>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{notifications.length} total</span>
                  </div>

                  {notifications.length === 0 ? (
                    <div style={{ padding: '22px 16px', color: '#64748b', fontSize: '13px' }}>
                      No messages yet. Real-time updates will appear here.
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', background: item.read ? 'white' : '#f8fafc' }}
                      >
                        <div style={{ fontSize: '13px', color: '#0f172a', lineHeight: 1.4 }}>{item.message}</div>
                        <div style={{ marginTop: '4px', fontSize: '11px', color: '#64748b' }}>
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
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

