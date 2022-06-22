class GameModel {
  static instance
  static getInstance(...params) {
    if (!GameModel.instance) {
      GameModel.instance = new GameModel(...params)
      window.cells = []
    }

    return GameModel.instance
  }

  gameFieldColumns = []
  maxCoords

  constructor({ size, initialCells } = {
    size: 1,
    initialCells: []
  }) {
    this.maxCoords = size - 1
    this.fillCells(initialCells)
  }


  clear() {
    this.gameFieldColumns = []
  }

  setSize(size) {
    this.maxCoords = size - 1
  }
  
  fillCells(cells) {
    cells.forEach(cell => {
      const [x, y] = cell
      
      if (!this.gameFieldColumns[x]) {
        this.gameFieldColumns[x] = []
      }
      
      this.gameFieldColumns[x][y] = [x, y]
    })
  }

  refreshCell([x, y]) {
    if (this.gameFieldColumns[x] && this.gameFieldColumns[x][y]) {
      delete this.gameFieldColumns[x][y]
    } else {
      this.fillCells([[x, y]])
    }

    window.cells.push([x, y])
  }

  getLifeCells() {
    return this.gameFieldColumns.reduce((cells, column) => {
      column.forEach(cell => cells.push(cell))

      return cells
    }, [])
  }

  removeDeadCell(cells) {
    cells.forEach(([x, y]) => {
      delete this.gameFieldColumns[x][y]
    })
  }

  getRange(c) {
    let range

    if (c === 0) {
      range = [this.maxCoords, 0, 1]
    } else if (c === this.maxCoords) {
      range = [c - 1, c, 0]
    } else {
      range = [c - 1, c, c + 1]
    }

    return range
  }

  nextGeneration() {
    const deadCells = []
    const emptyCellSiblings = []

    this.gameFieldColumns.forEach(column => {
      column.forEach(([x, y]) => {
        const rangeX = this.getRange(x)
        const rangeY = this.getRange(y)

        let currentLifeSiblings = 0
        rangeX.forEach(sX => {
          rangeY.forEach(sY => {
            if (!(sX === x && sY === y)) {
              if (this.gameFieldColumns[sX] && this.gameFieldColumns[sX][sY]) {
                currentLifeSiblings++
              } else {
                if (!emptyCellSiblings[sX]) {
                  emptyCellSiblings[sX] = []
                }

                emptyCellSiblings[sX][sY] = emptyCellSiblings[sX][sY] ? ++emptyCellSiblings[sX][sY] : 1
              }
            }
          })
        })

        if (currentLifeSiblings !== 2 && currentLifeSiblings !== 3) {
          deadCells.push([x, y])
        }
      })
    })

    const newBornCells = emptyCellSiblings.reduce((cells, column, x) => {
      column.forEach((count, y) => {
        if (count === 3) {
          cells.push([x, y])
        }
      })

      return cells
    }, [])


    if (deadCells.length > 0) {
      this.removeDeadCell(deadCells)
    }

    if (newBornCells.length > 0) {
      this.fillCells(newBornCells)
    }

    return {
      dead: deadCells,
      newBorn: newBornCells
    }
  }
}

export default GameModel