'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _enzyme = require('enzyme');

var _chaiEnzyme = require('chai-enzyme');

var _chaiEnzyme2 = _interopRequireDefault(_chaiEnzyme);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _TemporaryDrawer = require('./TemporaryDrawer');

var _TemporaryDrawer2 = _interopRequireDefault(_TemporaryDrawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use((0, _chaiEnzyme2.default)());

describe('<TemporaryDrawer />', function () {
  var component = void 0;
  var openDrawer = void 0;
  var closeDrawer = void 0;

  before(function () {
    // Spies
    openDrawer = _sinon2.default.spy();
    closeDrawer = _sinon2.default.spy();

    var props = {
      openDrawer: openDrawer,
      closeDrawer: closeDrawer,
      isOpen: true
    };

    component = (0, _enzyme.mount)(_react2.default.createElement(_TemporaryDrawer2.default, props));
  });

  afterEach(function () {
    openDrawer.reset();
    closeDrawer.reset();
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
    (0, _chai.expect)(component.find('.mdc-temporary-drawer__toolbar-spacer')).to.not.exist;

    component.setProps({
      spacer: _react2.default.createElement(
        'p',
        null,
        'Spacer Testing'
      )
    });

    (0, _chai.expect)(component.find('.mdc-temporary-drawer__toolbar-spacer')).to.exist;
  });

  it('renders with an optional header component', function () {
    (0, _chai.expect)(component.find('.mdc-tempoary-drawer__header')).to.not.exist;

    component.setProps({
      header: _react2.default.createElement(
        'p',
        null,
        'Header Testing'
      )
    });

    // The toolbar spacer will NOT be rendered if we provided a header
    (0, _chai.expect)(component.find('.mdc-temporary-drawer__toolbar-spacer')).to.not.exist;
    (0, _chai.expect)(component.find('.mdc-temporary-drawer__header')).to.exist;
  });

  it('calls closeDrawer prop on unmount', function () {
    component.unmount();

    // Expect the closeDrawer spy to be called
    (0, _chai.expect)(closeDrawer.called).to.be.true;
  });
});