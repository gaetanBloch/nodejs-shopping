const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

router.use((req, res, next) => {
  res.status(404).render('not-found');
});

module.exports = router;
