const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
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
