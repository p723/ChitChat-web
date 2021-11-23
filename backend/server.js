require('dotenv').config();
const express = require('express');
const router = require('./routes');
const app = express();
const Dbconnect = require('./database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

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
