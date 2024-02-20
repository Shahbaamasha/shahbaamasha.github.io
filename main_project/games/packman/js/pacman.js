'use strict'

const PACMAN = '😃'

let gPacman

let gDeadGhosts

document.addEventListener('keydown', function (event) {
  // Prevent default scrolling behavior when arrow keys are pressed
  if (event.key.startsWith('Arrow')) {
    event.preventDefault();
  }
});

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5,
    },
    isSuper: false,
  }
  board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

  if (!gGame.isOn) return
  // console.log('ev', ev);
  const nextLocation = getNextLocation(ev)

  if (!nextLocation) return
  // console.log('nextLocation', nextLocation)

  let nextCell = gBoard[nextLocation.i][nextLocation.j]
  // console.log('NEXT CELL', nextCell)

  if (nextCell === WALL) return
  if (nextCell === FOOD) {
    collectedFood++
    updateScore(1, FOOD);
    if (collectedFood === gMaxFood) gameOver()
  } else if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      for (let i = 0; i < gGhosts.length; i++) {
        if (
          gGhosts[i].location.i === nextLocation.i &&
          gGhosts[i].location.j === nextLocation.j
        ) {
          gDeadGhosts.push(gGhosts[i])
          gGhosts.splice(i, 1)
        }
      }
    } else {
      gameOver()
      console.log('game over')
      renderCell(gPacman.location, EMPTY)
      return
    }
  }

  if (nextCell === POWER_FOOD && gPacman.isSuper) return

  if (nextCell === POWER_FOOD) {
    gPacman.isSuper = true
    gDeadGhosts = []
    renderGhosts()
    setTimeout(restoreGhosts, 5000)
  }

  if (nextCell === CHERRY) {
    collectedFood + 10
    updateScore(10)
  }

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

  // update the DOM
  renderCell(gPacman.location, EMPTY)

  // update the model
  gPacman.location = nextLocation
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

  // update the DOM
  renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
  let nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  }
  switch (eventKeyboard.code) {
    case 'ArrowUp':
      nextLocation.i--
      break
    case 'ArrowDown':
      nextLocation.i++
      break
    case 'ArrowLeft':
      nextLocation.j--
      break
    case 'ArrowRight':
      nextLocation.j++
      break
    default:
      return null
  }
  return nextLocation
}

function left(eventKeyboard) {
  console.log(eventKeyboard);

  let nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  }

  switch (eventKeyboard.code) {
    case 'ArrowLeft':
      nextLocation.j--;
      break;
  }

  return nextLocation;
}


function restoreGhosts() {
  for (let i = 0; i < gDeadGhosts.length; i++) {
    gGhosts.push(gDeadGhosts[i])
  }
  gPacman.isSuper = false
}
