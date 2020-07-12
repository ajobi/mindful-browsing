const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    background: './background.js',
    'layout/newtab/newtab': './layout/newtab/newtab.js',
    'layout/warning/warning': './layout/warning/warning.js'
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
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'layout/newtab/newtab.html', to: 'layout/newtab/newtab.html' },
        { from: 'layout/warning/warning.html', to: 'layout/warning/warning.html' },
        { from: 'assets', to: 'assets' },
        { from: 'modules', to: 'modules' },
        { from: 'manifest.json', to: 'manifest.json' }
      ]
    })
  ]
}
