import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { apiFetch } from '../lib/api'

export default function BuyerInquiry() {
  const location = useLocation()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Optional associated product
  const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState('')

  // Minimal required fields to satisfy backend
  const [companyName, setCompanyName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [stateCity, setStateCity] = useState('')
  const [years, setYears] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [communication, setCommunication] = useState('Call')
  const [category, setCategory] = useState('T-Shirts')
  const [fabricType, setFabricType] = useState('Cotton')
  const [gsm, setGsm] = useState('')
  const [sizeRange, setSizeRange] = useState('')
  const [colorPref, setColorPref] = useState('')
  const [designType, setDesignType] = useState('Plain')
  const [quantity, setQuantity] = useState('')
  const [orderType, setOrderType] = useState('One-time')
  const [targetPrice, setTargetPrice] = useState('')
  const [packaging, setPackaging] = useState('Normal')
  const [deliveryLocation, setDeliveryLocation] = useState('')
  const [expectedDate, setExpectedDate] = useState('')
  const [transport, setTransport] = useState('Self Pickup')
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [customDesign, setCustomDesign] = useState('')
  const [longTerm, setLongTerm] = useState('Yes')
  const [country, setCountry] = useState('India')

  useEffect(() => {
    if (location.state) {
      if (location.state.productId) setProductId(location.state.productId)
      if (location.state.productName) setProductName(location.state.productName)
      if (location.state.category) {
        // Map product category to inquiry form category if possible
        const c = location.state.category;
        if (['T-shirts', 'Shirts', 'Kids Wear', 'Ladies Wear'].includes(c)) {
          setCategory(c === 'T-shirts' ? 'T-Shirts' : c)
        }
      }
      if (location.state.fabricType) setFabricType(location.state.fabricType)
    }
  }, [location])

  const mapCategoryToBackend = (c) => {
    const map = {
      'T-Shirts': 'T-shirts',
      'Shirts': 'Gents Wear',
      'Kids Wear': 'Kids Wear',
      'Ladies Wear': 'Ladies Wear'
    }
    return map[c] || undefined
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    // Construct payload for backend /api/inquiry
    const payload = {
      productId: productId || undefined,
      quantity,
      fabricType,
      companyName,
      contactPerson,
      email,
      phone,
      country,
      address: stateCity,
      website: '',
      businessType,
      requirements: `${productName ? `Product: ${productName} • ` : ''}${category} • ${fabricType} • ${gsm} • ${sizeRange} • ${colorPref} • ${designType} • Qty ${quantity} • ${orderType} • ${packaging} • Delivery ${deliveryLocation} ${expectedDate}`,
      annualVolume: quantity,
      preferredCategories: mapCategoryToBackend(category) ? [mapCategoryToBackend(category)] : []
    }

    try {
      const data = await apiFetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!data.success) {
        throw new Error(data.message || 'Submission failed')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="inquiry-page app--internal">
      <section className="internal-hero">
        <div className="internal-hero__inner">
          <span className="section-subtitle">Tailored Solutions for Your Brand</span>
          <h1 className="internal-hero__title">Business Inquiries</h1>
          <p>Partner with us to experience excellence in sustainable garment production. Fill out the form below to start our collaboration.</p>
        </div>
      </section>

      <div className="page-container" style={{ marginBottom: '40px' }}>
        {submitted ? (
          <div className="pro-card center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2>Thank you for your inquiry</h2>
            <p className="cap-desc">Our team will review your details and contact you shortly.</p>
            <button className="pro-button" onClick={() => setSubmitted(false)} style={{ marginTop: '20px' }}>Send Another Inquiry</button>
          </div>
        ) : (
          <form className="pro-form" onSubmit={handleSubmit} style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Section 1: Company Details */}
            <section className="pro-card" style={{ marginBottom: '20px' }}>
              <div className="section-header">
                <span className="section-subtitle">Profile</span>
                <h2>Company Details</h2>
              </div>
              <div className="grid grid--two">
                <div className="pro-field">
                  <label>Company / Firm Name</label>
                  <input type="text" className="pro-input" placeholder="Your company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                </div>
                <div className="pro-field">
                  <label>Business Type</label>
                  <select className="pro-input" value={businessType} onChange={(e) => setBusinessType(e.target.value)} required>
                    <option value="">Select</option>
                    <option>Wholesaler</option>
                    <option>Distributor</option>
                    <option>Brand</option>
                    <option>Retail Chain</option>
                  </select>
                </div>
              </div>
              <div className="grid grid--two">
                <div className="pro-field">
                  <label>State & City</label>
                  <input type="text" className="pro-input" placeholder="e.g. Tamilnadu, Tirupur" value={stateCity} onChange={(e) => setStateCity(e.target.value)} required />
                </div>
                <div className="pro-field">
                  <label>Country</label>
                  <input type="text" className="pro-input" placeholder="e.g. India" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
              </div>
              <div className="pro-field">
                <label>Years in Business</label>
                <input type="number" className="pro-input" placeholder="e.g. 5" value={years} onChange={(e) => setYears(e.target.value)} />
              </div>
            </section>

            {/* Section 2: Contact Details */}
            <section className="pro-card" style={{ marginBottom: '20px' }}>
              <div className="section-header">
                <span className="section-subtitle">Communication</span>
                <h2>Contact Details</h2>
              </div>
              <div className="grid grid--two">
                <div className="pro-field">
                  <label>Contact Person Name</label>
                  <input type="text" className="pro-input" placeholder="Full name" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required />
                </div>
                <div className="pro-field">
                  <label>Mobile Number</label>
                  <input type="tel" className="pro-input" placeholder="e.g. +91 98437 34959" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>
              <div className="grid grid--two">
                <div className="pro-field">
                  <label>Email Address</label>
                  <input type="email" className="pro-input" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="pro-field">
                  <label>Preferred Mode</label>
                  <select className="pro-input" value={communication} onChange={(e) => setCommunication(e.target.value)}>
                    <option>Call</option>
                    <option>Email</option>
                    <option>WhatsApp</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Section 3: Product Details */}
            <section className="pro-card" style={{ marginBottom: '20px' }}>
              <div className="section-header">
                <span className="section-subtitle">Sourcing</span>
                <h2>Product Details</h2>
              </div>
              <div className="grid grid--two">
                <div className="pro-field">
                  <label>Product Category</label>
                  <select className="pro-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>T-Shirts</option>
                    <option>Shirts</option>
                    <option>Kids Wear</option>
                    <option>Ladies Wear</option>
                    <option>Custom Garments</option>
                  </select>
                </div>
                <div className="pro-field">
                  <label>Fabric Type</label>
                  <select className="pro-input" value={fabricType} onChange={(e) => setFabricType(e.target.value)}>
                    <option>Cotton</option>
                    <option>Polyester</option>
                    <option>Blended</option>
                    <option>Others</option>
                  </select>
                </div>
              </div>
              <div className="grid grid--two">
                <div className="pro-field">
                  <label>GSM Requirement</label>
                  <input type="text" className="pro-input" placeholder="e.g. 180 GSM" value={gsm} onChange={(e) => setGsm(e.target.value)} />
                </div>
                <div className="pro-field">
                  <label>Size Range</label>
                  <input type="text" className="pro-input" placeholder="e.g. XS-XXL" value={sizeRange} onChange={(e) => setSizeRange(e.target.value)} />
                </div>
              </div>
              <div className="grid grid--two">
                <div className="pro-field">
                  <label>Color Preference</label>
                  <input type="text" className="pro-input" placeholder="e.g. Navy, White" value={colorPref} onChange={(e) => setColorPref(e.target.value)} />
                </div>
                <div className="pro-field">
                  <label>Design Type</label>
                  <select className="pro-input" value={designType} onChange={(e) => setDesignType(e.target.value)}>
                    <option>Plain</option>
                    <option>Printed</option>
                    <option>Embroidery</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Section 4: Order Details */}
            <section className="pro-card" style={{ marginBottom: '20px' }}>
              <div className="section-header">
                <span className="section-subtitle">Logistics</span>
                <h2>Order & Delivery</h2>
              </div>
              <div className="grid grid--two">
                <div className="pro-field">
                  <label>Estimated Quantity</label>
                  <input type="text" className="pro-input" placeholder="e.g. 5,000 units" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
                <div className="pro-field">
                  <label>Order Type</label>
                  <select className="pro-input" value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                    <option>One-time</option>
                    <option>Regular Monthly Order</option>
                  </select>
                </div>
              </div>
              <div className="grid grid--two">
                <div className="pro-field">
                  <label>Delivery Location</label>
                  <input type="text" className="pro-input" placeholder="City / Port / Address" value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} />
                </div>
                <div className="pro-field">
                  <label>Expected Date</label>
                  <input type="date" className="pro-input" value={expectedDate} onChange={(e) => setExpectedDate(e.target.value)} />
                </div>
              </div>
            </section>

            {/* Section 5: Additional Notes */}
            <section className="pro-card" style={{ marginBottom: '30px' }}>
              <div className="section-header">
                <span className="section-subtitle">Customization</span>
                <h2>Additional Notes</h2>
              </div>
              <div className="pro-field">
                <label>Special Instructions</label>
                <textarea className="pro-input" rows="4" placeholder="Specific instructions for production, packing, or labeling" value={specialInstructions} onChange={(e) => setSpecialInstructions(e.target.value)}></textarea>
              </div>
              <div className="pro-field">
                <label>Long-Term Partnership Interest?</label>
                <select className="pro-input" value={longTerm} onChange={(e) => setLongTerm(e.target.value)}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </section>

            {error && (<div className="error-message" style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: '20px', textAlign: 'center' }}>{error}</div>)}
            <button type="submit" className="pro-button" style={{ width: '100%', height: '56px', fontSize: '18px' }}>Submit Business Inquiry</button>
          </form>
        )}
      </div>
    </main>
  )
}

