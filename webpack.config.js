const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    background: './background.js',
    'components/layout/newtab/newtab': './components/layout/newtab/newtab.js',
    'components/layout/warning/warning': './components/layout/warning/warning.js'
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
        { from: 'components/layout/newtab/newtab.html', to: 'components/layout/newtab/newtab.html' },
        { from: 'components/layout/warning/warning.html', to: 'components/layout/warning/warning.html' },
        { from: 'assets', to: 'assets' },
        { from: 'modules', to: 'modules' },
        { from: 'manifest.json', to: 'manifest.json' }
      ]
    })
  ]
}
