import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// CSS
import '@material/drawer/dist/mdc.drawer.css';

class PermanentDrawer extends PureComponent {
  constructor(props) {
    super(props);

    // Bind Methods
    this.renderSpacer = this.renderSpacer.bind(this);
  }

  renderSpacer() {
    // If we don't have the toolbar spacer props, just return null
    if (!this.props.spacer) {
      return null;
    }

    // Else, return it with the appropriate div wrapper
    return (
      <div className="mdc-permanent-drawer__toolbar-spacer">
        {this.props.spacer}
      </div>
    );
  }

  render() {
    return (
      <nav className="mdc-permanent-drawer">
        {this.renderSpacer()}
        <div className="mdc-permanent-drawer__content">
          {this.props.children}
        </div>
      </nav>
    );
  }
}

PermanentDrawer.propTypes = {
  spacer: PropTypes.node,
  children: PropTypes.node,
};

export default PermanentDrawer;
