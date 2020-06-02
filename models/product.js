const Cart = require('./cart');
const { getFile } = require('./utils');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save = () => {
    
  };

  static fetchAll = () => {
    
  };

  static findById = (id) => {
    
  };

  static deleteById = (id) => {
    
};
