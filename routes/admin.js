const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

const getValidityHandlers = () => {
  return [
    body('title', 'Title should have at least 3 characters.')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price', 'The Price should be a floating number.')
      .isFloat(),
    body('description', 'The description should be at least 3 characters' +
      ' and 400 at maximum.')
      .isString()
      .isLength({ min: 5, max: 400 })
      .trim()
  ];
}

// GET /admin/add-product
router.get('/add-product', isAuth, adminController.getAddProduct);

// POST /admin/add-product
router.post(
  '/add-product',
  getValidityHandlers(),
  isAuth,
  adminController.postAddProduct
);

// GET /admin/products
router.get('/products', isAuth, adminController.getProducts);

// GET /admin/edit-product/id
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

// POST /admin/edit-product
router.post(
  '/edit-product',
  getValidityHandlers(),
  isAuth,
  adminController.postEditProduct
);

// POST /admin/delete-product
router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
