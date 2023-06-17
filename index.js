// objet joueur, il un nom string, un score int
// liste de joueurs.
let player = {
    nom: String,
    score: 0,
}
const prompt = require('prompt-sync')();
let nbPlayer = 0;
let playerList = [];

nbPlayer = parseInt(prompt('What is the number of players: ')); // parseInt permet de convertir une chaine en num
console.log(`Hey there  we are ${nbPlayer} to play`);


while (nbPlayer < 1 || nbPlayer > 6) {
    nbPlayer = parseInt(prompt('Please enter a valid number of players (1-6): '));

}

playerList = [];

for (let index = 0; index < nbPlayer; index++) {
    const nom = prompt("What is the name of player " + (index + 1) + ": ");
    let newplayer = { nom: nom,
                   score: 0,};
    playerList.push(newplayer);
}

for (let frame = 0; frame < 1; frame++) {
    console.log("Vous etes au tour : " + (frame + 1) + "\n \n \n")
    for (let iteratePlayer = 0; iteratePlayer < playerList.length; iteratePlayer++) {
        for (let throwFrame = 0; throwFrame < 2 ;throwFrame++) {
            console.log("Frame" + (frame + 1) + "Lancer" + (throwFrame+1))
            keelFall = parseInt(prompt('how many keels fall ' + playerList[iteratePlayer].nom + ' : '));
            playerList[iteratePlayer].score += keelFall
        }   
    }
}

console.log(playerList)