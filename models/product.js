const fs = require('fs');
const path = require('path');

const productsFile = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save = () => {
    fs.readFile(productsFile, (err, fileContent) => {
      const products = Product.readProducts(err, fileContent);
      products.push(this);
      // Persists the products to the file
      fs.writeFile(productsFile, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  };

  static readProducts = (err, fileContent) => {
    if (!err) {
      // If there is no error then the file exists and we can read the
      // products
      return JSON.parse(fileContent);
    }
    return [];
  };

  static fetchAll = () => {
    fs.readFile(productsFile, (err, fileContent) => {
      return Product.readProducts(err, fileContent);
    });
  };
};
