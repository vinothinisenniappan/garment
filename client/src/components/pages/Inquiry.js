import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inquiryAPI } from '../../services/api';

const Inquiry = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    website: '',
    businessType: '',
    annualVolume: '',
    preferredCategories: [],
    requirements: ''
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        preferredCategories: checked
          ? [...prev.preferredCategories, value]
          : prev.preferredCategories.filter(cat => cat !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const response = await inquiryAPI.submit(formData);
      if (response.data.success) {
        navigate('/inquiry/success');
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([{ msg: error.response?.data?.message || 'Error submitting inquiry' }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-4">Buyer Inquiry & Pre-qualification</h1>
          <p className="lead mb-4">Please fill out the form below to submit your inquiry. Our team will contact you soon.</p>

          {errors.length > 0 && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {errors.map((err, index) => (
                  <li key={index}>{err.msg || err}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Company Information</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Company Name *</label>
                  <input type="text" className="form-control" name="companyName" value={formData.companyName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact Person *</label>
                  <input type="text" className="form-control" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone *</label>
                    <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Country *</label>
                  <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea className="form-control" name="address" rows="3" value={formData.address} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Website</label>
                  <input type="url" className="form-control" name="website" value={formData.website} onChange={handleChange} placeholder="https://" />
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Business Details</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Business Type</label>
                  <input type="text" className="form-control" name="businessType" value={formData.businessType} onChange={handleChange} placeholder="e.g., Retailer, Wholesaler" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Annual Volume</label>
                  <input type="text" className="form-control" name="annualVolume" value={formData.annualVolume} onChange={handleChange} placeholder="e.g., 10,000 units" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Preferred Categories</label>
                  {['T-shirts', 'Gents Wear', 'Ladies Wear', 'Kids Wear'].map(cat => (
                    <div key={cat} className="form-check">
                      <input className="form-check-input" type="checkbox" name="preferredCategories" value={cat} checked={formData.preferredCategories.includes(cat)} onChange={handleChange} />
                      <label className="form-check-label">{cat}</label>
                    </div>
                  ))}
                </div>
                <div className="mb-3">
                  <label className="form-label">Requirements / Special Requests</label>
                  <textarea className="form-control" name="requirements" rows="4" value={formData.requirements} onChange={handleChange}></textarea>
                </div>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Inquiry'}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;

