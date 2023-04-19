const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
const wrongNumberMessage = document.getElementById('wrongNumber');

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;
let isPlural = 'guesses'; 

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();
  //validation
  if (guess < 1) {
    wrongNumberMessage.style.display = 'block';
    wrongNumberMessage.style.color = 'red';
    wrongNumberMessage.innerHTML = `Must be greater than 0`;
  } else if (guess > 99) {
    wrongNumberMessage.style.display = 'block';
    wrongNumberMessage.style.color = 'red';
    wrongNumberMessage.innerHTML = `Must be less than 100`;
  } else {
      // if guess correct!
    if (guess === targetNumber) {
      //print <p> + number of attempts
      numberOfGuessesMessage.style.display = 'block';
      numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
      //print class="message" id="correct"> Congratulations, You guessed correctly!
      correctMessage.style.display = '';
      //disable next try
      submitButton.disabled = true;
      guessInput.disabled = true;
    }
      // if not correct guess
    if (guess !== targetNumber) {
      
      if (guess < targetNumber) {
        tooLowMessage.style.display = 'block';
      } else {
        tooHighMessage.style.display = 'block';
      }

      const remainingAttempts = maxNumberOfAttempts - attempts;
      if (remainingAttempts === 1) {
        isPlural = 'guess';
       
      }
      //print <p> + number of attempts
      numberOfGuessesMessage.style.display = 'block';
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${isPlural} remaining`;
    }
    //----- one attempt left ---
  
    if (attempts === maxNumberOfAttempts) {
      //disable next try
      submitButton.disabled = true;
      guessInput.disabled = true;
    }
  }
  guessInput.value = '';

  resetButton.style.display = 'block';

}

function hideAllMessages() {
  
  for (element of messages) {
    // console.log(element);
    element.style.display = "none"
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  maxNumberOfAttempts = 5;
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();