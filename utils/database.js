const mongodb = require('mongodb');
const MongoClient = new mongodb.MongoClient(
  'mongodb+srv://gbloch:gaetan.bloch@cluster0-hcscb.mongodb.net/test?retryWrites=true&w=majority',
  { useUnifiedTopology: true }
);

const mongoConnect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect()
      .then((result) => {
        console.log('Connected to MongoDB!');
        resolve(result);
      })
      .catch((err) => reject(err));
  });
};

module.exports = mongoConnect;
