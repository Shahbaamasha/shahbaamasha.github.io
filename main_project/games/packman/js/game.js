'use strict'

const WALL = '🚧'
const FOOD = '◾'
const EMPTY = ' '
const POWER_FOOD = '🧁'
const CHERRY = '🍒'

let gInterval
let collectedFood = 0
let collectedCherry = 10
let gMaxFood = 56
let cherryInterval

let gGame = {
  score: 0,
  isOn: false,
}
let gBoard

function init() {
  gBoard = buildBoard()
  createPacman(gBoard)
  createGhosts(gBoard)
  cherryInterval = setInterval(addCherry, 5000)

  printMat(gBoard, '.board-container')
  gGame.isOn = true
}

function start() {
  let elAlert = document.querySelector('.modal')
  elAlert.style.display = 'none'
  document.querySelector('h2 span').innerText = collectedFood
  gGame.score = 0
  clearInterval(gInterval)
  clearInterval(gIntervalGhosts)
  clearInterval(cherryInterval)
  gMaxFood = 56
  init()
}

function buildBoard() {
  const SIZE = 10
  const board = []

  for (let i = 0; i < SIZE; i++) {
    board.push([])

    for (let j = 0; j < SIZE; j++) {
      board[i][j] = FOOD

      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL
      }
    }
  }

  board[1][1] =
    board[1][board[0].length - 2] =
    board[board.length - 2][board[0].length - 2] =
    board[board.length - 2][1] =
    POWER_FOOD
  return board
}

function updateScore(diff, itemType) {
  console.log(itemType);

  gGame.score += diff;
  collectedFood = gGame.score;

  document.querySelector('h2 span').innerText = collectedFood = gGame.score;
  if (itemType === FOOD) {
    console.log(gMaxFood);
    gMaxFood--;
  }

  if (gMaxFood === 0) {
    gameOver(true);
  }
}

function gameOver(isWin) {
  gGame.isOn = false;
  let alertWin = document.querySelector('.modal span');

  let elBoard = document.querySelector('table');
  elBoard.style.display = 'none';

  if (isWin) {
    alertWin.innerText = 'You won the game!';
  } else {
    alertWin.innerText = 'Game over - You were eaten by a ghost';
  }

  let elAlert = document.querySelector('.modal');
  elAlert.style.display = 'block';

  clearInterval(gIntervalGhosts);
}

function addCherry() {
  const chosenCell = getEmptyCells()
  gBoard[chosenCell.i][chosenCell.j] = CHERRY
  renderCell(chosenCell, CHERRY)
}
