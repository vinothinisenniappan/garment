import React from 'react';
import { 
  Boxes, 
  ArrowRightLeft, 
  AlertCircle,
  RefreshCcw,
  Layers
} from 'lucide-react';

const InventoryMatrix = ({ products, onUpdateInventory }) => {
  const lowStockProducts = products.filter(p => p.stockQuantity < 20);

  return (
    <div className="inventory-matrix animate-fade-in">
      <div className="grid grid--three" style={{ gap: '20px', marginBottom: '30px' }}>
        <div className="pro-card" style={{ background: 'var(--primary)', color: 'white', padding: '25px' }}>
          <Layers size={32} style={{ opacity: 0.5, marginBottom: '15px' }} />
          <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800 }}>{products.length}</h3>
          <p style={{ margin: '5px 0 0', opacity: 0.8, fontSize: '14px' }}>SKUs Tracked</p>
        </div>
        <div className="pro-card" style={{ padding: '25px' }}>
          <AlertCircle size={32} color="#ef4444" style={{ marginBottom: '15px' }} />
          <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>{lowStockProducts.length}</h3>
          <p style={{ margin: '5px 0 0', color: '#64748B', fontSize: '14px' }}>Low Stock Alerts</p>
        </div>
        <div className="pro-card" style={{ padding: '25px' }}>
          <RefreshCcw size={32} color="#3b82f6" style={{ marginBottom: '15px' }} />
          <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#3b82f6' }}>{products.reduce((acc, p) => acc + (p.stockQuantity || 0), 0)}</h3>
          <p style={{ margin: '5px 0 0', color: '#64748B', fontSize: '14px' }}>Total Units Available</p>
        </div>
      </div>

      <div className="pro-card">
        <div className="section-header" style={{ padding: '25px', borderBottom: '1px solid var(--border)' }}>
          <span className="section-subtitle">Size-wise Distribution</span>
          <h2>Inventory Matrix</h2>
        </div>
        <div className="pro-table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: '25px' }}>Product</th>
                <th className="center">S</th>
                <th className="center">M</th>
                <th className="center">L</th>
                <th className="center">XL</th>
                <th>Total Stock</th>
                <th style={{ paddingRight: '25px', textAlign: 'right' }}>Sync</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td style={{ paddingLeft: '25px' }}>
                    <div style={{ fontWeight: 700 }}>{product.name}</div>
                    <div className="cap-desc" style={{ fontSize: '11px' }}>{product.category}</div>
                  </td>
                  <td className="center">
                    <div className="inventory-pill">{product.inventory?.S || 0}</div>
                  </td>
                  <td className="center">
                    <div className="inventory-pill">{product.inventory?.M || 0}</div>
                  </td>
                  <td className="center">
                    <div className="inventory-pill">{product.inventory?.L || 0}</div>
                  </td>
                  <td className="center">
                    <div className="inventory-pill">{product.inventory?.XL || 0}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: 800, color: product.stockQuantity < 20 ? '#ef4444' : 'var(--primary)' }}>
                        {product.stockQuantity}
                      </span>
                      {product.stockQuantity < 20 && <AlertCircle size={14} color="#ef4444" />}
                    </div>
                  </td>
                  <td style={{ paddingRight: '25px', textAlign: 'right' }}>
                    <button 
                      className="icon-btn" 
                      style={{ color: 'var(--primary)' }}
                      onClick={() => onUpdateInventory(product)}
                    >
                      <ArrowRightLeft size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .inventory-pill {
          background: #f1f5f9;
          padding: 4px 12px;
          border-radius: 6px;
          font-weight: 700;
          color: #475569;
          display: inline-block;
          min-width: 40px;
        }
      `}</style>
    </div>
  );
};

export default InventoryMatrix;
