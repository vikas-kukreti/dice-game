const players = document.querySelectorAll('.player-container')
const container = document.querySelector('.container')
const newGame = document.querySelector('#btn-new-game')
const rollDice = document.querySelector('#btn-roll-dice')
const passGame = document.querySelector('#btn-pass-game')
const diceImg = document.querySelector('#dice-img')

const totals = [0, 0]
const current = [0, 0]
let currentPlayer = 0

const numbers = [
    "six",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
]

function getNumber() {
    return 1 + Math.floor(Math.random() * 6)
}

function render(diceFace) {
    diceImg.src = `icons/dice-six-faces-${numbers[diceFace]}.svg`
    let gameOver = false
    players.forEach((player, index) => {
        player.querySelector('.number').textContent = totals[index]
        player.querySelector('.current-score').textContent = current[index]
        if(currentPlayer === index) {
            player.classList.add('active')
        } else {
            player.classList.remove('active')
        }
        if(totals[index] >= 20) {
            player.classList.add('won')
            gameOver = true
        } else {
            player.classList.remove('won')
        }
    })

    if(gameOver) {
        container.classList.add('over')
    } else {
        container.classList.remove('over')
    }
    diceImg.classList.remove('roll')
}

function resetGame() {
    totals[0] = 0;
    totals[1] = 0;
    current[0] = 0;
    current[1] = 0;
    currentPlayer = 0;
    render(6)
}

function onDiceRoll() {
    if(diceImg.classList.contains('roll')) {
        return;
    }
    diceImg.classList.add('roll')
    const currentValue = getNumber();
    setTimeout(function () {
        diceImg.src = `icons/dice-six-faces-${numbers[currentValue]}.svg`
    }, 960)
    setTimeout(function() {
        current[currentPlayer] = currentValue;
        if(currentValue === 1) {
            totals[currentPlayer] = 0;
        } else {
            totals[currentPlayer] += currentValue; 
        }
        
        if(currentPlayer === 0) {
            currentPlayer = 1;
        } else {
            currentPlayer = 0;
        }
        render(currentValue)
    }, 1000)
}

newGame.addEventListener('click', resetGame)

rollDice.addEventListener('click', onDiceRoll)

render(6)