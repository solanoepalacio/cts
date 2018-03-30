webpackHotUpdate(0,{

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authAttempt = authAttempt;
exports.authSuccess = authSuccess;
exports.authFailure = authFailure;
exports.authRequest = authRequest;

var _crossFetch = __webpack_require__(251);

var _crossFetch2 = _interopRequireDefault(_crossFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = {
  authAttempt: 'auth-attempt',
  authSuccess: 'auth-success',
  authFailure: 'auth-failure'
};

exports.default = actions;
function authAttempt() {
  return {
    type: actions.authAttempt
  };
}

function authSuccess(_ref) {
  var userId = _ref.userId;

  console.log('authSuccess', userId);
  return {
    type: actions.authSuccess,
    payload: { userId: userId }
  };
}

function authFailure(_ref2) {
  var message = _ref2.message;

  console.log('auth failure', message);
  return {
    type: actions.authFailure,
    payload: { message: message }
  };
}

function authRequest(authData) {
  return function (dispatch) {
    dispatch(authAttempt);
    var endpoint =  true ? 'register' : 'login';
    authData.register = undefined;
    console.log('endpoint', endpoint);
    return (0, _crossFetch2.default)({
      uri: endpoint,
      method: 'POST',
      header: {
        credentials: true,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authData)
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log('response', response);
      dispatch(authSuccess(response));
    }).catch(function (error) {
      console.log('WARNING => REQUEST ERROR:', error);
      dispatch(authFailure({ message: error.message }));
    });
  };
}

/***/ })

})
//# sourceMappingURL=0.99ee1afae89c5ac98d54.hot-update.js.map