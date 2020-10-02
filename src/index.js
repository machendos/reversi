'use strict';

const ReversiController = require(__dirname + '/controller.js');
const ReversiModel = require(__dirname + '/model.js');

const controller = new ReversiController(
  document.getElementsByTagName('canvas')[0]
);

controller.render();
controller.init();

window.addEventListener(
  'resize',
  () => {
    controller.render();
    controller.init();
  },
  false
);

const model = new ReversiModel(controller);
model.init();
