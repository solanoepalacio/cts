webpackHotUpdate(0,{

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAuthReducer;
function getAuthReducer(initialState) {
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

      default:
        return authState;
    }
  };
}

/***/ })

})
//# sourceMappingURL=0.49f96448891a634eda45.hot-update.js.map