const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

// array of words
const wordList = ['apple', 'banana', 'orange', 'grape', 'strawberry', 'watermelon', 'soda', 'happy', 'snow'];
const joinedPlayers = [];
let playerScores = {};

// global variables
let gameInPlay = false;
let wordChosen;

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
        socket.username = name; // store user's name in the socket object
        joinedPlayers.push(name); // add player to the joinedPlayers list
        playerScores[`${name}`] = 0;
        io.emit('joinedPlayers', joinedPlayers); // emit updated list to all users
    });

    // emit a message when a new user joins
    socket.on('userJoined', (name) => {
        io.emit('chat message', { name: 'Skribblio', message: `${name} has joined!`, isJoinMessage: true });
    });

    // listen for chat messages
    socket.on('chat message', (data) => {
        console.log(`${socket.username} said: ${data.message}`);
        io.emit('chat message', { name: socket.username, message: data.message });

        if (data.message.toLowerCase() === "start") {
            gameInPlay = true;

            

            const randomIndex = Math.floor(Math.random() * joinedPlayers.length);
            const chosenPlayer = joinedPlayers[randomIndex];
            
            const randomIndex2 = Math.floor(Math.random() * wordList.length);
            wordChosen = wordList[randomIndex2];

            io.sockets.sockets.forEach((socket) => {
                if (socket.username === chosenPlayer) {
                    io.to(socket.id).emit('chat message', {name: "Skribblio", message: `your word is: ${wordChosen}`, isJoinMessage: true});
                } else {
                    io.to(socket.id).emit('chat message', {name: "Skribblio", message: `${chosenPlayer} is drawing!`, isJoinMessage: true});
                }
            });

        io.emit('startGame');
        }

        if ((data.message.toLowerCase() === wordChosen) && (gameInPlay)) {
            let temp_user = socket.username;

            playerScores[temp_user] ++;

            io.emit('chat message', {name: "Skribblio", message: `the correct word was ${wordChosen}. ${temp_user} guessed it first, giving them a total of ${playerScores[temp_user]} points!`, isJoinMessage: true});

            io.emit('stopTimer');
        }

    });

    // disconnect
    socket.on('disconnect', () => {
        console.log(`${socket.username} disconnected`);
        const index = joinedPlayers.indexOf(socket.username);
        
        if (index !== -1) {
            joinedPlayers.splice(index, 1); // remove player from the joinedPlayers list
            io.emit('joinedPlayers', joinedPlayers); // emit updated list to all users
            
        }

        let temp_user = socket.username;
        delete playerScores.temp_user;

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
