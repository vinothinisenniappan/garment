/**
 * Order Model
 * Defines the schema for active manufacturing orders
 */

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: ['Active', 'Completed', 'Cancelled'],
        default: 'Active'
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
    expectedDeliveryDate: {
        type: Date
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
