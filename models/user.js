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
  const updatedProducts = this.cart.products.filter(
    (prod) => prod.productId.toString() !== id.toString()
  );
  this.cart.products = updatedProducts;
  return this.save();
};

module.exports = mongoose.model('User', userSchema);

// getCart = () => {
//   const productIds = this.cart.products.map((product) => product.productId);
//   return getDb()
//     .collection('products')
//     .find({ _id: { $in: productIds } })
//     .toArray()
//     .then((products) =>
//       products.map((product) => ({
//         ...product,
//         quantity: this.cart.products.find(
//           (prod) => prod.productId.toString() === product._id.toString()
//         ).quantity
//       }))
//     );
// };

// deleteProductFromCart = (id) => {
//   const updatedProducts = this.cart.products.filter(
//     (prod) => prod.productId.toString() !== id.toString()
//   );

//   return getDb()
//     .collection('users')
//     .updateOne(
//       { _id: new ObjectId(this._id) },
//       { $set: { cart: { products: updatedProducts } } }
//     );
// };

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
