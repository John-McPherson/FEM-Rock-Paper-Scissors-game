var gameState = {
    playerChoice: '',
    cpuChoice: '',
    score: 0
}

let gameControls = document.querySelectorAll('.game-controls');
let choices = ['rock', 'paper', 'scissors'];
let rules = {
    "rock": {
        'scissors': true,
        'paper': false
    },
    "paper": {
        'rock': true,
        'scissors': false
    },
    "scissors": {
        'paper': true,
        'rock': false
    }
}



gameControls.forEach(gameControl => {
    gameControl.addEventListener("click", (event) => {
        gameState.playerChoice = event.target.dataset.select;
        gameState.cpuChoice = choices[getRandomInt(3)];
        checkResults();
    });
});

function checkResults() {
    let {
        playerChoice,
        cpuChoice
    } = gameState;

    if (playerChoice == cpuChoice) {
        console.log('draw')
        return
    }
    if (rules[playerChoice][cpuChoice]) {
        console.log('win');
        incrementScore();
        return
    }
    console.log('lose')
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function resetGameState() {
    gameState.playerChoice = '';
    gameState.cpuChoice = '';
}

function incrementScore() {
    gameState.score++
}