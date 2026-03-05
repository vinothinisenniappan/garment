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
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
buyerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
buyerSchema.methods.comparePassword = async function (candidatePassword) {
  const bcrypt = require('bcryptjs');
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Buyer', buyerSchema);

