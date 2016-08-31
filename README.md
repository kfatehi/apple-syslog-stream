# apple-syslog-stream

Provides a stream parser for Apple Syslog.

## Usage

**test.js**
```
var appleSyslog = require('./index.js');

var proc = appleSyslog.spawn({
  args: ['-w', 10]
});

proc.stdout.pipe(appleSyslog.parser()).on('data', function(data) {
  console.log(data);
});
```

the `data` looks like this

```
{ ASLMessageID: '1324674',
  Time: '1472683571',
  TimeNanoSec: '277591000',
  Level: '5',
  PID: '81',
  UID: '0',
  GID: '0',
  ReadGID: '80',
  Host: 'dhcp-v016-188',
  Sender: 'launchservicesd',
  Facility: 'kern',
  Message: 'SecTaskLoadEntitlements failed error=22',
  ASLSHIM: '2',
  SenderMachUUID: 'blablalba' }
```

* the `data` event gets fired for every new log line, with a parsed object like the above
* the `args` passed into `spawn` can be can be any of those that `syslog` will accept.
* `-w 10` is the option that makes `syslog` stay running, watching for any changes, pushing them to stdout.
* of course parsing that into a stream of objects is the other concern taken care of by this lib
* the `10` there is actually the default behavior (show me the last 10 lines immediately upon starting). you can make this like 100 or 1000 to go back in time or w/e
* you can also just leave off the `args` or just dont pass anything into `spawn` to get the entire syslog available; in this case the program will exit (only `-w` will keep it open)
