'use strict';
'use strict';
 
console.log('Pig Game Ready!');
 
// game state variables
 
let scores, currentScore, activePlayer, playing;
 
// player 1
const player0El = document.querySelector('.player--0');
 
//player 2
const player1El = document.querySelector('.player--1');
 
// select score element
const score0El = document.querySelector('#score--0');
 
// select score 1 element
const score1El = document.querySelector('#score--1');
 
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
 
const diceEl = document.querySelector('.dice');
 
const btnRollEl = document.querySelector('.btn--roll');
 
const btnHoldEl = document.querySelector('.btn--hold');
 
const btnNewEl = document.querySelector('.btn--new');
 
//game initialization
 
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
 
  score0El.textContent = 0;
  score1El.textContent = 0;
 
  current0El.textContent = 0;
  current1El.textContent = 0;
 
  diceEl.classList.add('hidden');
 
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
 
  player0El.classList.add('player--active');
  player0El.classList.remove('player--active');
};
 
init();
 
btnRollEl.addEventListener('click', function () {
  if (playing) {
    // dice logic
    const dice = Math.trunc(Math.random() * 6) + 1;
 
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
 
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
 
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
 
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
 
btnHoldEl.addEventListener('click', function () {
  if (playing && currentScore > 0) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
 
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
 
btnNewEl.addEventListener('click', init);
 