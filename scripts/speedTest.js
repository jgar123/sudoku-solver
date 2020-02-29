const pessimisticGrid = [
  [0, 7, 0, 0, 3, 0, 2, 0, 0],
  [0, 0, 5, 0, 0, 2, 9, 0, 0],
  [4, 0, 0, 9, 0, 0, 0, 0, 0],
  [0, 0, 4, 2, 0, 5, 0, 9, 0],
  [0, 1, 0, 3, 9, 0, 7, 0, 6],
  [2, 0, 0, 0, 0, 0, 0, 0, 5],
  [1, 9, 2, 7, 0, 0, 0, 3, 0],
  [0, 4, 7, 5, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 3, 0, 0, 0]
]
const optimisticGrid = [
  [0, 7, 0, 0, 3, 0, 2, 0, 0],
  [0, 0, 5, 0, 0, 2, 9, 0, 0],
  [4, 0, 0, 9, 0, 0, 0, 0, 0],
  [0, 0, 4, 2, 0, 5, 0, 9, 0],
  [0, 1, 0, 3, 9, 0, 7, 0, 6],
  [2, 0, 0, 0, 0, 0, 0, 0, 5],
  [1, 9, 2, 7, 0, 0, 0, 3, 0],
  [0, 4, 7, 5, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 3, 0, 0, 0]
]

let trueCount = 0

function unfinishedGrid() {
  for (let i = 0; i < 9; i++) {
    if (pessimisticGrid[i].includes(0)) {
      return true
    }
  }
  return false
}

function brutePossible(y, x, n) {
  if (pessimisticGrid[y].includes(n)) {
    return false
  }
  for (let i = 0; i < 9; i++) {
    if (pessimisticGrid[i][x] === n) {
      return false
    }
  }
  const xSquare = Math.floor(x / 3) * 3
  const ySquare = Math.floor(y / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pessimisticGrid[ySquare + i][xSquare + j] === n) {
        return false
      }
    }
  }
  return true
}

function recursivePossible(y, x, n) {
  if (optimisticGrid[y].includes(n)) {
    return false
  }
  for (let i = 0; i < 9; i++) {
    if (optimisticGrid[i][x] === n) {
      return false
    }
  }
  const xSquare = Math.floor(x / 3) * 3
  const ySquare = Math.floor(y / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (optimisticGrid[ySquare + i][xSquare + j] === n) {
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
        if (pessimisticGrid[y][x] === 0) {
          for (let n = 1; n < 10; n++) {
            if (brutePossible(y, x, n)) {
              trueCount += 1
              pessimisticGrid[y][x] = n
            }
            if (trueCount >= 2 && n === 9) {
              pessimisticGrid[y][x] = 0
              trueCount = 0
            }
          }
        }
      }
    }
  }
  return pessimisticGrid
}

function recursiveSolve() {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (optimisticGrid[y][x] === 0) {
        for (let n = 1; n < 10; n++) {
          if (recursivePossible(y, x, n)) {
            optimisticGrid[y][x] = n
            if (recursiveSolve()) {
              return true
            } else {
              optimisticGrid[y][x] = 0
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





