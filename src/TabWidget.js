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
      selected: []
    };
  },
  onAction: function(option) {
    if(option.props.action) {
      option.props.action.apply(null, Array.prototype.slice.call(arguments, 1));
    }
    var selected = this.state.selected;
    var optionIndex = indexOf(selected, option.props.name);
    var alreadySelected = optionIndex > -1;
    if(this.props.allowMultiplePanels && !option.props.hideOtherPanels) {
      if(alreadySelected) {
        if(option.props.toggle) {
          selected.splice(optionIndex, 1);
          this.setState({
            selected: selected
          });
        }
      }else {
        this.setState({
          selected: selected.concat(option.props.name)
        });
      }
    }else {
      this.setState({
        selected: alreadySelected && option.props.toggle ? [] : [ option.props.name ]
      });
    }
  },
  getOptionsFromTabBar: function(bar) {
    var options = [];
    React.Children.forEach(bar.props.children, (child) => {
      if(child.type === TabOption) {
        options.push(React.cloneElement(child, { action: this.onAction.bind(null, child) }));
      }
    });
    return options;
  },
  getContainerElements: function() {
    return React.Children.map(this.props.children, (child) => {
      if(child.type === TabBar) {
        return React.cloneElement(child, {}, this.getOptionsFromTabBar(child));
      }
      return child;
    }, this);
  },
  render: function() {
    return (
      <TabContainer
        className={this.props.className}
        selected={this.state.selected}
        style={this.props.style}
      >
        { this.getContainerElements() }
      </TabContainer>
    );
  }
});

export default TabWidget;