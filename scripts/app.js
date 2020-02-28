function main() {

  const grid = document.querySelector('#grid')
  const submit = document.querySelector('#submit')
  const result = document.querySelector('.result')
  const solutionMethod = document.querySelector('.solutionMethod')
  const reload = document.querySelector('.reload')
  const width = 9
  const gridStatus = []
  let count = 0
  let unsolvedGrid
  let recursiveGrid
  let trueCount = 0
  let solvedWith = 'Solved with brute force!'

  function unfinishedGrid() {
    for (let i = 0; i < 9; i++) {
      if (unsolvedGrid[i].includes(0)) {
        return true
      }
    }
    return false
  }

  function possibleMove(y, x, n) {
    if (unsolvedGrid[y].includes(n)) {
      return false
    }

    for (let i = 0; i < 9; i++) {
      if (unsolvedGrid[i][x] === n) {
        return false
      }
    }

    const xSquare = Math.floor(x / 3) * 3
    const ySquare = Math.floor(y / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (unsolvedGrid[ySquare + i][xSquare + j] === n) {
          return false
        }
      }
    }
    return true
  }

  function solve() {
    while (unfinishedGrid()) {
      if (count > 10000) {
        recursiveSolve()
        solvedWith = 'Solved with recursion!'
        return recursiveGrid
      }
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          if (unsolvedGrid[y][x] === 0) {
            for (let n = 1; n < 10; n++) {
              if (possibleMove(y, x, n)) {
                trueCount += 1
                unsolvedGrid[y][x] = n
              }
              if (trueCount >= 2 && n === 9) {
                unsolvedGrid[y][x] = 0
                trueCount = 0
              }
            }
          }
        }
      }
      count++
    }
    return unsolvedGrid
  }

  function recursiveSolve() {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (recursiveGrid[y][x] === 0) {
          for (let n = 1; n < 10; n++) {
            if (possibleMove(y, x, n)) {
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

  function handleChange(e) {
    gridStatus[parseInt(e.target.id)] = parseInt(e.target.value)
  }

  function handleSubmit() {
    const splitArray = []
    while (gridStatus.length) {
      splitArray.push(gridStatus.splice(0, width))
    }
    unsolvedGrid = splitArray
    recursiveGrid = splitArray
    const solvedGrid = solve(unsolvedGrid)
    for (let y = 0; y < solvedGrid.length; y++) {
      for (let x = 0; x < solvedGrid.length; x++) {
        const solvedCell = document.createElement('div')
        solvedCell.innerHTML = solvedGrid[y][x]
        if (x === 3 || x === 6) {
          solvedCell.style.borderLeft = '3px solid black'
        }
        if (y === 3 || y === 6) {
          solvedCell.style.borderTop = '3px solid black'
        }
        result.appendChild(solvedCell)
      }
    }
    grid.style.display = 'none'
    submit.style.display = 'none'
    result.style.display = 'flex'
    solutionMethod.innerHTML = solvedWith
    solutionMethod.style.display = 'block'
    reload.style.display = 'block'
  }

  function createGrid() {
    for (let i = 0; i < width ** 2; i++) {
      gridStatus.push(0)
      const cell = document.createElement('input')
      cell.addEventListener('change', (e) => handleChange(e))
      cell.setAttribute('id', i)
      cell.innerHTML = i
      if (i % width === 3 || i % width === 6) {
        cell.style.borderLeft = '3px solid black'
      }
      if ((i - (i % width)) / width === 3 || (i - (i % width)) / width === 6) {
        cell.style.borderTop = '3px solid black'
      }
      grid.appendChild(cell)
    }
  
    submit.addEventListener('click', (e) => handleSubmit(e))
  }

  createGrid()

}

window.addEventListener('DOMContentLoaded', main)
