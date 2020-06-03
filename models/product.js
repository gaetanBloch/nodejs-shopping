const mongodb = require('mongodb');
const { getDb } = require('../utils/database');

class Product {
  constructor(title, price, imageUrl, description, _id = null) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = _id ? new mongodb.ObjectID(_id) : null;
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      // Save existing product
      dbOperation = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      // Create new product
      dbOperation = db.collection('products').insertOne(this);
    }

    return dbOperation
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static fetchAll = () => {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  };

  static findById = (id) => {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectID(id) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  };

  static deleteById = (id) => {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectID(id) })
      .then((result) => {
        console.log('Product deleted, for id = ' + id);
        return result;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
