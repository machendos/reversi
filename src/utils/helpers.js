const {WHITE_COLOR, WHITE_NUMBER, BLACK_NUMBER } = require('./constants');

const withOnChangeListener = (name, value, listener) => {
  const internalFieldName = `${name}Internal`;

  return {
    [internalFieldName]: value,
    set [name](newValue) {
      this[internalFieldName] = newValue;
      listener(newValue);
    },
    get [name]() {
      return this[internalFieldName];
    }
  }
};

const getColorsNumbersByColorName = (playerColor) => playerColor === WHITE_COLOR
? [WHITE_NUMBER, BLACK_NUMBER]
: [BLACK_NUMBER, WHITE_NUMBER];

module.exports = { withOnChangeListener, getColorsNumbersByColorName };
