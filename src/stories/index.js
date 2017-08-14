import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Drawer from '../Drawer';

const stories = storiesOf('Drawer', module);

stories.addDecorator(withKnobs);

stories.add('default view', () => (
  <div id="sandbox">
    <Drawer open={boolean('Open', true)} />
  </div>
));
