const path = require('path');

const getFile = (file) => {
  return path.join(path.dirname(process.mainModule.filename), 'data', file);
};

exports.getFile = getFile;
