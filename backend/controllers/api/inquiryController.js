/**
 * Inquiry API Controller
 * Handles buyer inquiry submissions
 */

const Buyer = require('../../models/Buyer');
const { validationResult } = require('express-validator');
const { sendInquiryConfirmation, sendAdminNotification } = require('../../utils/mailer');
const crypto = require('crypto');

// Submit inquiry form
exports.submitInquiry = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const preferredCategories = Array.isArray(req.body.preferredCategories)
      ? req.body.preferredCategories
      : req.body.preferredCategories ? [req.body.preferredCategories] : [];

    let buyer = null;

    if (req.session?.userId) {
      buyer = await Buyer.findById(req.session.userId);
      if (!buyer) {
        return res.status(401).json({
          success: false,
          message: 'Authenticated buyer not found'
        });
      }
    } else {
      const email = (req.body.email || '').toLowerCase();
      buyer = await Buyer.findOne({ email });
      if (!buyer) {
        buyer = new Buyer({
          companyName: req.body.companyName,
          contactPerson: req.body.contactPerson,
          email,
          phone: req.body.phone,
          country: req.body.country,
          address: req.body.address,
          website: req.body.website,
          businessType: req.body.businessType,
          requirements: req.body.requirements,
          annualVolume: req.body.annualVolume,
          preferredCategories,
          // Inquiry submissions don't have a password; generate a secure temporary one
          password: crypto.randomBytes(16).toString('hex')
        });
      }
    }

    // Keep buyer profile aligned with latest submitted details.
    buyer.companyName = req.body.companyName || buyer.companyName;
    buyer.contactPerson = req.body.contactPerson || buyer.contactPerson;
    buyer.email = (req.body.email || buyer.email || '').toLowerCase();
    buyer.phone = req.body.phone || buyer.phone;
    buyer.country = req.body.country || buyer.country;
    buyer.address = req.body.address || buyer.address;
    buyer.website = req.body.website || buyer.website;
    buyer.businessType = req.body.businessType || buyer.businessType;
    buyer.requirements = req.body.requirements || buyer.requirements;
    buyer.annualVolume = req.body.annualVolume || buyer.annualVolume;
    buyer.preferredCategories = preferredCategories.length ? preferredCategories : buyer.preferredCategories;
    await buyer.save();

    const Inquiry = require('../../models/Inquiry');
    const quantity = parseInt(req.body.quantity, 10) || parseInt(req.body.annualVolume, 10) || 1000;

    const inquiryData = {
      buyerId: buyer._id,
      quantity,
      fabricType: req.body.fabricType || 'Standard Fabric',
      inquiryMessage: req.body.requirements,
      companyName: buyer.companyName,
      contactPerson: buyer.contactPerson,
      email: buyer.email,
      phone: buyer.phone,
      status: 'Pending'
    };

    if (req.body.productId) {
      inquiryData.productId = req.body.productId;
    }

    const savedInquiry = new Inquiry(inquiryData);
    await savedInquiry.save();

    // Emit real-time update
    const io = req.app.get('socketio');
    if (io) {
      io.emit('new-inquiry', {
        id: savedInquiry?._id || buyer._id,
        message: `${buyer.contactPerson} submitted a new inquiry.`,
        buyerName: buyer.contactPerson,
        companyName: buyer.companyName,
        contactPerson: buyer.contactPerson,
        email: buyer.email,
        inquiryId: savedInquiry?._id,
        submittedAt: buyer.submittedAt
      });
    }

    let emailNotification = { success: false, skipped: true };
    try {
      // Send confirmation to buyer
      await sendInquiryConfirmation(buyer.email, buyer.contactPerson);
      
      // Send notification to admin
      const mailResult = await sendAdminNotification('Inquiry', {
        buyerName: buyer.contactPerson,
        companyName: buyer.companyName,
        buyerEmail: buyer.email,
        country: buyer.country
      });

      emailNotification = {
        success: !mailResult.skipped,
        skipped: mailResult.skipped,
        reason: mailResult.reason,
        accepted: mailResult.accepted,
        rejected: mailResult.rejected,
        messageId: mailResult.messageId
      };

      if (!mailResult.skipped) {
        console.log(`Inquiry email notification sent. Message ID: ${mailResult.messageId}`);
      }
    } catch (mailError) {
      emailNotification = {
        success: false,
        skipped: false,
        error: mailError.message
      };
      console.error('Inquiry email notification failed:', mailError.message);
    }

    res.json({
      success: true,
      message: 'Inquiry submitted successfully',
      buyerId: buyer._id,
      emailNotification
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting inquiry',
      error: error.message
    });
  }
};
