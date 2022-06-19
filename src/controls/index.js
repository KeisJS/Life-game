import styles from './styles.module.scss'
import GameFieldSizeControl from './gameFieldSizeControl'
import GameFieldClearControl from './gameFieldClearControl'

// const layout = `
//     <div class="${styles.controls}">
//       <label class="${styles.controlField}">
//         <button>One step</button>
//       </label>
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

  controlsRoot.append(gameFieldSizeControl, gameFieldClearControl)

  return controlsRoot
}

export default Controls