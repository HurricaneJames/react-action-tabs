import React, { Component } from 'react';
import Styles from './Styles';

const style = Styles.TabOption;

var TabOption = React.createClass({
  displayName: 'TabOption',
  propTypes: {
    name: React.PropTypes.string.isRequired,
    action: React.PropTypes.func,
    selected: React.PropTypes.bool,
    noActivePassthrough: React.PropTypes.bool,
    children: React.PropTypes.element
  },
  getBaseStyles: function() {
    return Styles.merge([style.base, this.props.selected && style.selected ]);
  },
  onClick: function() {
    var child;
    if(this.props.action) { this.props.action.apply(null, arguments); }
    if((child = React.Children.only(this.props.children)) && child.props.onClick) {
      child.props.onClick.apply(null, arguments);
    }
  },
  renderChild: function() {
    var child = React.Children.only(this.props.children);
    var childProps = {
      style: Styles.merge([this.getBaseStyles(), child.props.style]),
      onClick: this.onClick
    };
    if(this.props.selected && !this.props.noActivePassthrough) { childProps.active = true; }
    return React.cloneElement(child, childProps);
  },
  render: function() {
    return (
      (React.Children.count(this.props.children) > 0 && this.renderChild()) ||
      <div onClick={this.props.action} style={this.getBaseStyles()}>{this.props.name}</div>
    );
  }
});

export default TabOption;