
class Card {
    constructor(name, color, team, url, shy, coy, foolish, immune){
        this.name = name
        this.color = color
        this.team = team
        this.url = url
        this.countMoved = 0
        this.firstShared = null
        this.shy = shy
        this.coy = coy
        this.foolish = foolish
        this.immune = immune
    }

    // these static functions are to modify conditions of the cards themselves, 
    // not to perform the share gui action
    static color_share(p1, p2){
        // sharing behaves symmetrically
        color_share_help(p1, p2)
        color_share_help(p2, p1)
    }

    static color_share_help(p1, p2){
        // currently no cards in this list have mod
    }

    static card_share(p1, p2){
        // sharing behaves symmetrically
        card_share_help(p1, p2)
        card_share_help(p2, p1)
    }

    static card_share_help(p1, p2){
        // First share tracking (needed for Clone / Rival)
        if (p2.firstShared == null){
            p2.firstShared = p1
        }
        
        // Immune exemption
        if (!p2.immune){

            // Dealer mechanic
            if (p1.name == "Dealer (Blue)" || p1.name == "Dealer (Red)"){
                p2.foolish = true
            }
            // Criminal mechanic
            else if (p1.name == "Criminal (Blue)" || p1.name == "Criminal (Red)"){
                p2.shy = true
            }
            // Thug mechanic
            else if (p1.name == "Thug (Blue)" || p1.name == "Thug (Red)"){
                p2.coy = true
            }

            // Remove offsetting conditions
            if (p2.foolish && p2.shy){
                p2.foolish = false
                p2.shy = false
            }
            if (p2.foolish && p2.coy){
                p2.foolish = false
                p2.coy = false
            }
        }
    }
}

// Allows us to pass in name and receive a new instantiation of the particular card we want
function createPlayer(name){
    if (name == "Bomber"){ return createBomber()}
    else if (name == "President"){return createPresident()}
    else if (name == "Red Team"){return createRedTeam()}
    else if (name == "Blue Team"){return createBlueTeam()}
    else if (name == "Agoraphobe"){return createAgoraphobe()}
    else if (name == "Traveler"){return createTraveler()}
    else if (name == "Clone"){return createClone()}
    else if (name == "Robot"){return createRobot()}
    else if (name == "Intern"){return createIntern()}
    else if (name == "Victim"){return createVictim()}
    else if (name == "Survivor"){return createSurvivor()}
    else if (name == "Rival"){return createRival()}
    else if (name == "Coyboy (Red)"){return createRedCoyBoy()}
    else if (name == "Coyboy (Blue)"){return createBlueCoyBoy()}
    else if (name == "Shyguy (Red)"){return createRedShyGuy()}
    else if (name == "Shyguy (Blue)"){return createBlueShyGuy()}
    else if (name == "Spy (Red)"){return createRedSpy()}
    else if (name == "Spy (Blue)"){return createBlueSpy()}
    else if (name == "Dealer (Red)"){return createRedDealer()}
    else if (name == "Dealer (Blue)"){return createBlueDealer()}
    else if (name == "Criminal (Red)"){return createRedCriminal()}
    else if (name == "Criminal (Blue)"){return createBlueCriminal()}
    else if (name == "Thug (Red)"){return createRedThug()}
    else if (name == "Thug (Blue)"){return createBlueThug()}
    else if (name == "Invincible (Red)"){return createRedInvincible()}
    else if (name == "Invincible (Blue)"){return createBlueInvincible()}
}


// Card constructors

function createBomber(){
    return Card("Bomber", "red", "red", "bomber_red", false, false, false, false)
}

function createPresident(){
    return Card("President", "blue", "blue", "president_blue", false, false, false, false)
}

function createRedTeam(){
    return Card("Red Team", "red", "red", "default_red", false, false, false, false)
}

function createBlueTeam(){
    return Card("Blue Team", "blue", "blue", "default_blue", false, false, false, false)
}

function createAgoraphobe(){
    return Card("Agoraphobe", "grey", "grey", "agoraphobe", false, false, false, false)
}

function createTraveler(){
    return Card("Traveler", "grey", "grey", "traveler", false, false, false, false)
}

function createClone(){
    return Card("Clone", "grey", "grey", "clone", false, false, false, false)
}

function createRobot(){
    return Card("Robot", "grey", "grey", "robot", false, false, false, false)
}

function createIntern(){
    return Card("Intern", "grey", "grey", "intern", false, false, false, false)
}

function createVictim(){
    return Card("Victim", "grey", "grey", "victim", false, false, false, false)
}

function createSurvivor(){
    return Card("Survivor", "grey", "grey", "survivor", false, false, false, false)
}

function createRival(){
    return Card("Rival", "grey", "grey", "rival", false, false, false, false)
}

function createRedCoyBoy(){
    return Card("Coyboy (Red)", "red", "red", "coyboy_red", true, false, false, false)
}

function createBlueCoyBoy(){
    return Card("Coyboy (Blue)", "blue", "blue", "coyboy_blue", true, false, false, false)
}

function createRedShyGuy(){
    return Card("Shyguy (Red)", "red", "red", "shyguy_red", false, true, false, false)
}

function createBlueShyGuy(){
    return Card("Shyguy (Blue)", "blue", "blue", "shyguy_blue", false, true, false, false)
}

function createRedSpy(){
    return Card("Spy (Red)", "blue", "red", "redspy_blue", false, false, false, false)
}

function createBlueSpy(){
    return Card("Spy (Blue)", "red", "blue", "bluespy_red", false, false, false, false)
}

function createRedDealer(){
    return Card("Dealer (Red)", "red", "red", "dealer_red", false, false, false, false)
}

function createBlueDealer(){
    return Card("Dealer (Blue)", "blue", "blue", "dealer_blue", false, false, false, false)
}

function createRedCriminal(){
    return Card("Criminal (Red)", "red", "red", "criminal_red", false, false, false, false)
}

function createBlueCriminal(){
    return Card("Criminal (Blue)", "blue", "blue", "criminal_blue", false, false, false, false)
}

function createRedThug(){
    return Card("Thug (Red)", "red", "red", "thug_red", false, false, false, false)
}

function createBlueThug(){
    return Card("Thug (Blue)", "blue", "blue", "thug_blue", false, false, false, false)
}

function createRedInvincible(){
    return Card("Invincible (Red)", "red", "red", "invincible_red", false, false, false, true)
}

function createBlueInvincible(){
    return Card("Invincible (Blue)", "blue", "blue", "invincible_blue", false, false, false, true)
}

