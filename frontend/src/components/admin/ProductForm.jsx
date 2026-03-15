import React, { useState, useEffect } from 'react';
import { X, Upload, Save } from 'lucide-react';

const DEFAULT_CATEGORIES = ['T-shirts', 'Shirts', 'Pyjamas', 'Kidswear'];
const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

const ProductForm = ({ product, categories, onClose, onSave }) => {
  const categoryList = (categories && categories.length > 0)
    ? categories.map(c => typeof c === 'string' ? c : c.name)
    : DEFAULT_CATEGORIES;

  const [formData, setFormData] = useState({
    name: '',
    category: 'T-shirts',
    price: '',
    fabricType: '',
    gsm: '',
    sizeRange: 'S - XXL',
    images: [],
    isActive: true,
    isFeatured: false,
    inventory: { S: 0, M: 0, L: 0, XL: 0 }
  });
  const [imageError, setImageError] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        images: Array.isArray(product.images) ? product.images : [],
        inventory: product.inventory || { S: 0, M: 0, L: 0, XL: 0 }
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleInventoryChange = (size, val) => {
    setFormData(prev => ({
      ...prev,
      inventory: { ...prev.inventory, [size]: parseInt(val) || 0 }
    }));
  };

  const handleImageSelection = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setImageError('');

    const oversizedFile = files.find(file => file.size > MAX_IMAGE_SIZE_BYTES);
    if (oversizedFile) {
      setImageError(`${oversizedFile.name} is larger than 2 MB. Use a smaller image.`);
      e.target.value = '';
      return;
    }

    try {
      const encodedImages = await Promise.all(files.map(readFileAsDataUrl));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...encodedImages]
      }));
    } catch (error) {
      setImageError(error.message || 'Failed to load selected image');
    } finally {
      e.target.value = '';
    }
  };

  const handleAddImageUrl = () => {
    const nextUrl = imageUrlInput.trim();
    if (!nextUrl) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, nextUrl]
    }));
    setImageUrlInput('');
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', zIndex: 1000, padding: '20px' }}>
      <div className="pro-card animate-slide-in" style={{ width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', padding: 0 }}>
        <div style={{ padding: '25px 35px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
          <div>
            <h2 style={{ margin: 0, color: 'var(--primary)', fontWeight: 900 }}>{product ? 'Edit Product' : 'Add New Product'}</h2>
            <p className="cap-desc">System ID: {product?._id || 'NEW_RECORD'}</p>
          </div>
          <button className="icon-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '35px' }}>
          <div className="grid grid--two" style={{ gap: '30px' }}>
            <div style={{ display: 'grid', gap: '20px' }}>
              <div className="pro-field">
                <label>Product Name</label>
                <input name="name" value={formData.name} onChange={handleChange} className="pro-input" placeholder="e.g. Premium Cotton Polo" required />
              </div>
              <div className="grid grid--two" style={{ gap: '15px' }}>
                <div className="pro-field">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="pro-input">
                    {categoryList.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="pro-field">
                  <label>Price (₹)</label>
                  <input name="price" value={formData.price} onChange={handleChange} className="pro-input" type="number" placeholder="499" required />
                </div>
              </div>
              <div className="grid grid--two" style={{ gap: '15px' }}>
                <div className="pro-field">
                  <label>Fabric Type</label>
                  <input name="fabricType" value={formData.fabricType} onChange={handleChange} className="pro-input" placeholder="100% Combed Cotton" />
                </div>
                <div className="pro-field">
                  <label>GSM</label>
                  <input name="gsm" value={formData.gsm} onChange={handleChange} className="pro-input" placeholder="180" />
                </div>
              </div>
              <div className="pro-field">
                <label>Size Range</label>
                <input name="sizeRange" value={formData.sizeRange} onChange={handleChange} className="pro-input" placeholder="S - XXL" required />
              </div>
              <div className="pro-field">
                <label>Inventory Map (Size-wise Units)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <div key={size} style={{ flex: 1, textAlign: 'center' }}>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748B' }}>{size}</span>
                      <input 
                        type="number" 
                        value={formData.inventory[size]} 
                        onChange={(e) => handleInventoryChange(size, e.target.value)}
                        className="pro-input center" 
                        style={{ height: '40px', padding: 0 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              <div className="pro-field">
                <label>Product Visuals</label>
                <label
                  htmlFor="product-image-upload"
                  style={{
                    height: '200px',
                    border: '2px dashed #E2E8F0',
                    borderRadius: '16px',
                    display: 'grid',
                    placeItems: 'center',
                    background: '#F8FAFC',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <Upload size={40} color="#94A3B8" />
                    <p className="cap-desc" style={{ marginTop: '10px' }}>Click to add product images</p>
                    <p className="cap-desc" style={{ fontSize: '12px' }}>PNG, JPG, WEBP up to 2 MB each</p>
                  </div>
                  <input
                    id="product-image-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    multiple
                    onChange={handleImageSelection}
                    style={{ display: 'none' }}
                  />
                </label>
                {imageError && (
                  <div style={{ color: '#dc2626', fontSize: '13px', fontWeight: 600, marginTop: '8px' }}>
                    {imageError}
                  </div>
                )}
                {formData.images.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px', marginTop: '12px' }}>
                    {formData.images.map((image, index) => (
                      <div key={`${index}-${image.slice(0, 20)}`} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0', background: '#fff' }}>
                        <img src={image} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '90px', objectFit: 'cover', display: 'block' }} />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            position: 'absolute',
                            top: '6px',
                            right: '6px',
                            width: '28px',
                            height: '28px',
                            borderRadius: '999px',
                            border: 'none',
                            background: 'rgba(15, 23, 42, 0.8)',
                            color: '#fff',
                            display: 'grid',
                            placeItems: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <input
                    className="pro-input"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="Optional: paste a hosted image URL"
                  />
                  <button type="button" className="pro-button--secondary" onClick={handleAddImageUrl} style={{ minWidth: '96px' }}>
                    Add URL
                  </button>
                </div>
                <div className="cap-desc" style={{ fontSize: '12px', marginTop: '6px' }}>
                  Uploaded files are stored as product image data; pasted URLs also work.
                </div>
              </div>
              <div className="pro-field" style={{ padding: '20px', background: '#F8FAFC', borderRadius: '16px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span>Visible on Store</span>
                  <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} style={{ width: '20px', height: '20px' }} />
                </label>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginTop: '15px' }}>
                  <span>Feature on Home Page</span>
                  <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} style={{ width: '20px', height: '20px' }} />
                </label>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
            <button type="button" className="pro-button--secondary" onClick={onClose} style={{ height: '50px', padding: '0 30px' }}>Cancel</button>
            <button type="submit" className="pro-button" style={{ height: '50px', padding: '0 35px' }}>
              <Save size={18} />
              <span>{product ? 'Update Changes' : 'Publish Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
