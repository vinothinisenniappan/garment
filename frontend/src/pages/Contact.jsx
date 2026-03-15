import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

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

      <div className="page-container contact-page-container" style={{ marginBottom: '80px' }}>
        <div className="contact-shell grid grid--two">
          {/* Left: Info Side */}
          <section className="contact-info contact-info-panel reveal-on-scroll">
            <div className="section-header contact-panel-header">
              <span className="section-subtitle contact-panel-subtitle">Our Headquarters</span>
              <h2 className="contact-panel-title">Global Presence</h2>
            </div>
            
            <div className="contact-info-stack">
              <div className="contact-address-block">
                <MapPin size={24} className="contact-panel-icon" />
                <p className="contact-address-text">
                  Chitra Garden, 45, Chadrapuram (EAST),<br />
                  Sevanthampalayam Road, K.N.P. Colony (Post),<br />
                  Tirupur - 641608, Tamilnadu, India
                </p>
              </div>

              <div className="contact-meta-grid">
                <div className="contact-meta-item">
                   <Phone size={20} className="contact-panel-icon" />
                   <div>
                     <span className="contact-meta-label">Call Us</span>
                     <strong>+91 421 2428422</strong>
                   </div>
                </div>
                <div className="contact-meta-item">
                   <Mail size={20} className="contact-panel-icon" />
                   <div>
                     <span className="contact-meta-label">Email</span>
                     <strong>sreeanjaneya@sify.com</strong>
                   </div>
                </div>
              </div>

              <div className="contact-hours-card">
                 <div className="contact-hours-title">
                    <Clock size={18} className="contact-panel-icon" />
                    <strong>Operating Hours</strong>
                 </div>
                 <p>Mon - Sat: 09:00 AM - 08:30 PM (IST)<br />Sunday: Closed</p>
              </div>
            </div>
          </section>

          {/* Right: Form Side */}
          <section className="contact-form-side contact-form-panel reveal-on-scroll">
            <h2 className="contact-form-title">Send a Message</h2>
            <p className="contact-form-subtitle">Our procurement experts usually respond within 24 business hours.</p>
            
            <form className="pro-form">
              <div className="contact-form-row">
                <div className="pro-field">
                  <label>Full Name</label>
                  <input type="text" className="pro-input contact-input" placeholder="Your name" />
                </div>
                <div className="pro-field">
                  <label>Work Email</label>
                  <input type="email" className="pro-input contact-input" placeholder="email@company.com" />
                </div>
              </div>
              <div className="pro-field contact-input-block">
                <label>Company / Organization</label>
                <input type="text" className="pro-input contact-input" placeholder="Company name" />
              </div>
              <div className="pro-field">
                <label>Message Focus</label>
                <textarea className="pro-input contact-input" rows="5" placeholder="Tell us about your sourcing requirements..."></textarea>
              </div>
              <button type="submit" className="pro-button contact-submit" >
                Send Inquiry <Send size={18} />
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}

