/**
 * Products API Routes
 */

const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/api/productsController');

router.get('/featured', productsController.getFeaturedProducts);
router.get('/:id', productsController.getProductDetails);
router.get('/', productsController.getProducts);

module.exports = router;

