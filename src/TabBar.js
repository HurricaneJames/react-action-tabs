import React from 'react';
import Radium from 'radium';
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
    selected: React.PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      selected: []
    };
  },
  isOption: function(component) {
    return component.type === TabOption;
  },
  isOptionSelected: function(optionName) {
    var selected = this.props.selected;
    for(var i = 0, len = selected.length; i < len; i++) {
      if(selected[i] === optionName) { return true; }
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
                React.cloneElement(child, this.isOptionSelected(child.props.name) ? { selected: true } : {})
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

export default Radium(TabBar);
