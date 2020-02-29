# sudoku-solver

## Overview

I decided to take on the Sudoku Solver as a side project during my time as a Teachng Assistant at General Assembly. The aim was to create a simple web app (mobile first approach) that could solve any valid sudoku. With the intent of the project being simple in terms of style and functionality, I decided to use HTML, CSS and JavaScript due to ease of deployment.


## Technologies used

- HTML
- CSS
- JavaScript (ES6)

## Approach

### Sudoku board

- I created a 9 x 9 grid of inputs and applied simple styling to each cell in the grid. To achieve the 'dividers' for each block of 3 x 3, I checked for cells with on the x axis of either 3 or 6 and the same for the y axis. 
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
- I push `0` 81 times to the `gridStatus` array which is then changed when the `handleChange` is called. Once the user submits the grid, `gridStatus` will consist of all the numbers inputted by the user. 
- 