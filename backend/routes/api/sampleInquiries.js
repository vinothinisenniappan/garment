/**
 * Sample Inquiries API Routes
 */

const express = require('express');
const router = express.Router();
const SampleInquiry = require('../../models/SampleInquiry');

// CREATE a new Sample Inquiry (Buyer)
router.post('/', async (req, res) => {
  try {
    const newInquiry = new SampleInquiry(req.body);
    const savedInquiry = await newInquiry.save();
    
    // TODO: Send Email Notification to Admin (dummy log for now)
    console.log(`[EMAIL] New Sample Inquiry received: ${savedInquiry.inquiryId} from ${savedInquiry.buyer.fullName} (${savedInquiry.buyer.email})`);

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

// GET all Sample Inquiries (Admin)
router.get('/', async (req, res) => {
  try {
    const inquiries = await SampleInquiry.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET a Sample Inquiry by ID for Tracking (Buyer/Admin)
router.get('/track/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Search by auto-generated inquiryId or _id
    const inquiry = await SampleInquiry.findOne({
      $or: [{ inquiryId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      inquiry
    });
  } catch (error) {
    console.error('Error fetching tracking details:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// UPDATE a Sample Inquiry Status or Details (Admin)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const inquiry = await SampleInquiry.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Optional: emit socket event to connected admin/buyer clients
    const io = req.app.get('socketio');
    if (io) {
      io.emit('inquiry-updated', { id, status: inquiry.status });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully',
      inquiry
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update inquiry'
    });
  }
});

// DELETE a Sample Inquiry (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInquiry = await SampleInquiry.findByIdAndDelete(id);

    if (!deletedInquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete inquiry'
    });
  }
});

module.exports = router;
