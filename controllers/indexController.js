/**
 * Index Controller
 * Handles home page and main navigation
 */

const Product = require('../models/Product');

// Render home page
exports.getHome = async (req, res) => {
  try {
    // Get featured products from each category
    const featuredProducts = await Product.aggregate([
      { $match: { isActive: true } },
      { $sample: { size: 4 } }
    ]);
    
    res.render('index', {
      title: 'Home',
      featuredProducts,
      user: req.session.adminId ? { isAdmin: true } : null
    });
  } catch (error) {
    console.error('Error fetching home page data:', error);
    res.render('index', {
      title: 'Home',
      featuredProducts: [],
      user: req.session.adminId ? { isAdmin: true } : null
    });
  }
};

