const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
        { test: /\.(jpg|png|gif|svg|pdf)$/, use: [ { loader: 'file-loader', options: { name: '[name].[ext]', outputPath: './assets/images/' } } ] },
    ]
}
};