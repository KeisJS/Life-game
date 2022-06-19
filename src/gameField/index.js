import styles from './styles.module.scss'
import { setGameFieldSizeCommand, clearGameField } from '../commands/commandsCreators'
import { Commands } from '../commands/commands'
import GameGrid from './gameGrid'
import LifeCells from './lifeCells'

const GameField = () => {
  const gameField = document.createElement('div')

  gameField.className = styles.gameField

  const gameGrid = GameGrid.getInstance()

  gameField.appendChild(gameGrid.getContainer())

  const lifeCells = LifeCells.getInstance()

  gameField.appendChild(lifeCells.getContainer())

  gameField.addEventListener('click', ({ offsetX: x, offsetY: y, target }) => {
    const elX = x - x%20
    const elY = y - y%20

    console.log({ x, y, elX, elY })

    lifeCells.refreshCell({ x: elX, y: elY })
  })

  const { addCommandHandler } = Commands.getInstance()

  addCommandHandler(setGameFieldSizeCommand, ({ payload: size }) => {
    gameField.style.width = `${size * 20}px`
    gameField.style.height = `${size * 20}px`

    gameGrid.buildOrRefreshGrid(size)
    lifeCells.clear()
  })

  addCommandHandler(clearGameField, () => {
    lifeCells.clear()
  })

  return gameField
}

export default GameField