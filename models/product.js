const db = require('../utils/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save = () => {
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) ' +
        'VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  };

  static fetchAll = () => {
    return db.execute('SELECT * FROM products');
  };

  static findById = (id) => {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  };

  static deleteById = (id) => {};
};
