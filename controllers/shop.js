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
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: req.body.productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let quantity = 1;
      if (product) {
        // TODO Add the quantity
      }
      return Product.findByPk(req.body.productId)
        .then((prod) => {
          fetchedCart.addProduct(prod, { through: { quantity } });
        })
        .catch((err) => console.log(err));
    })
    .then(() => res.redirect('/cart'))
    .catch((err) => console.log(err));
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
