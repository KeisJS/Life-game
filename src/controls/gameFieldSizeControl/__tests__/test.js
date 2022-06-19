import { Commands } from '../../../commands/commands'
import { setGameFieldSizeCommand } from '../../../commands/commandsCreators'
import { byLabelText, byText } from 'testing-library-selector'
import userEvent from '@testing-library/user-event'
import GameFieldSizeControl from '../index'

describe('Test gameFieldSizeControl', () => {
  it('Test default use', () => {
    const commands = Commands.getInstance()
    const setGameFieldSizeHandler = jest.fn()

    commands.addCommandHandler(setGameFieldSizeCommand, setGameFieldSizeHandler)

    const gameFieldSizeControl = GameFieldSizeControl(commands)

    document.body.append(gameFieldSizeControl)

    const input = byLabelText('Size:').get()

    userEvent.type(input, '10')

    const submitSize = byText('Build field').get()

    userEvent.click(submitSize)

    expect(setGameFieldSizeHandler).toHaveBeenCalledWith(expect.objectContaining(setGameFieldSizeCommand('10')))
  })
})