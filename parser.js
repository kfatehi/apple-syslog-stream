module.exports = function() {
  var pattern = /^([A-Z]{1}[a-z]{2})\s\s?(\d{1,2})\s(\d\d:\d\d:\d\d)\s/;

  function cutFirstChar(str) {
    return str.split('').splice(1, str.length).join('');
  }

  function cutLastChar(str) {
    return str.split('').splice(0, str.length-1).join('');
  }

  return function parseLine(line) {
    var initialState = { result: {} };
    var items = ('] '+line).split(/\]\s\[([A-Z]{1}[A-z]+)\s/g);
    return items.reduce(function(state, item, i) {
      if ( i === 0 ) return state; // skip first, it's an empty string
      if (i % 2 == 1) { // it's a key
        var key = item.replace(/\] \[/g, '').trim();
        return Object.assign({}, state, { key });
      } else if (state.key) { // it's a value with a known key
        var kvObj = {};
        kvObj[state.key] = item;
        return { result: Object.assign({}, state.result, kvObj) }
      }
      return state;
    }, initialState).result;
  }
}
