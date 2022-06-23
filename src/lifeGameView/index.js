import styles from './styles.module.scss'
import Observer from '../lib/observer'
import CellsView from './cellsView'
import GridView from './gridView'

class LifeGameView extends Observer {
  container
  cellsView
  gridView
  lastX
  lastY

  static gridCellSize = 10

  constructor({
  cellsView,
  gridView
}) {
    super()
    this.container = this.buildView()

    this.cellsView = cellsView
    this.gridView = gridView

    this.container.appendChild(gridView.getContainer())
    this.container.appendChild(cellsView.getContainer())
    this.addMouseMoveHandler()
  }

  static getInstance() {
    const cellsView = new CellsView()
    const gridView = new GridView()

    return new LifeGameView({ cellsView, gridView })
  }

  getContainer() {
    return this.container
  }

  buildView() {
    const gameField = document.createElement('div')

    gameField.className = styles.gameField

    return gameField
  }

  onChangeFieldSize = size => {
    this.container.style.width = `${size * LifeGameView.gridCellSize}px`
    this.container.style.height = `${size * LifeGameView.gridCellSize}px`
    this.gridView.buildOrRefreshGrid(size)
    this.cellsView.clear()
  }

  onMouseDownHandler = ({ offsetX: x, offsetY: y }) => {
    const cellSize = LifeGameView.gridCellSize
    const curX = x - x%cellSize
    const curY = y - y%cellSize
    this.lastX = curX
    this.lastY = curY

    this.cellsView.refreshCell([curX, curY])
    this.emitEvent('refresh_cell', [curX / cellSize, curY / cellSize])
  }

  onMouseMoveHandler = ({ offsetX: x, offsetY: y }) => {
    const cellSize = LifeGameView.gridCellSize
    const curX = x - x%cellSize
    const curY = y - y%cellSize

    if (!(curX === this.lastX && curY === this.lastY)) {
      this.lastX = curX
      this.lastY = curY

      this.cellsView.refreshCell([curX, curY])
      this.emitEvent('refresh_cell', [curX / cellSize, curY / cellSize])
    }
  }
  addMouseMoveHandler() {
    this.container.addEventListener('mousedown', e => {
      this.onMouseDownHandler(e)
      this.container.addEventListener('mousemove', this.onMouseMoveHandler)
    })

    this.container.addEventListener('mouseup', () => {
      this.container.removeEventListener('mousemove', this.onMouseMoveHandler)
    })

    this.container.addEventListener('mouseleave', () => {
      this.container.removeEventListener('mousemove', this.onMouseMoveHandler)
    })
  }

  onClear = () => {
    this.cellsView.clear()
  }

  onNextGeneration = ({ newBorn, dead }) => {
    const workCells = [...dead, ...newBorn]

    this.cellsView.refreshCells(workCells)
  }
}

export default LifeGameView