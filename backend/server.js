require('dotenv').config();
const express = require('express');
const router = require('./routes');
const app = express();
const Dbconnect = require('./database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const io = require('socket.io')(5000,{
  cors:{
    origin: "https://chat.techxpo.live",
  },
});
app.use(cookieParser());
const corsOption = {
    credentials: true,
    origin: ['https://chat.techxpo.live']
}

const PORT = process.env.PORT || 5500;
Dbconnect();
app.use(express.json({limit: '8mb'})); 
app.use('/storage', express.static('storage'));
app.use(cors(corsOption))
app.use(router);
app.get('/', (req, res) => {
    res.send("hello from server")
})
app.listen(PORT, () => console.log(`Listening on port  ${PORT}`));

//socket server is from here..!

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");
  
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log(users);
    io.emit("getUsers", users);
    io.emit("getSocketId", socket.id);
  });
  
   //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
