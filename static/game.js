// listens for messages on a specific channel
var socket = io();

// Tell the server to instantiate a player
socket.emit("new connection");

var meesa = {
  name: "",
  card: "",
  clientID: "",
  host: false,
  leader: false,
  roomCode: "",
};

var players;

myStorage = window.localStorage;

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

gen_cards = [
  { name: "gen_blue", color: "blue", url: "/card_teams/blue_team" },
  { name: "gen_red", color: "red", url: "/card_teams/red_team" },
  { name: "gen_grey", color: "grey", url: "/card_teams/grey_team" },
  { name: "gen_green", color: "green", url: "/card_teams/green_team_l" },
];

//* Proper Code

//* Socket listeners
{
  //? Tells a player personal info about themself
  socket.on("your identity", function (player) {
    // console.log(player);
    meesa.name = player.name;
    meesa.card = player.card;
    meesa.clientID = player.clientID;
  });

  socket.on("room code", function (roomCode) {
    meesa.roomCode = roomCode;
  });

  //? Refreshes the lobby's info:
  //? -Cards in play
  //? -Players in game
  socket.on("lobby refresh", function (data) {
    players = data.players;
    console.log(data.players);
    drawCards(data.cardsSelected, data.players);
    listPlayers(data.players);
    if (
      !data.players[0].find(function (p) {
        return p == meesa.name;
      }) &&
      !data.players[1].find(function (p) {
        return p == meesa.name;
      })
    ) {
      alert("You have been removed from the game. Sry m8 😕");
      leaveLobby();
    }
  });

  //? Sent to host to set identity
  socket.on("you are host", function () {
    meesa.host = true;
    showHostTools();
  });

  //? Tells a player to load into the landing page
  socket.on("go to landing page", function () {
    showLandingPage();
  });

  //? Tells a player to load into the lobby of their room
  socket.on("go to lobby", function () {
    showLobbyPage();
  });

  //? Tells a player to load into the active game room
  socket.on("go to game", function () {
    showGamePage();
  });

  //? Refreshes the current timer to ensure synchronicity
  socket.on("timer refresh", function (timer) {
    setTimer(timer.start, timer.length);
  });

  //? Officially starts the game
  socket.on("let the game begin", function (players) {
    //* Create localStorage system for player menu
    var playerData = [];
    console.log(players);
    players.forEach(function (subPlayers) {
      subPlayers.forEach(function (p) {
        playerData.push({ name: p, cardGuess: "", notes: "" });
      });
    });
    console.log(playerData);
    saveToStorage("playerData", playerData);

    //* Navigate to game room
    showGamePage();
  });

  //? Refreshes all info necessary to run the overall game, excluding individual actions
  socket.on("game refresh", function (game) {
    //* Determine which room to show
    var room;
    if (game.players[0].includes(meesa.name)) {
      room = 0;
    } else {
      room = 1;
    }
    drawPlayers(game.players[room]);
    console.log("refreshed");
  });

  //? Sets the given cookie
  socket.on("set cookie", function (data) {
    console.log(data);
    document.cookie =
      data.name + "=" + data.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    if (data.name == "name") {
      if ($("#nameInput").val() == "") {
        $("#nameInput").val(data.value);
      }
      if ($("#nameInputHost").val() == "") {
        $("#nameInputHost").val(data.value);
      }
    }
  });

  //? Deletes the given cookie
  socket.on("delete cookie", function (cookieName) {
    deleteCookie(cookieName);
  });

  //? Simply sends an alert
  socket.on("alert", function (msg) {
    alert(msg);
  });
}

//* Functions

//? Begin or synchronize the master timer for this player
//? Guaranteed to be mostly accurate since it goes by the exact time the universal timer was started
function setTimer(startTime, length) {
  console.log("setting timer with length " + length);
  var timer = setInterval(function () {
    var time = Math.ceil(length - (Date.now() / 1000 - startTime));
    if (time <= 0) {
      clearInterval(timer);
    }
    var clockText =
      parseInt(time / 60) + ":" + (time % 60).toString().padStart(2, "0");
    $("#timer").text(clockText);
  });
}

//? Load the current player to the landing page
function showLandingPage() {
  $("#gamePage").css("display", "none");
  $("#lobbyPage").css("display", "none");
  $("#landingPage").css("display", "");
}

//? Load the current player into an existing lobby
function showLobbyPage() {
  $("#landingPage").css("display", "none");
  $("#gamePage").css("display", "none");
  $("#lobbyPage").css("display", "");
  if (meesa.host) {
    showHostTools();
  }
  $("#roomCodeDisplay").text("Room Code: " + getCookie("roomCode"));
  $("#joinLink").text("localhost:5000/joinCode/" + getCookie("roomCode"));
}

//? Load the current player into an active game
function showGamePage() {
  $("#landingPage").css("display", "none");
  $("#lobbyPage").css("display", "none");
  $("#gamePage").css("display", "");
  if (meesa.host) {
    showHostTools();
  }
}

//? Join an existing game as a player
function joinGame(roomCode, username) {
  socket.emit("join room", {
    roomCode: roomCode,
    name: username,
    tempName: getCookie("name"),
  });
}

//? Start a new game as the host
function hostGame(username) {
  if (meesa.card == "" && !meesa.host) {
    socket.emit("host room", {
      username: username,
      tempName: getCookie("name"),
    });
  }
}

//? Reveal the host-only game controls
function showHostTools() {
  //* Show host-only setup and such

  //* The card selection system
  $("#cardPreviewRow").css("height", "45%");
  $("#cardSetupBottom").css("height", "45%");
  $("#cardSetupBottom").css("display", "block");

  //* Game controls
  $("#startBtnForm").css("display", "");
  $("#roundSettings").css("display", "");
}

//? Saves a variable to localStorage
function saveToStorage(varName, data) {
  myStorage.setItem(varName, JSON.stringify(data));
}

//? Retrieve a variable from localStorage
function getFromStorage(varName) {
  return JSON.parse(myStorage.getItem(varName));
}

//? Host selects a card to be added to the game
function selectCard(cardName) {
  if (!meesa.host) {
    alert("you shouldn't be able to select cards, wtf???");
    return;
  }
  socket.emit("select card", {
    roomCode: getCookie("roomCode"),
    cardName: cardName,
  });

  //* Mark card as selected with background color
  // var li = $("#cardsList li").filter(function () {
  //   return $(this).children("a")[0].text == cardName;
  // });
  // li.css("background-color", "#1c1c1c");
}

//? Updates the currently selected cards in the lobby
function drawCards(cards, players) {
  $("#cardPreviewPane").empty();
  cards.forEach(function (card) {
    if (meesa.host) {
      //* Host version allows removal
      $("#cardPreviewPane").append(
        '<div class="col-sm-4 card"><img src="/static/cards/' +
          card.url +
          '.jpg" class="cardPreviewImg"><a class="unselectable">' +
          card.name +
          '</a><img src="/static/delete_x.png" class="cardDelete"></div>'
      );
      //* Set listener for card removal
      $(".card")
        .unbind("click")
        .click(function () {
          var cardName = $(this).children("a")[0].text;
          socket.emit("deselect card", {
            roomCode: getCookie("roomCode"),
            cardName: cardName,
          });
        });
    } else {
      //* Player version doesn't have red x and can't delete
      $("#cardPreviewPane").append(
        '<div class="col-sm-4 card"><img src="/static/cards/' +
          card.url +
          '.jpg" class="cardPreviewImg"><a class="unselectable">' +
          card.name +
          "</a></div>"
      );
    }

    //* Indicate card balance
    // TODO: add support for card-burying when necessary
    // console.log(cards);
    // console.log(players);
    var playerCount = players[0].length + players[1].length;
    if (cards.length < playerCount) {
      $("#numCards").text(
        "Still need " + (playerCount - cards.length).toString() + " card(s)."
      );
    } else if (cards.length > playerCount) {
      $("#numCards").text(
        "You've selected " +
          (cards.length - playerCount).toString() +
          " too many card(s)!"
      );
    } else {
      $("#numCards").text("Card selection is balanced!");
    }
  });
}

//? Updates the list of players displayed in the lobby
function listPlayers(players) {
  pList = $("#playersInRoom");
  pList.empty();
  players = players[0].concat(players[1]);
  console.log(players);
  if (meesa.host) {
    //* Host gets to remove players
    players.forEach(function (p) {
      if (p == meesa.name) {
        $("<li/>").text(p).appendTo(pList);
      } else {
        $("<li/>")
          .html(
            p +
              '&nbsp;&nbsp;&nbsp;&nbsp;<span class="removePlayer">x</span><a class="playerName" style="display:none;">' +
              p +
              "</a>"
          )
          .appendTo(pList);
      }
    });
    $(".removePlayer").each(function () {
      socket.emit("alert", "you have been manually removed");
      $(this).click(function () {
        var playerToRemove = $(this).next().text();
        socket.emit("leave room", {
          roomCode: meesa.roomCode,
          name: playerToRemove,
        });
        console.log("removed " + playerToRemove);
      });
    });
  } else {
    //* Non-hosts don't get to remove players
    players.forEach(function (p) {
      $("<li/>").text(p).appendTo(pList);
    });
  }
}

//? Initiate the game for the current lobby
function startGame() {
  socket.emit("start game", meesa.roomCode);
  showGamePage();
}

//? Refresh the in-game player display
function drawPlayers(players) {
  // <div class="col-sm-4 player"><img src="/static/cards/agoraphobe.jpg" class="cardPreviewImg"><a class="unselectable">Agoraphobe</a></a></div>
  // players = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",'N','O','P','Q','R','S','T',"U",'V','W','X','Y','Z'];

  var playerData = getFromStorage("playerData");

  $("#playerMenu").empty();

  players.forEach(function (p) {
    pID = p.replace(/[^A-Za-z0-9\-_:.]/g, "");
    var cardName = playerData.filter(function (player) {
      return player.name == p;
    })[0].cardGuess;
    var img_match = gen_cards.filter(function (card) {
      return card.name == cardName;
    });
    if (img_match.length == 0) {
      img_match = cards.filter(function (card) {
        return card.name == cardName;
      });
      if (img_match.length == 0) {
        console.log(
          "No card match found to display. Fine if none was selected."
        );
      }
    }
    if (img_match[0]) {
      img_url = ' src="/static/cards/' + img_match[0].url + '.jpg"';
    } else {
      img_url = ' src="/static/cards/card_teams/drunk_team.jpg"';
    }
    $("#playerMenu").append(
      '<div class="col-sm-4 player" id="' +
        pID +
        '"><div class="row" style="margin: 0px"><div class="col-sm-3" style="display: inline-block; padding: 0px; margin: auto;"><div class="interactBtns" style="float: right;"><button class="colorShareBtn">🌈 🔁</button><button class="cardShareBtn">🃏 🔁</button></div><h3 style="color: white; writing-mode: tb-rl; transform: rotate(-180deg); float:right; margin:0px;">' +
        p +
        '&nbsp</h3></div><div class="col-sm-9" style="padding: 0px;"><img class="cardGuess"' +
        img_url +
        "/></div></div>" +
        '<div class="markOptions">Mark ' +
        p +
        " as:<br>" +
        '<img id="markBlue" class="markBtn" src="/static/cards/card_teams/blue_icon.jpg"/>' +
        '<img id="markRed" class="markBtn" src="/static/cards/card_teams/red_icon.jpg"/>' +
        '<img id="markGrey" class="markBtn" src="/static/cards/card_teams/grey_icon.jpg"/>' +
        '<img id="markGreen" class="markBtn" src="/static/cards/card_teams/green_icon.jpg"/>' +
        '<img id="markUnknown" class="markBtn" src="/static/cards/card_teams/unknown_icon.jpg"/>' +
        '<br><input type="text" class="markCardInput" placeholder="Search for a card..."><ul id="cardSearchFor' +
        pID +
        '" class="markCardSearch" style="height:60%;width:95%;overflow:auto;"></ul>' +
        "</div></div>"
    );
  });

  $(".markBtn").click(function (e) {
    var cardGuess;
    var markID = $(this).attr("id");
    switch (markID) {
      case "markBlue":
        cardGuess = "gen_blue";
        break;
      case "markRed":
        cardGuess = "gen_red";
        break;
      case "markGrey":
        cardGuess = "gen_grey";
        break;
      case "markGreen":
        cardGuess = "gen_green";
        break;
      case "markUnknown":
        cardGuess = "unknown";
        break;
      default:
        cardGuess = "";
    }
    var nameID = $(this).parent().parent()[0].id;
    //* Update playerData from localStorage
    var playerData = getFromStorage("playerData");
    // console.log(playerData);
    playerData.forEach(function (p) {
      if (p.name == nameID) {
        p.cardGuess = cardGuess;
      }
    });
    saveToStorage("playerData", playerData);
    drawPlayers(players);
  });

  $(".markCardInput").keyup(function (e) {
    // $(this).parent().parent().children()[0].innerText
    markCardSearch("#" + $(this).next()[0].id, $(this).val(), players);
  });

  $(".player").click(function (e) {
    e.stopPropagation();
    if ($(this).children(".markOptions").css("visibility") == "hidden") {
      $("#playerMenu .markOptions").css("visibility", "hidden");
      $(this).children(".markOptions").css("visibility", "visible");
    } else {
      $("#playerMenu .markOptions").css("visibility", "hidden");
    }
  });

  $(".markOptions").click(function (e) {
    e.stopPropagation();
  });
  $(".interactBtns").click(function (e) {
    e.stopPropagation();
  });
  //* Allow close by clicking anywhere else
  $(window).click(function () {
    $("#playerMenu .markOptions").css("visibility", "hidden");
  });
}

//? Search for cards by name and print the output to the specified html
function markCardSearch(htmlID, searchStr, players) {
  console.log(searchStr);
  if (searchStr == "") {
    $(htmlID).empty();
    return;
  }
  var txtValue, card;
  var filter = searchStr.toUpperCase();
  var li = $("#cardsList li");
  var a = li.children("a");

  // Loop through all list items, and hide those who don't match the search query
  for (var i = 0; i < li.length; i++) {
    cardName = a[i].text;
    txtValue = cardName.replace(/[^A-Za-z0-9\-_:]/g, "");
    // console.log(txtValue);

    if (cardName == "Dr. Boom (Red)") {
      console.log("Dr boom here!!!!");
    }
    if (cardName.toUpperCase().indexOf(filter) > -1) {
      card = $(li[i]).clone();
      txtValue = txtValue;
      $(card).attr("id", txtValue);
      // console.log($(card).id);
      // console.log($(card).get(0).outerHTML);
      // console.log($(htmlID).children("#" + txtValue).length == 0);
      if ($(htmlID).children("#" + txtValue).length == 0) {
        // console.log("appending " + txtValue);
        $(htmlID).append(card);
      } else {
        // console.log(txtValue + " already in list");
        // console.log(card.get(0).outerHTML);
      }
    } else {
      // console.log($(htmlID).children("#" + txtValue));
      $(htmlID)
        .children("#" + txtValue)
        .remove();
      console.log("removed " + txtValue);
    }
  }

  //* Add click handler for each card
  $(htmlID)
    .children()
    .click(function () {
      console.log($(this));
      //* Determine player and card
      var cardName = $(this).children("a")[0].innerText;
      var playerName = $(this).parent().attr("id").replace("cardSearchFor", "");
      //* Update playerData from localStorage
      var playerData = getFromStorage("playerData");
      playerData.forEach(function (p) {
        if (p.name == playerName) {
          p.cardGuess = cardName;
        }
      });
      saveToStorage("playerData", playerData);
      drawPlayers(players);
    });
}

//? Make this player leave the current room entirely and return to the landing page
function leaveLobby() {
  socket.emit("leave room", { roomCode: meesa.roomCode, name: meesa.name });

  showLandingPage();

  if (meesa.host) {
    socket.emit("randomize host", "");
  }

  deleteCookie("roomCode");

  //* Reset identity
  meesa = {
    name: "",
    card: "",
    clientID: "",
    host: false,
    leader: false,
    roomCode: "",
  };
}

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name))
    .split("=")[1];
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// socket.on("isPlayer", function (isPlayer) {
//   isHost = false;
//   $("#cardSetupBottom").remove();
//   $("#cardPreviewRow").css("height", "90%");
// });

// socket.on("players", function (playerList) {
//   players = playerList;
//   // List all players in the room on the html list
//   pList = $("#playersInRoom");
//   pList.empty();
//   if (isHost) {
//     // console.log('host');
//     $.each(players, function (p) {
//       if (players[p] == userName) {
//         $("<li/>").text(players[p]).appendTo(pList);
//       } else {
//         $("<li/>")
//           .html(
//             players[p] +
//               '&nbsp;&nbsp;&nbsp;&nbsp;<span class="removePlayer">x</span><a class="playerName" style="display:none;">' +
//               players[p] +
//               "</a>"
//           )
//           .appendTo(pList);
//       }
//     });
//     $(".removePlayer").each(function () {
//       $(this).click(function () {
//         var playerToRemove = $(this).next().text();
//         socket.emit("removePlayer", playerToRemove);
//         // console.log("removed " + playerToRemove);
//       });
//     });
//   } else {
//     $.each(players, function (p) {
//       $("<li/>").text(players[p]).appendTo(pList);
//     });
//   }

//   if (!players.includes(userName)) {
//     // console.log("this session has been removed.");
//     leaveLobby();
//   }
// });

// socket.on("cards", function (cards) {
//   cardsInPlay = cards;
//   // console.log(cards);
//   drawCards();
// });

// socket.on("askForCard", function (c) {
//   // console.log('asking for card');
//   socket.emit("assignMyCard", userName);
// });

// socket.on("heresYourCard", function (card) {
//   // console.log('your card was sent as ');
//   // console.log(card);
//   // console.log('and the cookie is being set.');
//   document.cookie = "myCardUrl=" + card.url;
//   document.cookie = "myCardName=" + card.name;
//   $("#playerCardImg").attr("src", card.url);
//   // console.log("The src of your card was set to " + card.url);
// });

// socket.on("start timer", function (params) {
//   // console.log(params);
//   startTimer(params.timerLength, params.startTime);
// });

// function startTimer(length, startTime) {
//   if (timerRunning) {
//     return;
//   } else {
//     timerRunning = true;
//   }

//   socket.emit("client synced", "");

//   var timer = setInterval(function () {
//     var time = Math.ceil(length - (Date.now() / 1000 - startTime)); // milliseconds elapsed since start
//     if (time <= 0) {
//       clearInterval(timer);
//     }
//     var clockText = "";
//     clockText += parseInt(time / 60);
//     clockText += ":";
//     var min = time % 60;
//     if (min < 10) {
//       clockText += "0";
//     }
//     clockText += parseInt(min);

//     $("#timer").text(clockText);
//   }, 1000); // update about every second
// }

// socket.on("stop timer", function () {
//   timerRunning = false;
//   clearInterval(timer);
// });

// socket.on("startingGame", function (playerList) {
//   playerNames = playerList;
//   $.ajax({
//     type: "GET",
//     url: "/play/",
//   });
// });

// socket.on("yourName", function (name) {
//   // console.log(name);
//   userName = name;
// });

// socket.on("room code", function (roomCode) {
//   console.log("received message: " + roomCode);
//   $(document).ready(function () {
//     $("#roomCodeDisplay").text("Room Code: " + roomCode);
//     // Show link to join
//     $("#joinLink").text("http://twozoomsandaboom.com/joinCode/" + roomCode);
//   });
//   socket.emit("join room", roomCode);
// });

// socket.on("delete_cookie", function (cookie) {
//   document.cookie = cookie + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
// });

// socket.on("alert message", function (msg) {
//   alert(msg);
// });

// function startGame() {
//   socket.emit("start game", "");
// }

// socket.on("go for start", function (a) {
//   // Tell all clients in room that the game's starting
//   socket.to(my.roomCode).emit("startingGame", "");

//   $.ajax({
//     type: "GET",
//     url: "/play/",
//   });
// });

// function selectCard(src, cardName) {
//   if (!isHost) {
//     // console.log("You shouldn't be able to do this!");
//     return;
//   }

//   if (cardsInPlay["cards"][cardName]) {
//     // console.log("Card is already in play.");
//     return;
//   }

//   // Add card to setup
//   cardsInPlay["cards"][cardName] = { url: src };
//   drawCards();

//   var li = $("#cardsList li").filter(function () {
//     return $(this).children("a")[0].text == cardName;
//   });

//   li.css("background-color", "#1c1c1c");

//   socket.emit("update cards", cardsInPlay);
// }

// function deselectCard(src) {
//   console.log($(".card"));
//   var card = $(".card").filter(function () {
//     return $(this).children("img")[0].getAttribute("src") == src;
//   });
//   cardName = $(card[0]).children("a")[0].text;
//   delete cardsInPlay["cards"][cardName];
//   card[0].remove();
//   socket.emit("update cards", cardsInPlay);
//   var li = $("#cardsList li").filter(function () {
//     return $(this).children("a")[0].text == cardName;
//   });
//   li.css("background-color", "#3b3b3b");
// }

// // When leave btn pressed, tell server to leave lobby
// function leaveLobby() {
//   console.log("leaving lobby");
//   delete_cookie("name");
//   delete_cookie("roomCode");
//   delete_cookie("myCardName");
//   delete_cookie("myCardUrl");
//   socket.emit("leaveRoom", "");
//   location.href = "/";
// }

// function delete_cookie(name) {
//   if (get_cookie(name)) {
//     document.cookie = name + "=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
//   }
// }
