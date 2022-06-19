import styles from './styles.module.scss'
import GameFieldSizeControl from './gameFieldSizeControl'

// const layout = `
//     <div class="${styles.controls}">
//       <label class="${styles.controlField}">
//         Size:
//         <input type="number" />
//         <button>Build field</button>
//       </label>
//       <label class="${styles.controlField}">
//         <button>One step</button>
//       </label>
//       <label class="${styles.controlField}">
//         <button>Run</button>
//       </label>
//       <label class="${styles.controlField}">
//         <button>Clear</button>
//       </label>
//     </div>
//   `

const Controls = () => {
  const controlsRoot = document.createElement('div')

  controlsRoot.className = styles.controls

  const gameFieldSizeControl = GameFieldSizeControl()

  controlsRoot.appendChild(gameFieldSizeControl)

  return controlsRoot
}

export default Controls