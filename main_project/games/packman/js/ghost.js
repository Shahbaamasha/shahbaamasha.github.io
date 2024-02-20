'use strict'

const GHOST = '&#9760;'

let gGhosts = []
let gIntervalGhosts

function createGhost(board) {
  const ghost = {
    location: {
      i: 3,
      j: 3,
    },
    currCellContent: FOOD,
    color: getRandomColor(),
  }
  gGhosts.push(ghost)
  board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
  gGhosts = []
  for (let i = 0; i < 3; i++) {
    createGhost(board)
  }
  gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
  for (let i = 0; i < gGhosts.length; i++) {
    const ghost = gGhosts[i]
    moveGhost(ghost)
  }
}

function moveGhost(ghost) {
  const moveDiff = getMoveDiff();
  const nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };
  const nextCell = gBoard[nextLocation.i][nextLocation.j];
  if (nextCell === POWER_FOOD) return;
  if (nextCell === WALL) return;
  if (nextCell === GHOST) return;
  if (nextCell === CHERRY) return;

  // Check if pacman is in super mode
  if (gPacman.isSuper) return;

  if (nextCell === PACMAN) {
    gameOver();
    return;
  }

  // model
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;

  // DOM
  renderCell(ghost.location, ghost.currCellContent);

  // model
  ghost.location = nextLocation;
  ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j];
  gBoard[ghost.location.i][ghost.location.j] = GHOST;

  // DOM
  renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
  const randNum = getRandomInt(0, 100)
  if (randNum < 25) {
    return { i: 0, j: 1 }
  } else if (randNum < 50) {
    return { i: -1, j: 0 }
  } else if (randNum < 75) {
    return { i: 0, j: -1 }
  } else {
    return { i: 1, j: 0 }
  }
}

function getGhostHTML(ghost) {
  let ghostColor = gPacman.isSuper ? 'blue' : ghost.color

  return `<span style="color:${ghostColor}">${GHOST}</span>`
}

function renderGhosts() {
  for (let i = 0; i < gGhosts.length; i++) {
    renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
  }
}
