import expect from 'expect.js';
import sinon from 'sinon';

import React from 'react/addons'
const { addons: { TestUtils } } = React

import Container from '../src/TabContainer';
import Bar from '../src/TabBar';
import Option from '../src/TabOption';
import Panel from '../src/TabPanel';

describe('TabContainer', () => {
  it('should not crash on no attributes', () => {
    expect(() => TestUtils.renderIntoDocument(<Container />)).not.to.throwException();
  });

  it('should render panels with names that are in the `selected` array prop', () => {
    var container = TestUtils.renderIntoDocument(
      <Container selected={['abc', 'def']}>
        <Bar>
          <Option name="abc" />
          <Option name="def" />
          <Option name="xyz" />
        </Bar>
        <Panel name="abc">
          <div>Panel ABC</div>
        </Panel>
        <Panel name="def">
          <div>Panel DEF</div>
        </Panel>
        <Panel name="xyz">
          <div>Panel XYZ</div>
        </Panel>
      </Container>
    );
    var panels = TestUtils.scryRenderedComponentsWithType(container, Panel);
    expect(panels.length).to.be(2);
    expect(panels[0].props.name).to.be('abc');
    expect(panels[1].props.name).to.be('def');
  });
});