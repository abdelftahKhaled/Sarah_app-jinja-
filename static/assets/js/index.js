document.addEventListener("DOMContentLoaded", function() {
        function b(a) {
            for (var b = 0, c = 0; a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop);) b += a.offsetLeft - a.scrollLeft, c += a.offsetTop - a.scrollTop, a = a.offsetParent;
            return {
                top: c,
                left: b
            }
        }

        function c(a, b) {
            if (a) {
                "string" === typeof a ? a = document.querySelectorAll(a) : a.tagName && (a = [a]);
                for (var c = 0; c < a.length; c++)(" " + a[c].className + " ").indexOf(" " + b + " ") < 0 && (a[c].className += " " + b)
            }
        }

        function d(a, b) {
            if (a) {
                "string" === typeof a ? a = document.querySelectorAll(a) : a.tagName && (a = [a]);
                for (var c = new RegExp("(^| )" + b + "($| )", "g"), d = 0; d < a.length; d++) a[d].className = a[d].className.replace(c, " ")
            }
        }
        var a = window.pageYOffset || document.documentElement.scrollTop;
        if (window.onresize = function() {
                a = window.pageYOffset || document.documentElement.scrollTop
            }, "querySelector" in document && "addEventListener" in window && Array.prototype.forEach) {
            var e = function(a, b) {
                    var g, c = window.pageYOffset,
                        d = a.offsetTop - 40,
                        e = d - c,
                        f = e / (b / 16),
                        h = function() {
                            window.scrollBy(0, f), g()
                        };
                    f >= 0 && (g = function() {
                        var a = window.pageYOffset;
                        (a >= d - f || window.innerHeight + a >= document.body.offsetHeight) && clearInterval(i)
                    });
                    var i = setInterval(h, 16)
                },
                f = document.querySelectorAll(".scroll");
            [].forEach.call(f, function(a) {
                a.addEventListener("click", function(b) {
                    b.preventDefault();
                    var c = document.querySelector(".landing__section"),
                        d = a.getAttribute("data-speed");
                    c && e(c, d || 700)
                }, !1)
            })
        }
        if (window.addEventListener("scroll", function() {
                if (document.body.contains(document.getElementById("navConverter"))) {
                    var a = window.pageYOffset || document.documentElement.scrollTop;
                    a > b(document.getElementById("navConverter")).top - 60 ? d(document.querySelector(".navbar"), "navbar--extended") : c(document.querySelector(".navbar"), "navbar--extended")
                }
                if (document.body.contains(document.getElementById("scrollToNext"))) {
                    var a = window.pageYOffset || document.documentElement.scrollTop;
                    a > 20 ? c(document.getElementById("scrollToNext"), "invisible") : d(document.getElementById("scrollToNext"), "invisible")
                }
            }), document.getElementsByClassName("nav__mobile") && document.getElementsByClassName("nav__mobile").length > 0) {
            var g = document.getElementsByClassName("navbar__menu")[0].innerHTML;
            document.getElementsByClassName("nav__mobile")[0].innerHTML = g; {
                responsiveNav(".nav__mobile", {
                    animate: !0,
                    transition: 284,
                    label: "Menu",
                    insert: "before",
                    customToggle: "toggle",
                    openPos: "relative",
                    navClass: "nav__mobile"
                })
            }
        } else c(document.querySelector(".navbar__menu"), "navbar__menu--noMob"), c(document.querySelector(".navbar__menu-mob"), "navbar__menu-mob--noMob")
    }),
    function(a) {
        if ("object" === typeof exports && "undefined" !== typeof module) module.exports = a();
        else if ("function" === typeof define && define.amd) define([], a);
        else {
            var b;
            b = "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : this, b.flexibility = a()
        }
    }(function() {
        return function d(a, b, c) {
            function e(g, h) {
                if (!b[g]) {
                    if (!a[g]) {
                        var i = "function" == typeof require && require;
                        if (!h && i) return i(g, !0);
                        if (f) return f(g, !0);
                        var j = new Error("Cannot find module '" + g + "'");
                        throw j.code = "MODULE_NOT_FOUND", j
                    }
                    var k = b[g] = {
                        exports: {}
                    };
                    a[g][0].call(k.exports, function(b) {
                        var c = a[g][1][b];
                        return e(c ? c : b)
                    }, k, k.exports, d, a, b, c)
                }
                return b[g].exports
            }
            for (var f = "function" == typeof require && require, g = 0; g < c.length; g++) e(c[g]);
            return e
        }({
            1: [function(a, b) {
                b.exports = function(a) {
                    var b, c;
                    a.lines.length < 2 || "stretch" === a.alignContent ? (c = a.crossSpace / a.lines.length, b = 0, a.lines.forEach(function(a) {
                        a.crossStart = b, a.cross += c, b += a.cross
                    })) : "flex-start" === a.alignContent ? (b = 0, a.lines.forEach(function(a) {
                        a.crossStart = b, b += a.cross
                    })) : "flex-end" === a.alignContent ? (b = a.crossSpace, a.lines.forEach(function(a) {
                        a.crossStart = b, b += a.cross
                    })) : "center" === a.alignContent ? (b = a.crossSpace / 2, a.lines.forEach(function(a) {
                        a.crossStart = b, b += a.cross
                    })) : "space-between" === a.alignContent ? (c = a.crossSpace / (a.lines.length - 1), b = 0, a.lines.forEach(function(a) {
                        a.crossStart = b, b += a.cross + c
                    })) : "space-around" === a.alignContent ? (c = 2 * a.crossSpace / (2 * a.lines.length), b = c / 2, a.lines.forEach(function(a) {
                        a.crossStart = b, b += a.cross + c
                    })) : "stretch" === a.alignContent && (c = a.crossSpace / a.lines.length, b = 0, a.lines.forEach(function(a) {
                        a.crossStart = b, a.cross += c, b += a.cross
                    }))
                }
            }, {}],
            2: [function(a, b) {
                b.exports = function(a) {
                    a.lines.forEach(function(a) {
                        a.children.forEach(function(b) {
                            "flex-start" === b.alignSelf ? b.crossStart = a.crossStart : "flex-end" === b.alignSelf ? b.crossStart = a.crossStart + a.cross - b.crossAround : "center" === b.alignSelf ? b.crossStart = a.crossStart + (a.cross - b.crossAround) / 2 : "stretch" === b.alignSelf && (b.crossStart = a.crossStart, b.crossAround = a.cross)
                        })
                    })
                }
            }, {}],
            3: [function(a, b) {
                b.exports = function(a, b, c) {
                    var d = a.node.getBoundingClientRect();
                    "row" === b || "row-reverse" === b ? (a.mainAxis = "inline", a.crossAxis = "block", ("number" === typeof a.main || "number" === typeof a.cross) && ("row" === a.flexDirection || "row-reverse" === b ? (a.width = a.main, a.height = a.cross) : (a.width = a.cross, a.height = a.main)), a.main = a.width, a.cross = a.height, a.mainClient = d.width || a.node.offsetWidth, a.crossClient = d.height || a.node.offsetHeight, a.mainBefore = a.marginLeft, a.mainAfter = a.marginRight, a.crossBefore = a.marginTop, a.crossAfter = a.marginBottom) : (a.mainAxis = "block", a.crossAxis = "inline", a.main = a.height, a.cross = a.width, ("number" === typeof a.main || "number" === typeof a.cross) && ("column" === a.flexDirection || "column-reverse" === b ? (a.width = a.cross, a.height = a.main) : (a.width = a.main, a.height = a.cross)), a.mainClient = d.height || a.node.offsetHeight, a.crossClient = d.width || a.node.offsetWidth, a.mainBefore = a.marginTop, a.mainAfter = a.marginBottom, a.crossBefore = a.marginLeft, a.crossAfter = a.marginRight), "number" === typeof a.flexBasis && (a.main = a.flexBasis), a.mainAround = "auto" === a.main ? a.mainClient : a.main, a.crossAround = "auto" === a.cross ? a.crossClient : a.cross, "number" === typeof a.mainBefore && (a.mainAround += a.mainBefore), "number" === typeof a.mainAfter && (a.mainAround += a.mainAfter), "number" === typeof a.crossBefore && (a.crossAround += a.crossBefore), "number" === typeof a.crossBefore && (a.crossAround += a.crossBefore), "auto" === a.alignSelf && (a.alignSelf = c)
                }
            }, {}],
            4: [function(a, b) {
                b.exports = function(a) {
                    if (a.mainSpace > 0) {
                        var b = a.children.reduce(function(a, b) {
                            return a + b.flexGrow
                        }, 0);
                        b > 0 && (a.children.forEach(function(c) {
                            c.mainAround += c.flexGrow / b * a.mainSpace
                        }), a.main = a.children.reduce(function(a, b) {
                            return a + b.mainAround
                        }, 0), a.mainSpace = 0)
                    }
                }
            }, {}],
            5: [function(a, b) {
                b.exports = function(a) {
                    if (a.mainSpace < 0) {
                        var b = a.children.reduce(function(a, b) {
                            return a + b.flexShrink
                        }, 0);
                        b > 0 && (a.children.forEach(function(c) {
                            c.mainAround += c.flexShrink / b * a.mainSpace
                        }), a.main = a.children.reduce(function(a, b) {
                            return a + b.mainAround
                        }, 0), a.mainSpace = 0)
                    }
                }
            }, {}],
            6: [function(a, b) {
                b.exports = function(a) {
                    var b;
                    a.lines = [b = {
                        main: 0,
                        cross: 0,
                        children: []
                    }], a.children.forEach(function(c) {
                        "nowrap" === a.flexWrap || 0 === b.children.length || a.mainAround >= b.main + c.mainAround ? (b.main += c.mainAround, b.cross = Math.max(b.cross, c.crossAround)) : a.lines.push(b = {
                            main: c.mainAround,
                            cross: c.crossAround,
                            children: []
                        }), b.children.push(c)
                    })
                }
            }, {}],
            7: [function(a, b) {
                b.exports = function(c) {
                    return c.descendants.forEach(function(a) {
                        b.exports(a)
                    }), "flex" !== c.display ? c : (c.children.forEach(function(b) {
                        a("./flex-direction")(b, c.flexDirection, c.alignItems)
                    }), a("./order")(c), a("./flex-direction")(c, c.flexDirection, c.alignItems), a("./flexbox-lines")(c), "auto" === c.main && (c.main = Math.max(c.mainAround, c.lines.reduce(function(a, b) {
                        return Math.max(a, b.main)
                    }, 0)), c.mainAround = "row" === c.flexDirection ? c.mainClient + c.mainBefore + c.mainAfter : c.main + c.mainBefore + c.mainAfter), "auto" === c.cross ? (c.cross = c.lines.reduce(function(a, b) {
                        return a + b.cross
                    }, 0), c.crossAround = "column" === c.flexDirection ? c.crossClient + c.crossBefore + c.crossAfter : c.cross + c.crossBefore + c.crossAfter, c.crossSpace = c.crossAround - c.cross) : c.crossSpace = c.cross - c.lines.reduce(function(a, b) {
                        return a + b.cross
                    }, 0), a("./align-content")(c), c.lines.forEach(function(b) {
                        b.mainSpace = c.main - b.main, a("./flex-grow")(b), a("./flex-shrink")(b), a("./margin-main")(b), a("./margin-cross")(b), a("./justify-content")(b, c.justifyContent)
                    }), a("./align-items")(c), c)
                }
            }, {
                "./align-content": 1,
                "./align-items": 2,
                "./flex-direction": 3,
                "./flex-grow": 4,
                "./flex-shrink": 5,
                "./flexbox-lines": 6,
                "./justify-content": 8,
                "./margin-cross": 9,
                "./margin-main": 10,
                "./order": 11
            }],
            8: [function(a, b) {
                b.exports = function(a, b) {
                    var c, d;
                    "flex-start" === b ? (c = 0, a.children.forEach(function(a) {
                        a.mainStart = c, c += a.mainAround
                    })) : "flex-end" === b ? (c = a.mainSpace, a.children.forEach(function(a) {
                        a.mainStart = c, c += a.mainAround
                    })) : "center" === b ? (c = a.mainSpace / 2, a.children.forEach(function(a) {
                        a.mainStart = c, c += a.mainAround
                    })) : "space-between" === b ? (d = a.mainSpace / (a.children.length - 1), c = 0, a.children.forEach(function(a) {
                        a.mainStart = c, c += a.mainAround + d
                    })) : "space-around" === b && (d = 2 * a.mainSpace / (2 * a.children.length), c = d / 2, a.children.forEach(function(a) {
                        a.mainStart = c, c += a.mainAround + d
                    }))
                }
            }, {}],
            9: [function(a, b) {
                b.exports = function(a) {
                    a.children.forEach(function(b) {
                        var c = 0;
                        "auto" === b.crossBefore && ++c, "auto" === b.crossAfter && ++c;
                        var d = a.cross - b.crossAround;
                        "auto" === b.crossBefore && (b.crossBefore = d / c, b.crossAround += b.crossBefore), "auto" === b.crossAfter && (b.crossAfter = d / c, b.crossAround += b.crossAfter)
                    })
                }
            }, {}],
            10: [function(a, b) {
                b.exports = function(a) {
                    var b = 0;
                    a.children.forEach(function(a) {
                        "auto" === a.mainBefore && ++b, "auto" === a.mainAfter && ++b
                    }), b > 0 && (a.children.forEach(function(c) {
                        "auto" === c.mainBefore && (c.mainBefore = a.mainSpace / b, c.mainAround += c.mainBefore), "auto" === c.mainAfter && (c.mainAfter = a.mainSpace / b, c.mainAround += c.mainAfter)
                    }), a.mainSpace = 0)
                }
            }, {}],
            11: [function(a, b) {
                b.exports = function(a) {
                    a.children.sort(function(a, b) {
                        return a.order - b.order || a.index - b.index
                    })
                }
            }, {}],
            12: [function(a, b) {
                b.exports = function(a, b, c) {
                    var d = Object.assign(b, {
                        alignContent: "stretch",
                        alignItems: "stretch",
                        alignSelf: "auto",
                        display: "inline",
                        flexBasis: "auto",
                        flexDirection: "row",
                        flexGrow: 0,
                        flexShrink: 1,
                        flexWrap: "nowrap",
                        justifyContent: "flex-start",
                        height: "auto",
                        marginTop: 0,
                        marginRight: 0,
                        marginLeft: 0,
                        marginBottom: 0,
                        maxHeight: "none",
                        maxWidth: "none",
                        minHeight: 0,
                        minWidth: 0,
                        order: 0,
                        position: "static",
                        width: "auto"
                    });
                    a.hasAttribute("data-style") ? a.setAttribute("style", a.getAttribute("data-style")) : a.setAttribute("data-style", a.getAttribute("style") || "");
                    for (var g, e = (a.getAttribute("data-style") || "") + ";" + (a.getAttribute("data-flex") || ""), f = /([^\s:;]+)\s*:\s*([^;]+?)\s*(;|$)/g; g = f.exec(e);) {
                        var h = g[1].toLowerCase().replace(/-[a-z]/g, function(a) {
                            return a.slice(1).toUpperCase()
                        });
                        d[h] = parseFloat(g[2]), isNaN(d[h]) && (d[h] = g[2])
                    }
                    c && (a.style.display = "inline-block", a.style.position = "absolute");
                    var i = a.getBoundingClientRect();
                    return d.clientWidth = i.width || a.offsetWidth, d.clientHeight = i.height || a.offsetHeight, d
                }
            }, {}],
            13: [function(a, b) {
                b.exports = function(a) {
                    var c = b.exports.walk(a),
                        d = b.exports.flexbox(c),
                        e = b.exports.write(d);
                    return e
                }, b.exports.flexbox = a("./flexbox"), b.exports.getFlexStyles = a("./getFlexStyles"), b.exports.walk = a("./walk"), b.exports.write = a("./write")
            }, {
                "./flexbox": 7,
                "./getFlexStyles": 12,
                "./walk": 14,
                "./write": 15
            }],
            14: [function(a, b) {
                var d = a("../getFlexStyles");
                b.exports = function(a, c, e) {
                    var f = /(^|;)\s*display\s*:\s*(inline-)?flex\s*(;|$)/i,
                        g = f.test(a.getAttribute("data-flex")),
                        h = {
                            node: a,
                            children: [],
                            descendants: []
                        };
                    return g && void 0 !== c && c.descendants.push(h), (g || !c) && (c = h), Array.prototype.forEach.call(a.childNodes, function(d) {
                        if (g && 3 === d.nodeType && d.nodeValue.trim()) {
                            var e = d;
                            d = a.insertBefore(document.createElement("flex-item"), e), d.appendChild(e)
                        }
                        if (1 === d.nodeType) {
                            var f = b.exports(d, c, g);
                            g && h.children.push(f)
                        }
                    }), (g || e) && d(a, h, e), h
                }
            }, {
                "../getFlexStyles": 12
            }],
            15: [function(a, b) {
                b.exports = function(a) {
                    if (a.descendants.filter(function(b) {
                            return -1 === a.children.indexOf(b)
                        }).forEach(function(a) {
                            b.exports(a)
                        }), a.display) {
                        var c = a.node.style;
                        "mainStart" in a ? (c.position = "absolute", "inline" === a.mainAxis ? (c.left = a.mainStart + "px", c.top = a.crossStart + "px", c.marginTop = a.crossBefore + "px", c.marginRight = a.mainAfter + "px", c.marginBottom = a.crossAfter + "px", c.marginLeft = a.mainBefore + "px") : (c.left = a.crossStart + "px", c.top = a.mainStart + "px", c.marginTop = a.mainBefore + "px", c.marginRight = a.crossAfter + "px", c.marginBottom = a.mainAfter + "px", c.marginLeft = a.crossBefore + "px"), "inline" === a.mainAxis ? (c.width = a.mainAround - a.mainBefore - a.mainAfter + "px", c.height = a.crossAround - a.crossBefore - a.crossAfter + "px") : (c.width = "auto" === a.cross ? a.crossClient - a.crossBefore - a.crossAfter + "px" : a.crossAround - a.crossBefore - a.crossAfter + "px", c.height = "auto" === a.main ? a.mainClient - a.mainBefore - a.mainAfter + "px" : a.mainAround - a.mainBefore - a.mainAfter + "px")) : (c.position || (c.position = "relative"), "inline" === a.mainAxis ? (c.width = a.mainAround - a.mainBefore - a.mainAfter + "px", c.height = a.crossAround - a.crossBefore - a.crossAfter + "px") : (c.width = a.crossAround - a.crossBefore - a.crossAfter + "px", c.height = a.mainAround - a.mainBefore - a.mainAfter + "px")), a.children && a.children.forEach(function(a) {
                            b.exports(a)
                        })
                    }
                }
            }, {}]
        }, {}, [13])(13)
    }),
    function(a, b, c) {
        "use strict";
        var d = function(d, e) {
            var f = !!b.getComputedStyle;
            f || (b.getComputedStyle = function(a) {
                return this.el = a, this.getPropertyValue = function(b) {
                    var c = /(\-([a-z]){1})/g;
                    return "float" === b && (b = "styleFloat"), c.test(b) && (b = b.replace(c, function() {
                        return arguments[2].toUpperCase()
                    })), a.currentStyle[b] ? a.currentStyle[b] : null
                }, this
            });
            var n, o, p, s, t, u, g = function(a, b, c, d) {
                    if ("addEventListener" in a) try {
                        a.addEventListener(b, c, d)
                    } catch (e) {
                        if ("object" !== typeof c || !c.handleEvent) throw e;
                        a.addEventListener(b, function(a) {
                            c.handleEvent.call(c, a)
                        }, d)
                    } else "attachEvent" in a && ("object" === typeof c && c.handleEvent ? a.attachEvent("on" + b, function() {
                        c.handleEvent.call(c)
                    }) : a.attachEvent("on" + b, c))
                },
                h = function(a, b, c, d) {
                    if ("removeEventListener" in a) try {
                        a.removeEventListener(b, c, d)
                    } catch (e) {
                        if ("object" !== typeof c || !c.handleEvent) throw e;
                        a.removeEventListener(b, function(a) {
                            c.handleEvent.call(c, a)
                        }, d)
                    } else "detachEvent" in a && ("object" === typeof c && c.handleEvent ? a.detachEvent("on" + b, function() {
                        c.handleEvent.call(c)
                    }) : a.detachEvent("on" + b, c))
                },
                i = function(a) {
                    if (a.children.length < 1) throw new Error("The Nav container has no containing elements");
                    for (var b = [], c = 0; c < a.children.length; c++) 1 === a.children[c].nodeType && b.push(a.children[c]);
                    return b
                },
                j = function(a, b) {
                    for (var c in b) a.setAttribute(c, b[c])
                },
                k = function(a, b) {
                    0 !== a.className.indexOf(b) && (a.className += " " + b, a.className = a.className.replace(/(^\s*)|(\s*$)/g, ""))
                },
                l = function(a, b) {
                    var c = new RegExp("(\\s|^)" + b + "(\\s|$)");
                    a.className = a.className.replace(c, " ").replace(/(^\s*)|(\s*$)/g, "")
                },
                m = function(a, b, c) {
                    for (var d = 0; d < a.length; d++) b.call(c, d, a[d])
                },
                q = a.createElement("style"),
                r = a.documentElement,
                v = function(b, c) {
                    var d;
                    this.options = {
                        animate: !0,
                        transition: 284,
                        label: "Menu",
                        insert: "before",
                        customToggle: "",
                        closeOnNavClick: !1,
                        openPos: "relative",
                        navClass: "nav-collapse",
                        navActiveClass: "js-nav-active",
                        jsClass: "js",
                        init: function() {},
                        open: function() {},
                        close: function() {}
                    };
                    for (d in c) this.options[d] = c[d];
                    if (k(r, this.options.jsClass), this.wrapperEl = b.replace("#", ""), a.getElementById(this.wrapperEl)) this.wrapper = a.getElementById(this.wrapperEl);
                    else {
                        if (!a.querySelector(this.wrapperEl)) throw new Error("The nav element you are trying to select doesn't exist");
                        this.wrapper = a.querySelector(this.wrapperEl)
                    }
                    this.wrapper.inner = i(this.wrapper), o = this.options, n = this.wrapper, this._init(this)
                };
            return v.prototype = {
                destroy: function() {
                    this._removeStyles(), l(n, "closed"), l(n, "opened"), l(n, o.navClass), l(n, o.navClass + "-" + this.index), l(r, o.navActiveClass), n.removeAttribute("style"), n.removeAttribute("aria-hidden"), h(b, "resize", this, !1), h(b, "focus", this, !1), h(a.body, "touchmove", this, !1), h(p, "touchstart", this, !1), h(p, "touchend", this, !1), h(p, "mouseup", this, !1), h(p, "keyup", this, !1), h(p, "click", this, !1), o.customToggle ? p.removeAttribute("aria-hidden") : p.parentNode.removeChild(p)
                },
                toggle: function() {
                    s === !0 && (u ? this.close() : this.open())
                },
                open: function() {
                    u || (l(n, "closed"), k(n, "opened"), k(r, o.navActiveClass), k(p, "active"), n.style.position = o.openPos, j(n, {
                        "aria-hidden": "false"
                    }), u = !0, o.open())
                },
                close: function() {
                    u && (k(n, "closed"), l(n, "opened"), l(r, o.navActiveClass), l(p, "active"), j(n, {
                        "aria-hidden": "true"
                    }), o.animate ? (s = !1, setTimeout(function() {
                        n.style.position = "absolute", s = !0
                    }, o.transition + 10)) : n.style.position = "absolute", u = !1, o.close())
                },
                resize: function() {
                    "none" !== b.getComputedStyle(p, null).getPropertyValue("display") ? (t = !0, j(p, {
                        "aria-hidden": "false"
                    }), n.className.match(/(^|\s)closed(\s|$)/) && (j(n, {
                        "aria-hidden": "true"
                    }), n.style.position = "absolute"), this._createStyles(), this._calcHeight()) : (t = !1, j(p, {
                        "aria-hidden": "true"
                    }), j(n, {
                        "aria-hidden": "false"
                    }), n.style.position = o.openPos, this._removeStyles())
                },
                handleEvent: function(a) {
                    var c = a || b.event;
                    switch (c.type) {
                        case "touchstart":
                            this._onTouchStart(c);
                            break;
                        case "touchmove":
                            this._onTouchMove(c);
                            break;
                        case "touchend":
                        case "mouseup":
                            this._onTouchEnd(c);
                            break;
                        case "click":
                            this._preventDefault(c);
                            break;
                        case "keyup":
                            this._onKeyUp(c);
                            break;
                        case "focus":
                        case "resize":
                            this.resize(c)
                    }
                },
                _init: function() {
                    this.index = c++, k(n, o.navClass), k(n, o.navClass + "-" + this.index), k(n, "closed"), s = !0, u = !1, this._closeOnNavClick(), this._createToggle(), this._transitions(), this.resize();
                    var d = this;
                    setTimeout(function() {
                        d.resize()
                    }, 20), g(b, "resize", this, !1), g(b, "focus", this, !1), g(a.body, "touchmove", this, !1), g(p, "touchstart", this, !1), g(p, "touchend", this, !1), g(p, "mouseup", this, !1), g(p, "keyup", this, !1), g(p, "click", this, !1), o.init()
                },
                _createStyles: function() {
                    q.parentNode || (q.type = "text/css", a.getElementsByTagName("head")[0].appendChild(q))
                },
                _removeStyles: function() {
                    q.parentNode && q.parentNode.removeChild(q)
                },
                _createToggle: function() {
                    if (o.customToggle) {
                        var c = o.customToggle.replace("#", "");
                        if (a.getElementById(c)) p = a.getElementById(c);
                        else {
                            if (!a.querySelector(c)) throw new Error("The custom nav toggle you are trying to select doesn't exist");
                            p = a.querySelector(c)
                        }
                    } else {
                        var b = a.createElement("a");
                        b.innerHTML = o.label, j(b, {
                            href: "#",
                            "class": "nav-toggle"
                        }), "after" === o.insert ? n.parentNode.insertBefore(b, n.nextSibling) : n.parentNode.insertBefore(b, n), p = b
                    }
                },
                _closeOnNavClick: function() {
                    if (o.closeOnNavClick) {
                        var a = n.getElementsByTagName("a"),
                            b = this;
                        m(a, function(c) {
                            g(a[c], "click", function() {
                                t && b.toggle()
                            }, !1)
                        })
                    }
                },
                _preventDefault: function(a) {
                    return a.preventDefault ? (a.stopImmediatePropagation && a.stopImmediatePropagation(), a.preventDefault(), a.stopPropagation(), !1) : void(a.returnValue = !1)
                },
                _onTouchStart: function(a) {
                    Event.prototype.stopImmediatePropagation || this._preventDefault(a), this.startX = a.touches[0].clientX, this.startY = a.touches[0].clientY, this.touchHasMoved = !1, h(p, "mouseup", this, !1)
                },
                _onTouchMove: function(a) {
                    (Math.abs(a.touches[0].clientX - this.startX) > 10 || Math.abs(a.touches[0].clientY - this.startY) > 10) && (this.touchHasMoved = !0)
                },
                _onTouchEnd: function(a) {
                    if (this._preventDefault(a), t && !this.touchHasMoved) {
                        if ("touchend" === a.type) return void this.toggle();
                        var c = a || b.event;
                        3 !== c.which && 2 !== c.button && this.toggle()
                    }
                },
                _onKeyUp: function(a) {
                    var c = a || b.event;
                    13 === c.keyCode && this.toggle()
                },
                _transitions: function() {
                    if (o.animate) {
                        var a = n.style,
                            b = "max-height " + o.transition + "ms";
                        a.WebkitTransition = a.MozTransition = a.OTransition = a.transition = b
                    }
                },
                _calcHeight: function() {
                    for (var a = 0, b = 0; b < n.inner.length; b++) a += n.inner[b].offsetHeight;
                    var c = "." + o.jsClass + " ." + o.navClass + "-" + this.index + ".opened{max-height:" + a + "px !important} ." + o.jsClass + " ." + o.navClass + "-" + this.index + ".opened.dropdown-active {max-height:9999px !important}";
                    q.styleSheet ? q.styleSheet.cssText = c : q.innerHTML = c, c = ""
                }
            }, new v(d, e)
        };
        "undefined" !== typeof module && module.exports ? module.exports = d : b.responsiveNav = d
    }(document, window, 0);