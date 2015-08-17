import expect from 'expect.js';
import sinon from 'sinon';

import React from 'react/addons'
const { addons: { TestUtils } } = React

import Widget from '../src/TabWidget';
import Bar from '../src/TabBar';
import Container from '../src/TabContainer';
import Option from '../src/TabOption';
import Panel from '../src/TabPanel';

describe('TabWidget', () => {
  it('should not crash on no attributes', () => {
    expect(() => TestUtils.renderIntoDocument(<Widget />)).not.to.throwException();
  });

  it('should render a Container', () => {
    var widget = TestUtils.renderIntoDocument(
      <Widget>
        <Bar><Option name='abc' /></Bar>
        <Panel name='abc'><span>{'panel'}</span></Panel>
      </Widget>
    );
    var containers = TestUtils.scryRenderedComponentsWithType(widget, Container);
    expect(containers.length).to.be(1);
  });

  it('should render the tab bar', () => {
    var widget = TestUtils.renderIntoDocument(
      <Widget>
        <Bar>
          <Option name="abc" action={function() {}} />
          <Option name="def" />
        </Bar>
        <Panel name="abc">
          <div>Help Me Find This</div>
        </Panel>
      </Widget>
    );
    var bar = TestUtils.scryRenderedComponentsWithType(widget, Bar);
    expect(bar.length).to.be(1);
  });

  it('should show the panel for an item when clicked', () => {
    var cc = sinon.spy();
    const widgetElement = (
      <Widget>
        <Bar>
          <Option name="abc" action={cc} />
          <Option name="def" />
          <Option name="xyz" />
        </Bar>
        <Panel className='panel' name="abc">
          <div>Help Me Find This</div>
        </Panel>
        <Panel className='panel' name="def">
          <div>Some text</div>
        </Panel>
      </Widget>
    );
    var widget = TestUtils.renderIntoDocument(widgetElement);
    var options = TestUtils.scryRenderedComponentsWithType(widget, Option)
    options[0].props.action.call();
    expect(cc.called).to.be.ok()
    var container = TestUtils.scryRenderedComponentsWithType(widget, Container);
    expect(container.length).to.be(1);
    expect(container[0].props.active).to.eql(['abc']);
  });

  it('should only show one panel at a time by default', () => {
    var cc = sinon.spy();
    const widgetElement = (
      <Widget>
        <Bar>
          <Option name="abc" action={cc} />
          <Option name="def" />
          <Option name="xyz" />
        </Bar>
        <Panel className='panel' name="abc">
          <div>Help Me Find This</div>
        </Panel>
        <Panel className='panel' name="def">
          <div>Some text</div>
        </Panel>
      </Widget>
    );
    var widget = TestUtils.renderIntoDocument(widgetElement);
    var options = TestUtils.scryRenderedComponentsWithType(widget, Option)
    options[0].props.action.call();
    options[1].props.action.call();
    expect(cc.calledOnce).to.be.ok()
    var container = TestUtils.scryRenderedComponentsWithType(widget, Container);
    expect(container.length).to.be(1);
    expect(container[0].props.active).to.eql(['def']);
  });

  it('should set the `className`', () => {
    var className = 'xyzzy';
    var widget = TestUtils.renderIntoDocument(
      <Widget className={className}>
        <Bar>
          <Option name="abc" action={function() {}} />
          <Option name="def" />
        </Bar>
        <Panel name="abc">
          <div>Help Me Find This</div>
        </Panel>
      </Widget>
    );
    expect(React.findDOMNode(widget).className).to.eql(className);
  });

  it('should set the container style to style', () => {
    var style = { myCustomStyle: 'is-really-neat' };
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <Widget name={name} style={style}>
        <Bar><Option name='abc' /></Bar>
        <Panel name='abc'><span>{'panel'}</span></Panel>
      </Widget>
    );
    var widget = shallowRenderer.getRenderOutput();
    expect(widget.props.style).to.be(style);
  });

  describe('`allowMultiplePanels` atttibute', () => {
    it('should show multiple panels when `allowMultiplePanels` attribute is set', () => {
      var widgetElement = (
        <Widget allowMultiplePanels>
          <Bar>
            <Option name="abc" />
            <Option name="def" />
            <Option name="xyz" />
          </Bar>
          <Panel className='panel' name="abc">
            <div>Help Me Find This</div>
          </Panel>
          <Panel className='panel' name="def">
            <div>Some text</div>
          </Panel>
        </Widget>
      );
      var widget = TestUtils.renderIntoDocument(widgetElement);
      var options = TestUtils.scryRenderedComponentsWithType(widget, Option)
      options[0].props.action.call();
      options[1].props.action.call();
      var container = TestUtils.scryRenderedComponentsWithType(widget, Container);
      expect(container.length).to.be(1);
      expect(container[0].props.active).to.eql(['abc', 'def']);
    });

    it('should toggle the panel for the current option if it has the `toggle` attribute', () => {
      var callback = sinon.spy();
      var widgetElement = (
        <Widget allowMultiplePanels>
          <Bar>
            <Option name="abc" toggle action={callback} />
            <Option name="def" />
            <Option name="xyz" />
          </Bar>
          <Panel className='panel' name="abc">
            <div>Help Me Find This</div>
          </Panel>
          <Panel className='panel' name="def">
            <div>Some text</div>
          </Panel>
        </Widget>
      );
      var widget = TestUtils.renderIntoDocument(widgetElement);
      var options = TestUtils.scryRenderedComponentsWithType(widget, Option)
      options[0].props.action.call();
      options[0].props.action.call();
      expect(callback.calledTwice).to.be.ok();
      var container = TestUtils.scryRenderedComponentsWithType(widget, Container);
      expect(container.length).to.be(1);
      expect(container[0].props.active).to.eql([]);
    });

    it('should continue to show the panel when the action for that panel is clicked while the panel is already displayed', () => {
      var callback = sinon.spy();
      var widgetElement = (
        <Widget allowMultiplePanels>
          <Bar>
            <Option name="abc" action={callback} />
            <Option name="def" />
            <Option name="xyz" />
          </Bar>
          <Panel className='panel' name="abc">
            <div>Help Me Find This</div>
          </Panel>
          <Panel className='panel' name="def">
            <div>Some text</div>
          </Panel>
        </Widget>
      );
      var widget = TestUtils.renderIntoDocument(widgetElement);
      var options = TestUtils.scryRenderedComponentsWithType(widget, Option)
      options[0].props.action.call();
      options[0].props.action.call();
      expect(callback.calledTwice).to.be.ok();
      var container = TestUtils.scryRenderedComponentsWithType(widget, Container);
      expect(container.length).to.be(1);
      expect(container[0].props.active).to.eql([ 'abc' ]);
    });

    it('should automatically hide other panels when the current action has the `hideOtherPanels` attribute', () => {
      var widgetElement = (
        <Widget allowMultiplePanels>
          <Bar>
            <Option name="abc" />
            <Option name="def" hideOtherPanels />
            <Option name="xyz" />
          </Bar>
          <Panel className='panel' name="abc">
            <div>Help Me Find This</div>
          </Panel>
          <Panel className='panel' name="def">
            <div>Some text</div>
          </Panel>
        </Widget>
      );
      var widget = TestUtils.renderIntoDocument(widgetElement);
      var options = TestUtils.scryRenderedComponentsWithType(widget, Option)
      options[0].props.action.call();
      options[1].props.action.call();
      var container = TestUtils.scryRenderedComponentsWithType(widget, Container);
      expect(container.length).to.be(1);
      expect(container[0].props.active).to.eql([ 'def' ]);
    });
  });

});