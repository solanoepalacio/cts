webpackHotUpdate(0,{

/***/ 298:
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

var _redux = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    return _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));
  }

  _createClass(Toolbar, [{
    key: 'render',
    value: function render() {
      var auth = this.props.auth;

      console.log('auth', auth);
      var activeClassName = auth.valid ? 'active' : '';
      return _react2.default.createElement(
        'div',
        { id: 'toolbar', className: activeClassName },
        _react2.default.createElement(
          'div',
          { id: 'header' },
          'CTS'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/' },
              'Home'
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/config' },
              'config'
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/dashboard' },
              'dashboard'
            )
          )
        ),
        _react2.default.createElement(Logout, null)
      );
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return { auth: state.auth };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Toolbar);

/***/ })

})
//# sourceMappingURL=0.127dadf7a9e14ca47e6a.hot-update.js.map