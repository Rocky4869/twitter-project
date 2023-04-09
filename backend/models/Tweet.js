const { model, Schema, Types } = require('mongoose');

const tweetSchema = new Schema({
  content: { type: String, required: true },
  last_modified: { type: Date, required: true, default: Date.now },
  user: { type: Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: Types.ObjectId, ref: 'Comment' }],
  images: [{ type: Types.ObjectId, ref: 'Image' }],
  videos: [{ type: Types.ObjectId, ref: 'Video' }],
  likes: [{ type: Types.ObjectId, ref: 'User'}],
  distlikes: [{ type: Types.ObjectId, ref: 'User'}],
  retweets: [{ type: Types.ObjectId, ref: 'User'}],
});

const Tweet = model('Tweet', tweetSchema);

module.exports = { Tweet };