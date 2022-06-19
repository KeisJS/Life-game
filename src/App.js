import GameField from './gameField'
import Controls from './controls'
const App = () => {
  const root = document.querySelector('#root')

  const controls = Controls()

  root.appendChild(controls)

  const gameField = GameField({
    appRoot: root
  })

  root.appendChild(gameField)
}

export default App