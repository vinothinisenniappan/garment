import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, Globe } from 'lucide-react';

export default function Contact() {
  return (
    <main className="contact-page app--internal">
      <section className="internal-hero">
        <div className="internal-hero__inner scale-reveal">
          <span className="section-subtitle">Get In Touch</span>
          <h1 className="internal-hero__title">Global Consultation</h1>
          <p>Connect with our expert manufacturing team to discuss your next global hosiery collection.</p>
        </div>
      </section>

      <div className="page-container" style={{ marginBottom: '80px' }}>
        <div className="grid grid--two" style={{ gap: '0', overflow: 'hidden', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
          {/* Left: Info Side */}
          <section className="contact-info reveal-on-scroll" style={{ background: 'var(--primary)', color: 'white', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
              <span className="section-subtitle" style={{ color: 'var(--secondary)' }}>Our Headquarters</span>
              <h2 style={{ color: 'white', fontSize: '2.5rem' }}>Global Presence</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <MapPin size={24} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                <p style={{ fontSize: '1.2rem', opacity: '0.9', margin: '0' }}>
                  Chitra Garden, 45, Chadrapuram (EAST),<br />
                  Sevanthampalayam Road, K.N.P. Colony (Post),<br />
                  Tirupur - 641608, Tamilnadu, India
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                   <Phone size={20} style={{ color: 'var(--secondary)' }} />
                   <div>
                     <span style={{ fontSize: '0.8rem', opacity: '0.6', display: 'block' }}>Call Us</span>
                     <strong>+91 421 2428422</strong>
                   </div>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                   <Mail size={20} style={{ color: 'var(--secondary)' }} />
                   <div>
                     <span style={{ fontSize: '0.8rem', opacity: '0.6', display: 'block' }}>Email</span>
                     <strong>sreeanjaneya@sify.com</strong>
                   </div>
                </div>
              </div>

              <div style={{ padding: '30px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                 <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
                    <Clock size={18} style={{ color: 'var(--secondary)' }} />
                    <strong style={{ fontSize: '0.9rem' }}>Operating Hours</strong>
                 </div>
                 <p style={{ margin: '0', opacity: '0.7', fontSize: '0.9rem' }}>Mon - Sat: 09:00 AM - 08:30 PM (IST)<br />Sunday: Closed</p>
              </div>
            </div>
          </section>

          {/* Right: Form Side */}
          <section className="contact-form-side reveal-on-scroll" style={{ background: 'white', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Send a Message</h2>
            <p style={{ color: 'var(--muted)', marginBottom: '40px' }}>Our procurement experts usually respond within 24 business hours.</p>
            
            <form className="pro-form">
              <div className="grid grid--two" style={{ gap: '24px' }}>
                <div className="pro-field" style={{ marginBottom: '0' }}>
                  <label>Full Name</label>
                  <input type="text" className="pro-input" placeholder="Your name" style={{ background: '#F8FAFC' }} />
                </div>
                <div className="pro-field" style={{ marginBottom: '0' }}>
                  <label>Work Email</label>
                  <input type="email" className="pro-input" placeholder="email@company.com" style={{ background: '#F8FAFC' }} />
                </div>
              </div>
              <div className="pro-field" style={{ margin: '24px 0' }}>
                <label>Company / Organization</label>
                <input type="text" className="pro-input" placeholder="Company name" style={{ background: '#F8FAFC' }} />
              </div>
              <div className="pro-field">
                <label>Message Focus</label>
                <textarea className="pro-input" rows="5" placeholder="Tell us about your sourcing requirements..." style={{ background: '#F8FAFC' }}></textarea>
              </div>
              <button type="submit" className="pro-button" style={{ width: '100%', height: '56px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                Send Inquiry <Send size={18} />
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}

