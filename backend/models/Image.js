/*
 * Mongoose schema for images.
 * @typedef {Object} ImageSchema
 * @property {string} content - The content of the image.
 * @property {Types.ObjectId} tweet - The ID of the tweet the image is posted on.
 */

const { model, Schema, Types } = require("mongoose");

const imageSchema = new Schema({
  // define schema for comments
  content: { type: String, required: true },
  // last_modified: { type: Date, required: true, default: Date.now },
  tweet: { type: Types.ObjectId, ref: "Tweet", required: true },
});

const Image = model("Image", imageSchema); // create model from schema

module.exports = { Image };
