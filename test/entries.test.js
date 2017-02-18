describe('entries', () => {
    const entries = require('../src/entries')

    function generateTestEntries(count) {
        const testEntries = []

        for (let i = 0; i < count; i++) {
            testEntries.push({
                msg: 'entry' + i,
                tags: 'someTags',
                date: new Date().getTime()
            })
        }

        return testEntries
    }

    let testEntries;
    beforeEach(() => {
        testEntries = generateTestEntries(3)
        testEntries.forEach((entry) => entries.add(entry));
    })

    describe('get', () => {

        it('returns all entries', () => {
            expect(entries.get()).toEqual(testEntries)
        })

    })

    describe('getBefore', () => {
        
        it('returns all entries before the given date', () => {
            const newEntries = generateTestEntries(3)
            const date = newEntries[0].date + 10
            expect(entries.getBefore(date)).toEqual(newEntries)
        })

        it('returns the given number of entries before the given date', () => {
            const newEntries = generateTestEntries(3)
            const date = newEntries[0].date + 10
            const count = 2
            // returns in chronological order, hence slice(1, 3)
            expect(entries.getBefore(date, count)).toEqual(newEntries.slice(1, 3))
        })

    })

    describe('getAfter', () => {
        
        it('returns all entries after the given date', () => {
            const newEntries = generateTestEntries(3)
            const date = newEntries[0].date - 10
            expect(entries.getAfter(date)).toEqual(newEntries)
        })

        it('returns the given number of entries after the given date', () => {
            const newEntries = generateTestEntries(3)
            const date = newEntries[0].date - 10
            expect(entries.getAfter(date, 2)).toEqual(newEntries.slice(0, 2))
        })

    })

    afterEach(() => {
        entries.clear()
    })
    
})