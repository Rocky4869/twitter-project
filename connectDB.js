const { mongoose } = require('mongoose');
const { initializeDB } = require('./utils.js')

const connectDB = async () => {
  const dbPath = 'mongodb://127.0.0.1:27017/simpifiedTwitter';
  await mongoose.connect(dbPath)
    .then(() => {
      console.log('Connected to MongoDB');
      initializeDB();
    })
    .catch((err) => { console.log(err.message) });


};

module.exports = { connectDB };