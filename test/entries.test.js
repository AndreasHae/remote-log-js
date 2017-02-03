describe('entries', () => {
    const entries = require('../src/entries')

    const testEntries = ['entry1', 'entry2', 'entry3']

    beforeEach(() => {
        testEntries.forEach((entry) => entries.add(entry))
    })

    describe('get', () => {

        it('returns all entries if no parameters are given', () => {
            expect(entries.get()).toEqual(testEntries)
        })

        it('returns a certain amount of entries', () => {
            expect(entries.get(2)).toEqual(testEntries.slice(1, 3))
        })

        it('returns an offset amount of entries', () => {
            expect(entries.get(2, 1)).toEqual(testEntries.slice(0, 2))
        })

        it('returns all entries if the given amount is 0', () => {
            expect(entries.get(0)).toEqual(testEntries)
        })

        it('returns all entries with an offset', () => {
            expect(entries.get(0, 1)).toEqual(testEntries.slice(0, 2))
        })

    })

    afterEach(() => {
        entries.clear()
    })
    
})