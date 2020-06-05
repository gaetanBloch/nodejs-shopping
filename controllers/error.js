exports.getNotFound = (req, res, next) => {
  res.status(404).render('not-found', {
    title: 'Page Not Found',
    path: null,
    isAuthenticated: req.session.isLoggedIn
  });
};
