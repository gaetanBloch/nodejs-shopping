const ObjectId = require('mongodb').ObjectId;
const { getDb } = require('../utils/database');

class User {
  constructor(username, email, cart, id = null) {
    this.username = username;
    this.email = email;
    this.cart = cart; // { products: []}
    this._id = id;
  }

  save = () => {
    getDb().collection('users').insertOne(this);
  };

  static build = (user) => {
    return new User(user.username, user.email, user.cart, user._id);
  };

  addToCart = (product) => {
    const products = [];
    // const productIndex = this.cart.products.findIndex(
    //   (prod) => prod._id === product._id
    // );
    // if (productIndex === -1) {
    products.push({ productId: new ObjectId(product._id), quantity: 1 });
    // } else {
    //   products = this.cart.products.concat({
    //     ...product,
    //     quantity: this.cart.products[productIndex].quantity + 1
    //   });
    // }
    const cart = { products };
    getDb()
      .collection('users')
      .updateOne({ _id: new ObjectId(this._id) }, { $set: { cart } });
  };

  static findById = (id) => {
    return getDb()
      .collection('users')
      .findOne({ _id: new ObjectId(id) });
  };
}

module.exports = User;
