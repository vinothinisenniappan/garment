import React from 'react';
import { Link } from 'react-router-dom';

const InquirySuccess = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card text-center">
            <div className="card-body py-5">
              <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
              <h1 className="mt-4 mb-3">Thank You!</h1>
              <p className="lead mb-4">Your inquiry has been submitted successfully!</p>
              <p className="text-muted mb-4">Our team will review your inquiry and contact you soon.</p>
              <div className="d-grid gap-2 d-md-block">
                <Link to="/" className="btn btn-primary btn-lg">Go to Home</Link>
                <Link to="/products" className="btn btn-outline-primary btn-lg">Browse Products</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquirySuccess;

