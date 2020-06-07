const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /admin/add-product
router.get('/add-product', isAuth, adminController.getAddProduct);

// POST /admin/add-product
router.post(
  '/add-product',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description').isString().isLength({ min: 5, max: 400 }).trim()
  ],
  isAuth,
  adminController.postAddProduct
);

// GET /admin/products
router.get('/products', isAuth, adminController.getProducts);

// GET /admin/edit-product/id
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

// POST /admin/edit-product
router.post('/edit-product', isAuth, adminController.postEditProduct);

// POST /admin/delete-product
router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
