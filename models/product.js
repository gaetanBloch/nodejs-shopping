const ObjectId = require('mongodb').ObjectId;
const { getDb } = require('../utils/database');

class Product {
  constructor(title, price, imageUrl, description, id = null) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id ? new ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    if (this._id) {
      // Save existing product
      return db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      // Create new product
      return db.collection('products').insertOne(this);
    }
  }

  static fetchAll = () => {
    getDb().collection('products').find().toArray();
  };

  static findById = (id) => {
    getDb()
      .collection('products')
      .findOne({ _id: new ObjectId(id) });
  };

  static deleteById = (id) => {
    return getDb()
      .collection('products')
      .deleteOne({ _id: new ObjectId(id) });
  };
}

module.exports = Product;
