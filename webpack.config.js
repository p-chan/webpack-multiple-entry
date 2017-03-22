const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const env = process.env.NODE_ENV;

const entries = {}
const devices = ['pc', 'sp'];

devices.map((device) => {
  glob.sync(`./src/${device}/entries/*.js`).map((file) => {
    const basename = path.basename(file);
    entries[`${device}/${basename}`] = file;
  });
});

module.exports = {
  devtool: env === 'production' ? false : 'inline-source-map',
  entry: entries,
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name]'
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: env === 'production' ? false : true,
    })
  ]
}
