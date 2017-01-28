var rlog = rlog || (function () {
    var entries = [
        {
            date: new Date(2017, 0, 1, 13, 30, 23),
            tags: ['Tag'],
            msg: 'This is a message'
        },
        {
            date: new Date().getTime(),
            tags: ['Multiple', 'Tags'],
            msg: 'Lorem Ipsum dolor sit amet'
        }
    ]

    function formatDate(date) {
        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun",
            "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec"
        ];

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

    return function (el, host, options) {
        var elements = document.querySelectorAll(el)
        
        entries.forEach((entry) => {
            var entryDiv = document.createElement('div')
            entryDiv.classList.add('entry')

            var dateSpan = document.createElement('span')
            dateSpan.classList.add('date')
            dateSpan.innerText = formatDate(new Date(entry.date))

            entryDiv.appendChild(dateSpan)

            entry.tags.forEach((tag) => {
                var tagSpan = document.createElement('span')
                tagSpan.classList.add('tag')
                tagSpan.innerText = tag
                entryDiv.appendChild(tagSpan)
            })

            var msgSpan = document.createElement('span')
            msgSpan.classList.add('msg')
            msgSpan.innerText = entry.msg
            entryDiv.appendChild(msgSpan)

            for (var i = 0; i < elements.length; i++) {
                elements[i].appendChild(entryDiv)
            }
        })
    }
})()