const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  }
});

// Use the function keyword so that the "this" keyword refers to the context by
// which is it executed. No arrow function!

userSchema.methods.addToCart = function (product) {
  const products = [...this.cart.products];
  const productIndex = products.findIndex(
    (prod) => prod.productId.toString() === product._id.toString()
  );
  if (productIndex <= -1) {
    products.push({ productId: product._id, quantity: 1 });
  } else {
    products[productIndex].quantity = products[productIndex].quantity + 1;
  }
  this.cart = { products };
  return this.save();
};

userSchema.methods.deleteProductFromCart = function (id) {
  this.cart.products = this.cart.products.filter(
    (prod) => prod.productId.toString() !== id.toString()
  );
  return this.save();
};

module.exports = mongoose.model('User', userSchema);

// addOrder = () => {
//   return this.getCart()
//     .then((products) => {
//       const order = {
//         products,
//         user: {
//           _id: new ObjectId(this._id),
//           username: this.username
//         }
//       };
//       return getDb().collection('orders').insertOne(order);
//     })
//     .then(() => {
//       // Empty the cart in memory and in the DB
//       this.cart.products = [];
//       return getDb()
//         .collection('users')
//         .updateOne(
//           { _id: new ObjectId(this._id) },
//           { $set: { cart: { products: [] } } }
//         );
//     });
// };

// getOrders = () => {
//   return getDb()
//     .collection('orders')
//     .find({ 'user._id': new ObjectId(this._id) })
//     .toArray();
// };
