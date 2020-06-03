const mongodb = require('mongodb');
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
  const product = new Product(
    req.body.title,
    +req.body.price,
    req.body.imageUrl,
    req.body.description
  );
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
    res
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
  const product = new Product(
    req.body.title,
    +req.body.price,
    req.body.imageUrl,
    req.body.description,
    new mongodb.ObjectID(req.body.id)
  );
  product
    .save()
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};

// exports.postDeleteProduct = (req, res, next) => {
//   Product.findByPk(req.body.id)
//     .then((product) => {
//       if (!product) {
//         return res.redirect('/admin/products');
//       }

//       return product.destroy();
//     })
//     .then(() => res.redirect('/admin/products'))
//     .catch((err) => console.log(err));
// };
