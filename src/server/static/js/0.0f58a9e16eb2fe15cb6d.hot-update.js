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

function getUserReducer(initialState) {
  return function userReducer() {
    var userState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
      case _auth2.default.actions.authSuccess:
        console.log();
        return Object.assign({}, userState, payload.user);

      case actions.logoutSuccess:
        return {};

      default:
        return userState;
    }
  };
}

/***/ })

})
//# sourceMappingURL=0.0f58a9e16eb2fe15cb6d.hot-update.js.map