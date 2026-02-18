/**
 * Product Model
 * Defines the schema for garment products in the catalog
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['T-shirts', 'Gents Wear', 'Ladies Wear', 'Kids Wear'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  fabricType: {
    type: String,
    required: [true, 'Fabric type is required'],
    trim: true
  },
  gsm: {
    type: String,
    required: [true, 'GSM is required'],
    trim: true
  },
  sizeRange: {
    type: String,
    required: [true, 'Size range is required'],
    trim: true
  },
  images: [{
    type: String, // URLs to image files
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);

