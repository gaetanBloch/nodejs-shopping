const fs = require('fs');
const path = require('path');

const { getFile } = require('./utils');

const cartFile = getFile('cart.json');

module.exports = class Cart {
  static addProduct(product) {
    // Fetch the previous cart
    fs.readFile(cartFile, (error, fileContent) => {
      let cart = { products: [], quantity: 0, totalPrice: 0 };
      if (!error) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find existing product
      const existingProductId = cart.products.findIndex(
        (p) => p.id === product.id
      );

      // Add new product or increase the quantity
      // Update the total price and total quantity
      let updatedProduct;
      if (existingProductId !== -1) {
        const existingProduct = cart.products[existingProductId];
        updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };
        cart.products[existingProductId] = updatedProduct;
      } else {
        updatedProduct = { ...product, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + product.price;
      cart.quantity = cart.quantity + 1;

      // Save the cart to the file system
      fs.writeFile(cartFile, JSON.stringify(cart), (error) => {
        if (error) {
          console.log(error);
        }
      });
    });
  }
};
