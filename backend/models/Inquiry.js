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
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    companyName: {
        type: String,
        trim: true
    },
    contactPerson: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    designUploads: [{
        type: String,
        trim: true
    }],
    inquiryMessage: {
        type: String,
        trim: true
    },
    provisionalLeadTime: {
        type: Number,
        default: function () {
            const qty = this.quantity || 1;
            const baseDays = 14;
            const additionalDays = Math.ceil(qty / 500);
            return baseDays + additionalDays;
        }
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Approved', 'Rejected', 'Confirmed', 'Converted to Order', 'Shipped'],
        default: 'Pending'
    },
    pipelineStage: {
        type: String,
        enum: [
            'Inquiry Received',
            'Admin Accepted',
            'Quotation Sent',
            'Sample Approved',
            'Order Confirmed',
            'Production',
            'Shipment'
        ],
        default: 'Inquiry Received'
    },
    pipelineHistory: [{
        stage: {
            type: String,
            required: true
        },
        notes: {
            type: String,
            trim: true
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }],
    adminNotes: {
        type: String,
        trim: true
    },
    adminRespondedAt: {
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
inquirySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    if (this.isModified('quantity')) {
        const baseDays = 14;
        const additionalDays = Math.ceil(this.quantity / 500);
        this.provisionalLeadTime = baseDays + additionalDays;
    }
    next();
});

module.exports = mongoose.model('Inquiry', inquirySchema);
