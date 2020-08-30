

// listens for messages on a specific "name"
var socket = io();
socket.on('message', function(data) {
    console.log(data);
});

var player = {
    card: "agent",
    color: "blue",
    room: "1",
    isLeader: false
}


socket.emit('new player');
setInterval(function() {
    // socket.emit('player', player);
}, 1/60);

