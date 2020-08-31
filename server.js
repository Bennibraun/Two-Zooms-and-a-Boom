

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

// For later: generate random room code
// Math.random().toString(36).substring(2, 15)

var players = {};
var rooms = {};
rooms['ABCD'] = {players:["p1","p2","p3"]};

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
    console.log(name);
    // res.setHeader('Set-Cookie', ['name='+name])
    res.cookie('name',name, { expires: new Date(Date.now()+100000000) });
    if (!players[name]) {
        players[name] = {
            card: 'sampleCard',
            room: 'ABCD',
            isLeader: false,
            isHost: false
        }
    }
    res.redirect('/');
});

// Start the server
server.listen(5000, function() {
    console.log('Starting server on port 5000');
});


// WebSocket handlers
io.on('connection', function(socket) {
    var name = cookie.parse(socket.handshake.headers.cookie).name;
    socket.on('new player', function() {
        if (!players[name]) {
            players[name] = {
                card: 'sampleCard',
                room: 'ABCD',
                isLeader: false,
                isHost: false
            }
        }
        console.log(name + ": ");
        console.log(players[name]);

        // Add player to room
        var currentRoom = 'ABCD';
        for (room in rooms) {
            if (players[name].room == room) {
                console.log('room found.');
                rooms[room].players.push(name);
                currentRoom = room;
                socket.join('ABCD');
                console.log('room joined')
            }
        }
        
        // Tell player who's in the room
        io.to('ABCD').emit('players', 'teststr');//rooms[currentRoom].players.toString());

    });
});