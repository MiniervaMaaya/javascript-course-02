'use strict';
 
//constants
const MIN_NUMBER = 1;
const MAX_NUMBER = 20;
const STARTING_SCORE = 20;
 
// Cached selectors
const bodyEl = document.body;
const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const numberEl = document.querySelector('.number');
const highscoreEl = document.querySelector('.highscore');
const guessInputEl = document.querySelector('.guess');
const checkBtnEl = document.querySelector('.check');
const againkBtnEl = document.querySelector('.again');
 
//UI Helpers
function setMessage(text) {
  messageEl.textContent = text;
}
 
function setNumber(value) {
  numberEl.textContent = value;
}
 
function setHighScore(value) {
  highscoreEl.textContent = value;
}
 
function setBackground(color) {
  bodyEl.style.backgroundColor = color;
}
 
function disablePlay(disabled) {
  guessInputEl.disabled = disabled;
  checkBtnEl.disabled = disabled;
}
 
function clearInput() {
  guessInputEl.value = '';
}
 
//Game State Variables
let secretNumber = Math.trunc(Math.random() * MAX_NUMBER) + MIN_NUMBER;
console.log('Your secret number is: ', secretNumber);
let score = STARTING_SCORE;
let highscore = 0;
 
function resetGameState() {
  score = STARTING_SCORE;
  secretNumber = Math.trunc(Math.random() * MAX_NUMBER) + MIN_NUMBER;
}
 
function renderInitialUI() {
  setMessage('Start Guessing...');
  setNumber('?');
  setHighScore(score);
  clearInput();
  disablePlay(false);
  setBackground('');
}
 
renderInitialUI();
 
///////////
//BASIC GAME LOGIC
 
checkBtnEl.addEventListener('click', function () {
  const guess = Number(guessInputEl.value);
  console.log('Players guessed:', guess);
 
  // input validation
  //new
  if (!guess) return setMessage('Please input a number');
 
  if (guess < MIN_NUMBER || guess > MAX_NUMBER) {
    return setMessage(`Number must be between ${MIN_NUMBER} and ${MAX_NUMBER}`)
  }
 
  if (guess === secretNumber) {
    setMessage('You Have Won!');
    setNumber(secretNumber);
    setBackground('green');
    if (score > highscore) {
        highscore = score;
        setHighScore(highscore);
    }
    disablePlay(true);
    clearInput('');
    return;
 
  }  setMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
  score--;
  setScore(score);

  if (score < 1) {
    setMessage('💥 You lost!');
    setNumber(secretNumber);
    setBackground('red');
    disablePlay(true);
    clearInput();
  }
});

againBtnEl.addEventListener('click', function () {
  resetGameState();
  renderInitialUI();
});

window.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !checkBtnEl.disabled) {
    checkBtnEl.click();
  }
});
