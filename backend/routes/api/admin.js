/**
 * Admin API Routes
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const adminController = require('../../controllers/api/adminController');
const { isAuthenticated } = require('../../middleware/auth');

const loginValidation = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const productValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('category').isIn(['T-shirts', 'Gents Wear', 'Ladies Wear', 'Kids Wear']).withMessage('Valid category is required'),
  body('fabricType').trim().notEmpty().withMessage('Fabric type is required'),
  body('gsm').trim().notEmpty().withMessage('GSM is required'),
  body('sizeRange').trim().notEmpty().withMessage('Size range is required')
];

// Authentication routes
router.post('/login', loginValidation, adminController.login);
router.post('/logout', isAuthenticated, adminController.logout);
router.get('/check-auth', adminController.checkAuth);

// Dashboard
router.get('/dashboard', isAuthenticated, adminController.getDashboard);

// Product management
router.get('/products', isAuthenticated, adminController.getProducts);
router.get('/products/:id', isAuthenticated, adminController.getProduct);
router.post('/products', isAuthenticated, productValidation, adminController.addProduct);
router.put('/products/:id', isAuthenticated, productValidation, adminController.updateProduct);
router.delete('/products/:id', isAuthenticated, adminController.deleteProduct);

// Buyer inquiries
router.get('/buyers', isAuthenticated, adminController.getBuyers);
router.get('/buyers/:id', isAuthenticated, adminController.getBuyer);
router.put('/buyers/:id/status', isAuthenticated, adminController.updateBuyerStatus);

// Sample requests
router.get('/samples', isAuthenticated, adminController.getSamples);
router.put('/samples/:id/status', isAuthenticated, adminController.updateSampleStatus);

module.exports = router;
