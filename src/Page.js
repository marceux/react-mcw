import React from 'react';

import Drawer from './Drawer';

const wrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '500px',
};

const toolbarStyles = {
  alignItems: 'center',
  background: 'black',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.32)',
  color: 'white',
  display: 'flex',
  fontFamily: 'sans-serif',
  fontSize: '1.25rem',
  height: '64px',
  justifyContent: 'flex-start',
  left: '0px',
  paddingLeft: '32px',
  position: 'fixed',
  top: '0px',
  width: '100%',
};

const mainStyles = {
  background: '#e4e4e4',
  display: 'flex',
  flex: '1 1 auto',
  height: '100%',
  paddingTop: '56px',
  marginLeft: '-8px',
  marginRight: '-8px',
};

const contentWrapperStyles = {
  background: '#fff',
  boxShadow: `0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12)`,
  flex: '1 1 auto',
  padding: '16px',
};

const contentStyles = {
  height: '100%',
  width: '100%',
};

const Page = () => (
  <div style={wrapperStyles} >
    <div id="toolbar" style={toolbarStyles} >
      <p>Testing</p>
    </div>
    <div id="main" style={mainStyles} >
      <Drawer open={true} />
      <div id="content-wrapper" style={contentWrapperStyles} >
        <div id="content" style={contentStyles} >Test Page</div>
      </div>
    </div>
  </div>
);

export default Page;
