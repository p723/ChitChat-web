const userServices = require("../services/user-services");


class ChatController {
  async getUsers(req, res) {
    const users = await userServices.getAllUsers(['true']);
    return res.json(users);
  }
  async createChatlist(req, res){
    
  }
  }
}

module.exports = new ChatController();
