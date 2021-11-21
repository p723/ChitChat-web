const chatlistModel = require("../models/chatlist-model");
const Chatlist = require("../models/chatlist-model");

class ChatServices {

    async findChatlist(margeId) {
        const chatList = await chatlistModel.findOne(margeId);
        return chatList;
    }
    async findChat(chatId) {
        const chat = await chatlistModel.findOne(chatId)
        .populate('user1')
        .populate('user2')
        .exec();
        return chat;
    }
    async createChatlist(data) {
        const chatlist = await chatlistModel.create(data);
        return chatlist;
    }
    async getChatlist(uid) {
        const chatList = await chatlistModel.find({$or:[{ user1: uid }, { user2: uid }] })
        .populate('user1')
        .populate('user2')
        .exec();
        return chatList;
    }
}

module.exports = new ChatServices();