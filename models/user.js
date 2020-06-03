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
    const updatedProducts = [];
    // const productIndex = this.cart.products.findIndex(
    //   (prod) => prod._id === product._id
    // );
    // if (productIndex === -1) {
    updatedProducts.push({ ...product, quantity: 1 });
    // } else {
    //   products = this.cart.products.concat({
    //     ...product,
    //     quantity: this.cart.products[productIndex].quantity + 1
    //   });
    // }
    const updatedCart = { products: updatedProducts };
    getDb()
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  };

  static findById = (id) => {
    return getDb()
      .collection('users')
      .findOne({ _id: new ObjectId(id) });
  };
}

module.exports = User;
