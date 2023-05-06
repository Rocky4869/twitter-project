/*
 * Mongoose schema for tweets.
 * @typedef {Object} TweetSchema
 * @property {string} content - The content of the tweet.
 * @property {Date} last_modified - The date the tweet was last modified.
 * @property {Types.ObjectId} user - The ID of the user who posted the tweet.
 * @property {Types.ObjectId[]} comments - The IDs of the comments on the tweet.
 * @property {Types.ObjectId[]} images - The IDs of the images on the tweet.
 * @property {Types.ObjectId[]} videos - The IDs of the videos on the tweet.
 * @property {Types.ObjectId[]} likes - The IDs of the users who liked the tweet.
 * @property {Types.ObjectId[]} dislikes - The IDs of the users who disliked the tweet.
 * @property {Types.ObjectId[]} retweets - The IDs of the users who retweeted the tweet.
 */

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
