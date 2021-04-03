const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    background: './background.js',
    'pages/newtab/newtab': './pages/newtab/newtab.js',
    'pages/warning/warning': './pages/warning/warning.js'
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
        { from: 'pages/newtab/newtab.html', to: 'pages/newtab/newtab.html' },
        { from: 'pages/warning/warning.html', to: 'pages/warning/warning.html' },
        { from: 'assets', to: 'assets' },
        { from: 'src', to: 'src' },
        { from: 'manifest.json', to: 'manifest.json' }
      ]
    })
  ]
}
