/**
 * Order Model
 * Defines the schema for active manufacturing orders
 */

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    sourceBuyerInquiryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer'
    },
    inquiryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inquiry',
        required: true
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        name: String,
        size: String,
        quantity: Number,
        priceAtPurchase: Number
    }],
    totalAmount: {
        type: Number,
        default: 0
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
        default: 'Pending'
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    currentMilestone: {
        type: String,
        enum: ['Sourcing', 'Cutting', 'Stitching', 'QC', 'Shipping'],
        default: 'Sourcing'
    },
    milestones: [{
        stage: {
            type: String,
            enum: ['Sourcing', 'Cutting', 'Stitching', 'QC', 'Shipping'],
            required: true
        },
        status: {
            type: String,
            enum: ['Pending', 'In Progress', 'Completed'],
            default: 'Pending'
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        notes: {
            type: String,
            trim: true
        }
    }],
    shippingAddress: {
        name: String,
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
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
orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Order', orderSchema);
