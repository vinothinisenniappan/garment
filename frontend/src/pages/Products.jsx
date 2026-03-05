import { useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../lib/api'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [selectedCategory, setSelectedCategory] = useState('All')
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
  }, [])

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products
    }

    return products.filter((product) => product.category === selectedCategory)
  }, [products, selectedCategory])

  return (
    <main className="products-page">
      <section className="history-hero">
        <div className="history-hero__inner">
          <div className="history-hero__text-group">
            <h1 className="history-hero__title">Our Products</h1>
          </div>
        </div>
      </section>

      <div className="page-container" style={{ marginBottom: '80px' }}>
        <section style={{ marginBottom: '20px' }}>
          <div className="pro-card" style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className="pro-button"
                  style={{
                    padding: '10px 18px',
                    background: selectedCategory === cat ? 'var(--nav-bg)' : 'transparent',
                    color: selectedCategory === cat ? 'white' : 'var(--nav-bg)',
                    border: '1px solid var(--nav-bg)'
                  }}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <select className="pro-input" style={{ width: '180px' }}>
                <option>Sort by: Popular</option>
                <option>Sort by: Newest</option>
                <option>Sort by: Price (Low)</option>
                <option>Sort by: Price (High)</option>
              </select>
            </div>
          </div>
        </section>

        <section>
          {error && <p style={{ color: 'crimson', marginBottom: '12px' }}>{error}</p>}
          <div className="grid grid--three">
            {loading ? (
              <p style={{ color: 'var(--muted)' }}>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p style={{ color: 'var(--muted)' }}>No products available.</p>
            ) : filteredProducts.map((p) => (
              <div key={p._id || p.name} className="pro-card product-card">
                <div className="product-card__image">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.name} />
                  ) : (
                    <div className="product-card__placeholder">Image coming soon</div>
                  )}
                </div>
                <div className="product-card__info">
                  <h3 style={{ margin: '8px 0 6px' }}>{p.name}</h3>
                  <div className="product-card__tags">
                    {[p.category, p.fabricType, p.gsm].filter(Boolean).map(tag => (
                      <span key={tag} className="product-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="product-card__meta">
                    <span className="product-price">{p.sizeRange || 'Available sizes on request'}</span>
                    <button className="pro-button" style={{ padding: '10px 16px' }}>Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
