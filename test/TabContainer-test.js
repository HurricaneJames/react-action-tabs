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

  it('should render panels with names that are in the `active` array prop', () => {
    var container = TestUtils.renderIntoDocument(
      <Container active={['abc', 'def']}>
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

  it('should pass the active items on to the tab bar', () => {
    var active = ['abc', 'def'];
    var container = TestUtils.renderIntoDocument(
      <Container active={active}>
        <Bar>
          <Option name="abc" />
          <Option name="def" />
          <Option name="xyz" />
        </Bar>
      </Container>
    );
    var bar = TestUtils.findRenderedComponentWithType(container, Bar);
    expect(bar.props.active).to.be(active);
  });

  it('should render the `className` prop', () => {
    var className = 'my-custom-classname=';
    var container = TestUtils.renderIntoDocument(
      <Container className={className} active={['abc', 'def']}>
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
    expect(React.findDOMNode(container).className).to.be(className);
  });

  it('should set the `style`', () => {
    var style = { myCustomStyle: 'is-really-neat' };
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <Container name={name} style={style}>
        <Bar><Option name='abc' /></Bar>
        <Panel name='abc'><span>{'panel'}</span></Panel>
      </Container>
    );
    var widget = shallowRenderer.getRenderOutput();
    expect(widget.props.style).to.be(style);
  });

});