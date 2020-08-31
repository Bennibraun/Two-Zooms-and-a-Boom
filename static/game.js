

// listens for messages on a specific channel
var socket = io();

socket.on('players', function(players) {    
    // console.log(players);
    
    // List all players in the room on the html list
    pList = $("#playersInRoom");
    pList.empty();
    $.each(players,function(p) {
        $('<li/>').text(players[p]).appendTo(pList);
    });
});

socket.on('roomCode', function(roomCode) {
    $("#roomCodeDisplay").text("Room Code: " + roomCode);
});

socket.on('delete_cookie', (cookie) => {
    document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
});

// Tell the server to instantiate a player
socket.emit('new player');

// When leave btn pressed, tell server to leave lobby
function leaveLobby() {
    console.log('leaving lobby');
    delete_cookie("name");
    socket.emit('leaveRoom','');
    location.reload();
}

function get_cookie(name) {
    return document.cookie.split(';').some(function(c) {
        return c.trim().startsWith(name + '=');
    });
}

function delete_cookie(name) {
    if (get_cookie(name)) {
        document.cookie = name + "=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}