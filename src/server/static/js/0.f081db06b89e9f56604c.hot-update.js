webpackHotUpdate(0,{

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  var script = props.script ? props.script : 'Loading...';
  return _react2.default.createElement(
    'div',
    { id: 'script', className: 'card' },
    _react2.default.createElement(
      'div',
      { className: 'card-title' },
      'Script:'
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        null,
        'Paste this script in your html code and you are already tracking your customers!'
      )
    ),
    _react2.default.createElement(
      'div',
      { id: 'client-script' },
      script
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        { className: 'btn' },
        'Copy Code'
      )
    )
  );
};

/***/ })

})
//# sourceMappingURL=0.f081db06b89e9f56604c.hot-update.js.map