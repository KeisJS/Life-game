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
    const newBornCells = []

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
                const siblingXRange = [(size + sX - 1)%size, sX, (sX + 1)%size]
                const siblingYRange = [(size + sY - 1)%size, sY, (sY + 1)%size]

                let lifeSibCount = 0
                for (let cX = 0; cX < 3; cX++) {
                  const curX = siblingXRange[cX]
                  for (let cY = 0; cY < 3; cY++) {
                    const curY = siblingYRange[cY]
                    if (this.gameFieldColumns[curX] && this.gameFieldColumns[curX][curY]) {
                      lifeSibCount++
                    }
                  }
                }

                if (lifeSibCount === 3) {
                  newBornCells.push([sX, sY])
                }
              }
            }
          })
        })

        if (currentLifeSiblings !== 2 && currentLifeSiblings !== 3) {
          deadCells.push([x, y])
        }
      })
    })

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