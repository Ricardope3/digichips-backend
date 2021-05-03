const io = require("socket.io-client");
const socket = io("http://localhost:8000");
socket.emit('create-room', { hostId: '123' });


socket.on('create-room', function (msg) {
    console.log(';adg')
});