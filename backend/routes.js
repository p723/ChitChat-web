const authcontroller = require("./controllers/auth-controller");
const ActivateController = require("./controllers/activate-controller");
const ChatController = require("./controllers/chat-controller");
const authMiddleware = require("./middlewares/auth-middleware");
const router = require('express').Router();

router.post('/api/send-otp', authcontroller.sendOtp);
router.post('/api/verify-otp', authcontroller.verifyOtp);
router.post('/api/activate', authMiddleware, ActivateController.activate);
router.get('/api/refresh', authcontroller.refresh);
router.post('/api/chat/users', ChatController.getUsers);
router.post('/api/chat/chatlist', ChatController.getChatlist);
router.post('/api/chat/getchat', ChatController.getChat);
router.post('/api/chat/createChatlist', ChatController.createChatlist);
router.post('/api/chat/sendMsg', ChatController.sendMsg);
router.post('/api/chat/getAllMsgs', ChatController.getAllMsgs);

module.exports = router;
