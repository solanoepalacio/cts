webpackHotUpdate(0,{

/***/ 296:
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

var _auth = __webpack_require__(45);

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var actionCreators = _auth2.default.actionCreators;

var LoginComponent = function (_React$Component) {
  _inherits(LoginComponent, _React$Component);

  function LoginComponent(props) {
    _classCallCheck(this, LoginComponent);

    var _this = _possibleConstructorReturn(this, (LoginComponent.__proto__ || Object.getPrototypeOf(LoginComponent)).call(this, props));

    _this.state = {
      username: '',
      password: '',
      register: false
    };

    _this.login = _this.login.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleToggleRegister = _this.handleToggleRegister.bind(_this);
    return _this;
  }

  _createClass(LoginComponent, [{
    key: 'handleToggleRegister',
    value: function handleToggleRegister(e) {
      var _this2 = this;

      var register = !this.state.register;
      this.setState({ register: register }, function () {
        register && _this2.refs.radioButton.setAttribute('checked', register);
        !register && _this2.refs.radioButton.removeAttribute('checked');
        console.log('register', register);
      });
      return false;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: 'login',
    value: function login() {
      console.log('this...register', this.state.register);
      this.props.authRequest({
        username: this.state.username,
        password: this.state.password,
        register: this.state.register
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var auth = this.props.auth;

      var buttonAction = this.state.register ? 'Register' : 'Login';
      var buttonText = auth && auth.fetching ? 'Loading...' : buttonAction;
      return _react2.default.createElement(
        'div',
        { id: 'login-component', className: 'card' },
        _react2.default.createElement(
          'h3',
          null,
          _react2.default.createElement(
            'label',
            null,
            'Let\'s get started:'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement(
            'span',
            null,
            'icon'
          ),
          _react2.default.createElement('input', {
            type: 'text',
            name: 'username',
            placeholder: 'jhon@doe.com',
            value: this.state.email,
            onChange: this.handleChange
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement(
            'span',
            null,
            'icon'
          ),
          _react2.default.createElement('input', {
            type: 'password',
            name: 'password',
            placeholder: '*********',
            onChange: this.handleChange,
            value: this.state.password
          })
        ),
        this.props.auth && this.props.auth.errorMessage && _react2.default.createElement(
          'div',
          { className: 'sign-in-error' },
          this.props.auth.errorMessage
        ),
        _react2.default.createElement(
          'div',
          { id: 'register', onClick: this.handleToggleRegister },
          _react2.default.createElement(
            'span',
            null,
            'Create an account, please'
          ),
          _react2.default.createElement('input', { type: 'checkbox', ref: 'radioButton' })
        ),
        _react2.default.createElement(
          'div',
          { id: 'controllers' },
          _react2.default.createElement(
            'span',
            { className: 'btn', onClick: this.login },
            buttonText
          )
        )
      );
    }
  }]);

  return LoginComponent;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return { auth: state.auth };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(actionCreators, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LoginComponent);

/***/ })

})
//# sourceMappingURL=0.f005f19606c9235a4018.hot-update.js.map