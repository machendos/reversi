'use strict';

class Canva {

  constructor(container) {
    this.container = container;
    this.board = container.getContext('2d');
  }

  render() {
    const minSize = Math.min(window.innerWidth, window.innerHeight);
    this.size = minSize * 0.8
    this.board.canvas.width = this.size;
    this.board.canvas.height = this.size;
  }

  init() {
    this.board.fillStyle = "black";
    const rectSize = this.size / 8;
    for (let rectRow = 0; rectRow < 8; rectRow++) {
      for (let rectColumt = 0; rectColumt < 8; rectColumt++) {
        this.board.strokeRect(rectRow * rectSize, rectColumt * rectSize, rectSize, rectSize)
      }
    }
  }

}

const canva = new Canva(document.getElementsByTagName('canvas')[0]);

canva.render()
canva.init();
window.addEventListener('resize', event => {
  canva.render();
  canva.init();
}, false);

const myselfModeButton = document.getElementById('myself-mode');
const computerModeButton = document.getElementById('computer-mode')

myselfModeButton.onclick = () => {
  myselfModeButton.classList.add('selected')
  computerModeButton.classList.remove('selected');
}

computerModeButton.onclick = () => {
  computerModeButton.classList.add('selected')
  myselfModeButton.classList.remove('selected');
}
