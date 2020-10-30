'use strict';

const ReversiController = require(__dirname + '/controllers/controller.js');
const ReversiModel = require(__dirname + '/models/reversi.js');

const controller = new ReversiController(
  document.getElementsByTagName('canvas')[0]
);

controller.init();
controller.render();
const model = new ReversiModel(controller);

model.initModel();
