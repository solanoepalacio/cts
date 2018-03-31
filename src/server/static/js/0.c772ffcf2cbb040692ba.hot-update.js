webpackHotUpdate(0,{

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUserReducer;

var _auth = __webpack_require__(72);

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = _auth2.default.actions;
function getUserReducer(initialState) {
  return function userReducer() {
    var authState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
      case actions.authSuccess:
        return Object.assign({}, authState, {
          valid: true,
          failed: false,
          fetching: false,
          userId: payload.userId,
          errorMessage: null
        });

      case actions.authFailure:
        return Object.assign({}, authState, {
          valid: false,
          failed: true,
          fetching: false,
          userId: undefined,
          errorMessage: payload.message
        });

      case actions.authAttempt:
        return Object.assign({}, authState, {
          valid: false,
          failed: false,
          fetching: true,
          userId: undefined,
          errorMessage: null
        });

      case actions.logoutAttempt:
        return Object.assign({}, authState, {
          fetching: true
        });

      case actions.logoutSuccess:
        return Object.assign({}, authState, {
          valid: false,
          fetching: false,
          failed: false,
          userId: undefined
        });

      case actions.logoutFailure:
        return Object.assign({}, authState);

      default:
        return authState;
    }
  };
}

/***/ })

})
//# sourceMappingURL=0.c772ffcf2cbb040692ba.hot-update.js.map