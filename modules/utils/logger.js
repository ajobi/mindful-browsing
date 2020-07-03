const LOGGER = (function() {
  class NamedLogger {
    name;
    color;

    constructor(name, color) {
      this.name = name;
      this.color = color;
    }

    log(message) {
      console.log(`%c ${this.name}: ${message}`, `color: ${this.color}`);
    }
  }

  return {
    getNamedLogger: (name, color) => new NamedLogger(name, color)
  };
})();
