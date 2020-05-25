const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded());

app.use('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="post">' +
    '<input type="text" name="title" placeholder="title">' +
    '<button type="submit">Add Product</button>' +
    '</form>');
});

app.use('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
})

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from express</h1>');
});

app.listen(3000);
