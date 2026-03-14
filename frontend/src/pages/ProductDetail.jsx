import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { ArrowLeft, Check, Info, FileText, Send, Layers, Tag as TagIcon, Ruler } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/api/products/${id}`);
        if (!data.success) throw new Error(data.message || 'Product not found');
        setProduct(data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="loading-screen" style={{ height: '70vh', display: 'grid', placeItems: 'center' }}>
      <div className="loader"></div>
      <p style={{ marginTop: '20px', color: 'var(--muted)' }}>Fetching product specifications...</p>
    </div>
  );

  if (error || !product) return (
    <div className="page-container" style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h2 style={{ color: 'crimson' }}>{error || 'Product not found'}</h2>
      <button onClick={() => navigate('/products')} className="pro-button" style={{ marginTop: '20px' }}>
        Back to Catalog
      </button>
    </div>
  );

  return (
    <main className="product-detail-page app--internal">
      <section className="internal-hero" style={{ padding: '60px 0 40px' }}>
        <div className="page-container">
          <button 
            onClick={() => navigate('/products')} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'none', 
              border: 'none', 
              color: 'var(--muted)', 
              cursor: 'pointer',
              marginBottom: '20px',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            <ArrowLeft size={16} /> Back to Catalog
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <span style={{ padding: '4px 12px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              {product.category}
            </span>
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>SKU: PRD-{product._id.substring(18).toUpperCase()}</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{product.name}</h1>
        </div>
      </section>

      <div className="page-container" style={{ marginBottom: '120px' }}>
        <div className="grid" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'start' }}>
          {/* Left Side: Images & Specs */}
          <div className="reveal-on-scroll">
            <div className="pro-card" style={{ padding: '10px', borderRadius: '24px', background: '#fff', marginBottom: '40px', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', height: '500px', background: '#f8f9fa' }}>
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              {product.images.length > 1 && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '12px', 
                        overflow: 'hidden', 
                        border: activeImage === idx ? '2px solid var(--primary)' : '2px solid transparent',
                        padding: '0',
                        cursor: 'pointer'
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: '40px' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', marginBottom: '20px' }}>
                <Info size={24} color="var(--primary)" /> Technical Specifications
              </h2>
              <div className="pro-card" style={{ padding: '30px', borderRadius: '20px' }}>
                <div className="grid grid--two" style={{ gap: '30px' }}>
                  <div>
                    <h4 style={{ color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Fabric Composition</h4>
                    <p style={{ fontWeight: '500', fontSize: '1.1rem' }}>{product.fabricType}</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Material Weight</h4>
                    <p style={{ fontWeight: '500', fontSize: '1.1rem' }}>{product.gsm} GSM</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Size Range</h4>
                    <p style={{ fontWeight: '500', fontSize: '1.1rem' }}>{product.sizeRange}</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Available Colors</h4>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                      {product.colors.map(color => (
                        <span key={color} style={{ padding: '4px 12px', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.9rem' }}>{color}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid var(--border)' }}>
                  <h4 style={{ color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Description</h4>
                  <p style={{ lineHeight: '1.7', color: 'var(--secondary)' }}>{product.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Inquiry Card */}
          <div className="reveal-on-scroll" style={{ position: 'sticky', top: '100px' }}>
            <div className="pro-card" style={{ padding: '40px', borderRadius: '24px', background: 'var(--primary)', color: 'white', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: '0.1' }}>
                <FileText size={200} />
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Business Inquiry</h3>
              <p style={{ opacity: '0.8', marginBottom: '30px', fontSize: '1rem' }}>Interested in this product for your brand? Request a quote or a physical sample for quality assessment.</p>
              
              <ul style={{ listStyle: 'none', padding: '0', marginBottom: '40px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center' }}>
                    <Check size={14} />
                  </div>
                  <span>Custom Branding Available</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center' }}>
                    <Check size={14} />
                  </div>
                  <span>Eco-friendly Materials</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center' }}>
                    <Check size={14} />
                  </div>
                  <span>Global Shipping</span>
                </li>
              </ul>

              <button 
                onClick={() => navigate('/buyer-inquiry', { state: { productName: product.name } })}
                className="pro-button" 
                style={{ width: '100%', background: 'white', color: 'var(--primary)', height: '56px', fontSize: '1rem' }}
              >
                Request Quote <Send size={18} style={{ marginLeft: '10px' }} />
              </button>
            </div>

            <div style={{ marginTop: '30px' }}>
              <div className="pro-card" style={{ padding: '20px', borderRadius: '16px', border: '1px dashed var(--border)', background: 'transparent' }}>
                 <p style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--muted)' }}>
                   <Ruler size={18} /> Need custom sizing or special fabric? 
                   <a href="/contact" style={{ color: 'var(--primary)', fontWeight: '600' }}>Contact us</a>
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
