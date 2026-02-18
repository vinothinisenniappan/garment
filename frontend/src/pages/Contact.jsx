export default function Contact() {
  return (
    <main className="contact-page">
      <section className="internal-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>We’re here to discuss your requirements, factory walkthroughs, and manufacturing partnerships.</p>
        </div>
      </section>

      <div className="container" style={{ marginBottom: '80px' }}>
        <div className="grid grid--two">
          <section className="contact-info pro-card">
            <h2 style={{ color: 'var(--nav-bg)', marginBottom: '20px' }}>Headquarters</h2>
            <div className="contact-item" style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>Global Office</h3>
              <p style={{ fontWeight: '600' }}>
                Chitra Garden, 45, Chadrapuram (EAST),<br />
                Sevanthampalayam Road, K.N.P. Colony (Post),<br />
                Tirupur - 641608, Tamilnadu, India
              </p>
            </div>

            <div className="grid grid--two" style={{ gap: '20px' }}>
              <div className="contact-item">
                <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>Phone</h3>
                <p style={{ fontWeight: '600' }}>+91 421 2428422</p>
              </div>
              <div className="contact-item">
                <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>Email</h3>
                <p style={{ fontWeight: '600' }}>sreeanjaneya@sify.com</p>
              </div>
            </div>
          </section>

          <section className="contact-form pro-card">
            <h2 style={{ color: 'var(--nav-bg)', marginBottom: '20px' }}>Send a Message</h2>
            <form className="pro-form">
              <div className="pro-field">
                <label>Full Name</label>
                <input type="text" className="pro-input" placeholder="Enter your name" />
              </div>
              <div className="pro-field">
                <label>Email Address</label>
                <input type="email" className="pro-input" placeholder="Enter your email" />
              </div>
              <div className="pro-field">
                <label>Message</label>
                <textarea className="pro-input" rows="4" placeholder="Enter your message"></textarea>
              </div>
              <button type="submit" className="pro-button">Send Inquiry</button>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}

