

// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var cookie = require("cookie");
const { exists } = require('fs');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port',5000);
app.use('/static', express.static(__dirname + '/static'));
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Utility FN
Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

// Global vars
var rooms = [];
rooms.push({
    code: 'default',
    subroomA: { players: [], leader: '' },
    subroomB: { players: [], leader: '' },
    hostName: ''
});

var cardsBalanced = false;
var timerRunning = false;
var clientsDesynced = true;

// Declare cards
{
cards['agent_blue'] = {name:"Agent (Blue)", color:"blue"};
cards['ambassador_blue'] = {name:"Ambassador (Blue)", color:"blue"};
cards['angel_blue'] = {name:"Angel (Blue)", color:"blue"};
cards['blind_blue'] = {name:"Blind (Blue)", color:"blue"};
cards['bouncer_blue'] = {name:"Bouncer (Blue)", color:"blue"};
cards['clown_blue'] = {name:"Clown (Blue)", color:"blue"};
cards['conman_blue'] = {name:"Conman (Blue)", color:"blue"};
cards['coyboy_blue'] = {name:"Coyboy (Blue)", color:"blue"};
cards['criminal_blue'] = {name:"Criminal (Blue)", color:"blue"};
cards['dealer_blue'] = {name:"Dealer (Blue)", color:"blue"};
cards['default_blue'] = {name:"Blue Team", color:"blue"};
cards['demon_blue'] = {name:"Demon (Blue)", color:"blue"};
cards['doctor_blue'] = {name:"Doctor (Blue)", color:"blue"};
cards['enforcer_blue'] = {name:"Enforcer (Blue)", color:"blue"};
cards['eris_blue'] = {name:"Eris (Blue)", color:"blue"};
cards['mayor_blue'] = {name:"Mayor (Blue)", color:"blue"};
cards['medic_blue'] = {name:"Medic (Blue)", color:"blue"};
cards['mime_blue'] = {name:"Mime (Blue)", color:"blue"};
cards['mummy_blue'] = {name:"Mummy (Blue)", color:"blue"};
cards['negotiator_blue'] = {name:"Negotiator (Blue)", color:"blue"};
cards['nurse_blue'] = {name:"Nurse (Blue)", color:"blue"};
cards['paparazzo_blue'] = {name:"Paparazzo (Blue)", color:"blue"};
cards['paranoid_blue'] = {name:"Paranoid (Blue)", color:"blue"};
cards['president_blue'] = {name:"President (Blue)", color:"blue"};
cards['presidentsdaughter_blue'] = {name:"President's Daughter (Blue)", color:"blue"};
cards['psychologist_blue'] = {name:"Psychologist (Blue)", color:"blue"};
cards['redspy_blue'] = {name:"Red Spy (Blue)", color:"blue"};
cards['security_blue'] = {name:"Security (Blue)", color:"blue"};
cards['shyguy_blue'] = {name:"Shyguy (Blue)", color:"blue"};
cards['thug_blue'] = {name:"Thug (Blue)", color:"blue"};
cards['tuesdayknight_blue'] = {name:"Tuesday Knight (Blue)", color:"blue"};
cards['usurper_blue'] = {name:"Usurper (Blue)", color:"blue"};
cards['ambassador_red'] = {name:"Ambassador (Red)", color:"red"};
cards['angel_red'] = {name:"Angel (Red)", color:"red"};
cards['bluespy_red'] = {name:"Blue Spy (Red)", color:"red"};
cards['bomber_red'] = {name:"Bomber (Red)", color:"red"};
cards['blind_red'] = {name:"Blind (Red)", color:"red"};
cards['bouncer_red'] = {name:"Bouncer (Red)", color:"red"};
cards['clown_red'] = {name:"Clown (Red)", color:"red"};
cards['blind_red'] = {name:" (Red)", color:"red"};
cards['conman_red'] = {name:"Conman (Red)", color:"red"};
cards['coyboy_red'] = {name:"Coyboy (Red)", color:"red"};
cards['criminal_red'] = {name:"Criminal (Red)", color:"red"};
cards['cupid_red'] = {name:"Cupid (Red)", color:"red"};
cards['dealer_red'] = {name:"Dealer (Red)", color:"red"};
cards['default_red'] = {name:"Red Team", color:"red"};
cards['demon_red'] = {name:"Demon (Red)", color:"red"};
cards['drboom_red'] = {name:"Dr. Boom (Red)", color:"red"};
cards['enforcer_red'] = {name:"Enforcer (Red)", color:"red"};
cards['engineer_red'] = {name:"Engineer (Red)", color:"red"};
cards['immunologist_red'] = {name:"Immunologist (Red)", color:"red"};
cards['martyr_red'] = {name:"Martyr (Red)", color:"red"};
cards['mayor_red'] = {name:"Mayor (Red)", color:"red"};
cards['medic_red'] = {name:"Medic (Red)", color:"red"};
cards['mime_red'] = {name:"Mime (Red)", color:"red"};
cards['mummy_red'] = {name:"Mummy (Red)", color:"red"};
cards['negotiator_red'] = {name:"Negotiator (Red)", color:"red"};
cards['paparazzo_red'] = {name:"Paparazzo (Red)", color:"red"};
cards['paranoid_red'] = {name:"Paranoid (Red)", color:"red"};
cards['psychologist_red'] = {name:"Psychologist (Red)", color:"red"};
cards['security_red'] = {name:"Security (Red)", color:"red"};
cards['shyguy_red'] = {name:"Shyguy (Red)", color:"red"};
cards['thug_red'] = {name:"Thug (Red)", color:"red"};
cards['tinkerer_red'] = {name:"Tinkerer (Red)", color:"red"};
cards['usurper_red'] = {name:"Usurper (Red)", color:"red"};
cards['agoraphobe'] = {name:"Agoraphobe", color:"grey"};
cards['ahab'] = {name:"Ahab", color:"grey"};
cards['anarchist'] = {name:"", color:"grey"};
cards['bombbot'] = {name:"Bomb Bot", color:"grey"};
cards['butler'] = {name:"Butler", color:"grey"};
cards['clone'] = {name:"Clone", color:"grey"};
cards['decoy'] = {name:"Decoy", color:"grey"};
cards['drunk'] = {name:"Drunk", color:"grey"};
cards['gambler'] = {name:"Gambler", color:"grey"};
cards['hotpotato'] = {name:"Hot Potato", color:"grey"};
cards['intern'] = {name:"Intern", color:"grey"};
cards['invincible'] = {name:"Invincible", color:"grey"};
cards['juliet'] = {name:"Juliet", color:"grey"};
cards['leprechaun_green'] = {name:"Leprechaun (Green)", color:"green"};
cards['maid'] = {name:"Maid", color:"grey"};
cards['mastermind'] = {name:"Mastermind", color:"grey"};
cards['mi6'] = {name:"MI6", color:"grey"};
cards['minion'] = {name:"Minion", color:"grey"};
cards['mistress'] = {name:"Mistress", color:"grey"};
cards['moby'] = {name:"Moby", color:"grey"};
cards['nucleartyrant'] = {name:"Nuclear Tyrant", color:"grey"};
cards['privateeye'] = {name:"Private Eye", color:"grey"};
cards['queen'] = {name:"Queen", color:"grey"};
cards['rival'] = {name:"Rival", color:"grey"};
cards['robot'] = {name:"Robot", color:"grey"};
cards['romeo'] = {name:"Romeo", color:"grey"};
cards['sniper'] = {name:"Sniper", color:"grey"};
cards['survivor'] = {name:"Survivor", color:"grey"};
cards['target'] = {name:"Target", color:"grey"};
cards['traveler'] = {name:"Traveler", color:"grey"};
cards['victim'] = {name:"Victim", color:"grey"};
cards['wife'] = {name:"Wife", color:"grey"};
cards['zombie_green'] = {name:"Zombie (Green)", color:"green"};
}


function sleep(milliseconds) { 
    let timeStart = new Date().getTime(); 
    while (true) { 
      let elapsedTime = new Date().getTime() - timeStart; 
      if (elapsedTime > milliseconds) { 
        break; 
      } 
    } 
}

// Returns the first matching room given the room code
function getRoom(roomCode) {
    return rooms.find(function(room) {
        return room.code == roomCode;
    });
}

// Returns the player with the given name in the given room
function getPlayer(roomCode, name) {
    var room = getRoom(roomCode);
    return room.players.find(function(p) {
        return p.name == name;
    });
}

function deletePlayer(roomCode, name) {
    var room = getRoom(roomCode);
    room.subroomA.players = room.subroomA.players.filter(function(p) {
        return p.name != name;
    });
    room.subroomB.players = room.subroomB.players.filter(function(p) {
        return p.name != name;
    });
}

function deleteAllCookies() {
    res.cookie('name', name, { expires: new Date(Date.now()-1) });
    res.cookie('roomCode', roomCode, { expires: new Date(Date.now()-1) });
}

// Routing
app.get('/', function(req, res) {
    try {
        var name = req.cookies.name;
        var roomCode = req.cookies.roomCode;
        var room = getRoom(roomCode);
        var player = getPlayer(roomCode,name);

        if (room && player) {
            // Player detected, sending to lobby
            res.sendFile(path.join(__dirname, 'lobby.html'));
            return;
        } else {
            // Delete cookies, reset
            deleteAllCookies();
        }
    } catch {
        console.log("sending new user to landing page.");
    }

    res.sendFile(path.join(__dirname, 'landing_page.html'));
    return;
});


app.get('/join', function(req, res) {
    var username = req.query.nameInput;
    var roomCode = req.query.joinCodeInput;

    // If player already exists...
    if (getPlayer(roomCode,username)) {
        // TODO: check if this works at all lol
        res.send('<script>alert("There can only be one '+username+', and it\'s not you.")</script>');
        // res.sendFile(path.join(__dirname, 'landing_page.html'));
    }
    
    // If room wasn't found...
    if (!getRoom(roomCode)) {
        console.log("Failed to find room "+roomCode);
        res.send('<script>alert("If a room is not in our archives, it simply does not exist.")</script>');
        // res.sendFile(path.join(__dirname, 'landing_page.html'));
    }

    // Bake some fresh cookies
    res.cookie('name', username, { expires: new Date(Date.now()+100000000) });
    res.cookie('roomCode', roomCode, { expires: new Date(Date.now()+100000000) });

    if (!getPlayer(roomCode,username)) {
        var existingPlayer = getPlayer('default',username);
        if (existingPlayer) {
            getRoom(roomCode).subroomA.players.push(existingPlayer);
            deletePlayer('default',username);
        }
        getRoom(roomCode).subroomA.players.push({
            name: username,
            card: 'None',
            clientID:
        });
    }
    res.redirect('/');
    return;
});

app.get('/joinCode/:room',function(req,res) {
    res.cookie('roomCode', req.params.room);
    console.log('set room code to '+req.params.room);
    res.redirect('/');
});


app.get('/host', function(req, res) {
    var name = req.query.nameInput;
    if (players[name]) {
        console.log("Name taken. Try again.");
        res.sendFile(path.join(__dirname, 'landing_page.html'));
    }
    console.log(name);
    res.cookie('name',name, { expires: new Date(Date.now()+100000000) });
    
    // Random lobby code string
    var roomCode = Math.random().toString(36).substring(2, 6);
    // console.log(roomCode);
    // TODO: Remove later
    // roomCode = "lnbg";
    
    res.cookie('roomCode', roomCode, { expires: new Date(Date.now()+100000000) });
    
    io.to(roomCode).emit('roomCode',roomCode);
    
    rooms[roomCode] = {players:[name], cardsInPlay:{}, started:false};
    
    if (!players[name]) {
        players[name] = {
            card: 'None',
            room: roomCode,
            isLeader: false,
            isHost: true
        }
    }
    res.redirect('/');
});


// Start the server
server.listen(process.env.PORT || 5000, function() {
    console.log('Starting server');
});


app.get('/play',function(req,res) {

    //TODO: Add in case for card burial
    if (!cardsBalanced) {
        res.redirect('/');
        return;
    }

    // Tell all clients in room that the game's starting
    var roomCode = req.cookies.roomCode;
    var room = rooms[roomCode];

    var roomPlayers = {};
    Object.keys(players).forEach(function(pName) {
        if (players[pName].room == roomCode) {
            roomPlayers[pName] = (players[pName]);
        }
    });

    if (!room.started) {
        io.to(roomCode).emit('startingGame',roomPlayers);
        room.started = true;
    }

    // Assign cards to players randomly
    // First, check if all cards in room have been assigned
    var cardsAlreadyAssigned = true;
    room.players.forEach(function(pName) {
        if (players[pName].card == 'None') {
            cardsAlreadyAssigned = false;
        }
    });

    if (cardsAlreadyAssigned) {
        console.log("cards already assigned.");
    }
    else {
        var cards = room.cardsInPlay.cards;
        console.log(roomPlayers);
        var cardKeys = Object.keys(cards);
        cardKeys.sort(function(a,b) {return Math.random() - 0.5;});
        var playerKeys = Object.keys(roomPlayers);
        var i = 0;
        cardKeys.forEach(function(k) {
            try {
                // k is the name of the card, cards[k].url has image link
                console.log('setting player card for '+ playerKeys[i]+': name='+k+', url='+cards[k].url);
                // Set card for both room players list and global players list
                roomPlayers[playerKeys[i]].card = {name:k,url:cards[k].url};
                players[playerKeys[i]].card = {name:k,url:cards[k].url};
            }
            catch {
                console.log('looks like all cards have been assigned with at least 1 left over');
            }
            i++;
        });

        console.log(roomPlayers);

        console.log('telling players to ask for their card');
        io.to(roomCode).emit('askForCard', '');
    }

    startTimer(roomCode,500);
    
    res.sendFile(path.join(__dirname, 'play.html'));
});

// length in seconds
function startTimer(roomCode,length) {
    if (timerRunning) {
        return;
    } else {
        timerRunning = true;
    }
    var start = Date.now() / 1000;
    console.log("telling "+roomCode+" to start a timer of length "+length);
    io.to(roomCode).emit('start timer',{timerLength:length, startTime:start});
    var timer = setInterval(function() {
        if (clientsDesynced) {
            console.log('attempting client sync');
            syncClients(roomCode,length,start);
        }
        var time = Math.ceil(length - ((Date.now()/1000) - start)); // milliseconds elapsed since start
        if (time <= 0) {
            clearInterval(timer);
        }
        else if (time % 60 == 0) {
            // Sync up clients once a minute
            console.log('sync up clients 60');
            clientsDesynced = true;
        }
        else if (length-time < 10) {
            // Sync up clients in the first 10 seconds
            console.log('sync up clients 10');
            clientsDesynced = true;
        }
        else {
            clientsDesynced = false;
        }
        // console.log('now: '+Date.now()/1000);
        // console.log('time: '+time);
    }, 1000); // update about every second
}

function syncClients(roomCode,length,start) {
    io.to(roomCode).emit('start timer',{timerLength:length, startTime:start});
    io.to(roomCode).emit('askForCard','');
}

// WebSocket handlers
io.on('connection', function(socket) {
    var cookies = cookie.parse(socket.handshake.headers.cookie);
    var username = cookies.name;
    var roomCode = cookies.roomCode;

    // Create player object
    var player = {
        name: username,
        card: '',
        clientID: socket.id
    }

    var room = getRoom(roomCode);
    if (room) {
        // Place player in existing room (default to subroomA until assignment)
        room.subroomA.players.push(player);
    } else {
        // Place player in default room to await assignment
        room = getRoom('default');
        room.subroomA.players.push(player);
    }

    // Remove socket from the lobby
    socket.on('leaveRoom',function(data) {
        socket.leave(currentRoom);
        console.log('socket no longer in room');
        // Remove player from lists
        delete players[name];
        // Remove from room if in one
        if (rooms[currentRoom]) {
            rooms[currentRoom].players = rooms[currentRoom].players.filter(function(p) {
                if (p != name) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }

        // Update clients
        if (rooms[currentRoom]) {
            io.to(currentRoom).emit('players', rooms[currentRoom].players);
        }
    });

    socket.on('removePlayer',function(playerName) {
        delete players[playerName];
        // Remove from room if in one
        if (rooms[currentRoom]) {
            rooms[currentRoom].players = rooms[currentRoom].players.filter(function(p) {
                if (p != playerName) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }

        // Update clients
        io.to(currentRoom).emit('players', rooms[currentRoom].players);
    });

    socket.on('update cards',function(cardsInPlay) {
        room = cardsInPlay['room'];
        // Update server-side cards
        rooms[room].cardsInPlay = cardsInPlay;
        // Inform clients of card selection
        io.to(room).emit('cards',cardsInPlay);
    });

    socket.on('assignMyCard',function(userName) {
        // console.log("assigning card");
        console.log(players);
        console.log(players[userName]);
        socket.emit('heresYourCard',players[userName].card);
    });

    socket.on('cards balanced',function(balanced) {
        cardsBalanced = balanced;
    });

    socket.on('start game', function() {
        if (!cardsBalanced) {
            socket.emit('alert message','Couldn\'t start the game because the cards are imbalanced.');
        }
    });

    socket.on('client synced', function() {
        console.log('clients synced up');
        clientsDesynced = false;
    });
});

