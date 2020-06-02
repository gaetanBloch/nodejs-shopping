const Product = require('../models/product');

const fetchAllProducts = (file, title, path, req, res) => {
  req.user
    .getProducts()
    .then((products) => res.render(file, { products, title, path }))
    .catch((err) => console.log(err));
};

exports.fetchAllProducts = fetchAllProducts;
