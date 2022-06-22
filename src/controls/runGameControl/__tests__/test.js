import { Commands } from '../../../commands/commands'
import { runGame } from '../../../commands/commandsCreators'
import RunGameControl from '../index'
import { byText } from 'testing-library-selector'
import userEvent from '@testing-library/user-event'

describe('Test run game control', () => {
  it('Test default use', () => {
    const commands = Commands.getInstance()
    const runGameHandler = jest.fn()

    commands.addCommandHandler(runGame, runGameHandler)

    const runGameControl = RunGameControl()

    document.body.append(runGameControl)

    const clearButton = byText('Run').get()

    userEvent.click(clearButton)

    expect(runGameHandler).toHaveBeenCalled()
  })
})