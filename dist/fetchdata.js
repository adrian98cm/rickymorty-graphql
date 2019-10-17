"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = void 0;

var _request = _interopRequireDefault(require("request"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var fetchData = function fetchData(callback, url, data) {
  if (!data) data = [];

  try {
    data = JSON.parse(_fs["default"].readFileSync("./data.json").toString());
    callback(data);
  } catch (e) {
    console.log('fechting data...');
    (0, _request["default"])({
      url: url,
      json: true
    }, function (error, response) {
      if (response.body) {
        data = [].concat(_toConsumableArray(data), _toConsumableArray(response.body.results));
      }

      if (response.body.info.next !== '') fetchData(callback, response.body.info.next, data);else {
        _fs["default"].writeFileSync("./data.json", JSON.stringify(data));

        callback(data);
      }
    });
  }
};

exports.fetchData = fetchData;