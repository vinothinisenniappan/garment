import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productsAPI } from '../../services/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories] = useState(['T-shirts', 'Gents Wear', 'Ladies Wear', 'Kids Wear']);
  const [currentCategory, setCurrentCategory] = useState(searchParams.get('category') || 'All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [currentCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const category = currentCategory === 'All' ? null : currentCategory;
      const response = await productsAPI.getAll(category);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="mb-4">Product Catalog</h1>
          
          {/* Category Filter */}
          <div className="card mb-4">
            <div className="card-body">
              <strong className="me-3">Filter by Category:</strong>
              <button
                className={`btn btn-sm ${currentCategory === 'All' ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                onClick={() => handleCategoryChange('All')}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`btn btn-sm ${currentCategory === cat ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : products.length > 0 ? (
        <div className="row g-4">
          {products.map((product) => (
            <div key={product._id} className="col-md-6 col-lg-4">
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
                  <span className="badge bg-secondary mb-2">{product.category}</span>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="text-muted mb-2"><strong>Fabric Type:</strong> {product.fabricType}</p>
                  <p className="text-muted mb-2"><strong>GSM:</strong> {product.gsm}</p>
                  <p className="text-muted mb-3"><strong>Size Range:</strong> {product.sizeRange}</p>
                  {product.description && (
                    <p className="card-text">
                      {product.description.substring(0, 100)}
                      {product.description.length > 100 && '...'}
                    </p>
                  )}
                  <div className="mt-3">
                    <Link to={`/products/${product._id}`} className="btn btn-primary me-2">View Details</Link>
                    <Link to={`/samples/request?productId=${product._id}`} className="btn btn-outline-primary">Request Sample</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">
          <h5>No products found</h5>
          <p>There are no products available in this category at the moment. Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default Products;

