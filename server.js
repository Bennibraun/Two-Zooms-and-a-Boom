//* GREEN
//! RED
//? BLUE
// TODO:
//// DEPRECATED

//? Dependencies
var express = require("express");
var http = require("http");
var path = require("path");
var socketIO = require("socket.io");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cookie = require("cookie");
const { exists } = require("fs");
const { uniqueNamesGenerator, starWars } = require("unique-names-generator");

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set("port", 5000);
app.use("/static", express.static(__dirname + "/static"));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//? Global vars
var rooms = [];
var newPlayers = [];
var cardsBalanced = false;
var timerRunning = false;
var clientsDesynced = true;

//* Declare cards
{
  cards = [
    { name: "Agent (Blue)", color: "blue", url: "agent_blue" },
    { name: "Ambassador (Blue)", color: "blue", url: "ambassador_blue" },
    { name: "Angel (Blue)", color: "blue", url: "angel_blue" },
    { name: "Blind (Blue)", color: "blue", url: "blind_blue" },
    { name: "Bouncer (Blue)", color: "blue", url: "bouncer_blue" },
    { name: "Clown (Blue)", color: "blue", url: "clown_blue" },
    { name: "Conman (Blue)", color: "blue", url: "conman_blue" },
    { name: "Coyboy (Blue)", color: "blue", url: "coyboy_blue" },
    { name: "Criminal (Blue)", color: "blue", url: "criminal_blue" },
    { name: "Dealer (Blue)", color: "blue", url: "dealer_blue" },
    { name: "Blue Team", color: "blue", url: "default_blue" },
    { name: "Demon (Blue)", color: "blue", url: "demon_blue" },
    { name: "Doctor (Blue)", color: "blue", url: "doctor_blue" },
    { name: "Enforcer (Blue)", color: "blue", url: "enforcer_blue" },
    { name: "Eris (Blue)", color: "blue", url: "eris_blue" },
    { name: "Mayor (Blue)", color: "blue", url: "mayor_blue" },
    { name: "Medic (Blue)", color: "blue", url: "medic_blue" },
    { name: "Mime (Blue)", color: "blue", url: "mime_blue" },
    { name: "Mummy (Blue)", color: "blue", url: "mummy_blue" },
    { name: "Negotiator (Blue)", color: "blue", url: "negotiator_blue" },
    { name: "Nurse (Blue)", color: "blue", url: "nurse_blue" },
    { name: "Paparazzo (Blue)", color: "blue", url: "paparazzo_blue" },
    { name: "Paranoid (Blue)", color: "blue", url: "paranoid_blue" },
    { name: "President (Blue)", color: "blue", url: "president_blue" },
    {
      name: "President's Daughter (Blue)",
      color: "blue",
      url: "presidentsdaughter_blue",
    },
    { name: "Psychologist (Blue)", color: "blue", url: "psychologist_blue" },
    { name: "Red Spy (Blue)", color: "blue", url: "redspy_blue" },
    { name: "Security (Blue)", color: "blue", url: "security_blue" },
    { name: "Shyguy (Blue)", color: "blue", url: "shyguy_blue" },
    { name: "Thug (Blue)", color: "blue", url: "thug_blue" },
    { name: "Tuesday Knight (Blue)", color: "blue", url: "tuesdayknight_blue" },
    { name: "Usurper (Blue)", color: "blue", url: "usurper_blue" },
    { name: "Ambassador (Red)", color: "red", url: "ambassador_red" },
    { name: "Angel (Red)", color: "red", url: "angel_red" },
    { name: "Blue Spy (Red)", color: "red", url: "bluespy_red" },
    { name: "Bomber (Red)", color: "red", url: "bomber_red" },
    { name: "Blind (Red)", color: "red", url: "blind_red" },
    { name: "Bouncer (Red)", color: "red", url: "bouncer_red" },
    { name: "Clown (Red)", color: "red", url: "clown_red" },
    { name: " (Red)", color: "red", url: "blind_red" },
    { name: "Conman (Red)", color: "red", url: "conman_red" },
    { name: "Coyboy (Red)", color: "red", url: "coyboy_red" },
    { name: "Criminal (Red)", color: "red", url: "criminal_red" },
    { name: "Cupid (Red)", color: "red", url: "cupid_red" },
    { name: "Dealer (Red)", color: "red", url: "dealer_red" },
    { name: "Red Team", color: "red", url: "default_red" },
    { name: "Demon (Red)", color: "red", url: "demon_red" },
    { name: "Dr. Boom (Red)", color: "red", url: "drboom_red" },
    { name: "Enforcer (Red)", color: "red", url: "enforcer_red" },
    { name: "Engineer (Red)", color: "red", url: "engineer_red" },
    { name: "Immunologist (Red)", color: "red", url: "immunologist_red" },
    { name: "Martyr (Red)", color: "red", url: "martyr_red" },
    { name: "Mayor (Red)", color: "red", url: "mayor_red" },
    { name: "Medic (Red)", color: "red", url: "medic_red" },
    { name: "Mime (Red)", color: "red", url: "mime_red" },
    { name: "Mummy (Red)", color: "red", url: "mummy_red" },
    { name: "Negotiator (Red)", color: "red", url: "negotiator_red" },
    { name: "Paparazzo (Red)", color: "red", url: "paparazzo_red" },
    { name: "Paranoid (Red)", color: "red", url: "paranoid_red" },
    { name: "Psychologist (Red)", color: "red", url: "psychologist_red" },
    { name: "Security (Red)", color: "red", url: "security_red" },
    { name: "Shyguy (Red)", color: "red", url: "shyguy_red" },
    { name: "Thug (Red)", color: "red", url: "thug_red" },
    { name: "Tinkerer (Red)", color: "red", url: "tinkerer_red" },
    { name: "Usurper (Red)", color: "red", url: "usurper_red" },
    { name: "Agoraphobe", color: "grey", url: "agoraphobe" },
    { name: "Ahab", color: "grey", url: "ahab" },
    { name: "Anarchist", color: "grey", url: "anarchist" },
    { name: "Bomb Bot", color: "grey", url: "bombbot" },
    { name: "Butler", color: "grey", url: "butler" },
    { name: "Clone", color: "grey", url: "clone" },
    { name: "Decoy", color: "grey", url: "decoy" },
    { name: "Drunk", color: "grey", url: "drunk" },
    { name: "Gambler", color: "grey", url: "gambler" },
    { name: "Hot Potato", color: "grey", url: "hotpotato" },
    { name: "Intern", color: "grey", url: "intern" },
    { name: "Invincible", color: "grey", url: "invincible" },
    { name: "Juliet", color: "grey", url: "juliet" },
    { name: "Leprechaun (Green)", color: "green", url: "leprechaun_green" },
    { name: "Maid", color: "grey", url: "maid" },
    { name: "Mastermind", color: "grey", url: "mastermind" },
    { name: "MI6", color: "grey", url: "mi6" },
    { name: "Minion", color: "grey", url: "minion" },
    { name: "Mistress", color: "grey", url: "mistress" },
    { name: "Moby", color: "grey", url: "moby" },
    { name: "Nuclear Tyrant", color: "grey", url: "nucleartyrant" },
    { name: "Private Eye", color: "grey", url: "privateeye" },
    { name: "Queen", color: "grey", url: "queen" },
    { name: "Rival", color: "grey", url: "rival" },
    { name: "Robot", color: "grey", url: "robot" },
    { name: "Romeo", color: "grey", url: "romeo" },
    { name: "Sniper", color: "grey", url: "sniper" },
    { name: "Survivor", color: "grey", url: "survivor" },
    { name: "Target", color: "grey", url: "target" },
    { name: "Traveler", color: "grey", url: "traveler" },
    { name: "Victim", color: "grey", url: "victim" },
    { name: "Wife", color: "grey", url: "wife" },
    { name: "Zombie (Green)", color: "green", url: "zombie_green" },
  ];
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

function createRoom(roomCode) {
  rooms.push({
    code: roomCode,
    host: "",
    cards: [],
    subroomA: { players: [], leader: "" },
    subroomB: { players: [], leader: "" },
  });
}

//* Returns the first matching room given the room code
function getRoom(roomCode) {
  return rooms.find(function (room) {
    return room.code == roomCode;
  });
}

//* Returns the player with the given name in the given room
function getPlayer(roomCode, name) {
  var room = getRoom(roomCode);
  return (
    room.subroomA.players.find(function (p) {
      return p.name == name;
    }) ||
    room.subroomB.players.find(function (p) {
      return p.name == name;
    })
  );
}

//* Returns the player with the given name from the newPlayer list
function getNewPlayer(name) {
  return newPlayers.find(function (p) {
    p.name == name;
  });
}

//* Returns a 2D array of all players in a room, split by subroom
function getPlayerNames(roomCode) {
  var names = [[], []];
  var room = getRoom(roomCode);
  room.subroomA.players.forEach(function (p) {
    names[0].push(p.name);
  });
  room.subroomB.players.forEach(function (p) {
    names[1].push(p.name);
  });
  return names;
}

//* Deletes a specified player from the specified room
function deletePlayer(roomCode, name) {
  var room = getRoom(roomCode);
  room.subroomA.players = room.subroomA.players.filter(function (p) {
    return p.name != name;
  });
  room.subroomB.players = room.subroomB.players.filter(function (p) {
    return p.name != name;
  });
}

function deleteAllCookies() {
  res.cookie("name", name, { expires: new Date(Date.now() - 1) });
  res.cookie("roomCode", roomCode, { expires: new Date(Date.now() - 1) });
}

//? Routing
app.get("/", function (req, res) {
  try {
    var name = req.cookies.name;
    var roomCode = req.cookies.roomCode;
    var room = getRoom(roomCode);
    var player = getPlayer(roomCode, name);
    if (room && player) {
      //* Player detected, sending to lobby
      res.sendFile(path.join(__dirname, "lobby.html"));
    } else {
      //* Delete cookies, reset
      console.log("Failed to find room or player.");
      deleteAllCookies();
    }
  } catch {
    console.log("sending new user to landing page.");
  }

  res.sendFile(path.join(__dirname, "landing_page.html"));
});

app.get("/join", function (req, res) {
  var username = req.query.nameInput;
  var roomCode = req.query.joinCodeInput;
  var tempName = req.cookies.name;

  //* If player already exists...
  if (getPlayer(roomCode, username)) {
    // TODO: maybe make a version of landing page that's identical except for the username taken error
    res.sendFile(path.join(__dirname, "landing_page.html"));
  }

  //* If room wasn't found...
  if (!getRoom(roomCode)) {
    // TODO: maybe make a version of landing page that's identical except for the room not found error
    console.log("Failed to find room " + roomCode);
    res.sendFile(path.join(__dirname, "landing_page.html"));
  }

  //* Bake some fresh cookies
  res.cookie("name", username, { expires: new Date(Date.now() + 100000000) });
  res.cookie("roomCode", roomCode, {
    expires: new Date(Date.now() + 100000000),
  });

  //* If the player hasn't been named and assigned yet, do it here
  var newPlayer = getNewPlayer(tempName);
  if (newPlayer) {
    //* Give proper name
    newPlayer.name = username;
    //* Add to proper room
    getRoom(roomCode).subroomA.players.push(newPlayer);
    //* Remove from new players list
    newPlayers = newPlayers.filter(function (p) {
      return p.name != tempName;
    });
  }

  io.to(getPlayer(roomCode, username).clientID).emit("roomCode", roomCode);

  res.redirect("/");
});

app.get("/joinCode/:room", function (req, res) {
  res.cookie("roomCode", req.params.room);
  console.log("set room code to " + req.params.room);
  res.redirect("/");
});

app.get("/host", function (req, res) {
  var username = req.query.nameInput;
  var tempName = req.cookies.name;

  //* Random lobby code string
  var roomCode = Math.random().toString(36).substring(2, 6);

  //* Grandma brought some more cookies!
  res.cookie("name", username, { expires: new Date(Date.now() + 100000000) });
  res.cookie("roomCode", roomCode, {
    expires: new Date(Date.now() + 100000000),
  });

  //* Create the room
  createRoom(roomCode);

  //* If the player hasn't been named and assigned yet, do it here
  var newPlayer = getNewPlayer(tempName);
  if (newPlayer) {
    //* Give proper name
    newPlayer.name = username;
    //* Add to proper room
    getRoom(roomCode).subroomA.players.push(newPlayer);
    //* Remove from new players list
    newPlayers = newPlayers.filter(function (p) {
      return p.name != tempName;
    });
  } else {
    console.log("Weird, shouldn't be able to get here.");
  }

  io.to(getPlayer(roomCode, username).clientID).emit("roomCode", roomCode);

  res.redirect("/");
});

// Start the server
server.listen(process.env.PORT || 5000, function () {
  console.log("Server starting. Keep up the good work, Ben!");
});

app.get("/play", function (req, res) {
  var roomCode = req.cookies.roomCode;
  var room = getRoom(roomCode);

  // Assign cards to players randomly
  // First, check if all cards in room have been assigned
  var cardsAlreadyAssigned = true;
  room.subroomA.players.forEach(function (p) {
    if (p.card == "") {
      cardsAlreadyAssigned = false;
    }
  });

  if (cardsAlreadyAssigned) {
    console.log("cards already assigned.");
  } else {
    var cards = room.cardsInPlay;

    //* Shuffle the cards
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    //* Assign and distribute cards
    var i = 0;
    room.subroomA.players.forEach(function (p) {
      p.card = cards[i];
      io.to(p.clientID).emit("your identity", p);
      i++;
    });
    room.subroomB.players.forEach(function (p) {
      p.card = cards[i];
      io.to(p.clientID).emit("your identity", p);
      i++;
    });
  }

  startTimer(roomCode, 500);

  res.sendFile(path.join(__dirname, "play.html"));
});

// length in seconds
function startTimer(roomCode, length) {
  if (timerRunning) {
    return;
  } else {
    timerRunning = true;
  }
  var start = Date.now() / 1000;
  console.log("telling " + roomCode + " to start a timer of length " + length);
  io.to(roomCode).emit("start timer", {
    timerLength: length,
    startTime: start,
  });
  var timer = setInterval(function () {
    if (clientsDesynced) {
      console.log("attempting client sync");
      syncClients(roomCode, length, start);
    }
    var time = Math.ceil(length - (Date.now() / 1000 - start)); // milliseconds elapsed since start
    if (time <= 0) {
      clearInterval(timer);
    } else if (time % 60 == 0) {
      // Sync up clients once a minute
      console.log("sync up clients 60");
      clientsDesynced = true;
    } else if (length - time < 10) {
      // Sync up clients in the first 10 seconds
      console.log("sync up clients 10");
      clientsDesynced = true;
    } else {
      clientsDesynced = false;
    }
    // console.log('now: '+Date.now()/1000);
    // console.log('time: '+time);
  }, 1000); // update about every second
}

function syncClients(roomCode, length, start) {
  io.to(roomCode).emit("start timer", {
    timerLength: length,
    startTime: start,
  });
  io.to(roomCode).emit("askForCard", "");
}

// WebSocket handlers
io.on("connection", function (socket) {
  var cookies = cookie.parse(socket.handshake.headers.cookie);
  var username = cookies.name;
  if (!username) {
    username = uniqueNamesGenerator({ dictionaries: [starWars] });
    // Set to a different name if the random name is already taken
    while (getNewPlayer(username)) {
      username = uniqueNamesGenerator({ dictionaries: [starWars] });
    }
  }

  res.cookie("name", username, { expires: new Date(Date.now() + 100000000) });

  // Add new player object
  newPlayers.push({
    name: username,
    card: "",
    clientID: socket.id,
  });

  // Remove socket from the lobby
  socket.on("leaveRoom", function (data) {
    socket.leave(currentRoom);
    console.log("socket no longer in room");
    // Remove player from lists
    delete players[name];
    // Remove from room if in one
    if (rooms[currentRoom]) {
      rooms[currentRoom].players = rooms[currentRoom].players.filter(function (
        p
      ) {
        if (p != name) {
          return true;
        } else {
          return false;
        }
      });
    }

    // Update clients
    if (rooms[currentRoom]) {
      io.to(currentRoom).emit("players", rooms[currentRoom].players);
    }
  });

  socket.on("removePlayer", function (playerName) {
    delete players[playerName];
    // Remove from room if in one
    if (rooms[currentRoom]) {
      rooms[currentRoom].players = rooms[currentRoom].players.filter(function (
        p
      ) {
        if (p != playerName) {
          return true;
        } else {
          return false;
        }
      });
    }

    // Update clients
    io.to(currentRoom).emit("players", rooms[currentRoom].players);
  });

  socket.on("update cards", function (cardsInPlay) {
    room = cardsInPlay["room"];
    // Update server-side cards
    rooms[room].cardsInPlay = cardsInPlay;
    // Inform clients of card selection
    io.to(room).emit("cards", cardsInPlay);
  });

  socket.on("assignMyCard", function (userName) {
    // console.log("assigning card");
    console.log(players);
    console.log(players[userName]);
    socket.emit("heresYourCard", players[userName].card);
  });

  socket.on("cards balanced", function (balanced) {
    cardsBalanced = balanced;
  });

  socket.on("start game", function () {
    if (!cardsBalanced) {
      socket.emit(
        "alert message",
        "Couldn't start the game because the cards are imbalanced."
      );
    } else {
      socket.emit("go for start", "");
    }
  });

  socket.on("client synced", function () {
    console.log("clients synced up");
    clientsDesynced = false;
  });
});
