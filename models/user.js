const mongodb = require('mongodb');

const { getDb } = require('../utils/database');

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }
}

module.exports = User;
