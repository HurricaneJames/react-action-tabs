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
});
