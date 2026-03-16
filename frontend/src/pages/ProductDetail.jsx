import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { ArrowLeft, Check, Info, FileText, Send, Tag as TagIcon, Ruler } from 'lucide-react';

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

  const productImages = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
  const productColors = Array.isArray(product.colors) && product.colors.length > 0 ? product.colors : ['Made to order'];

  return (
    <main className="product-detail-page app--internal">
      <section className="internal-hero" style={{ padding: 'calc(var(--header-height) + 12px) 0 14px', marginBottom: 0, background: 'linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)' }}>
        <div className="product-detail-shell" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <div className="pro-card" style={{ padding: '28px 32px', borderRadius: '28px', boxShadow: '0 24px 54px rgba(15, 46, 90, 0.1)', border: '1px solid rgba(15, 46, 90, 0.08)' }}>
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

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(240px, 0.6fr)', gap: '24px', alignItems: 'end' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '6px 14px', background: 'rgba(15, 46, 90, 0.08)', color: 'var(--primary)', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {product.category}
                  </span>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>SKU: PRD-{product._id.substring(18).toUpperCase()}</span>
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '12px', lineHeight: 1.02, letterSpacing: '-0.04em' }}>{product.name}</h1>
                <p style={{ maxWidth: '760px', margin: 0, color: 'var(--muted)', lineHeight: 1.7 }}>
                  Structured for buyers who need clear specification visibility, immediate sampling context, and a cleaner path from catalog review to inquiry.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                <div style={{ padding: '16px', borderRadius: '18px', background: '#f8fbff', border: '1px solid #e4edf6' }}>
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted)', marginBottom: '6px' }}>Fabric</div>
                  <div style={{ fontWeight: 800, color: 'var(--primary)' }}>{product.fabricType}</div>
                </div>
                <div style={{ padding: '16px', borderRadius: '18px', background: '#f8fbff', border: '1px solid #e4edf6' }}>
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted)', marginBottom: '6px' }}>Weight</div>
                  <div style={{ fontWeight: 800, color: 'var(--primary)' }}>{product.gsm} GSM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="product-detail-shell" style={{ maxWidth: '1240px', margin: '0 auto 80px', padding: '10px 24px 0' }}>
        <div className="grid product-detail-layout" style={{ gridTemplateColumns: 'minmax(0, 1.15fr) minmax(320px, 0.85fr)', gap: '32px', alignItems: 'start' }}>
          <div className="reveal-on-scroll">
            <div className="pro-card" style={{ padding: '14px', borderRadius: '28px', background: '#fff', marginBottom: '26px', boxShadow: '0 24px 60px rgba(15, 46, 90, 0.1)' }}>
              <div style={{ borderRadius: '22px', overflow: 'hidden', minHeight: '420px', background: 'linear-gradient(180deg, #f8fbff 0%, #eef5fb 100%)', display: 'grid', placeItems: 'center' }}>
                {productImages[activeImage] ? (
                  <img src={productImages[activeImage]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ textAlign: 'center', padding: '32px', color: 'var(--muted)' }}>
                    <TagIcon size={46} style={{ opacity: 0.22, marginBottom: '14px' }} />
                    <div style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>Visual Pending</div>
                    <p style={{ margin: 0, maxWidth: '320px', lineHeight: 1.6 }}>This product has been published without a gallery image yet. Specifications and inquiry actions remain available.</p>
                  </div>
                )}
              </div>

              {productImages.length > 1 && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      style={{
                        width: '82px',
                        height: '82px',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        border: activeImage === idx ? '2px solid var(--primary)' : '2px solid transparent',
                        padding: 0,
                        cursor: 'pointer',
                        background: '#f8fbff'
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: '20px' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.45rem', marginBottom: '18px' }}>
                <Info size={24} color="var(--primary)" /> Technical Specifications
              </h2>
              <div className="pro-card" style={{ padding: '28px', borderRadius: '24px' }}>
                <div className="grid grid--two" style={{ gap: '24px' }}>
                  <div>
                    <h4 style={{ color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Fabric Composition</h4>
                    <p style={{ fontWeight: '500', fontSize: '1.05rem' }}>{product.fabricType}</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Material Weight</h4>
                    <p style={{ fontWeight: '500', fontSize: '1.05rem' }}>{product.gsm} GSM</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Size Range</h4>
                    <p style={{ fontWeight: '500', fontSize: '1.05rem' }}>{product.sizeRange}</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Available Colors</h4>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px', flexWrap: 'wrap' }}>
                      {productColors.map(color => (
                        <span key={color} style={{ padding: '4px 12px', border: '1px solid var(--border)', borderRadius: '999px', fontSize: '0.9rem', background: '#f8fbff' }}>{color}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid var(--border)' }}>
                  <h4 style={{ color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Description</h4>
                  <p style={{ lineHeight: '1.75', color: 'var(--secondary)', margin: 0 }}>{product.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-on-scroll" style={{ position: 'sticky', top: '96px' }}>
            <div className="pro-card" style={{ padding: '34px', borderRadius: '28px', background: 'linear-gradient(180deg, #0f2e5a 0%, #153d74 100%)', color: 'white', overflow: 'hidden', position: 'relative', boxShadow: '0 26px 54px rgba(15, 46, 90, 0.18)' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: '0.1' }}>
                <FileText size={200} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px', marginBottom: '26px' }}>
                <div style={{ padding: '14px', borderRadius: '18px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.14em', opacity: 0.72, marginBottom: '6px' }}>Size Range</div>
                  <div style={{ fontWeight: 800 }}>{product.sizeRange}</div>
                </div>
                <div style={{ padding: '14px', borderRadius: '18px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.14em', opacity: 0.72, marginBottom: '6px' }}>Category</div>
                  <div style={{ fontWeight: 800 }}>{product.category}</div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Business Inquiry</h3>
              <p style={{ opacity: '0.82', marginBottom: '30px', fontSize: '1rem', lineHeight: 1.7 }}>
                Interested in this product for your brand? Request a quote or a physical sample for quality assessment.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '36px' }}>
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

              <button onClick={() => navigate('/buyer-inquiry', { state: { productId: product._id, productName: product.name, category: product.category, fabricType: product.fabricType } })} className="pro-button" style={{ width: '100%', background: 'white', color: 'var(--primary)', height: '56px', fontSize: '1rem' }}>
                Request Quote <Send size={18} style={{ marginLeft: '10px' }} />
              </button>
            </div>

            <div style={{ marginTop: '22px' }}>
              <div className="pro-card" style={{ padding: '20px', borderRadius: '18px', border: '1px dashed var(--border)', background: 'transparent' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--muted)', margin: 0 }}>
                  <Ruler size={18} /> Need custom sizing or special fabric?
                  <a href="/contact" style={{ color: 'var(--primary)', fontWeight: '600' }}>Contact us</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .product-detail-shell {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .product-detail-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
