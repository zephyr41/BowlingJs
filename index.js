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
console.log(`Hey there ${nbPlayer}`);

while (nbPlayer < 1 || nbPlayer > 6) {
    nbPlayer = parseInt(prompt('Please enter a valid number of players (1-6): '));
    console.log(`Hey there ${nbPlayer}`);
}

playerList = [];

for (let index = 0; index < nbPlayer; index++) {
    const nom = prompt("What is the name of player " + (index + 1) + ": ");
    let player = { nom: nom };
    playerList.push(player.nom);
}

console.log(playerList);

