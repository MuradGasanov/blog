;
(function (global) {
    var nova = {};
    nova.extend = function (a, b) {
        for (p in b) {
            if (b.hasOwnProperty(p)) {
                a[p] = b[p];
            }
        }
    }
    nova.Class = function (o) {
        var parent = o.extend, implement = o.implement, F = o.initialize || (parent ? parent.prototype.constructor : function () {
        });
        delete o.initialize;
        if (parent) {
            F.prototype.parent = function () {
                parent.apply(this, arguments);
            }
            nova.extend(F.prototype, parent.prototype);
            delete o.extend;
        }
        if (implement) {
            var i = 0, l = implement.length;
            for (; i < l; i++) {
                nova.extend(F.prototype, implement[i].prototype);
            }
            delete o.implement;
        }
        for (p in o) {
            if (o.hasOwnProperty(p)) {
                F.prototype[p] = o[p];
            }
        }
        F.extend = function (methods) {
            var props = {extend: F};
            nova.extend(props, methods);
            return nova.Class(props);
        }
        return F;
    }
    global.nova = nova;
})(this);
(function (a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }

    function cu(a) {
        if (!cj[a]) {
            var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0), b.appendChild(ck);
                if (!cl || !ck.createElement)cl = (ck.contentWindow || ck.contentDocument).document, cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cl.close();
                d = cl.createElement(a), cl.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ck)
            }
            cj[a] = e
        }
        return cj[a]
    }

    function ct(a, b) {
        var c = {};
        f.each(cp.concat.apply([], cp.slice(0, b)), function () {
            c[this] = a
        });
        return c
    }

    function cs() {
        cq = b
    }

    function cr() {
        setTimeout(cs, 0);
        return cq = f.now()
    }

    function ci() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    function ch() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function cb(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1)for (h in a.converters)typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*")k = l; else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }
                !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function ca(a, c, d) {
        var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
        for (i in g)i in d && (c[g[i]] = d[i]);
        while (f[0] === "*")f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)for (i in e)if (e[i] && e[i].test(h)) {
            f.unshift(i);
            break
        }
        if (f[0]in d)j = f[0]; else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function b_(a, b, c, d) {
        if (f.isArray(b))f.each(b, function (b, e) {
            c || bD.test(a) ? d(a, e) : b_(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
        }); else if (!c && f.type(b) === "object")for (var e in b)b_(a + "[" + e + "]", b[e], c, d); else d(a, b)
    }

    function b$(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c)c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }

    function bZ(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f], i = 0, j = h ? h.length : 0, k = a === bS, l;
        for (; i < j && (k || !l); i++)l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g));
        return l
    }

    function bY(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bO), e = 0, g = d.length, h, i, j;
                for (; e < g; e++)h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }

    function bB(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? 1 : 0, g = 4;
        if (d > 0) {
            if (c !== "border")for (; e < g; e += 2)c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0;
            return d + "px"
        }
        d = by(a, b);
        if (d < 0 || d == null)d = a.style[b];
        if (bt.test(d))return d;
        d = parseFloat(d) || 0;
        if (c)for (; e < g; e += 2)d += parseFloat(f.css(a, "padding" + bx[e])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0);
        return d + "px"
    }

    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b), b.innerHTML = a.outerHTML;
        return b.firstChild
    }

    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
    }

    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio")a.defaultChecked = a.checked
    }

    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }

    function bk(a, b) {
        var c;
        b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
    }

    function bj(a, b) {
        if (b.nodeType === 1 && !!f.hasData(a)) {
            var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i)for (d = 0, e = i[c].length; d < e; d++)f.event.add(b, c, i[c][d])
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }

    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function U(a) {
        var b = V.split("|"), c = a.createDocumentFragment();
        if (c.createElement)while (b.length)c.createElement(b.pop());
        return c
    }

    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b))return f.grep(a, function (a, d) {
            var e = !!b.call(a, d, a);
            return e === c
        });
        if (b.nodeType)return f.grep(a, function (a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = f.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (O.test(b))return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function (a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function S(a) {
        return!a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function K() {
        return!0
    }

    function J() {
        return!1
    }

    function n(a, b, c) {
        var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }

    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b]))continue;
            if (b !== "toJSON")return!1
        }
        return!0
    }

    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {
                }
                f.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++)b[a[c]] = !0;
        return b
    }

    var c = a.document, d = a.navigator, e = a.location, f = function () {
        function J() {
            if (!e.isReady) {
                try {
                    c.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(J, 1);
                    return
                }
                e.ready()
            }
        }

        var e = function (a, b) {
            return new e.fn.init(a, b, h)
        }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function (a, b) {
            return(b + "").toUpperCase()
        }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
        e.fn = e.prototype = {constructor: e, init: function (a, d, f) {
            var g, h, j, k;
            if (!a)return this;
            if (a.nodeType) {
                this.context = this[0] = a, this.length = 1;
                return this
            }
            if (a === "body" && !d && c.body) {
                this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                return this
            }
            if (typeof a == "string") {
                a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                if (g && (g[1] || !d)) {
                    if (g[1]) {
                        d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                        return e.merge(this, a)
                    }
                    h = c.getElementById(g[2]);
                    if (h && h.parentNode) {
                        if (h.id !== g[2])return f.find(a);
                        this.length = 1, this[0] = h
                    }
                    this.context = c, this.selector = a;
                    return this
                }
                return!d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
            }
            if (e.isFunction(a))return f.ready(a);
            a.selector !== b && (this.selector = a.selector, this.context = a.context);
            return e.makeArray(a, this)
        }, selector: "", jquery: "1.7.2", length: 0, size: function () {
            return this.length
        }, toArray: function () {
            return F.call(this, 0)
        }, get: function (a) {
            return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
        }, pushStack: function (a, b, c) {
            var d = this.constructor();
            e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
            return d
        }, each: function (a, b) {
            return e.each(this, a, b)
        }, ready: function (a) {
            e.bindReady(), A.add(a);
            return this
        }, eq: function (a) {
            a = +a;
            return a === -1 ? this.slice(a) : this.slice(a, a + 1)
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, slice: function () {
            return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
        }, map: function (a) {
            return this.pushStack(e.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: E, sort: [].sort, splice: [].splice}, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
            var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
            for (; j < k; j++)if ((a = arguments[j]) != null)for (c in a) {
                d = i[c], f = a[c];
                if (i === f)continue;
                l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
            }
            return i
        }, e.extend({noConflict: function (b) {
            a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
            return e
        }, isReady: !1, readyWait: 1, holdReady: function (a) {
            a ? e.readyWait++ : e.ready(!0)
        }, ready: function (a) {
            if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                if (!c.body)return setTimeout(e.ready, 1);
                e.isReady = !0;
                if (a !== !0 && --e.readyWait > 0)return;
                A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
            }
        }, bindReady: function () {
            if (!A) {
                A = e.Callbacks("once memory");
                if (c.readyState === "complete")return setTimeout(e.ready, 1);
                if (c.addEventListener)c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1); else if (c.attachEvent) {
                    c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                    var b = !1;
                    try {
                        b = a.frameElement == null
                    } catch (d) {
                    }
                    c.documentElement.doScroll && b && J()
                }
            }
        }, isFunction: function (a) {
            return e.type(a) === "function"
        }, isArray: Array.isArray || function (a) {
            return e.type(a) === "array"
        }, isWindow: function (a) {
            return a != null && a == a.window
        }, isNumeric: function (a) {
            return!isNaN(parseFloat(a)) && isFinite(a)
        }, type: function (a) {
            return a == null ? String(a) : I[C.call(a)] || "object"
        }, isPlainObject: function (a) {
            if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a))return!1;
            try {
                if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf"))return!1
            } catch (c) {
                return!1
            }
            var d;
            for (d in a);
            return d === b || D.call(a, d)
        }, isEmptyObject: function (a) {
            for (var b in a)return!1;
            return!0
        }, error: function (a) {
            throw new Error(a)
        }, parseJSON: function (b) {
            if (typeof b != "string" || !b)return null;
            b = e.trim(b);
            if (a.JSON && a.JSON.parse)return a.JSON.parse(b);
            if (n.test(b.replace(o, "@").replace(p, "]").replace(q, "")))return(new Function("return " + b))();
            e.error("Invalid JSON: " + b)
        }, parseXML: function (c) {
            if (typeof c != "string" || !c)return null;
            var d, f;
            try {
                a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
            } catch (g) {
                d = b
            }
            (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
            return d
        }, noop: function () {
        }, globalEval: function (b) {
            b && j.test(b) && (a.execScript || function (b) {
                a.eval.call(a, b)
            })(b)
        }, camelCase: function (a) {
            return a.replace(w, "ms-").replace(v, x)
        }, nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
        }, each: function (a, c, d) {
            var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
            if (d) {
                if (i) {
                    for (f in a)if (c.apply(a[f], d) === !1)break
                } else for (; g < h;)if (c.apply(a[g++], d) === !1)break
            } else if (i) {
                for (f in a)if (c.call(a[f], f, a[f]) === !1)break
            } else for (; g < h;)if (c.call(a[g], g, a[g++]) === !1)break;
            return a
        }, trim: G ? function (a) {
            return a == null ? "" : G.call(a)
        } : function (a) {
            return a == null ? "" : (a + "").replace(k, "").replace(l, "")
        }, makeArray: function (a, b) {
            var c = b || [];
            if (a != null) {
                var d = e.type(a);
                a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
            }
            return c
        }, inArray: function (a, b, c) {
            var d;
            if (b) {
                if (H)return H.call(b, a, c);
                d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                for (; c < d; c++)if (c in b && b[c] === a)return c
            }
            return-1
        }, merge: function (a, c) {
            var d = a.length, e = 0;
            if (typeof c.length == "number")for (var f = c.length; e < f; e++)a[d++] = c[e]; else while (c[e] !== b)a[d++] = c[e++];
            a.length = d;
            return a
        }, grep: function (a, b, c) {
            var d = [], e;
            c = !!c;
            for (var f = 0, g = a.length; f < g; f++)e = !!b(a[f], f), c !== e && d.push(a[f]);
            return d
        }, map: function (a, c, d) {
            var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
            if (k)for (; i < j; i++)f = c(a[i], i, d), f != null && (h[h.length] = f); else for (g in a)f = c(a[g], g, d), f != null && (h[h.length] = f);
            return h.concat.apply([], h)
        }, guid: 1, proxy: function (a, c) {
            if (typeof c == "string") {
                var d = a[c];
                c = a, a = d
            }
            if (!e.isFunction(a))return b;
            var f = F.call(arguments, 2), g = function () {
                return a.apply(c, f.concat(F.call(arguments)))
            };
            g.guid = a.guid = a.guid || g.guid || e.guid++;
            return g
        }, access: function (a, c, d, f, g, h, i) {
            var j, k = d == null, l = 0, m = a.length;
            if (d && typeof d == "object") {
                for (l in d)e.access(a, c, l, d[l], 1, h, f);
                g = 1
            } else if (f !== b) {
                j = i === b && e.isFunction(f), k && (j ? (j = c, c = function (a, b, c) {
                    return j.call(e(a), c)
                }) : (c.call(a, f), c = null));
                if (c)for (; l < m; l++)c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i);
                g = 1
            }
            return g ? a : k ? c.call(a) : m ? c(a[0], d) : h
        }, now: function () {
            return(new Date).getTime()
        }, uaMatch: function (a) {
            a = a.toLowerCase();
            var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
            return{browser: b[1] || "", version: b[2] || "0"}
        }, sub: function () {
            function a(b, c) {
                return new a.fn.init(b, c)
            }

            e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                f && f instanceof e && !(f instanceof a) && (f = a(f));
                return e.fn.init.call(this, d, f, b)
            }, a.fn.init.prototype = a.fn;
            var b = a(c);
            return a
        }, browser: {}}), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
            I["[object " + b + "]"] = b.toLowerCase()
        }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
            c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
        } : c.attachEvent && (B = function () {
            c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
        });
        return e
    }(), g = {};
    f.Callbacks = function (a) {
        a = a ? g[a] || h(a) : {};
        var c = [], d = [], e, i, j, k, l, m, n = function (b) {
            var d, e, g, h, i;
            for (d = 0, e = b.length; d < e; d++)g = b[d], h = f.type(g), h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g)
        }, o = function (b, f) {
            f = f || [], e = !a.memory || [b, f], i = !0, j = !0, m = k || 0, k = 0, l = c.length;
            for (; c && m < l; m++)if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
                e = !0;
                break
            }
            j = !1, c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])))
        }, p = {add: function () {
            if (c) {
                var a = c.length;
                n(arguments), j ? l = c.length : e && e !== !0 && (k = a, o(e[0], e[1]))
            }
            return this
        }, remove: function () {
            if (c) {
                var b = arguments, d = 0, e = b.length;
                for (; d < e; d++)for (var f = 0; f < c.length; f++)if (b[d] === c[f]) {
                    j && f <= l && (l--, f <= m && m--), c.splice(f--, 1);
                    if (a.unique)break
                }
            }
            return this
        }, has: function (a) {
            if (c) {
                var b = 0, d = c.length;
                for (; b < d; b++)if (a === c[b])return!0
            }
            return!1
        }, empty: function () {
            c = [];
            return this
        }, disable: function () {
            c = d = e = b;
            return this
        }, disabled: function () {
            return!c
        }, lock: function () {
            d = b, (!e || e === !0) && p.disable();
            return this
        }, locked: function () {
            return!d
        }, fireWith: function (b, c) {
            d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c));
            return this
        }, fire: function () {
            p.fireWith(this, arguments);
            return this
        }, fired: function () {
            return!!i
        }};
        return p
    };
    var i = [].slice;
    f.extend({Deferred: function (a) {
        var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {resolve: b, reject: c, notify: d}, h = {done: b.add, fail: c.add, progress: d.add, state: function () {
            return e
        }, isResolved: b.fired, isRejected: c.fired, then: function (a, b, c) {
            i.done(a).fail(b).progress(c);
            return this
        }, always: function () {
            i.done.apply(i, arguments).fail.apply(i, arguments);
            return this
        }, pipe: function (a, b, c) {
            return f.Deferred(function (d) {
                f.each({done: [a, "resolve"], fail: [b, "reject"], progress: [c, "notify"]}, function (a, b) {
                    var c = b[0], e = b[1], g;
                    f.isFunction(c) ? i[a](function () {
                        g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                    }) : i[a](d[e])
                })
            }).promise()
        }, promise: function (a) {
            if (a == null)a = h; else for (var b in h)a[b] = h[b];
            return a
        }}, i = h.promise({}), j;
        for (j in g)i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
        i.done(function () {
            e = "resolved"
        }, c.disable, d.lock).fail(function () {
            e = "rejected"
        }, b.disable, d.lock), a && a.call(i, i);
        return i
    }, when: function (a) {
        function m(a) {
            return function (b) {
                e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
            }
        }

        function l(a) {
            return function (c) {
                b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
            }
        }

        var b = i.call(arguments, 0), c = 0, d = b.length, e = Array(d), g = d, h = d, j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
        if (d > 1) {
            for (; c < d; c++)b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
            g || j.resolveWith(j, b)
        } else j !== a && j.resolveWith(j, d ? [a] : []);
        return k
    }}), f.support = function () {
        var b, d, e, g, h, i, j, k, l, m, n, o, p = c.createElement("div"), q = c.documentElement;
        p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = p.getElementsByTagName("*"), e = p.getElementsByTagName("a")[0];
        if (!d || !d.length || !e)return{};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = p.getElementsByTagName("input")[0], b = {leadingWhitespace: p.firstChild.nodeType === 3, tbody: !p.getElementsByTagName("tbody").length, htmlSerialize: !!p.getElementsByTagName("link").length, style: /top/.test(e.getAttribute("style")), hrefNormalized: e.getAttribute("href") === "/a", opacity: /^0.55/.test(e.style.opacity), cssFloat: !!e.style.cssFloat, checkOn: i.value === "on", optSelected: h.selected, getSetAttribute: p.className !== "t", enctype: !!c.createElement("form").enctype, html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", submitBubbles: !0, changeBubbles: !0, focusinBubbles: !1, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0, pixelMargin: !0}, f.boxModel = b.boxModel = c.compatMode === "CSS1Compat", i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete p.test
        } catch (r) {
            b.deleteExpando = !1
        }
        !p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), p.appendChild(i), j = c.createDocumentFragment(), j.appendChild(p.lastChild), b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, j.removeChild(i), j.appendChild(p);
        if (p.attachEvent)for (n in{submit: 1, change: 1, focusin: 1})m = "on" + n, o = m in p, o || (p.setAttribute(m, "return;"), o = typeof p[m] == "function"), b[n + "Bubbles"] = o;
        j.removeChild(p), j = g = h = p = i = null, f(function () {
            var d, e, g, h, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0];
            !u || (m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " + n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = k[0].offsetHeight === 0, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && k[0].offsetHeight === 0, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = (parseInt((a.getComputedStyle(l, null) || {marginRight: 0}).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {doesNotAddBorder: g.offsetTop !== 5, doesAddBorderForTableAndCells: i.offsetTop === 5}, g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5, j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(p, null) || {marginTop: 0}).marginTop !== "1%"), typeof d.style.zoom != "undefined" && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j))
        });
        return b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
    f.extend({cache: {}, uuid: 0, expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""), noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0}, hasData: function (a) {
        a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
        return!!a && !m(a)
    }, data: function (a, c, d, e) {
        if (!!f.acceptData(a)) {
            var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
            if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b)return;
            n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
            if (typeof c == "object" || typeof c == "function")e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
            g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
            if (o && !h[c])return g.events;
            k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
            return i
        }
    }, removeData: function (a, b, c) {
        if (!!f.acceptData(a)) {
            var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
            if (!j[k])return;
            if (b) {
                d = c ? j[k] : j[k].data;
                if (d) {
                    f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                    for (e = 0, g = b.length; e < g; e++)delete d[b[e]];
                    if (!(c ? m : f.isEmptyObject)(d))return
                }
            }
            if (!c) {
                delete j[k].data;
                if (!m(j[k]))return
            }
            f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
        }
    }, _data: function (a, b, c) {
        return f.data(a, b, c, !0)
    }, acceptData: function (a) {
        if (a.nodeName) {
            var b = f.noData[a.nodeName.toLowerCase()];
            if (b)return b !== !0 && a.getAttribute("classid") === b
        }
        return!0
    }}), f.fn.extend({data: function (a, c) {
        var d, e, g, h, i, j = this[0], k = 0, m = null;
        if (a === b) {
            if (this.length) {
                m = f.data(j);
                if (j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
                    g = j.attributes;
                    for (i = g.length; k < i; k++)h = g[k].name, h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)), l(j, h, m[h]));
                    f._data(j, "parsedAttrs", !0)
                }
            }
            return m
        }
        if (typeof a == "object")return this.each(function () {
            f.data(this, a)
        });
        d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!";
        return f.access(this, function (c) {
            if (c === b) {
                m = this.triggerHandler("getData" + e, [d[0]]), m === b && j && (m = f.data(j, a), m = l(j, a, m));
                return m === b && d[1] ? this.data(d[0]) : m
            }
            d[1] = c, this.each(function () {
                var b = f(this);
                b.triggerHandler("setData" + e, d), f.data(this, a, c), b.triggerHandler("changeData" + e, d)
            })
        }, null, c, arguments.length > 1, null, !1)
    }, removeData: function (a) {
        return this.each(function () {
            f.removeData(this, a)
        })
    }}), f.extend({_mark: function (a, b) {
        a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
    }, _unmark: function (a, b, c) {
        a !== !0 && (c = b, b = a, a = !1);
        if (b) {
            c = c || "fx";
            var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
            e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
        }
    }, queue: function (a, b, c) {
        var d;
        if (a) {
            b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
            return d || []
        }
    }, dequeue: function (a, b) {
        b = b || "fx";
        var c = f.queue(a, b), d = c.shift(), e = {};
        d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
            f.dequeue(a, b)
        }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
    }}), f.fn.extend({queue: function (a, c) {
        var d = 2;
        typeof a != "string" && (c = a, a = "fx", d--);
        if (arguments.length < d)return f.queue(this[0], a);
        return c === b ? this : this.each(function () {
            var b = f.queue(this, a, c);
            a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
        })
    }, dequeue: function (a) {
        return this.each(function () {
            f.dequeue(this, a)
        })
    }, delay: function (a, b) {
        a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
        return this.queue(b, function (b, c) {
            var d = setTimeout(b, a);
            c.stop = function () {
                clearTimeout(d)
            }
        })
    }, clearQueue: function (a) {
        return this.queue(a || "fx", [])
    }, promise: function (a, c) {
        function m() {
            --h || d.resolveWith(e, [e])
        }

        typeof a != "string" && (c = a, a = b), a = a || "fx";
        var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
        while (g--)if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0))h++, l.add(m);
        m();
        return d.promise(c)
    }});
    var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
    f.fn.extend({attr: function (a, b) {
        return f.access(this, f.attr, a, b, arguments.length > 1)
    }, removeAttr: function (a) {
        return this.each(function () {
            f.removeAttr(this, a)
        })
    }, prop: function (a, b) {
        return f.access(this, f.prop, a, b, arguments.length > 1)
    }, removeProp: function (a) {
        a = f.propFix[a] || a;
        return this.each(function () {
            try {
                this[a] = b, delete this[a]
            } catch (c) {
            }
        })
    }, addClass: function (a) {
        var b, c, d, e, g, h, i;
        if (f.isFunction(a))return this.each(function (b) {
            f(this).addClass(a.call(this, b, this.className))
        });
        if (a && typeof a == "string") {
            b = a.split(p);
            for (c = 0, d = this.length; c < d; c++) {
                e = this[c];
                if (e.nodeType === 1)if (!e.className && b.length === 1)e.className = a; else {
                    g = " " + e.className + " ";
                    for (h = 0, i = b.length; h < i; h++)~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                    e.className = f.trim(g)
                }
            }
        }
        return this
    }, removeClass: function (a) {
        var c, d, e, g, h, i, j;
        if (f.isFunction(a))return this.each(function (b) {
            f(this).removeClass(a.call(this, b, this.className))
        });
        if (a && typeof a == "string" || a === b) {
            c = (a || "").split(p);
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                if (g.nodeType === 1 && g.className)if (a) {
                    h = (" " + g.className + " ").replace(o, " ");
                    for (i = 0, j = c.length; i < j; i++)h = h.replace(" " + c[i] + " ", " ");
                    g.className = f.trim(h)
                } else g.className = ""
            }
        }
        return this
    }, toggleClass: function (a, b) {
        var c = typeof a, d = typeof b == "boolean";
        if (f.isFunction(a))return this.each(function (c) {
            f(this).toggleClass(a.call(this, c, this.className, b), b)
        });
        return this.each(function () {
            if (c === "string") {
                var e, g = 0, h = f(this), i = b, j = a.split(p);
                while (e = j[g++])i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
            } else if (c === "undefined" || c === "boolean")this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
        })
    }, hasClass: function (a) {
        var b = " " + a + " ", c = 0, d = this.length;
        for (; c < d; c++)if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1)return!0;
        return!1
    }, val: function (a) {
        var c, d, e, g = this[0];
        {
            if (!!arguments.length) {
                e = f.isFunction(a);
                return this.each(function (d) {
                    var g = f(this), h;
                    if (this.nodeType === 1) {
                        e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                            return a == null ? "" : a + ""
                        })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
                        if (!c || !("set"in c) || c.set(this, h, "value") === b)this.value = h
                    }
                })
            }
            if (g) {
                c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];
                if (c && "get"in c && (d = c.get(g, "value")) !== b)return d;
                d = g.value;
                return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
            }
        }
    }}), f.extend({valHooks: {option: {get: function (a) {
        var b = a.attributes.value;
        return!b || b.specified ? a.value : a.text
    }}, select: {get: function (a) {
        var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
        if (g < 0)return null;
        c = j ? g : 0, d = j ? g + 1 : i.length;
        for (; c < d; c++) {
            e = i[c];
            if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                b = f(e).val();
                if (j)return b;
                h.push(b)
            }
        }
        if (j && !h.length && i.length)return f(i[g]).val();
        return h
    }, set: function (a, b) {
        var c = f.makeArray(b);
        f(a).find("option").each(function () {
            this.selected = f.inArray(f(this).val(), c) >= 0
        }), c.length || (a.selectedIndex = -1);
        return c
    }}}, attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0}, attr: function (a, c, d, e) {
        var g, h, i, j = a.nodeType;
        if (!!a && j !== 3 && j !== 8 && j !== 2) {
            if (e && c in f.attrFn)return f(a)[c](d);
            if (typeof a.getAttribute == "undefined")return f.prop(a, c, d);
            i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
            if (d !== b) {
                if (d === null) {
                    f.removeAttr(a, c);
                    return
                }
                if (h && "set"in h && i && (g = h.set(a, d, c)) !== b)return g;
                a.setAttribute(c, "" + d);
                return d
            }
            if (h && "get"in h && i && (g = h.get(a, c)) !== null)return g;
            g = a.getAttribute(c);
            return g === null ? b : g
        }
    }, removeAttr: function (a, b) {
        var c, d, e, g, h, i = 0;
        if (b && a.nodeType === 1) {
            d = b.toLowerCase().split(p), g = d.length;
            for (; i < g; i++)e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1))
        }
    }, attrHooks: {type: {set: function (a, b) {
        if (r.test(a.nodeName) && a.parentNode)f.error("type property can't be changed"); else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
            var c = a.value;
            a.setAttribute("type", b), c && (a.value = c);
            return b
        }
    }}, value: {get: function (a, b) {
        if (w && f.nodeName(a, "button"))return w.get(a, b);
        return b in a ? a.value : null
    }, set: function (a, b, c) {
        if (w && f.nodeName(a, "button"))return w.set(a, b, c);
        a.value = b
    }}}, propFix: {tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable"}, prop: function (a, c, d) {
        var e, g, h, i = a.nodeType;
        if (!!a && i !== 3 && i !== 8 && i !== 2) {
            h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
            return d !== b ? g && "set"in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get"in g && (e = g.get(a, c)) !== null ? e : a[c]
        }
    }, propHooks: {tabIndex: {get: function (a) {
        var c = a.getAttributeNode("tabindex");
        return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
    }}}}), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {get: function (a, c) {
        var d, e = f.prop(a, c);
        return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
    }, set: function (a, b, c) {
        var d;
        b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
        return c
    }}, v || (y = {name: !0, id: !0, coords: !0}, w = f.valHooks.button = {get: function (a, c) {
        var d;
        d = a.getAttributeNode(c);
        return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
    }, set: function (a, b, d) {
        var e = a.getAttributeNode(d);
        e || (e = c.createAttribute(d), a.setAttributeNode(e));
        return e.nodeValue = b + ""
    }}, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {set: function (a, c) {
            if (c === "") {
                a.setAttribute(b, "auto");
                return c
            }
        }})
    }), f.attrHooks.contenteditable = {get: w.get, set: function (a, b, c) {
        b === "" && (b = "false"), w.set(a, b, c)
    }}), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {get: function (a) {
            var d = a.getAttribute(c, 2);
            return d === null ? b : d
        }})
    }), f.support.style || (f.attrHooks.style = {get: function (a) {
        return a.style.cssText.toLowerCase() || b
    }, set: function (a, b) {
        return a.style.cssText = "" + b
    }}), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {get: function (a) {
        var b = a.parentNode;
        b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
        return null
    }})), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = {get: function (a) {
            return a.getAttribute("value") === null ? "on" : a.value
        }}
    }), f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = f.extend(f.valHooks[this], {set: function (a, b) {
            if (f.isArray(b))return a.checked = f.inArray(f(a).val(), b) >= 0
        }})
    });
    var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /(?:^|\s)hover(\.\S+)?\b/, C = /^key/, D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/, F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function (a) {
        var b = F.exec(a);
        b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
        return b
    }, H = function (a, b) {
        var c = a.attributes || {};
        return(!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
    }, I = function (a) {
        return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
    };
    f.event = {add: function (a, c, d, e, g) {
        var h, i, j, k, l, m, n, o, p, q, r, s;
        if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
            d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
            }, i.elem = a), c = f.trim(I(c)).split(" ");
            for (k = 0; k < c.length; k++) {
                l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({type: m, origType: l[1], data: e, handler: d, guid: d.guid, selector: g, quick: g && G(g), namespace: n.join(".")}, p), r = j[m];
                if (!r) {
                    r = j[m] = [], r.delegateCount = 0;
                    if (!s.setup || s.setup.call(a, e, n, i) === !1)a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                }
                s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
            }
            a = null
        }
    }, global: {}, remove: function (a, b, c, d, e) {
        var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
        if (!!g && !!(o = g.events)) {
            b = f.trim(I(b || "")).split(" ");
            for (h = 0; h < b.length; h++) {
                i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                if (!j) {
                    for (j in o)f.event.remove(a, j + b[h], c, d, !0);
                    continue
                }
                p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (n = 0; n < r.length; n++)s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
            }
            f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
        }
    }, customEvent: {getData: !0, setData: !0, changeData: !0}, trigger: function (c, d, e, g) {
        if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
            var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
            if (E.test(h + f.event.triggered))return;
            h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
            if ((!e || f.event.customEvent[h]) && !f.event.global[h])return;
            c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
            if (!e) {
                j = f.cache;
                for (l in j)j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                return
            }
            c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
            if (p.trigger && p.trigger.apply(e, d) === !1)return;
            r = [
                [e, p.bindType || h]
            ];
            if (!g && !p.noBubble && !f.isWindow(e)) {
                s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                for (; m; m = m.parentNode)r.push([m, s]), n = m;
                n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
            }
            for (l = 0; l < r.length && !c.isPropagationStopped(); l++)m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
            c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
            return c.result
        }
    }, dispatch: function (c) {
        c = f.event.fix(c || a.event);
        var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = f.event.special[c.type] || {}, j = [], k, l, m, n, o, p, q, r, s, t, u;
        g[0] = c, c.delegateTarget = this;
        if (!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
            if (e && (!c.button || c.type !== "click")) {
                n = f(this), n.context = this.ownerDocument || this;
                for (m = c.target; m != this; m = m.parentNode || this)if (m.disabled !== !0) {
                    p = {}, r = [], n[0] = m;
                    for (k = 0; k < e; k++)s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s);
                    r.length && j.push({elem: m, matches: r})
                }
            }
            d.length > e && j.push({elem: this, matches: d.slice(e)});
            for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
                q = j[k], c.currentTarget = q.elem;
                for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) {
                    s = q.matches[l];
                    if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace))c.data = s.data, c.handleObj = s, o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g), o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()))
                }
            }
            i.postDispatch && i.postDispatch.call(this, c);
            return c.result
        }
    }, props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {props: "char charCode key keyCode".split(" "), filter: function (a, b) {
        a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
        return a
    }}, mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (a, d) {
        var e, f, g, h = d.button, i = d.fromElement;
        a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
        return a
    }}, fix: function (a) {
        if (a[f.expando])return a;
        var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
        a = f.Event(g);
        for (d = i.length; d;)e = i[--d], a[e] = g[e];
        a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
        return h.filter ? h.filter(a, g) : a
    }, special: {ready: {setup: f.bindReady}, load: {noBubble: !0}, focus: {delegateType: "focusin"}, blur: {delegateType: "focusout"}, beforeunload: {setup: function (a, b, c) {
        f.isWindow(this) && (this.onbeforeunload = c)
    }, teardown: function (a, b) {
        this.onbeforeunload === b && (this.onbeforeunload = null)
    }}}, simulate: function (a, b, c, d) {
        var e = f.extend(new f.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
        d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
    }}, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, f.Event = function (a, b) {
        if (!(this instanceof f.Event))return new f.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
    }, f.Event.prototype = {preventDefault: function () {
        this.isDefaultPrevented = K;
        var a = this.originalEvent;
        !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
    }, stopPropagation: function () {
        this.isPropagationStopped = K;
        var a = this.originalEvent;
        !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
    }, stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = K, this.stopPropagation()
    }, isDefaultPrevented: J, isPropagationStopped: J, isImmediatePropagationStopped: J}, f.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
        f.event.special[a] = {delegateType: b, bindType: b, handle: function (a) {
            var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
            if (!d || d !== c && !f.contains(c, d))a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
            return h
        }}
    }), f.support.submitBubbles || (f.event.special.submit = {setup: function () {
        if (f.nodeName(this, "form"))return!1;
        f.event.add(this, "click._submit keypress._submit", function (a) {
            var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
            d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                a._submit_bubble = !0
            }), d._submit_attached = !0)
        })
    }, postDispatch: function (a) {
        a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0))
    }, teardown: function () {
        if (f.nodeName(this, "form"))return!1;
        f.event.remove(this, "._submit")
    }}), f.support.changeBubbles || (f.event.special.change = {setup: function () {
        if (z.test(this.nodeName)) {
            if (this.type === "checkbox" || this.type === "radio")f.event.add(this, "propertychange._change", function (a) {
                a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
            }), f.event.add(this, "click._change", function (a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
            });
            return!1
        }
        f.event.add(this, "beforeactivate._change", function (a) {
            var b = a.target;
            z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
            }), b._change_attached = !0)
        })
    }, handle: function (a) {
        var b = a.target;
        if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox")return a.handleObj.handler.apply(this, arguments)
    }, teardown: function () {
        f.event.remove(this, "._change");
        return z.test(this.nodeName)
    }}), f.support.focusinBubbles || f.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var d = 0, e = function (a) {
            f.event.simulate(b, a.target, f.event.fix(a), !0)
        };
        f.event.special[b] = {setup: function () {
            d++ === 0 && c.addEventListener(a, e, !0)
        }, teardown: function () {
            --d === 0 && c.removeEventListener(a, e, !0)
        }}
    }), f.fn.extend({on: function (a, c, d, e, g) {
        var h, i;
        if (typeof a == "object") {
            typeof c != "string" && (d = d || c, c = b);
            for (i in a)this.on(i, c, d, a[i], g);
            return this
        }
        d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
        if (e === !1)e = J; else if (!e)return this;
        g === 1 && (h = e, e = function (a) {
            f().off(a);
            return h.apply(this, arguments)
        }, e.guid = h.guid || (h.guid = f.guid++));
        return this.each(function () {
            f.event.add(this, a, e, d, c)
        })
    }, one: function (a, b, c, d) {
        return this.on(a, b, c, d, 1)
    }, off: function (a, c, d) {
        if (a && a.preventDefault && a.handleObj) {
            var e = a.handleObj;
            f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
            return this
        }
        if (typeof a == "object") {
            for (var g in a)this.off(g, c, a[g]);
            return this
        }
        if (c === !1 || typeof c == "function")d = c, c = b;
        d === !1 && (d = J);
        return this.each(function () {
            f.event.remove(this, a, d, c)
        })
    }, bind: function (a, b, c) {
        return this.on(a, null, b, c)
    }, unbind: function (a, b) {
        return this.off(a, null, b)
    }, live: function (a, b, c) {
        f(this.context).on(a, this.selector, b, c);
        return this
    }, die: function (a, b) {
        f(this.context).off(a, this.selector || "**", b);
        return this
    }, delegate: function (a, b, c, d) {
        return this.on(b, a, c, d)
    }, undelegate: function (a, b, c) {
        return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
    }, trigger: function (a, b) {
        return this.each(function () {
            f.event.trigger(a, b, this)
        })
    }, triggerHandler: function (a, b) {
        if (this[0])return f.event.trigger(a, b, this[0], !0)
    }, toggle: function (a) {
        var b = arguments, c = a.guid || f.guid++, d = 0, e = function (c) {
            var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
            f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
            return b[e].apply(this, arguments) || !1
        };
        e.guid = c;
        while (d < b.length)b[d++].guid = c;
        return this.click(e)
    }, hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a)
    }}), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        f.fn[b] = function (a, c) {
            c == null && (c = a, a = null);
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
    }), function () {
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1, i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
        [0, 0].sort(function () {
            i = !1;
            return 0
        });
        var m = function (b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9)return[];
            if (!b || typeof b != "string")return e;
            var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b))if (w.length === 2 && o.relative[w[0]])j = y(w[0] + w[1], d, f); else {
                j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                while (w.length)b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
            } else {
                !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                if (d) {
                    n = f ? {expr: w.pop(), set: s(f)} : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                    while (w.length)q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                } else k = w = []
            }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]")if (!u)e.push.apply(e, k); else if (d && d.nodeType === 1)for (t = 0; k[t] != null; t++)k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]); else for (t = 0; k[t] != null; t++)k[t] && k[t].nodeType === 1 && e.push(j[t]); else s(k, e);
            l && (m(l, h, e, f), m.uniqueSort(e));
            return e
        };
        m.uniqueSort = function (a) {
            if (u) {
                h = i, a.sort(u);
                if (h)for (var b = 1; b < a.length; b++)a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }, m.matches = function (a, b) {
            return m(a, null, null, b)
        }, m.matchesSelector = function (a, b) {
            return m(b, null, null, [a]).length > 0
        }, m.find = function (a, b, c) {
            var d, e, f, g, h, i;
            if (!a)return[];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break
                        }
                    }
                }
            }
            d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
            return{set: d, expr: a}
        }, m.filter = function (a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter)if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                    k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                    if (l.substr(l.length - 1) === "\\")continue;
                    s === r && (r = []);
                    if (o.preFilter[h]) {
                        f = o.preFilter[h](f, s, d, r, e, t);
                        if (!f)g = i = !0; else if (f === !0)continue
                    }
                    if (f)for (n = 0; (j = s[n]) != null; n++)j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                    if (i !== b) {
                        d || (s = r), a = a.replace(o.match[h], "");
                        if (!g)return[];
                        break
                    }
                }
                if (a === q)if (g == null)m.error(a); else break;
                q = a
            }
            return s
        }, m.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        };
        var n = m.getText = function (a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (d === 1 || d === 9 || d === 11) {
                    if (typeof a.textContent == "string")return a.textContent;
                    if (typeof a.innerText == "string")return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling)e += n(a)
                } else if (d === 3 || d === 4)return a.nodeValue
            } else for (b = 0; c = a[b]; b++)c.nodeType !== 8 && (e += n(c));
            return e
        }, o = m.selectors = {order: ["ID", "NAME", "TAG"], match: {ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/, ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/, TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/, CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/, POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/, PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/}, leftMatch: {}, attrMap: {"class": "className", "for": "htmlFor"}, attrHandle: {href: function (a) {
            return a.getAttribute("href")
        }, type: function (a) {
            return a.getAttribute("type")
        }}, relative: {"+": function (a, b) {
            var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
            d && (b = b.toLowerCase());
            for (var f = 0, g = a.length, h; f < g; f++)if (h = a[f]) {
                while ((h = h.previousSibling) && h.nodeType !== 1);
                a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
            }
            e && m.filter(b, a, !0)
        }, ">": function (a, b) {
            var c, d = typeof b == "string", e = 0, f = a.length;
            if (d && !l.test(b)) {
                b = b.toLowerCase();
                for (; e < f; e++) {
                    c = a[e];
                    if (c) {
                        var g = c.parentNode;
                        a[e] = g.nodeName.toLowerCase() === b ? g : !1
                    }
                }
            } else {
                for (; e < f; e++)c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                d && m.filter(b, a, !0)
            }
        }, "": function (a, b, c) {
            var d, f = e++, g = x;
            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
        }, "~": function (a, b, c) {
            var d, f = e++, g = x;
            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
        }}, find: {ID: function (a, b, c) {
            if (typeof b.getElementById != "undefined" && !c) {
                var d = b.getElementById(a[1]);
                return d && d.parentNode ? [d] : []
            }
        }, NAME: function (a, b) {
            if (typeof b.getElementsByName != "undefined") {
                var c = [], d = b.getElementsByName(a[1]);
                for (var e = 0, f = d.length; e < f; e++)d[e].getAttribute("name") === a[1] && c.push(d[e]);
                return c.length === 0 ? null : c
            }
        }, TAG: function (a, b) {
            if (typeof b.getElementsByTagName != "undefined")return b.getElementsByTagName(a[1])
        }}, preFilter: {CLASS: function (a, b, c, d, e, f) {
            a = " " + a[1].replace(j, "") + " ";
            if (f)return a;
            for (var g = 0, h; (h = b[g]) != null; g++)h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
            return!1
        }, ID: function (a) {
            return a[1].replace(j, "")
        }, TAG: function (a, b) {
            return a[1].replace(j, "").toLowerCase()
        }, CHILD: function (a) {
            if (a[1] === "nth") {
                a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
            } else a[2] && m.error(a[0]);
            a[0] = e++;
            return a
        }, ATTR: function (a, b, c, d, e, f) {
            var g = a[1] = a[1].replace(j, "");
            !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
            return a
        }, PSEUDO: function (b, c, d, e, f) {
            if (b[1] === "not")if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3]))b[3] = m(b[3], null, null, c); else {
                var g = m.filter(b[3], c, d, !0 ^ f);
                d || e.push.apply(e, g);
                return!1
            } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0]))return!0;
            return b
        }, POS: function (a) {
            a.unshift(!0);
            return a
        }}, filters: {enabled: function (a) {
            return a.disabled === !1 && a.type !== "hidden"
        }, disabled: function (a) {
            return a.disabled === !0
        }, checked: function (a) {
            return a.checked === !0
        }, selected: function (a) {
            a.parentNode && a.parentNode.selectedIndex;
            return a.selected === !0
        }, parent: function (a) {
            return!!a.firstChild
        }, empty: function (a) {
            return!a.firstChild
        }, has: function (a, b, c) {
            return!!m(c[3], a).length
        }, header: function (a) {
            return/h\d/i.test(a.nodeName)
        }, text: function (a) {
            var b = a.getAttribute("type"), c = a.type;
            return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
        }, radio: function (a) {
            return a.nodeName.toLowerCase() === "input" && "radio" === a.type
        }, checkbox: function (a) {
            return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
        }, file: function (a) {
            return a.nodeName.toLowerCase() === "input" && "file" === a.type
        }, password: function (a) {
            return a.nodeName.toLowerCase() === "input" && "password" === a.type
        }, submit: function (a) {
            var b = a.nodeName.toLowerCase();
            return(b === "input" || b === "button") && "submit" === a.type
        }, image: function (a) {
            return a.nodeName.toLowerCase() === "input" && "image" === a.type
        }, reset: function (a) {
            var b = a.nodeName.toLowerCase();
            return(b === "input" || b === "button") && "reset" === a.type
        }, button: function (a) {
            var b = a.nodeName.toLowerCase();
            return b === "input" && "button" === a.type || b === "button"
        }, input: function (a) {
            return/input|select|textarea|button/i.test(a.nodeName)
        }, focus: function (a) {
            return a === a.ownerDocument.activeElement
        }}, setFilters: {first: function (a, b) {
            return b === 0
        }, last: function (a, b, c, d) {
            return b === d.length - 1
        }, even: function (a, b) {
            return b % 2 === 0
        }, odd: function (a, b) {
            return b % 2 === 1
        }, lt: function (a, b, c) {
            return b < c[3] - 0
        }, gt: function (a, b, c) {
            return b > c[3] - 0
        }, nth: function (a, b, c) {
            return c[3] - 0 === b
        }, eq: function (a, b, c) {
            return c[3] - 0 === b
        }}, filter: {PSEUDO: function (a, b, c, d) {
            var e = b[1], f = o.filters[e];
            if (f)return f(a, c, b, d);
            if (e === "contains")return(a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
            if (e === "not") {
                var g = b[3];
                for (var h = 0, i = g.length; h < i; h++)if (g[h] === a)return!1;
                return!0
            }
            m.error(e)
        }, CHILD: function (a, b) {
            var c, e, f, g, h, i, j, k = b[1], l = a;
            switch (k) {
                case"only":
                case"first":
                    while (l = l.previousSibling)if (l.nodeType === 1)return!1;
                    if (k === "first")return!0;
                    l = a;
                case"last":
                    while (l = l.nextSibling)if (l.nodeType === 1)return!1;
                    return!0;
                case"nth":
                    c = b[2], e = b[3];
                    if (c === 1 && e === 0)return!0;
                    f = b[0], g = a.parentNode;
                    if (g && (g[d] !== f || !a.nodeIndex)) {
                        i = 0;
                        for (l = g.firstChild; l; l = l.nextSibling)l.nodeType === 1 && (l.nodeIndex = ++i);
                        g[d] = f
                    }
                    j = a.nodeIndex - e;
                    return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
            }
        }, ID: function (a, b) {
            return a.nodeType === 1 && a.getAttribute("id") === b
        }, TAG: function (a, b) {
            return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
        }, CLASS: function (a, b) {
            return(" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
        }, ATTR: function (a, b) {
            var c = b[1], d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
            return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
        }, POS: function (a, b, c, d) {
            var e = b[2], f = o.setFilters[e];
            if (f)return f(a, c, b, d)
        }}}, p = o.match.POS, q = function (a, b) {
            return"\\" + (b - 0 + 1)
        };
        for (var r in o.match)o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        o.match.globalPOS = p;
        var s = function (a, b) {
            a = Array.prototype.slice.call(a, 0);
            if (b) {
                b.push.apply(b, a);
                return b
            }
            return a
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function (a, b) {
                var c = 0, d = b || [];
                if (g.call(a) === "[object Array]")Array.prototype.push.apply(d, a); else if (typeof a.length == "number")for (var e = a.length; c < e; c++)d.push(a[c]); else for (; a[c]; c++)d.push(a[c]);
                return d
            }
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (!a.compareDocumentPosition || !b.compareDocumentPosition)return a.compareDocumentPosition ? -1 : 1;
            return a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (a.sourceIndex && b.sourceIndex)return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
            if (g === i)return v(a, b);
            if (!g)return-1;
            if (!i)return 1;
            while (j)e.unshift(j), j = j.parentNode;
            j = i;
            while (j)f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++)if (e[k] !== f[k])return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
        }, v = function (a, b, c) {
            if (a === b)return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b)return-1;
                d = d.nextSibling
            }
            return 1
        }), function () {
            var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, o.filter.ID = function (a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }), e.removeChild(a), e = a = null
        }(), function () {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++)c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), c.querySelectorAll && function () {
            var a = m, b = c.createElement("div"), d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                m = function (b, e, f, g) {
                    e = e || c;
                    if (!g && !m.isXML(e)) {
                        var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                            if (h[1])return s(e.getElementsByTagName(b), f);
                            if (h[2] && o.find.CLASS && e.getElementsByClassName)return s(e.getElementsByClassName(h[2]), f)
                        }
                        if (e.nodeType === 9) {
                            if (b === "body" && e.body)return s([e.body], f);
                            if (h && h[3]) {
                                var i = e.getElementById(h[3]);
                                if (!i || !i.parentNode)return s([], f);
                                if (i.id === h[3])return s([i], f)
                            }
                            try {
                                return s(e.querySelectorAll(b), f)
                            } catch (j) {
                            }
                        } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                            var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
                            l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                            try {
                                if (!q || p)return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                            } catch (r) {
                            } finally {
                                l || k.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, e, f, g)
                };
                for (var e in a)m[e] = a[e];
                b = null
            }
        }(), function () {
            var a = c.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"), e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle")
                } catch (f) {
                    e = !0
                }
                m.matchesSelector = function (a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a))try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11)return f
                        }
                    } catch (g) {
                    }
                    return m(c, null, null, [a]).length > 0
                }
            }
        }(), function () {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1)return;
                o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                    if (typeof b.getElementsByClassName != "undefined" && !c)return b.getElementsByClassName(a[1])
                }, a = null
            }
        }(), c.documentElement.contains ? m.contains = function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
            return!!(a.compareDocumentPosition(b) & 16)
        } : m.contains = function () {
            return!1
        }, m.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        };
        var y = function (a, b, c) {
            var d, e = [], f = "", g = b.nodeType ? [b] : b;
            while (d = o.match.PSEUDO.exec(a))f += d[0], a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++)m(a, g[h], e, c);
            return m.filter(f, e)
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
    }();
    var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice, Q = f.expr.match.globalPOS, R = {children: !0, contents: !0, next: !0, prev: !0};
    f.fn.extend({find: function (a) {
        var b = this, c, d;
        if (typeof a != "string")return f(a).filter(function () {
            for (c = 0, d = b.length; c < d; c++)if (f.contains(b[c], this))return!0
        });
        var e = this.pushStack("", "find", a), g, h, i;
        for (c = 0, d = this.length; c < d; c++) {
            g = e.length, f.find(a, this[c], e);
            if (c > 0)for (h = g; h < e.length; h++)for (i = 0; i < g; i++)if (e[i] === e[h]) {
                e.splice(h--, 1);
                break
            }
        }
        return e
    }, has: function (a) {
        var b = f(a);
        return this.filter(function () {
            for (var a = 0, c = b.length; a < c; a++)if (f.contains(this, b[a]))return!0
        })
    }, not: function (a) {
        return this.pushStack(T(this, a, !1), "not", a)
    }, filter: function (a) {
        return this.pushStack(T(this, a, !0), "filter", a)
    }, is: function (a) {
        return!!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
    }, closest: function (a, b) {
        var c = [], d, e, g = this[0];
        if (f.isArray(a)) {
            var h = 1;
            while (g && g.ownerDocument && g !== b) {
                for (d = 0; d < a.length; d++)f(g).is(a[d]) && c.push({selector: a[d], elem: g, level: h});
                g = g.parentNode, h++
            }
            return c
        }
        var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
        for (d = 0, e = this.length; d < e; d++) {
            g = this[d];
            while (g) {
                if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                    c.push(g);
                    break
                }
                g = g.parentNode;
                if (!g || !g.ownerDocument || g === b || g.nodeType === 11)break
            }
        }
        c = c.length > 1 ? f.unique(c) : c;
        return this.pushStack(c, "closest", a)
    }, index: function (a) {
        if (!a)return this[0] && this[0].parentNode ? this.prevAll().length : -1;
        if (typeof a == "string")return f.inArray(this[0], f(a));
        return f.inArray(a.jquery ? a[0] : a, this)
    }, add: function (a, b) {
        var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a), d = f.merge(this.get(), c);
        return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
    }, andSelf: function () {
        return this.add(this.prevObject)
    }}), f.each({parent: function (a) {
        var b = a.parentNode;
        return b && b.nodeType !== 11 ? b : null
    }, parents: function (a) {
        return f.dir(a, "parentNode")
    }, parentsUntil: function (a, b, c) {
        return f.dir(a, "parentNode", c)
    }, next: function (a) {
        return f.nth(a, 2, "nextSibling")
    }, prev: function (a) {
        return f.nth(a, 2, "previousSibling")
    }, nextAll: function (a) {
        return f.dir(a, "nextSibling")
    }, prevAll: function (a) {
        return f.dir(a, "previousSibling")
    }, nextUntil: function (a, b, c) {
        return f.dir(a, "nextSibling", c)
    }, prevUntil: function (a, b, c) {
        return f.dir(a, "previousSibling", c)
    }, siblings: function (a) {
        return f.sibling((a.parentNode || {}).firstChild, a)
    }, children: function (a) {
        return f.sibling(a.firstChild)
    }, contents: function (a) {
        return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
    }}, function (a, b) {
        f.fn[a] = function (c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({filter: function (a, b, c) {
        c && (a = ":not(" + a + ")");
        return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
    }, dir: function (a, c, d) {
        var e = [], g = a[c];
        while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d)))g.nodeType === 1 && e.push(g), g = g[c];
        return e
    }, nth: function (a, b, c, d) {
        b = b || 1;
        var e = 0;
        for (; a; a = a[c])if (a.nodeType === 1 && ++e === b)break;
        return a
    }, sibling: function (a, b) {
        var c = [];
        for (; a; a = a.nextSibling)a.nodeType === 1 && a !== b && c.push(a);
        return c
    }});
    var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/, Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i, _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i, bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i, be = /\/(java|ecma)script/i, bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""]}, bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({text: function (a) {
        return f.access(this, function (a) {
            return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
        }, null, a, arguments.length)
    }, wrapAll: function (a) {
        if (f.isFunction(a))return this.each(function (b) {
            f(this).wrapAll(a.call(this, b))
        });
        if (this[0]) {
            var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                var a = this;
                while (a.firstChild && a.firstChild.nodeType === 1)a = a.firstChild;
                return a
            }).append(this)
        }
        return this
    }, wrapInner: function (a) {
        if (f.isFunction(a))return this.each(function (b) {
            f(this).wrapInner(a.call(this, b))
        });
        return this.each(function () {
            var b = f(this), c = b.contents();
            c.length ? c.wrapAll(a) : b.append(a)
        })
    }, wrap: function (a) {
        var b = f.isFunction(a);
        return this.each(function (c) {
            f(this).wrapAll(b ? a.call(this, c) : a)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
        }).end()
    }, append: function () {
        return this.domManip(arguments, !0, function (a) {
            this.nodeType === 1 && this.appendChild(a)
        })
    }, prepend: function () {
        return this.domManip(arguments, !0, function (a) {
            this.nodeType === 1 && this.insertBefore(a, this.firstChild)
        })
    }, before: function () {
        if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (a) {
            this.parentNode.insertBefore(a, this)
        });
        if (arguments.length) {
            var a = f.clean(arguments);
            a.push.apply(a, this.toArray());
            return this.pushStack(a, "before", arguments)
        }
    }, after: function () {
        if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (a) {
            this.parentNode.insertBefore(a, this.nextSibling)
        });
        if (arguments.length) {
            var a = this.pushStack(this, "after", arguments);
            a.push.apply(a, f.clean(arguments));
            return a
        }
    }, remove: function (a, b) {
        for (var c = 0, d; (d = this[c]) != null; c++)if (!a || f.filter(a, [d]).length)!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
        return this
    }, empty: function () {
        for (var a = 0, b; (b = this[a]) != null; a++) {
            b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
            while (b.firstChild)b.removeChild(b.firstChild)
        }
        return this
    }, clone: function (a, b) {
        a = a == null ? !1 : a, b = b == null ? a : b;
        return this.map(function () {
            return f.clone(this, a, b)
        })
    }, html: function (a) {
        return f.access(this, function (a) {
            var c = this[0] || {}, d = 0, e = this.length;
            if (a === b)return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null;
            if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Y, "<$1></$2>");
                try {
                    for (; d < e; d++)c = this[d] || {}, c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                    c = 0
                } catch (g) {
                }
            }
            c && this.empty().append(a)
        }, null, a, arguments.length)
    }, replaceWith: function (a) {
        if (this[0] && this[0].parentNode) {
            if (f.isFunction(a))return this.each(function (b) {
                var c = f(this), d = c.html();
                c.replaceWith(a.call(this, b, d))
            });
            typeof a != "string" && (a = f(a).detach());
            return this.each(function () {
                var b = this.nextSibling, c = this.parentNode;
                f(this).remove(), b ? f(b).before(a) : f(c).append(a)
            })
        }
        return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
    }, detach: function (a) {
        return this.remove(a, !0)
    }, domManip: function (a, c, d) {
        var e, g, h, i, j = a[0], k = [];
        if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j))return this.each(function () {
            f(this).domManip(a, c, d, !0)
        });
        if (f.isFunction(j))return this.each(function (e) {
            var g = f(this);
            a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
        });
        if (this[0]) {
            i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {fragment: i} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
            if (g) {
                c = c && f.nodeName(g, "tr");
                for (var l = 0, m = this.length, n = m - 1; l < m; l++)d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
            }
            k.length && f.each(k, function (a, b) {
                b.src ? f.ajax({type: "GET", global: !1, url: b.src, async: !1, dataType: "script"}) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
            })
        }
        return this
    }}), f.buildFragment = function (a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
        return{fragment: e, cacheable: g}
    }, f.fragments = {}, f.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (a, b) {
        f.fn[a] = function (c) {
            var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({clone: function (a, b, c) {
        var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
        if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
            bk(a, h), d = bl(a), e = bl(h);
            for (g = 0; d[g]; ++g)e[g] && bk(d[g], e[g])
        }
        if (b) {
            bj(a, h);
            if (c) {
                d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g)bj(d[g], e[g])
            }
        }
        d = e = null;
        return h
    }, clean: function (a, b, d, e) {
        var g, h, i, j = [];
        b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
        for (var k = 0, l; (l = a[k]) != null; k++) {
            typeof l == "number" && (l += "");
            if (!l)continue;
            if (typeof l == "string")if (!_.test(l))l = b.createTextNode(l); else {
                l = l.replace(Y, "<$1></$2>");
                var m = (Z.exec(l) || ["", ""])[1].toLowerCase(), n = bg[m] || bg._default, o = n[0], p = b.createElement("div"), q = bh.childNodes, r;
                b === c ? bh.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2];
                while (o--)p = p.lastChild;
                if (!f.support.tbody) {
                    var s = $.test(l), t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];
                    for (i = t.length - 1; i >= 0; --i)f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
                }
                !f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)))
            }
            var u;
            if (!f.support.appendChecked)if (l[0] && typeof(u = l.length) == "number")for (i = 0; i < u; i++)bn(l[i]); else bn(l);
            l.nodeType ? j.push(l) : j = f.merge(j, l)
        }
        if (d) {
            g = function (a) {
                return!a.type || be.test(a.type)
            };
            for (k = 0; j[k]; k++) {
                h = j[k];
                if (e && f.nodeName(h, "script") && (!h.type || be.test(h.type)))e.push(h.parentNode ? h.parentNode.removeChild(h) : h); else {
                    if (h.nodeType === 1) {
                        var v = f.grep(h.getElementsByTagName("script"), g);
                        j.splice.apply(j, [k + 1, 0].concat(v))
                    }
                    d.appendChild(h)
                }
            }
        }
        return j
    }, cleanData: function (a) {
        var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
        for (var h = 0, i; (i = a[h]) != null; h++) {
            if (i.nodeName && f.noData[i.nodeName.toLowerCase()])continue;
            c = i[f.expando];
            if (c) {
                b = d[c];
                if (b && b.events) {
                    for (var j in b.events)e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                    b.handle && (b.handle.elem = null)
                }
                g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
            }
        }
    }});
    var bp = /alpha\([^)]*\)/i, bq = /opacity=([^)]*)/, br = /([A-Z]|^ms)/g, bs = /^[\-+]?(?:\d*\.)?\d+$/i, bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, bu = /^([\-+])=([\-+.\de]+)/, bv = /^margin/, bw = {position: "absolute", visibility: "hidden", display: "block"}, bx = ["Top", "Right", "Bottom", "Left"], by, bz, bA;
    f.fn.css = function (a, c) {
        return f.access(this, function (a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        }, a, c, arguments.length > 1)
    }, f.extend({cssHooks: {opacity: {get: function (a, b) {
        if (b) {
            var c = by(a, "opacity");
            return c === "" ? "1" : c
        }
        return a.style.opacity
    }}}, cssNumber: {fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {"float": f.support.cssFloat ? "cssFloat" : "styleFloat"}, style: function (a, c, d, e) {
        if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
            var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
            c = f.cssProps[i] || i;
            if (d === b) {
                if (k && "get"in k && (g = k.get(a, !1, e)) !== b)return g;
                return j[c]
            }
            h = typeof d, h === "string" && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
            if (d == null || h === "number" && isNaN(d))return;
            h === "number" && !f.cssNumber[i] && (d += "px");
            if (!k || !("set"in k) || (d = k.set(a, d)) !== b)try {
                j[c] = d
            } catch (l) {
            }
        }
    }, css: function (a, c, d) {
        var e, g;
        c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
        if (g && "get"in g && (e = g.get(a, !0, d)) !== b)return e;
        if (by)return by(a, c)
    }, swap: function (a, b, c) {
        var d = {}, e, f;
        for (f in b)d[f] = a.style[f], a.style[f] = b[f];
        e = c.call(a);
        for (f in b)a.style[f] = d[f];
        return e
    }}), f.curCSS = f.css, c.defaultView && c.defaultView.getComputedStyle && (bz = function (a, b) {
        var c, d, e, g, h = a.style;
        b = b.replace(br, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), !f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g);
        return c
    }), c.documentElement.currentStyle && (bA = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        f == null && g && (e = g[b]) && (f = e), bt.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f
    }), by = bz || bA, f.each(["height", "width"], function (a, b) {
        f.cssHooks[b] = {get: function (a, c, d) {
            if (c)return a.offsetWidth !== 0 ? bB(a, b, d) : f.swap(a, bw, function () {
                return bB(a, b, d)
            })
        }, set: function (a, b) {
            return bs.test(b) ? b + "px" : b
        }}
    }), f.support.opacity || (f.cssHooks.opacity = {get: function (a, b) {
        return bq.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
    }, set: function (a, b) {
        var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", g = d && d.filter || c.filter || "";
        c.zoom = 1;
        if (b >= 1 && f.trim(g.replace(bp, "")) === "") {
            c.removeAttribute("filter");
            if (d && !d.filter)return
        }
        c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e
    }}), f(function () {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {get: function (a, b) {
            return f.swap(a, {display: "inline-block"}, function () {
                return b ? by(a, "margin-right") : a.style.marginRight
            })
        }})
    }), f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function (a) {
        return!f.expr.filters.hidden(a)
    }), f.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        f.cssHooks[a + b] = {expand: function (c) {
            var d, e = typeof c == "string" ? c.split(" ") : [c], f = {};
            for (d = 0; d < 4; d++)f[a + bx[d] + b] = e[d] || e[d - 2] || e[0];
            return f
        }}
    });
    var bC = /%20/g, bD = /\[\]$/, bE = /\r?\n/g, bF = /#.*$/, bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bJ = /^(?:GET|HEAD)$/, bK = /^\/\//, bL = /\?/, bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bN = /^(?:select|textarea)/i, bO = /\s+/, bP = /([?&])_=[^&]*/, bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bR = f.fn.load, bS = {}, bT = {}, bU, bV, bW = ["*/"] + ["*"];
    try {
        bU = e.href
    } catch (bX) {
        bU = c.createElement("a"), bU.href = "", bU = bU.href
    }
    bV = bQ.exec(bU.toLowerCase()) || [], f.fn.extend({load: function (a, c, d) {
        if (typeof a != "string" && bR)return bR.apply(this, arguments);
        if (!this.length)return this;
        var e = a.indexOf(" ");
        if (e >= 0) {
            var g = a.slice(e, a.length);
            a = a.slice(0, e)
        }
        var h = "GET";
        c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
        var i = this;
        f.ajax({url: a, type: h, dataType: "html", data: c, complete: function (a, b, c) {
            c = a.responseText, a.isResolved() && (a.done(function (a) {
                c = a
            }), i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)), d && i.each(d, [c, b, a])
        }});
        return this
    }, serialize: function () {
        return f.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            return this.elements ? f.makeArray(this.elements) : this
        }).filter(function () {
            return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type))
        }).map(function (a, b) {
            var c = f(this).val();
            return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                return{name: b.name, value: a.replace(bE, "\r\n")}
            }) : {name: b.name, value: c.replace(bE, "\r\n")}
        }).get()
    }}), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        f.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function (a, c) {
        f[c] = function (a, d, e, g) {
            f.isFunction(d) && (g = g || e, e = d, d = b);
            return f.ajax({type: c, url: a, data: d, success: e, dataType: g})
        }
    }), f.extend({getScript: function (a, c) {
        return f.get(a, b, c, "script")
    }, getJSON: function (a, b, c) {
        return f.get(a, b, c, "json")
    }, ajaxSetup: function (a, b) {
        b ? b$(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b$(a, b);
        return a
    }, ajaxSettings: {url: bU, isLocal: bI.test(bV[1]), global: !0, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", processData: !0, async: !0, accepts: {xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": bW}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText"}, converters: {"* text": a.String, "text html": !0, "text json": f.parseJSON, "text xml": f.parseXML}, flatOptions: {context: !0, url: !0}}, ajaxPrefilter: bY(bS), ajaxTransport: bY(bT), ajax: function (a, c) {
        function w(a, c, l, m) {
            if (s !== 2) {
                s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                var o, r, u, w = c, x = l ? ca(d, v, l) : b, y, z;
                if (a >= 200 && a < 300 || a === 304) {
                    if (d.ifModified) {
                        if (y = v.getResponseHeader("Last-Modified"))f.lastModified[k] = y;
                        if (z = v.getResponseHeader("Etag"))f.etag[k] = z
                    }
                    if (a === 304)w = "notmodified", o = !0; else try {
                        r = cb(d, x), w = "success", o = !0
                    } catch (A) {
                        w = "parsererror", u = A
                    }
                } else {
                    u = w;
                    if (!w || a)w = "error", a < 0 && (a = 0)
                }
                v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
            }
        }

        typeof a == "object" && (c = a, a = b), c = c || {};
        var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {readyState: 0, setRequestHeader: function (a, b) {
            if (!s) {
                var c = a.toLowerCase();
                a = m[c] = m[c] || a, l[a] = b
            }
            return this
        }, getAllResponseHeaders: function () {
            return s === 2 ? n : null
        }, getResponseHeader: function (a) {
            var c;
            if (s === 2) {
                if (!o) {
                    o = {};
                    while (c = bG.exec(n))o[c[1].toLowerCase()] = c[2]
                }
                c = o[a.toLowerCase()]
            }
            return c === b ? null : c
        }, overrideMimeType: function (a) {
            s || (d.mimeType = a);
            return this
        }, abort: function (a) {
            a = a || "abort", p && p.abort(a), w(0, a);
            return this
        }};
        h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
            if (a) {
                var b;
                if (s < 2)for (b in a)j[b] = [j[b], a[b]]; else b = a[v.status], v.then(b, b)
            }
            return this
        }, d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO), d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bV[3] || (bV[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), bZ(bS, d, c, v);
        if (s === 2)return!1;
        t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bJ.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
        if (!d.hasContent) {
            d.data && (d.url += (bL.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
            if (d.cache === !1) {
                var x = f.now(), y = d.url.replace(bP, "$1_=" + x);
                d.url = y + (y === d.url ? (bL.test(d.url) ? "&" : "?") + "_=" + x : "")
            }
        }
        (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bW + "; q=0.01" : "") : d.accepts["*"]);
        for (u in d.headers)v.setRequestHeader(u, d.headers[u]);
        if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
            v.abort();
            return!1
        }
        for (u in{success: 1, error: 1, complete: 1})v[u](d[u]);
        p = bZ(bT, d, c, v);
        if (!p)w(-1, "No Transport"); else {
            v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                v.abort("timeout")
            }, d.timeout));
            try {
                s = 1, p.send(l, w)
            } catch (z) {
                if (s < 2)w(-1, z); else throw z
            }
        }
        return v
    }, param: function (a, c) {
        var d = [], e = function (a, b) {
            b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        c === b && (c = f.ajaxSettings.traditional);
        if (f.isArray(a) || a.jquery && !f.isPlainObject(a))f.each(a, function () {
            e(this.name, this.value)
        }); else for (var g in a)b_(g, a[g], c, e);
        return d.join("&").replace(bC, "+")
    }}), f.extend({active: 0, lastModified: {}, etag: {}});
    var cc = f.now(), cd = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
        return f.expando + "_" + cc++
    }}), f.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(cd, l), b.url === j && (e && (k = k.replace(cd, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                g = [a]
            }, d.always(function () {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function () {
                g || f.error(h + " was not called");
                return g[0]
            }, b.dataTypes[0] = "json";
            return"script"
        }
    }), f.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /javascript|ecmascript/}, converters: {"text script": function (a) {
        f.globalEval(a);
        return a
    }}}), f.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return{send: function (f, g) {
                d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                    if (c || !d.readyState || /loaded|complete/.test(d.readyState))d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                }, e.insertBefore(d, e.firstChild)
            }, abort: function () {
                d && d.onload(0, 1)
            }}
        }
    });
    var ce = a.ActiveXObject ? function () {
        for (var a in cg)cg[a](0, 1)
    } : !1, cf = 0, cg;
    f.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return!this.isLocal && ch() || ci()
    } : ch, function (a) {
        f.extend(f.support, {ajax: !!a, cors: !!a && "withCredentials"in a})
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return{send: function (e, g) {
                var h = c.xhr(), i, j;
                c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                if (c.xhrFields)for (j in c.xhrFields)h[j] = c.xhrFields[j];
                c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                try {
                    for (j in e)h.setRequestHeader(j, e[j])
                } catch (k) {
                }
                h.send(c.hasContent && c.data || null), d = function (a, e) {
                    var j, k, l, m, n;
                    try {
                        if (d && (e || h.readyState === 4)) {
                            d = b, i && (h.onreadystatechange = f.noop, ce && delete cg[i]);
                            if (e)h.readyState !== 4 && h.abort(); else {
                                j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n);
                                try {
                                    m.text = h.responseText
                                } catch (a) {
                                }
                                try {
                                    k = h.statusText
                                } catch (o) {
                                    k = ""
                                }
                                !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                            }
                        }
                    } catch (p) {
                        e || g(-1, p)
                    }
                    m && g(j, k, m, l)
                }, !c.async || h.readyState === 4 ? d() : (i = ++cf, ce && (cg || (cg = {}, f(a).unload(ce)), cg[i] = d), h.onreadystatechange = d)
            }, abort: function () {
                d && d(0, 1)
            }}
        }
    });
    var cj = {}, ck, cl, cm = /^(?:toggle|show|hide)$/, cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, co, cp = [
        ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
        ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
        ["opacity"]
    ], cq;
    f.fn.extend({show: function (a, b, c) {
        var d, e;
        if (a || a === 0)return this.animate(ct("show", 3), a, b, c);
        for (var g = 0, h = this.length; g < h; g++)d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)));
        for (g = 0; g < h; g++) {
            d = this[g];
            if (d.style) {
                e = d.style.display;
                if (e === "" || e === "none")d.style.display = f._data(d, "olddisplay") || ""
            }
        }
        return this
    }, hide: function (a, b, c) {
        if (a || a === 0)return this.animate(ct("hide", 3), a, b, c);
        var d, e, g = 0, h = this.length;
        for (; g < h; g++)d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
        for (g = 0; g < h; g++)this[g].style && (this[g].style.display = "none");
        return this
    }, _toggle: f.fn.toggle, toggle: function (a, b, c) {
        var d = typeof a == "boolean";
        f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
            var b = d ? a : f(this).is(":hidden");
            f(this)[b ? "show" : "hide"]()
        }) : this.animate(ct("toggle", 3), a, b, c);
        return this
    }, fadeTo: function (a, b, c, d) {
        return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
    }, animate: function (a, b, c, d) {
        function g() {
            e.queue === !1 && f._mark(this);
            var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o, p, q;
            b.animatedProperties = {};
            for (i in a) {
                g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]);
                if ((k = f.cssHooks[g]) && "expand"in k) {
                    l = k.expand(a[g]), delete a[g];
                    for (i in l)i in a || (a[i] = l[i])
                }
            }
            for (g in a) {
                h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                if (h === "hide" && d || h === "show" && !d)return b.complete.call(this);
                c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
            }
            b.overflow != null && (this.style.overflow = "hidden");
            for (i in a)j = new f.fx(this, b, i), h = a[i], cm.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), q ? (f._data(this, "toggle" + i, q === "show" ? "hide" : "show"), j[q]()) : j[h]()) : (m = cn.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "" : "px"), p !== "px" && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""));
            return!0
        }

        var e = f.speed(b, c, d);
        if (f.isEmptyObject(a))return this.each(e.complete, [!1]);
        a = f.extend({}, a);
        return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
    }, stop: function (a, c, d) {
        typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
        return this.each(function () {
            function h(a, b, c) {
                var e = b[c];
                f.removeData(a, c, !0), e.stop(d)
            }

            var b, c = !1, e = f.timers, g = f._data(this);
            d || f._unmark(!0, this);
            if (a == null)for (b in g)g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b); else g[b = a + ".run"] && g[b].stop && h(this, g, b);
            for (b = e.length; b--;)e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
            (!d || !c) && f.dequeue(this, a)
        })
    }}), f.each({slideDown: ct("show", 1), slideUp: ct("hide", 1), slideToggle: ct("toggle", 1), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (a, b) {
        f.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({speed: function (a, b, c) {
        var d = a && typeof a == "object" ? f.extend({}, a) : {complete: c || !c && b || f.isFunction(a) && a, duration: a, easing: c && b || b && !f.isFunction(b) && b};
        d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
        if (d.queue == null || d.queue === !0)d.queue = "fx";
        d.old = d.complete, d.complete = function (a) {
            f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
        };
        return d
    }, easing: {linear: function (a) {
        return a
    }, swing: function (a) {
        return-Math.cos(a * Math.PI) / 2 + .5
    }}, timers: [], fx: function (a, b, c) {
        this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
    }}), f.fx.prototype = {update: function () {
        this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
    }, cur: function () {
        if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null))return this.elem[this.prop];
        var a, b = f.css(this.elem, this.prop);
        return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
    }, custom: function (a, c, d) {
        function h(a) {
            return e.step(a)
        }

        var e = this, g = f.fx;
        this.startTime = cq || cr(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
            f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end))
        }, h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval))
    }, show: function () {
        var a = f._data(this.elem, "fxshow" + this.prop);
        this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
    }, hide: function () {
        this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
    }, step: function (a) {
        var b, c, d, e = cq || cr(), g = !0, h = this.elem, i = this.options;
        if (a || e >= i.duration + this.startTime) {
            this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
            for (b in i.animatedProperties)i.animatedProperties[b] !== !0 && (g = !1);
            if (g) {
                i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                    h.style["overflow" + b] = i.overflow[a]
                }), i.hide && f(h).hide();
                if (i.hide || i.show)for (b in i.animatedProperties)f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                d = i.complete, d && (i.complete = !1, d.call(h))
            }
            return!1
        }
        i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
        return!0
    }}, f.extend(f.fx, {tick: function () {
        var a, b = f.timers, c = 0;
        for (; c < b.length; c++)a = b[c], !a() && b[c] === a && b.splice(c--, 1);
        b.length || f.fx.stop()
    }, interval: 13, stop: function () {
        clearInterval(co), co = null
    }, speeds: {slow: 600, fast: 200, _default: 400}, step: {opacity: function (a) {
        f.style(a.elem, "opacity", a.now)
    }, _default: function (a) {
        a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
    }}}), f.each(cp.concat.apply([], cp), function (a, b) {
        b.indexOf("margin") && (f.fx.step[b] = function (a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        })
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
        return f.grep(f.timers, function (b) {
            return a === b.elem
        }).length
    });
    var cv, cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
    "getBoundingClientRect"in c.documentElement ? cv = function (a, b, c, d) {
        try {
            d = a.getBoundingClientRect()
        } catch (e) {
        }
        if (!d || !f.contains(c, a))return d ? {top: d.top, left: d.left} : {top: 0, left: 0};
        var g = b.body, h = cy(b), i = c.clientTop || g.clientTop || 0, j = c.clientLeft || g.clientLeft || 0, k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop, l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft, m = d.top + k - i, n = d.left + l - j;
        return{top: m, left: n}
    } : cv = function (a, b, c) {
        var d, e = a.offsetParent, g = a, h = b.body, i = b.defaultView, j = i ? i.getComputedStyle(a, null) : a.currentStyle, k = a.offsetTop, l = a.offsetLeft;
        while ((a = a.parentNode) && a !== h && a !== c) {
            if (f.support.fixedPosition && j.position === "fixed")break;
            d = i ? i.getComputedStyle(a, null) : a.currentStyle, k -= a.scrollTop, l -= a.scrollLeft, a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent), f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), j = d
        }
        if (j.position === "relative" || j.position === "static")k += h.offsetTop, l += h.offsetLeft;
        f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft));
        return{top: k, left: l}
    }, f.fn.offset = function (a) {
        if (arguments.length)return a === b ? this : this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        var c = this[0], d = c && c.ownerDocument;
        if (!d)return null;
        if (c === d.body)return f.offset.bodyOffset(c);
        return cv(c, d, d.documentElement)
    }, f.offset = {bodyOffset: function (a) {
        var b = a.offsetTop, c = a.offsetLeft;
        f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
        return{top: b, left: c}
    }, setOffset: function (a, b, c) {
        var d = f.css(a, "position");
        d === "static" && (a.style.position = "relative");
        var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
        j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using"in b ? b.using.call(a, k) : e.css(k)
    }}, f.fn.extend({position: function () {
        if (!this[0])return null;
        var a = this[0], b = this.offsetParent(), c = this.offset(), d = cx.test(b[0].nodeName) ? {top: 0, left: 0} : b.offset();
        c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
        return{top: c.top - d.top, left: c.left - d.left}
    }, offsetParent: function () {
        return this.map(function () {
            var a = this.offsetParent || c.body;
            while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static")a = a.offsetParent;
            return a
        })
    }}), f.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, c) {
        var d = /Y/.test(c);
        f.fn[a] = function (e) {
            return f.access(this, function (a, e, g) {
                var h = cy(a);
                if (g === b)return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e];
                h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g
            }, a, e, arguments.length, null)
        }
    }), f.each({Height: "height", Width: "width"}, function (a, c) {
        var d = "client" + a, e = "scroll" + a, g = "offset" + a;
        f.fn["inner" + a] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null
        }, f.fn["outer" + a] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null
        }, f.fn[c] = function (a) {
            return f.access(this, function (a, c, h) {
                var i, j, k, l;
                if (f.isWindow(a)) {
                    i = a.document, j = i.documentElement[d];
                    return f.support.boxModel && j || i.body && i.body[d] || j
                }
                if (a.nodeType === 9) {
                    i = a.documentElement;
                    if (i[d] >= i[e])return i[d];
                    return Math.max(a.body[e], i[e], a.body[g], i[g])
                }
                if (h === b) {
                    k = f.css(a, c), l = parseFloat(k);
                    return f.isNumeric(l) ? l : k
                }
                f(a).css(c, h)
            }, c, a, arguments.length, null)
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return f
    })
})(window);
(function () {
    var e = this, t = e._, n = {}, r = Array.prototype, i = Object.prototype, s = Function.prototype, o = r.push, u = r.slice, a = r.concat, f = r.unshift, l = i.toString, c = i.hasOwnProperty, h = r.forEach, p = r.map, d = r.reduce, v = r.reduceRight, m = r.filter, g = r.every, y = r.some, b = r.indexOf, w = r.lastIndexOf, E = Array.isArray, S = Object.keys, x = s.bind, T = function (e) {
        if (e instanceof T)return e;
        if (!(this instanceof T))return new T(e);
        this._wrapped = e
    };
    typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = T), exports._ = T) : e._ = T, T.VERSION = "1.4.0";
    var N = T.each = T.forEach = function (e, t, r) {
        if (h && e.forEach === h)e.forEach(t, r); else if (e.length === +e.length) {
            for (var i = 0, s = e.length; i < s; i++)if (t.call(r, e[i], i, e) === n)return
        } else for (var o in e)if (T.has(e, o) && t.call(r, e[o], o, e) === n)return
    };
    T.map = T.collect = function (e, t, n) {
        var r = [];
        return p && e.map === p ? e.map(t, n) : (N(e, function (e, i, s) {
            r[r.length] = t.call(n, e, i, s)
        }), r)
    }, T.reduce = T.foldl = T.inject = function (e, t, n, r) {
        var i = arguments.length > 2;
        if (d && e.reduce === d)return r && (t = T.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
        N(e, function (e, s, o) {
            i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
        });
        if (!i)throw new TypeError("Reduce of empty array with no initial value");
        return n
    }, T.reduceRight = T.foldr = function (e, t, n, r) {
        var i = arguments.length > 2;
        if (v && e.reduceRight === v)return r && (t = T.bind(t, r)), arguments.length > 2 ? e.reduceRight(t, n) : e.reduceRight(t);
        var s = e.length;
        if (s !== +s) {
            var o = T.keys(e);
            s = o.length
        }
        N(e, function (u, a, f) {
            a = o ? o[--s] : --s, i ? n = t.call(r, n, e[a], a, f) : (n = e[a], i = !0)
        });
        if (!i)throw new TypeError("Reduce of empty array with no initial value");
        return n
    }, T.find = T.detect = function (e, t, n) {
        var r;
        return C(e, function (e, i, s) {
            if (t.call(n, e, i, s))return r = e, !0
        }), r
    }, T.filter = T.select = function (e, t, n) {
        var r = [];
        return m && e.filter === m ? e.filter(t, n) : (N(e, function (e, i, s) {
            t.call(n, e, i, s) && (r[r.length] = e)
        }), r)
    }, T.reject = function (e, t, n) {
        var r = [];
        return N(e, function (e, i, s) {
            t.call(n, e, i, s) || (r[r.length] = e)
        }), r
    }, T.every = T.all = function (e, t, r) {
        t || (t = T.identity);
        var i = !0;
        return g && e.every === g ? e.every(t, r) : (N(e, function (e, s, o) {
            if (!(i = i && t.call(r, e, s, o)))return n
        }), !!i)
    };
    var C = T.some = T.any = function (e, t, r) {
        t || (t = T.identity);
        var i = !1;
        return y && e.some === y ? e.some(t, r) : (N(e, function (e, s, o) {
            if (i || (i = t.call(r, e, s, o)))return n
        }), !!i)
    };
    T.contains = T.include = function (e, t) {
        var n = !1;
        return b && e.indexOf === b ? e.indexOf(t) != -1 : (n = C(e, function (e) {
            return e === t
        }), n)
    }, T.invoke = function (e, t) {
        var n = u.call(arguments, 2);
        return T.map(e, function (e) {
            return(T.isFunction(t) ? t : e[t]).apply(e, n)
        })
    }, T.pluck = function (e, t) {
        return T.map(e, function (e) {
            return e[t]
        })
    }, T.where = function (e, t) {
        return T.isEmpty(t) ? [] : T.filter(e, function (e) {
            for (var n in t)if (t[n] !== e[n])return!1;
            return!0
        })
    }, T.max = function (e, t, n) {
        if (!t && T.isArray(e) && e[0] === +e[0] && e.length < 65535)return Math.max.apply(Math, e);
        if (!t && T.isEmpty(e))return-Infinity;
        var r = {computed: -Infinity};
        return N(e, function (e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o >= r.computed && (r = {value: e, computed: o})
        }), r.value
    }, T.min = function (e, t, n) {
        if (!t && T.isArray(e) && e[0] === +e[0] && e.length < 65535)return Math.min.apply(Math, e);
        if (!t && T.isEmpty(e))return Infinity;
        var r = {computed: Infinity};
        return N(e, function (e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o < r.computed && (r = {value: e, computed: o})
        }), r.value
    }, T.shuffle = function (e) {
        var t, n = 0, r = [];
        return N(e, function (e) {
            t = T.random(n++), r[n - 1] = r[t], r[t] = e
        }), r
    };
    var k = function (e) {
        return T.isFunction(e) ? e : function (t) {
            return t[e]
        }
    };
    T.sortBy = function (e, t, n) {
        var r = k(t);
        return T.pluck(T.map(e, function (e, t, i) {
            return{value: e, index: t, criteria: r.call(n, e, t, i)}
        }).sort(function (e, t) {
            var n = e.criteria, r = t.criteria;
            if (n !== r) {
                if (n > r || n === void 0)return 1;
                if (n < r || r === void 0)return-1
            }
            return e.index < t.index ? -1 : 1
        }), "value")
    };
    var L = function (e, t, n, r) {
        var i = {}, s = k(t);
        return N(e, function (t, o) {
            var u = s.call(n, t, o, e);
            r(i, u, t)
        }), i
    };
    T.groupBy = function (e, t, n) {
        return L(e, t, n, function (e, t, n) {
            (T.has(e, t) ? e[t] : e[t] = []).push(n)
        })
    }, T.countBy = function (e, t, n) {
        return L(e, t, n, function (e, t, n) {
            T.has(e, t) || (e[t] = 0), e[t]++
        })
    }, T.sortedIndex = function (e, t, n, r) {
        n = n == null ? T.identity : k(n);
        var i = n.call(r, t), s = 0, o = e.length;
        while (s < o) {
            var u = s + o >>> 1;
            n.call(r, e[u]) < i ? s = u + 1 : o = u
        }
        return s
    }, T.toArray = function (e) {
        return e ? e.length === +e.length ? u.call(e) : T.values(e) : []
    }, T.size = function (e) {
        return e.length === +e.length ? e.length : T.keys(e).length
    }, T.first = T.head = T.take = function (e, t, n) {
        return t != null && !n ? u.call(e, 0, t) : e[0]
    }, T.initial = function (e, t, n) {
        return u.call(e, 0, e.length - (t == null || n ? 1 : t))
    }, T.last = function (e, t, n) {
        return t != null && !n ? u.call(e, Math.max(e.length - t, 0)) : e[e.length - 1]
    }, T.rest = T.tail = T.drop = function (e, t, n) {
        return u.call(e, t == null || n ? 1 : t)
    }, T.compact = function (e) {
        return T.filter(e, function (e) {
            return!!e
        })
    };
    var A = function (e, t, n) {
        return N(e, function (e) {
            T.isArray(e) ? t ? o.apply(n, e) : A(e, t, n) : n.push(e)
        }), n
    };
    T.flatten = function (e, t) {
        return A(e, t, [])
    }, T.without = function (e) {
        return T.difference(e, u.call(arguments, 1))
    }, T.uniq = T.unique = function (e, t, n, r) {
        var i = n ? T.map(e, n, r) : e, s = [], o = [];
        return N(i, function (n, r) {
            if (t ? !r || o[o.length - 1] !== n : !T.contains(o, n))o.push(n), s.push(e[r])
        }), s
    }, T.union = function () {
        return T.uniq(a.apply(r, arguments))
    }, T.intersection = function (e) {
        var t = u.call(arguments, 1);
        return T.filter(T.uniq(e), function (e) {
            return T.every(t, function (t) {
                return T.indexOf(t, e) >= 0
            })
        })
    }, T.difference = function (e) {
        var t = a.apply(r, u.call(arguments, 1));
        return T.filter(e, function (e) {
            return!T.contains(t, e)
        })
    }, T.zip = function () {
        var e = u.call(arguments), t = T.max(T.pluck(e, "length")), n = new Array(t);
        for (var r = 0; r < t; r++)n[r] = T.pluck(e, "" + r);
        return n
    }, T.object = function (e, t) {
        var n = {};
        for (var r = 0, i = e.length; r < i; r++)t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
        return n
    }, T.indexOf = function (e, t, n) {
        var r = 0, i = e.length;
        if (n) {
            if (typeof n != "number")return r = T.sortedIndex(e, t), e[r] === t ? r : -1;
            r = n < 0 ? Math.max(0, i + n) : n
        }
        if (b && e.indexOf === b)return e.indexOf(t, n);
        for (; r < i; r++)if (e[r] === t)return r;
        return-1
    }, T.lastIndexOf = function (e, t, n) {
        if (w && e.lastIndexOf === w)return e.lastIndexOf(t, n);
        var r = n != null ? n : e.length;
        while (r--)if (e[r] === t)return r;
        return-1
    }, T.range = function (e, t, n) {
        arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
        var r = Math.max(Math.ceil((t - e) / n), 0), i = 0, s = new Array(r);
        while (i < r)s[i++] = e, e += n;
        return s
    };
    var O = function () {
    };
    T.bind = function (t, n) {
        var r, i;
        if (t.bind === x && x)return x.apply(t, u.call(arguments, 1));
        if (!T.isFunction(t))throw new TypeError;
        return i = u.call(arguments, 2), r = function () {
            if (this instanceof r) {
                O.prototype = t.prototype;
                var e = new O, s = t.apply(e, i.concat(u.call(arguments)));
                return Object(s) === s ? s : e
            }
            return t.apply(n, i.concat(u.call(arguments)))
        }
    }, T.bindAll = function (e) {
        var t = u.call(arguments, 1);
        return t.length == 0 && (t = T.functions(e)), N(t, function (t) {
            e[t] = T.bind(e[t], e)
        }), e
    }, T.memoize = function (e, t) {
        var n = {};
        return t || (t = T.identity), function () {
            var r = t.apply(this, arguments);
            return T.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
        }
    }, T.delay = function (e, t) {
        var n = u.call(arguments, 2);
        return setTimeout(function () {
            return e.apply(null, n)
        }, t)
    }, T.defer = function (e) {
        return T.delay.apply(T, [e, 1].concat(u.call(arguments, 1)))
    }, T.throttle = function (e, t) {
        var n, r, i, s, o, u, a = T.debounce(function () {
            o = s = !1
        }, t);
        return function () {
            n = this, r = arguments;
            var f = function () {
                i = null, o && (u = e.apply(n, r)), a()
            };
            return i || (i = setTimeout(f, t)), s ? o = !0 : (s = !0, u = e.apply(n, r)), a(), u
        }
    }, T.debounce = function (e, t, n) {
        var r, i;
        return function () {
            var s = this, o = arguments, u = function () {
                r = null, n || (i = e.apply(s, o))
            }, a = n && !r;
            return clearTimeout(r), r = setTimeout(u, t), a && (i = e.apply(s, o)), i
        }
    }, T.once = function (e) {
        var t = !1, n;
        return function () {
            return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
        }
    }, T.wrap = function (e, t) {
        return function () {
            var n = [e];
            return o.apply(n, arguments), t.apply(this, n)
        }
    }, T.compose = function () {
        var e = arguments;
        return function () {
            var t = arguments;
            for (var n = e.length - 1; n >= 0; n--)t = [e[n].apply(this, t)];
            return t[0]
        }
    }, T.after = function (e, t) {
        return e <= 0 ? t() : function () {
            if (--e < 1)return t.apply(this, arguments)
        }
    }, T.keys = S || function (e) {
        if (e !== Object(e))throw new TypeError("Invalid object");
        var t = [];
        for (var n in e)T.has(e, n) && (t[t.length] = n);
        return t
    }, T.values = function (e) {
        var t = [];
        for (var n in e)T.has(e, n) && t.push(e[n]);
        return t
    }, T.pairs = function (e) {
        var t = [];
        for (var n in e)T.has(e, n) && t.push([n, e[n]]);
        return t
    }, T.invert = function (e) {
        var t = {};
        for (var n in e)T.has(e, n) && (t[e[n]] = n);
        return t
    }, T.functions = T.methods = function (e) {
        var t = [];
        for (var n in e)T.isFunction(e[n]) && t.push(n);
        return t.sort()
    }, T.extend = function (e) {
        return N(u.call(arguments, 1), function (t) {
            for (var n in t)e[n] = t[n]
        }), e
    }, T.pick = function (e) {
        var t = {}, n = a.apply(r, u.call(arguments, 1));
        return N(n, function (n) {
            n in e && (t[n] = e[n])
        }), t
    }, T.omit = function (e) {
        var t = {}, n = a.apply(r, u.call(arguments, 1));
        for (var i in e)T.contains(n, i) || (t[i] = e[i]);
        return t
    }, T.defaults = function (e) {
        return N(u.call(arguments, 1), function (t) {
            for (var n in t)e[n] == null && (e[n] = t[n])
        }), e
    }, T.clone = function (e) {
        return T.isObject(e) ? T.isArray(e) ? e.slice() : T.extend({}, e) : e
    }, T.tap = function (e, t) {
        return t(e), e
    };
    var M = function (e, t, n, r) {
        if (e === t)return e !== 0 || 1 / e == 1 / t;
        if (e == null || t == null)return e === t;
        e instanceof T && (e = e._wrapped), t instanceof T && (t = t._wrapped);
        var i = l.call(e);
        if (i != l.call(t))return!1;
        switch (i) {
            case"[object String]":
                return e == String(t);
            case"[object Number]":
                return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
            case"[object Date]":
            case"[object Boolean]":
                return+e == +t;
            case"[object RegExp]":
                return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
        }
        if (typeof e != "object" || typeof t != "object")return!1;
        var s = n.length;
        while (s--)if (n[s] == e)return r[s] == t;
        n.push(e), r.push(t);
        var o = 0, u = !0;
        if (i == "[object Array]") {
            o = e.length, u = o == t.length;
            if (u)while (o--)if (!(u = M(e[o], t[o], n, r)))break
        } else {
            var a = e.constructor, f = t.constructor;
            if (a !== f && !(T.isFunction(a) && a instanceof a && T.isFunction(f) && f instanceof f))return!1;
            for (var c in e)if (T.has(e, c)) {
                o++;
                if (!(u = T.has(t, c) && M(e[c], t[c], n, r)))break
            }
            if (u) {
                for (c in t)if (T.has(t, c) && !(o--))break;
                u = !o
            }
        }
        return n.pop(), r.pop(), u
    };
    T.isEqual = function (e, t) {
        return M(e, t, [], [])
    }, T.isEmpty = function (e) {
        if (e == null)return!0;
        if (T.isArray(e) || T.isString(e))return e.length === 0;
        for (var t in e)if (T.has(e, t))return!1;
        return!0
    }, T.isElement = function (e) {
        return!!e && e.nodeType === 1
    }, T.isArray = E || function (e) {
        return l.call(e) == "[object Array]"
    }, T.isObject = function (e) {
        return e === Object(e)
    }, N(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (e) {
        T["is" + e] = function (t) {
            return l.call(t) == "[object " + e + "]"
        }
    }), T.isArguments(arguments) || (T.isArguments = function (e) {
        return!!e && !!T.has(e, "callee")
    }), typeof/./ != "function" && (T.isFunction = function (e) {
        return typeof e == "function"
    }), T.isFinite = function (e) {
        return T.isNumber(e) && isFinite(e)
    }, T.isNaN = function (e) {
        return T.isNumber(e) && e != +e
    }, T.isBoolean = function (e) {
        return e === !0 || e === !1 || l.call(e) == "[object Boolean]"
    }, T.isNull = function (e) {
        return e === null
    }, T.isUndefined = function (e) {
        return e === void 0
    }, T.has = function (e, t) {
        return c.call(e, t)
    }, T.noConflict = function () {
        return e._ = t, this
    }, T.identity = function (e) {
        return e
    }, T.times = function (e, t, n) {
        for (var r = 0; r < e; r++)t.call(n, r)
    }, T.random = function (e, t) {
        return t == null && (t = e, e = 0), e + (0 | Math.random() * (t - e + 1))
    };
    var _ = {escape: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;"}};
    _.unescape = T.invert(_.escape);
    var D = {escape: new RegExp("[" + T.keys(_.escape).join("") + "]", "g"), unescape: new RegExp("(" + T.keys(_.unescape).join("|") + ")", "g")};
    T.each(["escape", "unescape"], function (e) {
        T[e] = function (t) {
            return t == null ? "" : ("" + t).replace(D[e], function (t) {
                return _[e][t]
            })
        }
    }), T.result = function (e, t) {
        if (e == null)return null;
        var n = e[t];
        return T.isFunction(n) ? n.call(e) : n
    }, T.mixin = function (e) {
        N(T.functions(e), function (t) {
            var n = T[t] = e[t];
            T.prototype[t] = function () {
                var e = [this._wrapped];
                return o.apply(e, arguments), F.call(this, n.apply(T, e))
            }
        })
    };
    var P = 0;
    T.uniqueId = function (e) {
        var t = P++;
        return e ? e + t : t
    }, T.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var H = /(.)^/, B = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "	": "t", "\u2028": "u2028", "\u2029": "u2029"}, j = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    T.template = function (e, t, n) {
        n = T.defaults({}, n, T.templateSettings);
        var r = new RegExp([(n.escape || H).source, (n.interpolate || H).source, (n.evaluate || H).source].join("|") + "|$", "g"), i = 0, s = "__p+='";
        e.replace(r, function (t, n, r, o, u) {
            s += e.slice(i, u).replace(j, function (e) {
                return"\\" + B[e]
            }), s += n ? "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : o ? "';\n" + o + "\n__p+='" : "", i = u + t.length
        }), s += "';\n", n.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
        try {
            var o = new Function(n.variable || "obj", "_", s)
        } catch (u) {
            throw u.source = s, u
        }
        if (t)return o(t, T);
        var a = function (e) {
            return o.call(this, e, T)
        };
        return a.source = "function(" + (n.variable || "obj") + "){\n" + s + "}", a
    }, T.chain = function (e) {
        return T(e).chain()
    };
    var F = function (e) {
        return this._chain ? T(e).chain() : e
    };
    T.mixin(T), N(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
        var t = r[e];
        T.prototype[e] = function () {
            var n = this._wrapped;
            return t.apply(n, arguments), (e == "shift" || e == "splice") && n.length === 0 && delete n[0], F.call(this, n)
        }
    }), N(["concat", "join", "slice"], function (e) {
        var t = r[e];
        T.prototype[e] = function () {
            return F.call(this, t.apply(this._wrapped, arguments))
        }
    }), T.extend(T.prototype, {chain: function () {
        return this._chain = !0, this
    }, value: function () {
        return this._wrapped
    }})
}).call(this);
(function () {
    var l = this, y = l.Backbone, z = Array.prototype.slice, A = Array.prototype.splice, g;
    g = "undefined" !== typeof exports ? exports : l.Backbone = {};
    g.VERSION = "0.9.2";
    var f = l._;
    !f && "undefined" !== typeof require && (f = require("underscore"));
    var i = l.jQuery || l.Zepto || l.ender;
    g.setDomLibrary = function (a) {
        i = a
    };
    g.noConflict = function () {
        l.Backbone = y;
        return this
    };
    g.emulateHTTP = !1;
    g.emulateJSON = !1;
    var p = /\s+/, k = g.Events = {on: function (a, b, c) {
        var d, e, f, g, j;
        if (!b)return this;
        a = a.split(p);
        for (d = this._callbacks || (this._callbacks = {}); e = a.shift();)f = (j = d[e]) ? j.tail : {}, f.next = g = {}, f.context = c, f.callback = b, d[e] = {tail: g, next: j ? j.next : f};
        return this
    }, off: function (a, b, c) {
        var d, e, h, g, j, q;
        if (e = this._callbacks) {
            if (!a && !b && !c)return delete this._callbacks, this;
            for (a = a ? a.split(p) : f.keys(e); d = a.shift();)if (h = e[d], delete e[d], h && (b || c))for (g = h.tail; (h = h.next) !== g;)if (j = h.callback, q = h.context, b && j !== b || c && q !== c)this.on(d, j, q);
            return this
        }
    }, trigger: function (a) {
        var b, c, d, e, f, g;
        if (!(d = this._callbacks))return this;
        f = d.all;
        a = a.split(p);
        for (g = z.call(arguments, 1); b = a.shift();) {
            if (c = d[b])for (e = c.tail; (c = c.next) !== e;)c.callback.apply(c.context || this, g);
            if (c = f) {
                e = c.tail;
                for (b = [b].concat(g); (c = c.next) !== e;)c.callback.apply(c.context || this, b)
            }
        }
        return this
    }};
    k.bind = k.on;
    k.unbind = k.off;
    var o = g.Model = function (a, b) {
        var c;
        a || (a = {});
        b && b.parse && (a = this.parse(a));
        if (c = n(this, "defaults"))a = f.extend({}, c, a);
        b && b.collection && (this.collection = b.collection);
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = f.uniqueId("c");
        this.changed = {};
        this._silent = {};
        this._pending = {};
        this.set(a, {silent: !0});
        this.changed = {};
        this._silent = {};
        this._pending = {};
        this._previousAttributes = f.clone(this.attributes);
        this.initialize.apply(this, arguments)
    };
    f.extend(o.prototype, k, {changed: null, _silent: null, _pending: null, idAttribute: "id", initialize: function () {
    }, toJSON: function () {
        return f.clone(this.attributes)
    }, get: function (a) {
        return this.attributes[a]
    }, escape: function (a) {
        var b;
        if (b = this._escapedAttributes[a])return b;
        b = this.get(a);
        return this._escapedAttributes[a] = f.escape(null == b ? "" : "" + b)
    }, has: function (a) {
        return null != this.get(a)
    }, set: function (a, b, c) {
        var d, e;
        f.isObject(a) || null == a ? (d = a, c = b) : (d = {}, d[a] = b);
        c || (c = {});
        if (!d)return this;
        d instanceof o && (d = d.attributes);
        if (c.unset)for (e in d)d[e] = void 0;
        if (!this._validate(d, c))return!1;
        this.idAttribute in d && (this.id = d[this.idAttribute]);
        var b = c.changes = {}, h = this.attributes, g = this._escapedAttributes, j = this._previousAttributes || {};
        for (e in d) {
            a = d[e];
            if (!f.isEqual(h[e], a) || c.unset && f.has(h, e))delete g[e], (c.silent ? this._silent : b)[e] = !0;
            c.unset ? delete h[e] : h[e] = a;
            !f.isEqual(j[e], a) || f.has(h, e) != f.has(j, e) ? (this.changed[e] = a, c.silent || (this._pending[e] = !0)) : (delete this.changed[e], delete this._pending[e])
        }
        c.silent || this.change(c);
        return this
    }, unset: function (a, b) {
        (b || (b = {})).unset = !0;
        return this.set(a, null, b)
    }, clear: function (a) {
        (a || (a = {})).unset = !0;
        return this.set(f.clone(this.attributes), a)
    }, fetch: function (a) {
        var a = a ? f.clone(a) : {}, b = this, c = a.success;
        a.success = function (d, e, f) {
            if (!b.set(b.parse(d, f), a))return!1;
            c && c(b, d)
        };
        a.error = g.wrapError(a.error, b, a);
        return(this.sync || g.sync).call(this, "read", this, a)
    }, save: function (a, b, c) {
        var d, e;
        f.isObject(a) || null == a ? (d = a, c = b) : (d = {}, d[a] = b);
        c = c ? f.clone(c) : {};
        if (c.wait) {
            if (!this._validate(d, c))return!1;
            e = f.clone(this.attributes)
        }
        a = f.extend({}, c, {silent: !0});
        if (d && !this.set(d, c.wait ? a : c))return!1;
        var h = this, i = c.success;
        c.success = function (a, b, e) {
            b = h.parse(a, e);
            if (c.wait) {
                delete c.wait;
                b = f.extend(d || {}, b)
            }
            if (!h.set(b, c))return false;
            i ? i(h, a) : h.trigger("sync", h, a, c)
        };
        c.error = g.wrapError(c.error, h, c);
        b = this.isNew() ? "create" : "update";
        b = (this.sync || g.sync).call(this, b, this, c);
        c.wait && this.set(e, a);
        return b
    }, destroy: function (a) {
        var a = a ? f.clone(a) : {}, b = this, c = a.success, d = function () {
            b.trigger("destroy", b, b.collection, a)
        };
        if (this.isNew())return d(), !1;
        a.success = function (e) {
            a.wait && d();
            c ? c(b, e) : b.trigger("sync", b, e, a)
        };
        a.error = g.wrapError(a.error, b, a);
        var e = (this.sync || g.sync).call(this, "delete", this, a);
        a.wait || d();
        return e
    }, url: function () {
        var a = n(this, "urlRoot") || n(this.collection, "url") || t();
        return this.isNew() ? a : a + ("/" == a.charAt(a.length - 1) ? "" : "/") + encodeURIComponent(this.id)
    }, parse: function (a) {
        return a
    }, clone: function () {
        return new this.constructor(this.attributes)
    }, isNew: function () {
        return null == this.id
    }, change: function (a) {
        a || (a = {});
        var b = this._changing;
        this._changing = !0;
        for (var c in this._silent)this._pending[c] = !0;
        var d = f.extend({}, a.changes, this._silent);
        this._silent = {};
        for (c in d)this.trigger("change:" + c, this, this.get(c), a);
        if (b)return this;
        for (; !f.isEmpty(this._pending);) {
            this._pending = {};
            this.trigger("change", this, a);
            for (c in this.changed)!this._pending[c] && !this._silent[c] && delete this.changed[c];
            this._previousAttributes = f.clone(this.attributes)
        }
        this._changing = !1;
        return this
    }, hasChanged: function (a) {
        return!arguments.length ? !f.isEmpty(this.changed) : f.has(this.changed, a)
    }, changedAttributes: function (a) {
        if (!a)return this.hasChanged() ? f.clone(this.changed) : !1;
        var b, c = !1, d = this._previousAttributes, e;
        for (e in a)if (!f.isEqual(d[e], b = a[e]))(c || (c = {}))[e] = b;
        return c
    }, previous: function (a) {
        return!arguments.length || !this._previousAttributes ? null : this._previousAttributes[a]
    }, previousAttributes: function () {
        return f.clone(this._previousAttributes)
    }, isValid: function () {
        return!this.validate(this.attributes)
    }, _validate: function (a, b) {
        if (b.silent || !this.validate)return!0;
        var a = f.extend({}, this.attributes, a), c = this.validate(a, b);
        if (!c)return!0;
        b && b.error ? b.error(this, c, b) : this.trigger("error", this, c, b);
        return!1
    }});
    var r = g.Collection = function (a, b) {
        b || (b = {});
        b.model && (this.model = b.model);
        b.comparator && (this.comparator = b.comparator);
        this._reset();
        this.initialize.apply(this, arguments);
        a && this.reset(a, {silent: !0, parse: b.parse})
    };
    f.extend(r.prototype, k, {model: o, initialize: function () {
    }, toJSON: function (a) {
        return this.map(function (b) {
            return b.toJSON(a)
        })
    }, add: function (a, b) {
        var c, d, e, g, i, j = {}, k = {}, l = [];
        b || (b = {});
        a = f.isArray(a) ? a.slice() : [a];
        c = 0;
        for (d = a.length; c < d; c++) {
            if (!(e = a[c] = this._prepareModel(a[c], b)))throw Error("Can't add an invalid model to a collection");
            g = e.cid;
            i = e.id;
            j[g] || this._byCid[g] || null != i && (k[i] || this._byId[i]) ? l.push(c) : j[g] = k[i] = e
        }
        for (c = l.length; c--;)a.splice(l[c], 1);
        c = 0;
        for (d = a.length; c < d; c++)(e = a[c]).on("all", this._onModelEvent, this), this._byCid[e.cid] = e, null != e.id && (this._byId[e.id] = e);
        this.length += d;
        A.apply(this.models, [null != b.at ? b.at : this.models.length, 0].concat(a));
        this.comparator && this.sort({silent: !0});
        if (b.silent)return this;
        c = 0;
        for (d = this.models.length; c < d; c++)if (j[(e = this.models[c]).cid])b.index = c, e.trigger("add", e, this, b);
        return this
    }, remove: function (a, b) {
        var c, d, e, g;
        b || (b = {});
        a = f.isArray(a) ? a.slice() : [a];
        c = 0;
        for (d = a.length; c < d; c++)if (g = this.getByCid(a[c]) || this.get(a[c]))delete this._byId[g.id], delete this._byCid[g.cid], e = this.indexOf(g), this.models.splice(e, 1), this.length--, b.silent || (b.index = e, g.trigger("remove", g, this, b)), this._removeReference(g);
        return this
    }, push: function (a, b) {
        a = this._prepareModel(a, b);
        this.add(a, b);
        return a
    }, pop: function (a) {
        var b = this.at(this.length - 1);
        this.remove(b, a);
        return b
    }, unshift: function (a, b) {
        a = this._prepareModel(a, b);
        this.add(a, f.extend({at: 0}, b));
        return a
    }, shift: function (a) {
        var b = this.at(0);
        this.remove(b, a);
        return b
    }, get: function (a) {
        return null == a ? void 0 : this._byId[null != a.id ? a.id : a]
    }, getByCid: function (a) {
        return a && this._byCid[a.cid || a]
    }, at: function (a) {
        return this.models[a]
    }, where: function (a) {
        return f.isEmpty(a) ? [] : this.filter(function (b) {
            for (var c in a)if (a[c] !== b.get(c))return!1;
            return!0
        })
    }, sort: function (a) {
        a || (a = {});
        if (!this.comparator)throw Error("Cannot sort a set without a comparator");
        var b = f.bind(this.comparator, this);
        1 == this.comparator.length ? this.models = this.sortBy(b) : this.models.sort(b);
        a.silent || this.trigger("reset", this, a);
        return this
    }, pluck: function (a) {
        return f.map(this.models, function (b) {
            return b.get(a)
        })
    }, reset: function (a, b) {
        a || (a = []);
        b || (b = {});
        for (var c = 0, d = this.models.length; c < d; c++)this._removeReference(this.models[c]);
        this._reset();
        this.add(a, f.extend({silent: !0}, b));
        b.silent || this.trigger("reset", this, b);
        return this
    }, fetch: function (a) {
        a = a ? f.clone(a) : {};
        void 0 === a.parse && (a.parse = !0);
        var b = this, c = a.success;
        a.success = function (d, e, f) {
            b[a.add ? "add" : "reset"](b.parse(d, f), a);
            c && c(b, d)
        };
        a.error = g.wrapError(a.error, b, a);
        return(this.sync || g.sync).call(this, "read", this, a)
    }, create: function (a, b) {
        var c = this, b = b ? f.clone(b) : {}, a = this._prepareModel(a, b);
        if (!a)return!1;
        b.wait || c.add(a, b);
        var d = b.success;
        b.success = function (e, f) {
            b.wait && c.add(e, b);
            d ? d(e, f) : e.trigger("sync", a, f, b)
        };
        a.save(null, b);
        return a
    }, parse: function (a) {
        return a
    }, chain: function () {
        return f(this.models).chain()
    }, _reset: function () {
        this.length = 0;
        this.models = [];
        this._byId = {};
        this._byCid = {}
    }, _prepareModel: function (a, b) {
        b || (b = {});
        a instanceof o ? a.collection || (a.collection = this) : (b.collection = this, a = new this.model(a, b), a._validate(a.attributes, b) || (a = !1));
        return a
    }, _removeReference: function (a) {
        this == a.collection && delete a.collection;
        a.off("all", this._onModelEvent, this)
    }, _onModelEvent: function (a, b, c, d) {
        ("add" == a || "remove" == a) && c != this || ("destroy" == a && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], this._byId[b.id] = b), this.trigger.apply(this, arguments))
    }});
    f.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","), function (a) {
        r.prototype[a] = function () {
            return f[a].apply(f, [this.models].concat(f.toArray(arguments)))
        }
    });
    var u = g.Router = function (a) {
        a || (a = {});
        a.routes && (this.routes = a.routes);
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    }, B = /:\w+/g, C = /\*\w+/g, D = /[-[\]{}()+?.,\\^$|#\s]/g;
    f.extend(u.prototype, k, {initialize: function () {
    }, route: function (a, b, c) {
        g.history || (g.history = new m);
        f.isRegExp(a) || (a = this._routeToRegExp(a));
        c || (c = this[b]);
        g.history.route(a, f.bind(function (d) {
            d = this._extractParameters(a, d);
            c && c.apply(this, d);
            this.trigger.apply(this, ["route:" + b].concat(d));
            g.history.trigger("route", this, b, d)
        }, this));
        return this
    }, navigate: function (a, b) {
        g.history.navigate(a, b)
    }, _bindRoutes: function () {
        if (this.routes) {
            var a = [], b;
            for (b in this.routes)a.unshift([b, this.routes[b]]);
            b = 0;
            for (var c = a.length; b < c; b++)this.route(a[b][0], a[b][1], this[a[b][1]])
        }
    }, _routeToRegExp: function (a) {
        a = a.replace(D, "\\$&").replace(B, "([^/]+)").replace(C, "(.*?)");
        return RegExp("^" + a + "$")
    }, _extractParameters: function (a, b) {
        return a.exec(b).slice(1)
    }});
    var m = g.History = function () {
        this.handlers = [];
        f.bindAll(this, "checkUrl")
    }, s = /^[#\/]/, E = /msie [\w.]+/;
    m.started = !1;
    f.extend(m.prototype, k, {interval: 50, getHash: function (a) {
        return(a = (a ? a.location : window.location).href.match(/#(.*)$/)) ? a[1] : ""
    }, getFragment: function (a, b) {
        if (null == a)if (this._hasPushState || b) {
            var a = window.location.pathname, c = window.location.search;
            c && (a += c)
        } else a = this.getHash();
        a.indexOf(this.options.root) || (a = a.substr(this.options.root.length));
        return a.replace(s, "")
    }, start: function (a) {
        if (m.started)throw Error("Backbone.history has already been started");
        m.started = !0;
        this.options = f.extend({}, {root: "/"}, this.options, a);
        this._wantsHashChange = !1 !== this.options.hashChange;
        this._wantsPushState = !!this.options.pushState;
        this._hasPushState = !(!this.options.pushState || !window.history || !window.history.pushState);
        var a = this.getFragment(), b = document.documentMode;
        if (b = E.exec(navigator.userAgent.toLowerCase()) && (!b || 7 >= b))this.iframe = i('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(a);
        this._hasPushState ? i(window).bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange"in window && !b ? i(window).bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval));
        this.fragment = a;
        a = window.location;
        b = a.pathname == this.options.root;
        if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !b)return this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0;
        this._wantsPushState && this._hasPushState && b && a.hash && (this.fragment = this.getHash().replace(s, ""), window.history.replaceState({}, document.title, a.protocol + "//" + a.host + this.options.root + this.fragment));
        if (!this.options.silent)return this.loadUrl()
    }, stop: function () {
        i(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl);
        clearInterval(this._checkUrlInterval);
        m.started = !1
    }, route: function (a, b) {
        this.handlers.unshift({route: a, callback: b})
    }, checkUrl: function () {
        var a = this.getFragment();
        a == this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe)));
        if (a == this.fragment)return!1;
        this.iframe && this.navigate(a);
        this.loadUrl() || this.loadUrl(this.getHash())
    }, loadUrl: function (a) {
        var b = this.fragment = this.getFragment(a);
        return f.any(this.handlers, function (a) {
            if (a.route.test(b))return a.callback(b), !0
        })
    }, navigate: function (a, b) {
        if (!m.started)return!1;
        if (!b || !0 === b)b = {trigger: b};
        var c = (a || "").replace(s, "");
        this.fragment != c && (this._hasPushState ? (0 != c.indexOf(this.options.root) && (c = this.options.root + c), this.fragment = c, window.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c)) : this._wantsHashChange ? (this.fragment = c, this._updateHash(window.location, c, b.replace), this.iframe && c != this.getFragment(this.getHash(this.iframe)) && (b.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, c, b.replace))) : window.location.assign(this.options.root + a), b.trigger && this.loadUrl(a))
    }, _updateHash: function (a, b, c) {
        c ? a.replace(a.toString().replace(/(javascript:|#).*$/, "") + "#" + b) : a.hash = b
    }});
    var v = g.View = function (a) {
        this.cid = f.uniqueId("view");
        this._configure(a || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    }, F = /^(\S+)\s*(.*)$/, w = "model,collection,el,id,attributes,className,tagName".split(",");
    f.extend(v.prototype, k, {tagName: "div", $: function (a) {
        return this.$el.find(a)
    }, initialize: function () {
    }, render: function () {
        return this
    }, remove: function () {
        this.$el.remove();
        return this
    }, make: function (a, b, c) {
        a = document.createElement(a);
        b && i(a).attr(b);
        c && i(a).html(c);
        return a
    }, setElement: function (a, b) {
        this.$el && this.undelegateEvents();
        this.$el = a instanceof i ? a : i(a);
        this.el = this.$el[0];
        !1 !== b && this.delegateEvents();
        return this
    }, delegateEvents: function (a) {
        if (a || (a = n(this, "events"))) {
            this.undelegateEvents();
            for (var b in a) {
                var c = a[b];
                f.isFunction(c) || (c = this[a[b]]);
                if (!c)throw Error('Method "' + a[b] + '" does not exist');
                var d = b.match(F), e = d[1], d = d[2], c = f.bind(c, this), e = e + (".delegateEvents" + this.cid);
                "" === d ? this.$el.bind(e, c) : this.$el.delegate(d, e, c)
            }
        }
    }, undelegateEvents: function () {
        this.$el.unbind(".delegateEvents" + this.cid)
    }, _configure: function (a) {
        this.options && (a = f.extend({}, this.options, a));
        for (var b = 0, c = w.length; b < c; b++) {
            var d = w[b];
            a[d] && (this[d] = a[d])
        }
        this.options = a
    }, _ensureElement: function () {
        if (this.el)this.setElement(this.el, !1); else {
            var a = n(this, "attributes") || {};
            this.id && (a.id = this.id);
            this.className && (a["class"] = this.className);
            this.setElement(this.make(this.tagName, a), !1)
        }
    }});
    o.extend = r.extend = u.extend = v.extend = function (a, b) {
        var c = G(this, a, b);
        c.extend = this.extend;
        return c
    };
    var H = {create: "POST", update: "PUT", "delete": "DELETE", read: "GET"};
    g.sync = function (a, b, c) {
        var d = H[a];
        c || (c = {});
        var e = {type: d, dataType: "json"};
        c.url || (e.url = n(b, "url") || t());
        if (!c.data && b && ("create" == a || "update" == a))e.contentType = "application/json", e.data = JSON.stringify(b.toJSON());
        g.emulateJSON && (e.contentType = "application/x-www-form-urlencoded", e.data = e.data ? {model: e.data} : {});
        if (g.emulateHTTP && ("PUT" === d || "DELETE" === d))g.emulateJSON && (e.data._method = d), e.type = "POST", e.beforeSend = function (a) {
            a.setRequestHeader("X-HTTP-Method-Override", d)
        };
        "GET" !== e.type && !g.emulateJSON && (e.processData = !1);
        return i.ajax(f.extend(e, c))
    };
    g.wrapError = function (a, b, c) {
        return function (d, e) {
            e = d === b ? e : d;
            a ? a(b, e, c) : b.trigger("error", b, e, c)
        }
    };
    var x = function () {
    }, G = function (a, b, c) {
        var d;
        d = b && b.hasOwnProperty("constructor") ? b.constructor : function () {
            a.apply(this, arguments)
        };
        f.extend(d, a);
        x.prototype = a.prototype;
        d.prototype = new x;
        b && f.extend(d.prototype, b);
        c && f.extend(d, c);
        d.prototype.constructor = d;
        d.__super__ = a.prototype;
        return d
    }, n = function (a, b) {
        return!a || !a[b] ? null : f.isFunction(a[b]) ? a[b]() : a[b]
    }, t = function () {
        throw Error('A "url" property or function must be specified');
    }
}).call(this);
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {def: 'easeOutQuad', swing: function (x, t, b, c, d) {
    return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
}, easeInQuad: function (x, t, b, c, d) {
    return c * (t /= d) * t + b;
}, easeOutQuad: function (x, t, b, c, d) {
    return-c * (t /= d) * (t - 2) + b;
}, easeInOutQuad: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1)return c / 2 * t * t + b;
    return-c / 2 * ((--t) * (t - 2) - 1) + b;
}, easeInCubic: function (x, t, b, c, d) {
    return c * (t /= d) * t * t + b;
}, easeOutCubic: function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
}, easeInOutCubic: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1)return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
}, easeInQuart: function (x, t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
}, easeOutQuart: function (x, t, b, c, d) {
    return-c * ((t = t / d - 1) * t * t * t - 1) + b;
}, easeInOutQuart: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1)return c / 2 * t * t * t * t + b;
    return-c / 2 * ((t -= 2) * t * t * t - 2) + b;
}, easeInQuint: function (x, t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
}, easeOutQuint: function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}, easeInOutQuint: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1)return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}, easeInSine: function (x, t, b, c, d) {
    return-c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}, easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
}, easeInOutSine: function (x, t, b, c, d) {
    return-c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}, easeInExpo: function (x, t, b, c, d) {
    return(t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}, easeOutExpo: function (x, t, b, c, d) {
    return(t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}, easeInOutExpo: function (x, t, b, c, d) {
    if (t == 0)return b;
    if (t == d)return b + c;
    if ((t /= d / 2) < 1)return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}, easeInCirc: function (x, t, b, c, d) {
    return-c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}, easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}, easeInOutCirc: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1)return-c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}, easeInElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0)return b;
    if ((t /= d) == 1)return b + c;
    if (!p)p = d * .3;
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return-(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}, easeOutElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0)return b;
    if ((t /= d) == 1)return b + c;
    if (!p)p = d * .3;
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
}, easeInOutElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0)return b;
    if ((t /= d / 2) == 2)return b + c;
    if (!p)p = d * (.3 * 1.5);
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1)return-.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
}, easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined)s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
}, easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined)s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}, easeInOutBack: function (x, t, b, c, d, s) {
    if (s == undefined)s = 1.70158;
    if ((t /= d / 2) < 1)return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
}, easeInBounce: function (x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
}, easeOutBounce: function (x, t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
    } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
    } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    }
}, easeInOutBounce: function (x, t, b, c, d) {
    if (t < d / 2)return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
    return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
}});
(function ($) {
    var isBadBrowser = $.browser.msie && $.browser.version < 7;
    var defaults = {};

    function SelectSkin(select, options) {
        if (isBadBrowser || !select.tagName || select.tagName && select.tagName.toLowerCase() !== 'select') {
            return;
        }
        if (options) {
            this.settings = $.extend(defaults, options);
        } else {
            this.settings = defaults;
        }
        this.selectDOM = select;
        this.select = $(select);
        this.wrapper = $('<div>', {'class': 'select-skin'});
        this.mask = $('<div>', {'class': 'select-skin-mask'});
        this.textClip = $('<div>', {'class': 'select-skin-text-clip'});
        this.text = $('<div>', {'class': 'select-skin-text'});
        this.createDOM();
        this.setStyles();
        this.changeText();
        this.select.bind('change', $.proxy(this.changeHandler, this));
    }

    SelectSkin.prototype = {createDOM: function () {
        this.select.after(this.wrapper);
        this.select.appendTo(this.wrapper);
        this.textClip.append(this.text);
        this.mask.append(this.textClip);
        this.wrapper.append(this.mask);
    }, setStyles: function () {
        this.select.css({'width': '100%', 'opacity': 0});
    }, changeText: function () {
        this.text.text(this.selectDOM.options[this.selectDOM.selectedIndex].text);
    }, changeHandler: function () {
        this.changeText();
    }, update: function () {
        this.changeText();
    }, reset: function () {
        this.selectDOM.selectedIndex = 0;
        this.update();
    }};
    $.fn.SelectSkin = function (method) {
        return this.each(function () {
            if (!$(this).data('SelectSkin')) {
                $(this).data('SelectSkin', new SelectSkin(this, method));
                return;
            }
            var api = $(this).data('SelectSkin');
            if (api[method]) {
                api[method].apply(api, Array.prototype.slice.call(arguments, 1));
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.SelectSkin');
            }
        });
    };
})(jQuery);
(function ($) {
    var defaults = {url: '/path/', pageVar: 'page', extraVars: {}, pageNumber: 1, maxPages: 1000, autoAppend: true, onLoad: function () {
    }, onError: function () {
    }, onBeforeLoad: function () {
    }, onBeforeAppend: function (dataFragment) {
    }, onAfterAppend: function () {
    }, onAfterPageIncrement: function () {
    }, onEndPages: function () {
    }};

    function LoadMore(container, options) {
        var that = this;
        if (options) {
            that.settings = $.extend({}, defaults, options);
        } else {
            that.settings = defaults;
        }
        that.pageNumber = that.settings.pageNumber;
        that.url = that.settings.url;
        that.pageVar = that.settings.pageVar;
        that.container = $(container);
        that.isLoading = false;
    }

    LoadMore.prototype = {setOptions: function (options) {
        this.settings = $.extend({}, this.settings, options);
    }, load: function () {
        var that = this;
        if (that.isLoading || that.settings.pageNumber > that.settings.maxPages) {
            return;
        }
        that.isLoading = true;
        var data = {};
        $.extend(data, that.settings.extraVars);
        data[that.settings.pageVar] = that.settings.pageNumber;
        $.ajax({type: "get", url: that.settings.url, data: data, beforeSend: function () {
            that.settings.onBeforeLoad.call(that.container);
        }, success: function (data) {
            if (that.settings.pageNumber + 1 > that.settings.maxPages) {
                that.settings.onEndPages.call(this);
            }
            that._processData(data);
            that.settings.onLoad.call(that.container);
        }, error: function (jqXHR) {
            that.isLoading = false;
            that.settings.onError.call(that.container, jqXHR);
        }});
    }, _processData: function (data) {
        var that = this;
        var fragment = $('<div>');
        fragment.append($(data));
        that.settings.onBeforeAppend.call(this, fragment);
        if (that.settings.autoAppend) {
            that.container.append(fragment.html());
            that.settings.onAfterAppend.call(this);
        }
        that.settings.pageNumber++;
        that.isLoading = false;
        that.settings.onAfterPageIncrement.call(this);
    }}
    $.fn.loadmore = function (method) {
        var args = arguments;
        return this.each(function () {
            if (!$(this).data('loadMore')) {
                $(this).data('loadMore', new LoadMore(this, method));
                return;
            }
            var api = $(this).data('loadMore');
            if (api[method]) {
                api[method].apply(api, Array.prototype.slice.call(args, 1));
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.loadmore');
            }
        });
    };
})(jQuery);
(function (a, b, c) {
    "use strict";
    var d = a.document, e = a.Modernizr, f = function (a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    }, g = "Moz Webkit O Ms".split(" "), h = function (a) {
        var b = d.documentElement.style, c;
        if (typeof b[a] == "string")return a;
        a = f(a);
        for (var e = 0, h = g.length; e < h; e++) {
            c = g[e] + a;
            if (typeof b[c] == "string")return c
        }
    }, i = h("transform"), j = h("transitionProperty"), k = {csstransforms: function () {
        return!!i
    }, csstransforms3d: function () {
        var a = !!h("perspective");
        if (a) {
            var c = " -o- -moz- -ms- -webkit- -khtml- ".split(" "), d = "@media (" + c.join("transform-3d),(") + "modernizr)", e = b("<style>" + d + "{#modernizr{height:3px}}" + "</style>").appendTo("head"), f = b('<div id="modernizr" />').appendTo("html");
            a = f.height() === 3, f.remove(), e.remove()
        }
        return a
    }, csstransitions: function () {
        return!!j
    }}, l;
    if (e)for (l in k)e.hasOwnProperty(l) || e.addTest(l, k[l]); else {
        e = a.Modernizr = {_version: "1.6ish: miniModernizr for Isotope"};
        var m = " ", n;
        for (l in k)n = k[l](), e[l] = n, m += " " + (n ? "" : "no-") + l;
        b("html").addClass(m)
    }
    if (e.csstransforms) {
        var o = e.csstransforms3d ? {translate: function (a) {
            return"translate3d(" + a[0] + "px, " + a[1] + "px, 0) "
        }, scale: function (a) {
            return"scale3d(" + a + ", " + a + ", 1) "
        }} : {translate: function (a) {
            return"translate(" + a[0] + "px, " + a[1] + "px) "
        }, scale: function (a) {
            return"scale(" + a + ") "
        }}, p = function (a, c, d) {
            var e = b.data(a, "isoTransform") || {}, f = {}, g, h = {}, j;
            f[c] = d, b.extend(e, f);
            for (g in e)j = e[g], h[g] = o[g](j);
            var k = h.translate || "", l = h.scale || "", m = k + l;
            b.data(a, "isoTransform", e), a.style[i] = m
        };
        b.cssNumber.scale = !0, b.cssHooks.scale = {set: function (a, b) {
            p(a, "scale", b)
        }, get: function (a, c) {
            var d = b.data(a, "isoTransform");
            return d && d.scale ? d.scale : 1
        }}, b.fx.step.scale = function (a) {
            b.cssHooks.scale.set(a.elem, a.now + a.unit)
        }, b.cssNumber.translate = !0, b.cssHooks.translate = {set: function (a, b) {
            p(a, "translate", b)
        }, get: function (a, c) {
            var d = b.data(a, "isoTransform");
            return d && d.translate ? d.translate : [0, 0]
        }}
    }
    var q, r;
    e.csstransitions && (q = {WebkitTransitionProperty: "webkitTransitionEnd", MozTransitionProperty: "transitionend", OTransitionProperty: "oTransitionEnd", transitionProperty: "transitionEnd"}[j], r = h("transitionDuration"));
    var s = b.event, t;
    s.special.smartresize = {setup: function () {
        b(this).bind("resize", s.special.smartresize.handler)
    }, teardown: function () {
        b(this).unbind("resize", s.special.smartresize.handler)
    }, handler: function (a, b) {
        var c = this, d = arguments;
        a.type = "smartresize", t && clearTimeout(t), t = setTimeout(function () {
            jQuery.event.handle.apply(c, d)
        }, b === "execAsap" ? 0 : 100)
    }}, b.fn.smartresize = function (a) {
        return a ? this.bind("smartresize", a) : this.trigger("smartresize", ["execAsap"])
    }, b.Isotope = function (a, c, d) {
        this.element = b(c), this._create(a), this._init(d)
    };
    var u = ["width", "height"], v = b(a);
    b.Isotope.settings = {resizable: !0, layoutMode: "masonry", containerClass: "isotope", itemClass: "isotope-item", hiddenClass: "isotope-hidden", hiddenStyle: {opacity: 0, scale: .001}, visibleStyle: {opacity: 1, scale: 1}, containerStyle: {position: "relative", overflow: "hidden"}, animationEngine: "best-available", animationOptions: {queue: !1, duration: 800}, sortBy: "original-order", sortAscending: !0, resizesContainer: !0, transformsEnabled: !b.browser.opera, itemPositionDataEnabled: !1}, b.Isotope.prototype = {_create: function (a) {
        this.options = b.extend({}, b.Isotope.settings, a), this.styleQueue = [], this.elemCount = 0;
        var c = this.element[0].style;
        this.originalStyle = {};
        var d = u.slice(0);
        for (var e in this.options.containerStyle)d.push(e);
        for (var f = 0, g = d.length; f < g; f++)e = d[f], this.originalStyle[e] = c[e] || "";
        this.element.css(this.options.containerStyle), this._updateAnimationEngine(), this._updateUsingTransforms();
        var h = {"original-order": function (a, b) {
            b.elemCount++;
            return b.elemCount
        }, random: function () {
            return Math.random()
        }};
        this.options.getSortData = b.extend(this.options.getSortData, h), this.reloadItems(), this.offset = {left: parseInt(this.element.css("padding-left") || 0, 10), top: parseInt(this.element.css("padding-top") || 0, 10)};
        var i = this;
        setTimeout(function () {
            i.element.addClass(i.options.containerClass)
        }, 0), this.options.resizable && v.bind("smartresize.isotope", function () {
            i.resize()
        }), this.element.delegate("." + this.options.hiddenClass, "click", function () {
            return!1
        })
    }, _getAtoms: function (a) {
        var b = this.options.itemSelector, c = b ? a.filter(b).add(a.find(b)) : a, d = {position: "absolute"};
        this.usingTransforms && (d.left = 0, d.top = 0), c.css(d).addClass(this.options.itemClass), this.updateSortData(c, !0);
        return c
    }, _init: function (a) {
        this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(a)
    }, option: function (a) {
        if (b.isPlainObject(a)) {
            this.options = b.extend(!0, this.options, a);
            var c;
            for (var d in a)c = "_update" + f(d), this[c] && this[c]()
        }
    }, _updateAnimationEngine: function () {
        var a = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, ""), b;
        switch (a) {
            case"css":
            case"none":
                b = !1;
                break;
            case"jquery":
                b = !0;
                break;
            default:
                b = !e.csstransitions
        }
        this.isUsingJQueryAnimation = b, this._updateUsingTransforms()
    }, _updateTransformsEnabled: function () {
        this._updateUsingTransforms()
    }, _updateUsingTransforms: function () {
        var a = this.usingTransforms = this.options.transformsEnabled && e.csstransforms && e.csstransitions && !this.isUsingJQueryAnimation;
        a || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale), this.getPositionStyles = a ? this._translate : this._positionAbs
    }, _filter: function (a) {
        var b = this.options.filter === "" ? "*" : this.options.filter;
        if (!b)return a;
        var c = this.options.hiddenClass, d = "." + c, e = a.filter(d), f = e;
        if (b !== "*") {
            f = e.filter(b);
            var g = a.not(d).not(b).addClass(c);
            this.styleQueue.push({$el: g, style: this.options.hiddenStyle})
        }
        this.styleQueue.push({$el: f, style: this.options.visibleStyle}), f.removeClass(c);
        return a.filter(b)
    }, updateSortData: function (a, c) {
        var d = this, e = this.options.getSortData, f, g;
        a.each(function () {
            f = b(this), g = {};
            for (var a in e)!c && a === "original-order" ? g[a] = b.data(this, "isotope-sort-data")[a] : g[a] = e[a](f, d);
            b.data(this, "isotope-sort-data", g)
        })
    }, _sort: function () {
        var a = this.options.sortBy, b = this._getSorter, c = this.options.sortAscending ? 1 : -1, d = function (d, e) {
            var f = b(d, a), g = b(e, a);
            f === g && a !== "original-order" && (f = b(d, "original-order"), g = b(e, "original-order"));
            return(f > g ? 1 : f < g ? -1 : 0) * c
        };
        this.$filteredAtoms.sort(d)
    }, _getSorter: function (a, c) {
        return b.data(a, "isotope-sort-data")[c]
    }, _translate: function (a, b) {
        return{translate: [a, b]}
    }, _positionAbs: function (a, b) {
        return{left: a, top: b}
    }, _pushPosition: function (a, b, c) {
        b = Math.round(b + this.offset.left), c = Math.round(c + this.offset.top);
        var d = this.getPositionStyles(b, c);
        this.styleQueue.push({$el: a, style: d}), this.options.itemPositionDataEnabled && a.data("isotope-item-position", {x: b, y: c})
    }, layout: function (a, b) {
        var c = this.options.layoutMode;
        this["_" + c + "Layout"](a);
        if (this.options.resizesContainer) {
            var d = this["_" + c + "GetContainerSize"]();
            this.styleQueue.push({$el: this.element, style: d})
        }
        this._processStyleQueue(a, b), this.isLaidOut = !0
    }, _processStyleQueue: function (a, c) {
        var d = this.isLaidOut ? this.isUsingJQueryAnimation ? "animate" : "css" : "css", f = this.options.animationOptions, g = this.options.onLayout, h, i, j, k;
        i = function (a, b) {
            b.$el[d](b.style, f)
        };
        if (this._isInserting && this.isUsingJQueryAnimation)i = function (a, b) {
            h = b.$el.hasClass("no-transition") ? "css" : d, b.$el[h](b.style, f)
        }; else if (c || g || f.complete) {
            var l = !1, m = [c, g, f.complete], n = this;
            j = !0, k = function () {
                if (!l) {
                    var b;
                    for (var c = 0, d = m.length; c < d; c++)b = m[c], typeof b == "function" && b.call(n.element, a, n);
                    l = !0
                }
            };
            if (this.isUsingJQueryAnimation && d === "animate")f.complete = k, j = !1; else if (e.csstransitions) {
                var o = 0, p = this.styleQueue[0], s = p && p.$el, t;
                while (!s || !s.length) {
                    t = this.styleQueue[o++];
                    if (!t)return;
                    s = t.$el
                }
                var u = parseFloat(getComputedStyle(s[0])[r]);
                u > 0 && (i = function (a, b) {
                    b.$el[d](b.style, f).one(q, k)
                }, j = !1)
            }
        }
        b.each(this.styleQueue, i), j && k(), this.styleQueue = []
    }, resize: function () {
        this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout()
    }, reLayout: function (a) {
        this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, a)
    }, addItems: function (a, b) {
        var c = this._getAtoms(a);
        this.$allAtoms = this.$allAtoms.add(c), b && b(c)
    }, insert: function (a, b) {
        this.element.append(a);
        var c = this;
        this.addItems(a, function (a) {
            var d = c._filter(a);
            c._addHideAppended(d), c._sort(), c.reLayout(), c._revealAppended(d, b)
        })
    }, appended: function (a, b) {
        var c = this;
        this.addItems(a, function (a) {
            c._addHideAppended(a), c.layout(a), c._revealAppended(a, b)
        })
    }, _addHideAppended: function (a) {
        this.$filteredAtoms = this.$filteredAtoms.add(a), a.addClass("no-transition"), this._isInserting = !0, this.styleQueue.push({$el: a, style: this.options.hiddenStyle})
    }, _revealAppended: function (a, b) {
        var c = this;
        setTimeout(function () {
            a.removeClass("no-transition"), c.styleQueue.push({$el: a, style: c.options.visibleStyle}), c._isInserting = !1, c._processStyleQueue(a, b)
        }, 10)
    }, reloadItems: function () {
        this.$allAtoms = this._getAtoms(this.element.children())
    }, remove: function (a, b) {
        var c = this, d = function () {
            c.$allAtoms = c.$allAtoms.not(a), a.remove(), b && b.call(this.element)
        };
        a.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({$el: a, style: this.options.hiddenStyle}), this.$filteredAtoms = this.$filteredAtoms.not(a), this._sort(), this.reLayout(d)) : d()
    }, shuffle: function (a) {
        this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), this.reLayout(a)
    }, destroy: function () {
        var a = this.usingTransforms, b = this.options;
        this.$allAtoms.removeClass(b.hiddenClass + " " + b.itemClass).each(function () {
            var b = this.style;
            b.position = "", b.top = "", b.left = "", b.opacity = "", a && (b[i] = "")
        });
        var c = this.element[0].style;
        for (var d in this.originalStyle)c[d] = this.originalStyle[d];
        this.element.unbind(".isotope").undelegate("." + b.hiddenClass, "click").removeClass(b.containerClass).removeData("isotope"), v.unbind(".isotope")
    }, _getSegments: function (a) {
        var b = this.options.layoutMode, c = a ? "rowHeight" : "columnWidth", d = a ? "height" : "width", e = a ? "rows" : "cols", g = this.element[d](), h, i = this.options[b] && this.options[b][c] || this.$filteredAtoms["outer" + f(d)](!0) || g;
        h = Math.floor(g / i), h = Math.max(h, 1), this[b][e] = h, this[b][c] = i
    }, _checkIfSegmentsChanged: function (a) {
        var b = this.options.layoutMode, c = a ? "rows" : "cols", d = this[b][c];
        this._getSegments(a);
        return this[b][c] !== d
    }, _masonryReset: function () {
        this.masonry = {}, this._getSegments();
        var a = this.masonry.cols;
        this.masonry.colYs = [];
        while (a--)this.masonry.colYs.push(0)
    }, _masonryLayout: function (a) {
        var c = this, d = c.masonry;
        a.each(function () {
            var a = b(this), e = Math.ceil(a.outerWidth(!0) / d.columnWidth);
            e = Math.min(e, d.cols);
            if (e === 1)c._masonryPlaceBrick(a, d.colYs); else {
                var f = d.cols + 1 - e, g = [], h, i;
                for (i = 0; i < f; i++)h = d.colYs.slice(i, i + e), g[i] = Math.max.apply(Math, h);
                c._masonryPlaceBrick(a, g)
            }
        })
    }, _masonryPlaceBrick: function (a, b) {
        var c = Math.min.apply(Math, b), d = 0;
        for (var e = 0, f = b.length; e < f; e++)if (b[e] === c) {
            d = e;
            break
        }
        var g = this.masonry.columnWidth * d, h = c;
        this._pushPosition(a, g, h);
        var i = c + a.outerHeight(!0), j = this.masonry.cols + 1 - f;
        for (e = 0; e < j; e++)this.masonry.colYs[d + e] = i
    }, _masonryGetContainerSize: function () {
        var a = Math.max.apply(Math, this.masonry.colYs);
        return{height: a}
    }, _masonryResizeChanged: function () {
        return this._checkIfSegmentsChanged()
    }, _fitRowsReset: function () {
        this.fitRows = {x: 0, y: 0, height: 0}
    }, _fitRowsLayout: function (a) {
        var c = this, d = this.element.width(), e = this.fitRows;
        a.each(function () {
            var a = b(this), f = a.outerWidth(!0), g = a.outerHeight(!0);
            e.x !== 0 && f + e.x > d && (e.x = 0, e.y = e.height), c._pushPosition(a, e.x, e.y), e.height = Math.max(e.y + g, e.height), e.x += f
        })
    }, _fitRowsGetContainerSize: function () {
        return{height: this.fitRows.height}
    }, _fitRowsResizeChanged: function () {
        return!0
    }, _cellsByRowReset: function () {
        this.cellsByRow = {index: 0}, this._getSegments(), this._getSegments(!0)
    }, _cellsByRowLayout: function (a) {
        var c = this, d = this.cellsByRow;
        a.each(function () {
            var a = b(this), e = d.index % d.cols, f = Math.floor(d.index / d.cols), g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2, h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
            c._pushPosition(a, g, h), d.index++
        })
    }, _cellsByRowGetContainerSize: function () {
        return{height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top}
    }, _cellsByRowResizeChanged: function () {
        return this._checkIfSegmentsChanged()
    }, _straightDownReset: function () {
        this.straightDown = {y: 0}
    }, _straightDownLayout: function (a) {
        var c = this;
        a.each(function (a) {
            var d = b(this);
            c._pushPosition(d, 0, c.straightDown.y), c.straightDown.y += d.outerHeight(!0)
        })
    }, _straightDownGetContainerSize: function () {
        return{height: this.straightDown.y}
    }, _straightDownResizeChanged: function () {
        return!0
    }, _masonryHorizontalReset: function () {
        this.masonryHorizontal = {}, this._getSegments(!0);
        var a = this.masonryHorizontal.rows;
        this.masonryHorizontal.rowXs = [];
        while (a--)this.masonryHorizontal.rowXs.push(0)
    }, _masonryHorizontalLayout: function (a) {
        var c = this, d = c.masonryHorizontal;
        a.each(function () {
            var a = b(this), e = Math.ceil(a.outerHeight(!0) / d.rowHeight);
            e = Math.min(e, d.rows);
            if (e === 1)c._masonryHorizontalPlaceBrick(a, d.rowXs); else {
                var f = d.rows + 1 - e, g = [], h, i;
                for (i = 0; i < f; i++)h = d.rowXs.slice(i, i + e), g[i] = Math.max.apply(Math, h);
                c._masonryHorizontalPlaceBrick(a, g)
            }
        })
    }, _masonryHorizontalPlaceBrick: function (a, b) {
        var c = Math.min.apply(Math, b), d = 0;
        for (var e = 0, f = b.length; e < f; e++)if (b[e] === c) {
            d = e;
            break
        }
        var g = c, h = this.masonryHorizontal.rowHeight * d;
        this._pushPosition(a, g, h);
        var i = c + a.outerWidth(!0), j = this.masonryHorizontal.rows + 1 - f;
        for (e = 0; e < j; e++)this.masonryHorizontal.rowXs[d + e] = i
    }, _masonryHorizontalGetContainerSize: function () {
        var a = Math.max.apply(Math, this.masonryHorizontal.rowXs);
        return{width: a}
    }, _masonryHorizontalResizeChanged: function () {
        return this._checkIfSegmentsChanged(!0)
    }, _fitColumnsReset: function () {
        this.fitColumns = {x: 0, y: 0, width: 0}
    }, _fitColumnsLayout: function (a) {
        var c = this, d = this.element.height(), e = this.fitColumns;
        a.each(function () {
            var a = b(this), f = a.outerWidth(!0), g = a.outerHeight(!0);
            e.y !== 0 && g + e.y > d && (e.x = e.width, e.y = 0), c._pushPosition(a, e.x, e.y), e.width = Math.max(e.x + f, e.width), e.y += g
        })
    }, _fitColumnsGetContainerSize: function () {
        return{width: this.fitColumns.width}
    }, _fitColumnsResizeChanged: function () {
        return!0
    }, _cellsByColumnReset: function () {
        this.cellsByColumn = {index: 0}, this._getSegments(), this._getSegments(!0)
    }, _cellsByColumnLayout: function (a) {
        var c = this, d = this.cellsByColumn;
        a.each(function () {
            var a = b(this), e = Math.floor(d.index / d.rows), f = d.index % d.rows, g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2, h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
            c._pushPosition(a, g, h), d.index++
        })
    }, _cellsByColumnGetContainerSize: function () {
        return{width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth}
    }, _cellsByColumnResizeChanged: function () {
        return this._checkIfSegmentsChanged(!0)
    }, _straightAcrossReset: function () {
        this.straightAcross = {x: 0}
    }, _straightAcrossLayout: function (a) {
        var c = this;
        a.each(function (a) {
            var d = b(this);
            c._pushPosition(d, c.straightAcross.x, 0), c.straightAcross.x += d.outerWidth(!0)
        })
    }, _straightAcrossGetContainerSize: function () {
        return{width: this.straightAcross.x}
    }, _straightAcrossResizeChanged: function () {
        return!0
    }}, b.fn.imagesLoaded = function (a) {
        function i(a) {
            var c = a.target;
            c.src !== f && b.inArray(c, g) === -1 && (g.push(c), --e <= 0 && (setTimeout(h), d.unbind(".imagesLoaded", i)))
        }

        function h() {
            a.call(c, d)
        }

        var c = this, d = c.find("img").add(c.filter("img")), e = d.length, f = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", g = [];
        e || h(), d.bind("load.imagesLoaded error.imagesLoaded", i).each(function () {
            var a = this.src;
            this.src = f, this.src = a
        });
        return c
    };
    var w = function (b) {
        a.console && a.console.error(b)
    };
    b.fn.isotope = function (a, c) {
        if (typeof a == "string") {
            var d = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var c = b.data(this, "isotope");
                if (!c)w("cannot call methods on isotope prior to initialization; attempted to call method '" + a + "'"); else {
                    if (!b.isFunction(c[a]) || a.charAt(0) === "_") {
                        w("no such method '" + a + "' for isotope instance");
                        return
                    }
                    c[a].apply(c, d)
                }
            })
        } else this.each(function () {
            var d = b.data(this, "isotope");
            d ? (d.option(a), d._init(c)) : b.data(this, "isotope", new b.Isotope(a, this, c))
        });
        return this
    }
})(window, jQuery);
var lastIsotopeContainerWidth;
$.Isotope.prototype._getCenteredMasonryColumns = function () {
    this.width = this.element.width();
    var parentWidth = this.element.parent().width();
    var colW = this.options.masonry && this.options.masonry.columnWidth || this.$filteredAtoms.outerWidth(true) || parentWidth;
    var cols = Math.floor(parentWidth / colW);
    cols = Math.max(cols, 1);
    this.masonry.cols = cols;
    this.masonry.columnWidth = colW;
};
$.Isotope.prototype._masonryReset = function () {
    this.masonry = {};
    this._getCenteredMasonryColumns();
    var i = this.masonry.cols;
    this.masonry.colYs = [];
    while (i--) {
        this.masonry.colYs.push(0);
    }
};
$.Isotope.prototype._masonryResizeChanged = function () {
    var prevColCount = this.masonry.cols;
    this._getCenteredMasonryColumns();
    return(this.masonry.cols !== prevColCount);
};
$.Isotope.prototype._masonryGetContainerSize = function () {
    var unusedCols = 0, i = this.masonry.cols;
    while (--i) {
        if (this.masonry.colYs[i] !== 0) {
            break;
        }
        unusedCols++;
    }
    var width = (this.masonry.cols - unusedCols) * this.masonry.columnWidth;
    if (width > 260) {
        lastIsotopeContainerWidth = width;
    } else {
        width = lastIsotopeContainerWidth;
    }
    var values = {height: Math.max.apply(Math, this.masonry.colYs), width: width};
    if (this.options.onBeforeRelayout) {
        this.options.onBeforeRelayout.call(this.element, values);
    }
    return values;
};
$(function () {
    var scrollTimer;
    $(window).on('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
            $(window).trigger('scrollBottom.scrollend');
        }, 200);
    });
});
(function ($) {
    var defaults = {offsetY: 0, callback: function () {
    }};

    function ScrollBottom(win, options) {
        if (options) {
            this.options = $.extend(defaults, options);
        } else {
            this.options = defaults;
        }
        this.scrollTop = $(document).scrollTop();
        this.pageHeight = $(document).height() - $(window).height();
        if (win === window) {
            $(win).on('scrollBottom.scrollend', $.proxy(this.scrollHandler, this));
        }
    }

    ScrollBottom.prototype.scrollHandler = function (event) {
        var direction = $(document).scrollTop() > this.scrollTop ? 'bottom' : 'top';
        this.scrollTop = $(document).scrollTop();
        this.pageHeight = $(document).height() - $(window).height();
        if (this.scrollTop >= this.pageHeight + this.options.offsetY && typeof this.options.callback === 'function') {
            this.options.callback.apply(this, [event, {'scrollTop': this.scrollTop, 'pageHeight': this.pageHeight, 'direction': direction}]);
        }
    };
    $.fn.scrollBottom = function (options) {
        this.each(function () {
            new ScrollBottom(this, options);
        });
    };
})(jQuery);
(function (window, document, $, undefined) {
    "use strict";
    var W = $(window), D = $(document), F = $.fancybox = function () {
        F.open.apply(this, arguments);
    }, didUpdate = null, isTouch = document.createTouch !== undefined, isQuery = function (obj) {
        return obj && obj.hasOwnProperty && obj instanceof $;
    }, isString = function (str) {
        return str && $.type(str) === "string";
    }, isPercentage = function (str) {
        return isString(str) && str.indexOf('%') > 0;
    }, isScrollable = function (el) {
        return(el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
    }, getScalar = function (value, dim) {
        var value_ = parseInt(value, 10);
        if (dim && isPercentage(value)) {
            value_ = F.getViewport()[dim] / 100 * value_;
        }
        return Math.ceil(value_);
    }, getValue = function (value, dim) {
        return getScalar(value, dim) + 'px';
    };
    $.extend(F, {version: '2.1.0', defaults: {padding: 15, margin: 20, width: 800, height: 600, minWidth: 100, minHeight: 100, maxWidth: 9999, maxHeight: 9999, autoSize: true, autoHeight: false, autoWidth: false, autoResize: !isTouch, autoCenter: !isTouch, fitToView: true, aspectRatio: false, topRatio: 0.5, leftRatio: 0.5, scrolling: 'auto', wrapCSS: '', arrows: true, closeBtn: true, closeClick: false, nextClick: false, mouseWheel: true, autoPlay: false, playSpeed: 3000, preload: 3, modal: false, loop: true, ajax: {dataType: 'html', headers: {'X-fancyBox': true}}, iframe: {scrolling: 'auto', preload: true}, swf: {wmode: 'transparent', allowfullscreen: 'true', allowscriptaccess: 'always'}, keys: {next: {13: 'left', 34: 'up', 39: 'left', 40: 'up'}, prev: {8: 'right', 33: 'down', 37: 'right', 38: 'down'}, close: [27], play: [32], toggle: [70]}, direction: {next: 'left', prev: 'right'}, scrollOutside: true, index: 0, type: null, href: null, content: null, title: null, tpl: {wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>', image: '<img class="fancybox-image" src="{href}" alt="" />', iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0"' + ($.browser.msie ? ' allowtransparency="true"' : '') + '></iframe>', error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>', closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>', next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>', prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'}, openEffect: 'fade', openSpeed: 250, openEasing: 'swing', openOpacity: true, openMethod: 'zoomIn', closeEffect: 'fade', closeSpeed: 250, closeEasing: 'swing', closeOpacity: true, closeMethod: 'zoomOut', nextEffect: 'elastic', nextSpeed: 250, nextEasing: 'swing', nextMethod: 'changeIn', prevEffect: 'elastic', prevSpeed: 250, prevEasing: 'swing', prevMethod: 'changeOut', helpers: {overlay: {closeClick: true, speedOut: 200, showEarly: true, css: {}}, title: {type: 'float'}}, onCancel: $.noop, beforeLoad: $.noop, afterLoad: $.noop, beforeShow: $.noop, afterShow: $.noop, beforeChange: $.noop, beforeClose: $.noop, afterClose: $.noop}, group: {}, opts: {}, previous: null, coming: null, current: null, isActive: false, isOpen: false, isOpened: false, wrap: null, skin: null, outer: null, inner: null, player: {timer: null, isActive: false}, ajaxLoad: null, imgPreload: null, transitions: {}, helpers: {}, open: function (group, opts) {
        if (!group) {
            return;
        }
        if (!$.isPlainObject(opts)) {
            opts = {};
        }
        if (false === F.close(true)) {
            return;
        }
        if (!$.isArray(group)) {
            group = isQuery(group) ? $(group).get() : [group];
        }
        $.each(group, function (i, element) {
            var obj = {}, href, title, content, type, rez, hrefParts, selector;
            if ($.type(element) === "object") {
                if (element.nodeType) {
                    element = $(element);
                }
                if (isQuery(element)) {
                    obj = {href: element.attr('href'), title: element.attr('title'), isDom: true, element: element};
                    if ($.metadata) {
                        $.extend(true, obj, element.metadata());
                    }
                } else {
                    obj = element;
                }
            }
            href = opts.href || obj.href || (isString(element) ? element : null);
            title = opts.title !== undefined ? opts.title : obj.title || '';
            content = opts.content || obj.content;
            type = content ? 'html' : (opts.type || obj.type);
            if (!type && obj.isDom) {
                type = element.data('fancybox-type');
                if (!type) {
                    rez = element.prop('class').match(/fancybox\.(\w+)/);
                    type = rez ? rez[1] : null;
                }
            }
            if (isString(href)) {
                if (!type) {
                    if (F.isImage(href)) {
                        type = 'image';
                    } else if (F.isSWF(href)) {
                        type = 'swf';
                    } else if (href.charAt(0) === '#') {
                        type = 'inline';
                    } else if (isString(element)) {
                        type = 'html';
                        content = element;
                    }
                }
                if (type === 'ajax') {
                    hrefParts = href.split(/\s+/, 2);
                    href = hrefParts.shift();
                    selector = hrefParts.shift();
                }
            }
            if (!content) {
                if (type === 'inline') {
                    if (href) {
                        content = $(isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href);
                    } else if (obj.isDom) {
                        content = element;
                    }
                } else if (type === 'html') {
                    content = href;
                } else if (!type && !href && obj.isDom) {
                    type = 'inline';
                    content = element;
                }
            }
            $.extend(obj, {href: href, type: type, content: content, title: title, selector: selector});
            group[i] = obj;
        });
        F.opts = $.extend(true, {}, F.defaults, opts);
        if (opts.keys !== undefined) {
            F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
        }
        F.group = group;
        return F._start(F.opts.index);
    }, cancel: function () {
        var coming = F.coming;
        if (!coming || false === F.trigger('onCancel')) {
            return;
        }
        F.hideLoading();
        if (F.ajaxLoad) {
            F.ajaxLoad.abort();
        }
        F.ajaxLoad = null;
        if (F.imgPreload) {
            F.imgPreload.onload = F.imgPreload.onerror = null;
        }
        if (coming.wrap) {
            coming.wrap.stop(true).trigger('onReset').remove();
        }
        if (!F.current) {
            F.trigger('afterClose');
        }
        F.coming = null;
    }, close: function (immediately) {
        F.cancel();
        if (false === F.trigger('beforeClose')) {
            return;
        }
        F.unbindEvents();
        if (!F.isOpen || immediately === true) {
            $('.fancybox-wrap').stop(true).trigger('onReset').remove();
            F._afterZoomOut();
        } else {
            F.isOpen = F.isOpened = false;
            F.isClosing = true;
            $('.fancybox-item, .fancybox-nav').remove();
            F.wrap.stop(true, true).removeClass('fancybox-opened');
            if (F.wrap.css('position') === 'fixed') {
                F.wrap.css(F._getPosition(true));
            }
            F.transitions[F.current.closeMethod]();
        }
    }, play: function (action) {
        var clear = function () {
            clearTimeout(F.player.timer);
        }, set = function () {
            clear();
            if (F.current && F.player.isActive) {
                F.player.timer = setTimeout(F.next, F.current.playSpeed);
            }
        }, stop = function () {
            clear();
            $('body').unbind('.player');
            F.player.isActive = false;
            F.trigger('onPlayEnd');
        }, start = function () {
            if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
                F.player.isActive = true;
                $('body').bind({'afterShow.player onUpdate.player': set, 'onCancel.player beforeClose.player': stop, 'beforeLoad.player': clear});
                set();
                F.trigger('onPlayStart');
            }
        };
        if (action === true || (!F.player.isActive && action !== false)) {
            start();
        } else {
            stop();
        }
    }, next: function (direction) {
        var current = F.current;
        if (current) {
            if (!isString(direction)) {
                direction = current.direction.next;
            }
            F.jumpto(current.index + 1, direction, 'next');
        }
    }, prev: function (direction) {
        var current = F.current;
        if (current) {
            if (!isString(direction)) {
                direction = current.direction.prev;
            }
            F.jumpto(current.index - 1, direction, 'prev');
        }
    }, jumpto: function (index, direction, router) {
        var current = F.current;
        if (!current) {
            return;
        }
        index = getScalar(index);
        F.direction = direction || current.direction[(index >= current.index ? 'next' : 'prev')];
        F.router = router || 'jumpto';
        if (current.loop) {
            if (index < 0) {
                index = current.group.length + (index % current.group.length);
            }
            index = index % current.group.length;
        }
        if (current.group[index] !== undefined) {
            F.cancel();
            F._start(index);
        }
    }, reposition: function (e, onlyAbsolute) {
        var pos;
        if (F.isOpen) {
            pos = F._getPosition(onlyAbsolute);
            if (e && e.type === 'scroll') {
                delete pos.position;
                F.wrap.stop(true, true).animate(pos, 200);
            } else {
                F.wrap.css(pos);
            }
        }
    }, update: function (e) {
        var type = (e && e.type), anyway = !type || type === 'orientationchange';
        if (anyway) {
            clearTimeout(didUpdate);
            didUpdate = null;
        }
        if (!F.isOpen || didUpdate) {
            return;
        }
        if (anyway || isTouch) {
            F.wrap.removeAttr('style').addClass('fancybox-tmp');
            F.trigger('onUpdate');
        }
        didUpdate = setTimeout(function () {
            var current = F.current;
            if (!current) {
                return;
            }
            F.wrap.removeClass('fancybox-tmp');
            if (type !== 'scroll') {
                F._setDimension();
            }
            if (!(type === 'scroll' && current.canShrink)) {
                F.reposition(e);
            }
            F.trigger('onUpdate');
            didUpdate = null;
        }, (isTouch ? 500 : (anyway ? 20 : 300)));
    }, toggle: function (action) {
        if (F.isOpen) {
            F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;
            F.update();
        }
    }, hideLoading: function () {
        D.unbind('keypress.fb');
        $('#fancybox-loading').remove();
    }, showLoading: function () {
        var el, viewport;
        F.hideLoading();
        D.bind('keypress.fb', function (e) {
            if ((e.which || e.keyCode) === 27) {
                e.preventDefault();
                F.cancel();
            }
        });
        el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');
        if (!F.defaults.fixed) {
            viewport = F.getViewport();
            el.css({position: 'absolute', top: (viewport.h * 0.5) + viewport.y, left: (viewport.w * 0.5) + viewport.x});
        }
    }, getViewport: function () {
        var lock = F.current ? F.current.locked : false, rez = {x: W.scrollLeft(), y: W.scrollTop()};
        if (lock) {
            rez.w = lock[0].clientWidth;
            rez.h = lock[0].clientHeight;
        } else {
            rez.w = isTouch && window.innerWidth ? window.innerWidth : W.width();
            rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
        }
        return rez;
    }, unbindEvents: function () {
        if (F.wrap && isQuery(F.wrap)) {
            F.wrap.unbind('.fb');
        }
        D.unbind('.fb');
        W.unbind('.fb');
    }, bindEvents: function () {
        var current = F.current, keys;
        if (!current) {
            return;
        }
        W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);
        keys = current.keys;
        if (keys) {
            D.bind('keydown.fb', function (e) {
                var code = e.which || e.keyCode, target = e.target || e.srcElement;
                if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
                    $.each(keys, function (i, val) {
                        if (current.group.length > 1 && val[code] !== undefined) {
                            F[i](val[code]);
                            e.preventDefault();
                            return false;
                        }
                        if ($.inArray(code, val) > -1) {
                            F[i]();
                            e.preventDefault();
                            return false;
                        }
                    });
                }
            });
        }
        if ($.fn.mousewheel && current.mouseWheel) {
            F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
                var target = e.target || null, parent = $(target), canScroll = false;
                while (parent.length) {
                    if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
                        break;
                    }
                    canScroll = isScrollable(parent[0]);
                    parent = $(parent).parent();
                }
                if (delta !== 0 && !canScroll) {
                    if (F.group.length > 1 && !current.canShrink) {
                        if (deltaY > 0 || deltaX > 0) {
                            F.prev(deltaY > 0 ? 'down' : 'left');
                        } else if (deltaY < 0 || deltaX < 0) {
                            F.next(deltaY < 0 ? 'up' : 'right');
                        }
                        e.preventDefault();
                    }
                }
            });
        }
    }, trigger: function (event, o) {
        var ret, obj = o || F.coming || F.current;
        if (!obj) {
            return;
        }
        if ($.isFunction(obj[event])) {
            ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
        }
        if (ret === false) {
            return false;
        }
        if (event === 'onCancel' && !F.isOpened) {
            F.isActive = false;
        }
        if (obj.helpers) {
            $.each(obj.helpers, function (helper, opts) {
                if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
                    F.helpers[helper][event](opts, obj);
                }
            });
        }
        $.event.trigger(event + '.fb');
    }, isImage: function (str) {
        return isString(str) && str.match(/\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$/i);
    }, isSWF: function (str) {
        return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
    }, _start: function (index) {
        var coming = {}, obj, href, type, margin, padding;
        index = getScalar(index);
        obj = F.group[index] || null;
        if (!obj) {
            return false;
        }
        coming = $.extend(true, {}, F.opts, obj);
        margin = coming.margin;
        padding = coming.padding;
        if ($.type(margin) === 'number') {
            coming.margin = [margin, margin, margin, margin];
        }
        if ($.type(padding) === 'number') {
            coming.padding = [padding, padding, padding, padding];
        }
        if (coming.modal) {
            $.extend(true, coming, {closeBtn: false, closeClick: false, nextClick: false, arrows: false, mouseWheel: false, keys: null, helpers: {overlay: {closeClick: false}}});
        }
        if (coming.autoSize) {
            coming.autoWidth = coming.autoHeight = true;
        }
        if (coming.width === 'auto') {
            coming.autoWidth = true;
        }
        if (coming.height === 'auto') {
            coming.autoHeight = true;
        }
        coming.group = F.group;
        coming.index = index;
        F.coming = coming;
        if (false === F.trigger('beforeLoad')) {
            F.coming = null;
            return;
        }
        type = coming.type;
        href = coming.href;
        if (!type) {
            F.coming = null;
            if (F.current && F.router && F.router !== 'jumpto') {
                F.current.index = index;
                return F[F.router](F.direction);
            }
            return false;
        }
        F.isActive = true;
        if (type === 'image' || type === 'swf') {
            coming.autoHeight = coming.autoWidth = false;
            coming.scrolling = 'visible';
        }
        if (type === 'image') {
            coming.aspectRatio = true;
        }
        if (type === 'iframe' && isTouch) {
            coming.scrolling = 'scroll';
        }
        coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo(coming.parent);
        $.extend(coming, {skin: $('.fancybox-skin', coming.wrap), outer: $('.fancybox-outer', coming.wrap), inner: $('.fancybox-inner', coming.wrap)});
        $.each(["Top", "Right", "Bottom", "Left"], function (i, v) {
            coming.skin.css('padding' + v, getValue(coming.padding[i]));
        });
        F.trigger('onReady');
        if (type === 'inline' || type === 'html') {
            if (!coming.content || !coming.content.length) {
                return F._error('content');
            }
        } else if (!href) {
            return F._error('href');
        }
        if (type === 'image') {
            F._loadImage();
        } else if (type === 'ajax') {
            F._loadAjax();
        } else if (type === 'iframe') {
            F._loadIframe();
        } else {
            F._afterLoad();
        }
    }, _error: function (type) {
        $.extend(F.coming, {type: 'html', autoWidth: true, autoHeight: true, minWidth: 0, minHeight: 0, scrolling: 'no', hasError: type, content: F.coming.tpl.error});
        F._afterLoad();
    }, _loadImage: function () {
        var img = F.imgPreload = new Image();
        img.onload = function () {
            this.onload = this.onerror = null;
            F.coming.width = this.width;
            F.coming.height = this.height;
            F._afterLoad();
        };
        img.onerror = function () {
            this.onload = this.onerror = null;
            F._error('image');
        };
        img.src = F.coming.href;
        if (img.complete === undefined || !img.complete) {
            F.showLoading();
        }
    }, _loadAjax: function () {
        var coming = F.coming;
        F.showLoading();
        F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {url: coming.href, error: function (jqXHR, textStatus) {
            if (F.coming && textStatus !== 'abort') {
                F._error('ajax', jqXHR);
            } else {
                F.hideLoading();
            }
        }, success: function (data, textStatus) {
            if (textStatus === 'success') {
                coming.content = data;
                F._afterLoad();
            }
        }}));
    }, _loadIframe: function () {
        var coming = F.coming, iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime())).attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling).attr('src', coming.href);
        $(coming.wrap).bind('onReset', function () {
            try {
                $(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
            } catch (e) {
            }
        });
        if (coming.iframe.preload) {
            F.showLoading();
            iframe.one('load', function () {
                $(this).data('ready', 1);
                if (!isTouch) {
                    $(this).bind('load.fb', F.update);
                }
                $(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();
                F._afterLoad();
            });
        }
        coming.content = iframe.appendTo(coming.inner);
        if (!coming.iframe.preload) {
            F._afterLoad();
        }
    }, _preloadImages: function () {
        var group = F.group, current = F.current, len = group.length, cnt = current.preload ? Math.min(current.preload, len - 1) : 0, item, i;
        for (i = 1; i <= cnt; i += 1) {
            item = group[(current.index + i) % len];
            if (item.type === 'image' && item.href) {
                new Image().src = item.href;
            }
        }
    }, _afterLoad: function () {
        var coming = F.coming, previous = F.current, placeholder = 'fancybox-placeholder', current, content, type, scrolling, href, embed;
        F.hideLoading();
        if (!coming || F.isActive === false) {
            return;
        }
        if (false === F.trigger('afterLoad', coming, previous)) {
            coming.wrap.stop(true).trigger('onReset').remove();
            F.coming = null;
            return;
        }
        if (previous) {
            F.trigger('beforeChange', previous);
            previous.wrap.stop(true).removeClass('fancybox-opened').find('.fancybox-item, .fancybox-nav').remove();
            if (previous.wrap.css('position') === 'fixed') {
                previous.wrap.css(F._getPosition(true));
            }
        }
        F.unbindEvents();
        current = coming;
        content = coming.content;
        type = coming.type;
        scrolling = coming.scrolling;
        $.extend(F, {wrap: current.wrap, skin: current.skin, outer: current.outer, inner: current.inner, current: current, previous: previous});
        href = current.href;
        switch (type) {
            case'inline':
            case'ajax':
            case'html':
                if (current.selector) {
                    content = $('<div>').html(content).find(current.selector);
                } else if (isQuery(content)) {
                    if (!content.data(placeholder)) {
                        content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter(content).hide());
                    }
                    content = content.show().detach();
                    current.wrap.bind('onReset', function () {
                        if ($(this).find(content).length) {
                            content.hide().replaceAll(content.data(placeholder)).data(placeholder, false);
                        }
                    });
                }
                break;
            case'image':
                content = current.tpl.image.replace('{href}', href);
                break;
            case'swf':
                content = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
                embed = '';
                $.each(current.swf, function (name, val) {
                    content += '<param name="' + name + '" value="' + val + '"></param>';
                    embed += ' ' + name + '="' + val + '"';
                });
                content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
                break;
        }
        if (!(isQuery(content) && content.parent().is(current.inner))) {
            current.inner.append(content);
        }
        F.trigger('beforeShow');
        current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));
        F._setDimension();
        current.wrap.removeClass('fancybox-tmp');
        current.pos = $.extend({}, current.dim, F._getPosition(true));
        F.isOpen = false;
        F.coming = null;
        F.bindEvents();
        if (!F.isOpened) {
            $('.fancybox-wrap').not(current.wrap).stop(true).trigger('onReset').remove();
        } else if (previous.prevMethod) {
            F.transitions[previous.prevMethod]();
        }
        F.transitions[F.isOpened ? current.nextMethod : current.openMethod]();
        F._preloadImages();
    }, _setDimension: function () {
        var viewport = F.getViewport(), steps = 0, canShrink = false, canExpand = false, wrap = F.wrap, skin = F.skin, inner = F.inner, current = F.current, width = current.width, height = current.height, minWidth = current.minWidth, minHeight = current.minHeight, maxWidth = current.maxWidth, maxHeight = current.maxHeight, scrolling = current.scrolling, scrollOut = current.scrollOutside ? current.scrollbarWidth : 0, margin = current.margin, wMargin = margin[1] + margin[3], hMargin = margin[0] + margin[2], wPadding, hPadding, wSpace, hSpace, origWidth, origHeight, origMaxWidth, origMaxHeight, ratio, width_, height_, maxWidth_, maxHeight_, iframe, body;
        wrap.add(skin).add(inner).width('auto').height('auto');
        wPadding = skin.outerWidth(true) - skin.width();
        hPadding = skin.outerHeight(true) - skin.height();
        wSpace = wMargin + wPadding;
        hSpace = hMargin + hPadding;
        origWidth = isPercentage(width) ? (viewport.w - wSpace) * getScalar(width) / 100 : width;
        origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;
        if (current.type === 'iframe') {
            iframe = current.content;
            if (current.autoHeight && iframe.data('ready') === 1) {
                try {
                    if (iframe[0].contentWindow.document.location) {
                        inner.width(origWidth).height(9999);
                        body = iframe.contents().find('body');
                        if (scrollOut) {
                            body.css('overflow-x', 'hidden');
                        }
                        origHeight = body.height();
                    }
                } catch (e) {
                }
            }
        } else if (current.autoWidth || current.autoHeight) {
            inner.addClass('fancybox-tmp');
            if (!current.autoWidth) {
                inner.width(origWidth);
            }
            if (!current.autoHeight) {
                inner.height(origHeight);
            }
            if (current.autoWidth) {
                origWidth = inner.width();
            }
            if (current.autoHeight) {
                origHeight = inner.height();
            }
            inner.removeClass('fancybox-tmp');
        }
        width = getScalar(origWidth);
        height = getScalar(origHeight);
        ratio = origWidth / origHeight;
        minWidth = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
        maxWidth = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);
        minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
        maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);
        origMaxWidth = maxWidth;
        origMaxHeight = maxHeight;
        maxWidth_ = viewport.w - wMargin;
        maxHeight_ = viewport.h - hMargin;
        if (current.aspectRatio) {
            if (width > maxWidth) {
                width = maxWidth;
                height = width / ratio;
            }
            if (height > maxHeight) {
                height = maxHeight;
                width = height * ratio;
            }
            if (width < minWidth) {
                width = minWidth;
                height = width / ratio;
            }
            if (height < minHeight) {
                height = minHeight;
                width = height * ratio;
            }
        } else {
            width = Math.max(minWidth, Math.min(width, maxWidth));
            height = Math.max(minHeight, Math.min(height, maxHeight));
        }
        if (current.fitToView) {
            maxWidth = Math.min(viewport.w - wSpace, maxWidth);
            maxHeight = Math.min(viewport.h - hSpace, maxHeight);
            inner.width(getScalar(width)).height(getScalar(height));
            wrap.width(getScalar(width + wPadding));
            width_ = wrap.width();
            height_ = wrap.height();
            if (current.aspectRatio) {
                while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
                    if (steps++ > 19) {
                        break;
                    }
                    height = Math.max(minHeight, Math.min(maxHeight, height - 10));
                    width = height * ratio;
                    if (width < minWidth) {
                        width = minWidth;
                        height = width / ratio;
                    }
                    if (width > maxWidth) {
                        width = maxWidth;
                        height = width / ratio;
                    }
                    inner.width(getScalar(width)).height(getScalar(height));
                    wrap.width(getScalar(width + wPadding));
                    width_ = wrap.width();
                    height_ = wrap.height();
                }
            } else {
                width = Math.max(minWidth, Math.min(width, width - (width_ - maxWidth_)));
                height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
            }
        }
        if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
            width += scrollOut;
        }
        inner.width(getScalar(width)).height(getScalar(height));
        wrap.width(getScalar(width + wPadding));
        width_ = wrap.width();
        height_ = wrap.height();
        canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
        canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));
        $.extend(current, {dim: {width: getValue(width_), height: getValue(height_)}, origWidth: origWidth, origHeight: origHeight, canShrink: canShrink, canExpand: canExpand, wPadding: wPadding, hPadding: hPadding, wrapSpace: height_ - skin.outerHeight(true), skinSpace: skin.height() - height});
        if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
            inner.height('auto');
        }
    }, _getPosition: function (onlyAbsolute) {
        var current = F.current, viewport = F.getViewport(), margin = current.margin, width = F.wrap.width() + margin[1] + margin[3], height = F.wrap.height() + margin[0] + margin[2], rez = {position: 'absolute', top: margin[0], left: margin[3]};
        if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
            rez.position = 'fixed';
        } else if (!current.locked) {
            rez.top += viewport.y;
            rez.left += viewport.x;
        }
        rez.top = getValue(Math.max(rez.top, rez.top + ((viewport.h - height) * current.topRatio)));
        rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width) * current.leftRatio)));
        return rez;
    }, _afterZoomIn: function () {
        var current = F.current;
        if (!current) {
            return;
        }
        F.isOpen = F.isOpened = true;
        F.wrap.addClass('fancybox-opened').css('overflow', 'visible');
        F.reposition();
        if (current.closeClick || current.nextClick) {
            F.inner.css('cursor', 'pointer').bind('click.fb', function (e) {
                if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
                    F[current.closeClick ? 'close' : 'next']();
                }
            });
        }
        if (current.closeBtn) {
            $(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', F.close);
        }
        if (current.arrows && F.group.length > 1) {
            if (current.loop || current.index > 0) {
                $(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
            }
            if (current.loop || current.index < F.group.length - 1) {
                $(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
            }
        }
        F.trigger('afterShow');
        if (!current.loop && current.index === current.group.length - 1) {
            F.play(false);
        } else if (F.opts.autoPlay && !F.player.isActive) {
            F.opts.autoPlay = false;
            F.play();
        }
    }, _afterZoomOut: function () {
        var current = F.current;
        $('.fancybox-wrap').stop(true).trigger('onReset').remove();
        $.extend(F, {group: {}, opts: {}, router: false, current: null, isActive: false, isOpened: false, isOpen: false, isClosing: false, wrap: null, skin: null, outer: null, inner: null});
        F.trigger('afterClose', current);
    }});
    F.transitions = {getOrigPosition: function () {
        var current = F.current, element = current.element, orig = current.orig, pos = {}, width = 50, height = 50, hPadding = current.hPadding, wPadding = current.wPadding, viewport = F.getViewport();
        if (!orig && current.isDom && element.is(':visible')) {
            orig = element.find('img:first');
            if (!orig.length) {
                orig = element;
            }
        }
        if (isQuery(orig)) {
            pos = orig.offset();
            if (orig.is('img')) {
                width = orig.outerWidth();
                height = orig.outerHeight();
            }
        } else {
            pos.top = viewport.y + (viewport.h - height) * current.topRatio;
            pos.left = viewport.x + (viewport.w - width) * current.leftRatio;
        }
        if (current.locked) {
            pos.top -= viewport.y;
            pos.left -= viewport.x;
        }
        pos = {top: getValue(pos.top - hPadding * current.topRatio), left: getValue(pos.left - wPadding * current.leftRatio), width: getValue(width + wPadding), height: getValue(height + hPadding)};
        return pos;
    }, step: function (now, fx) {
        var ratio, padding, value, prop = fx.prop, current = F.current, wrapSpace = current.wrapSpace, skinSpace = current.skinSpace;
        if (prop === 'width' || prop === 'height') {
            ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);
            if (F.isClosing) {
                ratio = 1 - ratio;
            }
            padding = prop === 'width' ? current.wPadding : current.hPadding;
            value = now - padding;
            F.skin[prop](getScalar(prop === 'width' ? value : value - (wrapSpace * ratio)));
            F.inner[prop](getScalar(prop === 'width' ? value : value - (wrapSpace * ratio) - (skinSpace * ratio)));
        }
    }, zoomIn: function () {
        var current = F.current, startPos = current.pos, effect = current.openEffect, elastic = effect === 'elastic', endPos = $.extend({opacity: 1}, startPos);
        delete endPos.position;
        if (elastic) {
            startPos = this.getOrigPosition();
            if (current.openOpacity) {
                startPos.opacity = 0.1;
            }
        } else if (effect === 'fade') {
            startPos.opacity = 0.1;
        }
        F.wrap.css(startPos).animate(endPos, {duration: effect === 'none' ? 0 : current.openSpeed, easing: current.openEasing, step: elastic ? this.step : null, complete: F._afterZoomIn});
    }, zoomOut: function () {
        var current = F.current, effect = current.closeEffect, elastic = effect === 'elastic', endPos = {opacity: 0.1};
        if (elastic) {
            endPos = this.getOrigPosition();
            if (current.closeOpacity) {
                endPos.opacity = 0.1;
            }
        }
        F.wrap.animate(endPos, {duration: effect === 'none' ? 0 : current.closeSpeed, easing: current.closeEasing, step: elastic ? this.step : null, complete: F._afterZoomOut});
    }, changeIn: function () {
        var current = F.current, effect = current.nextEffect, startPos = current.pos, endPos = {opacity: 1}, direction = F.direction, distance = 200, field;
        startPos.opacity = 0.1;
        if (effect === 'elastic') {
            field = direction === 'down' || direction === 'up' ? 'top' : 'left';
            if (direction === 'down' || direction === 'right') {
                startPos[field] = getValue(getScalar(startPos[field]) - distance);
                endPos[field] = '+=' + distance + 'px';
            } else {
                startPos[field] = getValue(getScalar(startPos[field]) + distance);
                endPos[field] = '-=' + distance + 'px';
            }
        }
        if (effect === 'none') {
            F._afterZoomIn();
        } else {
            F.wrap.css(startPos).animate(endPos, {duration: current.nextSpeed, easing: current.nextEasing, complete: F._afterZoomIn});
        }
    }, changeOut: function () {
        var previous = F.previous, effect = previous.prevEffect, endPos = {opacity: 0.1}, direction = F.direction, distance = 200;
        if (effect === 'elastic') {
            endPos[direction === 'down' || direction === 'up' ? 'top' : 'left'] = (direction === 'up' || direction === 'left' ? '-' : '+') + '=' + distance + 'px';
        }
        previous.wrap.animate(endPos, {duration: effect === 'none' ? 0 : previous.prevSpeed, easing: previous.prevEasing, complete: function () {
            $(this).trigger('onReset').remove();
        }});
    }};
    F.helpers.overlay = {overlay: null, update: function () {
        var width = '100%', offsetWidth;
        this.overlay.width(width).height('100%');
        if ($.browser.msie) {
            offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
            if (D.width() > offsetWidth) {
                width = D.width();
            }
        } else if (D.width() > W.width()) {
            width = D.width();
        }
        this.overlay.width(width).height(D.height());
    }, onReady: function (opts, obj) {
        $('.fancybox-overlay').stop(true, true);
        if (!this.overlay) {
            $.extend(this, {overlay: $('<div class="fancybox-overlay"></div>').appendTo(obj.parent), margin: D.height() > W.height() || $('body').css('overflow-y') === 'scroll' ? $('body').css('margin-right') : false, el: document.all && !document.querySelector ? $('html') : $('body')});
        }
        if (obj.fixed && !isTouch) {
            this.overlay.addClass('fancybox-overlay-fixed');
            if (obj.autoCenter) {
                this.overlay.append(obj.wrap);
                obj.locked = this.overlay;
            }
        }
        if (opts.showEarly === true) {
            this.beforeShow.apply(this, arguments);
        }
    }, beforeShow: function (opts, obj) {
        var overlay = this.overlay.unbind('.fb').width('auto').height('auto').css(opts.css);
        if (opts.closeClick) {
            overlay.bind('click.fb', function (e) {
                if ($(e.target).hasClass('fancybox-overlay')) {
                    F.close();
                }
            });
        }
        if (obj.fixed && !isTouch) {
            if (obj.locked) {
                this.el.addClass('fancybox-lock');
                if (this.margin !== false) {
                    $('body').css('margin-right', getScalar(this.margin) + obj.scrollbarWidth);
                }
            }
        } else {
            this.update();
        }
        overlay.show();
    }, onUpdate: function (opts, obj) {
        if (!obj.fixed || isTouch) {
            this.update();
        }
    }, afterClose: function (opts) {
        var that = this, speed = opts.speedOut || 0;
        if (that.overlay && !F.isActive) {
            that.overlay.fadeOut(speed || 0, function () {
                $('body').css('margin-right', that.margin);
                that.el.removeClass('fancybox-lock');
                that.overlay.remove();
                that.overlay = null;
            });
        }
    }};
    F.helpers.title = {beforeShow: function (opts) {
        var text = F.current.title, type = opts.type, title, target;
        if (!isString(text) || $.trim(text) === '') {
            return;
        }
        title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');
        switch (type) {
            case'inside':
                target = F.skin;
                break;
            case'outside':
                target = F.wrap;
                break;
            case'over':
                target = F.inner;
                break;
            default:
                target = F.skin;
                title.appendTo('body').width(title.width()).wrapInner('<span class="child"></span>');
                F.current.margin[2] += Math.abs(getScalar(title.css('margin-bottom')));
                break;
        }
        if (opts.position === 'top') {
            title.prependTo(target);
        } else {
            title.appendTo(target);
        }
    }};
    $.fn.fancybox = function (options) {
        var index, that = $(this), selector = this.selector || '', run = function (e) {
            var what = $(this).blur(), idx = index, relType, relVal;
            if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
                relType = options.groupAttr || 'data-fancybox-group';
                relVal = what.attr(relType);
                if (!relVal) {
                    relType = 'rel';
                    relVal = what.get(0)[relType];
                }
                if (relVal && relVal !== '' && relVal !== 'nofollow') {
                    what = selector.length ? $(selector) : that;
                    console.log(what);
                    what = what.filter('[' + relType + '="' + relVal + '"]');
                    idx = what.index(this);
                }
                options.index = idx;
                if (F.open(what, options) !== false) {
                    e.preventDefault();
                }
            }
        };
        options = options || {};
        index = options.index || 0;
        if (!selector || options.live === false) {
            that.unbind('click.fb-start').bind('click.fb-start', run);
        } else {
            D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
        }
        return this;
    };
    D.ready(function () {
        if ($.scrollbarWidth === undefined) {
            $.scrollbarWidth = function () {
                var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'), child = parent.children(), width = child.innerWidth() - child.height(99).innerWidth();
                parent.remove();
                return width;
            };
        }
        if ($.support.fixedPosition === undefined) {
            $.support.fixedPosition = (function () {
                var elem = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'), fixed = (elem[0].offsetTop === 20 || elem[0].offsetTop === 15);
                elem.remove();
                return fixed;
            }());
        }
        $.extend(F.defaults, {scrollbarWidth: $.scrollbarWidth(), fixed: $.support.fixedPosition, parent: $('body')});
    });
}(window, document, jQuery));
$(function () {
    if (!Modernizr.input.placeholder) {
        $('[placeholder]').focus(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function () {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur().parents('form').submit(function () {
            $(this).find('[placeholder]').each(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }
});
var ContextSelector = nova.Class({$: function (selector) {
    return $(selector, this.el);
}});
var EventListener = nova.Class({events: function () {
    var i = 0, l = arguments.length, data, ev, el, fn;
    for (; i < l; i++) {
        this[arguments[i][1]].on(arguments[i][0], $.proxy(this, arguments[i][2]));
    }
}});
var ElementView = nova.Class({implement: [ContextSelector, EventListener]});
var ScrollEvents = nova.Class({whenVisible: function (el, options) {
    options = $.extend({}, {offsetY: 0, callback: $.noop}, options);
    var scrollTop = this.win.scrollTop(), top, fired;
    el.each(function () {
        top = $(this).offset().top + options.offsetY;
        fired = $(this).data('scrollFired');
        if (!fired && scrollTop >= top) {
            options.callback.call(this);
            $(this).data('scrollFired', true);
        }
    });
}});