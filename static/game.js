

// listens for messages on a specific channel
var socket = io();

// Tell the server to instantiate a player
socket.emit('new player');

var userName = '';
var isHost = false;
var players;
var cardsInPlay = {room:"",cards:{}};
var timerRunning = false;
var timer;
var clientDesynced = true;


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
        console.log('host');
        $.each(players,function(p) {
            if (players[p] == userName) {
                $('<li/>').text(players[p]).appendTo(pList);
            } else {
                $('<li/>').html(players[p]+'&nbsp;&nbsp;&nbsp;&nbsp;<span class="removePlayer">x</span><a class="playerName" style="display:none;">'+players[p]+'</a>').appendTo(pList);
            }
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

socket.on('askForCard',function(c) {
    console.log('asking for card');
    socket.emit('assignMyCard',userName);
});

socket.on('heresYourCard',function(card) {
    console.log(card);
    document.cookie = "myCard="+card.url;
    $("#playerCardImg").attr("src",card.url);
    console.log("The src of your card was set to " + card.url);
});

socket.on('start timer',function(params) {
    console.log(params);
    startTimer(params.timerLength,params.startTime);
});

function startTimer(length, startTime) {
    if (timerRunning) {
        return;
    } else {
        timerRunning = true;
    }

    var timer = setInterval(function() {
        var time = Math.ceil(length - ((Date.now()/1000) - startTime)); // milliseconds elapsed since start
        if (time <= 0) {
            clearInterval(timer);
        }
        if (clientDesynced) {
            socket.emit('client synced','');
            clientDesynced = false;
        }
        var clockText = '';
        clockText += parseInt(time / 60);
        clockText += ':';
        var min = time % 60;
        if (min < 10) {
            clockText += '0';
        }
        clockText += parseInt(min);

        $("#timer").text(clockText);
    }, 1000); // update about every second
}

socket.on('stop timer',function() {
    timerRunning = false;
    clearInterval(timer);
});


socket.on('startingGame', function(playerList) {
    console.log('game started');
    players = playerList;
    $(".startButton").click();
});

socket.on('yourName',function(name) {
    console.log(name);
    userName = name;
});

socket.on('roomCode', function(roomCode) {
    $("#roomCodeDisplay").text("Room Code: " + roomCode);
    cardsInPlay['room'] = roomCode;
    // Show link to join
    $("#joinLink").text("http://twozoomsandaboom.com/joinCode/"+roomCode);
});

socket.on('delete_cookie', function(cookie) {
    document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
});

socket.on('error message', function(msg) {
    alert(msg);
});

function attemptStart() {
    socket.emit('start game','');
}

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
        console.log('cards: '+Object.keys(cardsInPlay['cards']).length+', players: '+players.length);
        if (Object.keys(cardsInPlay['cards']).length < players.length) {
            $("#numCards").text("Still need " + (players.length-Object.keys(cardsInPlay['cards']).length).toString() + " card(s).");
            socket.emit('cards balanced',false);
        }
        else if (Object.keys(cardsInPlay['cards']).length > players.length) {
            $("#numCards").text("You've selected " + (Object.keys(cardsInPlay['cards']).length-players.length).toString() + " too many card(s)!");
            socket.emit('cards balanced',false);
        }
        else {
            $("#numCards").text("Card selection is balanced!");
            socket.emit('cards balanced',true);
        }
    }
}

function deselectCard(src) {
    console.log($(".card"));
    var card = $(".card").filter(function() {
        return $(this).children("img")[0].getAttribute("src") == src;
    });
    cardName = $(card[0]).children("a")[0].text;
    delete cardsInPlay['cards'][cardName];
    card[0].remove();
    socket.emit('update cards',cardsInPlay);
    var li = $("#cardsList li").filter(function() {
        return $(this).children("a")[0].text == cardName;
    });
    li.css("background-color","#3b3b3b");
}


// When leave btn pressed, tell server to leave lobby
function leaveLobby() {
    console.log('leaving lobby');
    delete_cookie("name");
    delete_cookie("roomCode");
    delete_cookie("myCard");
    socket.emit('leaveRoom','');
    location.href = "/";
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