/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./conf/webpack.config.js');
const os = require('os');
const port = 8080;
const app = express();
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

app.use(middleware);
//   app.use(webpackHotMiddleware(compiler));

  app.get('/hostname', function (req, res) {
      res.send(os.hostname());
  })
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });


app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> ðŸŒŽ Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});