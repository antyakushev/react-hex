var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var postcssImport = require('postcss-import')
var postcssNested = require('postcss-nested')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var cssModuleName =  true ? //(env === 'development')
'&localIdentName=[name]__[local]--[hash:base64:5]' : ''

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3003',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.[chunkhash].css', {
      disable: true, //env === 'development'
      allChunks: true
    })
  ],
  postcss: [
    postcssImport({
      addDependencyTo: webpack,
      path: [
        path.join(__dirname, 'src'),
      ]
    }),
    autoprefixer({
      browsers: ['last 2 versions']
    }),
    postcssNested()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1' + cssModuleName + '!postcss'),
        include: path.join(__dirname, 'src')
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'src/components'),
      'node_modules'
    ]
  }
}
