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
        getReducer = __webpack_require__(247)("./_" + reducerName);
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

/***/ }),

/***/ 243:
false,

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAuthReducer;
function getAuthReducer(authState) {
  return function authReducer() {
    var authState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
      case 'auth-success':
        return Object.assign({}, authState, {
          valid: true,
          failed: false,
          userId: action.userId
        });

      case 'auth-failure':
        return Object.assign({}, authState, {
          valid: false,
          failed: true,
          userId: undefined
        });

      case 'auth-logout':
        return Object.assign({}, authState, {
          valid: false,
          failed: false,
          userId: undefined
        });
    }
  };
}

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./_auth": 246,
	"./_auth.js": 246
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 247;

/***/ })

})
//# sourceMappingURL=0.3b78758caa80a9c7981a.hot-update.js.map