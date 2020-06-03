const mongodb = require('mongodb');
const MongoClient = new mongodb.MongoClient(
  'mongodb+srv://gbloch:gaetan.bloch@cluster0-hcscb.mongodb.net/shop?retryWrites=true&w=majority',
  { useUnifiedTopology: true }
);

let _db;

const mongoConnect = () => {
  MongoClient.connect()
    .then((client) => {
      _db = client.db();
      resolve('Connected to MongoDB!');
    })
    .catch((err) => reject(err));
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error('No Database Found!');
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
