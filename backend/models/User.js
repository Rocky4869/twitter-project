const { model, Schema, Types } = require('mongoose');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true },
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    is_admin: {type: Boolean, required: true, default: false },
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    posted_tweets: [{ type: Types.ObjectId, ref: 'Tweet' }],
    liked_tweets: [{ type: Types.ObjectId, ref: 'Tweet' }],
    disliked_tweets: [{ type: Types.ObjectId, ref: 'Tweet' }],
    retweeted_tweets: [{ type: Types.ObjectId, ref: 'Tweet' }],
    following: [{ type: Types.ObjectId, ref: 'User' }],
    followers: [{ type: Types.ObjectId, ref: 'User' }],
})

const User = model('User', userSchema);
module.exports = { User };