const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const package = require('./package.json');

const basePath = __dirname;
const src = path.join(basePath, "src");
const dist = path.join(basePath, "dist");

module.exports.dist = dist;

module.exports = {
  target: "node",
  context: src,
  entry: ['./index.ts'],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  output: {
    filename: 'index.js',
    path: dist,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};