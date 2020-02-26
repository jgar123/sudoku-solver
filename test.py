sudokuGrid = [
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

count = 0

print('hello')

def possible(y, x, n):
    global sudokuGrid
    for i in range(0, 9):
        if sudokuGrid[y][i] == n:
            return False
    for i in range(0, 9):
        if sudokuGrid[i][x] == n:
            return False

    xSquare = (x//3) * 3
    ySquare = (y//3) * 3

    for i in range(0, 3) :
        for j in range(0, 3):
            if sudokuGrid[ySquare + i][xSquare + j] == n:
                return False
    return True

def solve():
    global sudokuGrid
    for y in range(0,9):
        for x in range(0,9):
            if sudokuGrid[y][x] == 0:
                for n in range(1, 10):
                    if possible(y, x, n):
                        sudokuGrid[y][x] = n
                        solve()
                        sudokuGrid[y][x] = 0  
                return
    print(sudokuGrid)


solve()
