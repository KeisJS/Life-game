import styles from './styles.module.scss'
import Observer from '../lib/observer'
import CellsView from './cellsView'
import GridView from './gridView'

class LifeGameView extends Observer {
  container
  cellsView
  gridView

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

  getMouseMoveHandler = () => {
    let lastX
    let lastY
    const cellSize = LifeGameView.gridCellSize

    return ({ offsetX: x, offsetY: y }) => {
      const curX = x - x%cellSize
      const curY = y - y%cellSize

      if (!(curX === lastX && curY === lastY)) {
        lastX = curX
        lastY = curY

        this.cellsView.refreshCell([curX, curY])
        this.emitEvent('refresh_cell', [curX / cellSize, curY / cellSize])
      }
    }
  }

  addMouseMoveHandler() {
    const mouseMoveHandler = this.getMouseMoveHandler()

    this.container.addEventListener('mousedown', ({ offsetX: x, offsetY: y }) => {
      this.container.addEventListener('mousemove', mouseMoveHandler)
    })

    this.container.addEventListener('mouseup', () => {
      this.container.removeEventListener('mousemove', mouseMoveHandler)
    })

    this.container.addEventListener('mouseleave', () => {
      this.container.removeEventListener('mousemove', mouseMoveHandler)
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