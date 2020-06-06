module.exports = (req, res, next) => {
  if (!res.session.isLoggedIn) {
    return res.redirect('login');
  }
  next();
}
