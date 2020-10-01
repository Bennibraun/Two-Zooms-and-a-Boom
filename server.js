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

//* Start the server
server.listen(process.env.PORT || 5000, function () {
  console.log("Server starting!");
});

//? Global vars
var rooms = [];
var newPlayers = [];

//* Declare cards
cards = [
  { name: "Agent (Blue)", color: "blue", url: "agent_blue" },
  { name: "Agent (Red)", color: "red", url: "agent_red" },
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
    buryCard: false,
    gameActive: false,
    subroomA: { players: [], leader: "", hostages: [], usurps: [] },
    subroomB: { players: [], leader: "", hostages: [], usurps: [] },
    timerStart: "",
    timerLengths: [],
    currentRound: 1,
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
  var player;
  try {
    player = room.subroomA.players.find(function (p) {
      return p.name == name;
    });
    if (!player) {
      player = room.subroomB.players.find(function (p) {
        return p.name == name;
      });
    }
  } catch {
    return null;
  }

  return player;
}

//* Returns the player with the given name from the newPlayer list
function getNewPlayer(name) {
  return newPlayers.find(function (p) {
    return p.name == name;
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

//* Returns the requested card object
function getCard(cardName) {
  var myCard;
  cards.forEach(function (card) {
    if (card.name == cardName) {
      myCard = card;
      return false;
    }
  });
  return myCard;
}

//? Routing
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/joinCode/:room", function (req, res) {
  res.cookie("roomCode", req.params.room);
  res.redirect("/");
});

function lobbyRefresh(roomCode) {
  var room = getRoom(roomCode);
  io.in(roomCode).emit("lobby refresh", {
    cardsSelected: room.cards,
    players: getPlayerNames(roomCode),
  });
}

function gameRefresh(roomCode) {
  timerRefresh(roomCode);
  io.to(roomCode).emit("game refresh", { players: getPlayerNames(roomCode) });
  leaderRefresh(roomCode);
}

function timerRefresh(roomCode) {
  var room = getRoom(roomCode);
  console.log("refreshing timer");
  console.log(
    "round: " +
      room.currentRound +
      ", length: " +
      room.timerLengths[room.currentRound - 1]
  );
  io.to(roomCode).emit("timer refresh", {
    start: room.timerStart,
    length: room.timerLengths[room.currentRound - 1],
    currentRound: room.currentRound,
  });
}

function leaderRefresh(roomCode) {
  var room = getRoom(roomCode);
  io.to(roomCode).emit("setting leaders", {
    subroomA: room.subroomA.leader,
    subroomB: room.subroomB.leader,
  });
}

function getNumHostages(roomCode) {
  var room = getRoom(roomCode);
  var numPlayers =
    getPlayerNames(roomCode)[0].length + getPlayerNames(roomCode)[1].length;
  if (numPlayers <= 10) {
    return 1;
  } else if (numPlayers <= 13) {
    switch (room.currentRound) {
      case 1:
      case 2:
        return 2;
      case 3:
      case 4:
      case 5:
        return 1;
    }
  } else if (numPlayers <= 17) {
    switch (room.currentRound) {
      case 1:
        return 3;
      case 2:
      case 3:
        return 2;
      case 4:
      case 5:
        return 1;
    }
  } else if (numPlayers <= 21) {
    switch (room.currentRound) {
      case 1:
        return 4;
      case 2:
        return 3;
      case 3:
        return 2;
      case 4:
      case 5:
        return 1;
    }
  } else {
    switch (room.currentRound) {
      case 1:
        return 5;
      case 2:
        return 4;
      case 3:
        return 3;
      case 4:
        return 2;
      case 5:
        return 1;
    }
  }
}

// WebSocket handlers
io.on("connection", function (socket) {
  //? Called anytime a browser connects to the server, even on refresh
  socket.on("new connection", function () {
    var username;
    var roomCode;
    try {
      var cookies = cookie.parse(socket.handshake.headers.cookie);
      username = cookies.name;
      roomCode = cookies.roomCode;
    } catch {
      console.log("looks like this guy doesn't have any cookies yet");
    }

    if (!username) {
      username = uniqueNamesGenerator({ dictionaries: [starWars] });
      //* Set to a different name if the random name is already taken
      while (getNewPlayer(username)) {
        username = uniqueNamesGenerator({ dictionaries: [starWars] });
      }
    }

    if (roomCode && getRoom(roomCode)) {
      var player;
      if ((player = getPlayer(roomCode, username))) {
        player.clientID = socket.id;
        player.roomCode = roomCode;
        socket.emit("your identity", player);
        socket.emit("room code", roomCode);
        var room = getRoom(roomCode);
        if (room.host == player.name) {
          socket.emit("you are host");
        }

        socket.join(roomCode);

        if (room.gameActive) {
          socket.emit("go to game", "");
          gameRefresh(roomCode);
        } else {
          socket.emit("go to lobby", "");
          lobbyRefresh(roomCode);
        }
        return;
      } else {
        console.log("player not found in room. Making new player.");
      }
    }

    player = getNewPlayer(username);

    if (!player) {
      // Add new player object
      newPlayers.push({
        name: username,
        card: "",
        clientID: socket.id,
      });
      socket.emit("set cookie", { name: "name", value: username });
    } else {
      player.clientID = socket.id;
    }
  });

  //? Called when the 'join' button is pressed
  socket.on("join room", function (data) {
    //* Find room
    data.roomCode = data.roomCode.toUpperCase();
    if (!data.roomCode || !getRoom(data.roomCode)) {
      socket.emit("alert", "Room not found. Try again.");
      return;
    }
    //* Prevent duplicate names
    var myRoom = getRoom(data.roomCode);
    var nameTaken = false;
    nameTaken =
      myRoom.subroomA.players.find(function (p) {
        return p.name == data.name;
      }) ||
      myRoom.subroomB.players.find(function (p) {
        return p.name == data.name;
      });
    if (nameTaken) {
      socket.emit("alert", "That name is already taken, try another one!");
      return;
    }

    //* Grandma brought some more cookies!
    socket.emit("set cookie", { name: "name", value: data.name });
    socket.emit("set cookie", { name: "roomCode", value: data.roomCode });

    socket.join(data.roomCode);

    var newPlayer = getNewPlayer(data.tempName);
    if (newPlayer) {
      //* Give proper name
      newPlayer.name = data.name;
      //* Add to proper room
      getRoom(data.roomCode).subroomA.players.push(newPlayer);
      //* Remove from new players list
      newPlayers = newPlayers.filter(function (p) {
        return p.name != newPlayer.name;
      });
    } else {
      console.log(
        "looks like the player who just joined never even existed, wtf?"
      );
    }
    socket.emit("your identity", newPlayer);
    socket.emit("room code", data.roomCode);
    socket.emit("go to lobby", "");
    lobbyRefresh(data.roomCode);
  });

  //? Called when the 'host' button is pressed
  socket.on("host room", function (data) {
    //* Random lobby code string
    var roomCode = Math.random().toString(36).substring(2, 6).toUpperCase();

    //* Grandma brought some more cookies!
    socket.emit("set cookie", { name: "name", value: data.username });
    socket.emit("set cookie", { name: "roomCode", value: roomCode });

    //* Create the room
    createRoom(roomCode);
    socket.join(roomCode);

    //* If the player hasn't been named and assigned yet, do it here
    var newPlayer = getNewPlayer(data.tempName);
    if (newPlayer) {
      //* Give proper name
      newPlayer.name = data.username;
      //* Add to proper room
      getRoom(roomCode).subroomA.players.push(newPlayer);
      //* Remove from new players list
      newPlayers = newPlayers.filter(function (p) {
        return p.name != newPlayer.name;
      });

      //* Set room host
      getRoom(roomCode).host = newPlayer.name;
    } else {
      console.log("Weird, shouldn't be able to get here.");
    }
    socket.emit("your identity", newPlayer);
    socket.emit("room code", roomCode);
    socket.emit("you are host", "");
    socket.emit("go to lobby", "");
    lobbyRefresh(roomCode);
  });

  //? Called when a host selects a card
  socket.on("select card", function (data) {
    var room = getRoom(data.roomCode);
    var card = getCard(data.cardName);
    if (card) {
      if (
        room.cards.filter(function (card) {
          return card.name == data.cardName;
        }).length < 1
      ) {
        // socket.emit("alert", "This card has already been selected.");
        room.cards.push(card);
        lobbyRefresh(data.roomCode);
      }
    } else {
      socket.emit("alert", "Card not found.");
    }
  });

  socket.on("deselect card", function (data) {
    getRoom(data.roomCode).cards = getRoom(data.roomCode).cards.filter(
      function (card) {
        return card.name != data.cardName;
      }
    );
    lobbyRefresh(data.roomCode);
  });

  //? Called when a specific user is removed from a room
  socket.on("leave room", function (data) {
    //* Remove player from room
    deletePlayer(data.roomCode, data.name);
    newPlayers.push({
      name: data.name,
      card: "",
      clientID: socket.id,
    });

    if (data.leaveSocketRoom) {
      socket.leave(data.roomCode);
    }

    //* Update clients
    if (getRoom(data.roomCode).gameActive) {
      gameRefresh(data.roomCode);
    } else {
      lobbyRefresh(data.roomCode);
    }
  });

  //? Called to begin the game for a specific room
  socket.on("start game", function (data) {
    var room = getRoom(data.roomCode);

    //* Check card selection
    var cardCount = room.subroomA.players.length + room.subroomB.players.length;
    if (room.buryCard) {
      cardCount += 1;
    }
    if (cardCount != room.cards.length) {
      socket.emit("alert", "Invalid number of cards.");
      return;
    }

    //* Shuffle cards
    for (var i = room.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = room.cards[i];
      room.cards[i] = room.cards[j];
      room.cards[j] = temp;
    }

    //* Distribute cards
    for (var i = 0; i < room.subroomA.players.length; i++) {
      room.subroomA.players[i].card = room.cards[i];
    }
    var playerList = room.subroomA.players.concat(room.subroomB.players);
    for (var i = 0; i < playerList.length; i++) {
      player = getPlayer(data.roomCode, playerList[i].name);
      io.to(player.clientID).emit("your card", player.card);
    }

    //* Randomly split rooms
    for (var i = room.subroomA.players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = room.subroomA.players[i];
      room.subroomA.players[i] = room.subroomA.players[j];
      room.subroomA.players[j] = temp;
    }
    var half = Math.ceil(room.subroomA.players.length / 2);
    room.subroomB.players = room.subroomA.players.splice(-half);
    room.subroomA.players = room.subroomA.players.splice(0, half);

    io.to(data.roomCode).emit(
      "let the game begin",
      getPlayerNames(data.roomCode)
    );

    room.gameActive = true;
    room.timerStart = Date.now() / 1000;
    room.timerLengths = data.timerLengths;
    timerRefresh(data.roomCode);
    gameRefresh(data.roomCode);
  });

  socket.on("bury card setting", function (data) {
    getRoom(data.roomCode).buryCard = data.buryCard;
  });

  socket.on("request color share", function (data) {
    var target = getPlayer(data.roomCode, data.target);
    io.to(target.clientID).emit("color share offer", data.self);
  });

  socket.on("accept color share", function (data) {
    var target = getPlayer(data.roomCode, data.target);
    var self = getPlayer(data.roomCode, data.self);
    io.to(target.clientID).emit("color share complete", {
      target: data.self,
      color: self.card.color,
    });
    io.to(self.clientID).emit("color share complete", {
      target: data.target,
      color: target.card.color,
    });
  });

  socket.on("request card share", function (data) {
    var target = getPlayer(data.roomCode, data.target);
    io.to(target.clientID).emit("card share offer", data.self);
  });

  socket.on("accept card share", function (data) {
    var target = getPlayer(data.roomCode, data.target);
    var self = getPlayer(data.roomCode, data.self);
    io.to(target.clientID).emit("card share complete", {
      target: data.self,
      cardName: self.card.name,
    });
    io.to(self.clientID).emit("card share complete", {
      target: data.target,
      cardName: target.card.name,
    });
  });

  socket.on("trade cards", function (data) {
    p1 = getPlayer(data.roomCode, data.self);
    p2 = getPlayer(data.roomCode, data.target);

    var tempCard = p1.card;
    p1.card = p2.card;
    p2.card = tempCard;
    io.to(p1.clientID).emit("your card", p1.card);
    io.to(p1.clientID).emit("card info", {
      playerName: p2.name,
      cardName: p2.card.name,
    });
    io.to(p2.clientID).emit("your card", p2.card);
    io.to(p2.clientID).emit("card info", {
      playerName: p1.name,
      cardName: p1.card.name,
    });
    gameRefresh(data.roomCode);
  });

  socket.on("initial leader selection", function (data) {
    console.log("setting leaders");

    var room = getRoom(data.roomCode);

    //* Look for the player in subroomA
    var player = room.subroomA.players.find(function (p) {
      return p.name == data.name;
    });

    //* If found in A, check if A has a leader already
    if (player && room.subroomA.leader == "") {
      room.subroomA.leader = data.name;
    } else if (room.subroomB.leader == "") {
      //* If not found in A, check if B has a leader already
      room.subroomB.leader = data.name;
    }

    leaderRefresh(data.roomCode);
  });

  socket.on("attempt usurp", function (data) {
    var room = getRoom(data.roomCode);
    var subroom;
    if (
      room.subroomA.players.find(function (p) {
        return p.name == data.name;
      })
    ) {
      subroom = room.subroomA;
    } else {
      subroom = room.subroomB;
    }

    //* If usurp object exists, make votes 0. Otherwise create it
    subroom.usurps.forEach(function (u) {
      if (u.name == data.name) {
        u.votes = 0;
      }
    });
    if (
      !subroom.usurps.find(function (u) {
        return u.name == data.name;
      })
    ) {
      subroom.usurps.push({ name: data.name, votes: 0 });
    }

    io.to(data.roomCode).emit("vote on usurp", data.name);
  });

  socket.on("vote submission", function (data) {
    var room = getRoom(data.roomCode);
    var subroom;
    if (
      room.subroomA.players.find(function (p) {
        return p.name == data.name;
      })
    ) {
      subroom = room.subroomA;
    } else {
      subroom = room.subroomB;
    }

    console.log(subroom.usurps);

    var usurp = subroom.usurps.find(function (u) {
      return u.name == data.name;
    });

    console.log(usurp);

    usurp.votes += 1;

    //* Check if vote threshold has been reached
    if (usurp.votes >= subroom.players.length / 2) {
      subroom.leader = data.name;
      io.to(data.roomCode).emit("setting leaders", {
        subroomA: room.subroomA.leader,
        subroomB: room.subroomB.leader,
      });
      //* Clear all current usurp attempts since one succeeded
      subroom.usurps = [];
    }
  });

  socket.on("hostage selection", function (data) {
    var room = getRoom(data.roomCode);
    var subroom;

    if (
      room.subroomA.players.find(function (p) {
        return p.name == data.hostages[0];
      })
    ) {
      subroom = room.subroomA;
    } else {
      subroom = room.subroomB;
    }

    subroom.hostages = data.hostages;
  });

  socket.on("timer done", function (roomCode) {
    var room = getRoom(roomCode);
    console.log("timer done for round " + room.currentRound);
    console.log(
      "checking if current round is last (out of " +
        room.timerLengths.length +
        " rounds)"
    );
    //* Check if last round
    if (room.currentRound == room.timerLengths.length) {
      //* Game over
      io.to(roomCode).emit("game over");
      //* Remove all clients from socket
      // io.sockets.clients(room).forEach(function (s) {
      //   s.leave(room);
      // });
      //* Annihilate the entire room
      rooms = rooms.filter(function (r) {
        return r.code != roomCode;
      });
    } else {
      //TODO: If failed to select hostages, select randoms

      //* Exchange hostages
      room.subroomA.hostages.forEach(function (name) {
        //* Delete player from room A, add to room B
        var tempPlayer = getPlayer(roomCode, name);
        deletePlayer(roomCode, name);
        room.subroomB.players.push(tempPlayer);
      });
      room.subroomB.hostages.forEach(function (name) {
        //* Delete player from room B, add to room A
        var tempPlayer = getPlayer(roomCode, name);
        deletePlayer(roomCode, name);
        room.subroomA.players.push(tempPlayer);
      });

      //* Advance round
      room.currentRound += 1;

      //* Brief respite between rounds
      if (room.timerLengths[room.currentRound - 1] > 0) {
        sleep(5000);
      }
      //* Restart timers
      room.timerStart = Date.now() / 1000;
      // io.to(roomCode).emit("timer refresh", {
      //   start: Date.now() / 1000,
      //   length: room.timerLengths[room.currentRound - 1],
      // });

      console.log("next round starting");
      console.log(room.currentRound);

      gameRefresh(roomCode);
    }
  });

  socket.on("end game", function (roomCode) {
    io.to(roomCode).emit("game over");
  });
});
