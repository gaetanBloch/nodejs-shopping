const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const { forwardError } = require('../utils');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  auth: {
    user: 'gaetan.bloch@gmail.com',
    pass: 'LxEAYtRIpszUafCZ'
  }
});

const { getErrorMessage } = require('../utils');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    title: 'Login',
    path: '/login',
    errorMessage: getErrorMessage(req),
    oldInput: {
      email: '',
      password: ''
    },
    validationErrors: []
  });
};

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      title: 'Login',
      path: '/login',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: req.body.email,
        password: req.body.password
      },
      validationErrors: errors.array()
    });
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        req.flash('error',);
        return res.status(422).render('auth/login', {
          title: 'Login',
          path: '/login',
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email: req.body.email,
            password: req.body.password
          },
          validationErrors: [{ param: 'email' }, { param: 'password' }]
        });
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
        if (err) {
          console.log(err);
        }
        res.redirect('/login');
      });
    }).catch(err => forwardError(err, next));
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    title: 'Signup',
    path: '/signup',
    errorMessage: getErrorMessage(req),
    oldInput: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
};

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      title: 'Signup',
      path: '/signup',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
      },
      validationErrors: errors.array()
    });
  }

  bcrypt.hash(req.body.password, 12)
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
    }).catch(err => forwardError(err, next));
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

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', 'No account with that email address found.');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        // Expires in one hour
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      }).then(() => {
      res.redirect('/');
      return transporter.sendMail({
        to: req.body.email,
        from: 'gaetan.bloch@gmail.com',
        subject: 'Password Reset',
        html: `
          <p>You requested a new password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a>
           to set a new password.</p>
          <br>
          <i>This link will be active for only one hour.</i>
        `
      });
    }).catch(err => forwardError(err, next));
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  // Check the token in the User and that it has not expired
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() }
  }).then(user => {
    res.render('auth/new-password', {
      title: 'New Password',
      path: '/new-password',
      errorMessage: getErrorMessage(req),
      userId: user._id.toString(),
      passwordToken: token
    });
  }).catch(err => forwardError(err, next));
};

exports.postNewPassword = (req, res, next) => {
  let user;
  User.findOne({
    resetToken: req.body.passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: req.body.userId
  }).then(userDoc => {
    user = userDoc;
    return bcrypt.hash(req.body.password, 12);
  }).then(password => {
    user.password = password;
    user.resetToken = null;
    user.resetTokenExpiration = undefined;
    return user.save();
  }).then(() => res.redirect('/login'))
    .catch(err => forwardError(err, next));
};
