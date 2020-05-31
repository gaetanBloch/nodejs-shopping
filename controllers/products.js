const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    title: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      title: 'Index',
      path: '/',
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      products,
      title: 'Product List',
      path: '/products',
    });
  });
};

exports.getCart = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/cart', {
      title: 'Cart',
      path: '/cart',
    });
  });
};
