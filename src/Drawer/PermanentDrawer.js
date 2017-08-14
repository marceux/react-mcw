import React, { PureComponent } from 'react';

import '@material/drawer/dist/mdc.drawer.css';

class PermanentDrawer extends PureComponent {
  constructor(props) {
    super(props);

    // Bind Methods
    this.renderToolbarSpacer = this.renderToolbarSpacer.bind(this);
  }

  renderToolbarSpacer() {
    // If we don't have the toolbar spacer props, just return null
    if (!this.props.toolbarSpacer) {
      return null;
    }

    // Else, return it with the appropriate div wrapper
    return (
      <div className="mdc-permanent-drawer__toolbar-spacer">
        {this.props.toolbarSpacer}
      </div>
    );
  }

  render() {
    return (
      <nav className="mdc-permanent-drawer">
        {this.renderToolbarSpacer()}
        <div className="mdc-permanent-drawer__content">
          {this.props.children}
        </div>
      </nav>
    );
  }
}

export default PermanentDrawer;
