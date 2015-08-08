import { isArray } from './compat';

var mergeStyles = function() {
  var styles = arguments[0];
  if(!styles || styles.length === 0) { return {}; }
  var mergedStyles = {};
  for(var i = 0, len = styles.length; i < len; i++) {
    var styleSet = styles[i];
    if(typeof styleSet === 'object') {
      for(var style in styleSet) {
        if(styleSet.hasOwnProperty(style)) {
          mergedStyles[style] = styleSet[style];
        }
      }
    }
  }
  return mergedStyles;
};
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
    item: {
      base: {
        display: 'inline'
      },
      selected: {
        borderBottom: '1px solid #ccccdd'
      }
    },
    list: {
      base: {
        listStyleType: 'none',
        textAlign: 'center',
        margin: 0,
        padding: 0
      }
    }
  },
  TabOption: {
    base: {
      margin: '0 5px',
      display: 'inline'
    },
    selected: {}
  }
};