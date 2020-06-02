const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodejs-shopping', 'root', 'gaetan.bloch', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
