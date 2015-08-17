import React from 'react';
import Styles from './Styles';
import TabOption from './TabOption';

var TabBar = React.createClass({
  displayName: 'TabBar',
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.element),
      React.PropTypes.element
    ]),
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    active: React.PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      active: []
    };
  },
  isOption: function(component) {
    return component.type === TabOption;
  },
  isOptionSelected: function(optionName) {
    var active = this.props.active;
    for(var i = 0, len = active.length; i < len; i++) {
      if(active[i] === optionName) { return true; }
    }
    return false;
  },
  render: function() {
    return (
      <ul style={this.props.style || Styles.TabBar.base} className={this.props.className}>
        {
          React.Children.map(this.props.children, (child) => {
            if(this.isOption(child)) {
              return (
                React.cloneElement(child, this.isOptionSelected(child.props.name) ? { active: true } : {})
              );
            }else {
              return false;
            }
          }, this)
        }
      </ul>
    );
  }
});

export default TabBar;
