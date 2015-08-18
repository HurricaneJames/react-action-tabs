import { isArray } from './compat';

var merge = function() {
  var currentStyle
    , mergedStyles = {};
  for(var i = 0, len = arguments.length; i < len; i++) {
    currentStyle = arguments[i];
    if(isArray(currentStyle)) { currentStyle = merge.apply(null, currentStyle); }
    if(typeof currentStyle === 'object') {
      for(var style in currentStyle) {
        if(currentStyle.hasOwnProperty(style)) {
          mergedStyles[style] = currentStyle[style];
        }
      }
    }
  }
  return mergedStyles;
};

export default {
  merge: merge,
  TabBar: {
    base: {
      listStyleType: 'none',
      textAlign: 'center',
      margin: 0,
      padding: 0
    }
  },
  TabOption: {
    base: {
      margin: '0 5px',
      display: 'inline'
    },
    active: {
      borderRadius: 15,
      borderBottom: '3px solid #ff0000'
    },
    link: {
      textDecoration: 'inherit',
      color: 'inherit'
    }
  }
};