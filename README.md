# remote-log-js (WORK IN PROGRESS)

A simple library for displaying a real-time server log in the browser. It is built to be
compatible with Connect, Express and plain old http.Server.

## How to use it with Connect

```Javascript
const connect = require('connect');
const rlog = require('../src/index');

const app = connect();

// Create new log instance at path '/rlog'
const log = rlog('/rlog');
// Use log instance with Connect
app.use(log);

// Add log entry to log
log.add('Hello world!', 'tag');
log.add('Hello world!', 'multiple', 'tags');
log.add('Hello world!', ['tag', 'arrays']);

// Remove all entries from log
log.clear();

app.listen(80);
```

## How to use it with Express

```Javascript
// TODO
```

## How to use it with http.Server

```Javascript
// TODO
```