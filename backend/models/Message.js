/*
 * Mongoose schema for messages.
 * @typedef {Object} MessageSchema
 * @property {string} content - The content of the message.
 * @property {Date} last_modified - The date the message was last modified.
 * @property {Types.ObjectId} send_user - The ID of the user who sent the message.
 * @property {Types.ObjectId} receive_user - The ID of the user who received the message.
 */

const { model, Schema, Types } = require("mongoose");

const messageSchema = new Schema({
  // define schema for comments
  content: { type: String, required: true },
  last_modified: { type: Date, required: true, default: Date.now },
  send_user: { type: Types.ObjectId, ref: "User", required: true },
  receive_user: { type: Types.ObjectId, ref: "User", required: true },
});

const Message = model("Message", messageSchema); // create model from schema

module.exports = { Comment };
