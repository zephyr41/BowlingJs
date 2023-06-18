const prompt = require('prompt-sync')();

let nbPlayer = 0;
let playerList = [];
let maxScore = -1;
let winners = [];

nbPlayer = parseInt(prompt('How many players are we ? '));

while (isNaN(nbPlayer) || nbPlayer < 1 || nbPlayer > 6) {
    nbPlayer = parseInt(prompt('Please enter a valid number of players (1-6): '));
}

for (let index = 0; index < nbPlayer; index++) {
    const name = prompt("What is the name of player " + (index + 1) + ": ");
    let newPlayer = {
        name: name,
        score: [],
    };
    playerList.push(newPlayer);
}

for (let frame = 0; frame < 10; frame++) {
    console.log("\nTurn number " + (frame + 1) + "\n");
    for (let iteratePlayer = 0; iteratePlayer < playerList.length; iteratePlayer++) {
        let pinsFall1 = parseInt(prompt('1st try - How many pins fell for ' + playerList[iteratePlayer].name + ': '));
        while (isNaN(pinsFall1) || pinsFall1 < 0 || pinsFall1 > 10) {
            console.log('Enter a valid score (between 0 and 10).');
            pinsFall1 = parseInt(prompt('1st try - How many pins fell for ' + playerList[iteratePlayer].name + ': '));
        }
        playerList[iteratePlayer].score.push(pinsFall1);

        if (pinsFall1 === 10) {
            console.log("Strike !\n");
            playerList[iteratePlayer].score.push(10);
        } else {
            let pinsFall2 = parseInt(prompt('2nd try - How many pins fell for ' + playerList[iteratePlayer].name + ': '));
            while (isNaN(pinsFall2) || pinsFall2 < 0 || pinsFall2 > (10 - pinsFall1)) {
                console.log('Enter a valid score (between 0 and ' + (10 - pinsFall1) + ').');
                pinsFall2 = parseInt(prompt('2nd try - How many pins fell for ' + playerList[iteratePlayer].name + ': '));
            }
            playerList[iteratePlayer].score.push(pinsFall2);

            if (pinsFall1 + pinsFall2 === 10) {
                console.log('Spare !\n');
                playerList[iteratePlayer].score.push(10);
            }
        }
    }
}

// Tour bonus pour le 10e tour
for (let iteratePlayer = 0; iteratePlayer < playerList.length; iteratePlayer++) {
    const bonusRolls = playerList[iteratePlayer].score.slice(18);
    if (bonusRolls.length === 1) {
        let bonusPinsFall = parseInt(prompt('Bonus try - How many pins fell for ' + playerList[iteratePlayer].name + ': '));
        while (isNaN(bonusPinsFall) || bonusPinsFall < 0 || bonusPinsFall > 10) {
            console.log('Enter a valid score (between 0 and 10).');
            bonusPinsFall = parseInt(prompt('Bonus try - How many pins fell for ' + playerList[iteratePlayer].name + ': '));
        }
        playerList[iteratePlayer].score.push(bonusPinsFall);
    } else if (bonusRolls.length === 2) {
        let bonusPinsFall1 = parseInt(prompt('Bonus try 1 - How many pins fell for ' + playerList[iteratePlayer].name + ': '));
        while (isNaN(bonusPinsFall1) || bonusPinsFall1 < 0 || bonusPinsFall1 > 10) {
            console.log('Enter a valid score (between 0 and 10).');
            bonusPinsFall1 = parseInt(prompt('Bonus try 1 - How many pins fell for ' + playerList[iteratePlayer].name + ': '));
        }
        playerList[iteratePlayer].score.push(bonusPinsFall1);

        let bonusPinsFall2 = parseInt(prompt('Bonus try 2 - How many pins fell for ' + playerList[iteratePlayer].name + ': '));
        while (isNaN(bonusPinsFall2) || bonusPinsFall2 < 0 || bonusPinsFall2 > 10) {
            console.log('Enter a valid score (between 0 and 10).');
            bonusPinsFall2 = parseInt(prompt('Bonus try 2 - How many pins fell for ' + playerList[iteratePlayer].name + ': '));
        }
        playerList[iteratePlayer].score.push(bonusPinsFall2);
    }
}

showScore();

function showScore() {
    console.log('\nResults: ');
    for (let iteratePlayer = 0; iteratePlayer < playerList.length; iteratePlayer++) {
        const totalScore = calculateTotalScore(playerList[iteratePlayer].score);
        console.log(playerList[iteratePlayer].name + ' : ' + totalScore);
        if (totalScore > maxScore) {
            maxScore = totalScore;
            winners = [playerList[iteratePlayer].name];
        } else if (totalScore === maxScore) {
            winners.push(playerList[iteratePlayer].name);
        }
    }

    if (winners.length === 1) {
        console.log(`\nThe winner is ${winners[0]}, congratulations to the GOAT!`);
    } else {
        console.log(`\nThe winners are ${winners.join(', ')}, congratulations to the GOATs!`);
    }
}

function calculateTotalScore(scoreArray) {
    let total = 0;
    let frameIndex = 0;

    for (let frame = 0; frame < 9; frame++) {
        const frameScore = scoreArray[frameIndex] + scoreArray[frameIndex + 1];

        if (scoreArray[frameIndex] === 10) {
            total += frameScore + scoreArray[frameIndex + 2] + scoreArray[frameIndex + 3];
            frameIndex += 1;
        } else if (frameScore === 10 && scoreArray[frameIndex] !== 0) {
            total += frameScore + scoreArray[frameIndex + 2];
            frameIndex += 2;
        } else {
            total += frameScore;
            frameIndex += 2;
        }
    }

    const frameScore = scoreArray[frameIndex] + scoreArray[frameIndex + 1] + scoreArray[frameIndex + 2];
    total += frameScore;

    return total;
}