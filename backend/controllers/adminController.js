/**
 * Admin Controller
 * Handles admin dashboard, authentication, and management functions
 */

const Admin = require('../models/Admin');
const Product = require('../models/Product');
const Buyer = require('../models/Buyer');
const SampleRequest = require('../models/SampleRequest');
const { validationResult } = require('express-validator');

// Render admin login page
exports.getLogin = (req, res) => {
  if (req.session && req.session.adminId) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', {
    title: 'Admin Login',
    error: req.session.loginError || null
  });
  req.session.loginError = null;
};

// Handle admin login
exports.postLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('admin/login', {
        title: 'Admin Login',
        error: 'Please provide valid credentials',
        errors: errors.array()
      });
    }
    
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: username.toLowerCase() });
    
    if (!admin) {
      return res.render('admin/login', {
        title: 'Admin Login',
        error: 'Invalid username or password'
      });
    }
    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.render('admin/login', {
        title: 'Admin Login',
        error: 'Invalid username or password'
      });
    }
    
    req.session.adminId = admin._id;
    req.session.adminUsername = admin.username;
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.render('admin/login', {
      title: 'Admin Login',
      error: 'Error during login. Please try again.'
    });
  }
};

// Handle admin logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/admin/login');
  });
};

// Render admin dashboard
exports.getDashboard = async (req, res) => {
  try {
    const stats = {
      totalProducts: await Product.countDocuments({ isActive: true }),
      totalBuyers: await Buyer.countDocuments(),
      totalSamples: await SampleRequest.countDocuments(),
      pendingSamples: await SampleRequest.countDocuments({ status: 'Requested' }),
      newInquiries: await Buyer.countDocuments({ status: 'New' })
    };
    
    const recentBuyers = await Buyer.find().sort({ submittedAt: -1 }).limit(5);
    const recentSamples = await SampleRequest.find()
      .populate('productId', 'name')
      .sort({ requestedAt: -1 })
      .limit(5);
    
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      stats,
      recentBuyers,
      recentSamples
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      stats: {},
      recentBuyers: [],
      recentSamples: [],
      error: 'Error loading dashboard data'
    });
  }
};

// Product management
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('admin/products', {
      title: 'Manage Products',
      products
    });
  } catch (error) {
    console.error('Error loading products:', error);
    res.render('admin/products', {
      title: 'Manage Products',
      products: [],
      error: 'Error loading products'
    });
  }
};

exports.getAddProduct = (req, res) => {
  res.render('admin/product-form', {
    title: 'Add Product',
    product: null,
    errors: []
  });
};

exports.getEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render('404', { title: 'Product Not Found' });
    }
    res.render('admin/product-form', {
      title: 'Edit Product',
      product,
      errors: []
    });
  } catch (error) {
    console.error('Error loading product:', error);
    res.redirect('/admin/products');
  }
};

exports.postAddProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('admin/product-form', {
        title: 'Add Product',
        product: null,
        errors: errors.array(),
        formData: req.body
      });
    }
    
    // Handle image URLs - split by newline if it's a string
    let images = [];
    if (req.body.images) {
      if (typeof req.body.images === 'string') {
        images = req.body.images.split('\n').map(img => img.trim()).filter(img => img.length > 0);
      } else if (Array.isArray(req.body.images)) {
        images = req.body.images.filter(img => img.trim());
      }
    }
    
    const productData = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      fabricType: req.body.fabricType,
      gsm: req.body.gsm,
      sizeRange: req.body.sizeRange,
      images: images
    };
    
    const product = new Product(productData);
    await product.save();
    
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Error adding product:', error);
    res.render('admin/product-form', {
      title: 'Add Product',
      product: null,
      errors: [],
      formData: req.body,
      error: 'Error adding product. Please try again.'
    });
  }
};

exports.postUpdateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const product = await Product.findById(req.params.id);
      return res.render('admin/product-form', {
        title: 'Edit Product',
        product,
        errors: errors.array(),
        formData: req.body
      });
    }
    
    // Handle image URLs - split by newline if it's a string
    let images = [];
    if (req.body.images) {
      if (typeof req.body.images === 'string') {
        images = req.body.images.split('\n').map(img => img.trim()).filter(img => img.length > 0);
      } else if (Array.isArray(req.body.images)) {
        images = req.body.images.filter(img => img.trim());
      }
    }
    
    const productData = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      fabricType: req.body.fabricType,
      gsm: req.body.gsm,
      sizeRange: req.body.sizeRange,
      images: images,
      isActive: req.body.isActive === 'on' || req.body.isActive === true
    };
    
    await Product.findByIdAndUpdate(req.params.id, productData);
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Error updating product:', error);
    res.redirect('/admin/products');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.json({ success: false, error: 'Error deleting product' });
  }
};

// Buyer inquiries management
exports.getBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find().sort({ submittedAt: -1 });
    res.render('admin/buyers', {
      title: 'Buyer Inquiries',
      buyers
    });
  } catch (error) {
    console.error('Error loading buyers:', error);
    res.render('admin/buyers', {
      title: 'Buyer Inquiries',
      buyers: [],
      error: 'Error loading buyer inquiries'
    });
  }
};

exports.getBuyerDetails = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) {
      return res.status(404).render('404', { title: 'Buyer Not Found' });
    }
    
    const sampleRequests = await SampleRequest.find({ buyerId: buyer._id })
      .populate('productId', 'name category')
      .sort({ requestedAt: -1 });
    
    res.render('admin/buyer-details', {
      title: 'Buyer Details',
      buyer,
      sampleRequests
    });
  } catch (error) {
    console.error('Error loading buyer details:', error);
    res.redirect('/admin/buyers');
  }
};

exports.updateBuyerStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    await Buyer.findByIdAndUpdate(req.params.id, { status, notes });
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating buyer status:', error);
    res.json({ success: false, error: 'Error updating buyer status' });
  }
};

// Sample requests management
exports.getSamples = async (req, res) => {
  try {
    const samples = await SampleRequest.find()
      .populate('productId', 'name category')
      .populate('buyerId', 'companyName email')
      .sort({ requestedAt: -1 });
    
    res.render('admin/samples', {
      title: 'Sample Requests',
      samples
    });
  } catch (error) {
    console.error('Error loading samples:', error);
    res.render('admin/samples', {
      title: 'Sample Requests',
      samples: [],
      error: 'Error loading sample requests'
    });
  }
};

exports.updateSampleStatus = async (req, res) => {
  try {
    const { status, trackingNumber, notes } = req.body;
    const updateData = { status, notes };
    
    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }
    
    if (status === 'Dispatched') {
      updateData.dispatchedAt = Date.now();
    }
    
    await SampleRequest.findByIdAndUpdate(req.params.id, updateData);
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating sample status:', error);
    res.json({ success: false, error: 'Error updating sample status' });
  }
};

