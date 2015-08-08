import React, { Component } from 'react';
import { TabWidget, TabContainer, TabBar, TabOption, TabPanel } from './ActionTabs';

var Xyz = React.createClass({
  displayName: 'Xyz',
  propTypes: {
    active: React.PropTypes.bool,
    children: React.PropTypes.any
  },
  render: function() {
    var style = {};
    if(this.props.active) {
      style.borderRight = '1px solid green';
      style.borderBottom = '1px solid red';
    }
    return <span style={style}>{this.props.children}</span>;
  }
});

export default class App extends Component {
  render() {
    return (
      <TabWidget>
        <TabBar>
          <TabOption name="abc" action={function() { console.debug('action'); }} />
          <TabOption name="xyz">
            <span><span className='fi-plus'>&nbsp;</span>Plus</span>
          </TabOption>
          <TabOption name="click" />
          <TabOption name='xyzzy' action={function() { console.debug('xyzzy'); }} >
            <Xyz>{'Cannot Click [Xyz]'}</Xyz>
          </TabOption>
        </TabBar>
        <TabPanel name="abc">
          <div>Hello I'm Here</div>
        </TabPanel>
        <TabPanel name="xyz">
          <div>XYZ Content</div>
        </TabPanel>
      </TabWidget>
    );
  }
}

App.displayName = 'App';
