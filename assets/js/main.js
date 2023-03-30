var gameState = {
    playerChoice: '',
    cpuChoice: '',
    score: 0,
    msg: ''
}

let gameArea = document.querySelector('.game-area');

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



function checkResults() {
    let {
        playerChoice,
        cpuChoice
    } = gameState;

    if (playerChoice == cpuChoice) {
        gameState.msg = 'Draw'
        showResults();
        return
    }
    if (rules[playerChoice][cpuChoice]) {
        gameState.msg = 'You Win!'
        showResults();
        incrementScore();
        updateScore();
        return
    }
    gameState.msg = 'You Lose!'
    showResults()
    decrementScore();
    updateScore();

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function resetGameState() {
    gameState.playerChoice = '';
    gameState.cpuChoice = '';
    gameState.msg = '';
}

function incrementScore() {
    gameState.score++
}

function decrementScore() {
    gameState.score--
}

function updateScore() {
    setTimeout(() => {

        document.getElementById('score').innerHTML = gameState.score
    }, "3000");
}

function showControls() {
    resetGameArea();
    gameArea.classList.add('controls')
    let html = ` 
            <button class="game-controls" data-select="paper">paper</button>
            <button class="game-controls" data-select="scissors">scissors</button>
            <button class="game-controls" data-select="rock">rock</button>
            `
    gameArea.innerHTML = html;
    let gameControls = document.querySelectorAll('.game-controls');
    gameControls.forEach(gameControl => {
        gameControl.addEventListener("click", (event) => {
            gameState.playerChoice = event.target.dataset.select;
            gameState.cpuChoice = choices[getRandomInt(3)];
            checkResults();
        });
    });
}

function showResults() {
    resetGameArea();
    gameArea.classList.add('results')
    let html = `
            <div>
                <h2>you picked</h2>
                <div div class = "selection ${gameState.playerChoice}" >
                    <p>${gameState.playerChoice}</p>
                </div>
            </div>      
            <div id="playAgain" class="hide">
                <h2>${gameState.msg}</h2>
                <button id="play-again-btn">play again</button>
            </div>
            <div>
                <h2>the house picked</h2>
                <div class="selection">
                    <p>${gameState.cpuChoice}</p>
                </div>
            </div>`
    setTimeout(() => {
        let selection = document.getElementsByClassName('selection');
        selection[1].classList.add(`${gameState.cpuChoice}`)
        setTimeout(() => {
            gameArea.classList.add('stage2')
            document.getElementsByClassName('hide')[0].classList.remove('hide')
        }, "1000");
    }, "2000");
    gameArea.innerHTML = html;
    document.getElementById('play-again-btn').addEventListener("click", (event) => {
        showControls();
    });
}


function resetGameArea() {
    gameArea.classList.remove('controls');
    gameArea.classList.remove('results');
    gameArea.classList.remove('stage2');
}


resetGameArea()
showControls();