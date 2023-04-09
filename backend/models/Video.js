const { model, Schema, Types } = require('mongoose');

const videoSchema = new Schema({
  content: { type: String, required: true },
  // last_modified: { type: Date, required: true, default: Date.now },
  tweet: { type: Types.ObjectId, ref: 'Tweet', required: true }
});

const Video = model('Video', videoSchema);

module.exports = { Video };