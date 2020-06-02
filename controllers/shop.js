const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        products: rows,
        title: 'Shop',
        path: '/'
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('shop/index', {
      products: rows,
      title: 'All Products',
      path: '/products'
    });
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.productId, (product) => {
    res.render('shop/product-detail', {
      title: product.title,
      path: '/products',
      product
    });
  });
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
