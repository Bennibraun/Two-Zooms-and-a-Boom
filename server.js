

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

// WebSocket handlers
io.on('connection', function(socket) { });


//TODO: modify testing message
setInterval(function() {
    io.sockets.emit('message', 'hi!');
}, 1000);

// console.log(io);

// Listens for msgs with a specific 'name'
// var socket = io.connect('');
// socket.on('name', function(data) {
//     // data is a parameter containing whatever data was sent
// });
