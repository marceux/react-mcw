'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemporaryDrawer = exports.PermanentDrawer = undefined;

var _PermanentDrawer = require('./Drawer/PermanentDrawer');

var _PermanentDrawer2 = _interopRequireDefault(_PermanentDrawer);

var _TemporaryDrawer = require('./Drawer/TemporaryDrawer');

var _TemporaryDrawer2 = _interopRequireDefault(_TemporaryDrawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Components
exports.PermanentDrawer = _PermanentDrawer2.default;
exports.TemporaryDrawer = _TemporaryDrawer2.default;