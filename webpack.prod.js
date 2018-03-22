const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const { serverConfig, browserConfig } = require('./webpack.common.js');

module.exports = [
  merge(serverConfig, {}),
  merge(browserConfig, {
    plugins: [
      new UglifyJSPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.WEBPACK_HASH': '[hash]'
      })
    ],
    output: {
      filename: 'browser-bundle-prod[hash].js'
    }
  })
];
