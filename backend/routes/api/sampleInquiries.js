/**
 * Sample Inquiries API Routes
 */

const express = require('express');
const router = express.Router();
const SampleInquiry = require('../../models/SampleInquiry');

const requireUserAuth = (req, res, next) => {
  if (!req.session?.userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};

router.get('/my', requireUserAuth, async (req, res) => {
  try {
    const Buyer = require('../../models/Buyer');
    const buyer = await Buyer.findById(req.session.userId).select('email');

    if (!buyer) {
      return res.status(404).json({ success: false, message: 'Buyer not found' });
    }

    const inquiries = await SampleInquiry.find({ 'buyer.email': buyer.email.toLowerCase() })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (error) {
    console.error('Error fetching user sample inquiries:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', requireUserAuth, async (req, res) => {
  try {
    const newInquiry = new SampleInquiry(req.body);
    const savedInquiry = await newInquiry.save();

    try {
      const { sendSampleInquiryConfirmation, sendAdminNotification } = require('../../utils/mailer');

      await sendSampleInquiryConfirmation(
        savedInquiry.buyer.email,
        savedInquiry.buyer.fullName,
        savedInquiry.inquiryId
      );

      await sendAdminNotification('Sample Request', {
        buyerName: savedInquiry.buyer.fullName,
        productName: savedInquiry.product.category,
        quantity: savedInquiry.product.quantity
      });
    } catch (mailError) {
      console.error('[EMAIL] Failed to send sample inquiry emails:', mailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Sample inquiry submitted successfully',
      inquiry: savedInquiry
    });
  } catch (error) {
    console.error('Error submitting sample inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry',
      error: error.message
    });
  }
});

router.get('/track/:id', requireUserAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const Buyer = require('../../models/Buyer');
    const buyer = await Buyer.findById(req.session.userId).select('email');

    const inquiry = await SampleInquiry.findOne({
      $or: [{ inquiryId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    if (inquiry.buyer?.email?.toLowerCase() !== buyer.email.toLowerCase()) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.status(200).json({ success: true, inquiry });
  } catch (error) {
    console.error('Error fetching tracking details:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
