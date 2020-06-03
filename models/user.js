const ObjectId = require('mongodb').ObjectId;

const { getDb } = require('../utils/database');

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    db.collection('users').insertOne(this);
  }

  static findById = (id) => {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(id) });
  };
}

module.exports = User;
