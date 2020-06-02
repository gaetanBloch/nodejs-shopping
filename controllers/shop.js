const Product = require('../models/product');
const Cart = require('../models/cart');

const fetchAll = (file, title, path, res) => {
  Product.findAll()
    .then((products) => {
      res.render(file, {
        products,
        title: title,
        path
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  fetchAll('shop/index', 'Shop', '/', res);
};

exports.getProducts = (req, res, next) => {
  fetchAll('shop/product-list', 'All Products', '/products', res);
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.productId)
  .then(([product]) => {
    res.render('shop/product-detail', {
      title: product[0].title,
      path: '/products',
      product: product[0]
    });
  }).catch((err) => console.log(err));;
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
