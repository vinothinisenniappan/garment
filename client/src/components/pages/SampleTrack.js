import React, { useState } from 'react';
import { samplesAPI } from '../../services/api';

const SampleTrack = () => {
  const [formData, setFormData] = useState({ email: '', trackingNumber: '' });
  const [sampleRequest, setSampleRequest] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSampleRequest(null);
    setLoading(true);

    try {
      const response = await samplesAPI.track(formData);
      if (response.data.success) {
        setSampleRequest(response.data.sampleRequest);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error tracking sample');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'Requested': 'badge-status-requested',
      'In Progress': 'badge-status-in-progress',
      'Dispatched': 'badge-status-dispatched',
      'Delivered': 'badge-status-delivered'
    };
    return statusMap[status] || 'bg-secondary';
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-4">Track Your Sample Request</h1>
          <p className="lead mb-4">Enter your email address or tracking number to check the status of your sample request.</p>

          <form onSubmit={handleSubmit} className="card mb-4">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Enter the email you used for the sample request" />
              </div>
              <div className="mb-3 text-center">
                <strong>OR</strong>
              </div>
              <div className="mb-3">
                <label className="form-label">Tracking Number</label>
                <input type="text" className="form-control" name="trackingNumber" value={formData.trackingNumber} onChange={handleChange} placeholder="Enter your tracking number" />
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
                {loading ? 'Tracking...' : 'Track Sample'}
              </button>
            </div>
          </form>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          {sampleRequest && (
            <div className="card">
              <div className="card-body">
                <h3 className="mb-4">Sample Request Status</h3>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <p><strong>Product:</strong> {sampleRequest.productName}</p>
                    <p><strong>Quantity:</strong> {sampleRequest.quantity}</p>
                    {sampleRequest.size && <p><strong>Size:</strong> {sampleRequest.size}</p>}
                    {sampleRequest.color && <p><strong>Color:</strong> {sampleRequest.color}</p>}
                  </div>
                  <div className="col-md-6">
                    <p><strong>Status:</strong> <span className={`badge ${getStatusBadgeClass(sampleRequest.status)}`}>{sampleRequest.status}</span></p>
                    <p><strong>Requested On:</strong> {new Date(sampleRequest.requestedAt).toLocaleDateString()}</p>
                    {sampleRequest.trackingNumber && (
                      <p><strong>Tracking Number:</strong> <code>{sampleRequest.trackingNumber}</code></p>
                    )}
                    {sampleRequest.dispatchedAt && (
                      <p><strong>Dispatched On:</strong> {new Date(sampleRequest.dispatchedAt).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
                {sampleRequest.shippingAddress && (
                  <div className="mb-4">
                    <h5>Shipping Address</h5>
                    <p className="mb-0">
                      {sampleRequest.shippingAddress.street && <>{sampleRequest.shippingAddress.street}<br /></>}
                      {sampleRequest.shippingAddress.city}, {sampleRequest.shippingAddress.state} {sampleRequest.shippingAddress.zipCode}<br />
                      {sampleRequest.shippingAddress.country}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SampleTrack;



