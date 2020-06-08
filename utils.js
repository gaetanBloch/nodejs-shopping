const Product = require('./models/product');

const fetchAllProducts = (file, title, path, req, res, next, condition = {}) => {
  Product.find(condition)
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

exports.fetchAllProducts = fetchAllProducts;
exports.getErrorMessage = getErrorMessage;
exports.forwardError = forwardError;
