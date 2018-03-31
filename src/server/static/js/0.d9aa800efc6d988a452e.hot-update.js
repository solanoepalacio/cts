webpackHotUpdate(0,{

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAuthReducer;

var _auth = __webpack_require__(134);

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAuthReducer(initialState) {
  return function authReducer() {
    var authState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
      case _auth2.default.authSuccess:
        return Object.assign({}, authState, {
          valid: true,
          failed: false,
          fetching: false,
          userId: payload.userId
        });

      case _auth2.default.authFailure:
        return Object.assign({}, authState, {
          valid: false,
          failed: true,
          fetching: false,
          userId: undefined
        });

      case _auth2.default.authAttempt:
        return Object.assign({}, authState, {
          valid: false,
          failed: false,
          fetching: true,
          userId: undefined
        });

      case _auth2.default.logoutAttempt:
        return Object.assign({}, authState, {
          fetching: true
        });

      case _auth2.default.logoutSuccess:
        return Object.assign({}, authState, {
          fetching: false,
          failed: false,
          userId: undefined
        });

      case _auth2.default.logoutFailure:
        return Object.assign({}, authState);

      default:
        return authState;
    }
  };
}

/***/ })

})
//# sourceMappingURL=0.d9aa800efc6d988a452e.hot-update.js.map