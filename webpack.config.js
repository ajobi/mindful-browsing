const path = require('path')

module.exports = {
  entry: {
    background: './background.js',
  },
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
