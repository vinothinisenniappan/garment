/**
 * Samples Controller
 * Handles sample requests and tracking
 */

const SampleRequest = require('../models/SampleRequest');
const Product = require('../models/Product');
const Buyer = require('../models/Buyer');
const { validationResult } = require('express-validator');

// Render sample request form
exports.getSampleRequestForm = async (req, res) => {
  try {
    const productId = req.query.productId;
    let product = null;
    
    if (productId) {
      product = await Product.findById(productId);
    }
    
    const products = await Product.find({ isActive: true }).select('name category');
    
    res.render('sample-request', {
      title: 'Request Sample',
      product,
      products,
      errors: [],
      formData: {}
    });
  } catch (error) {
    console.error('Error loading sample request form:', error);
    res.render('sample-request', {
      title: 'Request Sample',
      product: null,
      products: [],
      errors: [],
      formData: {},
      error: 'Error loading form'
    });
  }
};

// Submit sample request
exports.submitSampleRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const products = await Product.find({ isActive: true }).select('name category');
      return res.render('sample-request', {
        title: 'Request Sample',
        product: null,
        products,
        errors: errors.array(),
        formData: req.body,
        error: 'Please correct the errors below'
      });
    }
    
    // Get product details
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).render('404', { title: 'Product Not Found' });
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
    
    res.render('sample-request-success', {
      title: 'Sample Request Submitted',
      sampleRequest,
      message: 'Your sample request has been submitted successfully!'
    });
  } catch (error) {
    console.error('Error submitting sample request:', error);
    const products = await Product.find({ isActive: true }).select('name category');
    res.render('sample-request', {
      title: 'Request Sample',
      product: null,
      products,
      errors: [],
      formData: req.body,
      error: 'Error submitting sample request. Please try again.'
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
      return res.render('sample-track', {
        title: 'Track Sample',
        error: 'Please provide email or tracking number',
        sampleRequest: null
      });
    }
    
    const sampleRequest = await SampleRequest.findOne(query)
      .populate('productId', 'name category images')
      .sort({ requestedAt: -1 });
    
    if (!sampleRequest) {
      return res.render('sample-track', {
        title: 'Track Sample',
        error: 'No sample request found with the provided information',
        sampleRequest: null
      });
    }
    
    res.render('sample-track', {
      title: 'Track Sample',
      sampleRequest,
      error: null
    });
  } catch (error) {
    console.error('Error tracking sample:', error);
    res.render('sample-track', {
      title: 'Track Sample',
      error: 'Error tracking sample. Please try again.',
      sampleRequest: null
    });
  }
};

// Get track sample form
exports.getTrackSampleForm = (req, res) => {
  res.render('sample-track', {
    title: 'Track Sample',
    sampleRequest: null,
    error: null
  });
};

