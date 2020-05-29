const express = require('express');
const path = require('path');

const router = express.Router();

router.use((req, res, next) => {
  res.status(404);
  res.sendFile(path.join(__dirname, '..', 'views', 'not-found.html'));
});

module.exports = router;
