const http = require('http')
const rlog = require('remote-log')

const server = http.createServer((req, res) => {
    fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
})

const log = rlog()
server.on('request', log)

log.send('Hello world!', 'tag')
log.send('Hello world!', 'multiple', 'tags')
log.send('Hello world!', ['tag', 'arrays'])
