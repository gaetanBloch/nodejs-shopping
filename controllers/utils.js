const Product = require('../models/product');

const fetchAllProducts = (file, title, path, req, res) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then((products) => res.render(file, { products, title, path }))
    .catch((err) => console.log(err));
};

exports.fetchAllProducts = fetchAllProducts;
