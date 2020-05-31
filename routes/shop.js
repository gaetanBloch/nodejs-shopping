const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getIndex);

router.get('/products', productsController.getProducts);

module.exports = router;
