webpackHotUpdate(0,{

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authAttempt = authAttempt;
exports.authSuccess = authSuccess;
exports.authFailure = authFailure;
exports.logoutAttempt = logoutAttempt;
exports.logoutSuccess = logoutSuccess;
exports.logoutFailure = logoutFailure;
exports.logoutRequest = logoutRequest;
exports.authRequest = authRequest;

var _crossFetch = __webpack_require__(288);

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

  return {
    type: actions.authSuccess,
    payload: { userId: userId }
  };
}

function authFailure(_ref2) {
  var message = _ref2.message;

  return {
    type: actions.authFailure,
    payload: { message: message }
  };
}

function logoutAttempt() {
  return {
    type: actions.logoutAttempt
  };
}

function logoutSuccess() {
  return {
    type: actions.logoutSuccess
  };
}

function logoutFailure() {
  return {
    type: actions.logoutFailure
  };
}

function logoutRequest() {
  return function (dispatch) {
    var endpoint = 'http://localhost:5000/auth/logout';
    return (0, _crossFetch2.default)(endpoint, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    });
  };
}

function authRequest(authData) {
  return function (dispatch) {
    dispatch(authAttempt);
    var slug = authData.register ? 'register' : 'login';
    var endpoint = 'http://localhost:5000/auth/' + slug;
    authData.register = undefined;
    return (0, _crossFetch2.default)(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        mode: 'cors'
      },
      body: JSON.stringify(authData)
    }).then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        dispatch(authFailure({ message: response.statusText }));
        return Promise.resolve(false);
      }
    }).then(function (response) {
      response && dispatch(authSuccess(response));
    }).catch(function (error) {
      console.log('WARNING => REQUEST ERROR:', error);
      dispatch(authFailure({ message: error.message }));
    });
  };
}

/***/ })

})
//# sourceMappingURL=0.aef13b4990a178a09a4d.hot-update.js.map