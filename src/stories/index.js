import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import PermanentDrawer from '../Drawer/PermanentDrawer';
import TemporaryDrawer from '../Drawer/TemporaryDrawer';

storiesOf('PermanentDrawer', module)
  .add('default view', () => (
    <PermanentDrawer>
      <p>Inside Drawer</p>
    </PermanentDrawer>
  ))
  .add('with spacer', () => (
    <PermanentDrawer toolbarSpacer={<p>Inside Spacer</p>} >
      <p>Outside Spacer</p>
    </PermanentDrawer>
  ));

storiesOf('TemporaryDrawer', module)
  .addDecorator(withKnobs)
  .add('default view', () => (
    <TemporaryDrawer open={boolean('Open', true)} >
      <p>Content</p>
    </TemporaryDrawer>
  ))
  .add('with spacer', () => (
    <TemporaryDrawer open={boolean('Open', true)} spacer={<p>Inside Spacer</p>} >
      <p>Content</p>
    </TemporaryDrawer>
  ))
  .add('with header', () => (
    <TemporaryDrawer open={boolean('Open', true)} header={<p>Inside Header</p>} >
      <p>Content</p>
    </TemporaryDrawer>
  ));
