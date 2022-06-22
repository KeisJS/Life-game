import { Commands } from '../../commands/commands'
import controlStyles from '../styles.module.scss'
import { runGame } from '../../commands/commandsCreators'

const RunGameControl = () => {
  const { runCommand } = Commands.getInstance()

  const template = `
<div class="${controlStyles.controlField}">
  <button>Run</button>
</div>
  `

  const root = document.createElement('template')

  root.innerHTML = template

  const el = root.content.cloneNode(true)

  const button = el.querySelector('button')

  button.addEventListener('click', () => {
    runCommand(runGame())
  })

  return el
}

export default RunGameControl