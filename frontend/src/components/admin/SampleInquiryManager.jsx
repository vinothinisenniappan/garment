import { useState, useEffect } from 'react';
import { apiFetch } from '../../lib/api';
import { Search, Edit, Eye, Filter, Download, ArrowUpRight, PackageOpen, Tag, Ruler, Briefcase, FileText } from 'lucide-react';

export default function SampleInquiryManager() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inventoryLink, setInventoryLink] = useState([]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/sample-inquiries');
      if (res.success) setInquiries(res.inquiries);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await apiFetch(`/api/sample-inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.success) {
        setInquiries(inquiries.map(i => i._id === id ? res.inquiry : i));
        if (selectedInquiry?._id === id) setSelectedInquiry(res.inquiry);
      }
    } catch (error) {
      alert('Failed to update status');
    }
  };

  // Mock checking inventory linkage
  const checkInventory = async (category) => {
    // In actual implementation, you'd fetch from /api/inventory/search?category=...
    // Here we'll just mock it based on category to show the linkage constraint
    setInventoryLink([
      { id: 'INV-001', name: `Premium ${category || 'Fabric'} Roll`, stock: 120, unit: 'meters' },
      { id: 'INV-002', name: 'Sample Thread Box', stock: 45, unit: 'pcs' }
    ]);
  };

  const openDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    checkInventory(inquiry.product?.category);
  };

  const filteredInquiries = inquiries.filter(i => {
    if (filter !== 'All' && i.status !== filter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return i.inquiryId.toLowerCase().includes(term) || 
             i.buyer?.fullName.toLowerCase().includes(term) ||
             i.buyer?.companyName.toLowerCase().includes(term);
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return { bg: '#fff7ed', text: '#ea580c' }; // Orange
      case 'Under Review': return { bg: '#fef3c7', text: '#d97706' }; // Yellow
      case 'Sample in Development': return { bg: '#e0e7ff', text: '#4f46e5' }; // Indigo
      case 'Shipped': return { bg: '#dcfce3', text: '#16a34a' }; // Green
      default: return { bg: '#f1f5f9', text: '#64748b' };
    }
  };

  if (selectedInquiry) {
    return (
      <div className="pro-card animate-slide-in" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '25px 30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
          <div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{selectedInquiry.inquiryId}</h2>
              <span style={{ 
                padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                background: getStatusColor(selectedInquiry.status).bg,
                color: getStatusColor(selectedInquiry.status).text
              }}>
                {selectedInquiry.status}
              </span>
            </div>
            <p className="cap-desc" style={{ margin: 0 }}>Submitted by {selectedInquiry.buyer?.fullName} ({selectedInquiry.buyer?.companyName}) on {new Date(selectedInquiry.createdAt).toLocaleString()}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <select 
              value={selectedInquiry.status} 
              onChange={(e) => handleUpdateStatus(selectedInquiry._id, e.target.value)}
              style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 600, color: '#0f172a' }}
            >
              <option>Pending</option>
              <option>Under Review</option>
              <option>Sample in Development</option>
              <option>Shipped</option>
            </select>
            <button onClick={() => setSelectedInquiry(null)} className="btn btn--secondary" style={{ padding: '0 20px' }}>Back to List</button>
          </div>
        </div>

        <div style={{ padding: '30px', overflowY: 'auto', flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {/* Buyer Info */}
            <div className="pro-card" style={{ padding: '25px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}><Briefcase size={18} /> Buyer Profile</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div><label className="cap-desc">Name</label><div style={{ fontWeight: 600 }}>{selectedInquiry.buyer?.fullName}</div></div>
                <div><label className="cap-desc">Company</label><div style={{ fontWeight: 600 }}>{selectedInquiry.buyer?.companyName}</div></div>
                <div><label className="cap-desc">Email</label><div><a href={`mailto:${selectedInquiry.buyer?.email}`}>{selectedInquiry.buyer?.email}</a></div></div>
                <div><label className="cap-desc">Phone / Location</label><div>{selectedInquiry.buyer?.phone} <br/> {selectedInquiry.buyer?.city}, {selectedInquiry.buyer?.country}</div></div>
              </div>
            </div>

            {/* Product & Fabric */}
            <div className="pro-card" style={{ padding: '25px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}><PackageOpen size={18} /> Product & Fabric Specs</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                <div><label className="cap-desc">Category</label><div style={{ fontWeight: 600 }}>{selectedInquiry.product?.category} - {selectedInquiry.product?.type}</div></div>
                <div><label className="cap-desc">Quantity</label><div style={{ fontWeight: 600 }}>{selectedInquiry.product?.quantity} units</div></div>
                <div><label className="cap-desc">Target Price</label><div style={{ fontWeight: 600 }}>${selectedInquiry.product?.targetPrice}</div></div>
                
                <div><label className="cap-desc">Fabric</label><div style={{ fontWeight: 600 }}>{selectedInquiry.fabric?.type}</div></div>
                <div><label className="cap-desc">GSM & Comp.</label><div>{selectedInquiry.fabric?.gsm} | {selectedInquiry.fabric?.composition}</div></div>
                <div><label className="cap-desc">Finish</label><div>{selectedInquiry.fabric?.finish}</div></div>
              </div>
            </div>
            
            {/* Design & Sizes */}
            <div className="pro-card" style={{ padding: '25px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}><Ruler size={18} /> Design, Brand & Sizes</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div><label className="cap-desc">Print / Embroidery</label><div style={{ fontWeight: 600 }}>{selectedInquiry.design?.printType} / {selectedInquiry.design?.embroideryRequired ? 'Yes' : 'No'}</div></div>
                <div><label className="cap-desc">Pantone</label><div>{selectedInquiry.design?.pantoneColor || 'N/A'}</div></div>
                <div><label className="cap-desc">Sizes Needed</label><div>{selectedInquiry.size?.requiredSizes?.join(', ') || 'N/A'}</div></div>
                <div><label className="cap-desc">Size Type</label><div>{selectedInquiry.size?.type}</div></div>
              </div>
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', fontSize: '14px', border: '1px solid #e2e8f0' }}>
                <strong>Branding: </strong> 
                {selectedInquiry.branding?.customBrandLabel && <span className="tag" style={{ marginRight: '5px' }}>Custom Label</span>}
                {selectedInquiry.branding?.neckLabel && <span className="tag" style={{ marginRight: '5px' }}>Neck Label</span>}
                {selectedInquiry.branding?.washCareLabel && <span className="tag" style={{ marginRight: '5px' }}>Wash Care</span>}
                {selectedInquiry.branding?.hangTag && <span className="tag" style={{ marginRight: '5px' }}>Hang Tag</span>}
                <br/><br/>
                <strong>Packaging: </strong> {selectedInquiry.branding?.packaging}
              </div>
            </div>
            
            {/* Notes */}
            <div className="pro-card" style={{ padding: '25px', background: '#fefce8', border: '1px solid #fef08a' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Special Instructions</h3>
              <p style={{ margin: 0, fontStyle: 'italic', color: '#854d0e' }}>{selectedInquiry.notes?.specialInstructions || 'None provided.'}</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            {/* File Uploads Section */}
            <div className="pro-card" style={{ padding: '25px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Attached Files</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <label className="cap-desc">Tech Pack / Custom Size Chart</label>
                {(selectedInquiry.files?.techPackUrl || selectedInquiry.size?.sizeChartUrl) ? (
                  <a href={selectedInquiry.files?.techPackUrl || selectedInquiry.size?.sizeChartUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f8fafc', borderRadius: '8px', textDecoration: 'none', color: 'var(--primary)', fontWeight: 600, marginTop: '5px' }}>
                    <FileText size={16} /> View Primary Document
                  </a>
                ) : <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '5px' }}>No documents uploaded</div>}
              </div>

              <div>
                <label className="cap-desc">Reference Images</label>
                {selectedInquiry.files?.referenceImagesUrls?.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                    {selectedInquiry.files.referenceImagesUrls.map((url, i) => (
                      <div key={i} style={{ aspectRatio: '1', background: '#e2e8f0', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                        {/* We try rendering as image. If it's pure base64 it'll work, if it's pdf it might not. */}
                        <img src={url} alt="Ref" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                ) : <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '5px' }}>No images uploaded</div>}
              </div>
            </div>

            {/* Inventory Linkage */}
            <div className="pro-card" style={{ padding: '25px', background: '#f8fafc' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}><Tag size={18} /> Inventory Check</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>Potential matched materials for <strong>{selectedInquiry.product?.category}</strong>:</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {inventoryLink.map(inv => (
                  <div key={inv.id} style={{ padding: '12px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>{inv.id}</div>
                      <div style={{ fontSize: '14px' }}>{inv.name}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 800 }}>{inv.stock}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{inv.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn--secondary" style={{ width: '100%', marginTop: '15px', fontSize: '13px' }}>Manage Inventory</button>
            </div>

             {/* Shipping & Orders */}
             <div className="pro-card" style={{ padding: '25px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Logistics</h3>
              <div style={{ fontSize: '14px', marginBottom: '10px' }}><strong>Bulk Target:</strong> {selectedInquiry.bulkOrder?.expectedQuantity} pcs ({selectedInquiry.bulkOrder?.frequency}) at ${selectedInquiry.bulkOrder?.targetPrice}</div>
              <div style={{ fontSize: '14px', marginBottom: '10px' }}><strong>Shipping:</strong> {selectedInquiry.shipping?.address}, {selectedInquiry.shipping?.country} - {selectedInquiry.shipping?.postalCode}</div>
              <div style={{ fontSize: '14px', marginBottom: '10px' }}><strong>Courier:</strong> {selectedInquiry.shipping?.preferredCourier} ({selectedInquiry.shipping?.payment})</div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
        <div style={{ display: 'flex', gap: '15px', flex: 1, maxWidth: '600px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by ID, Buyer Name, or Company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '45px', background: 'white', border: '1px solid #e2e8f0', fontSize: '14px' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
             <Filter size={18} style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
             <select 
                className="form-input" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                style={{ paddingLeft: '45px', width: '200px', background: 'white', border: '1px solid #e2e8f0' }}
              >
               <option value="All">All Statuses</option>
               <option value="Pending">Pending</option>
               <option value="Under Review">Under Review</option>
               <option value="Sample in Development">Sample in Development</option>
               <option value="Shipped">Shipped</option>
             </select>
          </div>
        </div>
        <button className="btn btn--secondary" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Grid */}
      <div className="pro-card" style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ overflowX: 'auto', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '20px', fontWeight: 600, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Inquiry ID</th>
                <th style={{ padding: '20px', fontWeight: 600, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</th>
                <th style={{ padding: '20px', fontWeight: 600, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Buyer</th>
                <th style={{ padding: '20px', fontWeight: 600, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Product</th>
                <th style={{ padding: '20px', fontWeight: 600, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                <th style={{ padding: '20px', fontWeight: 600, color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ padding: '40px', textAlign: 'center' }}>Loading inquiries...</td></tr>
              ) : filteredInquiries.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No inquiries found matching criteria.</td></tr>
              ) : (
                filteredInquiries.map(inquiry => {
                  const statusColors = getStatusColor(inquiry.status);
                  return (
                    <tr key={inquiry._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} className="table-row-hover">
                      <td style={{ padding: '20px', fontWeight: 700, color: 'var(--primary)' }}>{inquiry.inquiryId}</td>
                      <td style={{ padding: '20px', color: '#64748b', fontSize: '14px' }}>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '20px' }}>
                        <div style={{ fontWeight: 600 }}>{inquiry.buyer?.fullName}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{inquiry.buyer?.companyName}</div>
                      </td>
                      <td style={{ padding: '20px', fontSize: '14px' }}>
                        {inquiry.product?.category} <span style={{ color: '#94a3b8' }}>({inquiry.product?.quantity}x)</span>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <span style={{ 
                          padding: '6px 12px', 
                          borderRadius: '20px', 
                          fontSize: '12px', 
                          fontWeight: 700,
                          background: statusColors.bg,
                          color: statusColors.text,
                          display: 'inline-block'
                        }}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td style={{ padding: '20px', textAlign: 'right' }}>
                        <button 
                          onClick={() => openDetails(inquiry)}
                          className="btn btn--secondary" 
                          style={{ padding: '8px 12px', fontSize: '13px', border: '1px solid #e2e8f0', background: 'white' }}
                        >
                          Review <ArrowUpRight size={14} style={{ marginLeft: '5px' }} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
          <style>{`
            .table-row-hover:hover { background: #f8fafc; cursor: pointer; }
          `}</style>
        </div>
      </div>
    </div>
  );
}
