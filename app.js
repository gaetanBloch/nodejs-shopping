const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="post">' +
    '<input type="text" name="title" placeholder="title">' +
    '<button type="submit">Add Product</button>' +
    '</form>');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from express</h1>');
});

app.listen(3000);
