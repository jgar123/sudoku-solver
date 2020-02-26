function main() {

  const grid = document.querySelector('#grid')
  const submit = document.querySelector('#submit')
  const result = document.querySelector('.result')
  const cells = []
  const width = 9
  const gridStatus = []
  let count = 0
  let unsolvedGrid
  let trueCount = 0

  const testGrid = [
    [0, 6, 8, 0, 0, 0, 0, 3, 0],
    [0, 4, 2, 9, 0, 0, 6, 0, 8],
    [1, 0, 0, 0, 0, 3, 0, 0, 0],
    [6, 0, 0, 0, 3, 2, 0, 9, 0],
    [0, 0, 4, 0, 0, 0, 1, 0, 6],
    [0, 0, 9, 7, 6, 0, 5, 0, 0],
    [8, 0, 0, 0, 4, 0, 0, 0, 2],
    [0, 0, 0, 8, 7, 0, 3, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 9]
  ]

  const hardGrid = [
    [4, 0, 0, 1, 0, 0, 0, 3, 8],
    [0, 0, 0, 3, 9, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 1],
    [5, 3, 0, 0, 7, 0, 0, 8, 0],
    [0, 0, 9, 0, 0, 0, 7, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 5, 0, 0, 3, 9, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0, 0],
    [0, 0, 0, 9, 0, 0, 0, 6, 5]
  ]

  function unfinishedGrid(grid) {
    for (let i = 0; i < 9; i++) {
      if (grid[i].includes(0)) {
        return true
      }
    }
    return false
  }

  function possible(y, x, n) {
    for (let i = 0; i < 9; i++) {
      if (testGrid[y][i] === n) {
        return false
      }
    }
    for (let i = 0; i < 9; i++) {
      if (testGrid[i][x] === n) {
        return false
      }
    }
    const xSquare = Math.floor(x / 3) * 3
    const ySquare = Math.floor(y / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (testGrid[ySquare + i][xSquare + j] === n) {
          return false
        }
      }
    }
    return true
  }

  function solve(grid) {
    while (unfinishedGrid(grid)) {
      if (count > 1000000) {
        return
      }
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          if (grid[y][x] === 0) {
            for (let n = 1; n < 10; n++) {
              if (possible(y, x, n)) {
                trueCount += 1
                grid[y][x] = n
              }
              if (trueCount >= 2 && n === 9) {
                grid[y][x] = 0
                trueCount = 0
              }
            }
          }
        }
      }
      count++
    }
    return grid
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
    const solvedGrid = solve(unsolvedGrid)
    for (let y = 0; y < solvedGrid.length; y++) {
      for (let x = 0; x < solvedGrid.length; x++) {
        const solvedCell = document.createElement('div')
        solvedCell.innerHTML = solvedGrid[y][x]
        result.appendChild(solvedCell)
      }
    }
    grid.style.display = 'none'
    result.style.display = 'flex'
  }




  for (let i = 0; i < width ** 2; i++) {
    gridStatus.push(0)
    const cell = document.createElement('input')
    cell.addEventListener('change', (e) => handleChange(e))
    cell.setAttribute('id', i)
    cell.innerHTML = i
    cells.push(cell)
    grid.appendChild(cell)
  }

  submit.addEventListener('click', (e) => handleSubmit(e))

}

window.addEventListener('DOMContentLoaded', main)
