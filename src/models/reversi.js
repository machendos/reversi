'use strict';

const startedPosition = require(__dirname + '/../started-position.json');

const {
  CELLS_IN_ROW,
  COMPUTER_MODE,
  NO_CHIP_MATRIX_VALUE,
  WHITE_CHIP_MATRIX_VALUE,
  BLACK_CHIP_MATRIX_VALUE,
  AVAILABLE_STEP_MATRIX_VALUE,
  COMPUTER_THINK_TIMEOUT,
} = require(__dirname + '/../utils/constants');

const stepAvailabilityCheckStates = {
  WAIT_OPPONENT: 1,
  WAIT_NOT_EMPTY: 2,
};

const offsets = [-1, 0, 1];

const offsetsPairs = offsets
  .map(rowOffset => offsets.map(columnOffset => [rowOffset, columnOffset]))
  .flat()
  .filter(([rowOffset, columnOffset]) => rowOffset || columnOffset);

function* offsetIndexesGenerator([row, column], [rowOffset, columnOffset]) {
  row += rowOffset;
  column += columnOffset;

  while (row >= 0 && row < 8 && column >= 0 && column < 8) {
    yield [row, column];
    row += rowOffset;
    column += columnOffset;
  }
}

class ReversiModel {
  constructor(input) {
    this.countChipsTotal = 0;
    this.availableSteps = [];
    this.input = input;
    this.gameFinished = false;
    this.currPlayer = BLACK_CHIP_MATRIX_VALUE;
    this.computerMode = false;
    this.isOneOfPlayersStuck = false;
    
    this.input.onModeChange(mode => {
      // set init state of ReversiModel
      this.countChipsTotal = 0;
      this.availableSteps = [];
      this.input = input;
      this.gameFinished = false;
      this.computerMode = mode === COMPUTER_MODE;
      this.currPlayer = BLACK_CHIP_MATRIX_VALUE;
      this.isOneOfPlayersStuck = false;

      // set init state of ReversiController
      this.input.whiteScore = 0;
      this.input.blackScore = 0;

      // redraw game field
      this.input.init();
      this.input.render();
      this.initModel();

      this.tryComputerStep();
    });

    this.input.onBoardClick(({ rowIndex, columnIndex }) => {
      if (this.computerMode && this.currPlayer === BLACK_CHIP_MATRIX_VALUE)
        return;
      this.makeStep(rowIndex, columnIndex);
    });
  }

  makeStep(rowIndex, columnIndex) {
    const available = this.availableSteps.find(
      (availableStep) =>
        availableStep.rowIndex === rowIndex &&
        availableStep.columnIndex === columnIndex
    );

    if (!available) return;
    if (++this.countChipsTotal >= Math.pow(CELLS_IN_ROW, 2))
      this.gameFinished = true;

    this.input.chipCounterIncrement(this.currPlayer, 1);

    this.availableSteps.splice(this.availableSteps.indexOf(available), 1);
    this.matrix[rowIndex][columnIndex] = this.currPlayer;
    this.input.put(rowIndex, columnIndex, this.currPlayer);
    const opponentMatrixValue = this.currPlayer === 1 ? 2 : 1;

    available.willChanged.forEach(([rowIndex, columnIndex]) => {
      this.matrix[rowIndex][columnIndex] = this.currPlayer;
      this.input.changeColor(
        rowIndex,
        columnIndex,
        this.currPlayer === WHITE_CHIP_MATRIX_VALUE
          ? BLACK_CHIP_MATRIX_VALUE
          : WHITE_CHIP_MATRIX_VALUE,
        this.currPlayer
      );
      this.input.chipCounterIncrement(this.currPlayer, 1);
      this.input.chipCounterIncrement(opponentMatrixValue, -1);
    });

    if (this.gameFinished) {
      this.input.handleGameFinish()
    } else {
      this.prepareForNextStep()
    };
  }

  initModel() {
    this.matrix = new Array(8)
      .fill(null)
      .map(() => new Array(8).fill(NO_CHIP_MATRIX_VALUE));

    startedPosition.black.forEach(
      ({ row, column }) => (this.matrix[row][column] = BLACK_CHIP_MATRIX_VALUE)
    );

    startedPosition.white.forEach(
      ({ row, column }) => (this.matrix[row][column] = WHITE_CHIP_MATRIX_VALUE)
    );

    this.matrix.map((row, rowIndex) =>
      row.map((element, columnIndex) =>
        this.input.put(rowIndex, columnIndex, element)
      )
    );
    this.prepareForNextStep();

    this.input.chipCounterIncrement(
      BLACK_CHIP_MATRIX_VALUE,
      startedPosition.black.length
    );

    this.input.chipCounterIncrement(
      WHITE_CHIP_MATRIX_VALUE,
      startedPosition.white.length
    );

    this.countChipsTotal +=
      startedPosition.black.length + startedPosition.white.length;
  }

  prepareForNextStep() {
    this.changeCurrPlayer();
    this.removeOldAvailableSteps();
    this.setNewAvailableSteps();
    this.tryComputerStep();
  }

  changeCurrPlayer() {
    this.currPlayer =
      this.currPlayer === WHITE_CHIP_MATRIX_VALUE
        ? BLACK_CHIP_MATRIX_VALUE
        : WHITE_CHIP_MATRIX_VALUE;
    this.input.setCurrPlayer(this.currPlayer);
  }

  removeOldAvailableSteps() {
    this.availableSteps.forEach(({ rowIndex, columnIndex }) =>
      this.input.remove(rowIndex, columnIndex));
  }

  setNewAvailableSteps() {
    this.calculateAvailableSteps();

    if (!this.availableSteps.length) {
      if (!this.isOneOfPlayersStuck) {
        // if no available steps, we mark that one player is stuck
        // and move turn to his opponent
        this.isOneOfPlayersStuck = true;
        return this.prepareForNextStep();
      } else {
        // if player's opponent was stuck and now player don't have
        // available steps, game is finished
        this.input.handleGameFinish();
      }
    } else {
      // drop isOneOfPlayersStuck flag in case if player don't have
      // available steps, but his opponent has
      this.isOneOfPlayersStuck = false;
    }

    this.availableSteps.forEach(({ rowIndex, columnIndex }) => {
      this.input.put(rowIndex, columnIndex, AVAILABLE_STEP_MATRIX_VALUE);
    });
  }

  tryComputerStep() {
    if (this.gameFinished) return;

    if (this.computerMode && this.currPlayer === BLACK_CHIP_MATRIX_VALUE) {
      const randomStep = this.availableSteps[
        Math.floor(Math.random() * this.availableSteps.length)
      ];

      const bestMoveIndex = this.getBestMoveIndex(this.availableSteps, false);
      const bestMove = this.availableSteps[bestMoveIndex];

      setTimeout(() => {
        this.makeStep(bestMove.rowIndex, bestMove.columnIndex);
      }, COMPUTER_THINK_TIMEOUT);
    }
  }

  getBestMoveIndex(stepsArray, isEnemyTurn) {
    const { whiteScore, blackScore } = this.input;

    const arrayOfMovesCosts = stepsArray.map(({ willChanged }) => {
      if (isEnemyTurn) {
        // 1 for just placed chip
        // x2 because of chip flipping (- for you, + for enemy)
        return blackScore - whiteScore - 1 - (2 * willChanged.length);
      } else {
        // 1 for just placed chip
        // x2 because of chip flipping (+ for you, - for enemy)
        return blackScore - whiteScore + 1 + (2 * willChanged.length);
      }
    });

    // we need min() function here as we have an anti-reversi in task
    const minMoveCost = Math.min(...arrayOfMovesCosts);
    return arrayOfMovesCosts.findIndex(moveCost => moveCost === minMoveCost);
  }

  calculateAvailableSteps() {
    const availableSteps = [];
    const opponentMatrixValue = this.currPlayer === 1 ? 2 : 1;

    this.matrix.forEach((row, rowIndex) =>
      row.forEach((element, columnIndex) => {
        if (element === NO_CHIP_MATRIX_VALUE) {
          const willChanged = [];
          let isAvailable = false;

          offsetsPairs.forEach(([rowOffset, columnOffset]) => {
            let state = stepAvailabilityCheckStates.WAIT_OPPONENT;
            const willChangedNotApproved = [];

            for (const [currRow, currColumn] of offsetIndexesGenerator(
              [rowIndex, columnIndex],
              [rowOffset, columnOffset]
            )) {
              const currElement = this.matrix[currRow][currColumn];
              if (state === stepAvailabilityCheckStates.WAIT_OPPONENT) {

                if (currElement === opponentMatrixValue) {
                  state = stepAvailabilityCheckStates.WAIT_NOT_EMPTY;
                  willChangedNotApproved.push([currRow, currColumn]);
                } else {
                  break;
                }

              } else {

                if (currElement === this.currPlayer) {
                  isAvailable = true;
                  willChangedNotApproved.forEach(element =>
                    willChanged.push(element)
                  );
                  break;
                } else if (currElement !== opponentMatrixValue) {
                  break;
                } else {
                  willChangedNotApproved.push([currRow, currColumn]);
                }

              }
            }
          });

          if (isAvailable)
            availableSteps.push({ rowIndex, columnIndex, willChanged });
        }
      })
    );
    this.availableSteps = availableSteps;
  }
}

module.exports = ReversiModel;
