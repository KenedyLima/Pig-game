'use strict';

const players = document.querySelectorAll('.player');

const player0 = document.querySelector('.player--0');
const score0Obj = document.getElementById('score--0');
const currentScore0Obj = document.getElementById('current--0');

const player1 = document.querySelector('.player--1');
const score1Obj = document.getElementById('score--1');
const currentScore1Obj = document.getElementById('current--1');

const playersScore = document.querySelectorAll('.score');
const playersCurrentScore = document.querySelectorAll('.current-score');

const diceObj = document.querySelector('.dice');
const newGameButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

let score0Content = 0;
let currentScore0Content = 0;
let score1Content = 0;
let currentScore1Content = 0;

let currentPlayer = player0;

const switchPlayer = function () {
  if (currentPlayer === player0) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
    currentPlayer = player1;
  } else {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    currentPlayer = player0;
  }
};

const setTextContent = function (isArray, obj, content) {
  if (isArray) {
    for (let i = 0; i < obj.length; i++) {
      obj[i].textContent = String(content);
    }
  } else {
    obj.textContent = String(content);
  }
};

const newGame = function () {
  for (let i = 0; i < playersScore.length; i++) {
    setTextContent(true, [playersScore[i], playersCurrentScore[i]], 0);
    players[i].classList.remove('player--winner');
  }

  score0Content = 0;
  score1Content = 0;
  currentScore0Content = 0;
  currentScore1Content = 0;

  diceObj.classList.add('hidden');
};
newGame();
newGameButton.addEventListener('click', newGame);

const addToCurrentScore = function (value) {
  if (currentPlayer === player0) {
    currentScore0Content += value;
    setTextContent(false, currentScore0Obj, currentScore0Content);
  } else {
    currentScore1Content += value;
    setTextContent(false, currentScore1Obj, currentScore1Content);
  }
};

const resetCurrentPlayerScore = function () {
  if (currentPlayer === player0) {
    setTextContent(true, [score0Obj, currentScore0Obj], 0);
    score0Content = 0;
    currentScore0Content = 0;
  } else {
    setTextContent(true, [score1Obj, currentScore1Obj], 0);
    score1Content = 0;
    currentScore1Content = 0;
  }
};

const rollDice = function () {
  let diceNumber = Math.trunc(Math.random() * 6 + 1);
  switch (diceNumber) {
    case 1:
      diceObj.src = 'dices/dice-1.png';
      diceObj.classList.remove('hidden');
      resetCurrentPlayerScore();
      switchPlayer();
      break;
    case 2:
      diceObj.src = 'dices/dice-2.png';
      break;
    case 3:
      diceObj.src = 'dices/dice-3.png';
      break;
    case 4:
      diceObj.src = 'dices/dice-4.png';
      break;
    case 5:
      diceObj.src = 'dices/dice-5.png';
      break;
    case 6:
      diceObj.src = 'dices/dice-6.png';
      break;
  }

  if (diceNumber !== 1) {
    addToCurrentScore(diceNumber);
    diceObj.classList.remove('hidden');
  }
};

const hold = function () {
  if (currentPlayer === player0) {
    score0Content += currentScore0Content;

    setTextContent(false, score0Obj, score0Content);
    setTextContent(false, currentScore0Obj, 0);
    if (score0Content >= 100) {
      currentPlayer.classList.add('player--winner');
    }
    currentScore0Content = 0;
  } else {
    score1Content += currentScore1Content;

    setTextContent(false, score1Obj, score1Content);
    setTextContent(false, currentScore1Obj, 0);
    if (score1Content >= 100) {
      currentPlayer.classList.add('player--winner');
    }
    currentScore1Content = 0;
  }
  switchPlayer();
  diceObj.classList.add('hidden');
};
rollButton.addEventListener('click', rollDice);
holdButton.addEventListener('click', hold);
