const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// GET /admin/add-product
router.get('/add-product', productsController.getAddProduct);

// POST /admin/add-product
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
