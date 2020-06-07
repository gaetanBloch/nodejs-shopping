const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post(
  '/login', [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.'),
    body('password', 'Please enter a password with only numbers and text and' +
      ' at least 5 characters.')
      .isLength({ min: 5 })
      .isAlphanumeric()
  ],
  authController.postLogin
);

router.get('/signup', authController.getSignup);

router.post(
  '/signup', [
    body('email')
      .custom(value => {
        return User.findOne({ email: value })
          .then(user => {
            if (user) {
              // The user already exists!
              // We return a promise rejection
              return Promise.reject(
                'E-Mail address already exists, please pick' +
                ' another one.');
            }
          });
      }),
    body('password', 'Please enter a password with only numbers and text and' +
      ' at least 5 characters.')
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
