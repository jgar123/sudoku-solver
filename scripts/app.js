function main() {

  const grid = document.querySelector('#grid')
  const submit = document.querySelector('#submit')
  const cells = []
  const width = 9
  const gridStatus = []
  let newGridStatus

  function possible(y, x, n) {

    if (newGridStatus[y].includes(n)) {
      return false
    }
    
    for (let i = 0; i < 9; i++) {
      if (newGridStatus[i][x] === n) {
        return false
      }
    }
    
    const x0 = Math.floor(x / 3) * 3
    const y0 = Math.floor(y / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (newGridStatus[y0 + i][x0 + j] === n) {
          return false
        } 
      }
    }
    return true
  }

  function solve() {
    console.log(possible(0, 0, 1))
  }

  function handleChange(e) {
    gridStatus[parseInt(e.target.id)] = parseInt(e.target.value)
  }

  function handleSubmit() {
    const splitArray = []
    while (gridStatus.length) {
      splitArray.push(gridStatus.splice(0, width))
    }

    newGridStatus = splitArray
    solve()
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
