exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get('Cookie').split(';')[3].trim().split('=')[1];
  res.render('auth/login', {
    title: 'Login',
    path: '/login',
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true');
  res.redirect('/');
};
