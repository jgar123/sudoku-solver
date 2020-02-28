const bruteGrid = [
  [0,7,0,0,3,0,2,0,0],
  [0,0,5,0,0,2,9,0,0],
  [4,0,0,9,0,0,0,0,0],
  [0,0,4,2,0,5,0,9,0],
  [0,1,0,3,9,0,7,0,6],
  [2,0,0,0,0,0,0,0,5],
  [1,9,2,7,0,0,0,3,0],
  [0,4,7,5,0,0,1,0,0],
  [0,0,0,1,0,3,0,0,0]
]
const recursiveGrid = [
  [0,7,0,0,3,0,2,0,0],
  [0,0,5,0,0,2,9,0,0],
  [4,0,0,9,0,0,0,0,0],
  [0,0,4,2,0,5,0,9,0],
  [0,1,0,3,9,0,7,0,6],
  [2,0,0,0,0,0,0,0,5],
  [1,9,2,7,0,0,0,3,0],
  [0,4,7,5,0,0,1,0,0],
  [0,0,0,1,0,3,0,0,0]
]

let trueCount = 0

function unfinishedGrid() {
  for (let i = 0; i < 9; i++) {
    if (bruteGrid[i].includes(0)) {
      return true
    }
  }
  return false
}

function brutePossible(y, x, n) {
  if (bruteGrid[y].includes(n)) {
    return false
  }
  for (let i = 0; i < 9; i++) {
    if (bruteGrid[i][x] === n) {
      return false
    }
  }
  const xSquare = Math.floor(x / 3) * 3
  const ySquare = Math.floor(y / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (bruteGrid[ySquare + i][xSquare + j] === n) {
        return false
      }
    }
  }
  return true
}

function recursivePossible(y, x, n) {
  if (recursiveGrid[y].includes(n)) {
    return false
  }
  for (let i = 0; i < 9; i++) {
    if (recursiveGrid[i][x] === n) {
      return false
    }
  }
  const xSquare = Math.floor(x / 3) * 3
  const ySquare = Math.floor(y / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (recursiveGrid[ySquare + i][xSquare + j] === n) {
        return false
      }
    }
  }
  return true
}

function bruteSolve() {
  while (unfinishedGrid()) {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (bruteGrid[y][x] === 0) {
          for (let n = 1; n < 10; n++) {
            if (brutePossible(y, x, n)) {
              trueCount += 1
              bruteGrid[y][x] = n
            }
            if (trueCount >= 2 && n === 9) {
              bruteGrid[y][x] = 0
              trueCount = 0
            }
          }
        }
      }
    }
  }
  return bruteGrid
}

function recursiveSolve() {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (recursiveGrid[y][x] === 0) {
        for (let n = 1; n < 10; n++) {
          if (recursivePossible(y, x, n)) {
            recursiveGrid[y][x] = n
            if (recursiveSolve()) {
              return true
            } else {
              recursiveGrid[y][x] = 0
            }
          }
        }
        return false
      }
    }
  }
  return true
}

console.time('bruteSolve')
bruteSolve()
console.timeEnd('bruteSolve')

console.time('recSolve')
recursiveSolve()
console.timeEnd('recSolve')


