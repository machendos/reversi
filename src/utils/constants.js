const NO_CHIP_MATRIX_VALUE = 0;
const WHITE_CHIP_MATRIX_VALUE = 1;
const BLACK_CHIP_MATRIX_VALUE = 2;
const AVAILABLE_STEP_MATRIX_VALUE = 3;

const WHITE_COLOR = 'white';
const BLACK_COLOR = 'black';
const BOARD_COLOR = 'darkgreen';

const FLIP_ITERATIONS = 10;
const FLIP_ITERATIONS_INTERVAL = 15;
const CANVAS_SAGE_PIXELS_COUNT = 1;

const CELLS_IN_ROW = 8;

const styles = {
  0: { fill: BOARD_COLOR, def: true },
  1: { fill: WHITE_COLOR },
  2: { fill: BLACK_COLOR },
  3: { fill: BLACK_COLOR, border: true },
};

const COMPUTER_MODE = 0;
const USER_MODE = 1;

const COMPUTER_THINK_TIMEOUT = 1000;

const RESULT_TEXTS = {
  white: "Congratulations, white, you won!",
  black: "Congratulations, black, you won!",
  draw: "It's draw. We have no winner",
};

module.exports = {
  BLACK_COLOR,
  FLIP_ITERATIONS,
  FLIP_ITERATIONS_INTERVAL,
  CANVAS_SAGE_PIXELS_COUNT,
  CELLS_IN_ROW,
  BOARD_COLOR,
  styles,
  NO_CHIP_MATRIX_VALUE,
  WHITE_CHIP_MATRIX_VALUE,
  BLACK_CHIP_MATRIX_VALUE,
  AVAILABLE_STEP_MATRIX_VALUE,
  COMPUTER_THINK_TIMEOUT,
  COMPUTER_MODE,
  USER_MODE,
  RESULT_TEXTS,
};
