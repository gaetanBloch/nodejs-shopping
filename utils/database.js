const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodejs-shopping', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
