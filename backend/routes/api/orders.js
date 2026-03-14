/**
 * Order API Routes for Buyers
 */

const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/api/orderController');

// All routes require authentication
const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
};

router.get('/my-orders', authMiddleware, orderController.getMyOrders);
router.get('/details/:id', authMiddleware, orderController.getOrderDetails);

module.exports = router;
