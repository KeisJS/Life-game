import Controls from './controls'
import LifeGameView from './lifeGameView'
import LifeGameModel from './lifeGameModel'
import { Commands } from './commands/commands'
import { clearGameField, gameOneStep, runGame, setGameFieldSizeCommand } from './commands/commandsCreators'

const App = () => {
  const root = document.querySelector('#root')

  const controls = Controls()

  root.appendChild(controls)

  const lifeGameModel = new LifeGameModel()
  const lifeGameView = LifeGameView.getInstance()

  lifeGameView.addHandler('refresh_cell', lifeGameModel.refreshCell)
  lifeGameModel.addHandler('changeSize', lifeGameView.onChangeFieldSize)
  lifeGameModel.addHandler('clear', lifeGameView.onClear)
  lifeGameModel.addHandler('nextGeneration', lifeGameView.onNextGeneration)

  root.appendChild(lifeGameView.getContainer())

  const { addCommandHandler } = Commands.getInstance()

  addCommandHandler(setGameFieldSizeCommand, ({ payload: size }) => {
    lifeGameModel.setSize(size)
  })

  addCommandHandler(clearGameField, () => {
    lifeGameModel.clear()
  })

  addCommandHandler(gameOneStep, () => {
    lifeGameModel.stopGame()
    lifeGameModel.nextGeneration()
  })

  addCommandHandler(runGame, () => {
    lifeGameModel.runGame()
  })
}

export default App