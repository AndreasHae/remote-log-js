var rlog = rlog || function (el, host, options) {

    /* Initially, request as many entries as needed to fill the log div
     * After that, only get the changes eg. new entries, deleted entries etc.
     * If someone scrolls up, request more entries
     * This could be done by querying messages dated before the earliest message that is already being displayed
     */

    var logElements = document.querySelectorAll(el)
    var entryElements = []

    refresh()
    setInterval(refresh, options.wait || 0)

    function refresh() {
        // This assumes that the request will not fail
        // TODO: add error handling in case of connection failure
        var entries = requestEntries(0, 0, function (entries) {
            entryElements.forEach(function (element) { element.remove() })
            entryElements = []
            entries.forEach(function (entry) { entryElements.push(addToUI(entry)) })
        })
    }

    function requestEntries(count, offset, callback) {
        count = count || 0
        offset = offset || 0

        var req = new XMLHttpRequest()
        req.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                if (this.status === 200) {
                    callback(JSON.parse(req.responseText))
                }
                // TODO: add further error handling
            }
        }
        var url = host + '?count=' + count + '&offset=' + offset
        req.open('GET', url, true)
        req.send()
    }

    function addToUI(entryObj) {
        var entryDiv = document.createElement('div')
        entryDiv.classList.add('entry')

        var dateSpan = document.createElement('span')
        dateSpan.classList.add('date')
        dateSpan.innerText = formatDate(new Date(entryObj.date))

        entryDiv.appendChild(dateSpan)

        entryObj.tags.forEach(function (tag) {
            var tagSpan = document.createElement('span')
            tagSpan.classList.add('tag')
            tagSpan.innerText = tag
            entryDiv.appendChild(tagSpan)
        })

        var msgSpan = document.createElement('span')
        msgSpan.classList.add('msg')
        msgSpan.innerText = entryObj.msg
        entryDiv.appendChild(msgSpan)

        for (var i = 0; i < logElements.length; i++) {
            logElements[i].appendChild(entryDiv)
        }

        return entryDiv
    }

    function formatDate(date) {
        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun",
            "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec"
        ]

        function leftPad(num) {
            if (num < 10) {
                return '0' + num
            } else {
                return num
            }
        }

        return leftPad(date.getDate())
            + ' ' + monthNames[date.getMonth()]
            + ' ' + leftPad(date.getHours())
            + ':' + leftPad(date.getMinutes())
            + ':' + leftPad(date.getSeconds())
    }
}