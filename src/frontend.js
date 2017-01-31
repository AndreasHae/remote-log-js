var rlog = rlog || function (el, host, options) {
    
    var logElements = document.querySelectorAll(el)

    /* Initially, request as many entries as needed to fill the log div
     * After that, only get the changes eg. new entries, deleted entries etc.
     * If someone scrolls up, request more entries
     * This could be done by querying messages dated before the earliest message that is already being displayed
     */

    refreshEntries()
    //setInterval(refreshEntries, options.wait || 0)

    var Log = (function () {
        var entries = []

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

        function flatten(arr) {
            return arr.reduce(function (flat, toFlatten) {
                return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
            }, [])
        }

        return {
            add: function (entry) {
                var entryDiv = document.createElement('div')
                entryDiv.classList.add('entry')

                var dateSpan = document.createElement('span')
                dateSpan.classList.add('date')
                dateSpan.innerText = formatDate(new Date(entry.date))

                entryDiv.appendChild(dateSpan)

                entry.tags.forEach(function (tag) {
                    var tagSpan = document.createElement('span')
                    tagSpan.classList.add('tag')
                    tagSpan.innerText = tag
                    entryDiv.appendChild(tagSpan)
                })

                var msgSpan = document.createElement('span')
                msgSpan.classList.add('msg')
                msgSpan.innerText = entry.msg
                entryDiv.appendChild(msgSpan)

                for (var i = 0; i < logElements.length; i++) {
                    logElements[i].appendChild(entryDiv)
                }

                entries.push(entryDiv)
            },

            clear: function () {
                entries.forEach(function (element) { element.remove() })
                entries = []
            }
        }
    })()

    function refreshEntries() {
        var request = new XMLHttpRequest()
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                Log.clear()
                entries = JSON.parse(request.responseText)
                entries.forEach(function (entry) { Log.add(entry) })
            }
        }
        request.open('GET', host, true)
        request.send()
    }
}