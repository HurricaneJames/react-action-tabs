import React from 'react';

var TabPanel = React.createClass({
  displayName: 'TabPanel',
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.arrayOf(React.PropTypes.element)
    ])
  },
  render: function() {
    return (
      <div>
        {
          this.props.children
        }
      </div>
    );
  }

});

export default TabPanel;