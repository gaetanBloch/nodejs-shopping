const bcrypt = require('bcryptjs');

const User = require('../models/user');

const { getErrorMessage } = require('./utils');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    title: 'Login',
    path: '/login',
    errorMessage: getErrorMessage(req)
  });
};

exports.postLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      // Checking if the password match
      bcrypt.compare(req.body.password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            return req.session.save(err => {
              if (err) {
                console.log(err);
              }
              res.redirect('/');
            });
          }
          res.redirect('/login');
        }).catch((err) => {
        console.log(err);
        res.redirect('/login');
      });
    }).catch((err) => console.log(err));
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    title: 'Signup',
    path: '/signup'
  });
};

exports.postSignup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(userDoc => {
      if (userDoc) {
        // The user already exists!
        return res.redirect('/signup');
      }
      return bcrypt.hash(req.body.password, 12)
        .then(password => {
          const user = new User({
            email: req.body.email,
            password: password,
            cart: { products: [] }
          });
          return user.save();
        }).then(() => res.redirect('/login'));
    }).catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};
