const prompt = require('prompt-sync')();
let CountThrows = 0
let ResultStrike = 0;
let nbPlayer = 0;
let playerList = [];

nbPlayer = parseInt(prompt('How many players are we? '));

// Vérifier que le nombre de joueurs est compris entre 1 et 6
while (nbPlayer < 1 || nbPlayer > 6) {
    nbPlayer = parseInt(prompt('Please enter a valid number of players (1-6): '));
}

for (let index = 0; index < nbPlayer; index++) {
    const nom = prompt("What is the name of player " + (index + 1) + ": ");
    let newPlayer = {
        nom: nom,
        score: [],
    };
    playerList.push(newPlayer);
    
}

for (let frame = 0; frame < 2; frame++) {
    console.log("Vous êtes au tour " + (frame + 1) + "\n\n\n");
    for (let iteratePlayer = 0; iteratePlayer < playerList.length; iteratePlayer++) {
        for (let throwFrame = 0; throwFrame < 2; throwFrame++) {
            console.log("Frame " + (frame + 1) + ", Lancer " + (throwFrame + 1) + "\n");
            
            
            const pinsFall = parseInt(prompt('How many pins fell for ' + playerList[iteratePlayer].nom + ': '));
            if(pinsFall == 10){
                console.log("\n Strike ! +10 au 2 prochain lancer ! \n")
               
            }
            
            if (playerList[iteratePlayer].score[(CountThrows-1)] == 10 || playerList[iteratePlayer].score[(CountThrows-2)] == 10 ) {
                console.log("-2 case à partir du 10 : ")
                console.log(playerList[iteratePlayer].score[(CountThrows-2)])
                ResultStrike = pinsFall + 10;
                playerList[iteratePlayer].score.push((ResultStrike));
                ResultStrike = 0;
            }

            else if ((playerList[iteratePlayer].score[(CountThrows-1)] + playerList[iteratePlayer].score[CountThrows]) == 10){
                console.log("\n SPARE ! + 10 au prochain lancer \n")
                playerList[iteratePlayer].score.push(pinsFall + 10);
            }
            else {
                playerList[iteratePlayer].score.push(pinsFall);
            }
            
            
            CountThrows++;
        }

    }
    
}

console.log(playerList);


// si un joueur fais un spare ( 10 quille en 2 coups, donc par lancer de frame, coup suivant + 10 ptn)
// si un joueur fait un strike + 10 au 2 lancer suivant
// si 10e coup = strike = 2 lancer supplémentaire ou spare, 1 lancer de plus