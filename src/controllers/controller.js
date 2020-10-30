'use strict';

const Canva = require(__dirname + '/canva.js');

const {
  styles,
  COMPUTER_MODE,
  USER_MODE,
  WHITE_CHIP_MATRIX_VALUE,
} = require(__dirname + '/../utils/constants');

const myselfModeButton = document.getElementById('myself-mode');
const computerModeButton = document.getElementById('computer-mode');
const currPlayerMarker = document.getElementById('curr-player');
const blackChipsCounter = document.getElementById('black-counter');
const whiteChipsCounter = document.getElementById('white-counter');

class ReversiController extends Canva {
  constructor(canvasContainer) {
    super(canvasContainer);
  }
  onModeChange(listener) {
    myselfModeButton.onclick = () => {
      myselfModeButton.classList.add('selected');
      computerModeButton.classList.remove('selected');
      listener(USER_MODE);
    };

    computerModeButton.onclick = () => {
      computerModeButton.classList.add('selected');
      myselfModeButton.classList.remove('selected');
      listener(COMPUTER_MODE);
    };
  }

  setCurrPlayer(player) {
    const { fill } = styles[player];
    console.log(fill);
    currPlayerMarker.style.setProperty('background', fill);
  }

  chipCounterIncrement(player, incrementCount) {
    if (player === WHITE_CHIP_MATRIX_VALUE) {
      whiteChipsCounter.innerText =
        parseInt(whiteChipsCounter.innerText) + incrementCount;
    } else {
      blackChipsCounter.innerText =
        parseInt(blackChipsCounter.innerText) + incrementCount;
    }
  }
}

module.exports = ReversiController;
