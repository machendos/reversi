'use strict';

const Canva = require('../views/canva.js');
const ReversiModel = require('../models/reversi.js');
const {
  BLACK_COLOR,
  WHITE_COLOR,
  AVAILABLE_NUMBER,
  EMPTY_NUMBER,
  PASS_TURN,
} = require('../utils/constants.js');
const {
  withOnChangeListener,
  getColorsNumbersByColorName,
} = require('../utils/helpers');

const myselfModeButton = document.getElementById('myself-mode');
const computerModeButton = document.getElementById('computer-mode');

class ReversiController extends Canva {
  constructor(canvasContainer) {
    super(canvasContainer);
    this.IS_USER_MODE = true;
    this.reversiModel = null;
    this.matrix = [];
    this.playerColor = withOnChangeListener(
      'color',
      BLACK_COLOR,
      this.onPlayerChange
    );
    this.whiteCounter = 2;
    this.blackCounter = 2;
    this.isFirstPlayerPassedTurn = false;
    this.isClickBlocked = false;

    this.generateStartBoard();
  }

  start() {
    this.init();
    this.renderBoard();
    this.onModeChange(this.handleModeChange);
    this.onBoardClick(this.handlePlayerClick);
    this.reversiModel = new ReversiModel(this);
    this.setAvailableSteps();
  }

  setAvailableSteps = () => {
    this.cleanAvailableSteps();
    const availableSteps = this.reversiModel.calculateAvailableSteps(
      this.matrix,
      this.playerColor.color
    );

    if (availableSteps === PASS_TURN) {
      if (!this.isFirstPlayerPassedTurn) {
        this.isFirstPlayerPassedTurn = true;
        this.togglePlayerColor();
      } else {
        this.handleGameOver();
        return;
      }
    }

    availableSteps.forEach(
      ([row, column]) => (this.matrix[row][column] = AVAILABLE_NUMBER)
    );
    this.renderBoard();

    if (!this.IS_USER_MODE && this.playerColor.color === WHITE_COLOR)
      this.simulateAIMove(availableSteps);
  };

  generateStartBoard = () => {
    // 0 corresponds for EMPTY cell, 1 - for WHITE and 2 - for BLACK, 3 - for AVAILABLE step
    this.matrix = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    this.whiteCounter = 2;
    this.blackCounter = 2;
  };

  cleanAvailableSteps = () => {
    for (let row = 0; row < this.matrix.length; row++) {
      for (let column = 0; column < this.matrix[row].length; column++) {
        if (this.matrix[row][column] === AVAILABLE_NUMBER) {
          this.matrix[row][column] = EMPTY_NUMBER;
        }
      }
    }
    this.renderBoard();
  };

  handleChipPlacement = (row, column, color) => {
    const [colorNumber, oppositeNumber] = getColorsNumbersByColorName(color);
    const oldColor = this.getOppositeColor(color);

    this.matrix[row][column] = colorNumber;
    this.put(row, column, color);

    const chipsToBeRecolored = this.reversiModel.getChipsToBeRecolored(
      this.matrix,
      row,
      column,
      color
    );
    chipsToBeRecolored.forEach(([row, column]) => {
      this.matrix[row][column] = colorNumber;
      this.changeColor(row, column, oldColor, color);
    });

    setTimeout(() => {
      this.countChips(chipsToBeRecolored.length, color);
      this.togglePlayerColor();
    }, 500);
  };

  countChips = (recoloredChips, color) => {
    const oppositeColor = this.getOppositeColor(color);

    const increasedCounter = `${color}Counter`;
    const decreasedCounter = `${oppositeColor}Counter`;

    // number of changed chips and 1 placed manually
    const numberToIncrease = recoloredChips + 1;

    this[increasedCounter] += numberToIncrease;
    this[decreasedCounter] -= recoloredChips;

    if (this.blackCounter + this.whiteCounter === 64) {
      this.handleGameOver();
      return;
    }

    document.getElementById(
      `${color}-counter`
    ).innerHTML = `${this[increasedCounter]}`;
    document.getElementById(
      `${oppositeColor}-counter`
    ).innerHTML = `${this[decreasedCounter]}`;
  };

  handleGameOver = () => {
    if (this.blackCounter === this.whiteCounter) {
      document.getElementById('counter').innerHTML = 'Draw';
    } else {
      const winner =
        this.blackCounter > this.whiteCounter ? BLACK_COLOR : WHITE_COLOR;
      document.getElementById('counter').innerHTML = `${winner} wins!`;
    }
  };

  renderBoard = () => {
    for (let row = 0; row < this.matrix.length; row++) {
      for (let column = 0; column < this.matrix[row].length; column++) {
        switch (this.matrix[row][column]) {
          case 1:
            this.put(row, column, WHITE_COLOR);
            break;
          case 2:
            this.put(row, column, BLACK_COLOR);
            break;
          case 3:
            this.put(row, column);
            break;
          default:
            this.remove(row, column);
            break;
        }
      }
    }
  };

  simulateAIMove = possibleSteps => {
    setTimeout(() => {
      const randomPCMoveIndex = Math.floor(
        Math.random() * (possibleSteps.length - 1)
      );
      const randomPCMove = possibleSteps[randomPCMoveIndex];

      this.handlePlayerClick({ row: randomPCMove[0], column: randomPCMove[1] });
    }, 1000);
  };

  getOppositeColor = color =>
    color === WHITE_COLOR ? BLACK_COLOR : WHITE_COLOR;

  togglePlayerColor = () =>
    (this.playerColor.color = this.getOppositeColor(this.playerColor.color));

  handlePlayerClick = ({ row, column }) => {
    if (
      (!this.IS_USER_MODE && this.playerColor.color === WHITE_COLOR) ||
      this.isClickBlocked ||
      this.matrix[row][column] !== AVAILABLE_NUMBER
    ) {
      console.log('you have no power here');
    } else {
      // block clicks so user don't spam on available fields until they refresh
      this.isClickBlocked = true;
      this.handleChipPlacement(row, column, this.playerColor.color);
    }
  };

  handleModeChange = mode => {
    if (mode === 'user_mode') {
      this.IS_USER_MODE = true;
    } else {
      this.IS_USER_MODE = false;
    }

    this.generateStartBoard();
    this.setAvailableSteps();
  };

  onPlayerChange = playerColor => {
    this.setAvailableSteps();
    this.isClickBlocked = false;
  };

  onModeChange(listener) {
    myselfModeButton.onclick = () => {
      myselfModeButton.classList.add('selected');
      computerModeButton.classList.remove('selected');
      listener('user_mode');
    };

    computerModeButton.onclick = () => {
      computerModeButton.classList.add('selected');
      myselfModeButton.classList.remove('selected');
      listener('computer_mode');
    };
  }
}

module.exports = ReversiController;
