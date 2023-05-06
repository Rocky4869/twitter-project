const { model, Schema, Types } = require("mongoose");

const tweetSchema = new Schema({
  // define schema for comments
  content: { type: String, required: true },
  last_modified: { type: Date, required: true, default: Date.now },
  user: { type: Types.ObjectId, ref: "User", required: true },
  comments: [{ type: Types.ObjectId, ref: "Comment" }],
  images: [{ type: Types.ObjectId, ref: "Image" }],
  videos: [{ type: Types.ObjectId, ref: "Video" }],
  likes: [{ type: Types.ObjectId, ref: "User" }],
  dislikes: [{ type: Types.ObjectId, ref: "User" }],
  retweets: [{ type: Types.ObjectId, ref: "User" }],
});

const Tweet = model("Tweet", tweetSchema); // create model from schema

module.exports = { Tweet };
