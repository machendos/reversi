'use strict';

const ReversiController = require('./Controllers/controller.js');

const controller = new ReversiController(
  document.getElementsByTagName('canvas')[0]
);

controller.render();
controller.start();

window.addEventListener(
  'resize',
  () => {
    controller.render();
    controller.start();
  },
  false
);
