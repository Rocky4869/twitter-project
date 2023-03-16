const bcrypt = require('bcrypt');
const { User } = require('./models/User.js');
const { Comment } = require('./models/Comment.js');
const { Tweet } = require('./models/Tweet.js');
const { Message } = require('./models/Message.js');
const { Image } = require('./models/Image.js');
const { Video } = require('./models/Video.js');

const initializeDB = async () => {
    // clearing the database

    await User.deleteMany({});
    await Comment.deleteMany({});
    await Tweet.deleteMany({});
    await Message.deleteMany({});
    // possible dummy data for demo and test
    console.log("init db")
};

module.exports = { initializeDB }