import expect from 'expect.js';

import React from 'react/addons'
const { addons: { TestUtils } } = React

import TabBar from '../src/TabBar';
import TabOption from '../src/TabOption';

import Styles from '../src/Styles';
const TabBarStyles = Styles.TabBar;

describe('TabBar', () => {
  it('should render an empty tab bar without crashing', () => {
    var tabBar = TestUtils.renderIntoDocument(<TabBar />)
    expect(tabBar).not.to.be(undefined);
  });

  it('should render all the options', () => {
    var bar = (
      <TabBar>
        <TabOption name="option 1" />
        <TabOption name="option 2" />
      </TabBar>
    );
    var tabBar = TestUtils.renderIntoDocument(bar);
    var options = TestUtils.scryRenderedComponentsWithType(tabBar, TabOption);
    expect(options.length).to.be(2);
    expect(options[0].props.name).to.be('option 1');
    expect(options[1].props.name).to.be('option 2');
  });

  it('should pass the selected prop to those options whose name is in the selected array prop', () => {
    var names = ['alpha', 'beta', 'gamma'];
    var selected = [names[0], names[2]];
    var bar = (
      <TabBar selected={selected}>
        <TabOption name={names[0]} />
        <TabOption name={names[1]} />
        <TabOption name={names[2]} />
      </TabBar>
    );
    var tabBar = TestUtils.renderIntoDocument(bar);
    var options = TestUtils.scryRenderedComponentsWithType(tabBar, TabOption);
    expect(options[0].props.selected).to.be.ok();
    expect(options[1].props.selected).not.to.be.ok();
    expect(options[2].props.selected).to.be.ok();
  });

  it('should respect tab options that are selected by hand', () => {
    var names = ['alpha', 'beta', 'gamma'];
    var selected = [names[0]];
    var bar = (
      <TabBar selected={selected}>
        <TabOption name={names[0]} />
        <TabOption name={names[1]} selected />
        <TabOption name={names[2]} />
      </TabBar>
    );
    var tabBar = TestUtils.renderIntoDocument(bar);
    var options = TestUtils.scryRenderedComponentsWithType(tabBar, TabOption);
    expect(options[0].props.selected).to.be.ok();
    expect(options[1].props.selected).to.be.ok();
    expect(options[2].props.selected).not.to.be.ok();
  });

  it('should use the Styles.TabBar styles', () => {
    var names = ['alpha', 'beta', 'gamma'];
    var selected = [names[0]];
    var tabBar = TestUtils.renderIntoDocument(
      <TabBar selected={selected}>
        <TabOption name={names[0]} />
        <TabOption name={names[1]} selected />
        <TabOption name={names[2]} />
      </TabBar>
    );
    var list = TestUtils.findRenderedDOMComponentWithTag(tabBar, 'ul');
    var items = TestUtils.scryRenderedDOMComponentsWithTag(tabBar, 'li');

    var selectedItemStyle = Object.assign({}, Styles.TabBar.item.base, Styles.TabBar.item.selected);
    expect(list.props.style).to.eql(Styles.TabBar.list.base);
    expect(items[0].props.style).to.eql(Styles.TabBar.item.base);
    expect(items[1].props.style).to.eql(Styles.TabBar.item.base);
    expect(items[2].props.style).to.eql(Styles.TabBar.item.base);
  });
});