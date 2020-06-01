const fs = require('fs');
const path = require('path');

const Cart = require('./cart');
const { getFile } = require('./utils');

const productsFile = getFile('products.json');

const getProductsFromFile = (callback) => {
  fs.readFile(productsFile, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      // If there is no error then the file exists and we can read the
      // products
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save = () => {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex((product) => {
          return product.id === this.id;
        });
        products[existingProductIndex] = this;
      } else {
        this.id = Math.random().toString();
        products.push(this);
      }
      // Persists the products to the file
      fs.writeFile(productsFile, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  };

  static fetchAll = (callback) => {
    getProductsFromFile(callback);
  };

  static findById = (id, callback) => {
    getProductsFromFile((products) => {
      callback(products.find((product) => product.id === id));
    });
  };

  static deleteById = (id) => {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((product) => {
        return product.id !== id;
      });
      // Persists the products to the file
      fs.writeFile(productsFile, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(product);
        } else {
          console.log(err);
        }
      });
    });
  };
};
