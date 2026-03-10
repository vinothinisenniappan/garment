/**
 * Inquiry Model (Smart RFQ)
 * Defines the schema for buyer inquiries
 */

const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer',
        required: [true, 'Buyer ID is required']
    },
    fabricType: {
        type: String,
        required: [true, 'Fabric type (GSM) is required'],
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: 1
    },
    designUploads: [{
        type: String, // URLs to uploaded design files (Tech Packs)
        trim: true
    }],
    provisionalLeadTime: {
        type: Number, // in days
        default: function () {
            // Basic logic to calculate lead time based on quantity
            // e.g., Base 14 days + 1 day per 500 units
            const baseDays = 14;
            const additionalDays = Math.ceil(this.quantity / 500);
            return baseDays + additionalDays;
        }
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Converted to Order'],
        default: 'Pending'
    },
    adminNotes: {
        type: String,
        trim: true
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
inquirySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    // Recalculate lead time if quantity changes
    if (this.isModified('quantity')) {
        const baseDays = 14;
        const additionalDays = Math.ceil(this.quantity / 500);
        this.provisionalLeadTime = baseDays + additionalDays;
    }
    next();
});

module.exports = mongoose.model('Inquiry', inquirySchema);
