const Product = require('../models/product');
const Order = require('../models/order');

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
        product,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.products.productId')
    .execPopulate()
    .then((user) => {
      const products = user.cart.products;
      res.render('shop/cart', {
        title: 'Your Cart',
        path: '/cart',
        products,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => req.user.addToCart(product))
    .then(() => res.redirect('/cart'))
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  req.user
    .deleteProductFromCart(req.body.productId)
    .then(() => res.redirect('/cart'))
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.products.productId')
    .execPopulate()
    .then((user) => {
      const products = user.cart.products.map(
        prod => ({
          product: { ...prod.productId._doc },
          quantity: prod.quantity
        })
      );
      return new Order({
        user: {
          username: req.user.username,
          userId: req.user
        },
        products
      });
    })
    .then(order => order.save())
    .then(() => req.user.clearCart())
    .then(() => res.redirect('/orders'))
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then((orders) => {
      res.render('shop/orders', {
        title: 'Your Orders',
        path: '/orders',
        orders,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};
