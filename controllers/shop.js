const Product = require('../models/product');

const { fetchAllProducts } = require('./utils');

exports.getIndex = (req, res, next) => {
  fetchAllProducts('shop/index', 'Shop', '/', req, res);
};

exports.getProducts = (req, res, next) => {
  fetchAllProducts('shop/product-list', 'All Products', '/products', req, res);
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      res.render('shop/product-detail', {
        title: product.title,
        path: '/products',
        product
      });
    })
    .catch((err) => console.log(err));
};

// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((products) => {
//       res.render('shop/cart', {
//         title: 'Your Cart',
//         path: '/cart',
//         products
//       });
//     })
//     .catch((err) => console.log(err));
// };

exports.postCart = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => req.user.addToCart(product))
    .then(() => res.redirect('/cart'))
    .catch((err) => console.log(err));
};

// exports.postCartDeleteProduct = (req, res, next) => {
//   req.user
//     .deleteProductFromCart(req.body.productId)
//     .then(() => res.redirect('/cart'))
//     .catch((err) => console.log(err));
// };

// exports.postOrder = (req, res, next) => {
//   req.user
//     .addOrder()
//     .then(() => res.redirect('/orders'))
//     .catch((err) => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders()
//     .then((orders) => {
//       res.render('shop/orders', {
//         title: 'Your Orders',
//         path: '/orders',
//         orders
//       });
//     })
//     .catch((err) => console.log(err));
// };
