import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

import PermanentDrawer from './PermanentDrawer';

chai.use(chaiEnzyme());

describe('<PermanentDrawer />', () => {
  let component;

  before(() => {
    component = shallow(<PermanentDrawer />);
  });

  it('renders properly', () => {
    // We are going to add a child element to the element
    component.setProps({
      children: (<p>Testing</p>),
    });

    expect(component).to.have.text('Testing');
  });

  it('renders with an optional spacer component', () => {
    expect(component.find('.mdc-permanent-drawer__toolbar-spacer')).to.not.exist;

    component.setProps({
      spacer: (<p>Spacer Testing</p>),
    });

    expect(component.find('.mdc-permanent-drawer__toolbar-spacer')).to.exist;
  });
});
