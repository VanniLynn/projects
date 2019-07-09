/* 
GAME FUNCTION: 
- The player must guess a number between a min and max
- The player gets a certain amount of guesses
- Notify the player of guesses remaining 
- Notify the player of the correct answer if loose 
- Let the player choose to play again
*/


// Game values
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
    
// Asign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener 
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Listen for guess 
guessBtn.addEventListener('click', function() {
    // Adding parseInt in order to change the value from string to number
    let guess = parseInt(guessInput.value);

    // Validate input
    if(isNaN(guess) || guess < min || guess > max){
      setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    
    // Check if won
    if(guess === winningNum){
    // Game over - won
    gameOver(true,`${winningNum} is correct, YOU WIN!`);
   
   } else {
    //Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
    // Game Over- lost
    gameOver(false, `Game over, you lost. The correct number was ${winningNum}.`);

    } else {
    // Game continues - anwer wrong
    
    // Changer border color
    guessInput.style.borderColor = 'red';

    // Clear input
    guessInput.value = '';

    // Tell user its the wrong number 
    setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, 'red');
    }
   }
});

// Game over function
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

     // Disable input 
     guessInput.disabled = true;
     // Changer border color
     guessInput.style.borderColor = color;
     //  Set text color
     message.style.color = color;
     // Set message
     setMessage(msg);

    //  Play again
    guessBtn.value = 'Play Again?';
    guessBtn.className += 'play-again';
}

// Get winning number 
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message funtion
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}  