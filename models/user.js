const mongodb = require('mongodb');

const { getDb } = require('../utils/database');

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    db.collection('users')
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static findById = (id) => {
    const db = getDb();
    return db
      .collection('users')
      .find({ _id: new mongodb.ObjectID(id) })
      .next()
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => console.log(err));
  };
}

module.exports = User;
