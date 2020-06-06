const { bcrypt } = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    title: 'Login',
    path: '/login',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then((user) => {
      if (!user) {
        return res.redirect('/login');
      }
      req.session.user = user;
      req.session.isLoggedIn = true;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch((err) => console.log(err));
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    title: 'Signup',
    path: '/signup',
    isAuthenticated: req.session.isLoggedIn
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
    console.log(err);
    res.redirect('/');
  });
};
