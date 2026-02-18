/**
 * Sample Request Model
 * Tracks sample requests and their status
 */

const mongoose = require('mongoose');

const sampleRequestSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buyer',
    required: [true, 'Buyer ID is required']
  },
  buyerEmail: {
    type: String,
    required: [true, 'Buyer email is required'],
    trim: true,
    lowercase: true
  },
  buyerName: {
    type: String,
    required: [true, 'Buyer name is required'],
    trim: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 1
  },
  size: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  shippingAddress: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, trim: true }
  },
  status: {
    type: String,
    enum: ['Requested', 'In Progress', 'Dispatched', 'Delivered'],
    default: 'Requested'
  },
  trackingNumber: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  dispatchedAt: {
    type: Date
  }
});

// Update the updatedAt field before saving
sampleRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  if (this.status === 'Dispatched' && !this.dispatchedAt) {
    this.dispatchedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('SampleRequest', sampleRequestSchema);

