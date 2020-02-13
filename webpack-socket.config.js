const WEBPACK_DEFAULT = require('./webpack-base-config');

WEBPACK_DEFAULT.entry = './src/client/app/socket.ts';

module.exports = WEBPACK_DEFAULT;