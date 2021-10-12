const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatlistSchema = new Schema({
    type: { type: String, required: true },
    users: [{
      user1: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User1',
        required: true
      },
      user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User2',
        required: true
      },
      }],
    messageId: { type: Object, required: false },
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chatlist', chatlistSchema, 'chatlists');