import styles from './styles.module.scss'
import {
  setGameFieldSizeCommand,
  clearGameField,
  gameOneStep,
  runGame
} from '../commands/commandsCreators'
import { Commands } from '../commands/commands'
import GameGrid from './gameGrid'
import LifeCells from './lifeCells'
import GameModel from '../gameModel'

const GameField = () => {
  let gameRunId
  const gameField = document.createElement('div')

  gameField.className = styles.gameField

  const gameGrid = GameGrid.getInstance()

  gameField.appendChild(gameGrid.getContainer())

  const lifeCells = LifeCells.getInstance()

  gameField.appendChild(lifeCells.getContainer())

  const game = GameModel.getInstance()

  const mouseMoveHandler = (() => {
    let lastX
    let lastY
    const cellSize = GameGrid.gridCellSize

    return ({ offsetX: x, offsetY: y }) => {
      const curX = x - x%cellSize
      const curY = y - y%cellSize

      if (!(curX === lastX && curY === lastY)) {
        lastX = curX
        lastY = curY

        lifeCells.refreshCell([curX, curY])
        game.refreshCell([curX / cellSize, curY / cellSize])
      }
    }
  })()

  gameField.addEventListener('mousedown', ({ offsetX: x, offsetY: y }) => {
    gameField.addEventListener('mousemove', mouseMoveHandler)
  })

  gameField.addEventListener('mouseup', () => {
    gameField.removeEventListener('mousemove', mouseMoveHandler)
  })

  gameField.addEventListener('mouseleave', () => {
    gameField.removeEventListener('mousemove', mouseMoveHandler)
  })

  const { addCommandHandler } = Commands.getInstance()

  addCommandHandler(setGameFieldSizeCommand, ({ payload: size }) => {
    gameField.style.width = `${size * GameGrid.gridCellSize}px`
    gameField.style.height = `${size * GameGrid.gridCellSize}px`

    gameGrid.buildOrRefreshGrid(size)
    lifeCells.clear()
    game.setSize(size)
    game.clear()
    window.clearInterval(gameRunId)
  })

  addCommandHandler(clearGameField, () => {
    lifeCells.clear()
    game.clear()
    window.clearInterval(gameRunId)
  })

  addCommandHandler(gameOneStep, () => {
    const { dead, newBorn } = game.nextGeneration()

    const workCells = [...dead, ...newBorn]

    lifeCells.refreshCells(workCells)
    window.clearInterval(gameRunId)
  })

  addCommandHandler(runGame, () => {
    window.clearInterval(gameRunId)
    gameRunId = window.setInterval(() => {
      const { dead, newBorn } = game.nextGeneration()

      const workCells = [...dead, ...newBorn]

      lifeCells.refreshCells(workCells)
    }, 100)
  })

  return gameField
}

export default GameField