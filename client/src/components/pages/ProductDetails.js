import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getById(id);
      setProduct(response.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-12">
          <button onClick={() => navigate('/products')} className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left"></i> Back to Products
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          {product.images && product.images.length > 0 ? (
            <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {product.images.map((image, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <img
                      src={image}
                      className="d-block w-100"
                      alt={product.name}
                      style={{ height: '500px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x500?text=No+Image';
                      }}
                    />
                  </div>
                ))}
              </div>
              {product.images.length > 1 && (
                <>
                  <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                  </button>
                </>
              )}
            </div>
          ) : (
            <img
              src="https://via.placeholder.com/600x500?text=No+Image"
              className="img-fluid"
              alt={product.name}
            />
          )}
        </div>
        
        <div className="col-md-6">
          <span className="badge bg-secondary mb-2">{product.category}</span>
          <h1 className="mb-3">{product.name}</h1>
          
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Product Specifications</h5>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td><strong>Fabric Type:</strong></td>
                    <td>{product.fabricType}</td>
                  </tr>
                  <tr>
                    <td><strong>GSM:</strong></td>
                    <td>{product.gsm}</td>
                  </tr>
                  <tr>
                    <td><strong>Size Range:</strong></td>
                    <td>{product.sizeRange}</td>
                  </tr>
                  <tr>
                    <td><strong>Category:</strong></td>
                    <td>{product.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {product.description && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Description</h5>
                <p>{product.description}</p>
              </div>
            </div>
          )}

          <div className="d-grid gap-2">
            <Link to={`/samples/request?productId=${product._id}`} className="btn btn-primary btn-lg">
              <i className="bi bi-box-seam"></i> Request Sample
            </Link>
            <Link to="/inquiry" className="btn btn-outline-primary btn-lg">
              <i className="bi bi-envelope"></i> Submit Inquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

