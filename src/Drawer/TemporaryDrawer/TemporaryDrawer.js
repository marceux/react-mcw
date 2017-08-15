import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Set as ImmutableSet, Map as ImmutableMap } from 'immutable';

import emitEvent from '../../utils/emitEvent';
import { MDCTemporaryDrawerFoundation, util } from '@material/drawer/dist/mdc.drawer';
import { FOCUSABLE_ELEMENTS } from './constants';

import '@material/drawer/dist/mdc.drawer.css';

class TemporaryDrawer extends PureComponent {
  constructor(props) {
    super(props);

    // Default State
    this.state = {
      classes: new ImmutableSet(['mdc-temporary-drawer']),
      cssVars: new ImmutableMap(),
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
      registerInteractionHandler: (evt, handler) => {
        this.rootRef.addEventListener(evt, handler);
      },
      deregisterInteractionHandler: (evt, handler) => {
        this.rootRef.removeEventListener(evt, handler);
      },
      registerDrawerInteractionHandler: (evt, handler) => {
        this.drawerRef.addEventListener(evt, handler);
      },
      deregisterDrawerInteractionHandler: (evt, handler) => {
        this.drawerRef.removeEventListener(evt, handler);
      },
      registerTransitionEndHandler: (handler) => {
        this.drawerRef.addEventListener('transitionend', handler);
      },
      deregisterTransitionEndHandler: (handler) => {
        this.drawerRef.removeEventListener('transitionend', handler);
      },
      registerDocumentKeydownHandler: (handler) => {
        document.addEventListener('keydown', handler);
      },
      deregisterDocumentKeydownHandler: (handler) => {
        document.removeEventListener('keydown', handler);
      },
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
      notifyOpen: () => {
        emitEvent(this.rootRef, 'MDCTemporaryDrawer:open');

        if (props.openDrawer) {
          props.openDrawer();
        }
      },
      notifyClose: () => {
        emitEvent(this.rootRef, 'MDCTemporaryDrawer:close');

        if (props.closeDrawer) {
          props.closeDrawer();
        }
      },
      isRtl: () => {
        return window.getComputedStyle(this.rootRef).getPropertyValue('direction') === 'rtl';
      },
      isDrawer: (el) => (el === this.drawerRef),
    });

    // Bind Methods
    this.setRootRef = this.setRootRef.bind(this);
    this.setDrawerRef = this.setDrawerRef.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentDidMount() {
    this.foundation.init();

    // If we have an open state, call the foundation's open method
    if (this.props.isOpen) {
      this.foundation.open();
    }
  }

  componentWillUnmount() {
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

  componentDidUpdate(prevProps) {
    // If the props has changed, then call the foundation methods
    if (this.props.isOpen !== prevProps.isOpen) {
      if (this.props.isOpen) {
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
        <div className="mdc-temporary-drawer__toolbar-spacer">
          {spacer}
        </div>
      );
    }

    // A catch-all, just in case?
    return null;
  }

  render() {
    const { children } = this.props;

    const rootClasses = this.state.classes.toJS().join(' ');

    return (
      <aside className={rootClasses} ref={this.setRootRef} >
        <nav className="mdc-temporary-drawer__drawer" ref={this.setDrawerRef} >
          {this.renderHeader()}

          <div className="mdc-temporary-drawer__content">
            {children}
          </div>
        </nav>
      </aside>
    );
  }
}

TemporaryDrawer.propTypes = {
  children: PropTypes.node,
  closeDrawer: PropTypes.func,
  isOpen: PropTypes.bool,
  openDrawer: PropTypes.func,
};

export default TemporaryDrawer;
