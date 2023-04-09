const { model, Schema, Types } = require('mongoose');

const videochema = new Schema({
    content: { type: String, required: true },
    last_modified: { type: Date, required: true, default: Date.now },
    tweet: [{ type: Types.ObjectId, ref: 'Tweet' }],
});


const Video = model('Video', videochema);

module.exports = { Video };