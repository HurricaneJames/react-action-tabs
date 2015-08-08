// we need some of these for IE8 compatability
export default {
  isArray: Array && Array.prototype.isArray ? Array.isArray : function(obj) { return Object.prototype.toString.call(obj) === '[object Array]'; },
  indexOf: Array && Array.prototype.indexOf ? function() { return Array.prototype.indexOf.apply(arguments[0], Array.prototype.slice.call(arguments, 1)); } : function(array, search) { for(var i = 0, len = array.length; i < len; i++) { if(array[i] === search) { return i; } } },
  filter:  Array && Array.prototype.filter  ? function() { return Array.prototype.filter.apply(arguments[0], Array.prototype.slice.call(arguments, 1)); }  : function(array, filter) { if(typeof filter !== 'function') { return array; } var results = []; for(var i = 0, len = array.length; i < len; i++) { if(filter(array[i])) { results.push(array[i]); } } }
}
