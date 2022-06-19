import { Commands } from '../../commands/commands'
import controlStyles from '../styles.module.scss'
import { clearGameField } from '../../commands/commandsCreators'

const GameFieldClearControl = () => {
  const { runCommand } = Commands.getInstance()

  const template = `
<div class="${controlStyles.controlField}">
  <button>Clear</button>
</div>
  `

  const root = document.createElement('template')

  root.innerHTML = template

  const el = root.content.cloneNode(true)

  const button = el.querySelector('button')

  button.addEventListener('click', () => {
    runCommand(clearGameField())
  })

  return el
}

export default GameFieldClearControl