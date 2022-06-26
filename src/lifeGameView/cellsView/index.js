import styles from '../styles.module.scss'
import LifeGameView from '../index'

class CellsView {
  container
  cells = new Map()

  constructor() {
    this.container = this.buildView()
  }

  buildView() {
    const container = document.createElement('div')

    container.className = styles.gameField__cells

    return container
  }

  getContainer() {
    return this.container
  }

  clear() {
    if (this.cells.size > 0) {
      this.cells.clear()
      this.container.innerHTML = ''
    }
  }

  addCell([x, y]) {
    this.container.appendChild(this.createCellView([x, y]))
  }

  createCellView([x, y]) {
    const cell = document.createElement('div')

    cell.className = styles.gameField__cell
    cell.style.left = `${x}px`
    cell.style.top = `${y}px`

    this.cells.set(`${x}:${y}`, cell)

    return cell
  }

  removeCell([x, y]) {
    const key = `${x}:${y}`
    const cellView = this.cells.get(key)

    cellView.remove()
    this.cells.delete(key)

    return this
  }

  //cells from screen
  refreshCell([x, y]) {
    const key = `${x}:${y}`
    const cell = this.cells.get(key)

    if (cell) {
      this.removeCell([x, y])
    } else {
      this.addCell([x, y])
    }
  }

  // cells from model
  refreshCells(cells) {
    const viewCells = document.createDocumentFragment()
    const deleteCells = document.createDocumentFragment()

    cells.forEach(([x, y]) => {
      const cX = x * LifeGameView.gridCellSize
      const cY = y * LifeGameView.gridCellSize
      const key = `${cX}:${cY}`
      const cell  = this.cells.get(key)

      if (cell) {
        deleteCells.appendChild(cell)
        this.cells.delete(key)
      } else {
        viewCells.appendChild(this.createCellView([cX, cY]))
      }
    })

    this.container.appendChild(viewCells)
  }
}

export default CellsView