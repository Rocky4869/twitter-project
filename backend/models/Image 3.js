const { model, Schema, Types } = require('mongoose');

const imageSchema = new Schema({
    content: { type: String, required: true },
    // last_modified: { type: Date, required: true, default: Date.now },
    tweet: { type: Types.ObjectId, ref: 'Tweet', required: true }
});

const Image = model('Image', imageSchema);

module.exports = { Image };