const { mongoose } = require("mongoose");

const connectDB = async() => { 
    const dbPath = 'mongodb://127.0.0.1:27017/simpifiedTwitter';  
    await mongoose.connect(dbPath)
        .then(() => {
            console.log("Connected to MongoDB"); 
            // initialization;
        })
        .catch((err) => {
            console.log(err.message) 
        });
}

module.exports = { connectDB }