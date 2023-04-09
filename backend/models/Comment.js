const { model, Schema, Types } = require('mongoose');

const commentSchema = new Schema({
  content: { type: String, required: true },
  last_modified: { type: Date, required: true, default: Date.now },
  user: { type: Types.ObjectId, ref: 'User', required: true },
  tweetId: { type: Types.ObjectId, ref: 'Tweet', required: true }
});

const Comment = model('Comment', commentSchema);

module.exports = { Comment };