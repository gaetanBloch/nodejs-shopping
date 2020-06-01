const getFile = (file) => path.join(
  path.dirname(process.mainModule.filename),
  'data',
  file
);

exports.getFile = getFile; 