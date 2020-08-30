

// listens for messages on a specific channel
var socket = io();
socket.on('message', function(data) {
    console.log(data);
});

socket.emit('new player');
// setInterval(function() {
//     // socket.emit('player', player);
// }, 1/60);

