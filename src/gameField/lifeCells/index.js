import styles from '../styles.module.scss'

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
    const cell = this.cells.get(key)

    cell.remove()
    this.cells.delete(key)

    return this
  }

  refreshCell({ x, y }) {
    const key = `${x}:${y}`
    const cell = this.cells.get(key)

    if (cell) {
      cell.remove()
      this.cells.delete(key)
    } else {
      this.addCell({ x, y })
    }
  }

  getContainer() {
    return this.container
  }
}

export default LifeCells