const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

// doing this so the html can access the stylesheet/client-facing code
app.use(express.static(join(__dirname, 'public')));

// use index.html as the 'home page'
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

// connect
io.on('connection', (socket) => {
    console.log('a user connected');

    // listen for user's name
    socket.on('sendName', (name) => {
        socket.username = name; // store the user's name in the socket object
    });

    // listen for chat messages
    socket.on('chat message', (data) => {
        console.log(`${socket.username} said: ${data.message}`);
        io.emit('chat message', { name: socket.username, message: data.message });
    });

    // disconnect
    socket.on('disconnect', () => {
        console.log(`${socket.username} disconnected`);
    });

    // when something is drawn on the canvas
    socket.on('drawn', (data) => {
        io.emit('drawn', data); // just sending the data back
    });

    // when a user presses the 'clear' button
    socket.on('cleared', () => {
        io.emit('cleared');
    });
    });

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
