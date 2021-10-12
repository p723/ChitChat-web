const authcontroller = require("./controllers/auth-controller");
const ActivateController = require("./controllers/activate-controller");
const ChatController = require("./controllers/chat-controller");
const authMiddleware = require("./middlewares/auth-middleware");
const router = require('express').Router();

router.post('/api/send-otp', authcontroller.sendOtp);
router.post('/api/verify-otp', authcontroller.verifyOtp);
router.post('/api/activate', authMiddleware, ActivateController.activate);
router.get('/api/refresh', authcontroller.refresh);
router.get('/api/chat/users', authMiddleware, ChatController.getUsers);

module.exports = router;
