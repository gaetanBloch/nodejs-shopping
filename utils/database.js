const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'gaetan.bloch',
  database: 'nodejs-shopping'
});

module.exports = pool.promise();