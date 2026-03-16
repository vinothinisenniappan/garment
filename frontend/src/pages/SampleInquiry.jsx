import { useState } from 'react';
import { apiFetch } from '../lib/api';
import './../styles.css'; // Assume generic styling usage
import { Upload, CheckCircle, Package, Truck, Info, CreditCard, Layers, Ruler, FileText, X } from 'lucide-react';

export default function SampleInquiry() {
  const [formData, setFormData] = useState({
    buyer: { fullName: '', companyName: '', businessType: 'Retailer', email: '', phone: '', country: '', city: '', website: '' },
    product: { category: 'T-Shirt', type: 'Unisex', quantity: 1, targetPrice: '' },
    fabric: { type: 'Cotton', gsm: '', composition: '', finish: 'Washed' },
    design: { uploadUrls: [], logoPlacement: '', printType: 'Screen Printing', embroideryRequired: false, pantoneColor: '' },
    size: { type: 'Standard Size Chart', requiredSizes: [], sizeChartUrl: '' },
    branding: { customBrandLabel: false, neckLabel: false, washCareLabel: false, hangTag: false, packaging: 'Polybag' },
    sampling: { type: 'Prototype Sample', deadline: '', budget: '' },
    bulkOrder: { expectedQuantity: '', frequency: 'One time', targetPrice: '' },
    shipping: { address: '', country: '', postalCode: '', preferredCourier: 'DHL', payment: 'Buyer Pays' },
    notes: { specialInstructions: '', referenceWebsite: '', competitorLink: '' },
    agreements: { acceptSampleCharges: false, acceptShippingCharges: false, agreeToTerms: false },
    files: { techPackUrl: '', referenceImagesUrls: [] }
  });

  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState('');
  const [error, setError] = useState('');

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const toggleSize = (size) => {
    setFormData(prev => {
      const sizes = prev.size.requiredSizes;
      if (sizes.includes(size)) {
        return { ...prev, size: { ...prev.size, requiredSizes: sizes.filter(s => s !== size) } };
      } else {
        return { ...prev, size: { ...prev.size, requiredSizes: [...sizes, size] } };
      }
    });
  };

  const handleFileUpload = async (section, field, e) => {
    // In a real scenario, you'd upload to Cloudinary/S3 here and get a URL.
    // For this demo, we can just read as base64 or simulate a URL.
    const file = e.target.files[0];
    if (!file) return;

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleNestedChange(section, field, reader.result);
        resolve();
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleMultipleFileUpload = async (section, field, e) => {
    const files = Array.from(e.target.files);
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    const results = await Promise.all(promises);
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], ...results]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreements.acceptSampleCharges || !formData.agreements.acceptShippingCharges || !formData.agreements.agreeToTerms) {
      setError('Please agree to all terms and charges before submitting.');
      return;
    }
    
    // Check required fields (simplified)
    if (!formData.buyer.fullName || !formData.buyer.email) {
       setError('Full Name and Email are required.');
       return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await apiFetch('/api/sample-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.success) {
        setSuccessId(res.inquiry.inquiryId);
        window.scrollTo(0, 0);
      } else {
        setError(res.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      setError('A network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (successId) {
    return (
      <div className="sample-inquiry-page" style={{ paddingTop: '120px', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="pro-card animate-slide-in" style={{ padding: '50px 30px', borderTop: '6px solid #10b981' }}>
            <div style={{ width: '80px', height: '80px', background: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#10b981' }}>
              <CheckCircle size={40} />
            </div>
            <h1 style={{ fontSize: '2rem', marginBottom: '15px', color: 'var(--primary)' }}>Sample Requested Successfully!</h1>
            <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '1.1rem' }}>Your request has been submitted to our production team. Please save the ID below for your reference.</p>
            
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '2px dashed #cbd5e1', marginBottom: '30px' }}>
              <span style={{ display: 'block', fontSize: '14px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '5px' }}>Your Reference ID</span>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', letterSpacing: '2px' }}>{successId}</span>
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>

              <button onClick={() => window.location.href='/'} className="btn btn--secondary">Return Home</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sample-inquiry-page app--internal" style={{ background: '#f8fafc' }}>
      <section className="internal-hero">
        <div className="internal-hero__inner">
          <span className="section-subtitle">Premium Prototyping</span>
          <h1 className="internal-hero__title">Request a Custom Sample</h1>
          <p>Provide detailed specifications to help us craft your perfect garment sample. This unified process ensures 100% accuracy in pre-production.</p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '80px' }}>
        
    

        {error && (
          <div className="pro-card" style={{ padding: '20px', marginBottom: '30px', borderLeft: '5px solid #ef4444', background: '#fef2f2', color: '#b91c1c' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="pro-form">
          {/* Section 1 */}
          <div className="pro-card" style={{ marginBottom: '20px' }}>
            <div className="section-header">
              <span className="section-subtitle">Profile</span>
              <h2><Info size={20} className="text-accent" style={{ verticalAlign: 'middle', marginRight: '8px' }} /> 1. Buyer & Company Information</h2>
            </div>
            <div className="grid grid--two">
              <div className="pro-field">
                <label>Full Name *</label>
                <input type="text" required className="pro-input" value={formData.buyer.fullName} onChange={(e) => handleNestedChange('buyer', 'fullName', e.target.value)} />
              </div>
              <div className="pro-field">
                <label>Company / Brand Name *</label>
                <input type="text" required className="pro-input" value={formData.buyer.companyName} onChange={(e) => handleNestedChange('buyer', 'companyName', e.target.value)} />
              </div>
              <div className="pro-field">
                <label>Business Type</label>
                <select className="pro-input" value={formData.buyer.businessType} onChange={(e) => handleNestedChange('buyer', 'businessType', e.target.value)}>
                  <option>Retailer</option><option>Wholesaler</option><option>Brand Owner</option><option>Importer</option><option>Startup Brand</option>
                </select>
              </div>
              <div className="pro-field">
                <label>Email Address *</label>
                <input type="email" required className="pro-input" value={formData.buyer.email} onChange={(e) => handleNestedChange('buyer', 'email', e.target.value)} />
              </div>
              <div className="pro-field">
                <label>Phone / WhatsApp *</label>
                <input type="tel" required className="pro-input" value={formData.buyer.phone} onChange={(e) => handleNestedChange('buyer', 'phone', e.target.value)} />
              </div>
              <div className="pro-field">
                <label>Country *</label>
                <input type="text" required className="pro-input" value={formData.buyer.country} onChange={(e) => handleNestedChange('buyer', 'country', e.target.value)} />
              </div>
              <div className="pro-field">
                <label>City *</label>
                <input type="text" required className="pro-input" value={formData.buyer.city} onChange={(e) => handleNestedChange('buyer', 'city', e.target.value)} />
              </div>
              <div className="pro-field">
                <label>Website (optional)</label>
                <input type="text" className="pro-input" placeholder="e.g. https://mybrand.com" value={formData.buyer.website} onChange={(e) => handleNestedChange('buyer', 'website', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="pro-card" style={{ marginBottom: '20px' }}>
            <div className="section-header">
              <span className="section-subtitle">Garment Specs</span>
              <h2><Package size={20} className="text-accent" style={{ verticalAlign: 'middle', marginRight: '8px' }} /> 2. Product Details</h2>
            </div>
            <div className="grid grid--two">
              <div className="pro-field">
                <label>Product Category</label>
                <select className="pro-input" value={formData.product.category} onChange={(e) => handleNestedChange('product', 'category', e.target.value)}>
                  <option>T-Shirt</option><option>Hoodie</option><option>Shirt</option><option>Jacket</option><option>Kids Wear</option><option>Sports Wear</option><option>Uniform</option>
                </select>
              </div>
              <div className="pro-field">
                <label>Product Type</label>
                <select className="pro-input" value={formData.product.type} onChange={(e) => handleNestedChange('product', 'type', e.target.value)}>
                  <option>Men</option><option>Women</option><option>Kids</option><option>Unisex</option>
                </select>
              </div>
              <div className="pro-field">
                <label>Sample Quantity Required</label>
                <input type="number" min="1" className="pro-input" value={formData.product.quantity} onChange={(e) => handleNestedChange('product', 'quantity', parseInt(e.target.value))} />
              </div>
              <div className="pro-field">
                <label>Est. Target Price / Pc (INR)</label>
                <input type="number" step="0.01" className="pro-input" placeholder="e.g. 450.00" value={formData.product.targetPrice} onChange={(e) => handleNestedChange('product', 'targetPrice', parseFloat(e.target.value))} />
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="pro-card" style={{ marginBottom: '20px' }}>
            <div className="section-header">
              <span className="section-subtitle">Material</span>
              <h2><Layers size={20} className="text-accent" style={{ verticalAlign: 'middle', marginRight: '8px' }} /> 3. Fabric Requirements</h2>
            </div>
            <div className="grid grid--two">
              <div className="pro-field">
                <label>Fabric Type</label>
                <select className="pro-input" value={formData.fabric.type} onChange={(e) => handleNestedChange('fabric', 'type', e.target.value)}>
                  <option>Cotton</option><option>Polyester</option><option>Cotton Polyester Blend</option><option>Linen</option><option>Fleece</option><option>Organic Cotton</option>
                </select>
              </div>
              <div className="pro-field">
                <label>Fabric GSM (Weight)</label>
                <input type="text" className="pro-input" placeholder="e.g. 180 GSM" value={formData.fabric.gsm} onChange={(e) => handleNestedChange('fabric', 'gsm', e.target.value)} />
              </div>
              <div className="pro-field">
                <label>Fabric Composition</label>
                <input type="text" className="pro-input" placeholder="e.g. 100% Cotton, 60% Cotton 40% Poly" value={formData.fabric.composition} onChange={(e) => handleNestedChange('fabric', 'composition', e.target.value)} />
              </div>
              <div className="pro-field">
                <label>Fabric Finish</label>
                <select className="pro-input" value={formData.fabric.finish} onChange={(e) => handleNestedChange('fabric', 'finish', e.target.value)}>
                  <option>Washed</option><option>Enzyme Washed</option><option>Bio Washed</option><option>Silicon Washed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4 & 12 */}
          <div className="pro-card" style={{ marginBottom: '20px' }}>
            <div className="section-header">
              <span className="section-subtitle">Customization</span>
              <h2><Upload size={20} className="text-accent" style={{ verticalAlign: 'middle', marginRight: '8px' }} /> 4 & 12. Design & Tech Packs</h2>
            </div>
            <div className="grid grid--two">
              <div className="pro-field">
                <label>Print/Design Type</label>
                <select className="pro-input" value={formData.design.printType} onChange={(e) => handleNestedChange('design', 'printType', e.target.value)}>
                  <option>Screen Printing</option><option>Digital Printing</option><option>Heat Transfer</option><option>None</option>
                </select>
              </div>
              <div className="pro-field">
                <label>Logo Placement</label>
                <input type="text" className="pro-input" placeholder="e.g. Left Chest, Center Back" value={formData.design.logoPlacement} onChange={(e) => handleNestedChange('design', 'logoPlacement', e.target.value)} />
              </div>
              <div className="pro-field" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="embroideryReq" style={{ width: '20px', height: '20px' }} checked={formData.design.embroideryRequired} onChange={(e) => handleNestedChange('design', 'embroideryRequired', e.target.checked)} />
                <label htmlFor="embroideryReq" style={{ margin: 0 }}>Embroidery Required?</label>
              </div>
              <div className="pro-field">
                <label>Pantone Color Code (optional)</label>
                <input type="text" className="pro-input" placeholder="#FFFFFF or TCX 19-4052" value={formData.design.pantoneColor} onChange={(e) => handleNestedChange('design', 'pantoneColor', e.target.value)} />
              </div>
              
              {/* File Uploads */}
              <div className="pro-field" style={{ gridColumn: '1 / -1' }}>
                <label>Upload Tech Pack (PDF/Image)</label>
                <div style={{ padding: '15px', border: '2px dashed #cbd5e1', borderRadius: '8px', background: '#f8fafc', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <input type="file" accept=".pdf,.png,.jpg,.jpeg,.ai,.psd" onChange={(e) => handleFileUpload('files', 'techPackUrl', e)} />
                  {formData.files.techPackUrl && <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ Uploaded</span>}
                </div>
              </div>

              <div className="pro-field" style={{ gridColumn: '1 / -1' }}>
                <label>Upload Reference/Design Images</label>
                <div style={{ padding: '15px', border: '2px dashed #cbd5e1', borderRadius: '8px', background: '#f8fafc', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <input type="file" multiple accept=".png,.jpg,.jpeg,.ai" onChange={(e) => handleMultipleFileUpload('files', 'referenceImagesUrls', e)} />
                  {formData.files.referenceImagesUrls.length > 0 && <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ {formData.files.referenceImagesUrls.length} File(s)</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="pro-card" style={{ marginBottom: '20px' }}>
            <div className="section-header">
              <span className="section-subtitle">Measurement</span>
              <h2><Ruler size={20} className="text-accent" style={{ verticalAlign: 'middle', marginRight: '8px' }} /> 5. Size Details</h2>
            </div>
            <div className="grid grid--two">
              <div className="pro-field">
                <label>Size Type</label>
                <select className="pro-input" value={formData.size.type} onChange={(e) => handleNestedChange('size', 'type', e.target.value)}>
                  <option>Standard Size Chart</option><option>Custom Size Chart</option>
                </select>
              </div>
              <div className="pro-field" style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '10px' }}>Sizes Required</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {['XS','S','M','L','XL','XXL', '3XL'].map(sz => (
                    <div 
                      key={sz} 
                      onClick={() => toggleSize(sz)}
                      style={{ 
                        padding: '10px 20px', 
                        border: '1px solid #cbd5e1', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        background: formData.size.requiredSizes.includes(sz) ? 'var(--accent)' : 'white',
                        color: formData.size.requiredSizes.includes(sz) ? 'white' : '#64748b',
                        fontWeight: 600
                      }}
                    >
                      {sz}
                    </div>
                  ))}
                </div>
              </div>
              {formData.size.type === 'Custom Size Chart' && (
                <div className="pro-field" style={{ gridColumn: '1 / -1' }}>
                  <label>Upload Custom Size Chart (Image/PDF)</label>
                  <input type="file" accept=".pdf,.png,.jpg,.jpeg" className="pro-input" style={{ padding: '8px' }} onChange={(e) => handleFileUpload('size', 'sizeChartUrl', e)} />
                </div>
              )}
            </div>
          </div>

          {/* Section 6 */}
          <div className="pro-card" style={{ marginBottom: '20px' }}>
            <div className="section-header">
              <span className="section-subtitle">Trims & Packing</span>
              <h2><FileText size={20} className="text-accent" style={{ verticalAlign: 'middle', marginRight: '8px' }} /> 6. Branding Requirements</h2>
            </div>
            <div className="grid grid--two">
               <div className="pro-field" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="brandLabel" style={{ width: '20px', height: '20px' }} checked={formData.branding.customBrandLabel} onChange={(e) => handleNestedChange('branding', 'customBrandLabel', e.target.checked)} />
                <label htmlFor="brandLabel" style={{ margin: 0 }}>Custom Brand Label</label>
              </div>
              <div className="pro-field" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="neckLabel" style={{ width: '20px', height: '20px' }} checked={formData.branding.neckLabel} onChange={(e) => handleNestedChange('branding', 'neckLabel', e.target.checked)} />
                <label htmlFor="neckLabel" style={{ margin: 0 }}>Neck Label</label>
              </div>
              <div className="pro-field" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="washCare" style={{ width: '20px', height: '20px' }} checked={formData.branding.washCareLabel} onChange={(e) => handleNestedChange('branding', 'washCareLabel', e.target.checked)} />
                <label htmlFor="washCare" style={{ margin: 0 }}>Wash Care Label</label>
              </div>
              <div className="pro-field" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="hangTag" style={{ width: '20px', height: '20px' }} checked={formData.branding.hangTag} onChange={(e) => handleNestedChange('branding', 'hangTag', e.target.checked)} />
                <label htmlFor="hangTag" style={{ margin: 0 }}>Hang Tag</label>
              </div>
              <div className="pro-field" style={{ gridColumn: '1 / -1' }}>
                <label>Packaging Requirement</label>
                <select className="pro-input" value={formData.branding.packaging} onChange={(e) => handleNestedChange('branding', 'packaging', e.target.value)}>
                  <option>Polybag</option><option>Box Packaging</option><option>Eco Packaging</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sections 7 & 8 */}
          <div className="pro-card" style={{ marginBottom: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              <div className="section-header">
                <span className="section-subtitle">Prototyping</span>
                <h2>7. Sampling Details</h2>
              </div>
              <div className="pro-field mb-4">
                <label>Sample Type</label>
                <select className="pro-input" value={formData.sampling.type} onChange={(e) => handleNestedChange('sampling', 'type', e.target.value)}>
                  <option>Prototype Sample</option><option>Fit Sample</option><option>Pre-production Sample</option>
                </select>
              </div>
              <div className="pro-field mb-4">
                <label>Sample Deadline</label>
                <input type="date" className="pro-input" value={formData.sampling.deadline} onChange={(e) => handleNestedChange('sampling', 'deadline', e.target.value)} />
              </div>
              <div className="pro-field">
                <label>Sample Budget (INR)</label>
                <input type="number" className="pro-input" value={formData.sampling.budget} onChange={(e) => handleNestedChange('sampling', 'budget', parseFloat(e.target.value))} />
              </div>
            </div>
            
            <div>
              <div className="section-header">
                <span className="section-subtitle">Production</span>
                <h2>8. Target Bulk Info</h2>
              </div>
              <div className="pro-field mb-4">
                <label>Expected Bulk Quantity</label>
                <input type="number" className="pro-input" value={formData.bulkOrder.expectedQuantity} onChange={(e) => handleNestedChange('bulkOrder', 'expectedQuantity', parseInt(e.target.value))} />
              </div>
              <div className="pro-field mb-4">
                <label>Order Frequency</label>
                <select className="pro-input" value={formData.bulkOrder.frequency} onChange={(e) => handleNestedChange('bulkOrder', 'frequency', e.target.value)}>
                  <option>One time</option><option>Monthly</option><option>Seasonal</option>
                </select>
              </div>
              <div className="pro-field">
                <label>Target Production Price (INR)</label>
                <input type="number" step="0.01" className="pro-input" value={formData.bulkOrder.targetPrice} onChange={(e) => handleNestedChange('bulkOrder', 'targetPrice', parseFloat(e.target.value))} />
              </div>
            </div>
          </div>

          {/* Section 9 */}
          <div className="pro-card" style={{ marginBottom: '20px' }}>
            <div className="section-header">
              <span className="section-subtitle">Logistics</span>
              <h2><Truck size={20} className="text-accent" style={{ verticalAlign: 'middle', marginRight: '8px' }} /> 9. Shipping Details</h2>
            </div>
            <div className="grid grid--two">
              <div className="pro-field" style={{ gridColumn: '1 / -1' }}>
                <label>Delivery Address</label>
                <textarea className="pro-input" rows="2" value={formData.shipping.address} onChange={(e) => handleNestedChange('shipping', 'address', e.target.value)}></textarea>
              </div>
              <div className="pro-field">
                <label>Country</label>
                <input type="text" className="pro-input" value={formData.shipping.country} onChange={(e) => handleNestedChange('shipping', 'country', e.target.value)} />
              </div>
              <div className="pro-field">
                <label>Postal Code</label>
                <input type="text" className="pro-input" value={formData.shipping.postalCode} onChange={(e) => handleNestedChange('shipping', 'postalCode', e.target.value)} />
              </div>
              <div className="pro-field">
                <label>Preferred Courier</label>
                <select className="pro-input" value={formData.shipping.preferredCourier} onChange={(e) => handleNestedChange('shipping', 'preferredCourier', e.target.value)}>
                  <option>DHL</option><option>FedEx</option><option>UPS</option><option>Any</option>
                </select>
              </div>
              <div className="pro-field">
                <label>Shipping Payment</label>
                <select className="pro-input" value={formData.shipping.payment} onChange={(e) => handleNestedChange('shipping', 'payment', e.target.value)}>
                  <option>Buyer Pays (Collect Account)</option><option>Supplier Pays (Include in Invoice)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 10 */}
          <div className="pro-card" style={{ marginBottom: '20px' }}>
            <div className="section-header">
              <span className="section-subtitle">Details</span>
              <h2><Info size={20} className="text-accent" style={{ verticalAlign: 'middle', marginRight: '8px' }} /> 10. Additional Notes</h2>
            </div>
            <div className="grid grid--two">
              <div className="pro-field" style={{ gridColumn: '1 / -1' }}>
                <label>Special Instructions</label>
                <textarea className="pro-input" rows="3" value={formData.notes.specialInstructions} onChange={(e) => handleNestedChange('notes', 'specialInstructions', e.target.value)}></textarea>
              </div>
              <div className="pro-field">
                <label>Reference Website</label>
                <input type="text" className="pro-input" placeholder="e.g. https://reference.com" value={formData.notes.referenceWebsite} onChange={(e) => handleNestedChange('notes', 'referenceWebsite', e.target.value)} />
              </div>
              <div className="pro-field">
                <label>Competitor Product Link</label>
                <input type="text" className="pro-input" placeholder="e.g. https://competitor.com/product" value={formData.notes.competitorLink} onChange={(e) => handleNestedChange('notes', 'competitorLink', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Section 11 */}
          <div className="pro-card" style={{ marginBottom: '40px', background: 'white' }}>
            <div className="section-header">
              <span className="section-subtitle">Final Step</span>
              <h2>11. Agreement</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 500 }}>
                <input type="checkbox" required style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} checked={formData.agreements.acceptSampleCharges} onChange={(e) => handleNestedChange('agreements', 'acceptSampleCharges', e.target.checked)} />
                I accept the Sample Development Charges (Admin will quote after review).
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 500 }}>
                <input type="checkbox" required style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} checked={formData.agreements.acceptShippingCharges} onChange={(e) => handleNestedChange('agreements', 'acceptShippingCharges', e.target.checked)} />
                I accept Shipping Charges associated with sample delivery.
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 500 }}>
                <input type="checkbox" required style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} checked={formData.agreements.agreeToTerms} onChange={(e) => handleNestedChange('agreements', 'agreeToTerms', e.target.checked)} />
                I agree to the Terms & Conditions of GarmentPro Manufacturing.
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn--primary" 
            style={{ width: '100%', padding: '20px', fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}
            disabled={loading}
          >
            {loading ? 'Submitting Request...' : 'Submit Sample Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
