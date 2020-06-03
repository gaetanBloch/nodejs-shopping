const ObjectId = require('mongodb').ObjectId;

const { getDb } = require('../utils/database');

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    getDb().collection('users').insertOne(this);
  }

  static findById = (id) => {
    return getDb()
      .collection('users')
      .findOne({ _id: new ObjectId(id) });
  };
}

module.exports = User;
