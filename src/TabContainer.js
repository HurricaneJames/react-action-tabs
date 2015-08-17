import React from 'react';
import { indexOf, filter } from './compat';

import TabBar from './TabBar';
import TabPanel from './TabPanel';

var TabContainer = React.createClass({
  displayName: 'TabContainer',
  propTypes: {
    active: React.PropTypes.arrayOf(React.PropTypes.string),
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.arrayOf(React.PropTypes.element)])
  },
  isSelected: function(name) {
    return indexOf(this.props.active || [], name) > -1;
  },
  getValidChildren: function() {
    var children = {
      bar: undefined,
      panels: [],
    };
    React.Children.forEach(this.props.children, (child) => {
      if(child.type === TabBar) {
        children.bar = child;
      }
      if(child.type === TabPanel) {
        children.panels.push(child);
      }
    });
    return children;
  },
  getVisiblePanels: function(active, panels) {
    return filter(panels, (i) => this.isSelected(i.props.name));
  },
  render: function() {
    var children = this.getValidChildren();
    return (
      <div className={this.props.className} style={this.props.style}>
        { children.bar && React.cloneElement(children.bar, { active: this.props.active }) }
        { this.getVisiblePanels(this.props.active, children.panels) }
      </div>
    );
  }
});

export default TabContainer;