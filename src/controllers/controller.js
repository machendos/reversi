'use strict';

const Canva = require(__dirname + '/canva.js');

const {
  styles,
  COMPUTER_MODE,
  USER_MODE,
  WHITE_CHIP_MATRIX_VALUE,
  RESULT_TEXTS,
} = require(__dirname + '/../utils/constants');

const myselfModeButton = document.getElementById('myself-mode');
const computerModeButton = document.getElementById('computer-mode');
const currPlayerMarker = document.getElementById('curr-player');
const blackChipsCounter = document.getElementById('black-counter');
const whiteChipsCounter = document.getElementById('white-counter');
const gameResultText = document.getElementById('game-result-text');

class ReversiController extends Canva {
  constructor(canvasContainer) {
    super(canvasContainer);
    this.gameResult = '';
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
    currPlayerMarker.style.setProperty('background', fill);
  }

  chipCounterIncrement(player, incrementCount) {
    const oldWhiteValue = parseInt(whiteChipsCounter.innerText);
    const oldBlackValue = parseInt(blackChipsCounter.innerText);

    if (player === WHITE_CHIP_MATRIX_VALUE) {
      whiteChipsCounter.innerText = oldWhiteValue + incrementCount;
      this.setLeader(oldWhiteValue + incrementCount, oldBlackValue);
    } else {
      blackChipsCounter.innerText = oldBlackValue + incrementCount;
      this.setLeader(oldWhiteValue, oldBlackValue + incrementCount);
    }
  }

  setLeader(whiteScore, blackScore) {
    if (whiteScore > blackScore) {
      this.gameResult = 'white';
    } else if (blackScore > whiteScore) {
      this.gameResult = 'black';
    } else {
      this.gameResult = 'draw';
    }
  }

  handleGameFinish() {
    gameResultText.innerText = RESULT_TEXTS[this.gameResult];
  }
}

module.exports = ReversiController;
