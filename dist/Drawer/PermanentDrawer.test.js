'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _enzyme = require('enzyme');

var _chaiEnzyme = require('chai-enzyme');

var _chaiEnzyme2 = _interopRequireDefault(_chaiEnzyme);

var _PermanentDrawer = require('./PermanentDrawer');

var _PermanentDrawer2 = _interopRequireDefault(_PermanentDrawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use((0, _chaiEnzyme2.default)());

describe('<PermanentDrawer />', function () {
  var component = void 0;

  before(function () {
    component = (0, _enzyme.shallow)(_react2.default.createElement(_PermanentDrawer2.default, null));
  });

  it('renders properly', function () {
    // We are going to add a child element to the element
    component.setProps({
      children: _react2.default.createElement(
        'p',
        null,
        'Testing'
      )
    });

    (0, _chai.expect)(component).to.have.text('Testing');
  });

  it('renders with an optional spacer component', function () {
    (0, _chai.expect)(component.find('.mdc-permanent-drawer__toolbar-spacer')).to.not.exist;

    component.setProps({
      spacer: _react2.default.createElement(
        'p',
        null,
        'Spacer Testing'
      )
    });

    (0, _chai.expect)(component.find('.mdc-permanent-drawer__toolbar-spacer')).to.exist;
  });
});