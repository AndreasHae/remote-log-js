let entries = []

module.exports = {
    add(entry) {
        if (entry.hasOwnProperty('date')
         && entry.hasOwnProperty('tags')
         && entry.hasOwnProperty('msg')) {
            entries.push(entry)
        } else {
            throw new Error('Given object is not an entry')
        }
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

    getAfter(date) {
        const result = []

        // Iterating in reverse because it likely takes less iterations
        for (let i = entries.length - 1; i >= 0; i--) {
            if (date.getTime() < entries[i].date.getTime()) {
                result.push(entries[i])
            }
        }
        // Reversing array so it is in chronological order
        return result.reverse()
    },

    clear() {
        entries = []
    }
}