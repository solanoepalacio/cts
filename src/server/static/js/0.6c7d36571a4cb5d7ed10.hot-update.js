webpackHotUpdate(0,{

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxLogger = __webpack_require__(284);

var _redux = __webpack_require__(24);

var _reduxThunk = __webpack_require__(285);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = __webpack_require__(286);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loggerMiddleware = (0, _reduxLogger.createLogger)();

/**
 * This is for redux-devtools-extension in Chrome console.
 */
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

var store = (0, _redux.createStore)((0, _reducers2.default)({
  auth: { valid: false, failed: false, userId: null, fetching: false },
  user: { _id: null, scriptId: null }
}), window.__state__, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware)));

exports.default = store;

/***/ })

})
//# sourceMappingURL=0.6c7d36571a4cb5d7ed10.hot-update.js.map