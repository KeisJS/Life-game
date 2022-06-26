import Observer from '../lib/observer'

class LifeGameModel extends Observer {
  gameFieldColumns = []
  maxCoords
  size
  gameId

  constructor({ size, initialCells } = {
    size: 1,
    initialCells: []
  }) {
    super()
    this.maxCoords = size - 1
    this.fillCells(initialCells)
    this.size = size
  }

  clear() {
    this.gameFieldColumns = []
    this.stopGame()
    this.emitEvent('clear')
  }

  stopGame() {
    window.clearInterval(this.gameId)
  }

  setSize(size) {
    this.maxCoords = size - 1
    this.size = size
    this.gameFieldColumns = []
    this.stopGame()
    this.emitEvent('changeSize', this.size)
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

  refreshCell = ([x, y]) => {
    if (this.gameFieldColumns[x] && this.gameFieldColumns[x][y]) {
      delete this.gameFieldColumns[x][y]
    } else {
      this.fillCells([[x, y]])
    }
  }

  removeDeadCell(cells) {
    cells.forEach(([x, y]) => {
      delete this.gameFieldColumns[x][y]
    })
  }

  nextGeneration() {
    const deadCells = []
    const emptyCellSiblings = []

    this.gameFieldColumns.forEach(column => {
      column.forEach(([x, y]) => {
        const size = this.size
        const rangeX = [(size + x - 1)%size, x, (x + 1)%size]

        let currentLifeSiblings = 0
        rangeX.forEach(sX => {
          const rangeY = [(size + y - 1)%size, y, (y + 1)%size]

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

    this.emitEvent('nextGeneration', {
      dead: deadCells,
      newBorn: newBornCells
    })
  }

  runGame() {
    this.stopGame()
    this.gameId = window.setInterval(() => {
      this.nextGeneration()
    }, 100)
  }
}

export default LifeGameModel