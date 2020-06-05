exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    title: 'Login',
    path: '/login'
  });
};

exports.postLogin = (req, res, next) => {
  req.isLoggedIn = true;
  res.redirect('/');
};
