import React from 'react';
import Styles from './Styles';

const defaultStyle = Styles.TabOption;

var TabOption = React.createClass({
  displayName: 'TabOption',
  propTypes: {
    name: React.PropTypes.string.isRequired,
    action: React.PropTypes.func,
    className: React.PropTypes.string,
    selected: React.PropTypes.bool,
    style: React.PropTypes.object,
    noActivePassthrough: React.PropTypes.bool,
    children: React.PropTypes.element
  },
  getBaseStyles: function() {
    return this.props.style || Styles.merge([defaultStyle.base, this.props.selected && defaultStyle.selected ]);
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
    var childProps = {};
    if(this.props.selected && !this.props.noActivePassthrough) { childProps.active = true; }
    return React.cloneElement(child, childProps);
  },
  render: function() {
    return (
      <li className={this.props.className} style={this.getBaseStyles()} onClick={this.props.action}>
        {
          (React.Children.count(this.props.children) > 0 && this.renderChild()) ||
          this.props.name
        }
      </li>
    );
  }
});

export default TabOption;