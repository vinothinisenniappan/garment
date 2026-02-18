/**
 * Admin API Controller
 * Handles admin authentication and management endpoints
 */

const Admin = require('../../models/Admin');
const Product = require('../../models/Product');
const Buyer = require('../../models/Buyer');
const SampleRequest = require('../../models/SampleRequest');
const { validationResult } = require('express-validator');

// Handle admin login
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }
    
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: username.toLowerCase() });
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
    
    req.session.adminId = admin._id;
    req.session.adminUsername = admin.username;
    
    res.json({
      success: true,
      message: 'Login successful',
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
};

// Handle admin logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error during logout'
      });
    }
    res.json({
      success: true,
      message: 'Logout successful'
    });
  });
};

// Check if user is authenticated
exports.checkAuth = (req, res) => {
  if (req.session && req.session.adminId) {
    res.json({
      success: true,
      authenticated: true,
      admin: {
        id: req.session.adminId,
        username: req.session.adminUsername
      }
    });
  } else {
    res.json({
      success: true,
      authenticated: false
    });
  }
};

// Get dashboard stats
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
    
    res.json({
      success: true,
      stats,
      recentBuyers,
      recentSamples
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading dashboard data',
      error: error.message
    });
  }
};

// Product management
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Error loading products:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading products',
      error: error.message
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
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
    console.error('Error loading product:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading product',
      error: error.message
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
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
    
    res.json({
      success: true,
      message: 'Product added successfully',
      product
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding product',
      error: error.message
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }
    
    // Handle image URLs
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
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    };
    
    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

// Buyer inquiries management
exports.getBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find().sort({ submittedAt: -1 });
    res.json({
      success: true,
      buyers
    });
  } catch (error) {
    console.error('Error loading buyers:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading buyer inquiries',
      error: error.message
    });
  }
};

exports.getBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) {
      return res.status(404).json({
        success: false,
        message: 'Buyer not found'
      });
    }
    
    const sampleRequests = await SampleRequest.find({ buyerId: buyer._id })
      .populate('productId', 'name category')
      .sort({ requestedAt: -1 });
    
    res.json({
      success: true,
      buyer,
      sampleRequests
    });
  } catch (error) {
    console.error('Error loading buyer details:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading buyer details',
      error: error.message
    });
  }
};

exports.updateBuyerStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const buyer = await Buyer.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );
    
    if (!buyer) {
      return res.status(404).json({
        success: false,
        message: 'Buyer not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Buyer status updated successfully',
      buyer
    });
  } catch (error) {
    console.error('Error updating buyer status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating buyer status',
      error: error.message
    });
  }
};

// Sample requests management
exports.getSamples = async (req, res) => {
  try {
    const samples = await SampleRequest.find()
      .populate('productId', 'name category')
      .populate('buyerId', 'companyName email')
      .sort({ requestedAt: -1 });
    
    res.json({
      success: true,
      samples
    });
  } catch (error) {
    console.error('Error loading samples:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading sample requests',
      error: error.message
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
    
    const sampleRequest = await SampleRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!sampleRequest) {
      return res.status(404).json({
        success: false,
        message: 'Sample request not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Sample status updated successfully',
      sampleRequest
    });
  } catch (error) {
    console.error('Error updating sample status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating sample status',
      error: error.message
    });
  }
};
