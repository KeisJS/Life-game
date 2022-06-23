import controlStyles from '../styles.module.scss'
import { gameOneStep } from '../../commands/commandsCreators'
import { Commands } from '../../commands/commands'

const OneStepControl = () => {
  const { runCommand } = Commands.getInstance()

  const template = `
<div class="${controlStyles.controlField}">
  <button>One step / Stop</button>
</div>
  `

  const root = document.createElement('template')

  root.innerHTML = template

  const el = root.content.cloneNode(true)

  const button = el.querySelector('button')

  button.addEventListener('click', () => {
    runCommand(gameOneStep())
  })

  return el
}

export default OneStepControl