const connect = require('connect')
const serveStatic = require('serve-static')
const rlog = require('../src/backend')

const app = connect()
app.use(serveStatic('.', {root: ['index.html']}))
app.use(serveStatic('../src'))

const log = rlog('/rlog')
app.use(log)

log.send('Hello world!', 'tag')
log.send('Hello world!', 'multiple', 'tags')
log.send('Hello world!', ['tag', 'arrays'])

app.listen(80)