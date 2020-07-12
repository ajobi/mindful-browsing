const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    background: './background.js',
    'layout/newtab/newtab': './layout/newtab/newtab.js'
  },
  output: {
    filename: '[name].js',
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
        { from: 'layout/newtab/newtab.html', to: 'layout/newtab/newtab.html' },
        { from: 'layout/warning', to: 'layout/warning' },
        { from: 'assets', to: 'assets' },
        { from: 'modules', to: 'modules' },
        { from: 'manifest.json', to: 'manifest.json' }
      ]
    })
  ]
}
