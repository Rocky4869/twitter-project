const { model, Schema, Types } = require('mongoose');

const messageSchema = new Schema({
    content: { type: String, required: true },
    last_modified: { type: Date, required: true, default: Date.now },
    sender: [{ type: Types.ObjectId, ref: 'User' }],
    receiver: [{ type: Types.ObjectId, ref: 'User' }],
});


const Message = model('Message', messageSchema);

module.exports = { Message };