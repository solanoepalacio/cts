webpackHotUpdate(0,{

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(25);

var _redux = __webpack_require__(20);

var _config = __webpack_require__(138);

var _config2 = _interopRequireDefault(_config);

var _Script = __webpack_require__(298);

var _Script2 = _interopRequireDefault(_Script);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var actionCreators = _config2.default.actionCreators;

var Config = function (_React$Component) {
  _inherits(Config, _React$Component);

  function Config() {
    _classCallCheck(this, Config);

    return _possibleConstructorReturn(this, (Config.__proto__ || Object.getPrototypeOf(Config)).apply(this, arguments));
  }

  _createClass(Config, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.clientScriptRequest();
    }
  }, {
    key: 'render',
    value: function render() {
      var config = this.props.config;

      var script = config && config.script || null;
      return _react2.default.createElement(
        'div',
        { id: 'config-component' },
        _react2.default.createElement(
          'div',
          { className: 'card section-header' },
          'Configuration:'
        ),
        _react2.default.createElement(
          'div',
          { className: 'card' },
          'Config controllers will go here'
        ),
        _react2.default.createElement(
          'div',
          { className: 'card' },
          _react2.default.createElement(
            'span',
            { className: 'btn' },
            'save config'
          ),
          _react2.default.createElement(
            'span',
            { className: 'btn' },
            'update script'
          )
        ),
        _react2.default.createElement(_Script2.default, { script: script })
      );
    }
  }]);

  return Config;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return { config: state.config };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(actionCreators, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Config);

/***/ })

})
//# sourceMappingURL=0.cac6a5b01f6bdc3097cf.hot-update.js.map