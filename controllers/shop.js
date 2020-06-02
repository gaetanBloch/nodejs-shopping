const Product = require('../models/product');
const Cart = require('../models/cart');

const { fetchAllProducts } = require('./utils');

exports.getIndex = (req, res, next) => {
  fetchAllProducts('shop/index', 'Shop', '/', req, res);
};

exports.getProducts = (req, res, next) => {
  fetchAllProducts('shop/product-list', 'All Products', '/products', req, res);
};

exports.getProduct = (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then((product) => {
      res.render('shop/product-detail', {
        title: product.title,
        path: '/products',
        product
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => cart.getProducts())
    .then((products) => {
      res.render('shop/cart', {
        title: 'Your Cart',
        path: '/cart',
        products
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  Product.findById(req.body.productId, (product) => {
    Cart.addProduct(product);
  });
  res.redirect('/cart');
};

exports.postCartDeleteItem = (req, res, next) => {
  Product.findById(req.body.productId, (product) => {
    Cart.deleteProduct(product);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    title: 'Your Orders',
    path: '/orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    title: 'Checkout',
    path: '/checkout'
  });
};
