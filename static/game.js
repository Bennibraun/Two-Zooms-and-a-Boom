

// listens for messages on a specific "name"
var socket = io();
socket.on('message', function(data) {
    console.log(data);
});

var player = {
    card: '',
    room: '',
    isLeader: false
}


socket.emit('new player');
setInterval(function() {
    socket.emit('player', player);
}, 1000/60);