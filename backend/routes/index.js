/**
 * Index Routes
 * Main navigation routes
 */

const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.getHome);

module.exports = router;

