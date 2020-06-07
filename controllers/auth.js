const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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'
  }
}));

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
          req.flash('error', 'Invalid email or password.');
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
    path: '/signup',
    errorMessage: getErrorMessage(req)
  });
};

exports.postSignup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(userDoc => {
      if (userDoc) {
        // The user already exists!
        req.flash('error', 'E-Mail address already exists, please pick' +
          ' another one.');
        return res.redirect('/signup');
      }
      return bcrypt.hash(req.body.password, 12);
    })
    .then(password => {
      const user = new User({
        email: req.body.email,
        password,
        cart: { products: [] }
      });
      return user.save();
    })
    .then(() => {
      res.redirect('/login');
      return transporter.sendMail({
        to: req.body.email,
        from: 'gaetan.bloch@gmail.com',
        subject: 'Singup Succeeded',
        html: '<h1>You successfully signed up</h1>'
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  res.render('auth/reset', {
    title: 'Reset Password',
    path: '/reset',
    errorMessage: getErrorMessage(req)
  });
};
