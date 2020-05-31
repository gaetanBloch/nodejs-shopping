exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    title: 'Add Product',
    path: '/admin/add-product'
  });
}