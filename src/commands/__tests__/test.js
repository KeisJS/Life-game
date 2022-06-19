import { createCommand, Commands } from '../commands'

describe('Test Commands feature', function () {
  it('Test command creator', () => {
    const addCommand = createCommand('add')

    expect(addCommand('Test')).toEqual({
      type: 'add',
      payload: 'Test'
    })

    expect(addCommand.toString()).toBe('add')
  })

  it('Test Commands default use', () => {
    const addCommand = createCommand('add')
    const commands = Commands.getInstance()
    const addHandler = jest.fn()
    const secondAddHandler = jest.fn()

    const { addCommandHandler, runCommand } = commands

    addCommandHandler(addCommand, addHandler)
    addCommandHandler(addCommand, secondAddHandler)
    runCommand(addCommand('test data'))

    expect(addHandler).toHaveBeenCalledWith(expect.objectContaining({
      type: 'add',
      payload: 'test data'
    }))

    expect(secondAddHandler).toHaveBeenCalledWith(expect.objectContaining({
      type: 'add',
      payload: 'test data'
    }))
  })
})