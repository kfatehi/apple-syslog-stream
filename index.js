var spawn = require('child_process').spawn;
var parseLine = require('./parser')();
var lineSplit = require('split');
var through = require('through');
var Combine = require('stream-combiner');

module.exports = {
  spawn: function(opts) {
    var DEFAULT_ARGS = ['-F', 'raw'];
    var opts = opts || {};
    var args = opts.args || [];
    return spawn(
      '/usr/bin/syslog',
      args.concat(DEFAULT_ARGS)
    );
  },
  parser: function() {
    return Combine(
      lineSplit(),
      through(function(data) {
        this.emit('data', parseLine(data));
      })
    )
  }
}
