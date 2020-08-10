class NamedLogger {
  constructor (name, color) {
    this.name = name
    this.color = color
  }

  log (message) {
    console.log(`%c ${this.name}: ${message}`, `color: ${this.color}`)
  }
}

export const getNamedLogger = (name, color) => new NamedLogger(name, color)
