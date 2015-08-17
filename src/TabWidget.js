import React from 'react';

import { indexOf } from './compat';

import TabBar from './TabBar';
import TabContainer from './TabContainer';
import TabOption from './TabOption';

var TabWidget = React.createClass({
  displayName: 'TabWidget',
  propTypes: {
    allowMultiplePanels: React.PropTypes.bool,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.arrayOf(React.PropTypes.element)])
  },
  getInitialState: function() {
    return {
      active: []
    };
  },
  onAction: function(option) {
    if(option.props.action) {
      option.props.action.apply(null, Array.prototype.slice.call(arguments, 1));
    }
    var active = this.state.active;
    var optionIndex = indexOf(active, option.props.name);
    var alreadySelected = optionIndex > -1;
    if(this.props.allowMultiplePanels && !option.props.hideOtherPanels) {
      if(alreadySelected) {
        if(option.props.toggle) {
          active.splice(optionIndex, 1);
          this.setState({
            active: active
          });
        }
      }else {
        this.setState({
          active: active.concat(option.props.name)
        });
      }
    }else {
      this.setState({
        active: alreadySelected && option.props.toggle ? [] : [ option.props.name ]
      });
    }
  },
  getOptionsFromTabBar: function(bar) {
    var options = [];
    React.Children.forEach(bar.props.children, (child) => {
      if(child.type === TabOption) {
        options.push(React.cloneElement(child, { key: child.key || child.props.name, action: this.onAction.bind(null, child) }));
      }
    });
    return options;
  },
  getTabBarElement: function(originalBarElement) {
    return React.cloneElement(originalBarElement, { key: originalBarElement.key || 'tabbar' }, this.getOptionsFromTabBar(originalBarElement));
  },
  getContainerElements: function() {
    var containerElements = [];
    React.Children.forEach(this.props.children, (child) => {
      containerElements.push(
        child.type === TabBar ?
        this.getTabBarElement(child) :
        React.cloneElement(child, { key: child.key || child.props.name })
      );
    }, this);
    return containerElements;
  },
  render: function() {
    return (
      <TabContainer
        className={this.props.className}
        active={this.state.active}
        style={this.props.style}
      >
        { this.getContainerElements() }
      </TabContainer>
    );
  }
});

export default TabWidget;