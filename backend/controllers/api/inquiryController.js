/**
 * Inquiry API Controller
 * Handles buyer inquiry submissions
 */

const Buyer = require('../../models/Buyer');
const { validationResult } = require('express-validator');

// Submit inquiry form
exports.submitInquiry = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
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

    // Emit real-time update
    const io = req.app.get('socketio');
    if (io) {
      io.emit('new-inquiry', {
        id: buyer._id,
        contactPerson: buyer.contactPerson,
        email: buyer.email,
        submittedAt: buyer.submittedAt
      });
    }

    res.json({
      success: true,
      message: 'Inquiry submitted successfully',
      buyerId: buyer._id
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting inquiry',
      error: error.message
    });
  }
};
