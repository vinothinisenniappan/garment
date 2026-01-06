import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SampleRequestSuccess = () => {
  const location = useLocation();
  const sampleRequest = location.state?.sampleRequest || null;

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString();
    } catch (e) {
      return dateStr;
    }
  };

  const statusClass = (status) => {
    if (!status) return 'badge bg-secondary';
    const key = status.toLowerCase().replace(/\s+/g, '-');
    // Map to Bootstrap styles if available
    switch (key) {
      case 'pending':
        return 'badge bg-warning text-dark';
      case 'approved':
      case 'processing':
        return 'badge bg-info text-dark';
      case 'shipped':
      case 'delivered':
        return 'badge bg-success';
      case 'rejected':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card text-center">
            <div className="card-body py-5">
              <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
              <h1 className="mt-4 mb-3">Sample Request Submitted!</h1>
              <p className="lead mb-4">
                {sampleRequest ? 'Your sample request has been received!' : 'Your sample request has been received!'}
              </p>

              {sampleRequest && (
                <div className="card bg-light mb-4 text-start">
                  <div className="card-body">
                    <h5 className="card-title">Request Details</h5>
                    <p><strong>Product:</strong> {sampleRequest.productName}</p>
                    <p><strong>Quantity:</strong> {sampleRequest.quantity}</p>
                    <p><strong>Status:</strong> <span className={statusClass(sampleRequest.status)}>{sampleRequest.status}</span></p>
                    <p><strong>Requested On:</strong> {formatDate(sampleRequest.requestedAt)}</p>
                  </div>
                </div>
              )}

              <p className="text-muted mb-4">
                You will receive a confirmation email shortly. You can track your sample request status using your email address.
              </p>
              <div className="d-grid gap-2 d-md-block">
                <Link to="/samples/track" className="btn btn-primary btn-lg">Track Sample</Link>
                <Link to="/products" className="btn btn-outline-primary btn-lg">Browse More Products</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleRequestSuccess;
