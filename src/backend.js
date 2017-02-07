const querystring = require('querystring')
const url = require('url')

const flatten = require('flatten')

const entries = require('./entries')

function getParams(urlStr) {
    const parsedUrl = url.parse(urlStr)

    if (parsedUrl.query) {
        const query = querystring.parse(parsedUrl.query, null, null, { maxKeys: 2 })
        const count = parseInt(query.count)
        const offset = parseInt(query.offset)

        if ((!isNaN(count) && count >= 0) || (!isNaN(offset) && offset >= 0)) {
            return {
                count: count,
                offset: offset
            }
        } else {
            return undefined
        }
    } else {
        return null
    }
}

function createHandler(path) {
    handler = (req, res, next) => {
        if (req.method === 'GET' && url.parse(req.url).pathname === path) {

            const params = getParams(req.url)

            if (params) {
                const serializedEntries = JSON.stringify(entries.get(params.count, params.offset))
                res.setHeader('Content-Type', 'text/plain')
                res.setHeader('Content-Length', Buffer.byteLength(serializedEntries))
                res.writeHead(200)
                res.write(serializedEntries)
            } else if (params === null) {
                const serializedEntries = JSON.stringify(entries.get())
                res.setHeader('Content-Type', 'text/plain')
                res.setHeader('Content-Length', Buffer.byteLength(serializedEntries))
                res.writeHead(200)
                res.write(serializedEntries)
            } else if (params === undefined) {
                res.writeHead(400)
            }

            res.end()
        } else if (next) {
            next()
        }
    }

    handler.send = (msg, ...tags) => {
        entries.add({
            msg: msg,
            tags: flatten(tags),
            date: new Date().getTime()
        })
    }

    handler.clear = () => {
        entries.clear()
    }

    return handler
}

module.exports = createHandler