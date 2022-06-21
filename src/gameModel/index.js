class GameModel {
  static instance
  static getInstance(...params) {
    if (!GameModel.instance) {
      GameModel.instance = new GameModel(...params)
    }

    return GameModel.instance
  }

  gameFieldColumns = []
  maxCoords

  constructor({ size, initialCells }) {
    this.maxCoords = size - 1
    this.fillCells(initialCells)
  }


  clear() {
    this.gameFieldColumns = []
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

    return {
      dead: deadCells,
      newBorn: newBornCells
    }
  }
}

export default GameModel