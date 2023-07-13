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
            result = 'lost.';
        } else if (computerMove === 'paper') {
            result = 'won.';
        } else if (computerMove === 'scissors') {
            result = 'tied.';
        }
    }
    else if (userMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'won.';
        } else if (computerMove === 'paper') {
            result = 'tied.';
        } else if (computerMove === 'scissors') {
            result = 'lost.';
        }
    }
    else if (userMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'tied.';
        } else if (computerMove === 'paper') {
            result = 'lost.';
        } else if (computerMove === 'scissors') {
            result = 'won.';
        }
    }

    //Calculating and saving the correct score based on the result.
    if (result === 'won.') {
        score.wins++;
    }
    else if (result === 'lost.') {
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

    const computerMove = document.querySelector('.computer-move-button')
    
    //Show the image and caption for the computer move once this function runs.
    computerMove.classList.remove('hide');
    document.querySelector('.computer-move-caption').classList.remove('hide');

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove.innerHTML = '<img class = "computer-move-img" src = "rock.png">'; 
        return 'rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove.innerHTML = '<img class = "computer-move-img" src = "paper.png">'; 
        return 'paper';
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove.innerHTML = '<img class = "computer-move-img" src = "scissors.png">'; 
        return 'scissors';
    }
}

//Chooses the correct color for displaying the result.
function selectResultColor(result) {
    const resultText = document.querySelector('.js-result-text');

    resultText.classList.toggle('green', result === 'won.')
    resultText.classList.toggle('red', result === 'lost.')
    resultText.classList.toggle('yellow', result === 'tied.')
}

//Prints the score.
function printScore() {
    document.querySelector('.js-score-text').innerText =
        `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;

    document.querySelector('.reset-button').classList.remove('hide');
}

function resetButtonClick() {
    //Reset score and update immediately
    score.wins = score.losses = score.ties = 0;
    printScore();
    localStorage.removeItem('score')

    //Hide the previous results 
    document.querySelector('.computer-move-button').innerHTML = '<img class = "computer-move-img" src = "transparent.png">'; //This gets rid of only the image inside the button
    document.querySelector('.js-result-text').classList.add('hide');
    document.querySelector('.js-choices-text').classList.add('hide');
}
   