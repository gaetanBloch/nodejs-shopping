const Product = require('../models/product');

const fetchAllProducts = (file, title, path, res) => {
  Product.findAll()
    .then((products) => res.render(file, { products, title, path }))
    .catch((err) => console.log(err));
}

exports.fetchAllProducts = fetchAllProducts;