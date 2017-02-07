describe('entries', () => {
    const entries = require('../src/entries')

    function generateTestEntries(count) {
        const testEntries = []

        for (let i = 0; i < count; i++) {
            testEntries.push({
                msg: 'entry' + i,
                tags: 'someTags',
                date: new Date()
            })
        }

        return testEntries
    }

    let testEntries;
    beforeEach(() => {
        testEntries = generateTestEntries(3)
        testEntries.forEach((entry) => entries.add(entry));
    })

    describe('add', () => {

        it('throws an error if the given object is not an entry', () => {
            expect(entries.add.bind(null, 'i am not an entry')).toThrowError('Given object is not an entry')
        })

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

    describe('getAfter', () => {

        it('returns all entries sent after the given date', () => {
            const testDate = new Date()
            const testEntry = {
                msg: 'testEntry',
                tags: [],
                date: new Date(testDate.getTime() + 10)
            }

            entries.add(testEntry)
            expect(entries.getAfter(testDate)).toEqual([testEntry])
        })

        it('returns the entries in chronological order', () => {
            const testDate = new Date()
            const testEntries = generateTestEntries(2)
            testEntries.forEach((entry, index) => {
                entry.date = new Date(testDate.getTime() + index + 1)
                entries.add(entry)
            })
            
            expect(entries.getAfter(testDate)).toEqual(testEntries)
        })

    })

    afterEach(() => {
        entries.clear()
    })
    
})