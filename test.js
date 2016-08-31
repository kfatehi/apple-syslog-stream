var appleSyslog = require('./index.js');

var proc = appleSyslog.spawn({
  args: ['-w', 10]
});

proc.stdout.pipe(appleSyslog.parser()).on('data', function(data) {
  console.log(data);
});
