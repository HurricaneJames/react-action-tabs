import expect from 'expect.js';

import React from 'react/addons'
const { addons: { TestUtils } } = React

import Panel from '../src/TabPanel';

describe('TabPanel', () => {
  it('should render an empty panel without crashing', () => {
    var panel = TestUtils.renderIntoDocument(<Panel />)
    expect(panel).not.to.be(undefined);
  });
  it('should render all the children of the panel', () => {
    var panelElement = (
      <Panel name="abc">
        <div className="test">
          {'Test Content'}
          <div className="test2">Alpha</div>
        </div>
      </Panel>
    );
    var panel = TestUtils.renderIntoDocument(panelElement);
    expect(React.findDOMNode(panel).textContent).to.be('Test ContentAlpha');
  });

  it('should set the style of the div to the `style` prop if supplied', () => {
    var style = { real: 'not' };
    var panel = TestUtils.renderIntoDocument(
      <Panel name='abc' style={style}><span>{'Content'}</span></Panel>
    );
    expect(TestUtils.findRenderedDOMComponentWithTag(panel, 'div').props.style).to.eql(style);
  });

  it('should set the class name of the div to the `className` prop if supplied', () => {
    var className = 'my-custom-class-name';
    var panel = TestUtils.renderIntoDocument(
      <Panel name='abc' className={className}><span>{'Content'}</span></Panel>
    );
    expect(TestUtils.findRenderedDOMComponentWithTag(panel, 'div').props.className).to.be(className);
  });
});
