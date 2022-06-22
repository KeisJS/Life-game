import controlStyles from '../styles.module.scss'
import { setGameFieldSizeCommand } from '../../commands/commandsCreators'
import { Commands } from '../../commands/commands'

const GameFieldSizeControl = ({ defaultValue = ''} = {}) => {
  const { runCommand } = Commands.getInstance()

  const template = `
<div class="${controlStyles.controlField}">
 <label>
    Size: 
    <input type="number" min="0" value="${defaultValue}" />
  </label>
  <button>Build field</button>    
</div>
  `
  const root = document.createElement('template')

  root.innerHTML = template

  const el = root.content.cloneNode(true)
  const input = el.querySelector('input')
  const button = el.querySelector('button')

  button.addEventListener('click', () => {
    runCommand(setGameFieldSizeCommand(input.value))
  })

  return el
}

export default GameFieldSizeControl