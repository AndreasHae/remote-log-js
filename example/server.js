const connect = require('connect')
const serveStatic = require('serve-static')
const rlog = require('../src/index')

const app = connect()
app.use(serveStatic('.', {root: ['index.html']}))
app.use(serveStatic('../src'))

const log = rlog('/rlog')
app.use(log)

log.add('Hello world!', 'tag')
log.clear()
log.add('Hello world!', 'multiple', 'tags')
log.add('Hello world!', ['tag', 'arrays'])
setInterval(() => log.add('Hi', 'tag'), 4000)
app.listen(80)