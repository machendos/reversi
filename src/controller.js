'use strict';

const Canva = require(__dirname + '/canva.js');

const myselfModeButton = document.getElementById('myself-mode');
const computerModeButton = document.getElementById('computer-mode');

class ReversiController extends Canva {
  constructor(canvasContainer) {
    super(canvasContainer);
    this.COMPUTER_MODE = 0;
    this.USER_MODE = 1;
  }
  onModeChange(listener) {
    myselfModeButton.onclick = () => {
      myselfModeButton.classList.add('selected');
      computerModeButton.classList.remove('selected');
      listener(this.USER_MODE);
    };

    computerModeButton.onclick = () => {
      computerModeButton.classList.add('selected');
      myselfModeButton.classList.remove('selected');
      listener(this.COMPUTER_MODE);
    };
  }
}

module.exports = ReversiController;
