const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from express</h1>');
});

app.listen(3000);
