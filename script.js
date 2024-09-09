let computerSequence = [];
let userSequence = [];
let level = 1;
let userTurn = false;
const boxes = document.querySelectorAll(".box");
const levelDisplay = document.querySelector(".level");
const container = document.querySelector('.container');
const gameOverMessage = document.querySelector('.game-over-message');


boxes.forEach((box) => {
  box.addEventListener("click", handleBoxClick);
});


function randomValue() {
  return Math.floor(Math.random() * 4) + 1;
}


  

function handleBoxClick(event) {
  if (!userTurn) return;
  const boxId = parseInt(event.target.id);
  userSequence.push(boxId);
  playSound(boxId);
  validateSequence();
}

function toggleEffect(boxId) {
  let box = document.getElementById(boxId);
  box.classList.add(`box${boxId}`);
  setTimeout(() => {
    box.classList.remove(`box${boxId}`);
  }, 300);
}

function generateComputerSequence() {
  userTurn = false;
  computerSequence.push(randomValue());
  let delay = 100;
  computerSequence.forEach((boxId, index) =>{
    setTimeout(() => {
      playSound(boxId);
      toggleEffect(boxId);
    }, delay);
    delay += 600;
  })
  setTimeout(() => {
    userTurn = true;
  }, delay);
}

function validateSequence() {
  let i = userSequence.length - 1; //last user input
  if (computerSequence[i] != userSequence[i]) {
    endGame();
  } else if (computerSequence.length == userSequence.length) {
    level++;
    document.querySelector(".level").textContent = `Level : ${level}`;
    userSequence = []; //clear usersequence after increasing the level
    setTimeout(generateComputerSequence, 1000); //wait to generate the computer sequence again
  } 
}

function startGame() {
  resetValues();
  playSound('game-start');
  setTimeout(generateComputerSequence(),2000);
}


function endGame() {
  container.style.display = 'none';
  gameOverMessage.style.display = 'block';
  playSound('game-over');
  setTimeout(() => {
    container.style.display = 'flex';  // Show game UI again
    gameOverMessage.style.display = 'none';
    resetValues();
  }, 3000);
}
function resetGame() {
  playSound('reset-game');
  resetValues();
}

function resetValues() {
  computerSequence = [];
  userSequence = [];
  level = 1;
  userTurn = false;
  levelDisplay.textContent = `Level: ${level}`;
}

function playSound(type) {
  let audioFile = '';
  switch(type) {
    case 'game-start':
      audioFile = 'audio/game-start.mp3';
      break;
    case 'game-over':
      audioFile = 'audio/game-over.mp3';
      break;
    case 'reset-game':
      audioFile = 'audio/reset-game.mp3';
      break;
    default:
      audioFile = `audio/simonSound${type}.mp3`;
      break;
  }
  let audio = new Audio(audioFile);
  audio.play();
}