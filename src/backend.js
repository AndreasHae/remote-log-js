let entries = []

function flatten(arr) {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
    }, [])
}

function createHandler(options) {
    options = options || {}
    const url = options.url || '/rlog'

    handler = (req, res, next) => {
        if (!(req.method === 'GET' && req.url === '/rlog')) {
            if (next) {
                next()
            } else {
                return;
            }
        }

        const serializedEntries = JSON.stringify(entries)
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Content-Length', Buffer.byteLength(serializedEntries))
        res.writeHead(200)
        res.write(serializedEntries)
        res.end('ok')
    }

    handler.send = (msg, ...tags) => {
        entries.push({
            msg: msg,
            tags: flatten(tags),
            date: new Date().getTime()
        })
    }

    return handler
}

module.exports = createHandler