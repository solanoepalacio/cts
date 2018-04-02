webpackHotUpdate(0,{

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createAsyncActions2 = __webpack_require__(136);

var _createAsyncActions3 = _interopRequireDefault(_createAsyncActions2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createAsyncActions = (0, _createAsyncActions3.default)([{
  name: 'auth',
  endpoint: 'http://localhost:5000/auth/login'
}, {
  name: 'register',
  endpoint: 'http://localhost:5000/auth/register'
}, {
  name: 'logout',
  endpoint: 'http://localhost:5000/auth/logout'
}]),
    actions = _createAsyncActions.actions,
    actionCreators = _createAsyncActions.actionCreators;

exports.default = { actions: actions, actionCreators: actionCreators };

/***/ })

})
//# sourceMappingURL=0.8fe571cbd47cc6a52f2b.hot-update.js.map