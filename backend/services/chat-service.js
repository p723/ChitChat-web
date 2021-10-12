const Chatlist = require("../models/chatlist-model");

class ChatServices {

    async findChatlist(filter) {
        
    }
    async createChatlist(data) {
      const type = chat;
      const user1 = {
        id: "1",
        name: "pranav",
        avatar: "/storage/"
      };
      const user2 = {
        id: "2",
        name: "pranav",
        avatar: "/storage/"
      };
      
        const chatlist = new Chatlist({
          type,
          users: [user1.id, user2.id]
        })
    }
    async getAllUsers(types) {
        
    }
}

module.exports = new ChatServices();