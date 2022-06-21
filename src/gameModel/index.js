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

  nextGeneration() {
    const lifeCellColumns = this.gameFieldColumns.filter(Boolean)
    const newBornCells = []
    const deadCells = []

    lifeCellColumns.filter(Boolean).forEach(column => {
      column.filter(Boolean).forEach(([x, y]) => {
        const siblingsColumn = this.gameFieldColumns
          .slice(x-1, x+2)
          .filter(Boolean)
        const siblings = siblingsColumn.reduce((cells, siblingColumn) => {
          return ([...cells, ...siblingColumn.slice(y-1, y+2).filter(Boolean)])
        }, [])
          .filter(cell => !(cell[0] === x && cell[1] === y))

        if (siblings.length !== 2 && siblings.length !== 3) {
          deadCells.push([x, y])
        }
      })
    })

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