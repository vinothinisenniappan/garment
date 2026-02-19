export default function Products() {
  const products = [
    { name: 'Classic Tee', tags: ['Cotton', 'Unisex'], price: '$8.50', image: '/assets/infrastructure/i1.jpeg' },
    { name: 'Premium Polo', tags: ['Piqué', 'Men'], price: '$12.90', image: '/assets/infrastructure/i2.jpeg' },
    { name: 'Athletic Hoodie', tags: ['Fleece', 'Unisex'], price: '$18.40', image: '/assets/infrastructure/i3.jpeg' },
    { name: 'Crewneck Sweatshirt', tags: ['Terry', 'Unisex'], price: '$15.75', image: '/assets/infrastructure/i4.jpeg' },
    { name: 'Performance Joggers', tags: ['Activewear'], price: '$17.20', image: '/assets/infrastructure/i5.jpeg' },
    { name: 'Outerwear Jacket', tags: ['Shell'], price: '$22.00', image: '/assets/infrastructure/main.png' },
  ];

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
              {['All', 'T-Shirts', 'Polos', 'Activewear', 'Outerwear'].map(cat => (
                <button key={cat} className="pro-button" style={{ padding: '10px 18px', background: 'transparent', color: 'var(--nav-bg)', border: '1px solid var(--nav-bg)' }}>{cat}</button>
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
          <div className="grid grid--three">
            {products.map((p) => (
              <div key={p.name} className="pro-card product-card">
                <div className="product-card__image">
                  {p.image ? (
                    <img src={p.image} alt={p.name} />
                  ) : (
                    <div className="product-card__placeholder">Image coming soon</div>
                  )}
                </div>
                <div className="product-card__info">
                  <h3 style={{ margin: '8px 0 6px' }}>{p.name}</h3>
                  <div className="product-card__tags">
                    {p.tags.map(tag => (
                      <span key={tag} className="product-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="product-card__meta">
                    <span className="product-price">{p.price}</span>
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
