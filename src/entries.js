let entries = []

module.exports = {
    add(entry) {
        entries.push(entry)
    },

    get() {
        return entries
    },

    getAfter(date, count) {
        const result = []
        entries.forEach((entry) => {
            if (entry.date > date) {
                result.push(entry)
            }
        })

        if (count) {
            return result.slice(0, count)
        } else {
            return result
        }
    },

    getBefore(date, count) {
        const result = []

        entries.forEach((entry) => {
            if (entry.date < date) {
                result.push(entry)
            }
        })

        if (count) {
            return result.slice(result.length - count, result.length)
        } else {
            return result
        }
    },

    clear() {
        entries = []
    }
}