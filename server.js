

// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var cookie = require("cookie");
var $ = jQuery = require('jquery');

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
var players = {};
var cards = {};
var rooms = {};

// Declare cards
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



// Routing
app.get('/', function(req, res) {
    try {
        console.log(req.cookies);
        var name = req.cookies.name;
        if (name != undefined) {
            if (!players[name]) {
                // Delete cookies, reset
                console.log("resetting player");
                res.cookie('name',name, { expires: new Date(Date.now()-1) });
                res.cookie('roomCode', roomCode, { expires: new Date(Date.now()-1) });
                res.sendFile(path.join(__dirname, 'landing_page.html'));
            }
            else {
                console.log("user identified as " + name + ". Proceeding to index.");
                res.sendFile(path.join(__dirname, 'index.html'));
            }
            return;
        }
        else {
            console.log("No name found, sending to landing page. [2]");
        }
    } catch {
        console.log("No name found, sending to landing page.");
    }
    res.sendFile(path.join(__dirname, 'landing_page.html'));
});

app.get('/join', function(req, res) {
    var name = req.query.nameInput;
    var roomCode = req.query.joinCodeInput;
    if (players[name]) {
        console.log("Name taken. Try again.");
        res.sendFile(path.join(__dirname, 'landing_page.html'));
        return;
    }
    if (!rooms[roomCode]) {
        console.log("Room not found.");
        res.sendFile(path.join(__dirname, 'landing_page.html'));
        return;
    }
    console.log(name);
    res.cookie('name',name, { expires: new Date(Date.now()+100000000) });
    res.cookie('roomCode', roomCode, { expires: new Date(Date.now()+100000000) });

    if (!players[name]) {
        players[name] = {
            card: 'None',
            room: roomCode,
            isLeader: false,
            isHost: false
        }
    }
    res.redirect('/');
});

app.get('/play',function(req,res) {
    var roomCode = req.cookies.roomCode;
    if (!rooms[roomCode].started) {
        io.to(roomCode).emit('startingGame',players);
        rooms[roomCode].started = true;
    }

    res.sendFile(path.join(__dirname, 'play.html'));
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
    console.log(roomCode);

    res.cookie('roomCode', roomCode, { expires: new Date(Date.now()+100000000) });

    io.to(roomCode).emit('roomCode',roomCode);

    rooms[roomCode] = {players:[name], cardsInPlay:{}};

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


// WebSocket handlers
io.on('connection', function(socket) {
    var cookies = cookie.parse(socket.handshake.headers.cookie);
    var name = cookies.name;
    var currentRoom = cookies.roomCode;
    socket.on('new player', function() {
        if (!players[name]) {
            players[name] = {
                card: 'sampleCard',
                room: '',
                isLeader: false,
                isHost: false
            }
        }
        console.log(name + ": ");
        console.log(players[name]);

        // Add player to room
        for (room in rooms) {
            if (players[name].room == room) {
                console.log('room found.');
                if (!rooms[room].players.includes(name)) {
                    rooms[room].players.push(name);
                }
                currentRoom = room;
                socket.join(currentRoom);
                console.log('room joined')
                break;
            }
        }

        if (!currentRoom || !rooms[currentRoom]) {
            console.log("Room not found.");

        }
        else {
            // Tell client who's in the room
            socket.emit('yourName',name);
            io.to(currentRoom).emit('players', rooms[currentRoom].players);
            io.to(currentRoom).emit('roomCode',currentRoom);
            if (rooms[currentRoom].cardsInPlay['cards']) {
                io.to(currentRoom).emit('cards',rooms[currentRoom].cardsInPlay);
            }
        }

        if (players[name].isHost) {
            socket.emit('host','');
        }
        else {
            socket.emit('isPlayer','')
        }

    });

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
});