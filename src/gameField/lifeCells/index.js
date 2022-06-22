import styles from '../styles.module.scss'
import GameGrid from '../gameGrid'

class LifeCells {
  container
  cells = new Map()

  constructor(container) {
    this.container = container
  }

  static getInstance() {
    const container = document.createElement('div')

    container.className = styles.gameField__cells

    return new LifeCells(container)
  }

  clear() {
    if (this.cells.size > 0) {
      this.cells.clear()
      this.container.innerHTML = ''
    }
  }

  addCell({ x, y }) {
    const cell = document.createElement('div')

    cell.className = styles.gameField__cell
    cell.style.left = `${x}px`
    cell.style.top = `${y}px`

    this.cells.set(`${x}:${y}`, cell)
    this.container.appendChild(cell)
  }

  removeCell({ x, y }) {
    const key = `${x}:${y}`
    const cellView = this.cells.get(key)

    cellView.remove()
    this.cells.delete(key)

    return this
  }

  refreshCell([x, y ], isRaw= false) {
    const cX = isRaw ? x * GameGrid.gridCellSize : x
    const cY = isRaw ? y * GameGrid.gridCellSize : y
    const key = `${cX}:${cY}`
    const cell = this.cells.get(key)

    if (cell) {
      this.removeCell({ x: cX, y: cY })
    } else {

      this.addCell({ x: cX, y: cY })
    }
  }

  getContainer() {
    return this.container
  }
}

export default LifeCells