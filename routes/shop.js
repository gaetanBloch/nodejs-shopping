const express = require('express');

const adminData = require('../routes/admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('shop', {
    products: adminData.products,
    title: 'Shop',
    path: '/'
  });
});

module.exports = router;
