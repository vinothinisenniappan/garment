/**
 * Samples API Routes
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const samplesController = require('../../controllers/api/samplesController');

const sampleRequestValidation = [
  body('buyerName').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('productId').notEmpty().withMessage('Product selection is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('city').trim().notEmpty().withMessage('City is required')
];

router.get('/products', samplesController.getProducts);
router.post('/request', sampleRequestValidation, samplesController.submitSampleRequest);
router.post('/track', samplesController.trackSample);

module.exports = router;
