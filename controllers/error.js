exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    title: 'Page Not Found',
    path: null
  });
};

exports.get500 = (error, req, res, next) => {
  console.log(error);
  res.status(500).render('500', {
    title: 'Unexpected Error',
    path: null
  });
};
