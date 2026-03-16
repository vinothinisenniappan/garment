/**
 * Inquiry API Routes
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const inquiryController = require('../../controllers/api/inquiryController');
const Inquiry = require('../../models/Inquiry');

const inquiryValidation = [
  body('companyName').trim().notEmpty().withMessage('Company name is required'),
  body('contactPerson').trim().notEmpty().withMessage('Contact person name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('country').trim().notEmpty().withMessage('Country is required')
];

router.post('/', inquiryValidation, inquiryController.submitInquiry);

// Simple tracking endpoint so buyers can see the latest status / pipeline
router.get('/track/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id)
      .populate('productId', 'name category fabricType sizeRange');

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      inquiry
    });
  } catch (error) {
    console.error('Error fetching inquiry tracking details:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiry tracking details'
    });
  }
});

module.exports = router;
