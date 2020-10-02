'use strict';

const path = require('path');

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

module.exports = {
  entry: {
    index: PATHS.source + '/index.js',
  },
  mode: 'development',
  output: {
    path: PATHS.build,
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            plugins: ['transform-class-properties']
        }
      },
    ]
},
};
