/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with modification

Documentation by ChatGPT (modified):

This is a Node.js module that exports a function called connectDB. The purpose of this function is to establish a connection to a MongoDB database using the Mongoose library.

To use this module, you will need to first install Mongoose as a dependency in your project. Once you have done that, you can import the connectDB function from this module into your own code.

The connectDB function takes no arguments and returns a Promise. When this Promise resolves successfully, you can assume that a connection to the specified MongoDB database has been established. If the Promise is rejected, you can assume that there was an error connecting to the database and the reason for the error will be logged to the console.
*/

const { mongoose } = require("mongoose");

const connectDB = async () => {
  const dbPath = "mongodb://127.0.0.1:27017/simpifiedTwitter";
  await mongoose
    .connect(dbPath)
    .then(() => {
      console.log("Connected to MongoDB");
      // initialization;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { connectDB };
