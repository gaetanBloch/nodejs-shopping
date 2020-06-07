const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');

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
  '/signup',
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    }),
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
