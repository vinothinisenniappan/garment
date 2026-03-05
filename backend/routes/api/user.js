/**
 * User API Routes
 * Handles buyer registration and login
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../../controllers/api/userController');

const registerValidation = [
    body('companyName').trim().notEmpty().withMessage('Company name is required'),
    body('contactPerson').trim().notEmpty().withMessage('Contact person is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('country').trim().notEmpty().withMessage('Country is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
];

router.post('/register', registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);
router.get('/profile', userController.getProfile);
router.post('/logout', userController.logout);

module.exports = router;
