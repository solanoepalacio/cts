webpackHotUpdate(0,{

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducerFactory;

var _path = __webpack_require__(242);

var _path2 = _interopRequireDefault(_path);

var _redux = __webpack_require__(52);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

function reducerFactory(initialState) {
  var reducers = {};
  var expectedReducersList = Object.keys(initialState);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = expectedReducersList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var reducerName = _step.value;

      var reducerPath = _path2.default.resolve(__dirname, './_' + reducerName);
      var getReducer = void 0;

      try {
        console.log('reducerPath', reducerPath);
        var _getReducer = __webpack_require__(247)("./_" + reducerName);
        console.log('getReducer', gerReducer);
      } catch (e) {
        console.log('WARNING => reducer not found. ERROR\n:', e);
      }

      reducers[reducerName] = getReducer(initialState[reducerName]);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return (0, _redux.combineReducers)(reducers);
}
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ })

})
//# sourceMappingURL=0.14b9e3d5a9e8a0988520.hot-update.js.map