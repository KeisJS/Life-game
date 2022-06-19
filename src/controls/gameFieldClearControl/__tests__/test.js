import { Commands } from '../../../commands/commands'
import { clearGameField } from '../../../commands/commandsCreators'
import { byText } from 'testing-library-selector'
import userEvent from '@testing-library/user-event'
import GameFieldClearControl from '../index'

describe('Test GameFieldClearControl', () => {
  it('Test default use', () => {
    const commands = Commands.getInstance()
    const clearGameFieldHandler = jest.fn()

    commands.addCommandHandler(clearGameField, clearGameFieldHandler)

    const gameFieldClearControl = GameFieldClearControl()

    document.body.append(gameFieldClearControl)

    const clearButton = byText('Clear').get()

    userEvent.click(clearButton)

    expect(clearGameFieldHandler).toHaveBeenCalled()
  })
})