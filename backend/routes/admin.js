/**
 * Admin Routes
 * Admin dashboard and management routes
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const adminController = require('../controllers/adminController');
const { isAuthenticated } = require('../middleware/auth');

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
router.get('/login', adminController.getLogin);
router.post('/login', loginValidation, adminController.postLogin);
router.get('/logout', isAuthenticated, adminController.logout);

// Dashboard
router.get('/dashboard', isAuthenticated, adminController.getDashboard);

// Product management
router.get('/products', isAuthenticated, adminController.getProducts);
router.get('/products/add', isAuthenticated, adminController.getAddProduct);
router.get('/products/edit/:id', isAuthenticated, adminController.getEditProduct);
router.post('/products/add', isAuthenticated, productValidation, adminController.postAddProduct);
router.post('/products/edit/:id', isAuthenticated, productValidation, adminController.postUpdateProduct);
router.delete('/products/:id', isAuthenticated, adminController.deleteProduct);

// Buyer inquiries
router.get('/buyers', isAuthenticated, adminController.getBuyers);
router.get('/buyers/:id', isAuthenticated, adminController.getBuyerDetails);
router.post('/buyers/:id/status', isAuthenticated, adminController.updateBuyerStatus);

// Sample requests
router.get('/samples', isAuthenticated, adminController.getSamples);
router.post('/samples/:id/status', isAuthenticated, adminController.updateSampleStatus);

module.exports = router;

