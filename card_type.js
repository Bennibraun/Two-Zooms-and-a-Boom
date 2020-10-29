class Card {
  // Required: name,color,team,url
  // Optional: shy,coy,foolish,immune,special
  constructor(
    name,
    color,
    team,
    url,
    shy = false,
    coy = false,
    foolish = false,
    immune = false,
    special = {}
  ) {
    this.name = name;
    this.color = color;
    this.team = team;
    this.url = url;
    this.countMoved = 0; // counts room moves, not trades
    this.firstShared = null;
    this.shy = shy;
    this.coy = coy;
    this.foolish = foolish;
    this.immune = immune;
    this.special = special;
  }

  /*
    FUNCTION GUIDE

    Share Cards: Send room code, player objects (full obj with name, clientID, card)

    Trade Cards: Send room code, player objects (full obj with name, clientID, card)
    socket.emit("trade cards",{
        roomCode: meesa.roomCode,
        p1: meesa.name,
        p2: data.target,
      });)
  */

  // these static functions are to modify conditions of the cards themselves,
  // not to perform the share gui action
  static doColorShare(p1, p2) {
    
  }

  static doCardShare(p1, p2) {}

  static doPublicReveal(p1) {}

  static doPrivateReveal(p1, p2) {}

  static doCardTrade(p1, p2) {}

  static card_share_help(p1, p2) {
    // Immune exemption
    if (!p2.immune) {
      // Dealer mechanic
      if (p1.name == "Dealer (Blue)" || p1.name == "Dealer (Red)") {
        p2.foolish = true;
      }
      // Criminal mechanic
      else if (p1.name == "Criminal (Blue)" || p1.name == "Criminal (Red)") {
        p2.shy = true;
      }
      // Thug mechanic
      else if (p1.name == "Thug (Blue)" || p1.name == "Thug (Red)") {
        p2.coy = true;
      }

      // Remove offsetting conditions
      if (p2.foolish && p2.shy) {
        p2.foolish = false;
        p2.shy = false;
      }
      if (p2.foolish && p2.coy) {
        p2.foolish = false;
        p2.coy = false;
      }
    }
  }
}
