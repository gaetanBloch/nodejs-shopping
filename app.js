const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');
const { mongoConnect } = require('./utils/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
// app.use(shopRoutes);
app.use(errorController.getNotFound);

mongoConnect()
  .then((results) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
