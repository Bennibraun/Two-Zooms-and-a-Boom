

// listens for messages on a specific channel
var socket = io();

// Tell the server to instantiate a player
socket.emit('new player');

var userName = '';
var isHost = false;
var players;
var cardsInPlay = {room:"",cards:{}};

socket.on('host', function(data) {
    console.log("user set as host.");
    isHost = true;
    
    // Show host-only setup and such
    $("#hostCardSelection").css("display","block");
});

socket.on('isPlayer',function(isPlayer) {
    isHost = false;
    $("#cardSetupBottom").remove();
    $("#cardPreviewRow").css("height","90%");
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

socket.on('cards',function(cards) {
    cardsInPlay = cards;
    console.log(cards);
    drawCards();
});

socket.on('startingGame', function(playerList) {
    players = playerList;
    $(".startButton").click();
});

socket.on('yourName',function(name) {
    userName = name;
});

socket.on('roomCode', function(roomCode) {
    $("#roomCodeDisplay").text("Room Code: " + roomCode);
    cardsInPlay['room'] = roomCode;
});

socket.on('delete_cookie', (cookie) => {
    document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
});


function selectCard(src, cardName) {
    if (!isHost) {
        console.log("You shouldn't be able to do this!");
        return;
    }
    
    if (cardsInPlay['cards'][cardName]) {
        console.log("Card is already in play.");
        return;
    }

    // Add card to setup
    cardsInPlay['cards'][cardName] = {url:src};
    drawCards();
    
    var li = $("#cardsList li").filter(function() {
        return $(this).children("a")[0].text == cardName;
    });

    li.css("background-color","#1c1c1c");

    socket.emit('update cards',cardsInPlay);

}

function drawCards() {
    $("#cardPreviewPane").empty();
    $.each(Object.keys(cardsInPlay['cards']),function(i,cardName) {
        var src = cardsInPlay['cards'][cardName].url;
        if (isHost) {
            // Host version allows deletion
            $("#cardPreviewPane").append('<div class="col-sm-4 card"><img src="'+src+'" class="cardPreviewImg"><a class="unselectable">'+cardName+'</a><img src="/static/delete_x.png" class="cardDelete"></div>');
        }
        else {
            // Player version doesn't have red x and can't delete
            $("#cardPreviewPane").append('<div class="col-sm-4 card"><img src="'+src+'" class="cardPreviewImg"><a class="unselectable">'+cardName+'</a></div>');
        }
    });

    if (isHost) {
        $(".card").unbind('click').click(function() {
            deselectCard($(this).children("img")[0].getAttribute("src"));
        });
    }
}

function deselectCard(src) {
    console.log($(".card"));
    var card = $(".card").filter(function() {
        return $(this).children("img")[0].getAttribute("src") == src;
    });
    console.log(card);
    delete cardsInPlay['cards'][$(card[0]).children("a")[0].text];
    card[0].remove();
    socket.emit('update cards',cardsInPlay);
}


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