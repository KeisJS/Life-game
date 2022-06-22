import styles from './styles.module.scss'
import GameFieldSizeControl from './gameFieldSizeControl'
import GameFieldClearControl from './gameFieldClearControl'
import OneStepControl from './oneStepControl'
import RunGameControl from './runGameControl'

const Controls = () => {
  const controlsRoot = document.createElement('div')

  controlsRoot.className = styles.controls

  const gameFieldSizeControl = GameFieldSizeControl({ defaultValue: 90 })
  const gameFieldClearControl = GameFieldClearControl()
  const oneStepControl = OneStepControl()
  const runGameControl = RunGameControl()

  controlsRoot.append(gameFieldSizeControl, gameFieldClearControl, oneStepControl, runGameControl)

  return controlsRoot
}

export default Controls