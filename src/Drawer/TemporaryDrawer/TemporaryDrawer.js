import React, { PureComponent } from 'react';
import { Set as ImmutableSet, Map as ImmutableMap } from 'immutable';

import { MDCTemporaryDrawerFoundation, util } from '@material/drawer/dist/mdc.drawer';

import '@material/drawer/dist/mdc.drawer.css';

const FOCUSABLE_ELEMENTS =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' +
  'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';

const emitEvent = (el, evtType) => {
  let evt;

  if (typeof window.CustomEvent === 'function') {
    evt = new CustomEvent(evtType, {
      detail: undefined,
      bubbles: false,
    });
  } else {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(evtType, false, false);
  }

  el.dispatchEvent(evt);
};

class Drawer extends PureComponent {
  constructor(props) {
    super(props);

    // Default State
    this.state = {
      classes: new ImmutableSet(['mdc-temporary-drawer']),
      cssVars: new ImmutableMap(),
      isOpen: Boolean(props.open),
    };

    // Here we initialize a foundation class, passing it an adapter which tells it how to
    // work with the React component in an idiomatic way.
    this.foundation = new MDCTemporaryDrawerFoundation({
      addClass: className => this.setState(prevState => ({
        classes: prevState.classes.add(className),
      })),
      removeClass: className => this.setState(prevState => ({
        classes: prevState.classes.remove(className),
      })),
      hasClass: className => this.state.classes.has(className),
      addBodyClass: className => document.body.classList.add(className),
      removeBodyClass: className => document.body.classList.remove(className),
      hasNecessaryDom: () => Boolean(this.rootRef),
      registerInteractionHandler: (evt, handler) => this.rootRef.addEventListener(evt, handler),
      deregisterInteractionHandler: (evt, handler) => this.rootRef.removeEventListener(evt, handler),
      registerDrawerInteractionHandler: (evt, handler) => {
        this.drawerRef.addEventListener(evt, handler);
      },
      deregisterDrawerInteractionHandler: (evt, handler) => {
        this.drawerRef.removeEventListener(evt, handler);
      },
      registerTransitionEndHandler: (handler) => this.drawerRef.addEventListener('transitionend', handler),
      deregisterTransitionEndHandler: (handler) => {
        this.drawerRef.removeEventListener('transitionend', handler);
      },
      registerDocumentKeydownHandler: (handler) => document.addEventListener('keydown', handler),
      deregisterDocumentKeydownHandler: (handler) => document.removeEventListener('keydown', handler),
      getDrawerWidth: () => this.drawerRef.offsetWidth,
      setTranslateX: (value) => this.drawerRef.style.setProperty(
        util.getTransformPropertyName(), value === null ? null : `translateX(${value}px)`
      ),
      updateCssVariable: (value) => {
        if (util.supportsCssCustomProperties()) {
          this.rootRef.style.setProperty('--mdc-temporary-drawer-opacity', value);
        }
      },
      getFocusableElements: () => this.drawerRef.querySelectorAll(FOCUSABLE_ELEMENTS),
      saveElementTabState: (el) => util.saveElementTabState(el),
      restoreElementTabState: (el) => util.restoreElementTabState(el),
      makeElementUntabbable: (el) => el.setAttribute('tabindex', '-1'),
      notifyOpen: () => emitEvent(this.rootRef, 'MDCTemporaryDrawer:open'),
      notifyClose: () => emitEvent(this.rootRef, 'MDCTemporaryDrawer:close'),
      isRtl: () => window.getComputedStyle(this.rootRef).getPropertyValue('direction') === 'rtl',
      isDrawer: (el) => (el === this.drawerRef),
    });

    // Bind Methods
    this.setRootRef = this.setRootRef.bind(this);
    this.setDrawerRef = this.setDrawerRef.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentDidMount() {
    this.foundation.init();

    if (this.state.isOpen) {
      this.foundation.open();
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setState({ isOpen: nextProps.open });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen !== prevState.isOpen) {
      if (this.state.isOpen) {
        this.foundation.open();
      } else {
        this.foundation.close();
      }
    }
  }

  setRootRef(node) {
    this.rootRef = node;
  }

  setDrawerRef(node) {
    this.drawerRef = node;
  }

  renderHeader() {
    const { header, spacer } = this.props;

    if (!header && !spacer) {
      return null;
    }

    // If we have a header or a spacer, then return either with the appropriate wrappers
    if (header) {
      return (
        <header className="mdc-temporary-drawer__header">
          <div className="mdc-temporary-drawer__header-content">
            {header}
          </div>
        </header>
      );
    } else if (spacer) {
      return (
        <div className="mdc-permanent-drawer__toolbar-spacer">
          {spacer}
        </div>
      );
    }

    // A catch-all, just in case?
    return null;
  }

  render() {
    const rootClasses = this.state.classes.toJS().join(' ');

    return (
      <aside className={rootClasses} ref={this.setRootRef} >
        <nav className="mdc-temporary-drawer__drawer" ref={this.setDrawerRef} >
          {this.renderHeader()}
          <div className="mdc-temporary-drawer__content">
            <p>Testing</p>
          </div>
        </nav>
      </aside>
    );
  }
}

export default Drawer;
