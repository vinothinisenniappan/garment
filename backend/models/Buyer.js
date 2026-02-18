/**
 * Buyer Model
 * Stores buyer inquiry and pre-qualification information
 */

const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  contactPerson: {
    type: String,
    required: [true, 'Contact person name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  businessType: {
    type: String,
    trim: true
  },
  requirements: {
    type: String,
    trim: true
  },
  annualVolume: {
    type: String,
    trim: true
  },
  preferredCategories: [{
    type: String,
    enum: ['T-shirts', 'Gents Wear', 'Ladies Wear', 'Kids Wear']
  }],
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Rejected'],
    default: 'New'
  },
  notes: {
    type: String,
    trim: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Buyer', buyerSchema);

