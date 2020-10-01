'use strict';

class ReversiModel {
  constructor(input) {
    this.input = input;
  }

  init() {
    this.input
      .put(4, 4, 'white')
      .put(5, 5, 'white')
      .put(4, 5, 'black')
      .put(5, 4, 'black');
  }
}

module.exports = ReversiModel;
