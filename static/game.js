

// listens for messages on a specific channel
var socket = io();

socket.on('players', function(players) {    
    console.log(players);
    console.log("done");
    // roomList = $("#playersInRoom").html();
    // List all players in the room on the html list
});

socket.emit('new player');

