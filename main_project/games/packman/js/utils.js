'use strict'

function printMat(mat, selector) {
  let strHTML = '<table border="0"><tbody>'
  for (let i = 0; i < mat.length; i++) {
    strHTML += '<tr>'
    for (let j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j]
      const className = 'cell cell-' + i + '-' + j
      strHTML += `<td class="${className}">${cell}</td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value

  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = value
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

function getRandomColor() {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getEmptyCells() {
  const emptyCells = [];

  for (let i = 0; i < gBoard.length; i++) {
    for (let j = 0; j < gBoard[i].length; j++) {
      if (gBoard[i][j] === EMPTY) {
        emptyCells.push({ i, j });
      }
    }
  }

  if (emptyCells.length === 0) {
    return null;
  }

  const idx = getRandomInt(0, emptyCells.length);
  return emptyCells[idx];
}



function drawNum(nums) {
  // console.log(`gNums.length:`, gNums.length)
  let num = getRandomInt(0, nums.length)
  let removedNum = nums.splice(num, 1)
  // console.log(`gNums:`, gNums)
  return removedNum
}
