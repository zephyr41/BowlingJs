// Nécessaire pour pouvoir récupérer les inputs utilisateurs dans le CLI
const prompt = require('prompt-sync')();

// Variables nous permettant de stocker nos données
let ResultStrike = 0;
let nbPlayer = 0;
let playerList = [];
let throwplayer;

// Question est posée dans le CLI, on récupère l'information utilisateur sous la forme d'un Integer.
nbPlayer = parseInt(prompt('How many players are we? '));

// Vérifier que le nombre de joueurs est compris entre 1 et 6
while (nbPlayer < 1 || nbPlayer > 6) {
    nbPlayer = parseInt(prompt('Please enter a valid number of players (1-6): '));
}

// Création du joueur, comportant un nom et un score
for (let index = 0; index < nbPlayer; index++) {
    const nom = prompt("What is the name of player " + (index + 1) + ": ");
    let newPlayer = {
        nom: nom,
        score: [],
        throw: 0,
        keels: 10,
        ifspare: Boolean,
        ifStrike: Boolean
    };
    playerList.push(newPlayer);
}

for (let frame = 0; frame < 2; frame++) {
    console.log("Vous êtes au tour " + (frame + 1) + "\n\n\n");
    for (let iteratePlayer = 0; iteratePlayer < playerList.length; iteratePlayer++) {
        for (let throwFrame = 0; throwFrame < 2; throwFrame++) {
            console.log("\n Frame " + (frame + 1) + ", Lancer " + (throwFrame + 1) + "\n");
            const pinsFall = parseInt(prompt('How many pins fell for ' + playerList[iteratePlayer].nom + ": "));

            if (pinsFall == 10 && throwFrame === 0) {
                console.log("\n Strike ! +10 au 2 prochains lancers ! \n");
            }

            const throwplayer = playerList[iteratePlayer].throw;

            playerList[iteratePlayer].throw += 1;

            if (
                (throwFrame === 0 && playerList[iteratePlayer].score[throwplayer - 2] === 10) ||
                (throwFrame === 0 && playerList[iteratePlayer].score[throwplayer - 2] - 10 >= 10) ||
                (throwFrame === 1 && playerList[iteratePlayer].score[throwplayer - 1] === 10) ||
                (throwFrame === 1 && playerList[iteratePlayer].score[throwplayer - 1] - 10 >= 10)
            ) {
                ResultStrike = pinsFall + 10;
                playerList[iteratePlayer].score.push(ResultStrike);
                ResultStrike = 0;
                playerList[iteratePlayer].keels -= pinsFall;
                console.log("\n Quille restante " + playerList[iteratePlayer].keels);
                playerList[iteratePlayer].keels = 10;
            } else if (frame === 1 && pinsFall === 10) {
                playerList[iteratePlayer].ifStrike = true;
            } else {
                playerList[iteratePlayer].keels -= pinsFall;
                console.log("\n Quille restante " + playerList[iteratePlayer].keels);
                if (playerList[iteratePlayer].keels === 0 && throwFrame === 1) {
                    console.log("S P A R E ! Prochain coup + 10 ");
                    playerList[iteratePlayer].ifspare = true;
                }
                if (playerList[iteratePlayer].ifspare == true && throwFrame === 0) {
                    playerList[iteratePlayer].score.push(pinsFall + 10);
                } else {
                    playerList[iteratePlayer].score.push(pinsFall);
                }
            }
        }

        if (playerList[iteratePlayer].ifStrike == true && frame == 1) {
            console.log("2 Lancer Suplémentaires ! ! ! BOUUM \n");
            for (let index = 0; index < 2; index++) {
                const bonus = parseInt(prompt('How many pins fell for ' + playerList[iteratePlayer].nom + ": "));
                playerList[iteratePlayer].score.push(bonus);
            }
        } else if (playerList[iteratePlayer].ifspare == true && frame == 1) {
            console.log("Lancer Supplémentaire ! ! ! BOUUM \n");
            const bonus = parseInt(prompt('How many pins fell for ' + playerList[iteratePlayer].nom + ": "));
            playerList[iteratePlayer].score.push(bonus);
        } else {
            playerList[iteratePlayer].ifStrike = false;
            playerList[iteratePlayer].ifspare = false;
            playerList[iteratePlayer].keels = 10;
        }
    }
}

console.log(playerList);
