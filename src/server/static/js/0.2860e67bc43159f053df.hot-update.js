webpackHotUpdate(0,{

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(28);

var _reactRouterDom = __webpack_require__(70);

var _Router = __webpack_require__(290);

var _Login = __webpack_require__(297);

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Screen = function (_React$Component) {
  _inherits(Screen, _React$Component);

  function Screen(props) {
    _classCallCheck(this, Screen);

    return _possibleConstructorReturn(this, (Screen.__proto__ || Object.getPrototypeOf(Screen)).call(this, props));
  }

  _createClass(Screen, [{
    key: 'render',
    value: function render() {
      var loginScreen = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { id: 'more-info', className: 'card' },
          'more info'
        ),
        _react2.default.createElement(_Login2.default, null)
      );

      var app = _react2.default.createElement(
        'div',
        { className: 'card' },
        _react2.default.createElement(_Router.Route, { path: '/', exact: true, render: function render() {
            return _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/hola' },
              'chua'
            );
          } }),
        _react2.default.createElement(_Router.Route, { path: '/hola', render: function render() {
            return _react2.default.createElement(
              'p',
              null,
              'hola'
            );
          } })
      );

      var screen = this.props.auth.valid ? app : loginScreen;

      return _react2.default.createElement(
        'div',
        { id: 'screen' },
        screen
      );
    }
  }]);

  return Screen;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return { auth: state.auth };
};

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps)(Screen));

/***/ })

})
//# sourceMappingURL=0.2860e67bc43159f053df.hot-update.js.map