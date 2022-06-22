import { createCommand } from './commands'

const setGameFieldSizeCommand = createCommand('set_game_field_size')
const clearGameField = createCommand('clear_game_field')
const gameOneStep = createCommand('game_one_step')

export {
  setGameFieldSizeCommand,
  clearGameField,
  gameOneStep
}