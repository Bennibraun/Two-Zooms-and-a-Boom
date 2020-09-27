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
  players.forEach(function (p) {
    $("#playerMenu").append(
      '<div class="col-sm-4 player" id="' +
        p +
        '"><h3>' +
        p +
        "</h3>" +
        '<div class="markOptions">Mark ' +
        p +
        " as:<br>" +
        '<img id="markBlue" class="markBtn" src="/static/cards/card_teams/blue_icon.jpg"/>' +
        '<img id="markRed" class="markBtn" src="/static/cards/card_teams/red_icon.jpg"/>' +
        '<img id="markGrey" class="markBtn" src="/static/cards/card_teams/grey_icon.jpg"/>' +
        '<img id="markGreen" class="markBtn" src="/static/cards/card_teams/green_icon.jpg"/>' +
        '<br><input type="text" class="markCardInput" placeholder="Search for a card..."><ul id="cardSearchFor' +
        p +
        '" class="markCardSearch" style="height:60%;width:95%;overflow:auto;"></ul>' +
        "</div></div>"
    );
  });
  $(".markCardInput").keyup(function (e) {
    // $(this).parent().parent().children()[0].innerText
    markCardSearch("#" + $(this).next()[0].id, $(this).val());
  });

  $(".player").click(function (e) {
    e.stopPropagation();
    if ($("#playerMenu .markOptions").css("visibility") == "hidden") {
      $("#playerMenu .markOptions").css("visibility", "visible");
    } else {
      $("#playerMenu .markOptions").css("visibility", "hidden");
    }
  });

  $(".markOptions").click(function (e) {
    e.stopPropagation();
  });
  //* Allow close by clicking anywhere else
  $(window).click(function () {
    $("#playerMenu .markOptions").css("visibility", "hidden");
  });
}

//? Search for cards by name and print the output to the specified html
function markCardSearch(htmlID, searchStr) {
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
    txtValue = a[i].text;
    // console.log(txtValue);
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card = $(li[i]).clone();
      txtValue = txtValue.replace(/[\s\(\)\'\.]/g, "");
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
        .children("#" + txtValue.replace(/[\s\(\)\'\.]/g, ""))
        .remove();
      // console.log("removed " + txtValue);
    }
  }

  //* Add click handler for each card
  $(htmlID)
    .children()
    .click(function () {
      //* Determine player and card
      var cardName = $(this).children("a")[0].innerText;
      var playerName = $(this).parent().parent().parent().children("h3")[0]
        .innerText;
      //* Update playerData from localStorage
      var playerData = getFromStorage("playerData");
      playerData.forEach(function (p) {
        if (p.name == playerName) {
          p.cardGuess = cardName;
        }
      });
      saveToStorage("playerData", playerData);
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
