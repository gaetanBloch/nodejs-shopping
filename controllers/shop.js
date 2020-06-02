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
  // Product.findAll({ where: { id: req.params.productId } })
  //   .then((products) => {
  //     res.render('shop/product-detail', {
  //       title: products[0].title,
  //       path: '/products',
  //       product: products[0]
  //     });
  //   })
  //   .catch((err) => console.log(err));
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
  Cart.getCart((cart) => {
    if (cart) {
      const cartProducts = [];
      Product.fetchAll((products) => {
        for (const product of products) {
          const cartProduct = cart.products.find((prod) => {
            return prod.id === product.id;
          });
          if (cartProduct) {
            cartProducts.push({ ...product, quantity: cartProduct.quantity });
          }
        }

        res.render('shop/cart', {
          title: 'Your Cart',
          path: '/cart',
          products: cartProducts
        });
      });
    }
  });
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
