

// listens for messages on a specific channel
var socket = io();

// Tell the server to instantiate a player
socket.emit('new player');

var userName = '';
var isHost = false;
var players;

socket.on('host', function(data) {
    console.log("user set as host.");
    isHost = true;
});

socket.on('players', function(playerList) {
    players = playerList;
    // List all players in the room on the html list
    pList = $("#playersInRoom");
    pList.empty();
    if (isHost) {
        $.each(players,function(p) {
            $('<li/>').html(players[p]+'<span class="removePlayer">x</span><a class="playerName" style="display:none;">'+players[p]+'</a>').appendTo(pList);
        });
        $(".removePlayer").each(function() {
            $(this).click(function() {
                var playerToRemove = $(this).next().text();
                socket.emit('removePlayer',playerToRemove);
                console.log("removed " + playerToRemove);
            });
        });
    }
    else {
        $.each(players,function(p) {
            $('<li/>').text(players[p]).appendTo(pList);
        });
    }

    if (!players.includes(userName)) {
        console.log("this session has been removed.");
        leaveLobby();
    }
});

socket.on('startingGame', function(playerList) {
    players = playerList;
});

socket.on('yourName',function(name) {
    userName = name;
});

socket.on('roomCode', function(roomCode) {
    $("#roomCodeDisplay").text("Room Code: " + roomCode);
});

socket.on('delete_cookie', (cookie) => {
    document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
});


// When leave btn pressed, tell server to leave lobby
function leaveLobby() {
    console.log('leaving lobby');
    delete_cookie("name");
    delete_cookie("roomCode");
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