/**
 * Inquiry Controller
 * Handles buyer inquiry and pre-qualification form submissions
 */

const Buyer = require('../models/Buyer');
const { validationResult } = require('express-validator');

// Render inquiry form
exports.getInquiryForm = (req, res) => {
  res.render('inquiry', {
    title: 'Buyer Inquiry',
    errors: [],
    formData: {}
  });
};

// Submit inquiry form
exports.submitInquiry = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('inquiry', {
        title: 'Buyer Inquiry',
        errors: errors.array(),
        formData: req.body,
        error: 'Please correct the errors below'
      });
    }
    
    const buyerData = {
      companyName: req.body.companyName,
      contactPerson: req.body.contactPerson,
      email: req.body.email,
      phone: req.body.phone,
      country: req.body.country,
      address: req.body.address,
      website: req.body.website,
      businessType: req.body.businessType,
      requirements: req.body.requirements,
      annualVolume: req.body.annualVolume,
      preferredCategories: Array.isArray(req.body.preferredCategories) 
        ? req.body.preferredCategories 
        : req.body.preferredCategories ? [req.body.preferredCategories] : []
    };
    
    const buyer = new Buyer(buyerData);
    await buyer.save();
    
    res.render('inquiry-success', {
      title: 'Inquiry Submitted',
      message: 'Thank you for your inquiry. We will contact you soon!'
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.render('inquiry', {
      title: 'Buyer Inquiry',
      errors: [],
      formData: req.body,
      error: 'Error submitting inquiry. Please try again.'
    });
  }
};

