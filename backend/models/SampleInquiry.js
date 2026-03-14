const mongoose = require('mongoose');

const SampleInquirySchema = new mongoose.Schema({
  inquiryId: { type: String, unique: true },
  
  // 1. Buyer / Company Information
  buyer: {
    fullName: { type: String, required: true },
    companyName: { type: String, required: true },
    businessType: { type: String }, // Retailer, Wholesaler, etc.
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    website: { type: String }
  },

  // 2. Product Details
  product: {
    category: { type: String, required: true }, // T-Shirt, Hoodie, etc.
    type: { type: String }, // Men, Women, Kids, Unisex
    quantity: { type: Number, required: true },
    targetPrice: { type: Number }
  },

  // 3. Fabric Requirements
  fabric: {
    type: { type: String }, // Cotton, Polyester, etc.
    gsm: { type: String },
    composition: { type: String }, // e.g. 100% Cotton
    finish: { type: String } // Washed, Enzyme Washed, etc.
  },

  // 4. Design & Customization
  design: {
    uploadUrls: [{ type: String }], // URLs or base64 encoded strings
    logoPlacement: { type: String },
    printType: { type: String }, // Screen Printing, etc.
    embroideryRequired: { type: Boolean, default: false },
    pantoneColor: { type: String }
  },

  // 5. Size Details
  size: {
    type: { type: String }, // Standard Size Chart, Custom Size Chart
    requiredSizes: [{ type: String }], // XS, S, M, L, XL, XXL
    sizeChartUrl: { type: String }
  },

  // 6. Branding Requirements
  branding: {
    customBrandLabel: { type: Boolean, default: false },
    neckLabel: { type: Boolean, default: false },
    washCareLabel: { type: Boolean, default: false },
    hangTag: { type: Boolean, default: false },
    packaging: { type: String } // Polybag, Box Packaging, Eco Packaging
  },

  // 7. Sampling Details
  sampling: {
    type: { type: String }, // Prototype Sample, Fit Sample, Pre-production Sample
    deadline: { type: Date },
    budget: { type: Number }
  },

  // 8. Bulk Order Information
  bulkOrder: {
    expectedQuantity: { type: Number },
    frequency: { type: String }, // One time, Monthly, Seasonal
    targetPrice: { type: Number }
  },

  // 9. Shipping Details
  shipping: {
    address: { type: String },
    country: { type: String },
    postalCode: { type: String },
    preferredCourier: { type: String }, // DHL, FedEx, UPS
    payment: { type: String } // Buyer Pays, Supplier Pays
  },

  // 10. Additional Notes
  notes: {
    specialInstructions: { type: String },
    referenceWebsite: { type: String },
    competitorLink: { type: String }
  },

  // 11. Agreement / Confirmation
  agreements: {
    acceptSampleCharges: { type: Boolean, required: true },
    acceptShippingCharges: { type: Boolean, required: true },
    agreeToTerms: { type: Boolean, required: true }
  },
  
  // Extra File Uploads (Tech pack, reference images)
  files: {
    techPackUrl: { type: String },
    referenceImagesUrls: [{ type: String }]
  },

  // 13. Admin Dashboard Fields
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Sample in Development', 'Shipped'],
    default: 'Pending'
  }

}, { timestamps: true });

// Pre-save hook to generate Inquiry ID
SampleInquirySchema.pre('save', async function (next) {
  if (this.isNew) {
    const currentYear = new Date().getFullYear();
    try {
      // Find the count of documents from the current year to sequence
      const count = await this.constructor.countDocuments({
        createdAt: {
          $gte: new Date(`${currentYear}-01-01`),
          $lt: new Date(`${currentYear + 1}-01-01`)
        }
      });
      const sequence = (count + 1).toString().padStart(4, '0');
      this.inquiryId = `SMP-${currentYear}-${sequence}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model('SampleInquiry', SampleInquirySchema);
