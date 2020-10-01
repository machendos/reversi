'use strict';

const Canva = require(__dirname + '/canva.js');

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

canva.changeColor(2, 2, 'black', 'white');
canva.changeColor(3, 3, 'black', 'white');
setTimeout(() => {
  canva.changeColor(5, 5, 'black', 'white');
}, 500);

canva.onBoardClick(({ row, column }) => {
  console.log(row, column);
});
