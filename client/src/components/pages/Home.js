import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../../services/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsAPI.getFeatured();
      setFeaturedProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Image */}
      <div className="container">
        <div className="hero-image" style={{ backgroundImage: 'url(/images/hero.jpg)' }} />
      </div>

      <div className="container">
        {/* Featured Products */}
        <div className="row mb-5">
          <div className="col-12">
            <h2 className="text-center mb-4">Featured Products</h2>
            {loading ? (
              <div className="spinner-container">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="row g-4">
                {featuredProducts.map((product) => (
                  <div key={product._id} className="col-md-6 col-lg-3">
                    <div className="card h-100">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          className="card-img-top"
                          alt={product.name}
                          style={{ height: '250px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x250?text=No+Image';
                          }}
                        />
                      ) : (
                        <img
                          src="https://via.placeholder.com/300x250?text=No+Image"
                          className="card-img-top"
                          alt={product.name}
                          style={{ height: '250px', objectFit: 'cover' }}
                        />
                      )}
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="text-muted mb-2"><strong>Category:</strong> {product.category}</p>
                        <p className="text-muted mb-2"><strong>Fabric:</strong> {product.fabricType}</p>
                        <p className="text-muted mb-3"><strong>GSM:</strong> {product.gsm}</p>
                        <Link to={`/products/${product._id}`} className="btn btn-primary">View Details</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted">No featured products available at the moment.</p>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="row mb-5">
          <div className="col-md-4 text-center mb-4">
            <div className="card h-100">
              <div className="card-body">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
                <h4 className="mt-3">Quality Assurance</h4>
                <p>Rigorous quality control processes ensure premium products for your customers.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="card h-100">
              <div className="card-body">
                <i className="bi bi-globe text-primary" style={{ fontSize: '3rem' }}></i>
                <h4 className="mt-3">Global Export</h4>
                <p>Extensive experience in international trade and shipping worldwide.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="card h-100">
              <div className="card-body">
                <i className="bi bi-people-fill text-info" style={{ fontSize: '3rem' }}></i>
                <h4 className="mt-3">Expert Team</h4>
                <p>Dedicated professionals committed to meeting your requirements.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="row">
          <div className="col-12">
            <div className="card bg-primary text-white text-center">
              <div className="card-body py-5">
                <h3>Ready to Start Your Order?</h3>
                <p className="mb-4">Submit an inquiry or request a sample to get started.</p>
                <Link to="/inquiry" className="btn btn-light btn-lg me-2">Submit Inquiry</Link>
                <Link to="/samples/request" className="btn btn-outline-light btn-lg">Request Sample</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

