const express = require('express');
const cors = require('cors');

const { connectDB } = require('./connectDB.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(5000, () => {
    console.log("Server is listening at port: 5000")
    connectDB();
})