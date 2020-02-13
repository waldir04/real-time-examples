const WEBPACK_DEFAULT = require('./webpack-base-config');

WEBPACK_DEFAULT.entry = './src/client/app/sse.ts';

module.exports = WEBPACK_DEFAULT;