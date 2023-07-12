const score = JSON.parse(localStorage.getItem('score')) ||
{
    wins: 0,
    losses: 0,
    ties: 0
};

function playGame(userMove) {
    let result = '';
    let computerMove = pickComputerMove();

    //Conditions for determining result.
    if (userMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'lose.';
        } else if (computerMove === 'paper') {
            result = 'win.';
        } else if (computerMove === 'scissors') {
            result = 'tied.';
        }
    }
    else if (userMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'win.';
        } else if (computerMove === 'paper') {
            result = 'tied.';
        } else if (computerMove === 'scissors') {
            result = 'lose.';
        }
    }
    else if (userMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'tied.';
        } else if (computerMove === 'paper') {
            result = 'lose.';
        } else if (computerMove === 'scissors') {
            result = 'win.';
        }
    }

    //Calculating and saving the correct score based on the result.
    if (result === 'win.') {
        score.wins++;
    }
    else if (result === 'lose.') {
        score.losses++;
    }
    else if (result === 'tied.') {
        score.ties++;
    }
    //(local storage can only save strings).
    localStorage.setItem('score', JSON.stringify(score));

    //Display result (with correct color) and choices made.
    document.querySelector('.js-result-text').classList.remove('hide');
    document.querySelector('.js-result-text').innerText = `\nYou ${result}`;
    selectResultColor(result);

    document.querySelector('.js-choices-text').classList.remove('hide');
    document.querySelector('.js-choices-text').innerText =
        `You picked ${userMove}. The computer picked ${computerMove}.`;
}

//Picks the move for the computer.
function pickComputerMove() {
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        return 'rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        return 'paper';
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        return 'scissors';
    }
}

//Chooses the correct color for displaying the result.
function selectResultColor(result) {
    const resultText = document.querySelector('.js-result-text');

    resultText.classList.toggle('green', result === 'win.')
    resultText.classList.toggle('red', result === 'lose.')
    resultText.classList.toggle('yellow', result === 'tied.')
}

//Prints the score.
function printScore() {
    document.querySelector('.js-score-text').innerText =
        `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;

    document.querySelector('.reset-button').classList.add('show');
}

function resetButtonClick() {
    score.wins = score.losses = score.ties = 0;
    printScore();
    localStorage.removeItem('score')

    document.querySelector('.js-result-text').classList.add('hide');
    document.querySelector('.js-choices-text').classList.add('hide');
}