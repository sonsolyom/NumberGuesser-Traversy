/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

console.log('hello world')

//Game values
let min = 1,
    max = 10,
    winningNum = Math.floor(Math.random() * (max - min + 1) + min),
    guessesLeft = 3;
    //console.log(winningNum)

//UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', (e) => {
  if(e.target.className === 'new-game'){
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener('click', () =>{
  let guess = parseInt(guessInput.value);

  //Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //Check if won
  if(guess === winningNum){
    //Game over - won 
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    //Wrong guess
    guessesLeft -= 1;

    if(guessesLeft === 0){
      //Game over - lost
      gameOver(false, `Game Over... The correct number was ${winningNum}`);
    } else {
      //Game continues - answer wrong
      guessInput.style.borderColor = 'red';
      //Clear input
      guessInput.value = '';
      setMessage(`Sorry, ${guess} is not correct, you have ${guessesLeft} guesses left.`, 'red');
    }
  }
})

//Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : 'red';

  guessInput.disabled = true;
  message.style.color = color;
  //Change border color
  guessInput.style.borderColor = color;
  //Set message
  setMessage(msg);

  //Play again?
  guessBtn.value = 'New Game';
  guessBtn.className += 'new-game';
}

//Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}