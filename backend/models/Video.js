/*
 * Mongoose schema for videos.
 * @typedef {Object} VideoSchema
 * @property {string} content - The content of the video.
 * @property {Types.ObjectId} tweet - The ID of the tweet the video is posted on.
 */

const { model, Schema, Types } = require("mongoose");

const videoSchema = new Schema({
  // define schema for comments
  content: { type: String, required: true },
  // last_modified: { type: Date, required: true, default: Date.now },
  tweet: { type: Types.ObjectId, ref: "Tweet", required: true },
});

const Video = model("Video", videoSchema); // create model from schema

module.exports = { Video };
