/**
 * Products Controller
 * Handles product catalog display and filtering
 */

const Product = require('../models/Product');

// Get all products (with optional category filter)
exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    
    res.render('products', {
      title: 'Products',
      products,
      currentCategory: category || 'All',
      categories: ['T-shirts', 'Gents Wear', 'Ladies Wear', 'Kids Wear']
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.render('products', {
      title: 'Products',
      products: [],
      currentCategory: 'All',
      categories: ['T-shirts', 'Gents Wear', 'Ladies Wear', 'Kids Wear'],
      error: 'Error loading products'
    });
  }
};

// Get single product details
exports.getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product || !product.isActive) {
      return res.status(404).render('404', { title: 'Product Not Found' });
    }
    
    res.render('product-details', {
      title: product.name,
      product
    });
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).render('500', { title: 'Server Error', error });
  }
};

