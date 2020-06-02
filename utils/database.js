const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  username: 'gbloch',
  password: 'pwd',
  database: 'nodejs_shopping'
});

module.exports = pool.promise();