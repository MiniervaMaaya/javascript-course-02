'use strict';
 
// DOM Element Selection
 
const messageEl = document.querySelector('.message');
console.log(messageEl);
 
// messageEl.textContent = 'Hello from javascript';
 
const scoreEl = document.querySelector('.score');
// scoreEl.textContent = 15;
 
const numberEl = document.querySelector('.number');
// numberEl.textContent = 10;
 
const highscoreEl = document.querySelector('.highscore');
// highscoreEl.textContent = 18;
 
const guessInputEl = document.querySelector('.guess');
// guessInputEl.value = 6;
 
//Game State Variables
 
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log('Your secret number is: ', secretNumber);
let score = 20;
let highscore = 0;
 
document.querySelector('.score').textContent = score;
document.querySelector('.highscore').textContent = highscore;
 
///////////
//BASIC GAME LOGIC
 
document.querySelector('.check').addEventListener('click', function () {
  //code block
  console.log('Check Button Clicked!');
  const guess = Number(document.querySelector('.guess').value);
  console.log('Players guessed:', guess);
 
  // input validation
  if (!guess && guess !== 0) {
    document.querySelector('.message').textContent = 'Please input a number!';
    return;
  }
 
  if (guess < 1 ||  guess > 20)  {
    document.querySelector('.message').textContent = 'Number must be between 1 and 20';
    return;
  }
 
  if (guess === secretNumber) {
    console.log('Correct guess!!!!');
    document.querySelector('.message').textContent = 'Correct Number';
    document.querySelector('.number').textContent = secretNumber;
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    document.querySelector('.guess').disabled = true;
    document.querySelector('.check').disabled = true;
    document.querySelector('.message').textContent = 'You Won';
    document.body.style.backgroundColor = 'green';
    document.querySelector('.guess').value = '';
  } else if (guess > secretNumber) {
    console.log('Too High!');
    document.querySelector('.message').textContent = 'Too High!';
    score--;
    document.querySelector('.score').textContent = score;
    if (score < 1) {
      document.querySelector('.guess').disabled = true;
      document.querySelector('.check').disabled = true;
      document.querySelector('.message').textContent = 'Game Over! Start over..';
      document.querySelector('.number').textContent = secretNumber;
      document.body.style.backgroundColor = 'red';
      document.querySelector('.guess').value = '';
    }
  } else if (guess < secretNumber) {
    document.querySelector('.message').textContent = 'Too Low!';
    console.log('Too Low!');
    score--;
    document.querySelector('.score').textContent = score;
    if (score < 1) {
      document.querySelector('.guess').disabled = true;
      document.querySelector('.check').disabled = true;
      document.querySelector('.message').textContent = 'You Lost';
      document.querySelector('.number').textContent = secretNumber;
      document.body.style.backgroundColor = 'red';
      document.querySelector('.guess').value = '';
    }
  }
});
 
document.querySelector('.again').addEventListener('click', function () {
  //block
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.message').textContent = 'Start Guessing...';
  //restart secret number display
  document.querySelector('.number').textContent = '?';
  //restart
  document.querySelector('.score').textContent = score;
  // empty the guest input value
  document.querySelector('.guess').value = '';
 
  document.querySelector('.guess').disabled = false;
  document.querySelector('.check').disabled = false;
  document.body.style.backgroundColor = '';
});
 
 