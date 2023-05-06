const { model, Schema, Types } = require("mongoose");

const videoSchema = new Schema({
  // define schema for comments
  content: { type: String, required: true },
  // last_modified: { type: Date, required: true, default: Date.now },
  tweet: { type: Types.ObjectId, ref: "Tweet", required: true },
});

const Video = model("Video", videoSchema); // create model from schema

module.exports = { Video };
