/**
 * Products API Controller
 * Returns JSON responses for product endpoints
 */

const Product = require('../../models/Product');

// Get all products (with optional category filter)
exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      products,
      categories: ['T-shirts', 'Gents Wear', 'Ladies Wear', 'Kids Wear']
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Get single product details
exports.getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product details',
      error: error.message
    });
  }
};

// Get featured products for home page
exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.aggregate([
      { $match: { isActive: true } },
      { $sample: { size: 4 } }
    ]);
    
    res.json({
      success: true,
      products: featuredProducts
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.json({
      success: true,
      products: []
    });
  }
};

