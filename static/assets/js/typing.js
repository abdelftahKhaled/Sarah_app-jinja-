var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
    return typeof a
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
};
! function(a, b) {
    "function" == typeof define && define.amd ? define([], b) : "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? module.exports = {
        init: b.init
    } : a.ityped = b
}(this, function(a) {
    function b(a) {
        var b = a;
        return b.strings = a.strings || ["Put you string here...", "and Enjoy!"], b.typeSpeed = a.typeSpeed || 100, b.backSpeed = a.backSpeed || 50, b.backDelay = a.backDelay || 500, b.startDelay = a.startDelay || 500, b.showCursor = a.showCursor, b.loop = a.loop || !1, void 0 === b.showCursor && (b.showCursor = !0), b.showCursor && j.insertAdjacentElement("afterend", l), void 0 !== b.cursorChar && (l.textContent = b.cursorChar), Promise.resolve(b)
    }

    function c(a, c) {
        j = document.querySelector(a), b(c).then(function(a) {
            k = a;
            var b = k.strings;
            b.length;
            d(b)
        })
    }

    function d(a) {
        forEach(a, function(b, c, d) {
            var e = k.typeSpeed * b.length - 1;
            k.backSpeed < k.typeSpeed ? e -= (k.typeSpeed - k.backSpeed) * b.length : k.typeSpeed - k.backSpeed && (e += (k.backSpeed - k.typeSpeed) * b.length);
            var f = this.async(),
                h = a.length;
            g(j, b, c, h).then(function() {
                setTimeout(function() {
                    f()
                }, e)
            })
        }, function() {
            k.loop && d(a)
        })
    }

    function e(a, b) {
        return new Promise(function(c, d) {
            for (var e = function(d) {
                    count = 0;
                    var e = d,
                        g = b.length;
                    setTimeout(function(d) {
                        f(a, b.charAt(e)), count++, count === g - 1 && c()
                    }, k.typeSpeed * d)
                }, g = 0; g < b.length; g++) e(g)
        })
    }

    function f(a, b) {
        a.innerHTML += b
    }

    function g(a, b, c, d) {
        return new Promise(function(f, g) {
            e(a, b).then(function() {
                setTimeout(function() {
                    i(a, b, c, d).then(function() {
                        setTimeout(function() {
                            f()
                        }, k.startDelay)
                    })
                }, k.backDelay)
            })
        })
    }

    function h(a, b, c, d) {
        for (var e = function() {
                var e = f,
                    g = c;
                setTimeout(function(f) {
                    a.innerHTML = b.substring(0, c - e), g--, 1 === e && d()
                }, k.backSpeed * f)
            }, f = c; f > 0; f--) e()
    }

    function i(a, b, c, d) {
        return new Promise(function(e, f) {
            var g = b.length;
            c + 1 === d ? k.loop ? k.loop && h(a, b, g, e) : (void 0 !== k.onFinished && "function" == typeof k.onFinished && k.onFinished(), a.innerHTML = b) : c + 1 !== d && h(a, b, g, e)
        })
    }! function(a) {
        a.forEach = function(a, b, c) {
            var d = -1,
                e = a.length >>> 0;
            ! function f(g) {
                var h, i = g === !1;
                do ++d; while (!(d in a) && d !== e);
                return i || d === e ? void(c && c(!i, a)) : (g = b.call({
                    async: function() {
                        return h = !0, f
                    }
                }, a[d], d, a), void(h || f(g)))
            }()
        }
    }("object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && exports || a);
    var j = void 0,
        k = void 0,
        l = document.createElement("span");
    return l.classList.add("ityped-cursor"), l.textContent = " ", {
        init: c
    }
}(this));