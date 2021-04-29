const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    worker: './worker/index.ts',
    'pages/newtab/newtab': './vue/pages/newtab/newtab.ts',
    'pages/warning/warning': './vue/pages/warning/warning.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/i,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { url: false } },
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'vue/pages/newtab/newtab.html', to: 'pages/newtab/newtab.html' },
        { from: 'vue/pages/warning/warning.html', to: 'pages/warning/warning.html' },
        { from: 'vue/assets', to: 'assets' },
        { from: 'manifest.json', to: 'manifest.json' }
      ]
    })
  ]
}
