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
    const products = [...this.cart.products];
    const productIndex = products.findIndex(
      (prod) => prod.productId.toString() === product._id.toString()
    );
    if (productIndex <= -1) {
      products.push({ productId: new ObjectId(product._id), quantity: 1 });
    } else {
      products[productIndex].quantity = products[productIndex].quantity + 1;
    }
    const cart = { products };
    getDb()
      .collection('users')
      .updateOne({ _id: new ObjectId(this._id) }, { $set: { cart } });
  };

  getCart = () => {
    const productIds = this.cart.products.map((product) => product.productId);
    return getDb()
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) =>
        products.map((product) => ({
          ...product,
          quantity: this.cart.products.find(
            (prod) => prod.productId.toString() === product._id.toString()
          ).quantity
        }))
      );
  };

  static findById = (id) => {
    return getDb()
      .collection('users')
      .findOne({ _id: new ObjectId(id) });
  };
}

module.exports = User;
