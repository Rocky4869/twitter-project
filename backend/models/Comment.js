/*
 * Mongoose schema for comments.
 * @typedef {Object} CommentSchema
 * @property {string} content - The content of the comment.
 * @property {Date} last_modified - The date the comment was last modified.
 * @property {Types.ObjectId} user - The user who posted the comment.
 * @property {Types.ObjectId} tweetId - The ID of the tweet the comment is posted on.
 */

const { model, Schema, Types } = require("mongoose");

const commentSchema = new Schema({
  // define schema for comments
  content: { type: String, required: true },
  last_modified: { type: Date, required: true, default: Date.now },
  user: { type: Types.ObjectId, ref: "User", required: true },
  tweetId: { type: Types.ObjectId, ref: "Tweet", required: true },
});

const Comment = model("Comment", commentSchema); // create model from schema

module.exports = { Comment };
