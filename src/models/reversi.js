'use strict';

const {
  EMPTY_NUMBER,
  AVAILABLE_NUMBER,
  DESK_SIZE,
  PASS_TURN,
} = require('../utils/constants');
const { getColorsNumbersByColorName } = require('../utils/helpers');

class ReversiModel {
  constructor(controller) {
    this.controller = controller;
  }

  calculateAvailableSteps = (board, playerColor) => {
    const [checkNumber, oppositeNumber] = getColorsNumbersByColorName(
      playerColor
    );

    const setOfAvailableSteps = new Set();

    for (let row = 0; row < board.length; row++) {
      for (let column = 0; column < board[row].length; column++) {
        if (board[row][column] === checkNumber) {
          this.getAvailableSteps(
            board,
            setOfAvailableSteps,
            row,
            column,
            checkNumber,
            oppositeNumber
          );
        }
      }
    }

    const arrayOfAvailableSteps = Array.from(setOfAvailableSteps).map(coords =>
      JSON.parse(coords)
    );

    if (arrayOfAvailableSteps.length === 0) {
      return PASS_TURN;
    } else {
      return arrayOfAvailableSteps;
    }
  };

  getAvailableSteps = (
    board,
    setOfAvailableSteps,
    rowIndex,
    columnIndex,
    checkNumber,
    oppositeNumber
  ) => {
    // Check Right
    if (
      columnIndex < 6 &&
      board[rowIndex][columnIndex + 1] === oppositeNumber
    ) {
      for (
        let currColumn = columnIndex + 2;
        currColumn < DESK_SIZE;
        currColumn++
      ) {
        if (board[rowIndex][currColumn] === checkNumber) {
          break;
        }

        if (
          board[rowIndex][currColumn] === EMPTY_NUMBER ||
          board[rowIndex][currColumn] === AVAILABLE_NUMBER
        ) {
          setOfAvailableSteps.add(JSON.stringify([rowIndex, currColumn]));
          break;
        }
      }
    }

    // Check Left
    if (
      columnIndex > 1 &&
      board[rowIndex][columnIndex - 1] === oppositeNumber
    ) {
      for (let currColumn = columnIndex - 2; currColumn >= 0; currColumn--) {
        if (board[rowIndex][currColumn] === checkNumber) {
          break;
        }

        if (
          board[rowIndex][currColumn] === EMPTY_NUMBER ||
          board[rowIndex][currColumn] === AVAILABLE_NUMBER
        ) {
          setOfAvailableSteps.add(JSON.stringify([rowIndex, currColumn]));
          break;
        }
      }
    }

    // Check Up
    if (rowIndex > 1 && board[rowIndex - 1][columnIndex] === oppositeNumber) {
      for (let currRow = rowIndex - 2; currRow >= 0; currRow--) {
        if (board[currRow][columnIndex] === checkNumber) {
          break;
        }

        if (
          board[currRow][columnIndex] === EMPTY_NUMBER ||
          board[currRow][columnIndex] === AVAILABLE_NUMBER
        ) {
          setOfAvailableSteps.add(JSON.stringify([currRow, columnIndex]));
          break;
        }
      }
    }

    // Check Down
    if (rowIndex < 6 && board[rowIndex + 1][columnIndex] === oppositeNumber) {
      for (let currRow = rowIndex + 2; currRow < DESK_SIZE; currRow++) {
        if (board[currRow][columnIndex] === checkNumber) {
          break;
        }

        if (
          board[currRow][columnIndex] === EMPTY_NUMBER ||
          board[currRow][columnIndex] === AVAILABLE_NUMBER
        ) {
          setOfAvailableSteps.add(JSON.stringify([currRow, columnIndex]));
          break;
        }
      }
    }

    // Check Right Down
    if (
      rowIndex < 6 &&
      columnIndex < 6 &&
      board[rowIndex + 1][columnIndex + 1] === oppositeNumber
    ) {
      let currRow = rowIndex + 2;
      let currColumn = columnIndex + 2;

      while (currRow < DESK_SIZE && currColumn < DESK_SIZE) {
        if (board[currRow][currColumn] === checkNumber) {
          break;
        }

        if (
          board[currRow][currColumn] === EMPTY_NUMBER ||
          board[currRow][currColumn] === AVAILABLE_NUMBER
        ) {
          setOfAvailableSteps.add(JSON.stringify([currRow, currColumn]));
          break;
        }

        currRow++;
        currColumn++;
      }
    }

    // Check Right Up
    if (
      rowIndex > 1 &&
      columnIndex < 6 &&
      board[rowIndex - 1][columnIndex + 1] === oppositeNumber
    ) {
      let currRow = rowIndex - 2;
      let currColumn = columnIndex + 2;

      while (currRow >= 0 && currColumn < DESK_SIZE) {
        if (board[currRow][currColumn] === checkNumber) {
          break;
        }

        if (
          board[currRow][currColumn] === EMPTY_NUMBER ||
          board[currRow][currColumn] === AVAILABLE_NUMBER
        ) {
          setOfAvailableSteps.add(JSON.stringify([currRow, currColumn]));
          break;
        }

        currRow--;
        currColumn++;
      }
    }

    // Check Left Up
    if (
      rowIndex > 1 &&
      columnIndex > 1 &&
      board[rowIndex - 1][columnIndex - 1] === oppositeNumber
    ) {
      let currRow = rowIndex - 2;
      let currColumn = columnIndex - 2;

      while (currRow >= 0 && currColumn >= 0) {
        if (board[currRow][currColumn] === checkNumber) {
          break;
        }

        if (
          board[currRow][currColumn] === EMPTY_NUMBER ||
          board[currRow][currColumn] === AVAILABLE_NUMBER
        ) {
          setOfAvailableSteps.add(JSON.stringify([currRow, currColumn]));
          break;
        }

        currRow--;
        currColumn--;
      }
    }

    // Check Left Down
    if (
      rowIndex < 6 &&
      columnIndex > 1 &&
      board[rowIndex + 1][columnIndex - 1] === oppositeNumber
    ) {
      let currRow = rowIndex + 2;
      let currColumn = columnIndex - 2;

      while (currRow < DESK_SIZE && currColumn >= 0) {
        if (board[currRow][currColumn] === checkNumber) {
          break;
        }

        if (
          board[currRow][currColumn] === EMPTY_NUMBER ||
          board[currRow][currColumn] === AVAILABLE_NUMBER
        ) {
          setOfAvailableSteps.add(JSON.stringify([currRow, currColumn]));
          break;
        }

        currRow++;
        currColumn--;
      }
    }
  };

  getChipsToBeRecolored = (board, rowIndex, columnIndex, playerColor) => {
    const [checkNumber, oppositeNumber] = getColorsNumbersByColorName(
      playerColor
    );

    const setOfChipsToBeRecolored = new Set();

    // Check Right
    if (
      columnIndex < 6 &&
      board[rowIndex][columnIndex + 1] === oppositeNumber
    ) {
      const oppositeChipsCoordsArray = [[rowIndex, columnIndex + 1]];

      for (
        let currColumn = columnIndex + 2;
        currColumn < DESK_SIZE;
        currColumn++
      ) {
        if (
          board[rowIndex][currColumn] === EMPTY_NUMBER ||
          board[rowIndex][currColumn] === AVAILABLE_NUMBER
        ) {
          break;
        }

        if (board[rowIndex][currColumn] === checkNumber) {
          oppositeChipsCoordsArray.forEach(coords =>
            setOfChipsToBeRecolored.add(JSON.stringify(coords))
          );
          break;
        }

        if (board[rowIndex][currColumn] === oppositeNumber) {
          oppositeChipsCoordsArray.push([rowIndex, currColumn]);
        }
      }
    }

    // Check Left
    if (
      columnIndex > 1 &&
      board[rowIndex][columnIndex - 1] === oppositeNumber
    ) {
      const oppositeChipsCoordsArray = [[rowIndex, columnIndex - 1]];

      for (let currColumn = columnIndex - 2; currColumn >= 0; currColumn--) {
        if (
          board[rowIndex][currColumn] === EMPTY_NUMBER ||
          board[rowIndex][currColumn] === AVAILABLE_NUMBER
        ) {
          break;
        }

        if (board[rowIndex][currColumn] === checkNumber) {
          oppositeChipsCoordsArray.forEach(coords =>
            setOfChipsToBeRecolored.add(JSON.stringify(coords))
          );
          break;
        }

        if (board[rowIndex][currColumn] === oppositeNumber) {
          oppositeChipsCoordsArray.push([rowIndex, currColumn]);
        }
      }
    }

    // Check Up
    if (rowIndex > 1 && board[rowIndex - 1][columnIndex] === oppositeNumber) {
      const oppositeChipsCoordsArray = [[rowIndex - 1, columnIndex]];

      for (let currRow = rowIndex - 2; currRow >= 0; currRow--) {
        if (
          board[currRow][columnIndex] === EMPTY_NUMBER ||
          board[currRow][columnIndex] === AVAILABLE_NUMBER
        ) {
          break;
        }

        if (board[currRow][columnIndex] === checkNumber) {
          oppositeChipsCoordsArray.forEach(coords =>
            setOfChipsToBeRecolored.add(JSON.stringify(coords))
          );
          break;
        }

        if (board[currRow][columnIndex] === oppositeNumber) {
          oppositeChipsCoordsArray.push([currRow, columnIndex]);
        }
      }
    }

    // Check Down
    if (rowIndex < 6 && board[rowIndex + 1][columnIndex] === oppositeNumber) {
      const oppositeChipsCoordsArray = [[rowIndex + 1, columnIndex]];

      for (let currRow = rowIndex + 2; currRow < DESK_SIZE; currRow++) {
        if (
          board[currRow][columnIndex] === EMPTY_NUMBER ||
          board[currRow][columnIndex] === AVAILABLE_NUMBER
        ) {
          break;
        }

        if (board[currRow][columnIndex] === checkNumber) {
          oppositeChipsCoordsArray.forEach(coords =>
            setOfChipsToBeRecolored.add(JSON.stringify(coords))
          );
          break;
        }

        if (board[currRow][columnIndex] === oppositeNumber) {
          oppositeChipsCoordsArray.push([currRow, columnIndex]);
        }
      }
    }

    // Check Right Down
    if (
      rowIndex < 6 &&
      columnIndex < 6 &&
      board[rowIndex + 1][columnIndex + 1] === oppositeNumber
    ) {
      let currRow = rowIndex + 2;
      let currColumn = columnIndex + 2;
      const oppositeChipsCoordsArray = [[rowIndex + 1, columnIndex + 1]];

      while (currRow < DESK_SIZE && currColumn < DESK_SIZE) {
        if (
          board[currRow][currColumn] === EMPTY_NUMBER ||
          board[currRow][currColumn] === AVAILABLE_NUMBER
        ) {
          break;
        }

        if (board[currRow][currColumn] === checkNumber) {
          oppositeChipsCoordsArray.forEach(coords =>
            setOfChipsToBeRecolored.add(JSON.stringify(coords))
          );
          break;
        }

        if (board[currRow][currColumn] === oppositeNumber) {
          oppositeChipsCoordsArray.push([currRow, currColumn]);
        }

        currRow++;
        currColumn++;
      }
    }

    // Check Right Up
    if (
      rowIndex > 1 &&
      columnIndex < 6 &&
      board[rowIndex - 1][columnIndex + 1] === oppositeNumber
    ) {
      let currRow = rowIndex - 2;
      let currColumn = columnIndex + 2;
      const oppositeChipsCoordsArray = [[rowIndex - 1, columnIndex + 1]];

      while (currRow >= 0 && currColumn < DESK_SIZE) {
        if (
          board[currRow][currColumn] === EMPTY_NUMBER ||
          board[currRow][currColumn] === AVAILABLE_NUMBER
        ) {
          break;
        }

        if (board[currRow][currColumn] === checkNumber) {
          oppositeChipsCoordsArray.forEach(coords =>
            setOfChipsToBeRecolored.add(JSON.stringify(coords))
          );
          break;
        }

        if (board[currRow][currColumn] === oppositeNumber) {
          oppositeChipsCoordsArray.push([currRow, currColumn]);
        }

        currRow--;
        currColumn++;
      }
    }

    // Check Left Up
    if (
      rowIndex > 1 &&
      columnIndex > 1 &&
      board[rowIndex - 1][columnIndex - 1] === oppositeNumber
    ) {
      let currRow = rowIndex - 2;
      let currColumn = columnIndex - 2;
      const oppositeChipsCoordsArray = [[rowIndex - 1, columnIndex - 1]];

      while (currRow >= 0 && currColumn >= 0) {
        if (
          board[currRow][currColumn] === EMPTY_NUMBER ||
          board[currRow][currColumn] === AVAILABLE_NUMBER
        ) {
          break;
        }

        if (board[currRow][currColumn] === checkNumber) {
          oppositeChipsCoordsArray.forEach(coords =>
            setOfChipsToBeRecolored.add(JSON.stringify(coords))
          );
          break;
        }

        if (board[currRow][currColumn] === oppositeNumber) {
          oppositeChipsCoordsArray.push([currRow, currColumn]);
        }

        currRow--;
        currColumn--;
      }
    }

    // Check Left Down
    if (
      rowIndex < 6 &&
      columnIndex > 1 &&
      board[rowIndex + 1][columnIndex - 1] === oppositeNumber
    ) {
      let currRow = rowIndex + 2;
      let currColumn = columnIndex - 2;
      const oppositeChipsCoordsArray = [[rowIndex + 1, columnIndex - 1]];

      while (currRow < DESK_SIZE && currColumn >= 0) {
        if (
          board[currRow][currColumn] === EMPTY_NUMBER ||
          board[currRow][currColumn] === AVAILABLE_NUMBER
        ) {
          break;
        }

        if (board[currRow][currColumn] === checkNumber) {
          oppositeChipsCoordsArray.forEach(coords =>
            setOfChipsToBeRecolored.add(JSON.stringify(coords))
          );
          break;
        }

        if (board[currRow][currColumn] === oppositeNumber) {
          oppositeChipsCoordsArray.push([currRow, currColumn]);
        }

        currRow++;
        currColumn--;
      }
    }

    const arrayOfChipsToBeRecolored = Array.from(
      setOfChipsToBeRecolored
    ).map(coords => JSON.parse(coords));

    return arrayOfChipsToBeRecolored;
  };
}

module.exports = ReversiModel;
