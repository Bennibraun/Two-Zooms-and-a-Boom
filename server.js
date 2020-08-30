

// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port',5000);
app.use('/static', express.static(__dirname + '/static'));


// Routing
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
server.listen(5000, function() {
    console.log('Starting server on port 5000');
});

var players = {};

// WebSocket handlers
io.on('connection', function(socket) {
    socket.on('new player', function() {
        players[socket.id] = {
            card: '',
            room: '',
            isLeader: false
        }
        console.log(players);
    });

    socket.on('player', function(data) {
        var player = players[socket.id] || {};
        if (data.card == "agent") {
            console.log("He's an agent!");
        }
        if (data.color == "blue") {
            console.log("He's blue!");
        }
        if (data.room == "1") {
            console.log("He's in room 1!");
        }
        if (!data.isLeader) {
            console.log("He's a leader!");
        }
    });
});


//TODO: modify testing message
setInterval(function() {
    io.sockets.emit('message', 'hi!');
}, 1000);

