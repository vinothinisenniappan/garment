import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { samplesAPI, productsAPI } from '../../services/api';

const SampleRequest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    buyerName: '',
    email: '',
    phone: '',
    companyName: '',
    productId: productId || '',
    quantity: 1,
    size: '',
    color: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetchProducts();
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchProducts = async () => {
    try {
      const response = await samplesAPI.getProducts();
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchProductDetails = async (id) => {
    try {
      const response = await productsAPI.getById(id);
      setSelectedProduct(response.data.product);
      setFormData(prev => ({ ...prev, productId: id }));
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const response = await samplesAPI.submitRequest(formData);
      if (response.data.success) {
        navigate('/samples/success', { state: { sampleRequest: response.data.sampleRequest } });
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([{ msg: error.response?.data?.message || 'Error submitting sample request' }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-4">Request Product Sample</h1>
          <p className="lead mb-4">Fill out the form below to request a sample of our products.</p>

          {errors.length > 0 && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {errors.map((err, index) => (
                  <li key={index}>{err.msg || err}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedProduct && (
            <div className="alert alert-info">
              <strong>Selected Product:</strong> {selectedProduct.name} - {selectedProduct.category}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!productId && (
              <div className="card mb-4">
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Select Product *</label>
                    <select className="form-select" name="productId" value={formData.productId} onChange={handleChange} required>
                      <option value="">Choose a product...</option>
                      {products.map(prod => (
                        <option key={prod._id} value={prod._id}>{prod.name} - {prod.category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="card mb-4">
              <div className="card-header"><h5 className="mb-0">Your Information</h5></div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name *</label>
                    <input type="text" className="form-control" name="buyerName" value={formData.buyerName} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Company Name</label>
                    <input type="text" className="form-control" name="companyName" value={formData.companyName} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header"><h5 className="mb-0">Sample Details</h5></div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Quantity *</label>
                    <input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={handleChange} min="1" required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Size</label>
                    <input type="text" className="form-control" name="size" value={formData.size} onChange={handleChange} placeholder="e.g., M, L, XL" />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Color</label>
                    <input type="text" className="form-control" name="color" value={formData.color} onChange={handleChange} placeholder="e.g., Red, Blue" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header"><h5 className="mb-0">Shipping Address</h5></div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Street Address</label>
                  <input type="text" className="form-control" name="street" value={formData.street} onChange={handleChange} />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City *</label>
                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">State/Province</label>
                    <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Zip/Postal Code</label>
                    <input type="text" className="form-control" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Country *</label>
                    <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} required />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Sample Request'}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/products')}>Browse Products</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SampleRequest;



