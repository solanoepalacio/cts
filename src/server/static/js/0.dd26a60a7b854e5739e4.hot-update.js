webpackHotUpdate(0,{

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(212);

var _d2 = _interopRequireDefault(_d);

var _lodash = __webpack_require__(504);

var _ = _interopRequireWildcard(_lodash);

var _jquery = __webpack_require__(505);

var _jquery2 = _interopRequireDefault(_jquery);

__webpack_require__(506);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var width = window.innerWidth;
var height = window.innerHeight;

var scaling = _d2.default.scaleLinear().domain([0, 68 * 4]).range([0, width]);

var canvas = _d2.default.select('.chart-container').append('svg').attr('width', width).attr('height', height).append('g');
//.attr('transform', `translate(0,-${height/12})`)


var svgDefs = canvas.append('defs');

var backGradient = svgDefs.append('radialGradient').attr('id', 'back-gradient');

backGradient.append('stop').attr('offset', '0%').attr('stop-color', 'rgb(125,125,125)');

backGradient.append('stop').attr('offset', '100%').attr('stop-color', 'rgb(115,115,115)');

canvas.style('fill', 'url(#back-gradient)');

canvas.append('rect').attr('width', width).attr('height', height).style('fill', 'url(#back-gradient)');

var nubadsGradient = svgDefs.append('linearGradient').attr('id', 'nubads-gradient').attr('x1', '0%').attr('x2', '0%').attr('y1', '0%').attr('y2', '100%');

nubadsGradient.append('stop').attr('class', 'stop-bottom').attr('offset', '0');

nubadsGradient.append('stop').attr('class', 'stop-top').attr('offset', '1');

(0, _jquery2.default)('.chart-container > svg').addClass('chart-canvas');

var xAxis = canvas.append('line').transition().duration(500).attr('x1', 15).attr('x2', width - 12).attr('y1', height + 5).attr('y2', height + 5).attr('fill', 'none').attr('stroke', 'rgb(160,160,160)').attr('stroke-width', 2);

var linesDisposition = [0.15, 0.3, 0.45, 0.6, 0.75, 0.9];
var auxLines = canvas.selectAll('line').data(linesDisposition).enter().append('line').attr('x1', 15).attr('x2', width - 12).attr('y1', function (d, i) {
  return d * height;
}).attr('y2', function (d, i) {
  return d * height;
}).attr('stroke', 'rgb(190,190,190)').attr('stroke-width', 1);

var xAxisLabel = canvas.append('text').attr('transform', 'translate(' + width / 2 + ',' + (height + 18) + ')').style('text-anchor', 'middle').style('font-size', '14px').attr('fill', 'rgb(235,235,235)').transition().duration(500).text('Time');

var fake_data = [20, 35, 26, 44, 39, 54, 68];
var aux = [];
var barWidth = width / fake_data.length * 0.85;
var i = 0;
var cutPoint = fake_data.length;

var drawBars = setInterval(createBar, 300);

function createBar() {

  if (i >= cutPoint) {
    clearInterval(drawBars);
    return;
  }

  aux.push(fake_data[i]);
  canvas.selectAll('rect').data(aux).enter().append('rect').classed('filled', true).attr('fill', 'url(#nubads-gradient)').attr('height', 0).attr('width', barWidth).attr('x', function (d, i) {
    return barWidth / 3 + i * (barWidth * 1.1);
  }).attr('y', function (d, i) {
    return height;
  }).attr('stroke', '1px solid rgb(90,90,90)').transition().duration(1500) // to do : getting a error when trying to add .ease(). find out why
  .attr('height', function (d, i) {
    return d * 4;
  }).attr('y', function (d, i) {
    return height - d * 4;
  });
  i++;
}

/***/ })

})
//# sourceMappingURL=0.dd26a60a7b854e5739e4.hot-update.js.map