/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Controllers/controller.js":
/*!***************************************!*\
  !*** ./src/Controllers/controller.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Canva = __webpack_require__(/*! ../views/canva.js */ \"./src/views/canva.js\");\n\nconst ReversiModel = __webpack_require__(/*! ../models/reversi.js */ \"./src/models/reversi.js\");\n\nconst {\n  BLACK_COLOR,\n  WHITE_COLOR,\n  AVAILABLE_NUMBER,\n  EMPTY_NUMBER,\n  PASS_TURN\n} = __webpack_require__(/*! ../utils/constants.js */ \"./src/utils/constants.js\");\n\nconst {\n  withOnChangeListener,\n  getColorsNumbersByColorName\n} = __webpack_require__(/*! ../utils/helpers */ \"./src/utils/helpers.js\");\n\nconst myselfModeButton = document.getElementById('myself-mode');\nconst computerModeButton = document.getElementById('computer-mode');\n\nclass ReversiController extends Canva {\n  constructor(canvasContainer) {\n    super(canvasContainer);\n\n    this.setAvailableSteps = () => {\n      this.cleanAvailableSteps();\n      const availableSteps = this.reversiModel.calculateAvailableSteps(this.matrix, this.playerColor.color);\n\n      if (availableSteps === PASS_TURN) {\n        if (!this.isFirstPlayerPassedTurn) {\n          this.isFirstPlayerPassedTurn = true;\n          this.togglePlayerColor();\n        } else {\n          this.handleGameOver();\n          return;\n        }\n      }\n\n      availableSteps.forEach(([row, column]) => this.matrix[row][column] = AVAILABLE_NUMBER);\n      this.renderBoard();\n      if (!this.IS_USER_MODE && this.playerColor.color === WHITE_COLOR) this.simulateAIMove(availableSteps);\n    };\n\n    this.generateStartBoard = () => {\n      // 0 corresponds for EMPTY cell, 1 - for WHITE and 2 - for BLACK, 3 - for AVAILABLE step\n      this.matrix = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 2, 0, 0, 0], [0, 0, 0, 2, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];\n      this.whiteCounter = 2;\n      this.blackCounter = 2;\n    };\n\n    this.cleanAvailableSteps = () => {\n      for (let row = 0; row < this.matrix.length; row++) {\n        for (let column = 0; column < this.matrix[row].length; column++) {\n          if (this.matrix[row][column] === AVAILABLE_NUMBER) {\n            this.matrix[row][column] = EMPTY_NUMBER;\n          }\n        }\n      }\n\n      this.renderBoard();\n    };\n\n    this.handleChipPlacement = (row, column, color) => {\n      const [colorNumber, oppositeNumber] = getColorsNumbersByColorName(color);\n      const oldColor = this.getOppositeColor(color);\n      this.matrix[row][column] = colorNumber;\n      this.put(row, column, color);\n      const chipsToBeRecolored = this.reversiModel.getChipsToBeRecolored(this.matrix, row, column, color);\n      chipsToBeRecolored.forEach(([row, column]) => {\n        this.matrix[row][column] = colorNumber;\n        this.changeColor(row, column, oldColor, color);\n      });\n      setTimeout(() => {\n        this.countChips(chipsToBeRecolored.length, color);\n        this.togglePlayerColor();\n      }, 500);\n    };\n\n    this.countChips = (recoloredChips, color) => {\n      const oppositeColor = this.getOppositeColor(color);\n      const increasedCounter = `${color}Counter`;\n      const decreasedCounter = `${oppositeColor}Counter`; // number of changed chips and 1 placed manually\n\n      const numberToIncrease = recoloredChips + 1;\n      this[increasedCounter] += numberToIncrease;\n      this[decreasedCounter] -= recoloredChips;\n\n      if (this.blackCounter + this.whiteCounter === 64) {\n        this.handleGameOver();\n        return;\n      }\n\n      document.getElementById(`${color}-counter`).innerHTML = `${this[increasedCounter]}`;\n      document.getElementById(`${oppositeColor}-counter`).innerHTML = `${this[decreasedCounter]}`;\n    };\n\n    this.handleGameOver = () => {\n      if (this.blackCounter === this.whiteCounter) {\n        document.getElementById('counter').innerHTML = \"Draw\";\n      } else {\n        const winner = this.blackCounter > this.whiteCounter ? BLACK_COLOR : WHITE_COLOR;\n        document.getElementById('counter').innerHTML = `${winner} wins!`;\n      }\n    };\n\n    this.renderBoard = () => {\n      for (let row = 0; row < this.matrix.length; row++) {\n        for (let column = 0; column < this.matrix[row].length; column++) {\n          switch (this.matrix[row][column]) {\n            case 1:\n              this.put(row, column, WHITE_COLOR);\n              break;\n\n            case 2:\n              this.put(row, column, BLACK_COLOR);\n              break;\n\n            case 3:\n              this.put(row, column);\n              break;\n\n            default:\n              this.remove(row, column);\n              break;\n          }\n        }\n      }\n    };\n\n    this.simulateAIMove = possibleSteps => {\n      setTimeout(() => {\n        const randomPCMoveIndex = Math.floor(Math.random() * (possibleSteps.length - 1));\n        const randomPCMove = possibleSteps[randomPCMoveIndex];\n        this.handlePlayerClick({\n          row: randomPCMove[0],\n          column: randomPCMove[1]\n        });\n      }, 1000);\n    };\n\n    this.getOppositeColor = color => color === WHITE_COLOR ? BLACK_COLOR : WHITE_COLOR;\n\n    this.togglePlayerColor = () => this.playerColor.color = this.getOppositeColor(this.playerColor.color);\n\n    this.handlePlayerClick = ({\n      row,\n      column\n    }) => {\n      if (!this.IS_USER_MODE && this.playerColor.color === WHITE_COLOR || this.isClickBlocked || this.matrix[row][column] !== AVAILABLE_NUMBER) {\n        console.log('you have no power here');\n      } else {\n        // block clicks so user don't spam on available fields until they refresh\n        this.isClickBlocked = true;\n        this.handleChipPlacement(row, column, this.playerColor.color);\n      }\n    };\n\n    this.handleModeChange = mode => {\n      if (mode === 'user_mode') {\n        this.IS_USER_MODE = true;\n      } else {\n        this.IS_USER_MODE = false;\n      }\n\n      this.generateStartBoard();\n      this.setAvailableSteps();\n    };\n\n    this.onPlayerChange = playerColor => {\n      this.setAvailableSteps();\n      this.isClickBlocked = false;\n    };\n\n    this.IS_USER_MODE = true;\n    this.reversiModel = null;\n    this.matrix = [];\n    this.playerColor = withOnChangeListener('color', BLACK_COLOR, this.onPlayerChange);\n    this.whiteCounter = 2;\n    this.blackCounter = 2;\n    this.isFirstPlayerPassedTurn = false;\n    this.isClickBlocked = false;\n    this.generateStartBoard();\n  }\n\n  start() {\n    this.init();\n    this.renderBoard();\n    this.onModeChange(this.handleModeChange);\n    this.onBoardClick(this.handlePlayerClick);\n    this.reversiModel = new ReversiModel(this);\n    this.setAvailableSteps();\n  }\n\n  onModeChange(listener) {\n    myselfModeButton.onclick = () => {\n      myselfModeButton.classList.add('selected');\n      computerModeButton.classList.remove('selected');\n      listener('user_mode');\n    };\n\n    computerModeButton.onclick = () => {\n      computerModeButton.classList.add('selected');\n      myselfModeButton.classList.remove('selected');\n      listener('computer_mode');\n    };\n  }\n\n}\n\nmodule.exports = ReversiController;\n\n//# sourceURL=webpack:///./src/Controllers/controller.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst ReversiController = __webpack_require__(/*! ./Controllers/controller.js */ \"./src/Controllers/controller.js\");\n\nconst controller = new ReversiController(document.getElementsByTagName('canvas')[0]);\ncontroller.render();\ncontroller.start();\nwindow.addEventListener('resize', () => {\n  controller.render();\n  controller.start();\n}, false);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/models/reversi.js":
/*!*******************************!*\
  !*** ./src/models/reversi.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {\n  EMPTY_NUMBER,\n  AVAILABLE_NUMBER,\n  DESK_SIZE,\n  PASS_TURN\n} = __webpack_require__(/*! ../utils/constants */ \"./src/utils/constants.js\");\n\nconst {\n  getColorsNumbersByColorName\n} = __webpack_require__(/*! ../utils/helpers */ \"./src/utils/helpers.js\");\n\nclass ReversiModel {\n  constructor(controller) {\n    this.calculateAvailableSteps = (board, playerColor) => {\n      const [checkNumber, oppositeNumber] = getColorsNumbersByColorName(playerColor);\n      const setOfAvailableSteps = new Set();\n\n      for (let row = 0; row < board.length; row++) {\n        for (let column = 0; column < board[row].length; column++) {\n          if (board[row][column] === checkNumber) {\n            this.getAvailableSteps(board, setOfAvailableSteps, row, column, checkNumber, oppositeNumber);\n          }\n        }\n      }\n\n      const arrayOfAvailableSteps = Array.from(setOfAvailableSteps).map(coords => JSON.parse(coords));\n\n      if (arrayOfAvailableSteps.length === 0) {\n        return PASS_TURN;\n      } else {\n        return arrayOfAvailableSteps;\n      }\n    };\n\n    this.getAvailableSteps = (board, setOfAvailableSteps, rowIndex, columnIndex, checkNumber, oppositeNumber) => {\n      // Check Right\n      if (columnIndex < 6 && board[rowIndex][columnIndex + 1] === oppositeNumber) {\n        for (let currColumn = columnIndex + 2; currColumn < DESK_SIZE; currColumn++) {\n          if (board[rowIndex][currColumn] === checkNumber) {\n            break;\n          }\n\n          if (board[rowIndex][currColumn] === EMPTY_NUMBER || board[rowIndex][currColumn] === AVAILABLE_NUMBER) {\n            setOfAvailableSteps.add(JSON.stringify([rowIndex, currColumn]));\n            break;\n          }\n        }\n      } // Check Left\n\n\n      if (columnIndex > 1 && board[rowIndex][columnIndex - 1] === oppositeNumber) {\n        for (let currColumn = columnIndex - 2; currColumn >= 0; currColumn--) {\n          if (board[rowIndex][currColumn] === checkNumber) {\n            break;\n          }\n\n          if (board[rowIndex][currColumn] === EMPTY_NUMBER || board[rowIndex][currColumn] === AVAILABLE_NUMBER) {\n            setOfAvailableSteps.add(JSON.stringify([rowIndex, currColumn]));\n            break;\n          }\n        }\n      } // Check Up\n\n\n      if (rowIndex > 1 && board[rowIndex - 1][columnIndex] === oppositeNumber) {\n        for (let currRow = rowIndex - 2; currRow >= 0; currRow--) {\n          if (board[currRow][columnIndex] === checkNumber) {\n            break;\n          }\n\n          if (board[currRow][columnIndex] === EMPTY_NUMBER || board[currRow][columnIndex] === AVAILABLE_NUMBER) {\n            setOfAvailableSteps.add(JSON.stringify([currRow, columnIndex]));\n            break;\n          }\n        }\n      } // Check Down\n\n\n      if (rowIndex < 6 && board[rowIndex + 1][columnIndex] === oppositeNumber) {\n        for (let currRow = rowIndex + 2; currRow < DESK_SIZE; currRow++) {\n          if (board[currRow][columnIndex] === checkNumber) {\n            break;\n          }\n\n          if (board[currRow][columnIndex] === EMPTY_NUMBER || board[currRow][columnIndex] === AVAILABLE_NUMBER) {\n            setOfAvailableSteps.add(JSON.stringify([currRow, columnIndex]));\n            break;\n          }\n        }\n      } // Check Right Down\n\n\n      if (rowIndex < 6 && columnIndex < 6 && board[rowIndex + 1][columnIndex + 1] === oppositeNumber) {\n        let currRow = rowIndex + 2;\n        let currColumn = columnIndex + 2;\n\n        while (currRow < DESK_SIZE && currColumn < DESK_SIZE) {\n          if (board[currRow][currColumn] === checkNumber) {\n            break;\n          }\n\n          if (board[currRow][currColumn] === EMPTY_NUMBER || board[currRow][currColumn] === AVAILABLE_NUMBER) {\n            setOfAvailableSteps.add(JSON.stringify([currRow, currColumn]));\n            break;\n          }\n\n          currRow++;\n          currColumn++;\n        }\n      } // Check Right Up\n\n\n      if (rowIndex > 1 && columnIndex < 6 && board[rowIndex - 1][columnIndex + 1] === oppositeNumber) {\n        let currRow = rowIndex - 2;\n        let currColumn = columnIndex + 2;\n\n        while (currRow >= 0 && currColumn < DESK_SIZE) {\n          if (board[currRow][currColumn] === checkNumber) {\n            break;\n          }\n\n          if (board[currRow][currColumn] === EMPTY_NUMBER || board[currRow][currColumn] === AVAILABLE_NUMBER) {\n            setOfAvailableSteps.add(JSON.stringify([currRow, currColumn]));\n            break;\n          }\n\n          currRow--;\n          currColumn++;\n        }\n      } // Check Left Up\n\n\n      if (rowIndex > 1 && columnIndex > 1 && board[rowIndex - 1][columnIndex - 1] === oppositeNumber) {\n        let currRow = rowIndex - 2;\n        let currColumn = columnIndex - 2;\n\n        while (currRow >= 0 && currColumn >= 0) {\n          if (board[currRow][currColumn] === checkNumber) {\n            break;\n          }\n\n          if (board[currRow][currColumn] === EMPTY_NUMBER || board[currRow][currColumn] === AVAILABLE_NUMBER) {\n            setOfAvailableSteps.add(JSON.stringify([currRow, currColumn]));\n            break;\n          }\n\n          currRow--;\n          currColumn--;\n        }\n      } // Check Left Down\n\n\n      if (rowIndex < 6 && columnIndex > 1 && board[rowIndex + 1][columnIndex - 1] === oppositeNumber) {\n        let currRow = rowIndex + 2;\n        let currColumn = columnIndex - 2;\n\n        while (currRow < DESK_SIZE && currColumn >= 0) {\n          if (board[currRow][currColumn] === checkNumber) {\n            break;\n          }\n\n          if (board[currRow][currColumn] === EMPTY_NUMBER || board[currRow][currColumn] === AVAILABLE_NUMBER) {\n            setOfAvailableSteps.add(JSON.stringify([currRow, currColumn]));\n            break;\n          }\n\n          currRow++;\n          currColumn--;\n        }\n      }\n    };\n\n    this.getChipsToBeRecolored = (board, rowIndex, columnIndex, playerColor) => {\n      const [checkNumber, oppositeNumber] = getColorsNumbersByColorName(playerColor);\n      const setOfChipsToBeRecolored = new Set(); // Check Right\n\n      if (columnIndex < 6 && board[rowIndex][columnIndex + 1] === oppositeNumber) {\n        const oppositeChipsCoordsArray = [[rowIndex, columnIndex + 1]];\n\n        for (let currColumn = columnIndex + 2; currColumn < DESK_SIZE; currColumn++) {\n          if (board[rowIndex][currColumn] === EMPTY_NUMBER || board[rowIndex][currColumn] === AVAILABLE_NUMBER) {\n            break;\n          }\n\n          if (board[rowIndex][currColumn] === checkNumber) {\n            oppositeChipsCoordsArray.forEach(coords => setOfChipsToBeRecolored.add(JSON.stringify(coords)));\n            break;\n          }\n\n          if (board[rowIndex][currColumn] === oppositeNumber) {\n            oppositeChipsCoordsArray.push([rowIndex, currColumn]);\n          }\n        }\n      } // Check Left\n\n\n      if (columnIndex > 1 && board[rowIndex][columnIndex - 1] === oppositeNumber) {\n        const oppositeChipsCoordsArray = [[rowIndex, columnIndex - 1]];\n\n        for (let currColumn = columnIndex - 2; currColumn >= 0; currColumn--) {\n          if (board[rowIndex][currColumn] === EMPTY_NUMBER || board[rowIndex][currColumn] === AVAILABLE_NUMBER) {\n            break;\n          }\n\n          if (board[rowIndex][currColumn] === checkNumber) {\n            oppositeChipsCoordsArray.forEach(coords => setOfChipsToBeRecolored.add(JSON.stringify(coords)));\n            break;\n          }\n\n          if (board[rowIndex][currColumn] === oppositeNumber) {\n            oppositeChipsCoordsArray.push([rowIndex, currColumn]);\n          }\n        }\n      } // Check Up\n\n\n      if (rowIndex > 1 && board[rowIndex - 1][columnIndex] === oppositeNumber) {\n        const oppositeChipsCoordsArray = [[rowIndex - 1, columnIndex]];\n\n        for (let currRow = rowIndex - 2; currRow >= 0; currRow--) {\n          if (board[currRow][columnIndex] === EMPTY_NUMBER || board[currRow][columnIndex] === AVAILABLE_NUMBER) {\n            break;\n          }\n\n          if (board[currRow][columnIndex] === checkNumber) {\n            oppositeChipsCoordsArray.forEach(coords => setOfChipsToBeRecolored.add(JSON.stringify(coords)));\n            break;\n          }\n\n          if (board[currRow][columnIndex] === oppositeNumber) {\n            oppositeChipsCoordsArray.push([currRow, columnIndex]);\n          }\n        }\n      } // Check Down\n\n\n      if (rowIndex < 6 && board[rowIndex + 1][columnIndex] === oppositeNumber) {\n        const oppositeChipsCoordsArray = [[rowIndex + 1, columnIndex]];\n\n        for (let currRow = rowIndex + 2; currRow < DESK_SIZE; currRow++) {\n          if (board[currRow][columnIndex] === EMPTY_NUMBER || board[currRow][columnIndex] === AVAILABLE_NUMBER) {\n            break;\n          }\n\n          if (board[currRow][columnIndex] === checkNumber) {\n            oppositeChipsCoordsArray.forEach(coords => setOfChipsToBeRecolored.add(JSON.stringify(coords)));\n            break;\n          }\n\n          if (board[currRow][columnIndex] === oppositeNumber) {\n            oppositeChipsCoordsArray.push([currRow, columnIndex]);\n          }\n        }\n      } // Check Right Down\n\n\n      if (rowIndex < 6 && columnIndex < 6 && board[rowIndex + 1][columnIndex + 1] === oppositeNumber) {\n        let currRow = rowIndex + 2;\n        let currColumn = columnIndex + 2;\n        const oppositeChipsCoordsArray = [[rowIndex + 1, columnIndex + 1]];\n\n        while (currRow < DESK_SIZE && currColumn < DESK_SIZE) {\n          if (board[currRow][currColumn] === EMPTY_NUMBER || board[currRow][currColumn] === AVAILABLE_NUMBER) {\n            break;\n          }\n\n          if (board[currRow][currColumn] === checkNumber) {\n            oppositeChipsCoordsArray.forEach(coords => setOfChipsToBeRecolored.add(JSON.stringify(coords)));\n            break;\n          }\n\n          if (board[currRow][currColumn] === oppositeNumber) {\n            oppositeChipsCoordsArray.push([currRow, currColumn]);\n          }\n\n          currRow++;\n          currColumn++;\n        }\n      } // Check Right Up\n\n\n      if (rowIndex > 1 && columnIndex < 6 && board[rowIndex - 1][columnIndex + 1] === oppositeNumber) {\n        let currRow = rowIndex - 2;\n        let currColumn = columnIndex + 2;\n        const oppositeChipsCoordsArray = [[rowIndex - 1, columnIndex + 1]];\n\n        while (currRow >= 0 && currColumn < DESK_SIZE) {\n          if (board[currRow][currColumn] === EMPTY_NUMBER || board[currRow][currColumn] === AVAILABLE_NUMBER) {\n            break;\n          }\n\n          if (board[currRow][currColumn] === checkNumber) {\n            oppositeChipsCoordsArray.forEach(coords => setOfChipsToBeRecolored.add(JSON.stringify(coords)));\n            break;\n          }\n\n          if (board[currRow][currColumn] === oppositeNumber) {\n            oppositeChipsCoordsArray.push([currRow, currColumn]);\n          }\n\n          currRow--;\n          currColumn++;\n        }\n      } // Check Left Up\n\n\n      if (rowIndex > 1 && columnIndex > 1 && board[rowIndex - 1][columnIndex - 1] === oppositeNumber) {\n        let currRow = rowIndex - 2;\n        let currColumn = columnIndex - 2;\n        const oppositeChipsCoordsArray = [[rowIndex - 1, columnIndex - 1]];\n\n        while (currRow >= 0 && currColumn >= 0) {\n          if (board[currRow][currColumn] === EMPTY_NUMBER || board[currRow][currColumn] === AVAILABLE_NUMBER) {\n            break;\n          }\n\n          if (board[currRow][currColumn] === checkNumber) {\n            oppositeChipsCoordsArray.forEach(coords => setOfChipsToBeRecolored.add(JSON.stringify(coords)));\n            break;\n          }\n\n          if (board[currRow][currColumn] === oppositeNumber) {\n            oppositeChipsCoordsArray.push([currRow, currColumn]);\n          }\n\n          currRow--;\n          currColumn--;\n        }\n      } // Check Left Down\n\n\n      if (rowIndex < 6 && columnIndex > 1 && board[rowIndex + 1][columnIndex - 1] === oppositeNumber) {\n        let currRow = rowIndex + 2;\n        let currColumn = columnIndex - 2;\n        const oppositeChipsCoordsArray = [[rowIndex + 1, columnIndex - 1]];\n\n        while (currRow < DESK_SIZE && currColumn >= 0) {\n          if (board[currRow][currColumn] === EMPTY_NUMBER || board[currRow][currColumn] === AVAILABLE_NUMBER) {\n            break;\n          }\n\n          if (board[currRow][currColumn] === checkNumber) {\n            oppositeChipsCoordsArray.forEach(coords => setOfChipsToBeRecolored.add(JSON.stringify(coords)));\n            break;\n          }\n\n          if (board[currRow][currColumn] === oppositeNumber) {\n            oppositeChipsCoordsArray.push([currRow, currColumn]);\n          }\n\n          currRow++;\n          currColumn--;\n        }\n      }\n\n      const arrayOfChipsToBeRecolored = Array.from(setOfChipsToBeRecolored).map(coords => JSON.parse(coords));\n      return arrayOfChipsToBeRecolored;\n    };\n\n    this.controller = controller;\n  }\n\n}\n\nmodule.exports = ReversiModel;\n\n//# sourceURL=webpack:///./src/models/reversi.js?");

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const EMPTY_NUMBER = 0;\nconst WHITE_NUMBER = 1;\nconst BLACK_NUMBER = 2;\nconst AVAILABLE_NUMBER = 3;\nconst WHITE_COLOR = 'white';\nconst BLACK_COLOR = 'black';\nconst DESK_SIZE = 8;\nconst FLIP_ITERATIONS = 20;\nconst FLIP_ITERATIONS_INTERVAL = 25;\nconst CANVAS_SAGE_PIXELS_COUNT = 1;\nconst PASS_TURN = 'PASS_TURN';\nmodule.exports = {\n  EMPTY_NUMBER,\n  WHITE_NUMBER,\n  BLACK_NUMBER,\n  AVAILABLE_NUMBER,\n  WHITE_COLOR,\n  BLACK_COLOR,\n  DESK_SIZE,\n  FLIP_ITERATIONS,\n  FLIP_ITERATIONS_INTERVAL,\n  CANVAS_SAGE_PIXELS_COUNT,\n  PASS_TURN\n};\n\n//# sourceURL=webpack:///./src/utils/constants.js?");

/***/ }),

/***/ "./src/utils/helpers.js":
/*!******************************!*\
  !*** ./src/utils/helpers.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  WHITE_COLOR,\n  WHITE_NUMBER,\n  BLACK_NUMBER\n} = __webpack_require__(/*! ./constants */ \"./src/utils/constants.js\");\n\nconst withOnChangeListener = (name, value, listener) => {\n  const internalFieldName = `${name}Internal`;\n  return {\n    [internalFieldName]: value,\n\n    set [name](newValue) {\n      this[internalFieldName] = newValue;\n      listener(newValue);\n    },\n\n    get [name]() {\n      return this[internalFieldName];\n    }\n\n  };\n};\n\nconst getColorsNumbersByColorName = playerColor => playerColor === WHITE_COLOR ? [WHITE_NUMBER, BLACK_NUMBER] : [BLACK_NUMBER, WHITE_NUMBER];\n\nmodule.exports = {\n  withOnChangeListener,\n  getColorsNumbersByColorName\n};\n\n//# sourceURL=webpack:///./src/utils/helpers.js?");

/***/ }),

/***/ "./src/views/canva.js":
/*!****************************!*\
  !*** ./src/views/canva.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {\n  BLACK_COLOR,\n  FLIP_ITERATIONS,\n  FLIP_ITERATIONS_INTERVAL,\n  CANVAS_SAGE_PIXELS_COUNT\n} = __webpack_require__(/*! ../utils/constants */ \"./src/utils/constants.js\");\n\nclass Canva {\n  constructor(container) {\n    this.container = container;\n    this.board = container.getContext('2d');\n  }\n\n  render() {\n    const minSize = Math.min(window.innerWidth, window.innerHeight);\n    this.size = minSize * 0.8;\n    this.rectSize = this.size / 8;\n    this.board.canvas.width = this.size;\n    this.board.canvas.height = this.size;\n  }\n\n  init() {\n    this.board.fillStyle = BLACK_COLOR;\n\n    for (let rectRow = 0; rectRow < 8; rectRow++) {\n      for (let rectColumt = 0; rectColumt < 8; rectColumt++) {\n        this.board.strokeRect(rectRow * this.rectSize, rectColumt * this.rectSize, this.rectSize, this.rectSize);\n      }\n    }\n  }\n\n  put(row, column, color) {\n    const shiftedRow = row + 1;\n    const shiftedColumn = column + 1;\n    this.board.fillStyle = color;\n    this.board.beginPath();\n    this.board.arc(this.rectSize * (shiftedColumn - 0.5), this.rectSize * (shiftedRow - 0.5), this.rectSize / 2 - 2, 0, Math.PI * 2, true);\n\n    if (color) {\n      this.board.fill();\n    } else {\n      this.board.stroke();\n    }\n\n    return this;\n  } // need to fix removing\n\n\n  remove(row, column) {\n    const shiftedRow = row + 1;\n    const shiftedColumn = column + 1;\n    this.board.fillStyle = 'darkgreen';\n    this.board.beginPath();\n    this.board.arc(this.rectSize * (shiftedColumn - 0.5), this.rectSize * (shiftedRow - 0.5), this.rectSize / 2 - 1.1, 0, Math.PI * 2, true);\n    this.board.fill();\n  }\n\n  changeColor(row, column, colorPrev, colorCurr) {\n    const shiftedRow = row + 1;\n    const shiftedColumn = column + 1;\n    let iterationsLeft = FLIP_ITERATIONS;\n    const interval = setInterval(() => {\n      let coef = iterationsLeft / FLIP_ITERATIONS;\n      this.board.fillStyle = 'darkgreen';\n      this.board.beginPath();\n      this.board.arc(this.rectSize * (shiftedColumn - 0.5), this.rectSize * (shiftedRow - 0.5), this.rectSize / 2 - CANVAS_SAGE_PIXELS_COUNT, 0, Math.PI * 2, true);\n      this.board.fill();\n      this.board.fillStyle = colorPrev;\n      coef = --iterationsLeft / FLIP_ITERATIONS;\n      this.board.beginPath();\n      this.board.ellipse(this.rectSize * (shiftedColumn - 0.5), this.rectSize * (shiftedRow - 0.5), this.rectSize / 2 * coef - CANVAS_SAGE_PIXELS_COUNT < 0 ? 0 : this.rectSize / 2 * coef - CANVAS_SAGE_PIXELS_COUNT, this.rectSize / 2 - CANVAS_SAGE_PIXELS_COUNT < 0 ? 0 : this.rectSize / 2 - CANVAS_SAGE_PIXELS_COUNT, 0, 0, Math.PI * 2, true);\n      this.board.fill();\n\n      if (iterationsLeft === 0) {\n        clearInterval(interval);\n        const intervalSecond = setInterval(() => {\n          let coef = ++iterationsLeft / FLIP_ITERATIONS;\n          this.board.fillStyle = colorCurr;\n          coef = ++iterationsLeft / FLIP_ITERATIONS;\n          this.board.beginPath();\n          this.board.ellipse(this.rectSize * (shiftedColumn - 0.5), this.rectSize * (shiftedRow - 0.5), this.rectSize / 2 * coef - CANVAS_SAGE_PIXELS_COUNT < 0 ? 0 : this.rectSize / 2 * coef - CANVAS_SAGE_PIXELS_COUNT, this.rectSize / 2 - CANVAS_SAGE_PIXELS_COUNT < 0 ? 0 : this.rectSize / 2 - CANVAS_SAGE_PIXELS_COUNT, 0, 0, Math.PI * 2, true);\n          this.board.fill();\n\n          if (iterationsLeft === FLIP_ITERATIONS) {\n            clearInterval(intervalSecond);\n          }\n        }, FLIP_ITERATIONS);\n      }\n    }, FLIP_ITERATIONS);\n    return this;\n  }\n\n  onBoardClick(listener) {\n    this.container.addEventListener('click', event => {\n      const x = event.pageX - (this.container.offsetLeft + this.container.clientLeft);\n      const y = event.pageY - (this.container.offsetTop + this.container.clientTop); // - 1 is needed to fit array indexes\n\n      const column = Math.ceil(x / this.rectSize) - 1;\n      const row = Math.ceil(y / this.rectSize) - 1;\n      listener({\n        row,\n        column\n      });\n    });\n    return this;\n  }\n\n}\n\nmodule.exports = Canva;\n\n//# sourceURL=webpack:///./src/views/canva.js?");

/***/ })

/******/ });