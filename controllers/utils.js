const Product = require('../models/product');

const fetchAllProducts = (file, title, path, req, res, condition = {}) => {
  Product.find(condition)
    .then((products) => res.render(file, {
      products,
      title,
      path
    }))
    .catch((err) => console.log(err));
};

const getErrorMessage = (req) => {
  let errorMessage = req.flash('error');
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  return errorMessage;
};

exports.fetchAllProducts = fetchAllProducts;
exports.getErrorMessage = getErrorMessage;
