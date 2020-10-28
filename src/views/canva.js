'use strict';

const {
  BLACK_COLOR,
  FLIP_ITERATIONS,
  FLIP_ITERATIONS_INTERVAL,
  CANVAS_SAGE_PIXELS_COUNT,
} = require('../utils/constants');

class Canva {
  constructor(container) {
    this.container = container;
    this.board = container.getContext('2d');
  }

  render() {
    const minSize = Math.min(window.innerWidth, window.innerHeight);
    this.size = minSize * 0.8;
    this.rectSize = this.size / 8;
    this.board.canvas.width = this.size;
    this.board.canvas.height = this.size;
  }

  init() {
    this.board.fillStyle = BLACK_COLOR;
    for (let rectRow = 0; rectRow < 8; rectRow++) {
      for (let rectColumt = 0; rectColumt < 8; rectColumt++) {
        this.board.strokeRect(
          rectRow * this.rectSize,
          rectColumt * this.rectSize,
          this.rectSize,
          this.rectSize
        );
      }
    }
  }

  put(row, column, color) {
    const shiftedRow = row + 1;
    const shiftedColumn = column + 1;

    this.board.fillStyle = color;
    this.board.beginPath();
    this.board.arc(
      this.rectSize * (shiftedColumn - 0.5),
      this.rectSize * (shiftedRow - 0.5),
      this.rectSize / 2 - 2,
      0,
      Math.PI * 2,
      true
    );

    if (color) {
      this.board.fill();
    } else {
      this.board.stroke();
    }

    return this;
  }

  // need to fix removing
  remove(row, column) {
    const shiftedRow = row + 1;
    const shiftedColumn = column + 1;

    this.board.fillStyle = 'darkgreen';
    this.board.beginPath();
    this.board.arc(
      this.rectSize * (shiftedColumn - 0.5),
      this.rectSize * (shiftedRow - 0.5),
      this.rectSize / 2 - 1.1,
      0,
      Math.PI * 2,
      true
    );

    this.board.fill();
  }

  changeColor(row, column, colorPrev, colorCurr) {
    const shiftedRow = row + 1;
    const shiftedColumn = column + 1;

    let iterationsLeft = FLIP_ITERATIONS;

    const interval = setInterval(() => {
      let coef = iterationsLeft / FLIP_ITERATIONS;
      this.board.fillStyle = 'darkgreen';
      this.board.beginPath();
      this.board.arc(
        this.rectSize * (shiftedColumn - 0.5),
        this.rectSize * (shiftedRow - 0.5),
        this.rectSize / 2 - CANVAS_SAGE_PIXELS_COUNT,
        0,
        Math.PI * 2,
        true
      );
      this.board.fill();
      this.board.fillStyle = colorPrev;
      coef = --iterationsLeft / FLIP_ITERATIONS;
      this.board.beginPath();
      this.board.ellipse(
        this.rectSize * (shiftedColumn - 0.5),
        this.rectSize * (shiftedRow - 0.5),
        (this.rectSize / 2) * coef - CANVAS_SAGE_PIXELS_COUNT < 0
          ? 0
          : (this.rectSize / 2) * coef - CANVAS_SAGE_PIXELS_COUNT,
        this.rectSize / 2 - CANVAS_SAGE_PIXELS_COUNT < 0
          ? 0
          : this.rectSize / 2 - CANVAS_SAGE_PIXELS_COUNT,
        0,
        0,
        Math.PI * 2,
        true
      );
      this.board.fill();
      if (iterationsLeft === 0) {
        clearInterval(interval);
        const intervalSecond = setInterval(() => {
          let coef = ++iterationsLeft / FLIP_ITERATIONS;
          this.board.fillStyle = colorCurr;
          coef = ++iterationsLeft / FLIP_ITERATIONS;
          this.board.beginPath();
          this.board.ellipse(
            this.rectSize * (shiftedColumn - 0.5),
            this.rectSize * (shiftedRow - 0.5),
            (this.rectSize / 2) * coef - CANVAS_SAGE_PIXELS_COUNT < 0
              ? 0
              : (this.rectSize / 2) * coef - CANVAS_SAGE_PIXELS_COUNT,
            this.rectSize / 2 - CANVAS_SAGE_PIXELS_COUNT < 0
              ? 0
              : this.rectSize / 2 - CANVAS_SAGE_PIXELS_COUNT,
            0,
            0,
            Math.PI * 2,
            true
          );
          this.board.fill();
          if (iterationsLeft === FLIP_ITERATIONS) {
            clearInterval(intervalSecond);
          }
        }, FLIP_ITERATIONS);
      }
    }, FLIP_ITERATIONS);
    return this;
  }

  onBoardClick(listener) {
    this.container.addEventListener('click', event => {
      const x =
        event.pageX - (this.container.offsetLeft + this.container.clientLeft);

      const y =
        event.pageY - (this.container.offsetTop + this.container.clientTop);

      const column = Math.ceil(x / this.rectSize) - 1;
      const row = Math.ceil(y / this.rectSize) - 1;

      listener({ row, column });
    });
    return this;
  }
}

module.exports = Canva;
