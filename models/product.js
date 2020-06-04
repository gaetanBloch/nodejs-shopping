const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

// const ObjectId = require('mongodb').ObjectId;
// const { getDb } = require('../utils/database');

// class Product {
//   constructor(title, price, imageUrl, description, id = null, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id ? new ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     if (this._id) {
//       // Save existing product
//       return db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       // Create new product
//       return db.collection('products').insertOne(this);
//     }
//   }

//   static fetchAll = () => {
//     return getDb().collection('products').find().toArray();
//   };

//   static findById = (id) => {
//     return getDb()
//       .collection('products')
//       .findOne({ _id: new ObjectId(id) });
//   };

//   static deleteById = (id) => {
//     return getDb()
//       .collection('products')
//       .deleteOne({ _id: new ObjectId(id) });
//   };
// }

// module.exports = Product;
