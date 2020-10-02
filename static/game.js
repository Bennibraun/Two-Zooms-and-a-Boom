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
var currentRound;
var timer;

myStorage = window.localStorage;

cards = [
  {
    name: "Agent (Blue)",
    color: "blue",
    team: "blue",
    team: "blue",
    url: "agent_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Agent (Red)",
    color: "red",
    team: "red",
    url: "agent_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Ambassador (Blue)",
    color: "blue",
    team: "blue",
    url: "ambassador_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Angel (Blue)",
    color: "blue",
    team: "blue",
    url: "angel_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Blind (Blue)",
    color: "blue",
    team: "blue",
    url: "blind_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Bouncer (Blue)",
    color: "blue",
    team: "blue",
    url: "bouncer_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Clown (Blue)",
    color: "blue",
    team: "blue",
    url: "clown_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Conman (Blue)",
    color: "blue",
    team: "blue",
    url: "conman_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Coyboy (Blue)",
    color: "blue",
    team: "blue",
    url: "coyboy_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Criminal (Blue)",
    color: "blue",
    team: "blue",
    url: "criminal_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Dealer (Blue)",
    color: "blue",
    team: "blue",
    url: "dealer_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Blue Team",
    color: "blue",
    team: "blue",
    url: "default_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Demon (Blue)",
    color: "blue",
    team: "blue",
    url: "demon_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Doctor (Blue)",
    color: "blue",
    team: "blue",
    url: "doctor_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Enforcer (Blue)",
    color: "blue",
    team: "blue",
    url: "enforcer_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Eris (Blue)",
    color: "blue",
    team: "blue",
    url: "eris_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Mayor (Blue)",
    color: "blue",
    team: "blue",
    url: "mayor_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Medic (Blue)",
    color: "blue",
    team: "blue",
    url: "medic_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Mime (Blue)",
    color: "blue",
    team: "blue",
    url: "mime_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Mummy (Blue)",
    color: "blue",
    team: "blue",
    url: "mummy_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Negotiator (Blue)",
    color: "blue",
    team: "blue",
    url: "negotiator_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Nurse (Blue)",
    color: "blue",
    team: "blue",
    url: "nurse_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Paparazzo (Blue)",
    color: "blue",
    team: "blue",
    url: "paparazzo_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Paranoid (Blue)",
    color: "blue",
    team: "blue",
    url: "paranoid_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "President (Blue)",
    color: "blue",
    team: "blue",
    url: "president_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "President's Daughter (Blue)",
    color: "blue",
    team: "blue",
    url: "presidentsdaughter_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Psychologist (Blue)",
    color: "blue",
    team: "blue",
    url: "psychologist_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Red Spy (Blue)",
    color: "blue",
    team: "red",
    url: "redspy_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Security (Blue)",
    color: "blue",
    team: "blue",
    url: "security_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Shyguy (Blue)",
    color: "blue",
    team: "blue",
    url: "shyguy_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Thug (Blue)",
    color: "blue",
    team: "blue",
    url: "thug_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Tuesday Knight (Blue)",
    color: "blue",
    team: "blue",
    url: "tuesdayknight_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Usurper (Blue)",
    color: "blue",
    team: "blue",
    url: "usurper_blue",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Ambassador (Red)",
    color: "red",
    team: "red",
    url: "ambassador_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Angel (Red)",
    color: "red",
    team: "red",
    url: "angel_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Blue Spy (Red)",
    color: "red",
    team: "blue",
    url: "bluespy_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Bomber (Red)",
    color: "red",
    team: "red",
    url: "bomber_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Blind (Red)",
    color: "red",
    team: "red",
    url: "blind_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Bouncer (Red)",
    color: "red",
    team: "red",
    url: "bouncer_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Clown (Red)",
    color: "red",
    team: "red",
    url: "clown_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: " (Red)",
    color: "red",
    team: "red",
    url: "blind_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Conman (Red)",
    color: "red",
    team: "red",
    url: "conman_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Coyboy (Red)",
    color: "red",
    team: "red",
    url: "coyboy_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Criminal (Red)",
    color: "red",
    team: "red",
    url: "criminal_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Cupid (Red)",
    color: "red",
    team: "red",
    url: "cupid_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Dealer (Red)",
    color: "red",
    team: "red",
    url: "dealer_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Red Team",
    color: "red",
    team: "red",
    url: "default_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Demon (Red)",
    color: "red",
    team: "red",
    url: "demon_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Dr. Boom (Red)",
    color: "red",
    team: "red",
    url: "drboom_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Enforcer (Red)",
    color: "red",
    team: "red",
    url: "enforcer_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Engineer (Red)",
    color: "red",
    team: "red",
    url: "engineer_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Immunologist (Red)",
    color: "red",
    team: "red",
    url: "immunologist_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Martyr (Red)",
    color: "red",
    team: "red",
    url: "martyr_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Mayor (Red)",
    color: "red",
    team: "red",
    url: "mayor_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Medic (Red)",
    color: "red",
    team: "red",
    url: "medic_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Mime (Red)",
    color: "red",
    team: "red",
    url: "mime_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Mummy (Red)",
    color: "red",
    team: "red",
    url: "mummy_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Negotiator (Red)",
    color: "red",
    team: "red",
    url: "negotiator_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Paparazzo (Red)",
    color: "red",
    team: "red",
    url: "paparazzo_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Paranoid (Red)",
    color: "red",
    team: "red",
    url: "paranoid_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Psychologist (Red)",
    color: "red",
    team: "red",
    url: "psychologist_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Security (Red)",
    color: "red",
    team: "red",
    url: "security_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Shyguy (Red)",
    color: "red",
    team: "red",
    url: "shyguy_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Thug (Red)",
    color: "red",
    team: "red",
    url: "thug_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Tinkerer (Red)",
    color: "red",
    team: "red",
    url: "tinkerer_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Usurper (Red)",
    color: "red",
    team: "red",
    url: "usurper_red",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Agoraphobe",
    color: "grey",
    team: "grey",
    url: "agoraphobe",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Ahab",
    color: "grey",
    team: "grey",
    url: "ahab",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Anarchist",
    color: "grey",
    team: "grey",
    url: "anarchist",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Bomb Bot",
    color: "grey",
    team: "grey",
    url: "bombbot",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Butler",
    color: "grey",
    team: "grey",
    url: "butler",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Clone",
    color: "grey",
    team: "grey",
    url: "clone",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Decoy",
    color: "grey",
    team: "grey",
    url: "decoy",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Drunk",
    color: "grey",
    team: "grey",
    url: "drunk",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  { name: "Gambler", color: "grey", team: "grey", url: "gambler" },
  {
    name: "Hot Potato",
    color: "grey",
    team: "grey",
    url: "hotpotato",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Intern",
    color: "grey",
    team: "grey",
    url: "intern",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Invincible",
    color: "grey",
    team: "grey",
    url: "invincible",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Juliet",
    color: "grey",
    team: "grey",
    url: "juliet",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Leprechaun (Green)",
    color: "green",
    team: "green",
    url: "leprechaun_green",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Maid",
    color: "grey",
    team: "grey",
    url: "maid",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Mastermind",
    color: "grey",
    team: "grey",
    url: "mastermind",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "MI6",
    color: "grey",
    team: "grey",
    url: "mi6",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Minion",
    color: "grey",
    team: "grey",
    url: "minion",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Mistress",
    color: "grey",
    team: "grey",
    url: "mistress",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Moby",
    color: "grey",
    team: "grey",
    url: "moby",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Nuclear Tyrant",
    color: "grey",
    team: "grey",
    url: "nucleartyrant",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Private Eye",
    color: "grey",
    team: "grey",
    url: "privateeye",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Queen",
    color: "grey",
    team: "grey",
    url: "queen",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Rival",
    color: "grey",
    team: "grey",
    url: "rival",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Robot",
    color: "grey",
    team: "grey",
    url: "robot",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Romeo",
    color: "grey",
    team: "grey",
    url: "romeo",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Sniper",
    color: "grey",
    team: "grey",
    url: "sniper",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Survivor",
    color: "grey",
    team: "grey",
    url: "survivor",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Target",
    color: "grey",
    team: "grey",
    url: "target",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Traveler",
    color: "grey",
    team: "grey",
    url: "traveler",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Victim",
    color: "grey",
    team: "grey",
    url: "victim",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Wife",
    color: "grey",
    team: "grey",
    url: "wife",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
  {
    name: "Zombie (Green)",
    color: "green",
    team: "green",
    url: "zombie_green",
    countMoved: 0,
    firstShared: null,
    shy: false,
    coy: false,
    foolish: false,
    immune: false,
  },
];

function createCard(card) {
  var newCard = Card(
    card.name,
    card.color,
    card.team,
    card.url,
    card.countMoved,
    card.firstShared,
    card.shy,
    card.coy,
    card.foolish,
    card.immune
  );

  newCard.setAttributes();
  return newCard;
}

gen_cards = [
  {
    name: "gen_blue",
    color: "blue",
    team: "blue",
    url: "/card_teams/blue_team",
  },
  { name: "gen_red", color: "red", team: "red", url: "/card_teams/red_team" },
  {
    name: "gen_grey",
    color: "grey",
    team: "grey",
    url: "/card_teams/grey_team",
  },
  {
    name: "gen_green",
    color: "green",
    team: "green",
    url: "/card_teams/green_team_l",
  },
];

//* Proper Code

//* Socket listeners
{
  //? Tells a player personal info about themself
  socket.on("your identity", function (player) {
    meesa.name = player.name;
    meesa.card = player.card;
    meesa.clientID = player.clientID;
  });

  //? Tells a player his card for the start of the game
  socket.on("your card", function (card) {
    meesa.card = card;
  });

  //? Utility for telling this player about another player's card
  socket.on("card info", function (data) {
    changeGuess(data.playerName, data.cardName);
  });

  //? Tells a player his own room code for comms
  socket.on("room code", function (roomCode) {
    meesa.roomCode = roomCode;
  });

  //? Refreshes the lobby's info:
  //? -Cards in play
  //? -Players in game
  socket.on("lobby refresh", function (data) {
    players = data.players;
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
    currentRound = timer.currentRound;
  });

  //? Officially starts the game
  socket.on("let the game begin", function (players) {
    //* Create localStorage system for player menu
    var playerData = [];
    players.forEach(function (subPlayers) {
      subPlayers.forEach(function (p) {
        playerData.push({ name: p, cardGuess: "", notes: "" });
      });
    });
    saveToStorage("playerData", playerData);

    //* Navigate to game room
    showGamePage();

    //* Create JQuery dialog system
    $("#gamePage").append('<div id="dialog"></div>');
    $("#dialog").dialog({
      autoOpen: false,
      modal: true,
      resizable: false,
      draggable: true,
      closeOnEscape: true,
      title: "Appoint a leader",
      open: function () {
        jQuery(".ui-widget-overlay").bind("click", function () {
          jQuery("#dialog").dialog("close");
        });
      },
    });

    //* Show initial leader controls
    drawLeaderControls();
  });

  //? Refreshes the room leaders
  socket.on("setting leaders", function (data) {
    console.log("setting leaders");
    console.log(data);
    var myRoom = $("#myRoomLeader");
    var otherRoom = $("#otherRoomLeader");

    if (players[0].includes(meesa.name) && players[0].includes(data.subroomA)) {
      myRoom.text("My Room Leader: " + data.subroomA);
      otherRoom.text("Other Room Leader: " + data.subroomB);
    } else if (
      players[1].includes(meesa.name) &&
      players[1].includes(data.subroomA)
    ) {
      myRoom.text("My Room Leader: " + data.subroomA);
      otherRoom.text("Other Room Leader: " + data.subroomB);
    } else if (
      players[0].includes(meesa.name) &&
      players[0].includes(data.subroomB)
    ) {
      myRoom.text("My Room Leader: " + data.subroomB);
      otherRoom.text("Other Room Leader: " + data.subroomA);
    } else if (
      players[1].includes(meesa.name) &&
      players[1].includes(data.subroomB)
    ) {
      myRoom.text("My Room Leader: " + data.subroomB);
      otherRoom.text("Other Room Leader: " + data.subroomA);
    } else {
      myRoom.text("My Room Leader: None");
      if (data.subroomA != "") {
        otherRoom.text("Other Room Leader: " + data.subroomA);
      } else {
        otherRoom.text("Other Room Leader: " + data.subroomB);
      }
    }

    //* If one of them hasn't been set, must preserve "unset" status
    if (myRoom.text() == "My Room Leader: ") {
      myRoom.text("My Room Leader: None");
    }
    if (otherRoom.text() == "Other Room Leader: ") {
      otherRoom.text("Other Room Leader: None");
    }

    if (data.subroomA == meesa.name || data.subroomB == meesa.name) {
      console.log("im leader!");
      meesa.leader = true;
    }

    drawLeaderControls();
  });

  //? Request a vote for a particular usurp attempt
  socket.on("vote on usurp", function (name) {
    if (players[0].includes(meesa.name) && players[0].includes(name))
      var dl = $("#dialog");
    dl.empty();
    dl.append(
      '<p style="color:black">' +
        name +
        ' would like to be the new leader of your room. Cast your vote!</p><br><button id="yesVoteBtn">Yes</button><button id="noVoteBtn">No</button>'
    );
    //* Set button functionality
    $("#yesVoteBtn").click(function () {
      socket.emit("vote submission", { roomCode: meesa.roomCode, name: name });
      dl.dialog("close");
      dl.empty();
    });
    $("#noVoteBtn").click(function () {
      dl.dialog("close");
      dl.empty();
    });

    dl.dialog("option", "title", "Vote for a Leader");
    dl.dialog("open");
  });

  //? Refreshes all info necessary to run the overall game, excluding individual actions
  socket.on("game refresh", function (game) {
    players = game.players;
    if (!$("#dialog").length) {
      //* Create JQuery dialog system
      $("#gamePage").append('<div id="dialog"></div>');
      $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        draggable: true,
        closeOnEscape: true,
        title: "Appoint a leader",
        open: function () {
          jQuery(".ui-widget-overlay").bind("click", function () {
            jQuery("#dialog").dialog("close");
          });
        },
      });
    }
    drawPlayers(game.players);
    drawLeaderControls();
  });

  //? Someone wants to color share
  socket.on("color share offer", function (from) {
    if (
      meesa.card.name == "Leprechaun (Green)" ||
      confirm(from + " would like to color share with you, do you accept?")
    ) {
      socket.emit("accept color share", {
        self: meesa.name,
        target: from,
        roomCode: meesa.roomCode,
      });
    }
  });

  //? Carry out the color share
  socket.on("color share complete", function (data) {
    var cardUrl = gen_cards.find(function (c) {
      return c.color == data.color;
    });
    if (!cardUrl) {
      cardUrl = cards.find(function (c) {
        return c.color == data.color;
      });
    }
    cardUrl = "/static/cards/" + cardUrl.url + ".jpg";

    $("#shareCardImg").attr("src", cardUrl);
    $("#otherCardName").text(data.target);

    //* Special cases
    if (meesa.card.name == "Hot Potato") {
      //* Must trade cards
      socket.emit("trade cards", {
        roomCode: meesa.roomCode,
        self: meesa.name,
        target: data.target,
      });
      changeGuess(data.target, meesa.card.name);
    } else if (meesa.card.name == "Leprechaun (Green)") {
      //* Must trade cards
      socket.emit("trade cards", {
        roomCode: meesa.roomCode,
        self: meesa.name,
        target: data.target,
      });
      changeGuess(data.target, meesa.card.name);
    } else {
      var cardGuess;
      switch (data.color) {
        case "blue":
          cardGuess = "gen_blue";
          break;
        case "red":
          cardGuess = "gen_red";
          break;
        case "grey":
          cardGuess = "gen_grey";
          break;
        case "green":
          cardGuess = "gen_green";
          break;
        default:
          cardGuess = "";
      }
      changeGuess(data.target, cardGuess);
    }
  });

  //? Someone wants to card share
  socket.on("card share offer", function (from) {
    if (
      meesa.card.name == "Leprechaun (Green)" ||
      confirm(from + " would like to card share with you, do you accept?")
    ) {
      socket.emit("accept card share", {
        self: meesa.name,
        target: from,
        roomCode: meesa.roomCode,
      });
    }
  });

  //? Carry out the card share
  socket.on("card share complete", function (data) {
    var cardUrl = cards.find(function (c) {
      return c.name == data.cardName;
    });
    cardUrl = "/static/cards/" + cardUrl.url + ".jpg";

    $("#shareCardImg").attr("src", cardUrl);
    $("#otherCardName").text(data.target);

    //* Special cases
    if (meesa.card.name == "Hot Potato") {
      //* Must trade cards
      socket.emit("trade cards", {
        roomCode: meesa.roomCode,
        self: meesa.name,
        target: data.target,
      });
      changeGuess(data.target, meesa.card.name);
    } else if (meesa.card.name == "Leprechaun (Green)") {
      //* Must trade cards
      socket.emit("trade cards", {
        roomCode: meesa.roomCode,
        self: meesa.name,
        target: data.target,
      });
      changeGuess(data.target, meesa.card.name);
    } else {
      changeGuess(data.target, data.cardName);
    }
  });

  //? Ends the game
  socket.on("game over", function () {
    clearInterval(timer);
    $("#timer").text("💣 GAME OVER 💣");
    //* Delete room-specific cookies
    deleteCookie("roomCode");
    deleteCookie("io");
  });

  //? Sets the given cookie
  socket.on("set cookie", function (data) {
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
  console.log("starting timer with length " + length);
  var now = new Date(1970, 0, 1);
  now.setSeconds(startTime);
  console.log("current time: " + now);
  clearInterval(timer);
  timer = setInterval(function () {
    var time = Math.ceil(length - (Date.now() / 1000 - startTime));
    if (time <= 0) {
      if (meesa.host) {
        socket.emit("timer done", meesa.roomCode);
      }
      clearInterval(timer);
      $("#timer").text("⏰ Round Over");
      return;
    }
    var clockText =
      parseInt(time / 60) + ":" + (time % 60).toString().padStart(2, "0");
    $("#timer").text("⏱️ " + clockText + "  (" + currentRound + ")");
  }, 200);
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
  $("#joinLink").text(
    "http://www.twozoomsandaboom.com/joinCode/" + getCookie("roomCode")
  );
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
  socket.emit("host room", {
    username: username,
    tempName: getCookie("name"),
  });
}

//? Reveal the host-only game controls
function showHostTools() {
  //* Show host-only setup and such

  //* The card selection system
  $("#cardPreviewRow").css("height", "45%");
  $("#cardSetupBottom").css("height", "45%");
  $("#cardSetupBottom").css("display", "block");

  //* Game controls
  $(".startButton").css("display", "");
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
      $(this).click(function () {
        var playerToRemove = $(this).next().text();
        socket.emit("leave room", {
          roomCode: meesa.roomCode,
          name: playerToRemove,
          leaveSocketRoom: false,
        });
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
  var timerLengths = [];
  $("#timerSettings .form-control").each(function () {
    timerLengths.push($(this).val() * 60);
  });
  console.log(timerLengths);
  socket.emit("start game", {
    roomCode: meesa.roomCode,
    timerLengths: timerLengths,
  });
}

//? Refresh the in-game player display
function drawPlayers(players) {
  // <div class="col-sm-4 player"><img src="/static/cards/agoraphobe.jpg" class="cardPreviewImg"><a class="unselectable">Agoraphobe</a></a></div>
  // players = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",'N','O','P','Q','R','S','T',"U",'V','W','X','Y','Z'];

  //* Draw own card
  $("#playerCardImg").attr("src", "/static/cards/" + meesa.card.url + ".jpg");
  $("#yourCardName").text(meesa.card.name);

  var playerData = getFromStorage("playerData");

  $("#playerMenuIn").empty();
  $("#playerMenuOut").empty();

  allPlayers = players[0].concat(players[1]);
  allPlayers = allPlayers.filter(function (p) {
    return p != meesa.name;
  });

  var myRoom;
  if (players[0].includes(meesa.name)) {
    myRoom = 0;
  } else {
    myRoom = 1;
  }

  allPlayers.forEach(function (p) {
    //* Determine subroom
    var subroom;
    if (players[myRoom].includes(p)) {
      subroom = "In";
    } else {
      subroom = "Out";
    }

    //* Fill in player-generated details for each card on display
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

    playerHTML =
      '<div class="col-sm-4 player" id="' +
      pID +
      '"><div class="row" style="margin: 0px"><div class="col-sm-3" style="display: inline-block; padding: 0px; margin: auto;">';
    if (subroom == "In") {
      playerHTML +=
        '<div class="interactBtns" style="float: right;"><button class="colorShareBtn">🌈</button><button class="cardShareBtn">🃏</button></div>';
    }
    playerHTML +=
      '<h3 style="color: white; padding-bottom: 5px; writing-mode: tb-rl; transform: rotate(-180deg); float:right; margin:0px;">' +
      p +
      '</h3></div><div class="col-sm-9" style="padding: 0px;"><img class="cardGuess"' +
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
      "</div></div>";

    $("#playerMenu" + subroom).append(playerHTML);
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
    var nameID = $(
      $($(this).parent().parent().children()[0]).children()[0]
    ).children("h3")[0].innerText;
    //* Update playerData from localStorage
    var playerData = getFromStorage("playerData");
    playerData.forEach(function (p) {
      if (p.name == nameID) {
        p.cardGuess = cardGuess;
      }
    });
    saveToStorage("playerData", playerData);
    drawPlayers(players);
  });

  $(".markCardInput").keyup(function (e) {
    markCardSearch("#" + $(this).next()[0].id, $(this).val(), players);
  });

  $(".player").click(function (e) {
    e.stopPropagation();
    if ($(this).children(".markOptions").css("visibility") == "hidden") {
      $(".markOptions").css("visibility", "hidden");
      $(this).children(".markOptions").css("visibility", "visible");
    } else {
      $(".markOptions").css("visibility", "hidden");
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
    $(".markOptions").css("visibility", "hidden");
  });

  $(".colorShareBtn").click(function () {
    var target = $(this).parent().parent().children("h3")[0].innerText;
    socket.emit("request color share", {
      self: meesa.name,
      target: target,
      roomCode: meesa.roomCode,
    });
  });

  $(".cardShareBtn").click(function () {
    var target = $(this).parent().parent().children("h3")[0].innerText;
    socket.emit("request card share", {
      self: meesa.name,
      target: target,
      roomCode: meesa.roomCode,
    });
  });
}

function setBuryCardTo(buryCard) {
  socket.emit("bury card setting", {
    buryCard: buryCard,
    roomCode: meesa.roomCode,
  });
}

//? Search for cards by name and print the output to the specified html
function markCardSearch(htmlID, searchStr, players) {
  if (searchStr == "") {
    $(htmlID).empty();
    return;
  }
  var txtValue, card;
  var filter = searchStr.toUpperCase();
  var li = $("#cardsList li");
  var a = li.children("a");

  //* Loop through all list items, and hide those who don't match the search query
  for (var i = 0; i < li.length; i++) {
    cardName = a[i].text;
    txtValue = cardName.replace(/[^A-Za-z0-9\-_:]/g, "");

    if (cardName.toUpperCase().indexOf(filter) > -1) {
      card = $(li[i]).clone();
      txtValue = txtValue;
      $(card).attr("id", txtValue);
      if ($(htmlID).children("#" + txtValue).length == 0) {
        $(htmlID).append(card);
      }
    } else {
      $(htmlID)
        .children("#" + txtValue)
        .remove();
    }
  }

  //* Add click handler for each card
  $(htmlID)
    .children()
    .click(function () {
      //* Determine player and card
      var cardName = $(this).children("a")[0].innerText;
      var playerName = $(
        $(
          $($(this).parent().parent().parent().children()[0]).children()[0]
        ).children()[0]
      )[0].innerText;
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

//? Refreshes the leader controls
function drawLeaderControls() {
  console.log("drawing leader controls");
  //* At start, just show initial appointment button
  if ($("#myRoomLeader")[0].innerText == "My Room Leader: None") {
    console.log("leader for my room not yet set.");
    $("#leaderControls").empty();
    $("#leaderControls").append(
      '<button id="appointLeader">Appoint a leader</button>'
    );

    $("#dialog").empty();
    $("#dialog").append(
      '<ul style="color:black;list-style:none; width:100%;" id="leaderAppointmentListing"></ul>'
    );
    if (players[0].includes(meesa.name)) {
      playersInRoom = players[0];
    } else {
      playersInRoom = players[1];
    }
    //* Can't appoint self as leader
    playersInRoom = playersInRoom.filter(function (p) {
      return p != meesa.name;
    });
    playersInRoom.forEach(function (p) {
      $("#leaderAppointmentListing").append(
        '<li style="text-align:center; width:100%;"><button class="selectLeaderBtn" style="width:100%">' +
          p +
          "</button></li>"
      );
    });

    $("#appointLeader").click(function () {
      $("#dialog").dialog("open");
    });

    $(".selectLeaderBtn").click(function () {
      var selectionName = $(this)[0].innerText;
      socket.emit("initial leader selection", {
        roomCode: meesa.roomCode,
        name: selectionName,
      });
      $("#dialog").dialog("close");
    });
    return;
  }

  var ctrls = $("#leaderControls");
  ctrls.empty();

  //* When I am the leader
  if (meesa.leader) {
    ctrls.append('<button id="setHostagesBtn">Set Hostages</button>');
    $("#setHostagesBtn").click(function () {
      var dl = $("#dialog");
      dl.empty();
      var numHostages = getNumHostages();
      dl.dialog("option", "title", "Select " + numHostages + " Hostages");
      dl.append(
        '<ul style="color:black;list-style:none; width:100%;" id="hostageList"></ul>'
      );
      if (players[0].includes(meesa.name)) {
        playersInRoom = players[0];
      } else {
        playersInRoom = players[1];
      }
      playersInRoom.forEach(function (p) {
        if (meesa.name == p) {
          return;
        }
        $("#hostageList").append(
          '<li style="text-align:center; width:100%;"><button class="selectHostageBtn" style="width:100%">' +
            p +
            "</button></li>"
        );
      });
      dl.append('<button id="submitHostageSelection">Submit</button>');
      dl.dialog("open");
      var hostageSelection = [];
      $(".selectHostageBtn").click(function () {
        var name = $(this).text();
        if (hostageSelection.includes(name)) {
          hostageSelection = hostageSelection.filter(function (hostage) {
            return hostage != name;
          });
          $(this).css("background-color", "white");
          console.log("deselected " + name);
        } else {
          hostageSelection.push(name);
          $(this).css("background-color", "lightblue");
          console.log("selected" + name);
        }
      });
      $("#submitHostageSelection").click(function () {
        if (hostageSelection.length != numHostages) {
          alert("You need to select exactly " + numHostages + " hostages.");
          return;
        }
        dl.dialog("close");
        socket.emit("hostage selection", {
          roomCode: meesa.roomCode,
          hostages: hostageSelection,
        });
      });
    });

    //* Show button to end game
    $("#gamePage").append(
      '<button id="endGameBtn" style="margin:auto;">End Game</button>'
    );
    $("#endGameBtn").click(function () {
      if (confirm("Are you sure you want to end the game for everyone?")) {
        if (
          confirm(
            "I'm gonna ask one more time to make sure you're absolutely certain you want to end the game."
          )
        ) {
          socket.emit("end game", meesa.roomCode);
        }
      }
    });
    return;
  }

  ctrls.append('<button id="usurpBtn">Usurp Leadership</button>');
  $("#usurpBtn").click(function () {
    socket.emit("attempt usurp", {
      roomCode: meesa.roomCode,
      name: meesa.name,
    });
  });
}

//? Returns the number of hostages needed in this round
function getNumHostages() {
  var numPlayers = players[0].length + players[1].length;
  if (numPlayers <= 10) {
    return 1;
  } else if (numPlayers <= 13) {
    switch (currentRound) {
      case 1:
      case 2:
        return 2;
      case 3:
      case 4:
      case 5:
        return 1;
    }
  } else if (numPlayers <= 17) {
    switch (currentRound) {
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
    switch (currentRound) {
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
    switch (currentRound) {
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

//? Make this player leave the current room entirely and return to the landing page
function leaveLobby() {
  socket.emit("leave room", {
    roomCode: meesa.roomCode,
    name: meesa.name,
    leaveSocketRoom: true,
  });

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

//? Change the guess for a specific player's card
function changeGuess(playerName, cardGuess) {
  var playerData = getFromStorage("playerData");
  playerData.forEach(function (p) {
    if (p.name == playerName) {
      p.cardGuess = cardGuess;
    }
  });
  saveToStorage("playerData", playerData);
  drawPlayers(players);
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
