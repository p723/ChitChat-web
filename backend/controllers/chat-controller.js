const uuid4 = require("uuid4");
const userServices = require("../services/user-services");
const ChatServices = require("../services/chat-service");
const MessageServices = require("../services/message-services");


class ChatController {
  async getUsers(req, res) {
    const { email } = req.body;
    const users = await userServices.getAllUsers(['true'], email);
    return res.json(users);
  }
  async getChatlist(req, res) {
    const { uid } = req.body;
    const users = await ChatServices.getChatlist(uid);
    return res.json(users);
  }
  async getChat(req, res) {
    const { chatId } = req.body;
    const chat = await ChatServices.findChat({ chatId });
    return res.json(chat);
  }
  async createChatlist(req, res){
    const { user1, user2, chatType } = req.body;
    if (!user1 || !user2 || !chatType) {
      res.status(400).json({ message: "All fields are required!" });
    }
    let chatlist
    
   let margeId = `${user1}.${user2}`;
  // return res.json(margeId);
   let margeId2 = `${user2}.${user1}`;
      chatlist = null;
      chatlist = await ChatServices.findChatlist({ margeId });
      console.log(`margeId1:${margeId}`);
      if(!chatlist){
        chatlist = null;
        chatlist = await ChatServices.findChatlist({ margeId2 });
        console.log(`margeId2:${margeId2}`);
        if(chatlist){
          console.log("chatlist found 2nd");
          console.log(chatlist);
        if(chatlist.margeId == margeId2){
        return res.json(chatlist);
      }else{
    console.log("chatlist not found");
    var chatId = uuid4();
    
    try {
      chatlist = await ChatServices.createChatlist({ chatId, chatType, margeId, user1, user2 })
      return res.json(chatlist);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'database error'})    
    }
   }  
        }
      
     }else{
       console.log("chatlist found 1st");
       console.log(chatlist);
       if(chatlist.margeId == margeId){
        return res.json(chatlist);
      } 
     }
     
  }
  async sendMsg(req, res) {
    const { chatId, text, sender, receiver, type, time } = req.body;
    if (!chatId || !text || !sender  || !receiver || !type || !time) {
      res.status(400).json({ message: "All fields are required!" });
    }
    let message;
    try {
      message = await MessageServices.sendMsg({ chatId, text, sender, receiver, type, time })
      return res.json(message);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'database error'})    
    }
  }
  async getAllMsgs(req, res) {
    const { chatId } = req.body;
    const messages = await MessageServices.findMessage({ chatId });
    return res.json(messages);
  }
  
}


module.exports = new ChatController();
