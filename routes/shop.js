const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getIndex);

router.get('/products', productsController.getProductList);

router.get('/cart', productsController.getCart);

router.get('/checkout', productsController.getCheckout);

module.exports = router;
