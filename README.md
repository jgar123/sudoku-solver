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

This approach as mentioned above, looks to find a tile in the puzzle that has 1 possible valid number.

#### **Optimistic Approach**
ddd