const Product = require('../models/product');

const { fetchAllProducts } = require('./utils');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    title: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    product: {}
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    price: +req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    userId: req.user
  });
  product
    .save()
    .then(() => res.redirect('/products'))
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  fetchAllProducts(
    'admin/products',
    'Admin Products',
    '/admin/products',
    req,
    res,
    { userId: req.user._id }
  );
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/admin/products');
  }
  Product.findById(req.params.productId)
    .then((product) => {
      if (!product) {
        return res.redirect('/admin/products');
      }

      res.render('admin/edit-product', {
        title: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  Product.findById(req.body.id)
    .then((product) => {
      // Protect the edit by another user
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = req.body.title;
      product.price = +req.body.price;
      product.imageUrl = req.body.imageUrl;
      product.description = req.body.description;
      return product.save()
        .then(() => res.redirect('/admin/products'));
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  Product.deleteOne({id: req.body.id, userId: req.user._id})
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};
