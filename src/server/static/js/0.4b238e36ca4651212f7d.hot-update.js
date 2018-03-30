webpackHotUpdate(0,{

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(20);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(117);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(203);

var _store = __webpack_require__(229);

var _store2 = _interopRequireDefault(_store);

var _Screen = __webpack_require__(244);

var _Screen2 = _interopRequireDefault(_Screen);

var _Toolbar = __webpack_require__(245);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UI = function UI() {
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: _store2.default },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_Screen2.default, null),
      _react2.default.createElement(_Toolbar2.default, null)
    )
  );
};

_reactDom2.default.render(_react2.default.createElement(UI, null), document.getElementById('app'));

/***/ })

})
//# sourceMappingURL=0.4b238e36ca4651212f7d.hot-update.js.map