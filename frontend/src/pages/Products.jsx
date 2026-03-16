import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import { apiFetch } from '../lib/api'
import { Filter, Search, Tag, Layers, ArrowRight, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { apiBaseUrl } from '../lib/api'

export default function Products() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await apiFetch('/api/products')

        if (!data.success) {
          throw new Error(data.message || 'Failed to load products')
        }

        setProducts(Array.isArray(data.products) ? data.products : [])
        const backendCategories = Array.isArray(data.categories) ? data.categories : []
        setCategories(['All', ...backendCategories])
      } catch (err) {
        setError(err.message || 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

    const socket = io(apiBaseUrl || window.location.origin, { withCredentials: true })
    socket.on('products-updated', () => {
      fetchProducts()
    })

    return () => socket.disconnect()
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.fabricType?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, selectedCategory, searchQuery])

  const activeProducts = products.filter(product => product.isActive !== false).length

  return (
    <main className="products-page app--internal">
      <div className="page-container" style={{ maxWidth: '1240px', margin: '0 auto 88px', padding: 'calc(var(--header-height) + 24px) 24px 0' }}>
          <div
            className="pro-card scale-reveal"
            style={{
              padding: '32px',
              borderRadius: '28px',
              background:'#fff',
              color: '#03045e',
              boxShadow: '0 26px 60px rgba(15, 46, 90, 0.18)',
              border: '1px solid rgba(255,255,255,0.14)',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(280px, 0.8fr)', gap: '24px', alignItems: 'end' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ color: '#0f2e5a', fontSize: '0.78rem', letterSpacing: '0.22em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '10px', fontWeight: 700, opacity: 0.6 }}>
                  Precision Catalogue
                </span>
                <h1 style={{ fontSize: 'clamp(2.3rem, 4vw, 4.1rem)', fontWeight: 900, marginBottom: '12px', color: '#0f2e5a', letterSpacing: '-0.04em', lineHeight: 1.02, fontFamily: 'Outfit, sans-serif' }}>
                  Production Catalog
                </h1>
                <p style={{ maxWidth: '720px', margin: 0, color: '#4a5568', fontSize: '1rem', lineHeight: '1.7' }}>
                  Factory-ready garments arranged as a buyer-first collection with cleaner filtering, faster scanning, and live inventory-backed updates from the admin panel.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                <div style={{ padding: '18px', borderRadius: '20px', background: '#f0f6ff', border: '1px solid #d1e3ff' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#4a6a9d', marginBottom: '8px' }}>Live Range</div>
                  <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#0f2e5a' }}>{activeProducts}</div>
                  <div style={{ color: '#4a6a9d', fontSize: '0.85rem' }}>active styles</div>
                </div>
                <div style={{ padding: '18px', borderRadius: '20px', background: '#f0f6ff', border: '1px solid #d1e3ff' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#4a6a9d', marginBottom: '8px' }}>Collections</div>
                  <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#0f2e5a' }}>{Math.max(categories.length - 1, 0)}</div>
                  <div style={{ color: '#4a6a9d', fontSize: '0.85rem' }}>category groups</div>
                </div>
              </div>
            </div>
          </div>
        <section className="reveal-on-scroll" style={{ marginBottom: '34px' }}>
          <div className="pro-card" style={{ 
            padding: '22px 24px', 
            borderRadius: '28px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            gap: '30px', 
            boxShadow: '0 18px 44px rgba(15, 46, 90, 0.08)',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(18px)',
            border: '1px solid rgba(15, 46, 90, 0.08)',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflowX: 'auto', paddingBottom: '4px', flexGrow: 1, minWidth: 'min(100%, 520px)' }}>
              <Filter size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div style={{ display: 'flex', gap: '8px' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '50px',
                      border: 'none',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: selectedCategory === cat ? 'var(--primary)' : 'rgba(0,0,0,0.05)',
                      color: selectedCategory === cat ? 'white' : 'var(--secondary)',
                      whiteSpace: 'nowrap',
                      boxShadow: selectedCategory === cat ? '0 8px 16px rgba(var(--primary-rgb), 0.3)' : 'none'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ position: 'relative', minWidth: 'min(100%, 340px)', flex: '1 1 320px', maxWidth: '420px' }}>
              <Search size={18} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <input 
                type="text" 
                placeholder="Search premium catalog..." 
                className="pro-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  height: '52px', 
                  paddingLeft: '50px', 
                  paddingRight: '44px',
                  borderRadius: '16px', 
                  background: '#f8fafc', 
                  border: '1px solid #e2e8f0',
                  fontSize: '0.95rem',
                  width: '100%'
                }} 
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </section>

        <section>
          {error && (
            <div style={{ padding: '20px', borderRadius: '12px', background: '#fee2e2', color: '#b91c1c', marginBottom: '30px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <div className="grid grid--three" style={{ gap: '28px' }}>
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="skeleton" style={{ height: '500px', borderRadius: '24px', background: '#f1f5f9' }}></div>
              ))
            ) : filteredProducts.length === 0 ? (
              <div style={{ padding: '80px 0', textAlign: 'center', gridColumn: '1 / -1' }}>
                <Tag size={60} style={{ opacity: 0.1, marginBottom: '20px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No products match your criteria</h3>
                <p style={{ color: 'var(--muted)' }}>Try adjusting your filters or search terms.</p>
              </div>
            ) : filteredProducts.map((p, idx) => (
              <div 
                key={p._id || p.name} 
                className="reveal-on-scroll" 
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => navigate(`/products/${p._id}`)}
              >
                <div className="pro-card product-card" style={{ 
                  height: '100%', 
                  overflow: 'hidden', 
                  padding: '0', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  borderRadius: '24px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  border: '1px solid #f1f5f9'
                }}>
                  <div style={{ position: 'relative', height: '320px', overflow: 'hidden', background: 'linear-gradient(180deg, #f8fbff 0%, #eef5fb 100%)' }}>
                    {p.images?.[0] ? (
                      <img 
                        src={p.images[0]} 
                        alt={p.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} 
                        className="product-image"
                      />
                    ) : (
                      <div style={{ height: '100%', display: 'grid', placeItems: 'center', background: '#F1F5F9', color: 'var(--muted)' }}>
                        <Tag size={40} opacity={0.2} />
                      </div>
                    )}
                    <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                       <span style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', color: 'var(--primary)', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '800', boxShadow: 'var(--shadow-sm)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                         {p.category}
                       </span>
                    </div>
                  </div>
                  
                  <div style={{ padding: '26px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '12px', color: 'var(--secondary)', lineHeight: 1.15 }}>{p.name}</h3>
                    
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', fontSize: '0.85rem' }}>
                        <Layers size={14} /> <span>{p.fabricType}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', fontSize: '0.85rem' }}>
                        <Tag size={14} /> <span>{p.gsm} GSM</span>
                      </div>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '22px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                       <div style={{ display: 'flex', flexDirection: 'column' }}>
                         <span style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Size Range</span>
                         <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--secondary)' }}>{p.sizeRange}</span>
                       </div>
                       <div className="view-specs-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                         Specs <ArrowRight size={16} />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <style>{`
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 50px rgba(15, 46, 90, 0.14);
        }
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        .product-card:hover .view-specs-link {
          gap: 12px !important;
        }
        .skeleton {
          animation: skeleton-loading 1.5s infinite linear;
        }
        @keyframes skeleton-loading {
          0% { background-color: #f1f5f9; }
          50% { background-color: #e2e8f0; }
          100% { background-color: #f1f5f9; }
        }
        @media (max-width: 900px) {
          .products-page .internal-hero__title {
            font-size: 2.4rem !important;
          }
        }
      `}</style>
    </main>
  );
}
