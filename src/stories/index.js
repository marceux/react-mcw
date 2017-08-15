import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
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
    <PermanentDrawer spacer={<p>Inside Spacer</p>} >
      <p>Outside Spacer</p>
    </PermanentDrawer>
  ));

storiesOf('TemporaryDrawer', module)
  .addDecorator(withKnobs)
  .add('default view', () => (
    <TemporaryDrawer isOpen={boolean('Open', true)} >
      <p>Content</p>
    </TemporaryDrawer>
  ))
  .add('with spacer', () => (
    <TemporaryDrawer isOpen={boolean('Open', true)} spacer={<p>Inside Spacer</p>} >
      <p>Content</p>
    </TemporaryDrawer>
  ))
  .add('with header', () => (
    <TemporaryDrawer isOpen={boolean('Open', true)} header={<p>Inside Header</p>} >
      <p>Content</p>
    </TemporaryDrawer>
  ))
  .add('calls action when closed', () => (
    <TemporaryDrawer isOpen={boolean('Open', true)} closeDrawer={action('Closed')} >
      <p>Content</p>
    </TemporaryDrawer>
  ))
  .add('calls action when opened', () => (
    <TemporaryDrawer isOpen={boolean('Open', true)} openDrawer={action('Opened')} >
      <p>Content</p>
    </TemporaryDrawer>
  ));
