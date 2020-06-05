exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    title: 'Login',
    path: '/login',
    isAuthenticated: true
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie','');
  res.redirect('/');
};
