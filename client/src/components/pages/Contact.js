import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-12">
          <h1 className="mb-4">Contact Us</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="mb-4">Get in Touch</h3>
              <p className="lead mb-4">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              
              <div className="mb-4">
                <h5><i className="bi bi-geo-alt-fill text-primary me-2"></i>Address</h5>
                <p>Chandrapuram East, 45,<br />
                Tiruppur, Chitra Garden,<br />
                Tirupur, Tamil Nadu</p>
              </div>

              <div className="mb-4">
                <h5><i className="bi bi-telephone-fill text-primary me-2"></i>Phone</h5>
                <p>+1 (555) 123-4567</p>
              </div>

              <div className="mb-4">
                <h5><i className="bi bi-envelope-fill text-primary me-2"></i>Email</h5>
                <p>info@garmentexport.com</p>
              </div>

              <div className="mb-4">
                <h5><i className="bi bi-clock-fill text-primary me-2"></i>Business Hours</h5>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="mb-4">Find Us on Map</h3>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  src="https://www.google.com/maps?q=Chandrapuram%20East%2C%2045%2C%20Tiruppur%2C%20Chitra%20Garden%2C%20Tirupur%2C%20Tamil%20Nadu&output=embed"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Company Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card bg-primary text-white text-center">
            <div className="card-body py-4">
              <h4>Ready to Start Your Order?</h4>
              <p className="mb-3">Submit an inquiry or request a sample to get started.</p>
              <Link to="/inquiry" className="btn btn-light me-2">Submit Inquiry</Link>
              <Link to="/samples/request" className="btn btn-outline-light">Request Sample</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

