/*
 * Mongoose schema for users.
 * @typedef {Object} UserSchema
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {boolean} is_admin - Whether the user is an admin.
 * @property {Types.ObjectId[]} comments - The IDs of the comments the user has made.
 * @property {Types.ObjectId[]} posted_tweets - The IDs of the tweets the user has posted.
 * @property {Types.ObjectId[]} liked_tweets - The IDs of the tweets the user has liked.
 * @property {Types.ObjectId[]} disliked_tweets - The IDs of the tweets the user has disliked.
 * @property {Types.ObjectId[]} retweeted_tweets - The IDs of the tweets the user has retweeted.
 * @property {Types.ObjectId[]} following - The IDs of the users the user is following.
 * @property {Types.ObjectId[]} followers - The IDs of the users who are following the user.
 */

const { model, Schema, Types } = require("mongoose");

const userSchema = new Schema({
  // define schema for comments
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_admin: { type: Boolean, required: true, default: false },
  comments: [{ type: Types.ObjectId, ref: "Comment" }],
  posted_tweets: [{ type: Types.ObjectId, ref: "Tweet" }],
  liked_tweets: [{ type: Types.ObjectId, ref: "Tweet" }],
  disliked_tweets: [{ type: Types.ObjectId, ref: "Tweet" }],
  retweeted_tweets: [{ type: Types.ObjectId, ref: "Tweet" }],
  following: [{ type: Types.ObjectId, ref: "User" }],
  followers: [{ type: Types.ObjectId, ref: "User" }],
});

const User = model("User", userSchema); // create model from schema
module.exports = { User };
