const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      products,
      title: 'Shop',
      path: '/',
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      products,
      title: 'All Products',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.productId, (product) => {
    res.render('shop/product-detail', {
      title: product.title,
      path: '/products',
      product,
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    title: 'Your Cart',
    path: '/cart',
  });
};

exports.postCart = (req, res, next) => {
  console.log(req.body.productId);
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    title: 'Your Orders',
    path: '/orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    title: 'Checkout',
    path: '/checkout',
  });
};
