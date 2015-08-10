import expect from 'expect.js';
import sinon from 'sinon';

import React from 'react/addons'
const { addons: { TestUtils } } = React

import TabOption from '../src/TabOption';
import Styles from '../src/Styles';

describe('TabOption', () => {
  it('should not crash on no attributes', () => {
    expect(() => TestUtils.renderIntoDocument(<TabOption />)).not.to.throwException();
  });

  it('should render the name when there is no child', () => {
    var name = 'Option 1';
    var tabOption = TestUtils.renderIntoDocument(<TabOption name={name} />);
    expect(React.findDOMNode(tabOption).textContent).to.be(name);
  });

  it('should render the child if available', () => {
    var name = 'Option 1';
    var childText = 'not the name';
    var tabOption = TestUtils.renderIntoDocument(
      <TabOption name={name}>
        <span>{childText}</span>
      </TabOption>
    );
    expect(React.findDOMNode(tabOption).textContent).to.be(childText);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(tabOption, 'span').length).to.be(1);
  });

  it('should render the child with an `active` prop if the tab is selected', () => {
    var name = 'Option 1';
    var tabOption = TestUtils.renderIntoDocument(
      <TabOption name={name} selected>
        <span>element 0</span>
      </TabOption>
    );
    var span = TestUtils.findRenderedDOMComponentWithTag(tabOption, 'span');
    expect(span.props.active).to.be.ok();
  });

  it('should not pass the `active` prop to the child  when the `noActivePassthrough` prop is set', () => {
    var name = 'Option 1';
    var tabOption = TestUtils.renderIntoDocument(
      <TabOption name={name} selected noActivePassthrough>
        <span>element 0</span>
      </TabOption>
    );
    var span = TestUtils.findRenderedDOMComponentWithTag(tabOption, 'span');
    expect(span.props.active).not.to.be.ok();
  });

  it('should not strip off a preexisting `active` prop on the children when the `noActivePassthrough` prop is set', () => {
    var name = 'Option 1';
    var tabOption = TestUtils.renderIntoDocument(
      <TabOption name={name} selected noActivePassthrough>
        <span active>element 0</span>
      </TabOption>
    );
    var span = TestUtils.findRenderedDOMComponentWithTag(tabOption, 'span');
    expect(span.props.active).to.be.ok();
  });

  it('should set the `className` when given as a prop', () => {
    var className = 'alpha';
    var tabOption = TestUtils.renderIntoDocument(
      <TabOption name='something' className={className} />
    );
    var item = TestUtils.findRenderedDOMComponentWithTag(tabOption, 'li');
    expect(item.props.className).to.be(className);
  });

  it('should not set the `className` when there is a child', () => {
    var className = 'alpha';
    var tabOption = TestUtils.renderIntoDocument(
      <TabOption name='something' className={className} />
    );
    var item = TestUtils.findRenderedDOMComponentWithTag(tabOption, 'li');
    expect(item.props.className).to.be(className);
  });

  it('should use the supplied `style` when available', () => {
    var name = 'Option 1';
    var style = { myStyleAttr: 'isReallyGreat' };
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TabOption name={name} style={style} />);
    var tabOption = shallowRenderer.getRenderOutput();
    expect(tabOption.props.style).to.eql(style);
  });

  it('should use the `TabOption.base` style', () => {
    var name = 'Option 1';
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TabOption name={name} />);
    var tabOption = shallowRenderer.getRenderOutput();
    expect(tabOption.props.style).to.eql(Styles.TabOption.base);
  });

  it('should apply the `TabOption.selected` style when given the selected prop', () => {
    var name = 'Option 1';
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TabOption name={name} selected />);
    var tabOption = shallowRenderer.getRenderOutput();
    var expectedStyle = Object.assign({}, Styles.TabOption.base, Styles.TabOption.selected);
    expect(tabOption.props.style).to.eql(expectedStyle);
  });

  it('should not apply the default selected style when the `style` prop is given', () => {
    var name = 'Option 1';
    var style = { myCustomAttr: 'isReallyGreat' };
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TabOption name={name} selected style={style} />);
    var tabOption = shallowRenderer.getRenderOutput();
    expect(tabOption.props.style).to.eql(style);
  });

  it('should throw when given more than a single root child', () => {
    var name = 'Option 1';
    var childStyle = { hotPot: 'oil' };
    expect(() => {
      return (TestUtils.renderIntoDocument(
        <TabOption name={name} selected>
          <span style={childStyle}>This is interesting</span>
          <span>This will not work</span>
        </TabOption>
      ));
    }).to.throwException();
  });

  it('should trigger the action callback when clicked', () => {
    var name = 'Option 1';
    var callback = sinon.spy();
    var tabOption = TestUtils.renderIntoDocument(<TabOption name={name} action={callback} />);
    TestUtils.Simulate.click(React.findDOMNode(tabOption));
    expect(callback.calledOnce).to.be.ok();
  });

  it('should trigger the action callback when the child is clicked', () => {
    var name = 'Option 1';
    var callback = sinon.spy();
    var tabOption = TestUtils.renderIntoDocument(
      <TabOption name={name} action={callback}>
        <span>{'Click me'}</span>
      </TabOption>
    );
    TestUtils.Simulate.click(
      React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(tabOption, 'span'))
    );
    expect(callback.calledOnce).to.be.ok();
  });

  it('should still trigger the child onClick callback too', () => {
    var name = 'Option 1';
    var callback = sinon.spy();
    var onClick  = sinon.spy();
    var tabOption = TestUtils.renderIntoDocument(
      <TabOption name={name} action={callback}>
        <span onClick={onClick}>{'Click me'}</span>
      </TabOption>
    );
    TestUtils.Simulate.click(
      React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(tabOption, 'span'))
    );
    expect(callback.calledOnce).to.be.ok();
    expect(onClick.calledOnce).to.be.ok();
  });

});