'use strict';

const FLIP_ITERATIONS = 20;
const FLIP_ITERATIONS_INTERVAL = 25;
const CANVAS_SAGE_PIXELS_COUNT = 1;

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
    this.board.fillStyle = 'black';
    for (let rectRow = 0; rectRow < 8; rectRow++) {
      for (let rectColumt = 0; rectColumt < 8; rectColumt++) {
        this.board.strokeRect(
          rectRow * this.rectSize,
          rectColumt * this.rectSize,
          this.rectSize,
          this.rectSizeSA
        );
      }
    }
  }

  put(row, column, color) {
    this.board.fillStyle = color;
    this.board.beginPath();
    this.board.arc(
      this.rectSize * (column - 0.5),
      this.rectSize * (row - 0.5),
      this.rectSize / 2 - 2,
      0,
      Math.PI * 2,
      true
    );
    this.board.fill();
  }

  changeCollor(row, column, colorPrev, colorCurr) {
    let iterationsLeft = FLIP_ITERATIONS;

    const interval = setInterval(() => {
      let coef = iterationsLeft / FLIP_ITERATIONS;
      this.board.fillStyle = 'darkgreen';
      this.board.beginPath();
      this.board.arc(
        this.rectSize * (column - 0.5),
        this.rectSize * (row - 0.5),
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
        this.rectSize * (column - 0.5),
        this.rectSize * (row - 0.5),
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
            this.rectSize * (column - 0.5),
            this.rectSize * (row - 0.5),
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
    this.board.fill();
  }
}

const canva = new Canva(document.getElementsByTagName('canvas')[0]);

canva.render();
canva.init();
window.addEventListener(
  'resize',
  () => {
    canva.render();
    canva.init();
  },
  false
);

const myselfModeButton = document.getElementById('myself-mode');
const computerModeButton = document.getElementById('computer-mode');

myselfModeButton.onclick = () => {
  myselfModeButton.classList.add('selected');
  computerModeButton.classList.remove('selected');
};

computerModeButton.onclick = () => {
  computerModeButton.classList.add('selected');
  myselfModeButton.classList.remove('selected');
};

canva.put(2, 2, 'black');

canva.changeCollor(2, 2, 'black', 'white');
canva.changeCollor(3, 3, 'black', 'white');
setTimeout(() => {
  canva.changeCollor(5, 5, 'black', 'white');
}, 500);
