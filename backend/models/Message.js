const { model, Schema, Types } = require('mongoose');

const messageSchema = new Schema({
  content: { type: String, required: true },
  last_modified: { type: Date, required: true, default: Date.now },
  send_user: { type: Types.ObjectId, ref: 'User', required: true },
  receive_user: { type: Types.ObjectId, ref: 'User', required: true },
});

const Message = model('Message', messageSchema);

module.exports = { Comment };