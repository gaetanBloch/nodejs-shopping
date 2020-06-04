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

module.exports = mongoose.model('User', userSchema);
