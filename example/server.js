const connect = require('connect')
const serveStatic = require('serve-static')
const rlog = require('../src/backend')

const app = connect()
app.use(serveStatic('.', {root: ['index.html']}))
app.use(serveStatic('../src'))

const log = rlog('/rlog')
app.use(log)

log.send('Hello world!', 'tag')
log.clear()
log.send('Hello world!', 'multiple', 'tags')
log.send('Hello world!', ['tag', 'arrays'])
setInterval(() => log.send('Hi', 'tag'), 4000)
app.listen(80)