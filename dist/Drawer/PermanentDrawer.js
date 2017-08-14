'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('@material/drawer/dist/mdc.drawer.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PermanentDrawer = function (_PureComponent) {
  (0, _inherits3.default)(PermanentDrawer, _PureComponent);

  function PermanentDrawer(props) {
    (0, _classCallCheck3.default)(this, PermanentDrawer);

    // Bind Methods
    var _this = (0, _possibleConstructorReturn3.default)(this, (PermanentDrawer.__proto__ || (0, _getPrototypeOf2.default)(PermanentDrawer)).call(this, props));

    _this.renderToolbarSpacer = _this.renderToolbarSpacer.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(PermanentDrawer, [{
    key: 'renderToolbarSpacer',
    value: function renderToolbarSpacer() {
      // If we don't have the toolbar spacer props, just return null
      if (!this.props.toolbarSpacer) {
        return null;
      }

      // Else, return it with the appropriate div wrapper
      return _react2.default.createElement(
        'div',
        { className: 'mdc-permanent-drawer__toolbar-spacer' },
        this.props.toolbarSpacer
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'nav',
        { className: 'mdc-permanent-drawer' },
        this.renderToolbarSpacer(),
        _react2.default.createElement(
          'div',
          { className: 'mdc-permanent-drawer__content' },
          this.props.children
        )
      );
    }
  }]);
  return PermanentDrawer;
}(_react.PureComponent);

exports.default = PermanentDrawer;