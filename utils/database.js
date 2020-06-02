const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'nodejs-shopping'
});

module.exports = pool.promise();