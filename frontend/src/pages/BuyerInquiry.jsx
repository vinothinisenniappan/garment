export default function BuyerInquiry() {
  return (
    <main className="inquiry-page">
      <section className="internal-hero">
        <div className="container">
          <h1>Buyer Inquiry</h1>
          <p>Request a quote or share your technical specifications with our production team.</p>
        </div>
      </section>

      <div className="container" style={{ marginBottom: '80px' }}>
        <div className="pro-card pro-form-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <form className="pro-form">
            <div className="grid grid--two" style={{ gap: '20px' }}>
              <div className="pro-field">
                <label>Contact Person</label>
                <input type="text" className="pro-input" placeholder="Name" />
              </div>
              <div className="pro-field">
                <label>Company Name</label>
                <input type="text" className="pro-input" placeholder="Organization" />
              </div>
            </div>

            <div className="grid grid--two" style={{ gap: '20px' }}>
              <div className="pro-field">
                <label>Phone / WhatsApp</label>
                <input type="text" className="pro-input" placeholder="+1..." />
              </div>
              <div className="pro-field">
                <label>Product Interest</label>
                <select className="pro-input">
                  <option>Basic T-Shirts</option>
                  <option>Polo Shirts</option>
                  <option>Activewear</option>
                  <option>Outerwear</option>
                </select>
              </div>
            </div>

            <div className="pro-field">
              <label>Estimated Order Volume</label>
              <input type="text" className="pro-input" placeholder="e.g. 5000 units" />
            </div>

            <div className="pro-field">
              <label>Technical Specifications / Details</label>
              <textarea className="pro-input" rows="6" placeholder="Describe your fabric, sizing, and color requirements..."></textarea>
            </div>

            <button type="submit" className="pro-button" style={{ width: '100%' }}>Submit Production Request</button>
          </form>
        </div>
      </div>
    </main>
  )
}

