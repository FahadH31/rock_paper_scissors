// Gets score from local storage, or create default.
const score = JSON.parse(localStorage.getItem('score')) ||
{
    wins: 0,
    losses: 0,
    ties: 0
};


// Picks the move for the computer.
function doComputerMove() {
    const randomNumber = Math.random();
    const computerMoveDisplay = document.querySelector('#computer-move-button');
    
    // Show the image and caption for the computer move.
    computerMoveDisplay.classList.remove('hide');
    document.querySelector('#computer-move-caption').classList.remove('hide');

    // Decides which move is chosen.
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMoveDisplay.innerHTML = '<img class = "move-img" src = "Images/rock.png">'; 
        return 'rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMoveDisplay.innerHTML = '<img class = "move-img" src = "Images/paper.png">'; 
        return 'paper';
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMoveDisplay.innerHTML = '<img class = "move-img" src = "Images/scissors.png">'; 
        return 'scissors';
    }
}



function playGame(userMove) {
    let result = '';
    let computerMove = doComputerMove();
    const userMoveDisplay = document.querySelector('#user-move-button');

    // Show the button and caption for the user move.
    userMoveDisplay.classList.remove('hide');
    document.querySelector('#user-move-caption').classList.remove('hide');

    // Conditions for determining result (and displaying user move).
    if (userMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'tied.';
        } else if (computerMove === 'paper') {
            result = 'lost.';
        } else if (computerMove === 'scissors') {
            result = 'won.';
        }
        userMoveDisplay.innerHTML = '<img class = "move-img" src = "Images/rock.png">'; 
    }
    else if (userMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'won.';
        } else if (computerMove === 'paper') {
            result = 'tied.';
        } else if (computerMove === 'scissors') {
            result = 'lost.';
        }
        userMoveDisplay.innerHTML = '<img class = "move-img" src = "Images/paper.png">'; 
    }
    else if (userMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'lost.';
        } else if (computerMove === 'paper') {
            result = 'won.';
        } else if (computerMove === 'scissors') {
            result = 'tied.';
        }
        userMoveDisplay.innerHTML = '<img class = "move-img" src = "Images/scissors.png">'; 
    }
    

    // Calculating, saving, and printing the correct score based on the result.
    if (result === 'won.') {
        score.wins++;
    }
    else if (result === 'lost.') {
        score.losses++;
    }
    else if (result === 'tied.') {
        score.ties++;
    }
    // (local storage can only save strings).
    localStorage.setItem('score', JSON.stringify(score));
    printScore();

    // Display result (with correct color) and choices made.
    document.querySelector('.js-result-text').classList.remove('hide');
    document.querySelector('.js-result-text').innerText = `\nYou ${result}`;
    selectResultColor(result);

    // Change prompt text.
    document.querySelector('.prompt-text').innerText = "Make another choice to keep playing!"
}



// Chooses the correct color for displaying the result.
function selectResultColor(result) {
    const resultText = document.querySelector('.js-result-text');

    resultText.classList.toggle('green', result === 'won.')
    resultText.classList.toggle('red', result === 'lost.')
    resultText.classList.toggle('yellow', result === 'tied.')
}



// Prints the score.
function printScore() {
    document.querySelector('.js-score-text').innerText =
        `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;

    document.querySelector('.reset-button').classList.remove('hide');
}


function clickResetButton() {
    // Reset score and update immediately
    score.wins = score.losses = score.ties = 0;
    printScore();

    localStorage.removeItem('score')

    // Hide the previous results 
    document.querySelector('.prompt-text').innerText = 'Make your choice'
    document.querySelector('#user-move-button').classList.add('hide');
    document.querySelector('#user-move-caption').classList.add('hide');
    document.querySelector('#computer-move-button').classList.add('hide');
    document.querySelector('#computer-move-caption').classList.add('hide');
    document.querySelector('.js-result-text').classList.add('hide');
    document.querySelector('.js-choices-text').classList.add('hide');
}
   