const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    background: './background.js'
  },
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'layout', to: 'layout' },
        { from: 'assets', to: 'assets' },
        { from: 'modules', to: 'modules' },
        { from: 'manifest.json', to: 'manifest.json' }
      ]
    })
  ]
}
