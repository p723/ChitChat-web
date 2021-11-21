const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatId: { type: String, required: true },
    text: { type: String, required: true },
    key: { type: String, required: false },
    sender: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    type: { type: String, required: true },
    time: { type: String, required: true },
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema, 'messages');