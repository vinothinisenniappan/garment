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
    enum: ['T-shirts', 'Shirts', 'Pyjamas', 'Kidswear', 'Shorts'],
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
  price: {
    type: Number,
    required: [true, 'Price is required'],
    default: 0
  },
  stockQuantity: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    default: 0
  },
  inventory: {
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 },
    XXL: { type: Number, default: 0 }
  },
  exportClient: {
    type: String,
    trim: true,
    default: null
  },
  exportDestination: {
    type: String,
    trim: true,
    default: null
  },
  colors: [{
    type: String,
    trim: true
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
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

// Middleware to calculate total stock quantity from inventory map
productSchema.pre('save', function (next) {
  if (this.isModified('inventory')) {
    this.stockQuantity = (this.inventory.S || 0) + (this.inventory.M || 0) + (this.inventory.L || 0) + (this.inventory.XL || 0) + (this.inventory.XXL || 0);
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);

