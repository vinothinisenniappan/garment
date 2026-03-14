import React, { useState } from 'react';
import { 
  Tags, 
  Plus, 
  Trash2, 
  Layers,
  FolderOpen
} from 'lucide-react';

const CategoryManager = ({ categories, onAdd, onDelete }) => {
  const [newName, setNewName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      onAdd({ name: newName });
      setNewName('');
    }
  };

  return (
    <div className="category-manager animate-fade-in">
      <div className="grid grid--two" style={{ gap: '30px', alignItems: 'start' }}>
        <div className="pro-card" style={{ padding: '25px' }}>
          <div className="section-header" style={{ marginBottom: '20px' }}>
            <span className="section-subtitle">Configuration</span>
            <h2>Add New Category</h2>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="pro-field">
              <label>Category Name</label>
              <input 
                type="text" 
                className="pro-input" 
                placeholder="e.g. Winter Collection" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <button className="pro-button" type="submit" style={{ width: '100%' }}>
              <Plus size={18} />
              <span>Create Category</span>
            </button>
          </form>
        </div>

        <div className="pro-card" style={{ padding: '25px' }}>
          <div className="section-header" style={{ marginBottom: '20px' }}>
            <span className="section-subtitle">Active Tags</span>
            <h2>Manage Categories</h2>
          </div>
          <div style={{ display: 'grid', gap: '10px' }}>
            {categories.map((cat) => (
              <div key={cat._id} className="pro-field" style={{ 
                margin: 0, 
                padding: '12px 20px', 
                background: '#F8FAFC', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FolderOpen size={18} color="var(--primary)" />
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{cat.name}</span>
                </div>
                <button className="icon-btn" style={{ color: '#ef4444' }} onClick={() => onDelete(cat._id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {categories.length === 0 && (
              <div className="center cap-desc" style={{ padding: '20px' }}>No categories created yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
