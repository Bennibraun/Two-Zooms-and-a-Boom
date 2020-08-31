

// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var cookie = require("cookie");
var $ = jQuery = require('jquery');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port',5000);
app.use('/static', express.static(__dirname + '/static'));
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



var players = {};
var rooms = {};
rooms['Lobby'] = {players:[]};

// Routing
app.get('/', function(req, res) {
    try {
        console.log(req.cookies);
        var name = req.cookies.name;
        if (name != undefined) {
            console.log("user identified as " + name + ". Proceeding to index.");
            res.sendFile(path.join(__dirname, 'index.html'));
            return;
        }
        else {
            console.log("No name found, sending to landing page. [2]");
        }
    } catch {
        console.log("No name found, sending to landing page.");
    }
    res.sendFile(path.join(__dirname, 'landing_page.html'));
});

app.get('/join', function(req, res) {
    var name = req.query.nameInput;
    var roomCode = req.query.joinCodeInput;
    if (players[name]) {
        console.log("Name taken. Try again.");
        res.sendFile(path.join(__dirname, 'landing_page.html'));
    }
    console.log(name);
    res.cookie('name',name, { expires: new Date(Date.now()+100000000) });
    res.cookie('roomCode', roomCode, { expires: new Date(Date.now()+100000000) });

    if (!players[name]) {
        players[name] = {
            card: 'None',
            room: roomCode,
            isLeader: false,
            isHost: false
        }
    }
    res.redirect('/');
});

app.get('/host', function(req, res) {
    var name = req.query.nameInput;
    if (players[name]) {
        console.log("Name taken. Try again.");
        res.sendFile(path.join(__dirname, 'landing_page.html'));
    }
    console.log(name);
    res.cookie('name',name, { expires: new Date(Date.now()+100000000) });

    // Random lobby code string
    var roomCode = Math.random().toString(36).substring(2, 6);
    console.log(roomCode);

    res.cookie('roomCode', roomCode, { expires: new Date(Date.now()+100000000) });

    io.to(roomCode).emit('roomCode',roomCode);

    rooms[roomCode] = {players:[name]};

    if (!players[name]) {
        players[name] = {
            card: 'None',
            room: roomCode,
            isLeader: false,
            isHost: true
        }
    }
    res.redirect('/');
});

app.get('/leave', function(req, res) {
    res.cookie('name','', { expires: new Date(Date.now()-1) });
    res.redirect('/');
});

// Start the server
server.listen(process.env.PORT || 5000, function() {
    console.log('Starting server');
});


// WebSocket handlers
io.on('connection', function(socket) {
    var cookies = cookie.parse(socket.handshake.headers.cookie);
    var name = cookies.name;
    var currentRoom = cookies.roomCode;
    socket.on('new player', function() {
        if (!players[name]) {
            players[name] = {
                card: 'sampleCard',
                room: '',
                isLeader: false,
                isHost: false
            }
        }
        console.log(name + ": ");
        console.log(players[name]);

        // Add player to room
        for (room in rooms) {
            if (players[name].room == room) {
                console.log('room found.');
                if (!rooms[room].players.includes(name)) {
                    rooms[room].players.push(name);
                }
                currentRoom = room;
                socket.join(currentRoom);
                console.log('room joined')
                break;
            }
        }

        if (!currentRoom) {
            console.log("Room not found.");
        }
        else {
            // Tell client who's in the room
            io.to(currentRoom).emit('players', rooms[currentRoom].players);
            io.to(currentRoom).emit('roomCode',currentRoom);
        }

    });

    // Remove socket from the lobby
    socket.on('leaveRoom',function(data) {
        socket.leave(currentRoom);
        console.log('socket no longer in room');
    });
});