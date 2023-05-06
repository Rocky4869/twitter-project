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
