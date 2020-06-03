const ObjectId = require('mongodb').ObjectId;

const { getDb } = require('../utils/database');

class User {
  constructor(username, email, cart, id = null) {
    this.username = username;
    this.email = email;
    this.cart = cart; // { products: []}
    this._id = id ? new ObjectId(id) : null;
  }

  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.cart = user.cart;
    this._id = user._id;
  }

  save = () => {
    getDb().collection('users').insertOne(this);
  };

  addToCart = (product) => {
    products = [];
    quantity = 1;
    const productIndex = this.cart.products.findIndex(
      (prod) => prod._id === product._id
    );
    if (productIndex === -1) {
      products.push(...product);
      quantity++;
    } else {
      products = this.cart.products.concat(...product);
      quantity = this.cart.products[productIndex].quantity + 1;
    }
    const cart = { products, quantity };

    getDb()
      .collection('users')
      .updateOne({ _id: this._id }, { $set: { cart } });
  };

  static findById = (id) => {
    return getDb()
      .collection('users')
      .findOne({ _id: new ObjectId(id) });
  };
}

module.exports = User;
