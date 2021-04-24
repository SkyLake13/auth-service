const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000']
    })
  ]
});