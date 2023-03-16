const { model, Schema, Types } = require('mongoose');

const tweetSchema = new Schema({
    user: [{ type: Types.ObjectId, ref: 'User' }],
    last_modified: { type: Date, required: true, default: Date.now },
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    retweets: [{ type: Types.ObjectId, ref: 'Tweet' }],
    liked_user: [{ type: Types.ObjectId, ref: 'User' }],
    disliked_user: [{ type: Types.ObjectId, ref: 'User' }],
});


const Tweet = model('Tweet', tweetSchema);

module.exports = { Tweet };