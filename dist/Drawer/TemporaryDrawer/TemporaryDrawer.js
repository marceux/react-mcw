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

var _immutable = require('immutable');

var _mdc = require('@material/drawer/dist/mdc.drawer');

require('@material/drawer/dist/mdc.drawer.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FOCUSABLE_ELEMENTS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' + 'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';

var emitEvent = function emitEvent(el, evtType) {
  var evt = void 0;

  if (typeof window.CustomEvent === 'function') {
    evt = new CustomEvent(evtType, {
      detail: undefined,
      bubbles: false
    });
  } else {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(evtType, false, false);
  }

  el.dispatchEvent(evt);
};

var Drawer = function (_PureComponent) {
  (0, _inherits3.default)(Drawer, _PureComponent);

  function Drawer(props) {
    (0, _classCallCheck3.default)(this, Drawer);

    // Default State
    var _this = (0, _possibleConstructorReturn3.default)(this, (Drawer.__proto__ || (0, _getPrototypeOf2.default)(Drawer)).call(this, props));

    _this.state = {
      classes: new _immutable.Set(['mdc-temporary-drawer']),
      cssVars: new _immutable.Map(),
      isOpen: Boolean(props.open)
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
        return _this.rootRef.addEventListener(evt, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
        return _this.rootRef.removeEventListener(evt, handler);
      },
      registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
        _this.drawerRef.addEventListener(evt, handler);
      },
      deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
        _this.drawerRef.removeEventListener(evt, handler);
      },
      registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
        return _this.drawerRef.addEventListener('transitionend', handler);
      },
      deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
        _this.drawerRef.removeEventListener('transitionend', handler);
      },
      registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
        return document.addEventListener('keydown', handler);
      },
      deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
        return document.removeEventListener('keydown', handler);
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
        return _this.drawerRef.querySelectorAll(FOCUSABLE_ELEMENTS);
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
        return emitEvent(_this.rootRef, 'MDCTemporaryDrawer:open');
      },
      notifyClose: function notifyClose() {
        return emitEvent(_this.rootRef, 'MDCTemporaryDrawer:close');
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

  (0, _createClass3.default)(Drawer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.foundation.init();

      if (this.state.isOpen) {
        this.foundation.open();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.foundation.destroy();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.open !== nextProps.open) {
        this.setState({ isOpen: nextProps.open });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.isOpen !== prevState.isOpen) {
        if (this.state.isOpen) {
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
          { className: 'mdc-permanent-drawer__toolbar-spacer' },
          spacer
        );
      }

      // A catch-all, just in case?
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
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
            _react2.default.createElement(
              'p',
              null,
              'Testing'
            )
          )
        )
      );
    }
  }]);
  return Drawer;
}(_react.PureComponent);

exports.default = Drawer;