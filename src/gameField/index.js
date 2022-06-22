import styles from './styles.module.scss'
import {
  setGameFieldSizeCommand,
  clearGameField,
  gameOneStep
} from '../commands/commandsCreators'
import { Commands } from '../commands/commands'
import GameGrid from './gameGrid'
import LifeCells from './lifeCells'
import GameModel from '../gameModel'

const GameField = () => {
  const gameField = document.createElement('div')

  gameField.className = styles.gameField

  const gameGrid = GameGrid.getInstance()

  gameField.appendChild(gameGrid.getContainer())

  const lifeCells = LifeCells.getInstance()

  gameField.appendChild(lifeCells.getContainer())

  const game = GameModel.getInstance()

  gameField.addEventListener('click', ({ offsetX: x, offsetY: y, target }) => {
    const cellSize = GameGrid.gridCellSize
    const elX = x - x%cellSize
    const elY = y - y%cellSize

    lifeCells.refreshCell([elX, elY])
    game.refreshCell([elX / cellSize, elY / cellSize])
  })

  const { addCommandHandler } = Commands.getInstance()

  addCommandHandler(setGameFieldSizeCommand, ({ payload: size }) => {
    gameField.style.width = `${size * 20}px`
    gameField.style.height = `${size * 20}px`

    gameGrid.buildOrRefreshGrid(size)
    lifeCells.clear()
    game.setSize(size)
  })

  addCommandHandler(clearGameField, () => {
    lifeCells.clear()
    game.clear()
  })

  addCommandHandler(gameOneStep, () => {
    const { dead, newBorn } = game.nextGeneration()

    const workCells = [...dead, ...newBorn]

    workCells.forEach(cell => {
      const [x , y] = cell

      lifeCells.refreshCell([x * GameGrid.gridCellSize, y * GameGrid.gridCellSize])
    })
  })

  return gameField
}

export default GameField