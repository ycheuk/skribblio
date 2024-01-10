// importing all the important node.js/express/etc. stuff
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');

// now setting up socket.io
const { Server } = require('socket.io');
const io = new Server(server);

// doing this so the html can access the stylesheet/client-facing code
app.use(express.static(path.join(__dirname, 'public')));

// use index.html as the 'home page'
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// when a user connects/opens localhost:8080
io.on('connection', (socket) => {

    // when something is drawn on the canvas
    socket.on('drawn', (data) => {
        io.emit('drawn', data); // just sending the data back
    });

    // when a user presses the 'clear' button
    socket.on('cleared', () => {
        io.emit('cleared');
    });

});

// getting the server up n running!
server.listen(8080, () => {
    console.log('listening on port 8080');
});
