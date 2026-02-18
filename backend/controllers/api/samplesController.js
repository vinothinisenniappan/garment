/**
 * Samples API Controller
 * Handles sample requests and tracking
 */

const SampleRequest = require('../../models/SampleRequest');
const Product = require('../../models/Product');
const Buyer = require('../../models/Buyer');
const { validationResult } = require('express-validator');

// Get all products for sample request form
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).select('name category');
    res.json({
      success: true,
      products
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

// Submit sample request
exports.submitSampleRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }
    
    // Get product details
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Check if buyer exists, if not create one
    let buyer = await Buyer.findOne({ email: req.body.email });
    if (!buyer) {
      buyer = new Buyer({
        companyName: req.body.companyName || 'Individual',
        contactPerson: req.body.buyerName,
        email: req.body.email,
        phone: req.body.phone || '',
        country: req.body.country || ''
      });
      await buyer.save();
    }
    
    const sampleData = {
      buyerId: buyer._id,
      buyerEmail: req.body.email,
      buyerName: req.body.buyerName,
      productId: product._id,
      productName: product.name,
      quantity: parseInt(req.body.quantity),
      size: req.body.size,
      color: req.body.color,
      shippingAddress: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        country: req.body.country
      }
    };
    
    const sampleRequest = new SampleRequest(sampleData);
    await sampleRequest.save();
    
    res.json({
      success: true,
      message: 'Sample request submitted successfully',
      sampleRequest
    });
  } catch (error) {
    console.error('Error submitting sample request:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting sample request',
      error: error.message
    });
  }
};

// Track sample status
exports.trackSample = async (req, res) => {
  try {
    const { email, trackingNumber } = req.body;
    
    let query = {};
    if (trackingNumber) {
      query.trackingNumber = trackingNumber;
    } else if (email) {
      query.buyerEmail = email.toLowerCase();
    } else {
      return res.status(400).json({
        success: false,
        message: 'Please provide email or tracking number'
      });
    }
    
    const sampleRequest = await SampleRequest.findOne(query)
      .populate('productId', 'name category images')
      .sort({ requestedAt: -1 });
    
    if (!sampleRequest) {
      return res.status(404).json({
        success: false,
        message: 'No sample request found with the provided information'
      });
    }
    
    res.json({
      success: true,
      sampleRequest
    });
  } catch (error) {
    console.error('Error tracking sample:', error);
    res.status(500).json({
      success: false,
      message: 'Error tracking sample',
      error: error.message
    });
  }
};
