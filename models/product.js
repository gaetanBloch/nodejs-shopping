const fs = require('fs');
const path = require('path');

const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(
      path.dirname(process.mainModule.filename, 'data', 'products.json')
    );
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        // If there is no error then the file exists and we can read the
        // products
        products = JSON.parse(fileContent);
      }
      products.push(this);
      // Persists the products to the file
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll() {
    return products;
  }
};
