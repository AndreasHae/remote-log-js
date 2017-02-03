let entries = []

module.exports = {
    add(entry) {
        entries.push(entry)
    },

    get(count, offset) {
        count = count || entries.length
        offset = offset || 0

        if (count > entries.length) {
            count = entries.length
        }

        if (count + offset > entries.length) {
            count = entries.length - offset
        }

        return entries.slice(entries.length - count - offset, entries.length - offset)
    },

    clear() {
        entries = []
    }
}