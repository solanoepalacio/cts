webpackHotUpdate(0,{

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(28);

var _redux = __webpack_require__(29);

var _auth = __webpack_require__(134);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Logout(props) {
  console.log('props', props);
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      { onClick: function onClick() {
          return props.logoutRequest();
        } },
      'logout'
    )
  );
}

var mapStateToProps = function mapStateToProps() {
  return {};
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ logoutRequest: _auth.logoutRequest }, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Logout);

/***/ })

})
//# sourceMappingURL=0.e8d6515959264cb4eb68.hot-update.js.map