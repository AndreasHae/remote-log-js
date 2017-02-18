const url = require('url')
const flatten = require('flatten')
const Entries = require('./Entries')

function createHandler(path) {
    handler = (req, res, next) => {
        if (req.method === 'GET' && req.url.startsWith(path)) {
            /* [] = optional
             *
             * /entries
             *   /all
             *     -> returns all entries
             *   /before?date=num[&count=num]
             *     -> returns all entries or a given number of entries before the given date
             *   /after?date=num[&count=num]
             *     -> returns all entries or a given number of entries after the given date
             */

            const actions = {
                '/all': (params) => {
                    const entries = JSON.stringify(Entries.get())
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(entries)
                    })
                    res.write(entries)
                },
                '/before': (params) => {
                    const entries = JSON.stringify(Entries.getBefore(params.date, params.count))
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(entries)
                    })
                    res.write(entries)
                },
                '/after': (params) => {
                    const entries = JSON.stringify(Entries.getAfter(params.date, params.count))
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(entries)
                    })
                    res.write(entries)
                }
            }

            const localUrl = url.parse(req.url.split(path)[1], true)
            if (actions.hasOwnProperty(localUrl.pathname)) {
                actions[localUrl.pathname](localUrl.query)
            } else {
                res.writeHead(404)
            }
            res.end()

        } else if (next) {
            next()
        }
    }

    handler.add = (msg, ...tags) => {
        Entries.add({
            msg: msg,
            tags: flatten(tags),
            date: new Date().getTime()
        })
    }

    handler.clear = () => {
        Entries.clear()
    }

    return handler
}

module.exports = createHandler