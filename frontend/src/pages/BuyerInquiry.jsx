import { useState } from 'react'

export default function BuyerInquiry() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

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
      companyName,
      contactPerson,
      email,
      phone,
      country,
      address: stateCity,
      website: '',
      businessType,
      requirements: `${category} • ${fabricType} • ${gsm} • ${sizeRange} • ${colorPref} • ${designType} • Qty ${quantity} • ${orderType} • ${packaging} • Delivery ${deliveryLocation} ${expectedDate}`,
      annualVolume: quantity,
      preferredCategories: mapCategoryToBackend(category) ? [mapCategoryToBackend(category)] : []
    }

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const ct = res.headers.get('content-type') || ''
      if (!ct.includes('application/json')) {
        const txt = await res.text()
        throw new Error(`Non-JSON response (${res.status}): ${txt.slice(0, 80)}...`)
      }
      const data = await res.json()
      if (!data.success) {
        throw new Error(data.message || 'Submission failed')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="inquiry-page">
      <section className="history-hero">
        <div className="history-hero__inner">
          <div className="history-hero__text-group">
            <h1 className="history-hero__title">Buyer Inquiry</h1>
            </div>
        </div>
      </section>

      <div className="page-container" style={{ marginBottom: '80px' }}>
        {submitted ? (
          <div className="pro-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '10px' }}>Thank you for your inquiry</h2>
            <p style={{ color: 'var(--muted)' }}>Our team will review your details and contact you shortly.</p>
          </div>
        ) : (
          <form className="pro-form" onSubmit={handleSubmit} style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Section 1: Company Details */}
            <section className="pro-card" style={{ marginBottom: '20px' }}>
              <h2 style={{ color: 'var(--nav-bg)', marginBottom: '10px' }}>Company Details</h2>
              <div className="grid grid--two" style={{ gap: '20px' }}>
                <div className="pro-field">
                  <label>Company / Firm Name</label>
                  <input type="text" className="pro-input" placeholder="Your company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div className="pro-field">
                  <label>Business Type</label>
                  <select className="pro-input" value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
                    <option value="">Select</option>
                    <option>Wholesaler</option>
                    <option>Distributor</option>
                    <option>Brand</option>
                    <option>Retail Chain</option>
                  </select>
                </div>
              </div>
              <div className="grid grid--two" style={{ gap: '20px' }}>
                <div className="pro-field">
                  <label>State & City</label>
                  <input type="text" className="pro-input" placeholder="e.g. Tamilnadu, Tirupur" value={stateCity} onChange={(e) => setStateCity(e.target.value)} />
                </div>
                <div className="pro-field">
                  <label>Country</label>
                  <input type="text" className="pro-input" placeholder="e.g. India" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
              </div>
              <div className="pro-field">
                <label>Years in Business</label>
                <input type="number" className="pro-input" placeholder="e.g. 5" value={years} onChange={(e) => setYears(e.target.value)} />
              </div>
              <p style={{ color: 'var(--muted)', marginTop: '10px' }}>This information helps us understand your business profile and order capacity.</p>
            </section>

            {/* Section 2: Contact Details */}
            <section className="pro-card" style={{ marginBottom: '20px' }}>
              <h2 style={{ color: 'var(--nav-bg)', marginBottom: '10px' }}>Contact Details</h2>
              <div className="grid grid--two" style={{ gap: '20px' }}>
                <div className="pro-field">
                  <label>Contact Person Name</label>
                  <input type="text" className="pro-input" placeholder="Full name" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
                </div>
                <div className="pro-field">
                  <label>Mobile Number</label>
                  <input type="tel" className="pro-input" placeholder="e.g. +91 98437 34959" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div className="grid grid--two" style={{ gap: '20px' }}>
                <div className="pro-field">
                  <label>Email Address</label>
                  <input type="email" className="pro-input" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="pro-field">
                  <label>Preferred Mode of Communication</label>
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
              <h2 style={{ color: 'var(--nav-bg)', marginBottom: '10px' }}>Product Details</h2>
              <div className="grid grid--two" style={{ gap: '20px' }}>
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
              <div className="grid grid--two" style={{ gap: '20px' }}>
                <div className="pro-field">
                  <label>GSM Requirement</label>
                  <input type="text" className="pro-input" placeholder="e.g. 180 GSM" value={gsm} onChange={(e) => setGsm(e.target.value)} />
                </div>
                <div className="pro-field">
                  <label>Size Range Required</label>
                  <input type="text" className="pro-input" placeholder="e.g. XS-XXL" value={sizeRange} onChange={(e) => setSizeRange(e.target.value)} />
                </div>
              </div>
              <div className="grid grid--two" style={{ gap: '20px' }}>
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
              <p style={{ color: 'var(--muted)', marginTop: '10px' }}>Please mention clear product specifications to receive accurate quotations.</p>
            </section>

            {/* Section 4: Order Details */}
            <section className="pro-card" style={{ marginBottom: '20px' }}>
              <h2 style={{ color: 'var(--nav-bg)', marginBottom: '10px' }}>Order Details</h2>
              <div className="grid grid--two" style={{ gap: '20px' }}>
                <div className="pro-field">
                  <label>Estimated Order Quantity</label>
                  <input type="text" className="pro-input" placeholder="e.g. 5,000 units" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="pro-field">
                  <label>Order Type</label>
                  <select className="pro-input" value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                    <option>One-time</option>
                    <option>Regular Monthly Order</option>
                  </select>
                </div>
              </div>
              <div className="grid grid--two" style={{ gap: '20px' }}>
                <div className="pro-field">
                  <label>Target Price Range (Optional)</label>
                  <input type="text" className="pro-input" placeholder="e.g. $7 - $10 / piece" value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)} />
                </div>
                <div className="pro-field">
                  <label>Packaging Requirement</label>
                  <select className="pro-input" value={packaging} onChange={(e) => setPackaging(e.target.value)}>
                    <option>Normal</option>
                    <option>Custom Branded</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Section 5: Delivery Details */}
            <section className="pro-card" style={{ marginBottom: '20px' }}>
              <h2 style={{ color: 'var(--nav-bg)', marginBottom: '10px' }}>Delivery Details</h2>
              <div className="grid grid--two" style={{ gap: '20px' }}>
                <div className="pro-field">
                  <label>Delivery Location</label>
                  <input type="text" className="pro-input" placeholder="City / Port / Address" value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} />
                </div>
                <div className="pro-field">
                  <label>Expected Delivery Date</label>
                  <input type="date" className="pro-input" value={expectedDate} onChange={(e) => setExpectedDate(e.target.value)} />
                </div>
              </div>
              <div className="pro-field">
                <label>Transportation Preference</label>
                <select className="pro-input" value={transport} onChange={(e) => setTransport(e.target.value)}>
                  <option>Self Pickup</option>
                  <option>Transport Service</option>
                </select>
              </div>
            </section>

            {/* Section 6: Additional Notes */}
            <section className="pro-card" style={{ marginBottom: '20px' }}>
              <h2 style={{ color: 'var(--nav-bg)', marginBottom: '10px' }}>Additional Notes</h2>
              <div className="pro-field">
                <label>Special Instructions</label>
                <textarea className="pro-input" rows="4" placeholder="Any specific instructions for production, packing, or labeling" value={specialInstructions} onChange={(e) => setSpecialInstructions(e.target.value)}></textarea>
              </div>
              <div className="pro-field">
                <label>Custom Design Requests</label>
                <textarea className="pro-input" rows="4" placeholder="Upload or describe your design requirements" value={customDesign} onChange={(e) => setCustomDesign(e.target.value)}></textarea>
              </div>
              <div className="pro-field">
                <label>Long-Term Partnership Interest</label>
                <select className="pro-input" value={longTerm} onChange={(e) => setLongTerm(e.target.value)}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </section>

            {/* Submit */}
            {error && (<div style={{ color: 'crimson', fontWeight: 600, fontSize: '13px', marginBottom: '10px' }}>{error}</div>)}
            <button type="submit" className="pro-button" style={{ width: '100%' }}>Submit Business Inquiry</button>
          </form>
        )}
      </div>
    </main>
  )
}

