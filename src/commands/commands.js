const createCommand = type => {
  const command = payload => ({
    type,
    payload
  })

  command.toString = () => type

  return command
}

class Commands {
  commands = {}

  static instance

  static getInstance() {
    if (!Commands.instance) {
      Commands.instance = new Commands()
    }

    return Commands.instance
  }

  addCommandHandler = (commandCreator, handler) => {
    if (!this.commands[commandCreator]) {
      this.commands[commandCreator] = []
    }

    this.commands[commandCreator].push(handler)
  }

  runCommand = (command) => {
    if (this.commands[command.type]) {
      this.commands[command.type].forEach(commandHandler => {
        commandHandler(command)
      })
    }
  }
}

export { createCommand, Commands }