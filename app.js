const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5ed90d546133cc53208b2586')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.getNotFound);

mongoose
  .connect(
    'mongodb+srv://gbloch:gaetan.bloch@cluster0-hcscb.mongodb.net/shop?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Successfully connected to MongoDb!');
    User.findOne((user) => {
      if (!user) {
        new User({
          username: 'gbloch',
          email: 'gaetan.bloch@gmai.com',
          cart: {
            products: []
          }
        })
          .save()
          .catch((err) => console.log(err));
      }
    });

    app.listen(3000);
  })
  .catch((err) => console.log(err));
