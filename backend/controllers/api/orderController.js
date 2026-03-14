/**
 * Order API Controller for User-Facing Endpoints
 */

const Order = require('../../models/Order');

// Get all orders for the logged-in buyer
exports.getMyOrders = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        const orders = await Order.find({ buyerId: req.session.userId })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            orders
        });
    } catch (error) {
        console.error('Error fetching buyer orders:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching orders'
        });
    }
};

// Get specific order details
exports.getOrderDetails = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        const order = await Order.findOne({
            _id: req.params.id,
            buyerId: req.session.userId
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching order details'
        });
    }
};
