import React from 'react';

var TabPanel = React.createClass({
  displayName: 'TabPanel',
  propTypes: {
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    children: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.arrayOf(React.PropTypes.element)
    ])
  },
  render: function() {
    return (
      <div className={this.props.className} style={this.props.style}>
        {
          this.props.children
        }
      </div>
    );
  }

});

export default TabPanel;