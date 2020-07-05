const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    background: './background.js'
  },
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'layout', to: 'layout' },
        { from: 'package.json', to: 'package.json' }
      ]
    })
  ]
}
