/**
 * Inquiry API Routes
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const inquiryController = require('../../controllers/api/inquiryController');

const inquiryValidation = [
  body('companyName').trim().notEmpty().withMessage('Company name is required'),
  body('contactPerson').trim().notEmpty().withMessage('Contact person name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('country').trim().notEmpty().withMessage('Country is required')
];

router.post('/', inquiryValidation, inquiryController.submitInquiry);

module.exports = router;

