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
  output: {
    path: PATHS.build,
    filename: 'build.js',
  },
};
