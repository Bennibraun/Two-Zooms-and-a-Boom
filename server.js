

// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var cookie = require("cookie");

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port',5000);
app.use('/static', express.static(__dirname + '/static'));
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var players = {};

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
            room: 'sampleRoom',
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
                room: 'sampleRoom',
                isLeader: false,
                isHost: false
            }
        }
        console.log(name + ": ");
        console.log(players[name]);
    });

    socket.on('player', function(data) {
        var player = players[data.name] || {};
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

