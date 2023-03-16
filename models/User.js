const { model, Schema, Types } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, required: true, default: false },
    following: [{ type: Types.ObjectId, ref: 'User' }],
    follower: [{ type: Types.ObjectId, ref: 'User' }],
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    tweets: [{ type: Types.ObjectId, ref: 'Tweet' }],
    retweets: [{ type: Types.ObjectId, ref: 'Tweet' }],
    liked_tweets: [{ type: Types.ObjectId, ref: 'Tweet' }],
    disliked_tweets: [{ type: Types.ObjectId, ref: 'Tweet' }],
});


const User = model('User', userSchema);

module.exports = { User };