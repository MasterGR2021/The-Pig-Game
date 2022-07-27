'use strict';

let player1Turn = true;
let player1Score = 0;
let player2Score = 0;

let player1CurrentScore = 0;
let player2CurrentScore = 0;

let player1Wins = false;
let player2Wins = false;

const modal = document.querySelector('#helpModal');
const overlay = document.querySelector('#overlay');
const btnCloseModal = document.querySelector('#closeModal');
const btnOpenModal = document.querySelector('#help');

const rollDice = document.querySelector('#rollDice');
const throwDiceImages = document.querySelector('#throwDiceImages');
const pass = document.querySelector('#pass');
const turn = document.querySelector('#turn');

const currentScore1 = document.querySelector('#currentScore1');
const currentScore2 = document.querySelector('#currentScore2');

const finalScore1 = document.querySelector('#finalScore1');
const finalScore2 = document.querySelector('#finalScore2');

const winnerName = document.querySelector('#winnerName');
const winnerScreen = document.querySelector('#winnerScreen');
const winnerFace = document.querySelector('#winnerFace');

const resetGamebtn = document.querySelectorAll('#newGame');

let randomVal = Math.trunc(Math.random() * 6 + 1);

const generateRandomThrow = function () {
  randomVal = Math.trunc(Math.random() * 6 + 1);
};

const updateVals = function () {
  finalScore1.textContent = player1Score;
  finalScore2.textContent = player2Score;

  currentScore1.textContent = player1CurrentScore;
  currentScore2.textContent = player2CurrentScore;
};

const openOverlay = function () {
  overlay.classList.remove('hidden');
};

const closeOverlay = function () {
  overlay.classList.add('hidden');
};

const closeModal = function () {
  closeOverlay();
  modal.classList.add('hidden');
};

const openModal = function () {
  openOverlay();
  modal.classList.remove('hidden');
};

const updateTurn = function () {
  if (player1Wins) {
    turn.src = '/img/turn-win.svg';
  }
  if (player1Turn) {
    if (turn.classList.contains('opposite')) {
      turn.classList.remove('opposite');
    }
  } else {
    if (!turn.classList.contains('opposite')) {
      turn.classList.add('opposite');
    }
  }
};

// updating intial values
updateVals();

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const checkWin = function () {
  if (player1CurrentScore + player1Score >= 100) {
    player1Wins = true;
    player2Wins = false;
  } else if (player2CurrentScore + player2Score >= 100) {
    player2Wins = true;
    player1Wins = false;
  }

  if (player1Wins) {
    updateTurn();
    throwWinnerMenu();
  } else if (player2Wins) {
    updateTurn();
    throwWinnerMenu();
  }
};

const openWinnerScreen = function () {
  winnerScreen.classList.remove('hidden');
};

const closeWinnerScreen = function () {
  winnerScreen.classList.add('hidden');
};

const throwWinnerMenu = function () {
  if (player1Wins) {
    winnerName.textContent = 'Player 1';
    winnerFace.src = '/img/faceM2.svg';
  } else if (player2Wins) {
    winnerName.textContent = 'Player 2';
    winnerFace.src = '/img/faceF.svg';
  }
  if (player1Wins || player2Wins) {
    openOverlay();
    openWinnerScreen();
  }
};

const resetGame = function () {
  player1Score = 0;
  player2Score = 0;
  player1CurrentScore = 0;
  player2CurrentScore = 0;
  player1Turn = true;
  player1Wins = false;
  player2Wins = false;
  generateRandomThrow();
  updateTurn();
  updateVals();
  closeOverlay();
  closeWinnerScreen();
  turn.src = '/img/turn.svg';
};

const changeDiceImage = function (randomVal) {
  throwDiceImages.src = `/img/Dice${randomVal}.png`;
};

for (let i = 0; i < resetGamebtn.length; i++) {
  resetGamebtn[i].addEventListener('click', function () {
    resetGame();
  });
}

rollDice.addEventListener('click', function () {
  generateRandomThrow();
  changeDiceImage(randomVal);

  if (player1Turn) {
    if (randomVal === 1) {
      player1Turn = false;
      updateTurn();
      player1CurrentScore = 0;
    } else {
      player1CurrentScore += randomVal;
      checkWin();
    }
  } else {
    if (randomVal === 1) {
      player1Turn = true;
      updateTurn();
      player2CurrentScore = 0;
    } else {
      player2CurrentScore += randomVal;
      checkWin();
    }
  }
  updateVals();
});

pass.addEventListener('click', function () {
  if (player1Turn) {
    player1Score += player1CurrentScore;
    player1CurrentScore = 0;
    player1Turn = false;
  } else {
    player2Score += player2CurrentScore;
    player2CurrentScore = 0;
    player1Turn = true;
  }
  updateTurn();
  updateVals();
});
