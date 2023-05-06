/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with modification

Documentation by ChatGPT (modified):

This is a Node.js module that creates an Express application and starts a server listening on port 5000.

The cors middleware is used to enable Cross-Origin Resource Sharing, which allows web pages from different origins to access the server's resources.

The express.json() middleware is used to parse incoming JSON request bodies into JavaScript objects.

The express.urlencoded() middleware is used to parse incoming URL-encoded request bodies into JavaScript objects.

The connectDB() function is called to connect to the database. This function is defined in a separate file and is responsible for establishing a connection to the database using a database connection string.
*/

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./connectDB.js");

const app = express(); // create express app
app.use(cors()); // enable CORS
app.use(express.json()); // parse json bodies into JS objects
app.use(express.urlencoded({ extended: false })); // parse URL-encoded bodies

app.listen(5000, () => {
  console.log("Server is listening at port: 5000"); // listen on port 5000
  connectDB();
});
