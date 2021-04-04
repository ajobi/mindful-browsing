const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    worker: './worker/index.js',
    'pages/newtab/newtab': './vue/pages/newtab/newtab.js',
    'pages/warning/warning': './vue/pages/warning/warning.js'
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
        use: ['style-loader', { loader: 'css-loader', options: { url: false } }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'vue/pages/newtab/newtab.html', to: 'pages/newtab/newtab.html' },
        { from: 'vue/pages/warning/warning.html', to: 'pages/warning/warning.html' },
        { from: 'assets', to: 'assets' },
        { from: 'manifest.json', to: 'manifest.json' }
      ]
    })
  ]
}
