import React from 'react';
import chai, { expect } from 'chai';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

import TemporaryDrawer from './TemporaryDrawer';

chai.use(chaiEnzyme());

describe('<TemporaryDrawer />', () => {
  let component;
  let openDrawer;
  let closeDrawer;

  before(() => {
    // Spies
    openDrawer = sinon.spy();
    closeDrawer = sinon.spy();

    const props = {
      openDrawer,
      closeDrawer,
      isOpen: true,
    };

    component = mount(<TemporaryDrawer {...props} />);
  });

  afterEach(() => {
    openDrawer.reset();
    closeDrawer.reset();
  });

  it('renders properly', () => {
    // We are going to add a child element to the element
    component.setProps({
      children: (<p>Testing</p>),
    });

    expect(component).to.have.text('Testing');
  });

  it('renders with an optional spacer component', () => {
    expect(component.find('.mdc-temporary-drawer__toolbar-spacer')).to.not.exist;

    component.setProps({
      spacer: (<p>Spacer Testing</p>),
    });

    expect(component.find('.mdc-temporary-drawer__toolbar-spacer')).to.exist;
  });

  it('renders with an optional header component', () => {
    expect(component.find('.mdc-tempoary-drawer__header')).to.not.exist;

    component.setProps({
      header: (<p>Header Testing</p>),
    });

    // The toolbar spacer will NOT be rendered if we provided a header
    expect(component.find('.mdc-temporary-drawer__toolbar-spacer')).to.not.exist;
    expect(component.find('.mdc-temporary-drawer__header')).to.exist;
  });

  it('calls closeDrawer prop on unmount', () => {
    component.unmount();

    // Expect the closeDrawer spy to be called
    expect(closeDrawer.called).to.be.true;
  });
});
