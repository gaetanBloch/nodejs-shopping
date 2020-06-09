const fs = require('fs');

const Product = require('./models/product');

const ITEMS_PER_PAGE = 2;

const fetchAllProducts = (file, title, path, req, res, next, condition = {}) => {
  const page = req.query.page;

  Product.find(condition)
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .then((products) => res.render(file, {
      products,
      title,
      path
    }))
    .catch(err => forwardError(err, next));
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

const forwardError = (err, next) => {
  console.log(err);
  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);
}

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  })
}

exports.fetchAllProducts = fetchAllProducts;
exports.getErrorMessage = getErrorMessage;
exports.forwardError = forwardError;
exports.deleteFile = deleteFile;
