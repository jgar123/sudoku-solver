function main() {

  const grid = document.querySelector('#grid')
  const cells = []
  const width = 9

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('input')
    cells.push(cell)
    grid.appendChild(cell)
  }
}

window.addEventListener('DOMContentLoaded', main)
