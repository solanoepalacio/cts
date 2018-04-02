webpackHotUpdate(0,{

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxLogger = __webpack_require__(289);

var _redux = __webpack_require__(20);

var _reduxThunk = __webpack_require__(290);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = __webpack_require__(291);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loggerMiddleware = (0, _reduxLogger.createLogger)();

/**
 * This is for redux-devtools-extension in Chrome console.
 */
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

var store = (0, _redux.createStore)((0, _reducers2.default)({
  auth: { valid: false, failed: false, userId: null, fetching: false },
  user: { _id: null, domainId: null },
  config: { fetching: false, script: null }
}), window.__state__, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware)));

exports.default = store;

/***/ })

})
//# sourceMappingURL=0.8da1d78a48df1470ec53.hot-update.js.map