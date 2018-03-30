webpackHotUpdate(0,{

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducerFactory;

var _redux = __webpack_require__(52);

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

      var getReducer = void 0;
      try {
        getReducer = __webpack_require__(247)("./_" + reducerName).default;
        console.log('getReducer', getReducer);
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

/***/ })

})
//# sourceMappingURL=0.70ac5e27846a52bbba8f.hot-update.js.map