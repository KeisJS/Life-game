import styles from './App.module.scss';
import GameField from './gameField'

const Controls = () => {
  const layout = `
    <div class="${styles.controls}">
      <label class="${styles.controlField}">
        Size: 
        <input type="number" />
        <button>Build field</button>    
      </label>
      <label class="${styles.controlField}">
        <button>One step</button>
      </label>
      <label class="${styles.controlField}">
        <button>Run</button>
      </label>
      <label class="${styles.controlField}">
        <button>Clear</button>
      </label>
    </div>
  `

  const root = document.createElement('template')

  root.innerHTML = layout

  return root.content.cloneNode(true)
}



const App = () => {
  const root = document.querySelector('#root')

  const controls = Controls()

  root.appendChild(controls)

  const gameField = GameField(10)

  root.appendChild(gameField)
}

export default App
export { Controls }