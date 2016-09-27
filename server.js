const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev.config')
// const isDev = process.env.NODE_ENV !== 'production'

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3003, 'localhost', function (err, result) {
  if (err) {
    console.log(err)
  }

  console.log('⬡ Listening at localhost:3003')
});
