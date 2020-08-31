

// listens for messages on a specific channel
var socket = io();

socket.on('players', function(players) {    
    console.log(players);
    
    // List all players in the room on the html list
    pList = $("#playersInRoom");
    pList.empty();
    $.each(players,function(p) {
        $('<li/>').text(players[p]).appendTo(pList);
    });
});

socket.emit('new player');

