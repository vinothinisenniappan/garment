/**
 * User API Controller
 * Handles buyer registration, login, and profile
 */

const Buyer = require('../../models/Buyer');
const { validationResult } = require('express-validator');

// Register a new buyer
exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors.array()
            });
        }

        const { companyName, contactPerson, email, phone, country, password } = req.body;

        // Check if user already exists
        let buyer = await Buyer.findOne({ email: email.toLowerCase() });
        if (buyer) {
            return res.status(400).json({
                success: false,
                message: 'A user with this email already exists'
            });
        }

        buyer = new Buyer({
            companyName,
            contactPerson,
            email: email.toLowerCase(),
            phone,
            country,
            password,
            status: 'New'
        });

        await buyer.save();

        // Set session
        req.session.userId = buyer._id;
        req.session.userRole = 'buyer';

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: {
                id: buyer._id,
                contactPerson: buyer.contactPerson,
                email: buyer.email,
                companyName: buyer.companyName
            }
        });
    } catch (error) {
        console.error('Error in user registration:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
};

// Login buyer
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const buyer = await Buyer.findOne({ email: email.toLowerCase() });
        if (!buyer) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await buyer.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Set session
        req.session.userId = buyer._id;
        req.session.userRole = 'buyer';

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: buyer._id,
                contactPerson: buyer.contactPerson,
                email: buyer.email,
                companyName: buyer.companyName
            }
        });
    } catch (error) {
        console.error('Error in user login:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
};

// Get current user profile
exports.getProfile = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        const buyer = await Buyer.findById(req.session.userId).select('-password');
        if (!buyer) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: buyer
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching profile'
        });
    }
};

// Logout user
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Could not log out'
            });
        }
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    });
};
