// Class counter
function Counter(data) {
    var _default = {
        fps: 30,
        from: 1000,
        time: 50000,
    }

    for (var attr in _default) {
        if (typeof data[attr] === 'undefined') {
            data[attr] = _default[attr];
        }
    }

    if (typeof data.to === 'undefined')
        return;

    data.fps = typeof data.fps === 'undefined' ? 20 : parseInt(data.fps);
    data.from = typeof data.from === 'undefined' ? 0 : parseFloat(data.from);

    var frames = data.time / data.fps,
        inc = (data.to - data.from) / frames,
        val = data.from;

    if (typeof data.start === 'function') {
        data.start(data.from, data)
    }
    var interval = setInterval(function() {
        frames--;
        val += inc;

        if (val >= data.to) {
            if (typeof data.complete === 'function') {
                console.log('complete');
                data.complete(data.to, data)
            }
            console.log(interval);
            clearInterval(interval);
        } else if (typeof data.progress === 'function') {
            data.progress(val, data)
        }
    }, data.fps);
}

// Auto-counter from HTML API
var counters = document.getElementsByClassName('counter'),
    print = function(val, data) {
        data.element.innerHTML = val;
    }

for (var i = 0, l = counters.length; i < l; i++) {
    // Loads from HTML dataset
    var data = {};
    for (var attr in counters[i].dataset) {
        data[attr] = counters[i].dataset[attr];
    }

    // Save element and callbacks
    data.element = counters[i];
    data.start = print;
    data.progress = print;
    data.complete = print;

    // Creates the counter
    new Counter(data);
}

// slider
const mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 10,
    breakpoints: {
        1600: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});