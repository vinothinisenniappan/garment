/**
 * Products Routes
 * Product catalog routes
 */

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductDetails);

module.exports = router;

