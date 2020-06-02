const Product = require('../models/product');

const postProduct = (redirect, req, res) => {};

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    title: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    product: {}
  });
};

exports.postAddProduct = (req, res, next) => {
  Product.create({
    title: req.body.title,
    price: +req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  })
    .then(() => res.redirect('/products'))
    .catch((err) => console.log(err));
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

exports.postDeleteProduct = (req, res, next) => {
  Product.deleteById(req.body.id);
  res.redirect('/admin/products');
};
