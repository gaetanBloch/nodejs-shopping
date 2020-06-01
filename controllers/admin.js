const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    title: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    product: {}
  });
};

exports.postAddProduct = (req, res, next) => {
  postProduct(null, '/products', req, res);
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      products,
      title: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  Product.findById(req.params.productId, (product) => {
    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      title: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  postProduct(req.body.id, '/admin/products', req, res);
};

const postProduct = (id, redirect, req, res) => {
  const product = new Product(
    id,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    +req.body.price
  );
  product.save();
  res.redirect(redirect);
};
