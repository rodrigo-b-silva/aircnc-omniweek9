const port = process.env.PORT || 3333;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

app.use(cors());
mongoose.connect('mongodb://localhost:27017/aircnc', { useNewUrlParser: true });

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(require('./routes.js'));

server.listen(port, () => {
    console.log(`App running on port ${port}`);
})