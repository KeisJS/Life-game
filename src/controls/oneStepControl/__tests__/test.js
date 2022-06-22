import { Commands } from '../../../commands/commands'
import { gameOneStep } from '../../../commands/commandsCreators'
import OneStepControl from '../index'
import { byText } from 'testing-library-selector'
import userEvent from '@testing-library/user-event'

describe('Test OneStepControl', () => {
  it('Default use', () => {
    const commands = Commands.getInstance()
    const gameOneStepHandler = jest.fn()

    commands.addCommandHandler(gameOneStep, gameOneStepHandler)

    const gameFieldClearControl = OneStepControl()

    document.body.append(gameFieldClearControl)

    const oneStepButton = byText('One step').get()

    userEvent.click(oneStepButton)

    expect(gameOneStepHandler).toHaveBeenCalled()
  })
})