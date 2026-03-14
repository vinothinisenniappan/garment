import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';

const ProductManager = ({ products, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-manager animate-fade-in">
      <div className="pro-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '25px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '350px' }}>
            <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={18} />
            <input 
              type="text" 
              placeholder="Search products by name or category..." 
              className="pro-input"
              style={{ paddingLeft: '45px', borderRadius: '12px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="filter-btn" style={{ borderRadius: '12px' }}>
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <button className="pro-button" style={{ borderRadius: '12px', padding: '0 20px' }} onClick={onAdd}>
              <Plus size={18} />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        <div className="pro-table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: '25px' }}>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th style={{ paddingRight: '25px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td style={{ paddingLeft: '25px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ 
                        width: '45px', 
                        height: '45px', 
                        borderRadius: '10px', 
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #e2e8f0'
                      }}>
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                        ) : (
                          <Package size={20} color="#94A3B8" />
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{product.name}</div>
                        <div className="cap-desc" style={{ fontSize: '11px' }}>ID: {product._id.slice(-8).toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: '#475569' }}>{product.category}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 800, color: 'var(--primary)' }}>₹{product.price?.toLocaleString() || 0}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontWeight: 700, color: product.stockQuantity < 20 ? '#ef4444' : '#10b981' }}>
                        {product.stockQuantity || 0} units
                      </span>
                      <div style={{ width: '60px', height: '4px', background: '#f1f5f9', borderRadius: '2px' }}>
                        <div style={{ 
                          width: `${Math.min((product.stockQuantity / 100) * 100, 100)}%`, 
                          height: '100%', 
                          background: product.stockQuantity < 20 ? '#ef4444' : '#10b981',
                          borderRadius: '2px'
                        }}></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      color: product.isActive ? '#10b981' : '#64748B',
                      background: product.isActive ? '#f0fdf4' : '#f8fafc',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 700,
                      border: `1px solid ${product.isActive ? '#bbf7d0' : '#e2e8f0'}`
                    }}>
                      {product.isActive ? 'ACTIVE' : 'ARCHIVED'}
                    </span>
                  </td>
                  <td style={{ paddingRight: '25px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button className="icon-btn" style={{ color: '#64748B' }} onClick={() => onEdit(product)}><Edit2 size={16} /></button>
                      <button className="icon-btn" style={{ color: '#ef4444' }} onClick={() => onDelete(product._id)}><Trash2 size={16} /></button>
                      <button className="icon-btn" style={{ color: 'var(--primary)' }}><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
