class NamedLogger {
  readonly name: string
  readonly color: string

  constructor (name: string, color: string) {
    this.name = name
    this.color = color
  }

  log (message: string) {
    console.log(`%c ${this.name}: ${message}`, `color: ${this.color}`)
  }
}

export const getNamedLogger = (name: string, color: string): NamedLogger => new NamedLogger(name, color)
