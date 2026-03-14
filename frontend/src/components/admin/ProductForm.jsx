import React, { useState, useEffect } from 'react';
import { X, Upload, Save, Trash2, Plus } from 'lucide-react';

const ProductForm = ({ product, categories, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'T-shirts',
    price: '',
    fabricType: '',
    gsm: '',
    sizeRange: '',
    isActive: true,
    isFeatured: false,
    inventory: { S: 0, M: 0, L: 0, XL: 0 }
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
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
                    {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
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
                <div style={{ height: '200px', border: '2px dashed #E2E8F0', borderRadius: '16px', display: 'grid', placeItems: 'center', background: '#F8FAFC' }}>
                  <div style={{ textAlign: 'center' }}>
                    <Upload size={40} color="#94A3B8" />
                    <p className="cap-desc" style={{ marginTop: '10px' }}>Add product images here</p>
                  </div>
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
