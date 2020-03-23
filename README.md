# sudoku-solver

## Overview

I decided to take on the Sudoku Solver as a side project during my time as a Teachng Assistant at General Assembly. The aim was to create a simple web app (mobile first approach) that could solve any valid sudoku. With the intent of the project being simple in terms of style and functionality, I decided to use HTML, CSS and JavaScript due to ease of deployment.


## Technologies used

- HTML
- CSS
- JavaScript (ES6)

## Approach

### Sudoku board setup

I created a 9 x 9 grid of inputs and applied simple styling to each cell in the grid. To achieve the 'dividers' for each block of 3 x 3, I checked for cells with on the x axis of either 3 or 6 and the same for the y axis. 
```js
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
```
I push `0` 81 times to the `gridStatus` array which is then changed when the `handleChange` is called. The `0` represents a blank space in the grid where the Once the user submits the grid, `gridStatus` will consist of all the numbers inputted by the user and the rest will be blank spaces (represented by `0`'s). This array is split into an array of array's later for sudoku puzzle resolution.

### Puzzle resolution

Prior to puzzle resolution I split the `gridStatus` array into an array of array's (split into 9 arrays with 9 elements in each array). This allowed me to traverse through the grid more simply using a nested loop approach.
I had 2 approaches to solving the sudoku puzzle:
  1. A pessimistic approach - find a tile where only 1 number was possible (n) and change that tile's value from `0` to `n`.
  2. An optimistic approach - find a tile where there if a number was possible, set the tile's value from `0` to `n` and try to complete the rest of the grid with the initial tile's value having been set to `n` if possible.

#### **Pessimistic Approach**

- This approach as mentioned above, looks to find a tile in the puzzle that has 1 possible valid number. 
- It runs through numbers 1 to 9 in each empty tile where if a tile has more than 1 possible move, the tile is set back to empty and moves onto the next empty cell on the grid.
- This is repeated until there are no more `0`'s on the grid. 
```js
  function pessimisticSolve() {
    while (unfinishedGrid()) {
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          if (pessimisticGrid[y][x] === 0) {
            for (let n = 1; n < 10; n++) {
              if (possibleMove(y, x, n, pessimisticGrid)) {
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
      count++
    }
    return pessimisticGrid
  }
```

#### **Optimistic Approach**

- This approach makes use of recursion and 'guesses' sudoku board configurations until 1 configuration is correct. 
- It traverses through the array of arrays the same way the pessimistic solution does. 
- Firstly, it checks whether a number is `0` and whether or not a number is possible in that tile position. If it is, place the number down and call `optimisticSovle()` recursively. The method then attempts to solve the rest of the board given tile = n. If the proceeding tiles are all have possible moves, the board has been solved.
```js
  function optimisticSolve() {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (optimisticGrid[y][x] === 0) {
          for (let n = 1; n < 10; n++) {
            if (possibleMove(y, x, n, optimisticGrid)) {
              optimisticGrid[y][x] = n
              if (optimisticSolve()) {
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
```
