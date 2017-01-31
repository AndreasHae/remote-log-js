let entries = []

function flatten(arr) {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
    }, [])
}

function createHandler(url) {
    handler = (req, res, next) => {
        if (!(req.method === 'GET' && (url === undefined || req.url === url))) {
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

    handler.clear = () => {
        entries = []
    }

    return handler
}

module.exports = createHandler