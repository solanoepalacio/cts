webpackHotUpdate(0,{

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAsyncAction;

var _crossFetch = __webpack_require__(290);

var _crossFetch2 = _interopRequireDefault(_crossFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createAsyncAction(name, endpoint) {
  var _actions, _storeActions;

  var actions = (_actions = {}, _defineProperty(_actions, name + 'Attempt', name + '-attempt'), _defineProperty(_actions, name + 'Success', name + '-success'), _defineProperty(_actions, name + 'Failure', name + '-failure'), _actions);

  var storeActions = (_storeActions = {}, _defineProperty(_storeActions, name + 'Attempt', pseudoDispatch(name, 'attempt', actions)), _defineProperty(_storeActions, name + 'Success', pseudoDispatch(name, 'success', actions)), _defineProperty(_storeActions, name + 'Failure', pseudoDispatch(name, 'failure', actions)), _storeActions);

  var asyncAction = function asyncAction(requestBody) {
    return function (dispatch) {
      dispatch(storeActions[name + 'Attempt']);

      var options = {
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
      };

      if (requestBody) {
        options.method = 'POST';

        var headers = {};
        headers['Content-Type'] = typeof requestBody === 'string' ? 'text/plain' : 'application/json';

        Object.assign(options, { headers: headers });

        options.body = JSON.stringify(requestBody);

        console.log('options', options);
      }

      return (0, _crossFetch2.default)(endpoint, options).then(function (response) {
        if (response.status >= 500) {
          console.error('REQUEST - SERVER ERROR:', response.error || response);
          return promise.resolve(false); // swallow errors
        } else if (response.status >= 400) {
          return new Promise(function (resolve, reject) {
            return response.text().then(function (s) {
              return reject(s);
            });
          });
        }

        var contentType = response.headers.get('Content-Type');
        console.log('contentType', contentType);
        return contentType.toLowerCase().indexOf('application/json') !== -1 ? response.json() : response.text();
      }).then(function (payload) {
        if (!payload) return; // error swallowed
        console.log('dispatching payload', payload);
        dispatch(storeActions[name + 'Success'](payload));
      }).catch(function (denialText) {
        console.log('denialText', denialText);
        dispatch(storeActions[name + 'Failure']({ message: denialText }));
      });
    };
  };

  storeActions[name + 'Request'] = asyncAction;
  return { actions: actions, actionCreators: storeActions };
}

function pseudoDispatch(name, cicleState, actions) {
  cicleState = cicleState.charAt(0).toUpperCase().concat(cicleState.slice(1));
  return function (payload) {
    return {
      type: actions[name + cicleState],
      payload: payload
    };
  };
}

/***/ })

})
//# sourceMappingURL=0.26b7a25bb4e291d3eae3.hot-update.js.map