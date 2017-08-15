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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _emitEvent = require('../../utils/emitEvent');

var _emitEvent2 = _interopRequireDefault(_emitEvent);

var _mdc = require('@material/drawer/dist/mdc.drawer');

var _constants = require('./constants');

require('@material/drawer/dist/mdc.drawer.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemporaryDrawer = function (_PureComponent) {
  (0, _inherits3.default)(TemporaryDrawer, _PureComponent);

  function TemporaryDrawer(props) {
    (0, _classCallCheck3.default)(this, TemporaryDrawer);

    // Default State
    var _this = (0, _possibleConstructorReturn3.default)(this, (TemporaryDrawer.__proto__ || (0, _getPrototypeOf2.default)(TemporaryDrawer)).call(this, props));

    _this.state = {
      classes: new _immutable.Set(['mdc-temporary-drawer']),
      cssVars: new _immutable.Map()
    };

    // Here we initialize a foundation class, passing it an adapter which tells it how to
    // work with the React component in an idiomatic way.
    _this.foundation = new _mdc.MDCTemporaryDrawerFoundation({
      addClass: function addClass(className) {
        return _this.setState(function (prevState) {
          return {
            classes: prevState.classes.add(className)
          };
        });
      },
      removeClass: function removeClass(className) {
        return _this.setState(function (prevState) {
          return {
            classes: prevState.classes.remove(className)
          };
        });
      },
      hasClass: function hasClass(className) {
        return _this.state.classes.has(className);
      },
      addBodyClass: function addBodyClass(className) {
        return document.body.classList.add(className);
      },
      removeBodyClass: function removeBodyClass(className) {
        return document.body.classList.remove(className);
      },
      hasNecessaryDom: function hasNecessaryDom() {
        return Boolean(_this.rootRef);
      },
      registerInteractionHandler: function registerInteractionHandler(evt, handler) {
        _this.rootRef.addEventListener(evt, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
        _this.rootRef.removeEventListener(evt, handler);
      },
      registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
        _this.drawerRef.addEventListener(evt, handler);
      },
      deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
        _this.drawerRef.removeEventListener(evt, handler);
      },
      registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
        _this.drawerRef.addEventListener('transitionend', handler);
      },
      deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
        _this.drawerRef.removeEventListener('transitionend', handler);
      },
      registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
        document.addEventListener('keydown', handler);
      },
      deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
        document.removeEventListener('keydown', handler);
      },
      getDrawerWidth: function getDrawerWidth() {
        return _this.drawerRef.offsetWidth;
      },
      setTranslateX: function setTranslateX(value) {
        return _this.drawerRef.style.setProperty(_mdc.util.getTransformPropertyName(), value === null ? null : 'translateX(' + value + 'px)');
      },
      updateCssVariable: function updateCssVariable(value) {
        if (_mdc.util.supportsCssCustomProperties()) {
          _this.rootRef.style.setProperty('--mdc-temporary-drawer-opacity', value);
        }
      },
      getFocusableElements: function getFocusableElements() {
        return _this.drawerRef.querySelectorAll(_constants.FOCUSABLE_ELEMENTS);
      },
      saveElementTabState: function saveElementTabState(el) {
        return _mdc.util.saveElementTabState(el);
      },
      restoreElementTabState: function restoreElementTabState(el) {
        return _mdc.util.restoreElementTabState(el);
      },
      makeElementUntabbable: function makeElementUntabbable(el) {
        return el.setAttribute('tabindex', '-1');
      },
      notifyOpen: function notifyOpen() {
        (0, _emitEvent2.default)(_this.rootRef, 'MDCTemporaryDrawer:open');

        if (props.openDrawer) {
          props.openDrawer();
        }
      },
      notifyClose: function notifyClose() {
        (0, _emitEvent2.default)(_this.rootRef, 'MDCTemporaryDrawer:close');

        if (props.closeDrawer) {
          props.closeDrawer();
        }
      },
      isRtl: function isRtl() {
        return window.getComputedStyle(_this.rootRef).getPropertyValue('direction') === 'rtl';
      },
      isDrawer: function isDrawer(el) {
        return el === _this.drawerRef;
      }
    });

    // Bind Methods
    _this.setRootRef = _this.setRootRef.bind(_this);
    _this.setDrawerRef = _this.setDrawerRef.bind(_this);
    _this.renderHeader = _this.renderHeader.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(TemporaryDrawer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.foundation.init();

      // If we have an open state, call the foundation's open method
      if (this.props.isOpen) {
        this.foundation.open();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // If we have open state...
      if (this.props.isOpen) {
        if (this.props.closeDrawer) {
          // call the provided closeDrawer prop
          this.props.closeDrawer();
        }

        // call the foundaton's close method
        this.foundation.close();
      }

      this.foundation.destroy();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // If the props has changed, then call the foundation methods
      if (this.props.isOpen !== prevProps.isOpen) {
        if (this.props.isOpen) {
          this.foundation.open();
        } else {
          this.foundation.close();
        }
      }
    }
  }, {
    key: 'setRootRef',
    value: function setRootRef(node) {
      this.rootRef = node;
    }
  }, {
    key: 'setDrawerRef',
    value: function setDrawerRef(node) {
      this.drawerRef = node;
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader() {
      var _props = this.props,
          header = _props.header,
          spacer = _props.spacer;


      if (!header && !spacer) {
        return null;
      }

      // If we have a header or a spacer, then return either with the appropriate wrappers
      if (header) {
        return _react2.default.createElement(
          'header',
          { className: 'mdc-temporary-drawer__header' },
          _react2.default.createElement(
            'div',
            { className: 'mdc-temporary-drawer__header-content' },
            header
          )
        );
      } else if (spacer) {
        return _react2.default.createElement(
          'div',
          { className: 'mdc-temporary-drawer__toolbar-spacer' },
          spacer
        );
      }

      // A catch-all, just in case?
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;


      var rootClasses = this.state.classes.toJS().join(' ');

      return _react2.default.createElement(
        'aside',
        { className: rootClasses, ref: this.setRootRef },
        _react2.default.createElement(
          'nav',
          { className: 'mdc-temporary-drawer__drawer', ref: this.setDrawerRef },
          this.renderHeader(),
          _react2.default.createElement(
            'div',
            { className: 'mdc-temporary-drawer__content' },
            children
          )
        )
      );
    }
  }]);
  return TemporaryDrawer;
}(_react.PureComponent);

TemporaryDrawer.propTypes = {
  children: _propTypes2.default.node,
  closeDrawer: _propTypes2.default.func,
  isOpen: _propTypes2.default.bool,
  openDrawer: _propTypes2.default.func
};

exports.default = TemporaryDrawer;