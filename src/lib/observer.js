class Observer {
  handlers = {}

  emitEvent(type, ...params) {
    this.handlers[type] && this.handlers[type](...params)
  }

  addHandler(type, handler) {
    this.handlers[type] = handler
  }
}

export default Observer