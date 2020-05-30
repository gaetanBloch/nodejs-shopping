const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const adminData = require('../routes/admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(adminData.products);
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
