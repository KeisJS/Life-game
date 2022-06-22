import styles from './styles.module.scss'
import GameFieldSizeControl from './gameFieldSizeControl'
import GameFieldClearControl from './gameFieldClearControl'
import OneStepControl from './oneStepControl'

// const layout = `
//     <div class="${styles.controls}">
//       <label class="${styles.controlField}">
//         <button>Run</button>
//       </label>
//     </div>
//   `

const Controls = () => {
  const controlsRoot = document.createElement('div')

  controlsRoot.className = styles.controls

  const gameFieldSizeControl = GameFieldSizeControl()
  const gameFieldClearControl = GameFieldClearControl()
  const oneStepControl = OneStepControl()

  controlsRoot.append(gameFieldSizeControl, gameFieldClearControl, oneStepControl)

  return controlsRoot
}

export default Controls