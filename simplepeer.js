(function(e) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = e()
    } else if (typeof define === "function" && define.amd) {
        define([], e)
    } else {
        var t;
        if (typeof window !== "undefined") {
            t = window
        } else if (typeof global !== "undefined") {
            t = global
        } else if (typeof self !== "undefined") {
            t = self
        } else {
            t = this
        }
        t.SimplePeer = e()
    }
})(function() {
    var e, t, r;
    return function n(e, t, r) {
        function i(a, s) {
            if (!t[a]) {
                if (!e[a]) {
                    var f = typeof require == "function" && require;
                    if (!s && f) return f(a, !0);
                    if (o) return o(a, !0);
                    var u = new Error("Cannot find module '" + a + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var c = t[a] = {
                    exports: {}
                };
                e[a][0].call(c.exports, function(t) {
                    var r = e[a][1][t];
                    return i(r ? r : t)
                }, c, c.exports, n, e, t, r)
            }
            return t[a].exports
        }
        var o = typeof require == "function" && require;
        for (var a = 0; a < r.length; a++) i(r[a]);
        return i
    }({
        1: [function(e, t, r) {}, {}],
        2: [function(e, t, r) {
            (function(t) {
                "use strict";
                var n = e("base64-js");
                var i = e("ieee754");
                var o = e("isarray");
                r.Buffer = u;
                r.SlowBuffer = m;
                r.INSPECT_MAX_BYTES = 50;
                u.poolSize = 8192;
                var a = {};
                u.TYPED_ARRAY_SUPPORT = t.TYPED_ARRAY_SUPPORT !== undefined ? t.TYPED_ARRAY_SUPPORT : s();

                function s() {
                    try {
                        var e = new Uint8Array(1);
                        e.foo = function() {
                            return 42
                        };
                        return e.foo() === 42 && typeof e.subarray === "function" && e.subarray(1, 1).byteLength === 0
                    } catch (t) {
                        return false
                    }
                }

                function f() {
                    return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
                }

                function u(e) {
                    if (!(this instanceof u)) {
                        if (arguments.length > 1) return new u(e, arguments[1]);
                        return new u(e)
                    }
                    if (!u.TYPED_ARRAY_SUPPORT) {
                        this.length = 0;
                        this.parent = undefined
                    }
                    if (typeof e === "number") {
                        return c(this, e)
                    }
                    if (typeof e === "string") {
                        return l(this, e, arguments.length > 1 ? arguments[1] : "utf8")
                    }
                    return h(this, e)
                }
                u._augment = function(e) {
                    e.__proto__ = u.prototype;
                    return e
                };

                function c(e, t) {
                    e = b(e, t < 0 ? 0 : w(t) | 0);
                    if (!u.TYPED_ARRAY_SUPPORT) {
                        for (var r = 0; r < t; r++) {
                            e[r] = 0
                        }
                    }
                    return e
                }

                function l(e, t, r) {
                    if (typeof r !== "string" || r === "") r = "utf8";
                    var n = R(t, r) | 0;
                    e = b(e, n);
                    e.write(t, r);
                    return e
                }

                function h(e, t) {
                    if (u.isBuffer(t)) return d(e, t);
                    if (o(t)) return p(e, t);
                    if (t == null) {
                        throw new TypeError("must start with number, buffer, array or string")
                    }
                    if (typeof ArrayBuffer !== "undefined") {
                        if (t.buffer instanceof ArrayBuffer) {
                            return g(e, t)
                        }
                        if (t instanceof ArrayBuffer) {
                            return v(e, t)
                        }
                    }
                    if (t.length) return y(e, t);
                    return _(e, t)
                }

                function d(e, t) {
                    var r = w(t.length) | 0;
                    e = b(e, r);
                    t.copy(e, 0, 0, r);
                    return e
                }

                function p(e, t) {
                    var r = w(t.length) | 0;
                    e = b(e, r);
                    for (var n = 0; n < r; n += 1) {
                        e[n] = t[n] & 255
                    }
                    return e
                }

                function g(e, t) {
                    var r = w(t.length) | 0;
                    e = b(e, r);
                    for (var n = 0; n < r; n += 1) {
                        e[n] = t[n] & 255
                    }
                    return e
                }

                function v(e, t) {
                    t.byteLength;
                    if (u.TYPED_ARRAY_SUPPORT) {
                        e = new Uint8Array(t);
                        e.__proto__ = u.prototype
                    } else {
                        e = g(e, new Uint8Array(t))
                    }
                    return e
                }

                function y(e, t) {
                    var r = w(t.length) | 0;
                    e = b(e, r);
                    for (var n = 0; n < r; n += 1) {
                        e[n] = t[n] & 255
                    }
                    return e
                }

                function _(e, t) {
                    var r;
                    var n = 0;
                    if (t.type === "Buffer" && o(t.data)) {
                        r = t.data;
                        n = w(r.length) | 0
                    }
                    e = b(e, n);
                    for (var i = 0; i < n; i += 1) {
                        e[i] = r[i] & 255
                    }
                    return e
                }
                if (u.TYPED_ARRAY_SUPPORT) {
                    u.prototype.__proto__ = Uint8Array.prototype;
                    u.__proto__ = Uint8Array;
                    if (typeof Symbol !== "undefined" && Symbol.species && u[Symbol.species] === u) {
                        Object.defineProperty(u, Symbol.species, {
                            value: null,
                            configurable: true
                        })
                    }
                } else {
                    u.prototype.length = undefined;
                    u.prototype.parent = undefined
                }

                function b(e, t) {
                    if (u.TYPED_ARRAY_SUPPORT) {
                        e = new Uint8Array(t);
                        e.__proto__ = u.prototype
                    } else {
                        e.length = t
                    }
                    var r = t !== 0 && t <= u.poolSize >>> 1;
                    if (r) e.parent = a;
                    return e
                }

                function w(e) {
                    if (e >= f()) {
                        throw new RangeError("Attempt to allocate Buffer larger than maximum " + "size: 0x" + f().toString(16) + " bytes")
                    }
                    return e | 0
                }

                function m(e, t) {
                    if (!(this instanceof m)) return new m(e, t);
                    var r = new u(e, t);
                    delete r.parent;
                    return r
                }
                u.isBuffer = function ee(e) {
                    return !!(e != null && e._isBuffer)
                };
                u.compare = function te(e, t) {
                    if (!u.isBuffer(e) || !u.isBuffer(t)) {
                        throw new TypeError("Arguments must be Buffers")
                    }
                    if (e === t) return 0;
                    var r = e.length;
                    var n = t.length;
                    var i = 0;
                    var o = Math.min(r, n);
                    while (i < o) {
                        if (e[i] !== t[i]) break;
                        ++i
                    }
                    if (i !== o) {
                        r = e[i];
                        n = t[i]
                    }
                    if (r < n) return -1;
                    if (n < r) return 1;
                    return 0
                };
                u.isEncoding = function re(e) {
                    switch (String(e).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "binary":
                        case "base64":
                        case "raw":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return true;
                        default:
                            return false
                    }
                };
                u.concat = function ne(e, t) {
                    if (!o(e)) throw new TypeError("list argument must be an Array of Buffers.");
                    if (e.length === 0) {
                        return new u(0)
                    }
                    var r;
                    if (t === undefined) {
                        t = 0;
                        for (r = 0; r < e.length; r++) {
                            t += e[r].length
                        }
                    }
                    var n = new u(t);
                    var i = 0;
                    for (r = 0; r < e.length; r++) {
                        var a = e[r];
                        a.copy(n, i);
                        i += a.length
                    }
                    return n
                };

                function R(e, t) {
                    if (typeof e !== "string") e = "" + e;
                    var r = e.length;
                    if (r === 0) return 0;
                    var n = false;
                    for (;;) {
                        switch (t) {
                            case "ascii":
                            case "binary":
                            case "raw":
                            case "raws":
                                return r;
                            case "utf8":
                            case "utf-8":
                                return G(e).length;
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return r * 2;
                            case "hex":
                                return r >>> 1;
                            case "base64":
                                return Q(e).length;
                            default:
                                if (n) return G(e).length;
                                t = ("" + t).toLowerCase();
                                n = true
                        }
                    }
                }
                u.byteLength = R;

                function E(e, t, r) {
                    var n = false;
                    t = t | 0;
                    r = r === undefined || r === Infinity ? this.length : r | 0;
                    if (!e) e = "utf8";
                    if (t < 0) t = 0;
                    if (r > this.length) r = this.length;
                    if (r <= t) return "";
                    while (true) {
                        switch (e) {
                            case "hex":
                                return I(this, t, r);
                            case "utf8":
                            case "utf-8":
                                return P(this, t, r);
                            case "ascii":
                                return D(this, t, r);
                            case "binary":
                                return j(this, t, r);
                            case "base64":
                                return x(this, t, r);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return O(this, t, r);
                            default:
                                if (n) throw new TypeError("Unknown encoding: " + e);
                                e = (e + "").toLowerCase();
                                n = true
                        }
                    }
                }
                u.prototype._isBuffer = true;
                u.prototype.toString = function ie() {
                    var e = this.length | 0;
                    if (e === 0) return "";
                    if (arguments.length === 0) return P(this, 0, e);
                    return E.apply(this, arguments)
                };
                u.prototype.equals = function oe(e) {
                    if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                    if (this === e) return true;
                    return u.compare(this, e) === 0
                };
                u.prototype.inspect = function ae() {
                    var e = "";
                    var t = r.INSPECT_MAX_BYTES;
                    if (this.length > 0) {
                        e = this.toString("hex", 0, t).match(/.{2}/g).join(" ");
                        if (this.length > t) e += " ... "
                    }
                    return "<Buffer " + e + ">"
                };
                u.prototype.compare = function se(e) {
                    if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                    if (this === e) return 0;
                    return u.compare(this, e)
                };
                u.prototype.indexOf = function fe(e, t) {
                    if (t > 2147483647) t = 2147483647;
                    else if (t < -2147483648) t = -2147483648;
                    t >>= 0;
                    if (this.length === 0) return -1;
                    if (t >= this.length) return -1;
                    if (t < 0) t = Math.max(this.length + t, 0);
                    if (typeof e === "string") {
                        if (e.length === 0) return -1;
                        return String.prototype.indexOf.call(this, e, t)
                    }
                    if (u.isBuffer(e)) {
                        return r(this, e, t)
                    }
                    if (typeof e === "number") {
                        if (u.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === "function") {
                            return Uint8Array.prototype.indexOf.call(this, e, t)
                        }
                        return r(this, [e], t)
                    }

                    function r(e, t, r) {
                        var n = -1;
                        for (var i = 0; r + i < e.length; i++) {
                            if (e[r + i] === t[n === -1 ? 0 : i - n]) {
                                if (n === -1) n = i;
                                if (i - n + 1 === t.length) return r + n
                            } else {
                                n = -1
                            }
                        }
                        return -1
                    }
                    throw new TypeError("val must be string, number or Buffer")
                };

                function S(e, t, r, n) {
                    r = Number(r) || 0;
                    var i = e.length - r;
                    if (!n) {
                        n = i
                    } else {
                        n = Number(n);
                        if (n > i) {
                            n = i
                        }
                    }
                    var o = t.length;
                    if (o % 2 !== 0) throw new Error("Invalid hex string");
                    if (n > o / 2) {
                        n = o / 2
                    }
                    for (var a = 0; a < n; a++) {
                        var s = parseInt(t.substr(a * 2, 2), 16);
                        if (isNaN(s)) throw new Error("Invalid hex string");
                        e[r + a] = s
                    }
                    return a
                }

                function A(e, t, r, n) {
                    return V(G(t, e.length - r), e, r, n)
                }

                function C(e, t, r, n) {
                    return V(Z(t), e, r, n)
                }

                function T(e, t, r, n) {
                    return C(e, t, r, n)
                }

                function k(e, t, r, n) {
                    return V(Q(t), e, r, n)
                }

                function M(e, t, r, n) {
                    return V(K(t, e.length - r), e, r, n)
                }
                u.prototype.write = function ue(e, t, r, n) {
                    if (t === undefined) {
                        n = "utf8";
                        r = this.length;
                        t = 0
                    } else if (r === undefined && typeof t === "string") {
                        n = t;
                        r = this.length;
                        t = 0
                    } else if (isFinite(t)) {
                        t = t | 0;
                        if (isFinite(r)) {
                            r = r | 0;
                            if (n === undefined) n = "utf8"
                        } else {
                            n = r;
                            r = undefined
                        }
                    } else {
                        var i = n;
                        n = t;
                        t = r | 0;
                        r = i
                    }
                    var o = this.length - t;
                    if (r === undefined || r > o) r = o;
                    if (e.length > 0 && (r < 0 || t < 0) || t > this.length) {
                        throw new RangeError("attempt to write outside buffer bounds")
                    }
                    if (!n) n = "utf8";
                    var a = false;
                    for (;;) {
                        switch (n) {
                            case "hex":
                                return S(this, e, t, r);
                            case "utf8":
                            case "utf-8":
                                return A(this, e, t, r);
                            case "ascii":
                                return C(this, e, t, r);
                            case "binary":
                                return T(this, e, t, r);
                            case "base64":
                                return k(this, e, t, r);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return M(this, e, t, r);
                            default:
                                if (a) throw new TypeError("Unknown encoding: " + n);
                                n = ("" + n).toLowerCase();
                                a = true
                        }
                    }
                };
                u.prototype.toJSON = function ce() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };

                function x(e, t, r) {
                    if (t === 0 && r === e.length) {
                        return n.fromByteArray(e)
                    } else {
                        return n.fromByteArray(e.slice(t, r))
                    }
                }

                function P(e, t, r) {
                    r = Math.min(e.length, r);
                    var n = [];
                    var i = t;
                    while (i < r) {
                        var o = e[i];
                        var a = null;
                        var s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                        if (i + s <= r) {
                            var f, u, c, l;
                            switch (s) {
                                case 1:
                                    if (o < 128) {
                                        a = o
                                    }
                                    break;
                                case 2:
                                    f = e[i + 1];
                                    if ((f & 192) === 128) {
                                        l = (o & 31) << 6 | f & 63;
                                        if (l > 127) {
                                            a = l
                                        }
                                    }
                                    break;
                                case 3:
                                    f = e[i + 1];
                                    u = e[i + 2];
                                    if ((f & 192) === 128 && (u & 192) === 128) {
                                        l = (o & 15) << 12 | (f & 63) << 6 | u & 63;
                                        if (l > 2047 && (l < 55296 || l > 57343)) {
                                            a = l
                                        }
                                    }
                                    break;
                                case 4:
                                    f = e[i + 1];
                                    u = e[i + 2];
                                    c = e[i + 3];
                                    if ((f & 192) === 128 && (u & 192) === 128 && (c & 192) === 128) {
                                        l = (o & 15) << 18 | (f & 63) << 12 | (u & 63) << 6 | c & 63;
                                        if (l > 65535 && l < 1114112) {
                                            a = l
                                        }
                                    }
                            }
                        }
                        if (a === null) {
                            a = 65533;
                            s = 1
                        } else if (a > 65535) {
                            a -= 65536;
                            n.push(a >>> 10 & 1023 | 55296);
                            a = 56320 | a & 1023
                        }
                        n.push(a);
                        i += s
                    }
                    return B(n)
                }
                var L = 4096;

                function B(e) {
                    var t = e.length;
                    if (t <= L) {
                        return String.fromCharCode.apply(String, e)
                    }
                    var r = "";
                    var n = 0;
                    while (n < t) {
                        r += String.fromCharCode.apply(String, e.slice(n, n += L))
                    }
                    return r
                }

                function D(e, t, r) {
                    var n = "";
                    r = Math.min(e.length, r);
                    for (var i = t; i < r; i++) {
                        n += String.fromCharCode(e[i] & 127)
                    }
                    return n
                }

                function j(e, t, r) {
                    var n = "";
                    r = Math.min(e.length, r);
                    for (var i = t; i < r; i++) {
                        n += String.fromCharCode(e[i])
                    }
                    return n
                }

                function I(e, t, r) {
                    var n = e.length;
                    if (!t || t < 0) t = 0;
                    if (!r || r < 0 || r > n) r = n;
                    var i = "";
                    for (var o = t; o < r; o++) {
                        i += X(e[o])
                    }
                    return i
                }

                function O(e, t, r) {
                    var n = e.slice(t, r);
                    var i = "";
                    for (var o = 0; o < n.length; o += 2) {
                        i += String.fromCharCode(n[o] + n[o + 1] * 256)
                    }
                    return i
                }
                u.prototype.slice = function le(e, t) {
                    var r = this.length;
                    e = ~~e;
                    t = t === undefined ? r : ~~t;
                    if (e < 0) {
                        e += r;
                        if (e < 0) e = 0
                    } else if (e > r) {
                        e = r
                    }
                    if (t < 0) {
                        t += r;
                        if (t < 0) t = 0
                    } else if (t > r) {
                        t = r
                    }
                    if (t < e) t = e;
                    var n;
                    if (u.TYPED_ARRAY_SUPPORT) {
                        n = this.subarray(e, t);
                        n.__proto__ = u.prototype
                    } else {
                        var i = t - e;
                        n = new u(i, undefined);
                        for (var o = 0; o < i; o++) {
                            n[o] = this[o + e]
                        }
                    }
                    if (n.length) n.parent = this.parent || this;
                    return n
                };

                function U(e, t, r) {
                    if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
                    if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
                }
                u.prototype.readUIntLE = function he(e, t, r) {
                    e = e | 0;
                    t = t | 0;
                    if (!r) U(e, t, this.length);
                    var n = this[e];
                    var i = 1;
                    var o = 0;
                    while (++o < t && (i *= 256)) {
                        n += this[e + o] * i
                    }
                    return n
                };
                u.prototype.readUIntBE = function de(e, t, r) {
                    e = e | 0;
                    t = t | 0;
                    if (!r) {
                        U(e, t, this.length)
                    }
                    var n = this[e + --t];
                    var i = 1;
                    while (t > 0 && (i *= 256)) {
                        n += this[e + --t] * i
                    }
                    return n
                };
                u.prototype.readUInt8 = function pe(e, t) {
                    if (!t) U(e, 1, this.length);
                    return this[e]
                };
                u.prototype.readUInt16LE = function ge(e, t) {
                    if (!t) U(e, 2, this.length);
                    return this[e] | this[e + 1] << 8
                };
                u.prototype.readUInt16BE = function ve(e, t) {
                    if (!t) U(e, 2, this.length);
                    return this[e] << 8 | this[e + 1]
                };
                u.prototype.readUInt32LE = function ye(e, t) {
                    if (!t) U(e, 4, this.length);
                    return (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216
                };
                u.prototype.readUInt32BE = function _e(e, t) {
                    if (!t) U(e, 4, this.length);
                    return this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
                };
                u.prototype.readIntLE = function be(e, t, r) {
                    e = e | 0;
                    t = t | 0;
                    if (!r) U(e, t, this.length);
                    var n = this[e];
                    var i = 1;
                    var o = 0;
                    while (++o < t && (i *= 256)) {
                        n += this[e + o] * i
                    }
                    i *= 128;
                    if (n >= i) n -= Math.pow(2, 8 * t);
                    return n
                };
                u.prototype.readIntBE = function we(e, t, r) {
                    e = e | 0;
                    t = t | 0;
                    if (!r) U(e, t, this.length);
                    var n = t;
                    var i = 1;
                    var o = this[e + --n];
                    while (n > 0 && (i *= 256)) {
                        o += this[e + --n] * i
                    }
                    i *= 128;
                    if (o >= i) o -= Math.pow(2, 8 * t);
                    return o
                };
                u.prototype.readInt8 = function me(e, t) {
                    if (!t) U(e, 1, this.length);
                    if (!(this[e] & 128)) return this[e];
                    return (255 - this[e] + 1) * -1
                };
                u.prototype.readInt16LE = function Re(e, t) {
                    if (!t) U(e, 2, this.length);
                    var r = this[e] | this[e + 1] << 8;
                    return r & 32768 ? r | 4294901760 : r
                };
                u.prototype.readInt16BE = function Ee(e, t) {
                    if (!t) U(e, 2, this.length);
                    var r = this[e + 1] | this[e] << 8;
                    return r & 32768 ? r | 4294901760 : r
                };
                u.prototype.readInt32LE = function Se(e, t) {
                    if (!t) U(e, 4, this.length);
                    return this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
                };
                u.prototype.readInt32BE = function Ae(e, t) {
                    if (!t) U(e, 4, this.length);
                    return this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
                };
                u.prototype.readFloatLE = function Ce(e, t) {
                    if (!t) U(e, 4, this.length);
                    return i.read(this, e, true, 23, 4)
                };
                u.prototype.readFloatBE = function Te(e, t) {
                    if (!t) U(e, 4, this.length);
                    return i.read(this, e, false, 23, 4)
                };
                u.prototype.readDoubleLE = function ke(e, t) {
                    if (!t) U(e, 8, this.length);
                    return i.read(this, e, true, 52, 8)
                };
                u.prototype.readDoubleBE = function Me(e, t) {
                    if (!t) U(e, 8, this.length);
                    return i.read(this, e, false, 52, 8)
                };

                function Y(e, t, r, n, i, o) {
                    if (!u.isBuffer(e)) throw new TypeError("buffer must be a Buffer instance");
                    if (t > i || t < o) throw new RangeError("value is out of bounds");
                    if (r + n > e.length) throw new RangeError("index out of range")
                }
                u.prototype.writeUIntLE = function xe(e, t, r, n) {
                    e = +e;
                    t = t | 0;
                    r = r | 0;
                    if (!n) Y(this, e, t, r, Math.pow(2, 8 * r), 0);
                    var i = 1;
                    var o = 0;
                    this[t] = e & 255;
                    while (++o < r && (i *= 256)) {
                        this[t + o] = e / i & 255
                    }
                    return t + r
                };
                u.prototype.writeUIntBE = function Pe(e, t, r, n) {
                    e = +e;
                    t = t | 0;
                    r = r | 0;
                    if (!n) Y(this, e, t, r, Math.pow(2, 8 * r), 0);
                    var i = r - 1;
                    var o = 1;
                    this[t + i] = e & 255;
                    while (--i >= 0 && (o *= 256)) {
                        this[t + i] = e / o & 255
                    }
                    return t + r
                };
                u.prototype.writeUInt8 = function Le(e, t, r) {
                    e = +e;
                    t = t | 0;
                    if (!r) Y(this, e, t, 1, 255, 0);
                    if (!u.TYPED_ARRAY_SUPPORT) e = Math.floor(e);
                    this[t] = e & 255;
                    return t + 1
                };

                function N(e, t, r, n) {
                    if (t < 0) t = 65535 + t + 1;
                    for (var i = 0, o = Math.min(e.length - r, 2); i < o; i++) {
                        e[r + i] = (t & 255 << 8 * (n ? i : 1 - i)) >>> (n ? i : 1 - i) * 8
                    }
                }
                u.prototype.writeUInt16LE = function Be(e, t, r) {
                    e = +e;
                    t = t | 0;
                    if (!r) Y(this, e, t, 2, 65535, 0);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[t] = e & 255;
                        this[t + 1] = e >>> 8
                    } else {
                        N(this, e, t, true)
                    }
                    return t + 2
                };
                u.prototype.writeUInt16BE = function De(e, t, r) {
                    e = +e;
                    t = t | 0;
                    if (!r) Y(this, e, t, 2, 65535, 0);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[t] = e >>> 8;
                        this[t + 1] = e & 255
                    } else {
                        N(this, e, t, false)
                    }
                    return t + 2
                };

                function W(e, t, r, n) {
                    if (t < 0) t = 4294967295 + t + 1;
                    for (var i = 0, o = Math.min(e.length - r, 4); i < o; i++) {
                        e[r + i] = t >>> (n ? i : 3 - i) * 8 & 255
                    }
                }
                u.prototype.writeUInt32LE = function je(e, t, r) {
                    e = +e;
                    t = t | 0;
                    if (!r) Y(this, e, t, 4, 4294967295, 0);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[t + 3] = e >>> 24;
                        this[t + 2] = e >>> 16;
                        this[t + 1] = e >>> 8;
                        this[t] = e & 255
                    } else {
                        W(this, e, t, true)
                    }
                    return t + 4
                };
                u.prototype.writeUInt32BE = function Ie(e, t, r) {
                    e = +e;
                    t = t | 0;
                    if (!r) Y(this, e, t, 4, 4294967295, 0);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[t] = e >>> 24;
                        this[t + 1] = e >>> 16;
                        this[t + 2] = e >>> 8;
                        this[t + 3] = e & 255
                    } else {
                        W(this, e, t, false)
                    }
                    return t + 4
                };
                u.prototype.writeIntLE = function Oe(e, t, r, n) {
                    e = +e;
                    t = t | 0;
                    if (!n) {
                        var i = Math.pow(2, 8 * r - 1);
                        Y(this, e, t, r, i - 1, -i)
                    }
                    var o = 0;
                    var a = 1;
                    var s = e < 0 ? 1 : 0;
                    this[t] = e & 255;
                    while (++o < r && (a *= 256)) {
                        this[t + o] = (e / a >> 0) - s & 255
                    }
                    return t + r
                };
                u.prototype.writeIntBE = function Ue(e, t, r, n) {
                    e = +e;
                    t = t | 0;
                    if (!n) {
                        var i = Math.pow(2, 8 * r - 1);
                        Y(this, e, t, r, i - 1, -i)
                    }
                    var o = r - 1;
                    var a = 1;
                    var s = e < 0 ? 1 : 0;
                    this[t + o] = e & 255;
                    while (--o >= 0 && (a *= 256)) {
                        this[t + o] = (e / a >> 0) - s & 255
                    }
                    return t + r
                };
                u.prototype.writeInt8 = function Ye(e, t, r) {
                    e = +e;
                    t = t | 0;
                    if (!r) Y(this, e, t, 1, 127, -128);
                    if (!u.TYPED_ARRAY_SUPPORT) e = Math.floor(e);
                    if (e < 0) e = 255 + e + 1;
                    this[t] = e & 255;
                    return t + 1
                };
                u.prototype.writeInt16LE = function Ne(e, t, r) {
                    e = +e;
                    t = t | 0;
                    if (!r) Y(this, e, t, 2, 32767, -32768);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[t] = e & 255;
                        this[t + 1] = e >>> 8
                    } else {
                        N(this, e, t, true)
                    }
                    return t + 2
                };
                u.prototype.writeInt16BE = function We(e, t, r) {
                    e = +e;
                    t = t | 0;
                    if (!r) Y(this, e, t, 2, 32767, -32768);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[t] = e >>> 8;
                        this[t + 1] = e & 255
                    } else {
                        N(this, e, t, false)
                    }
                    return t + 2
                };
                u.prototype.writeInt32LE = function qe(e, t, r) {
                    e = +e;
                    t = t | 0;
                    if (!r) Y(this, e, t, 4, 2147483647, -2147483648);
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[t] = e & 255;
                        this[t + 1] = e >>> 8;
                        this[t + 2] = e >>> 16;
                        this[t + 3] = e >>> 24
                    } else {
                        W(this, e, t, true)
                    }
                    return t + 4
                };
                u.prototype.writeInt32BE = function ze(e, t, r) {
                    e = +e;
                    t = t | 0;
                    if (!r) Y(this, e, t, 4, 2147483647, -2147483648);
                    if (e < 0) e = 4294967295 + e + 1;
                    if (u.TYPED_ARRAY_SUPPORT) {
                        this[t] = e >>> 24;
                        this[t + 1] = e >>> 16;
                        this[t + 2] = e >>> 8;
                        this[t + 3] = e & 255
                    } else {
                        W(this, e, t, false)
                    }
                    return t + 4
                };

                function q(e, t, r, n, i, o) {
                    if (r + n > e.length) throw new RangeError("index out of range");
                    if (r < 0) throw new RangeError("index out of range")
                }

                function z(e, t, r, n, o) {
                    if (!o) {
                        q(e, t, r, 4, 3.4028234663852886e38, -3.4028234663852886e38)
                    }
                    i.write(e, t, r, n, 23, 4);
                    return r + 4
                }
                u.prototype.writeFloatLE = function Fe(e, t, r) {
                    return z(this, e, t, true, r)
                };
                u.prototype.writeFloatBE = function He(e, t, r) {
                    return z(this, e, t, false, r)
                };

                function F(e, t, r, n, o) {
                    if (!o) {
                        q(e, t, r, 8, 1.7976931348623157e308, -1.7976931348623157e308)
                    }
                    i.write(e, t, r, n, 52, 8);
                    return r + 8
                }
                u.prototype.writeDoubleLE = function $e(e, t, r) {
                    return F(this, e, t, true, r)
                };
                u.prototype.writeDoubleBE = function Je(e, t, r) {
                    return F(this, e, t, false, r)
                };
                u.prototype.copy = function Xe(e, t, r, n) {
                    if (!r) r = 0;
                    if (!n && n !== 0) n = this.length;
                    if (t >= e.length) t = e.length;
                    if (!t) t = 0;
                    if (n > 0 && n < r) n = r;
                    if (n === r) return 0;
                    if (e.length === 0 || this.length === 0) return 0;
                    if (t < 0) {
                        throw new RangeError("targetStart out of bounds")
                    }
                    if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (n < 0) throw new RangeError("sourceEnd out of bounds");
                    if (n > this.length) n = this.length;
                    if (e.length - t < n - r) {
                        n = e.length - t + r
                    }
                    var i = n - r;
                    var o;
                    if (this === e && r < t && t < n) {
                        for (o = i - 1; o >= 0; o--) {
                            e[o + t] = this[o + r]
                        }
                    } else if (i < 1e3 || !u.TYPED_ARRAY_SUPPORT) {
                        for (o = 0; o < i; o++) {
                            e[o + t] = this[o + r]
                        }
                    } else {
                        Uint8Array.prototype.set.call(e, this.subarray(r, r + i), t)
                    }
                    return i
                };
                u.prototype.fill = function Ge(e, t, r) {
                    if (!e) e = 0;
                    if (!t) t = 0;
                    if (!r) r = this.length;
                    if (r < t) throw new RangeError("end < start");
                    if (r === t) return;
                    if (this.length === 0) return;
                    if (t < 0 || t >= this.length) throw new RangeError("start out of bounds");
                    if (r < 0 || r > this.length) throw new RangeError("end out of bounds");
                    var n;
                    if (typeof e === "number") {
                        for (n = t; n < r; n++) {
                            this[n] = e
                        }
                    } else {
                        var i = G(e.toString());
                        var o = i.length;
                        for (n = t; n < r; n++) {
                            this[n] = i[n % o]
                        }
                    }
                    return this
                };
                var H = /[^+\/0-9A-Za-z-_]/g;

                function $(e) {
                    e = J(e).replace(H, "");
                    if (e.length < 2) return "";
                    while (e.length % 4 !== 0) {
                        e = e + "="
                    }
                    return e
                }

                function J(e) {
                    if (e.trim) return e.trim();
                    return e.replace(/^\s+|\s+$/g, "")
                }

                function X(e) {
                    if (e < 16) return "0" + e.toString(16);
                    return e.toString(16)
                }

                function G(e, t) {
                    t = t || Infinity;
                    var r;
                    var n = e.length;
                    var i = null;
                    var o = [];
                    for (var a = 0; a < n; a++) {
                        r = e.charCodeAt(a);
                        if (r > 55295 && r < 57344) {
                            if (!i) {
                                if (r > 56319) {
                                    if ((t -= 3) > -1) o.push(239, 191, 189);
                                    continue
                                } else if (a + 1 === n) {
                                    if ((t -= 3) > -1) o.push(239, 191, 189);
                                    continue
                                }
                                i = r;
                                continue
                            }
                            if (r < 56320) {
                                if ((t -= 3) > -1) o.push(239, 191, 189);
                                i = r;
                                continue
                            }
                            r = (i - 55296 << 10 | r - 56320) + 65536
                        } else if (i) {
                            if ((t -= 3) > -1) o.push(239, 191, 189)
                        }
                        i = null;
                        if (r < 128) {
                            if ((t -= 1) < 0) break;
                            o.push(r)
                        } else if (r < 2048) {
                            if ((t -= 2) < 0) break;
                            o.push(r >> 6 | 192, r & 63 | 128)
                        } else if (r < 65536) {
                            if ((t -= 3) < 0) break;
                            o.push(r >> 12 | 224, r >> 6 & 63 | 128, r & 63 | 128)
                        } else if (r < 1114112) {
                            if ((t -= 4) < 0) break;
                            o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, r & 63 | 128)
                        } else {
                            throw new Error("Invalid code point")
                        }
                    }
                    return o
                }

                function Z(e) {
                    var t = [];
                    for (var r = 0; r < e.length; r++) {
                        t.push(e.charCodeAt(r) & 255)
                    }
                    return t
                }

                function K(e, t) {
                    var r, n, i;
                    var o = [];
                    for (var a = 0; a < e.length; a++) {
                        if ((t -= 2) < 0) break;
                        r = e.charCodeAt(a);
                        n = r >> 8;
                        i = r % 256;
                        o.push(i);
                        o.push(n)
                    }
                    return o
                }

                function Q(e) {
                    return n.toByteArray($(e))
                }

                function V(e, t, r, n) {
                    for (var i = 0; i < n; i++) {
                        if (i + r >= t.length || i >= e.length) break;
                        t[i + r] = e[i]
                    }
                    return i
                }
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {
            "base64-js": 3,
            ieee754: 4,
            isarray: 5
        }],
        3: [function(e, t, r) {
            (function(e) {
                "use strict";
                var t;
                var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                var n = [];
                for (t = 0; t < r.length; t++) {
                    n[t] = r[t]
                }
                var i = [];
                for (t = 0; t < r.length; ++t) {
                    i[r.charCodeAt(t)] = t
                }
                i["-".charCodeAt(0)] = 62;
                i["_".charCodeAt(0)] = 63;
                var o = typeof Uint8Array !== "undefined" ? Uint8Array : Array;

                function a(e) {
                    var t = i[e.charCodeAt(0)];
                    return t !== undefined ? t : -1
                }

                function s(e) {
                    var t, r, n, i, s, f;
                    if (e.length % 4 > 0) {
                        throw new Error("Invalid string. Length must be a multiple of 4")
                    }
                    var u = e.length;
                    s = e.charAt(u - 2) === "=" ? 2 : e.charAt(u - 1) === "=" ? 1 : 0;
                    f = new o(e.length * 3 / 4 - s);
                    n = s > 0 ? e.length - 4 : e.length;
                    var c = 0;

                    function l(e) {
                        f[c++] = e
                    }
                    for (t = 0, r = 0; t < n; t += 4, r += 3) {
                        i = a(e.charAt(t)) << 18 | a(e.charAt(t + 1)) << 12 | a(e.charAt(t + 2)) << 6 | a(e.charAt(t + 3));
                        l((i & 16711680) >> 16);
                        l((i & 65280) >> 8);
                        l(i & 255)
                    }
                    if (s === 2) {
                        i = a(e.charAt(t)) << 2 | a(e.charAt(t + 1)) >> 4;
                        l(i & 255)
                    } else if (s === 1) {
                        i = a(e.charAt(t)) << 10 | a(e.charAt(t + 1)) << 4 | a(e.charAt(t + 2)) >> 2;
                        l(i >> 8 & 255);
                        l(i & 255)
                    }
                    return f
                }

                function f(e) {
                    return n[e]
                }

                function u(e) {
                    return f(e >> 18 & 63) + f(e >> 12 & 63) + f(e >> 6 & 63) + f(e & 63)
                }

                function c(e, t, r) {
                    var n;
                    var i = [];
                    for (var o = t; o < r; o += 3) {
                        n = (e[o] << 16) + (e[o + 1] << 8) + e[o + 2];
                        i.push(u(n))
                    }
                    return i.join("")
                }

                function l(e) {
                    var t;
                    var r = e.length % 3;
                    var n = "";
                    var i = [];
                    var o, a;
                    var s = 16383;
                    for (t = 0, a = e.length - r; t < a; t += s) {
                        i.push(c(e, t, t + s > a ? a : t + s))
                    }
                    switch (r) {
                        case 1:
                            o = e[e.length - 1];
                            n += f(o >> 2);
                            n += f(o << 4 & 63);
                            n += "==";
                            break;
                        case 2:
                            o = (e[e.length - 2] << 8) + e[e.length - 1];
                            n += f(o >> 10);
                            n += f(o >> 4 & 63);
                            n += f(o << 2 & 63);
                            n += "=";
                            break;
                        default:
                            break
                    }
                    i.push(n);
                    return i.join("")
                }
                e.toByteArray = s;
                e.fromByteArray = l
            })(typeof r === "undefined" ? this.base64js = {} : r)
        }, {}],
        4: [function(e, t, r) {
            r.read = function(e, t, r, n, i) {
                var o, a;
                var s = i * 8 - n - 1;
                var f = (1 << s) - 1;
                var u = f >> 1;
                var c = -7;
                var l = r ? i - 1 : 0;
                var h = r ? -1 : 1;
                var d = e[t + l];
                l += h;
                o = d & (1 << -c) - 1;
                d >>= -c;
                c += s;
                for (; c > 0; o = o * 256 + e[t + l], l += h, c -= 8) {}
                a = o & (1 << -c) - 1;
                o >>= -c;
                c += n;
                for (; c > 0; a = a * 256 + e[t + l], l += h, c -= 8) {}
                if (o === 0) {
                    o = 1 - u
                } else if (o === f) {
                    return a ? NaN : (d ? -1 : 1) * Infinity
                } else {
                    a = a + Math.pow(2, n);
                    o = o - u
                }
                return (d ? -1 : 1) * a * Math.pow(2, o - n)
            };
            r.write = function(e, t, r, n, i, o) {
                var a, s, f;
                var u = o * 8 - i - 1;
                var c = (1 << u) - 1;
                var l = c >> 1;
                var h = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
                var d = n ? 0 : o - 1;
                var p = n ? 1 : -1;
                var g = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
                t = Math.abs(t);
                if (isNaN(t) || t === Infinity) {
                    s = isNaN(t) ? 1 : 0;
                    a = c
                } else {
                    a = Math.floor(Math.log(t) / Math.LN2);
                    if (t * (f = Math.pow(2, -a)) < 1) {
                        a--;
                        f *= 2
                    }
                    if (a + l >= 1) {
                        t += h / f
                    } else {
                        t += h * Math.pow(2, 1 - l)
                    }
                    if (t * f >= 2) {
                        a++;
                        f /= 2
                    }
                    if (a + l >= c) {
                        s = 0;
                        a = c
                    } else if (a + l >= 1) {
                        s = (t * f - 1) * Math.pow(2, i);
                        a = a + l
                    } else {
                        s = t * Math.pow(2, l - 1) * Math.pow(2, i);
                        a = 0
                    }
                }
                for (; i >= 8; e[r + d] = s & 255, d += p, s /= 256, i -= 8) {}
                a = a << i | s;
                u += i;
                for (; u > 0; e[r + d] = a & 255, d += p, a /= 256, u -= 8) {}
                e[r + d - p] |= g * 128
            }
        }, {}],
        5: [function(e, t, r) {
            var n = {}.toString;
            t.exports = Array.isArray || function(e) {
                return n.call(e) == "[object Array]"
            }
        }, {}],
        6: [function(e, t, r) {
            function n() {
                this._events = this._events || {};
                this._maxListeners = this._maxListeners || undefined
            }
            t.exports = n;
            n.EventEmitter = n;
            n.prototype._events = undefined;
            n.prototype._maxListeners = undefined;
            n.defaultMaxListeners = 10;
            n.prototype.setMaxListeners = function(e) {
                if (!o(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
                this._maxListeners = e;
                return this
            };
            n.prototype.emit = function(e) {
                var t, r, n, o, f, u;
                if (!this._events) this._events = {};
                if (e === "error") {
                    if (!this._events.error || a(this._events.error) && !this._events.error.length) {
                        t = arguments[1];
                        if (t instanceof Error) {
                            throw t
                        }
                        throw TypeError('Uncaught, unspecified "error" event.')
                    }
                }
                r = this._events[e];
                if (s(r)) return false;
                if (i(r)) {
                    switch (arguments.length) {
                        case 1:
                            r.call(this);
                            break;
                        case 2:
                            r.call(this, arguments[1]);
                            break;
                        case 3:
                            r.call(this, arguments[1], arguments[2]);
                            break;
                        default:
                            o = Array.prototype.slice.call(arguments, 1);
                            r.apply(this, o)
                    }
                } else if (a(r)) {
                    o = Array.prototype.slice.call(arguments, 1);
                    u = r.slice();
                    n = u.length;
                    for (f = 0; f < n; f++) u[f].apply(this, o)
                }
                return true
            };
            n.prototype.addListener = function(e, t) {
                var r;
                if (!i(t)) throw TypeError("listener must be a function");
                if (!this._events) this._events = {};
                if (this._events.newListener) this.emit("newListener", e, i(t.listener) ? t.listener : t);
                if (!this._events[e]) this._events[e] = t;
                else if (a(this._events[e])) this._events[e].push(t);
                else this._events[e] = [this._events[e], t];
                if (a(this._events[e]) && !this._events[e].warned) {
                    if (!s(this._maxListeners)) {
                        r = this._maxListeners
                    } else {
                        r = n.defaultMaxListeners
                    }
                    if (r && r > 0 && this._events[e].length > r) {
                        this._events[e].warned = true;
                        console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[e].length);
                        if (typeof console.trace === "function") {
                            console.trace()
                        }
                    }
                }
                return this
            };
            n.prototype.on = n.prototype.addListener;
            n.prototype.once = function(e, t) {
                if (!i(t)) throw TypeError("listener must be a function");
                var r = false;

                function n() {
                    this.removeListener(e, n);
                    if (!r) {
                        r = true;
                        t.apply(this, arguments)
                    }
                }
                n.listener = t;
                this.on(e, n);
                return this
            };
            n.prototype.removeListener = function(e, t) {
                var r, n, o, s;
                if (!i(t)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[e]) return this;
                r = this._events[e];
                o = r.length;
                n = -1;
                if (r === t || i(r.listener) && r.listener === t) {
                    delete this._events[e];
                    if (this._events.removeListener) this.emit("removeListener", e, t)
                } else if (a(r)) {
                    for (s = o; s-- > 0;) {
                        if (r[s] === t || r[s].listener && r[s].listener === t) {
                            n = s;
                            break
                        }
                    }
                    if (n < 0) return this;
                    if (r.length === 1) {
                        r.length = 0;
                        delete this._events[e]
                    } else {
                        r.splice(n, 1)
                    }
                    if (this._events.removeListener) this.emit("removeListener", e, t)
                }
                return this
            };
            n.prototype.removeAllListeners = function(e) {
                var t, r;
                if (!this._events) return this;
                if (!this._events.removeListener) {
                    if (arguments.length === 0) this._events = {};
                    else if (this._events[e]) delete this._events[e];
                    return this
                }
                if (arguments.length === 0) {
                    for (t in this._events) {
                        if (t === "removeListener") continue;
                        this.removeAllListeners(t)
                    }
                    this.removeAllListeners("removeListener");
                    this._events = {};
                    return this
                }
                r = this._events[e];
                if (i(r)) {
                    this.removeListener(e, r)
                } else if (r) {
                    while (r.length) this.removeListener(e, r[r.length - 1])
                }
                delete this._events[e];
                return this
            };
            n.prototype.listeners = function(e) {
                var t;
                if (!this._events || !this._events[e]) t = [];
                else if (i(this._events[e])) t = [this._events[e]];
                else t = this._events[e].slice();
                return t
            };
            n.prototype.listenerCount = function(e) {
                if (this._events) {
                    var t = this._events[e];
                    if (i(t)) return 1;
                    else if (t) return t.length
                }
                return 0
            };
            n.listenerCount = function(e, t) {
                return e.listenerCount(t)
            };

            function i(e) {
                return typeof e === "function"
            }

            function o(e) {
                return typeof e === "number"
            }

            function a(e) {
                return typeof e === "object" && e !== null
            }

            function s(e) {
                return e === void 0
            }
        }, {}],
        7: [function(e, t, r) {
            t.exports = function(e) {
                return !!(e != null && (e._isBuffer || e.constructor && typeof e.constructor.isBuffer === "function" && e.constructor.isBuffer(e)))
            }
        }, {}],
        8: [function(e, t, r) {
            var n = t.exports = {};
            var i = [];
            var o = false;
            var a;
            var s = -1;

            function f() {
                o = false;
                if (a.length) {
                    i = a.concat(i)
                } else {
                    s = -1
                }
                if (i.length) {
                    u()
                }
            }

            function u() {
                if (o) {
                    return
                }
                var e = setTimeout(f);
                o = true;
                var t = i.length;
                while (t) {
                    a = i;
                    i = [];
                    while (++s < t) {
                        if (a) {
                            a[s].run()
                        }
                    }
                    s = -1;
                    t = i.length
                }
                a = null;
                o = false;
                clearTimeout(e)
            }
            n.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                    for (var r = 1; r < arguments.length; r++) {
                        t[r - 1] = arguments[r]
                    }
                }
                i.push(new c(e, t));
                if (i.length === 1 && !o) {
                    setTimeout(u, 0)
                }
            };

            function c(e, t) {
                this.fun = e;
                this.array = t
            }
            c.prototype.run = function() {
                this.fun.apply(null, this.array)
            };
            n.title = "browser";
            n.browser = true;
            n.env = {};
            n.argv = [];
            n.version = "";
            n.versions = {};

            function l() {}
            n.on = l;
            n.addListener = l;
            n.once = l;
            n.off = l;
            n.removeListener = l;
            n.removeAllListeners = l;
            n.emit = l;
            n.binding = function(e) {
                throw new Error("process.binding is not supported")
            };
            n.cwd = function() {
                return "/"
            };
            n.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            };
            n.umask = function() {
                return 0
            }
        }, {}],
        9: [function(e, t, r) {
            r = t.exports = e("./debug");
            r.log = o;
            r.formatArgs = i;
            r.save = a;
            r.load = s;
            r.useColors = n;
            r.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : f();
            r.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"];

            function n() {
                return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
            }
            r.formatters.j = function(e) {
                return JSON.stringify(e)
            };

            function i() {
                var e = arguments;
                var t = this.useColors;
                e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + r.humanize(this.diff);
                if (!t) return e;
                var n = "color: " + this.color;
                e = [e[0], n, "color: inherit"].concat(Array.prototype.slice.call(e, 1));
                var i = 0;
                var o = 0;
                e[0].replace(/%[a-z%]/g, function(e) {
                    if ("%%" === e) return;
                    i++;
                    if ("%c" === e) {
                        o = i
                    }
                });
                e.splice(o, 0, n);
                return e
            }

            function o() {
                return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function a(e) {
                try {
                    if (null == e) {
                        r.storage.removeItem("debug")
                    } else {
                        r.storage.debug = e
                    }
                } catch (t) {}
            }

            function s() {
                var e;
                try {
                    e = r.storage.debug
                } catch (t) {}
                return e
            }
            r.enable(s());

            function f() {
                try {
                    return window.localStorage
                } catch (e) {}
            }
        }, {
            "./debug": 10
        }],
        10: [function(e, t, r) {
            r = t.exports = a;
            r.coerce = c;
            r.disable = f;
            r.enable = s;
            r.enabled = u;
            r.humanize = e("ms");
            r.names = [];
            r.skips = [];
            r.formatters = {};
            var n = 0;
            var i;

            function o() {
                return r.colors[n++ % r.colors.length]
            }

            function a(e) {
                function t() {}
                t.enabled = false;

                function n() {
                    var e = n;
                    var t = +new Date;
                    var a = t - (i || t);
                    e.diff = a;
                    e.prev = i;
                    e.curr = t;
                    i = t;
                    if (null == e.useColors) e.useColors = r.useColors();
                    if (null == e.color && e.useColors) e.color = o();
                    var s = Array.prototype.slice.call(arguments);
                    s[0] = r.coerce(s[0]);
                    if ("string" !== typeof s[0]) {
                        s = ["%o"].concat(s)
                    }
                    var f = 0;
                    s[0] = s[0].replace(/%([a-z%])/g, function(t, n) {
                        if (t === "%%") return t;
                        f++;
                        var i = r.formatters[n];
                        if ("function" === typeof i) {
                            var o = s[f];
                            t = i.call(e, o);
                            s.splice(f, 1);
                            f--
                        }
                        return t
                    });
                    if ("function" === typeof r.formatArgs) {
                        s = r.formatArgs.apply(e, s)
                    }
                    var u = n.log || r.log || console.log.bind(console);
                    u.apply(e, s)
                }
                n.enabled = true;
                var a = r.enabled(e) ? n : t;
                a.namespace = e;
                return a
            }

            function s(e) {
                r.save(e);
                var t = (e || "").split(/[\s,]+/);
                var n = t.length;
                for (var i = 0; i < n; i++) {
                    if (!t[i]) continue;
                    e = t[i].replace(/\*/g, ".*?");
                    if (e[0] === "-") {
                        r.skips.push(new RegExp("^" + e.substr(1) + "$"))
                    } else {
                        r.names.push(new RegExp("^" + e + "$"))
                    }
                }
            }

            function f() {
                r.enable("")
            }

            function u(e) {
                var t, n;
                for (t = 0, n = r.skips.length; t < n; t++) {
                    if (r.skips[t].test(e)) {
                        return false
                    }
                }
                for (t = 0, n = r.names.length; t < n; t++) {
                    if (r.names[t].test(e)) {
                        return true
                    }
                }
                return false
            }

            function c(e) {
                if (e instanceof Error) return e.stack || e.message;
                return e
            }
        }, {
            ms: 11
        }],
        11: [function(e, t, r) {
            var n = 1e3;
            var i = n * 60;
            var o = i * 60;
            var a = o * 24;
            var s = a * 365.25;
            t.exports = function(e, t) {
                t = t || {};
                if ("string" == typeof e) return f(e);
                return t.long ? c(e) : u(e)
            };

            function f(e) {
                e = "" + e;
                if (e.length > 1e4) return;
                var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                if (!t) return;
                var r = parseFloat(t[1]);
                var f = (t[2] || "ms").toLowerCase();
                switch (f) {
                    case "years":
                    case "year":
                    case "yrs":
                    case "yr":
                    case "y":
                        return r * s;
                    case "days":
                    case "day":
                    case "d":
                        return r * a;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                        return r * o;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                        return r * i;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                        return r * n;
                    case "milliseconds":
                    case "millisecond":
                    case "msecs":
                    case "msec":
                    case "ms":
                        return r
                }
            }

            function u(e) {
                if (e >= a) return Math.round(e / a) + "d";
                if (e >= o) return Math.round(e / o) + "h";
                if (e >= i) return Math.round(e / i) + "m";
                if (e >= n) return Math.round(e / n) + "s";
                return e + "ms"
            }

            function c(e) {
                return l(e, a, "day") || l(e, o, "hour") || l(e, i, "minute") || l(e, n, "second") || e + " ms"
            }

            function l(e, t, r) {
                if (e < t) return;
                if (e < t * 1.5) return Math.floor(e / t) + " " + r;
                return Math.ceil(e / t) + " " + r + "s"
            }
        }, {}],
        12: [function(e, t, r) {
            t.exports = function n() {
                if (typeof window === "undefined") return null;
                var e = {
                    RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
                    RTCSessionDescription: window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription,
                    RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
                };
                if (!e.RTCPeerConnection) return null;
                return e
            }
        }, {}],
        13: [function(e, t, r) {
            var n = t.exports = function(e, t) {
                if (!t) t = 16;
                if (e === undefined) e = 128;
                if (e <= 0) return "0";
                var r = Math.log(Math.pow(2, e)) / Math.log(t);
                for (var i = 2; r === Infinity; i *= 2) {
                    r = Math.log(Math.pow(2, e / i)) / Math.log(t) * i
                }
                var o = r - Math.floor(r);
                var a = "";
                for (var i = 0; i < Math.floor(r); i++) {
                    var s = Math.floor(Math.random() * t).toString(t);
                    a = s + a
                }
                if (o) {
                    var f = Math.pow(t, o);
                    var s = Math.floor(Math.random() * f).toString(t);
                    a = s + a
                }
                var u = parseInt(a, t);
                if (u !== Infinity && u >= Math.pow(2, e)) {
                    return n(e, t)
                } else return a
            };
            n.rack = function(e, t, r) {
                var i = function(i) {
                    var a = 0;
                    do {
                        if (a++ > 10) {
                            if (r) e += r;
                            else throw new Error("too many ID collisions, use more bits")
                        }
                        var s = n(e, t)
                    } while (Object.hasOwnProperty.call(o, s));
                    o[s] = i;
                    return s
                };
                var o = i.hats = {};
                i.get = function(e) {
                    return i.hats[e]
                };
                i.set = function(e, t) {
                    i.hats[e] = t;
                    return i
                };
                i.bits = e || 128;
                i.base = t || 16;
                return i
            }
        }, {}],
        14: [function(e, t, r) {
            if (typeof Object.create === "function") {
                t.exports = function n(e, t) {
                    e.super_ = t;
                    e.prototype = Object.create(t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    })
                }
            } else {
                t.exports = function i(e, t) {
                    e.super_ = t;
                    var r = function() {};
                    r.prototype = t.prototype;
                    e.prototype = new r;
                    e.prototype.constructor = e
                }
            }
        }, {}],
        15: [function(e, t, r) {
            t.exports = n;

            function n(e, t) {
                if (e && t) return n(e)(t);
                if (typeof e !== "function") throw new TypeError("need wrapper function");
                Object.keys(e).forEach(function(t) {
                    r[t] = e[t]
                });
                return r;

                function r() {
                    var t = new Array(arguments.length);
                    for (var r = 0; r < t.length; r++) {
                        t[r] = arguments[r]
                    }
                    var n = e.apply(this, t);
                    var i = t[t.length - 1];
                    if (typeof n === "function" && n !== i) {
                        Object.keys(i).forEach(function(e) {
                            n[e] = i[e]
                        })
                    }
                    return n
                }
            }
        }, {}],
        16: [function(e, t, r) {
            var n = e("wrappy");
            t.exports = n(i);
            i.proto = i(function() {
                Object.defineProperty(Function.prototype, "once", {
                    value: function() {
                        return i(this)
                    },
                    configurable: true
                })
            });

            function i(e) {
                var t = function() {
                    if (t.called) return t.value;
                    t.called = true;
                    return t.value = e.apply(this, arguments)
                };
                t.called = false;
                return t
            }
        }, {
            wrappy: 15
        }],
        17: [function(e, t, r) {
            "use strict";
            var n = Object.keys || function(e) {
                var t = [];
                for (var r in e) t.push(r);
                return t
            };
            t.exports = l;
            var i = e("process-nextick-args");
            var o = e("core-util-is");
            o.inherits = e("inherits");
            var a = e("./_stream_readable");
            var s = e("./_stream_writable");
            o.inherits(l, a);
            var f = n(s.prototype);
            for (var u = 0; u < f.length; u++) {
                var c = f[u];
                if (!l.prototype[c]) l.prototype[c] = s.prototype[c]
            }

            function l(e) {
                if (!(this instanceof l)) return new l(e);
                a.call(this, e);
                s.call(this, e);
                if (e && e.readable === false) this.readable = false;
                if (e && e.writable === false) this.writable = false;
                this.allowHalfOpen = true;
                if (e && e.allowHalfOpen === false) this.allowHalfOpen = false;
                this.once("end", h)
            }

            function h() {
                if (this.allowHalfOpen || this._writableState.ended) return;
                i(d, this)
            }

            function d(e) {
                e.end()
            }

            function p(e, t) {
                for (var r = 0, n = e.length; r < n; r++) {
                    t(e[r], r)
                }
            }
        }, {
            "./_stream_readable": 19,
            "./_stream_writable": 21,
            "core-util-is": 22,
            inherits: 14,
            "process-nextick-args": 24
        }],
        18: [function(e, t, r) {
            "use strict";
            t.exports = o;
            var n = e("./_stream_transform");
            var i = e("core-util-is");
            i.inherits = e("inherits");
            i.inherits(o, n);

            function o(e) {
                if (!(this instanceof o)) return new o(e);
                n.call(this, e)
            }
            o.prototype._transform = function(e, t, r) {
                r(null, e)
            }
        }, {
            "./_stream_transform": 20,
            "core-util-is": 22,
            inherits: 14
        }],
        19: [function(e, t, r) {
            (function(r) {
                "use strict";
                t.exports = g;
                var n = e("process-nextick-args");
                var i = e("isarray");
                var o = e("buffer").Buffer;
                g.ReadableState = p;
                var a = e("events");
                var s = function(e, t) {
                    return e.listeners(t).length
                };
                var f;
                (function() {
                    try {
                        f = e("st" + "ream")
                    } catch (t) {} finally {
                        if (!f) f = e("events").EventEmitter
                    }
                })();
                var o = e("buffer").Buffer;
                var u = e("core-util-is");
                u.inherits = e("inherits");
                var c = e("util");
                var l;
                if (c && c.debuglog) {
                    l = c.debuglog("stream")
                } else {
                    l = function() {}
                }
                var h;
                u.inherits(g, f);
                var d;

                function p(t, r) {
                    d = d || e("./_stream_duplex");
                    t = t || {};
                    this.objectMode = !!t.objectMode;
                    if (r instanceof d) this.objectMode = this.objectMode || !!t.readableObjectMode;
                    var n = t.highWaterMark;
                    var i = this.objectMode ? 16 : 16 * 1024;
                    this.highWaterMark = n || n === 0 ? n : i;
                    this.highWaterMark = ~~this.highWaterMark;
                    this.buffer = [];
                    this.length = 0;
                    this.pipes = null;
                    this.pipesCount = 0;
                    this.flowing = null;
                    this.ended = false;
                    this.endEmitted = false;
                    this.reading = false;
                    this.sync = true;
                    this.needReadable = false;
                    this.emittedReadable = false;
                    this.readableListening = false;
                    this.defaultEncoding = t.defaultEncoding || "utf8";
                    this.ranOut = false;
                    this.awaitDrain = 0;
                    this.readingMore = false;
                    this.decoder = null;
                    this.encoding = null;
                    if (t.encoding) {
                        if (!h) h = e("string_decoder/").StringDecoder;
                        this.decoder = new h(t.encoding);
                        this.encoding = t.encoding
                    }
                }
                var d;

                function g(t) {
                    d = d || e("./_stream_duplex");
                    if (!(this instanceof g)) return new g(t);
                    this._readableState = new p(t, this);
                    this.readable = true;
                    if (t && typeof t.read === "function") this._read = t.read;
                    f.call(this)
                }
                g.prototype.push = function(e, t) {
                    var r = this._readableState;
                    if (!r.objectMode && typeof e === "string") {
                        t = t || r.defaultEncoding;
                        if (t !== r.encoding) {
                            e = new o(e, t);
                            t = ""
                        }
                    }
                    return v(this, r, e, t, false)
                };
                g.prototype.unshift = function(e) {
                    var t = this._readableState;
                    return v(this, t, e, "", true)
                };
                g.prototype.isPaused = function() {
                    return this._readableState.flowing === false
                };

                function v(e, t, r, n, i) {
                    var o = m(t, r);
                    if (o) {
                        e.emit("error", o)
                    } else if (r === null) {
                        t.reading = false;
                        R(e, t)
                    } else if (t.objectMode || r && r.length > 0) {
                        if (t.ended && !i) {
                            var a = new Error("stream.push() after EOF");
                            e.emit("error", a)
                        } else if (t.endEmitted && i) {
                            var a = new Error("stream.unshift() after end event");
                            e.emit("error", a)
                        } else {
                            if (t.decoder && !i && !n) r = t.decoder.write(r);
                            if (!i) t.reading = false;
                            if (t.flowing && t.length === 0 && !t.sync) {
                                e.emit("data", r);
                                e.read(0)
                            } else {
                                t.length += t.objectMode ? 1 : r.length;
                                if (i) t.buffer.unshift(r);
                                else t.buffer.push(r);
                                if (t.needReadable) E(e)
                            }
                            A(e, t)
                        }
                    } else if (!i) {
                        t.reading = false
                    }
                    return y(t)
                }

                function y(e) {
                    return !e.ended && (e.needReadable || e.length < e.highWaterMark || e.length === 0)
                }
                g.prototype.setEncoding = function(t) {
                    if (!h) h = e("string_decoder/").StringDecoder;
                    this._readableState.decoder = new h(t);
                    this._readableState.encoding = t;
                    return this
                };
                var _ = 8388608;

                function b(e) {
                    if (e >= _) {
                        e = _
                    } else {
                        e--;
                        e |= e >>> 1;
                        e |= e >>> 2;
                        e |= e >>> 4;
                        e |= e >>> 8;
                        e |= e >>> 16;
                        e++
                    }
                    return e
                }

                function w(e, t) {
                    if (t.length === 0 && t.ended) return 0;
                    if (t.objectMode) return e === 0 ? 0 : 1;
                    if (e === null || isNaN(e)) {
                        if (t.flowing && t.buffer.length) return t.buffer[0].length;
                        else return t.length
                    }
                    if (e <= 0) return 0;
                    if (e > t.highWaterMark) t.highWaterMark = b(e);
                    if (e > t.length) {
                        if (!t.ended) {
                            t.needReadable = true;
                            return 0
                        } else {
                            return t.length
                        }
                    }
                    return e
                }
                g.prototype.read = function(e) {
                    l("read", e);
                    var t = this._readableState;
                    var r = e;
                    if (typeof e !== "number" || e > 0) t.emittedReadable = false;
                    if (e === 0 && t.needReadable && (t.length >= t.highWaterMark || t.ended)) {
                        l("read: emitReadable", t.length, t.ended);
                        if (t.length === 0 && t.ended) B(this);
                        else E(this);
                        return null
                    }
                    e = w(e, t);
                    if (e === 0 && t.ended) {
                        if (t.length === 0) B(this);
                        return null
                    }
                    var n = t.needReadable;
                    l("need readable", n);
                    if (t.length === 0 || t.length - e < t.highWaterMark) {
                        n = true;
                        l("length less than watermark", n)
                    }
                    if (t.ended || t.reading) {
                        n = false;
                        l("reading or ended", n)
                    }
                    if (n) {
                        l("do read");
                        t.reading = true;
                        t.sync = true;
                        if (t.length === 0) t.needReadable = true;
                        this._read(t.highWaterMark);
                        t.sync = false
                    }
                    if (n && !t.reading) e = w(r, t);
                    var i;
                    if (e > 0) i = L(e, t);
                    else i = null;
                    if (i === null) {
                        t.needReadable = true;
                        e = 0
                    }
                    t.length -= e;
                    if (t.length === 0 && !t.ended) t.needReadable = true;
                    if (r !== e && t.ended && t.length === 0) B(this);
                    if (i !== null) this.emit("data", i);
                    return i
                };

                function m(e, t) {
                    var r = null;
                    if (!o.isBuffer(t) && typeof t !== "string" && t !== null && t !== undefined && !e.objectMode) {
                        r = new TypeError("Invalid non-string/buffer chunk")
                    }
                    return r
                }

                function R(e, t) {
                    if (t.ended) return;
                    if (t.decoder) {
                        var r = t.decoder.end();
                        if (r && r.length) {
                            t.buffer.push(r);
                            t.length += t.objectMode ? 1 : r.length
                        }
                    }
                    t.ended = true;
                    E(e)
                }

                function E(e) {
                    var t = e._readableState;
                    t.needReadable = false;
                    if (!t.emittedReadable) {
                        l("emitReadable", t.flowing);
                        t.emittedReadable = true;
                        if (t.sync) n(S, e);
                        else S(e)
                    }
                }

                function S(e) {
                    l("emit readable");
                    e.emit("readable");
                    P(e)
                }

                function A(e, t) {
                    if (!t.readingMore) {
                        t.readingMore = true;
                        n(C, e, t)
                    }
                }

                function C(e, t) {
                    var r = t.length;
                    while (!t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark) {
                        l("maybeReadMore read 0");
                        e.read(0);
                        if (r === t.length) break;
                        else r = t.length
                    }
                    t.readingMore = false
                }
                g.prototype._read = function(e) {
                    this.emit("error", new Error("not implemented"))
                };
                g.prototype.pipe = function(e, t) {
                    var o = this;
                    var a = this._readableState;
                    switch (a.pipesCount) {
                        case 0:
                            a.pipes = e;
                            break;
                        case 1:
                            a.pipes = [a.pipes, e];
                            break;
                        default:
                            a.pipes.push(e);
                            break
                    }
                    a.pipesCount += 1;
                    l("pipe count=%d opts=%j", a.pipesCount, t);
                    var f = (!t || t.end !== false) && e !== r.stdout && e !== r.stderr;
                    var u = f ? h : g;
                    if (a.endEmitted) n(u);
                    else o.once("end", u);
                    e.on("unpipe", c);

                    function c(e) {
                        l("onunpipe");
                        if (e === o) {
                            g()
                        }
                    }

                    function h() {
                        l("onend");
                        e.end()
                    }
                    var d = T(o);
                    e.on("drain", d);
                    var p = false;

                    function g() {
                        l("cleanup");
                        e.removeListener("close", _);
                        e.removeListener("finish", b);
                        e.removeListener("drain", d);
                        e.removeListener("error", y);
                        e.removeListener("unpipe", c);
                        o.removeListener("end", h);
                        o.removeListener("end", g);
                        o.removeListener("data", v);
                        p = true;
                        if (a.awaitDrain && (!e._writableState || e._writableState.needDrain)) d()
                    }
                    o.on("data", v);

                    function v(t) {
                        l("ondata");
                        var r = e.write(t);
                        if (false === r) {
                            if (a.pipesCount === 1 && a.pipes[0] === e && o.listenerCount("data") === 1 && !p) {
                                l("false write response, pause", o._readableState.awaitDrain);
                                o._readableState.awaitDrain++
                            }
                            o.pause()
                        }
                    }

                    function y(t) {
                        l("onerror", t);
                        w();
                        e.removeListener("error", y);
                        if (s(e, "error") === 0) e.emit("error", t)
                    }
                    if (!e._events || !e._events.error) e.on("error", y);
                    else if (i(e._events.error)) e._events.error.unshift(y);
                    else e._events.error = [y, e._events.error];

                    function _() {
                        e.removeListener("finish", b);
                        w()
                    }
                    e.once("close", _);

                    function b() {
                        l("onfinish");
                        e.removeListener("close", _);
                        w()
                    }
                    e.once("finish", b);

                    function w() {
                        l("unpipe");
                        o.unpipe(e)
                    }
                    e.emit("pipe", o);
                    if (!a.flowing) {
                        l("pipe resume");
                        o.resume()
                    }
                    return e
                };

                function T(e) {
                    return function() {
                        var t = e._readableState;
                        l("pipeOnDrain", t.awaitDrain);
                        if (t.awaitDrain) t.awaitDrain--;
                        if (t.awaitDrain === 0 && s(e, "data")) {
                            t.flowing = true;
                            P(e)
                        }
                    }
                }
                g.prototype.unpipe = function(e) {
                    var t = this._readableState;
                    if (t.pipesCount === 0) return this;
                    if (t.pipesCount === 1) {
                        if (e && e !== t.pipes) return this;
                        if (!e) e = t.pipes;
                        t.pipes = null;
                        t.pipesCount = 0;
                        t.flowing = false;
                        if (e) e.emit("unpipe", this);
                        return this
                    }
                    if (!e) {
                        var r = t.pipes;
                        var n = t.pipesCount;
                        t.pipes = null;
                        t.pipesCount = 0;
                        t.flowing = false;
                        for (var i = 0; i < n; i++) r[i].emit("unpipe", this);
                        return this
                    }
                    var i = I(t.pipes, e);
                    if (i === -1) return this;
                    t.pipes.splice(i, 1);
                    t.pipesCount -= 1;
                    if (t.pipesCount === 1) t.pipes = t.pipes[0];
                    e.emit("unpipe", this);
                    return this
                };
                g.prototype.on = function(e, t) {
                    var r = f.prototype.on.call(this, e, t);
                    if (e === "data" && false !== this._readableState.flowing) {
                        this.resume()
                    }
                    if (e === "readable" && this.readable) {
                        var i = this._readableState;
                        if (!i.readableListening) {
                            i.readableListening = true;
                            i.emittedReadable = false;
                            i.needReadable = true;
                            if (!i.reading) {
                                n(k, this)
                            } else if (i.length) {
                                E(this, i)
                            }
                        }
                    }
                    return r
                };
                g.prototype.addListener = g.prototype.on;

                function k(e) {
                    l("readable nexttick read 0");
                    e.read(0)
                }
                g.prototype.resume = function() {
                    var e = this._readableState;
                    if (!e.flowing) {
                        l("resume");
                        e.flowing = true;
                        M(this, e)
                    }
                    return this
                };

                function M(e, t) {
                    if (!t.resumeScheduled) {
                        t.resumeScheduled = true;
                        n(x, e, t)
                    }
                }

                function x(e, t) {
                    if (!t.reading) {
                        l("resume read 0");
                        e.read(0)
                    }
                    t.resumeScheduled = false;
                    e.emit("resume");
                    P(e);
                    if (t.flowing && !t.reading) e.read(0)
                }
                g.prototype.pause = function() {
                    l("call pause flowing=%j", this._readableState.flowing);
                    if (false !== this._readableState.flowing) {
                        l("pause");
                        this._readableState.flowing = false;
                        this.emit("pause")
                    }
                    return this
                };

                function P(e) {
                    var t = e._readableState;
                    l("flow", t.flowing);
                    if (t.flowing) {
                        do {
                            var r = e.read()
                        } while (null !== r && t.flowing)
                    }
                }
                g.prototype.wrap = function(e) {
                    var t = this._readableState;
                    var r = false;
                    var n = this;
                    e.on("end", function() {
                        l("wrapped end");
                        if (t.decoder && !t.ended) {
                            var e = t.decoder.end();
                            if (e && e.length) n.push(e)
                        }
                        n.push(null)
                    });
                    e.on("data", function(i) {
                        l("wrapped data");
                        if (t.decoder) i = t.decoder.write(i);
                        if (t.objectMode && (i === null || i === undefined)) return;
                        else if (!t.objectMode && (!i || !i.length)) return;
                        var o = n.push(i);
                        if (!o) {
                            r = true;
                            e.pause()
                        }
                    });
                    for (var i in e) {
                        if (this[i] === undefined && typeof e[i] === "function") {
                            this[i] = function(t) {
                                return function() {
                                    return e[t].apply(e, arguments)
                                }
                            }(i)
                        }
                    }
                    var o = ["error", "close", "destroy", "pause", "resume"];
                    j(o, function(t) {
                        e.on(t, n.emit.bind(n, t))
                    });
                    n._read = function(t) {
                        l("wrapped _read", t);
                        if (r) {
                            r = false;
                            e.resume()
                        }
                    };
                    return n
                };
                g._fromList = L;

                function L(e, t) {
                    var r = t.buffer;
                    var n = t.length;
                    var i = !!t.decoder;
                    var a = !!t.objectMode;
                    var s;
                    if (r.length === 0) return null;
                    if (n === 0) s = null;
                    else if (a) s = r.shift();
                    else if (!e || e >= n) {
                        if (i) s = r.join("");
                        else if (r.length === 1) s = r[0];
                        else s = o.concat(r, n);
                        r.length = 0
                    } else {
                        if (e < r[0].length) {
                            var f = r[0];
                            s = f.slice(0, e);
                            r[0] = f.slice(e)
                        } else if (e === r[0].length) {
                            s = r.shift()
                        } else {
                            if (i) s = "";
                            else s = new o(e);
                            var u = 0;
                            for (var c = 0, l = r.length; c < l && u < e; c++) {
                                var f = r[0];
                                var h = Math.min(e - u, f.length);
                                if (i) s += f.slice(0, h);
                                else f.copy(s, u, 0, h);
                                if (h < f.length) r[0] = f.slice(h);
                                else r.shift();
                                u += h
                            }
                        }
                    }
                    return s
                }

                function B(e) {
                    var t = e._readableState;
                    if (t.length > 0) throw new Error("endReadable called on non-empty stream");
                    if (!t.endEmitted) {
                        t.ended = true;
                        n(D, t, e)
                    }
                }

                function D(e, t) {
                    if (!e.endEmitted && e.length === 0) {
                        e.endEmitted = true;
                        t.readable = false;
                        t.emit("end")
                    }
                }

                function j(e, t) {
                    for (var r = 0, n = e.length; r < n; r++) {
                        t(e[r], r)
                    }
                }

                function I(e, t) {
                    for (var r = 0, n = e.length; r < n; r++) {
                        if (e[r] === t) return r
                    }
                    return -1
                }
            }).call(this, e("_process"))
        }, {
            "./_stream_duplex": 17,
            _process: 8,
            buffer: 2,
            "core-util-is": 22,
            events: 6,
            inherits: 14,
            isarray: 23,
            "process-nextick-args": 24,
            "string_decoder/": 25,
            util: 1
        }],
        20: [function(e, t, r) {
            "use strict";
            t.exports = s;
            var n = e("./_stream_duplex");
            var i = e("core-util-is");
            i.inherits = e("inherits");
            i.inherits(s, n);

            function o(e) {
                this.afterTransform = function(t, r) {
                    return a(e, t, r)
                };
                this.needTransform = false;
                this.transforming = false;
                this.writecb = null;
                this.writechunk = null
            }

            function a(e, t, r) {
                var n = e._transformState;
                n.transforming = false;
                var i = n.writecb;
                if (!i) return e.emit("error", new Error("no writecb in Transform class"));
                n.writechunk = null;
                n.writecb = null;
                if (r !== null && r !== undefined) e.push(r);
                if (i) i(t);
                var o = e._readableState;
                o.reading = false;
                if (o.needReadable || o.length < o.highWaterMark) {
                    e._read(o.highWaterMark)
                }
            }

            function s(e) {
                if (!(this instanceof s)) return new s(e);
                n.call(this, e);
                this._transformState = new o(this);
                var t = this;
                this._readableState.needReadable = true;
                this._readableState.sync = false;
                if (e) {
                    if (typeof e.transform === "function") this._transform = e.transform;
                    if (typeof e.flush === "function") this._flush = e.flush
                }
                this.once("prefinish", function() {
                    if (typeof this._flush === "function") this._flush(function(e) {
                        f(t, e)
                    });
                    else f(t)
                })
            }
            s.prototype.push = function(e, t) {
                this._transformState.needTransform = false;
                return n.prototype.push.call(this, e, t)
            };
            s.prototype._transform = function(e, t, r) {
                throw new Error("not implemented")
            };
            s.prototype._write = function(e, t, r) {
                var n = this._transformState;
                n.writecb = r;
                n.writechunk = e;
                n.writeencoding = t;
                if (!n.transforming) {
                    var i = this._readableState;
                    if (n.needTransform || i.needReadable || i.length < i.highWaterMark) this._read(i.highWaterMark)
                }
            };
            s.prototype._read = function(e) {
                var t = this._transformState;
                if (t.writechunk !== null && t.writecb && !t.transforming) {
                    t.transforming = true;
                    this._transform(t.writechunk, t.writeencoding, t.afterTransform)
                } else {
                    t.needTransform = true
                }
            };

            function f(e, t) {
                if (t) return e.emit("error", t);
                var r = e._writableState;
                var n = e._transformState;
                if (r.length) throw new Error("calling transform done when ws.length != 0");
                if (n.transforming) throw new Error("calling transform done when still transforming");
                return e.push(null)
            }
        }, {
            "./_stream_duplex": 17,
            "core-util-is": 22,
            inherits: 14
        }],
        21: [function(e, t, r) {
            "use strict";
            t.exports = h;
            var n = e("process-nextick-args");
            var i = e("buffer").Buffer;
            h.WritableState = l;
            var o = e("core-util-is");
            o.inherits = e("inherits");
            var a = {
                deprecate: e("util-deprecate")
            };
            var s;
            (function() {
                try {
                    s = e("st" + "ream")
                } catch (t) {} finally {
                    if (!s) s = e("events").EventEmitter
                }
            })();
            var i = e("buffer").Buffer;
            o.inherits(h, s);

            function f() {}

            function u(e, t, r) {
                this.chunk = e;
                this.encoding = t;
                this.callback = r;
                this.next = null
            }
            var c;

            function l(t, r) {
                c = c || e("./_stream_duplex");
                t = t || {};
                this.objectMode = !!t.objectMode;
                if (r instanceof c) this.objectMode = this.objectMode || !!t.writableObjectMode;
                var n = t.highWaterMark;
                var i = this.objectMode ? 16 : 16 * 1024;
                this.highWaterMark = n || n === 0 ? n : i;
                this.highWaterMark = ~~this.highWaterMark;
                this.needDrain = false;
                this.ending = false;
                this.ended = false;
                this.finished = false;
                var o = t.decodeStrings === false;
                this.decodeStrings = !o;
                this.defaultEncoding = t.defaultEncoding || "utf8";
                this.length = 0;
                this.writing = false;
                this.corked = 0;
                this.sync = true;
                this.bufferProcessing = false;
                this.onwrite = function(e) {
                    w(r, e)
                };
                this.writecb = null;
                this.writelen = 0;
                this.bufferedRequest = null;
                this.lastBufferedRequest = null;
                this.pendingcb = 0;
                this.prefinished = false;
                this.errorEmitted = false
            }
            l.prototype.getBuffer = function k() {
                var e = this.bufferedRequest;
                var t = [];
                while (e) {
                    t.push(e);
                    e = e.next
                }
                return t
            };
            (function() {
                try {
                    Object.defineProperty(l.prototype, "buffer", {
                        get: a.deprecate(function() {
                            return this.getBuffer()
                        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer " + "instead.")
                    })
                } catch (e) {}
            })();
            var c;

            function h(t) {
                c = c || e("./_stream_duplex");
                if (!(this instanceof h) && !(this instanceof c)) return new h(t);
                this._writableState = new l(t, this);
                this.writable = true;
                if (t) {
                    if (typeof t.write === "function") this._write = t.write;
                    if (typeof t.writev === "function") this._writev = t.writev
                }
                s.call(this)
            }
            h.prototype.pipe = function() {
                this.emit("error", new Error("Cannot pipe. Not readable."))
            };

            function d(e, t) {
                var r = new Error("write after end");
                e.emit("error", r);
                n(t, r)
            }

            function p(e, t, r, o) {
                var a = true;
                if (!i.isBuffer(r) && typeof r !== "string" && r !== null && r !== undefined && !t.objectMode) {
                    var s = new TypeError("Invalid non-string/buffer chunk");
                    e.emit("error", s);
                    n(o, s);
                    a = false
                }
                return a
            }
            h.prototype.write = function(e, t, r) {
                var n = this._writableState;
                var o = false;
                if (typeof t === "function") {
                    r = t;
                    t = null
                }
                if (i.isBuffer(e)) t = "buffer";
                else if (!t) t = n.defaultEncoding;
                if (typeof r !== "function") r = f;
                if (n.ended) d(this, r);
                else if (p(this, n, e, r)) {
                    n.pendingcb++;
                    o = v(this, n, e, t, r)
                }
                return o
            };
            h.prototype.cork = function() {
                var e = this._writableState;
                e.corked++
            };
            h.prototype.uncork = function() {
                var e = this._writableState;
                if (e.corked) {
                    e.corked--;
                    if (!e.writing && !e.corked && !e.finished && !e.bufferProcessing && e.bufferedRequest) E(this, e)
                }
            };
            h.prototype.setDefaultEncoding = function M(e) {
                if (typeof e === "string") e = e.toLowerCase();
                if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + e);
                this._writableState.defaultEncoding = e
            };

            function g(e, t, r) {
                if (!e.objectMode && e.decodeStrings !== false && typeof t === "string") {
                    t = new i(t, r)
                }
                return t
            }

            function v(e, t, r, n, o) {
                r = g(t, r, n);
                if (i.isBuffer(r)) n = "buffer";
                var a = t.objectMode ? 1 : r.length;
                t.length += a;
                var s = t.length < t.highWaterMark;
                if (!s) t.needDrain = true;
                if (t.writing || t.corked) {
                    var f = t.lastBufferedRequest;
                    t.lastBufferedRequest = new u(r, n, o);
                    if (f) {
                        f.next = t.lastBufferedRequest
                    } else {
                        t.bufferedRequest = t.lastBufferedRequest
                    }
                } else {
                    y(e, t, false, a, r, n, o)
                }
                return s
            }

            function y(e, t, r, n, i, o, a) {
                t.writelen = n;
                t.writecb = a;
                t.writing = true;
                t.sync = true;
                if (r) e._writev(i, t.onwrite);
                else e._write(i, o, t.onwrite);
                t.sync = false
            }

            function _(e, t, r, i, o) {
                --t.pendingcb;
                if (r) n(o, i);
                else o(i);
                e._writableState.errorEmitted = true;
                e.emit("error", i)
            }

            function b(e) {
                e.writing = false;
                e.writecb = null;
                e.length -= e.writelen;
                e.writelen = 0
            }

            function w(e, t) {
                var r = e._writableState;
                var i = r.sync;
                var o = r.writecb;
                b(r);
                if (t) _(e, r, i, t, o);
                else {
                    var a = S(r);
                    if (!a && !r.corked && !r.bufferProcessing && r.bufferedRequest) {
                        E(e, r)
                    }
                    if (i) {
                        n(m, e, r, a, o)
                    } else {
                        m(e, r, a, o)
                    }
                }
            }

            function m(e, t, r, n) {
                if (!r) R(e, t);
                t.pendingcb--;
                n();
                C(e, t)
            }

            function R(e, t) {
                if (t.length === 0 && t.needDrain) {
                    t.needDrain = false;
                    e.emit("drain")
                }
            }

            function E(e, t) {
                t.bufferProcessing = true;
                var r = t.bufferedRequest;
                if (e._writev && r && r.next) {
                    var n = [];
                    var i = [];
                    while (r) {
                        i.push(r.callback);
                        n.push(r);
                        r = r.next
                    }
                    t.pendingcb++;
                    t.lastBufferedRequest = null;
                    y(e, t, true, t.length, n, "", function(e) {
                        for (var r = 0; r < i.length; r++) {
                            t.pendingcb--;
                            i[r](e)
                        }
                    })
                } else {
                    while (r) {
                        var o = r.chunk;
                        var a = r.encoding;
                        var s = r.callback;
                        var f = t.objectMode ? 1 : o.length;
                        y(e, t, false, f, o, a, s);
                        r = r.next;
                        if (t.writing) {
                            break
                        }
                    }
                    if (r === null) t.lastBufferedRequest = null
                }
                t.bufferedRequest = r;
                t.bufferProcessing = false
            }
            h.prototype._write = function(e, t, r) {
                r(new Error("not implemented"))
            };
            h.prototype._writev = null;
            h.prototype.end = function(e, t, r) {
                var n = this._writableState;
                if (typeof e === "function") {
                    r = e;
                    e = null;
                    t = null
                } else if (typeof t === "function") {
                    r = t;
                    t = null
                }
                if (e !== null && e !== undefined) this.write(e, t);
                if (n.corked) {
                    n.corked = 1;
                    this.uncork()
                }
                if (!n.ending && !n.finished) T(this, n, r)
            };

            function S(e) {
                return e.ending && e.length === 0 && e.bufferedRequest === null && !e.finished && !e.writing
            }

            function A(e, t) {
                if (!t.prefinished) {
                    t.prefinished = true;
                    e.emit("prefinish")
                }
            }

            function C(e, t) {
                var r = S(t);
                if (r) {
                    if (t.pendingcb === 0) {
                        A(e, t);
                        t.finished = true;
                        e.emit("finish")
                    } else {
                        A(e, t)
                    }
                }
                return r
            }

            function T(e, t, r) {
                t.ending = true;
                C(e, t);
                if (r) {
                    if (t.finished) n(r);
                    else e.once("finish", r)
                }
                t.ended = true
            }
        }, {
            "./_stream_duplex": 17,
            buffer: 2,
            "core-util-is": 22,
            events: 6,
            inherits: 14,
            "process-nextick-args": 24,
            "util-deprecate": 26
        }],
        22: [function(e, t, r) {
            (function(e) {
                function t(e) {
                    if (Array.isArray) {
                        return Array.isArray(e)
                    }
                    return v(e) === "[object Array]"
                }
                r.isArray = t;

                function n(e) {
                    return typeof e === "boolean"
                }
                r.isBoolean = n;

                function i(e) {
                    return e === null
                }
                r.isNull = i;

                function o(e) {
                    return e == null
                }
                r.isNullOrUndefined = o;

                function a(e) {
                    return typeof e === "number"
                }
                r.isNumber = a;

                function s(e) {
                    return typeof e === "string"
                }
                r.isString = s;

                function f(e) {
                    return typeof e === "symbol"
                }
                r.isSymbol = f;

                function u(e) {
                    return e === void 0
                }
                r.isUndefined = u;

                function c(e) {
                    return v(e) === "[object RegExp]"
                }
                r.isRegExp = c;

                function l(e) {
                    return typeof e === "object" && e !== null
                }
                r.isObject = l;

                function h(e) {
                    return v(e) === "[object Date]"
                }
                r.isDate = h;

                function d(e) {
                    return v(e) === "[object Error]" || e instanceof Error
                }
                r.isError = d;

                function p(e) {
                    return typeof e === "function"
                }
                r.isFunction = p;

                function g(e) {
                    return e === null || typeof e === "boolean" || typeof e === "number" || typeof e === "string" || typeof e === "symbol" || typeof e === "undefined"
                }
                r.isPrimitive = g;
                r.isBuffer = e.isBuffer;

                function v(e) {
                    return Object.prototype.toString.call(e)
                }
            }).call(this, {
                isBuffer: e("../../../../browserify/node_modules/insert-module-globals/node_modules/is-buffer/index.js")
            })
        }, {
            "../../../../browserify/node_modules/insert-module-globals/node_modules/is-buffer/index.js": 7
        }],
        23: [function(e, t, r) {
            t.exports = Array.isArray || function(e) {
                return Object.prototype.toString.call(e) == "[object Array]"
            }
        }, {}],
        24: [function(e, t, r) {
            (function(e) {
                "use strict";
                if (!e.version || e.version.indexOf("v0.") === 0 || e.version.indexOf("v1.") === 0 && e.version.indexOf("v1.8.") !== 0) {
                    t.exports = r
                } else {
                    t.exports = e.nextTick
                }

                function r(t) {
                    var r = new Array(arguments.length - 1);
                    var n = 0;
                    while (n < r.length) {
                        r[n++] = arguments[n]
                    }
                    e.nextTick(function i() {
                        t.apply(null, r)
                    })
                }
            }).call(this, e("_process"))
        }, {
            _process: 8
        }],
        25: [function(e, t, r) {
            var n = e("buffer").Buffer;
            var i = n.isEncoding || function(e) {
                switch (e && e.toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                    case "raw":
                        return true;
                    default:
                        return false
                }
            };

            function o(e) {
                if (e && !i(e)) {
                    throw new Error("Unknown encoding: " + e)
                }
            }
            var a = r.StringDecoder = function(e) {
                this.encoding = (e || "utf8").toLowerCase().replace(/[-_]/, "");
                o(e);
                switch (this.encoding) {
                    case "utf8":
                        this.surrogateSize = 3;
                        break;
                    case "ucs2":
                    case "utf16le":
                        this.surrogateSize = 2;
                        this.detectIncompleteChar = f;
                        break;
                    case "base64":
                        this.surrogateSize = 3;
                        this.detectIncompleteChar = u;
                        break;
                    default:
                        this.write = s;
                        return
                }
                this.charBuffer = new n(6);
                this.charReceived = 0;
                this.charLength = 0
            };
            a.prototype.write = function(e) {
                var t = "";
                while (this.charLength) {
                    var r = e.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : e.length;
                    e.copy(this.charBuffer, this.charReceived, 0, r);
                    this.charReceived += r;
                    if (this.charReceived < this.charLength) {
                        return ""
                    }
                    e = e.slice(r, e.length);
                    t = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
                    var n = t.charCodeAt(t.length - 1);
                    if (n >= 55296 && n <= 56319) {
                        this.charLength += this.surrogateSize;
                        t = "";
                        continue
                    }
                    this.charReceived = this.charLength = 0;
                    if (e.length === 0) {
                        return t
                    }
                    break
                }
                this.detectIncompleteChar(e);
                var i = e.length;
                if (this.charLength) {
                    e.copy(this.charBuffer, 0, e.length - this.charReceived, i);
                    i -= this.charReceived
                }
                t += e.toString(this.encoding, 0, i);
                var i = t.length - 1;
                var n = t.charCodeAt(i);
                if (n >= 55296 && n <= 56319) {
                    var o = this.surrogateSize;
                    this.charLength += o;
                    this.charReceived += o;
                    this.charBuffer.copy(this.charBuffer, o, 0, o);
                    e.copy(this.charBuffer, 0, 0, o);
                    return t.substring(0, i)
                }
                return t
            };
            a.prototype.detectIncompleteChar = function(e) {
                var t = e.length >= 3 ? 3 : e.length;
                for (; t > 0; t--) {
                    var r = e[e.length - t];
                    if (t == 1 && r >> 5 == 6) {
                        this.charLength = 2;
                        break
                    }
                    if (t <= 2 && r >> 4 == 14) {
                        this.charLength = 3;
                        break
                    }
                    if (t <= 3 && r >> 3 == 30) {
                        this.charLength = 4;
                        break
                    }
                }
                this.charReceived = t
            };
            a.prototype.end = function(e) {
                var t = "";
                if (e && e.length) t = this.write(e);
                if (this.charReceived) {
                    var r = this.charReceived;
                    var n = this.charBuffer;
                    var i = this.encoding;
                    t += n.slice(0, r).toString(i)
                }
                return t
            };

            function s(e) {
                return e.toString(this.encoding)
            }

            function f(e) {
                this.charReceived = e.length % 2;
                this.charLength = this.charReceived ? 2 : 0
            }

            function u(e) {
                this.charReceived = e.length % 3;
                this.charLength = this.charReceived ? 3 : 0
            }
        }, {
            buffer: 2
        }],
        26: [function(e, t, r) {
            (function(e) {
                t.exports = r;

                function r(e, t) {
                    if (n("noDeprecation")) {
                        return e
                    }
                    var r = false;

                    function i() {
                        if (!r) {
                            if (n("throwDeprecation")) {
                                throw new Error(t)
                            } else if (n("traceDeprecation")) {
                                console.trace(t)
                            } else {
                                console.warn(t)
                            }
                            r = true
                        }
                        return e.apply(this, arguments)
                    }
                    return i
                }

                function n(t) {
                    try {
                        if (!e.localStorage) return false
                    } catch (r) {
                        return false
                    }
                    var n = e.localStorage[t];
                    if (null == n) return false;
                    return String(n).toLowerCase() === "true"
                }
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {}],
        27: [function(e, t, r) {
            var n = function() {
                try {
                    return e("st" + "ream")
                } catch (t) {}
            }();
            r = t.exports = e("./lib/_stream_readable.js");
            r.Stream = n || r;
            r.Readable = r;
            r.Writable = e("./lib/_stream_writable.js");
            r.Duplex = e("./lib/_stream_duplex.js");
            r.Transform = e("./lib/_stream_transform.js");
            r.PassThrough = e("./lib/_stream_passthrough.js")
        }, {
            "./lib/_stream_duplex.js": 17,
            "./lib/_stream_passthrough.js": 18,
            "./lib/_stream_readable.js": 19,
            "./lib/_stream_transform.js": 20,
            "./lib/_stream_writable.js": 21
        }],
        "/": [function(e, t, r) {
            (function(r) {
                t.exports = u;
                var n = e("debug")("simple-peer");
                var i = e("get-browser-rtc");
                var o = e("hat");
                var a = e("inherits");
                var s = e("once");
                var f = e("readable-stream");
                a(u, f.Duplex);

                function u(e) {
                    var t = this;
                    if (!(t instanceof u)) return new u(e);
                    t._debug("new peer %o", e);
                    if (!e) e = {};
                    e.allowHalfOpen = false;
                    if (e.highWaterMark == null) e.highWaterMark = 1024 * 1024;
                    f.Duplex.call(t, e);
                    t.initiator = e.initiator || false;
                    t.channelConfig = e.channelConfig || u.channelConfig;
                    t.channelName = e.initiator ? e.channelName || o(160) : null;
                    t.config = e.config || u.config;
                    t.constraints = e.constraints || u.constraints;
                    t.offerConstraints = e.offerConstraints;
                    t.answerConstraints = e.answerConstraints;
                    t.reconnectTimer = e.reconnectTimer || false;
                    t.sdpTransform = e.sdpTransform || function(e) {
                        return e
                    };
                    t.stream = e.stream || false;
                    t.trickle = e.trickle !== undefined ? e.trickle : true;
                    t.destroyed = false;
                    t.connected = false;
                    t.remoteAddress = undefined;
                    t.remoteFamily = undefined;
                    t.remotePort = undefined;
                    t.localAddress = undefined;
                    t.localPort = undefined;
                    t._isWrtc = !!e.wrtc;
                    t._wrtc = e.wrtc || i();
                    if (!t._wrtc) {
                        if (typeof window === "undefined") {
                            throw new Error("No WebRTC support: Specify `opts.wrtc` option in this environment")
                        } else {
                            throw new Error("No WebRTC support: Not a supported browser")
                        }
                    }
                    t._maxBufferedAmount = e.highWaterMark;
                    t._pcReady = false;
                    t._channelReady = false;
                    t._iceComplete = false;
                    t._channel = null;
                    t._pendingCandidates = [];
                    t._chunk = null;
                    t._cb = null;
                    t._interval = null;
                    t._reconnectTimeout = null;
                    t._pc = new t._wrtc.RTCPeerConnection(t.config, t.constraints);
                    t._pc.oniceconnectionstatechange = t._onIceConnectionStateChange.bind(t);
                    t._pc.onsignalingstatechange = t._onSignalingStateChange.bind(t);
                    t._pc.onicecandidate = t._onIceCandidate.bind(t);
                    if (t.stream) t._pc.addStream(t.stream);
                    t._pc.onaddstream = t._onAddStream.bind(t);
                    if (t.initiator) {
                        t._setupData({
                            channel: t._pc.createDataChannel(t.channelName, t.channelConfig)
                        });
                        t._pc.onnegotiationneeded = s(t._createOffer.bind(t));
                        if (typeof window === "undefined" || !window.webkitRTCPeerConnection) {
                            t._pc.onnegotiationneeded()
                        }
                    } else {
                        t._pc.ondatachannel = t._setupData.bind(t)
                    }
                    t.on("finish", function() {
                        if (t.connected) {
                            setTimeout(function() {
                                t._destroy()
                            }, 100)
                        } else {
                            t.once("connect", function() {
                                setTimeout(function() {
                                    t._destroy()
                                }, 100)
                            })
                        }
                    })
                }
                u.WEBRTC_SUPPORT = !!i();
                u.config = {
                    iceServers: [{
                        url: "stun:23.21.150.121",
                        urls: "stun:23.21.150.121"
                    }]
                };
                u.constraints = {};
                u.channelConfig = {};
                Object.defineProperty(u.prototype, "bufferSize", {
                    get: function() {
                        var e = this;
                        return e._channel && e._channel.bufferedAmount || 0
                    }
                });
                u.prototype.address = function() {
                    var e = this;
                    return {
                        port: e.localPort,
                        family: "IPv4",
                        address: e.localAddress
                    }
                };
                u.prototype.signal = function(e) {
                    var t = this;
                    if (t.destroyed) throw new Error("cannot signal after peer is destroyed");
                    if (typeof e === "string") {
                        try {
                            e = JSON.parse(e)
                        } catch (r) {
                            e = {}
                        }
                    }
                    t._debug("signal()");

                    function n(e) {
                        try {
                            t._pc.addIceCandidate(new t._wrtc.RTCIceCandidate(e), c, t._onError.bind(t))
                        } catch (r) {
                            t._destroy(new Error("error adding candidate: " + r.message))
                        }
                    }
                    if (e.sdp) {
                        t._pc.setRemoteDescription(new t._wrtc.RTCSessionDescription(e), function() {
                            if (t.destroyed) return;
                            if (t._pc.remoteDescription.type === "offer") t._createAnswer();
                            t._pendingCandidates.forEach(n);
                            t._pendingCandidates = []
                        }, t._onError.bind(t))
                    }
                    if (e.candidate) {
                        if (t._pc.remoteDescription) n(e.candidate);
                        else t._pendingCandidates.push(e.candidate)
                    }
                    if (!e.sdp && !e.candidate) {
                        t._destroy(new Error("signal() called with invalid signal data"))
                    }
                };
                u.prototype.send = function(e) {
                    var t = this;
                    if (r.isBuffer(e) && t._isWrtc) {
                        e = new Uint8Array(e)
                    }
                    var n = e.length || e.byteLength || e.size;
                    t._channel.send(e);
                    t._debug("write: %d bytes", n)
                };
                u.prototype.destroy = function(e) {
                    var t = this;
                    t._destroy(null, e)
                };
                u.prototype._destroy = function(e, t) {
                    var r = this;
                    if (r.destroyed) return;
                    if (t) r.once("close", t);
                    r._debug("destroy (error: %s)", e && e.message);
                    r.readable = r.writable = false;
                    if (!r._readableState.ended) r.push(null);
                    if (!r._writableState.finished) r.end();
                    r.destroyed = true;
                    r.connected = false;
                    r._pcReady = false;
                    r._channelReady = false;
                    r._chunk = null;
                    r._cb = null;
                    clearInterval(r._interval);
                    clearTimeout(r._reconnectTimeout);
                    if (r._pc) {
                        try {
                            r._pc.close()
                        } catch (e) {}
                        r._pc.oniceconnectionstatechange = null;
                        r._pc.onsignalingstatechange = null;
                        r._pc.onicecandidate = null
                    }
                    if (r._channel) {
                        try {
                            r._channel.close()
                        } catch (e) {}
                        r._channel.onmessage = null;
                        r._channel.onopen = null;
                        r._channel.onclose = null
                    }
                    r._pc = null;
                    r._channel = null;
                    if (e) r.emit("error", e);
                    r.emit("close")
                };
                u.prototype._setupData = function(e) {
                    var t = this;
                    t._channel = e.channel;
                    t.channelName = t._channel.label;
                    t._channel.binaryType = "arraybuffer";
                    t._channel.onmessage = t._onChannelMessage.bind(t);
                    t._channel.onopen = t._onChannelOpen.bind(t);
                    t._channel.onclose = t._onChannelClose.bind(t)
                };
                u.prototype._read = function() {};
                u.prototype._write = function(e, t, r) {
                    var n = this;
                    if (n.destroyed) return r(new Error("cannot write after peer is destroyed"));
                    if (n.connected) {
                        try {
                            n.send(e)
                        } catch (i) {
                            return n._onError(i)
                        }
                        if (n._channel.bufferedAmount > n._maxBufferedAmount) {
                            n._debug("start backpressure: bufferedAmount %d", n._channel.bufferedAmount);
                            n._cb = r
                        } else {
                            r(null)
                        }
                    } else {
                        n._debug("write before connect");
                        n._chunk = e;
                        n._cb = r
                    }
                };
                u.prototype._createOffer = function() {
                    var e = this;
                    if (e.destroyed) return;
                    e._pc.createOffer(function(t) {
                        if (e.destroyed) return;
                        t.sdp = e.sdpTransform(t.sdp);
                        e._pc.setLocalDescription(t, c, e._onError.bind(e));
                        var r = function() {
                            var r = e._pc.localDescription || t;
                            e._debug("signal");
                            e.emit("signal", {
                                type: r.type,
                                sdp: r.sdp
                            })
                        };
                        if (e.trickle || e._iceComplete) r();
                        else e.once("_iceComplete", r)
                    }, e._onError.bind(e), e.offerConstraints)
                };
                u.prototype._createAnswer = function() {
                    var e = this;
                    if (e.destroyed) return;
                    e._pc.createAnswer(function(t) {
                        if (e.destroyed) return;
                        t.sdp = e.sdpTransform(t.sdp);
                        e._pc.setLocalDescription(t, c, e._onError.bind(e));
                        var r = function() {
                            var r = e._pc.localDescription || t;
                            e._debug("signal");
                            e.emit("signal", {
                                type: r.type,
                                sdp: r.sdp
                            })
                        };
                        if (e.trickle || e._iceComplete) r();
                        else e.once("_iceComplete", r)
                    }, e._onError.bind(e), e.answerConstraints)
                };
                u.prototype._onIceConnectionStateChange = function() {
                    var e = this;
                    if (e.destroyed) return;
                    var t = e._pc.iceGatheringState;
                    var r = e._pc.iceConnectionState;
                    e._debug("iceConnectionStateChange %s %s", t, r);
                    e.emit("iceConnectionStateChange", t, r);
                    if (r === "connected" || r === "completed") {
                        clearTimeout(e._reconnectTimeout);
                        e._pcReady = true;
                        e._maybeReady()
                    }
                    if (r === "disconnected") {
                        if (e.reconnectTimer) {
                            clearTimeout(e._reconnectTimeout);
                            e._reconnectTimeout = setTimeout(function() {
                                e._destroy()
                            }, e.reconnectTimer)
                        } else {
                            e._destroy()
                        }
                    }
                    if (r === "failed") {
                        e._destroy()
                    }
                    if (r === "closed") {
                        e._destroy()
                    }
                };
                u.prototype.getStats = function(e) {
                    var t = this;
                    if (!t._pc.getStats) {
                        e([])
                    } else if (typeof window !== "undefined" && !!window.mozRTCPeerConnection) {
                        t._pc.getStats(null, function(t) {
                            var r = [];
                            t.forEach(function(e) {
                                r.push(e)
                            });
                            e(r)
                        }, t._onError.bind(t))
                    } else {
                        t._pc.getStats(function(t) {
                            var r = [];
                            t.result().forEach(function(e) {
                                var t = {};
                                e.names().forEach(function(r) {
                                    t[r] = e.stat(r)
                                });
                                t.id = e.id;
                                t.type = e.type;
                                t.timestamp = e.timestamp;
                                r.push(t)
                            });
                            e(r)
                        })
                    }
                };
                u.prototype._maybeReady = function() {
                    var e = this;
                    e._debug("maybeReady pc %s channel %s", e._pcReady, e._channelReady);
                    if (e.connected || e._connecting || !e._pcReady || !e._channelReady) return;
                    e._connecting = true;
                    e.getStats(function(t) {
                        e._connecting = false;
                        e.connected = true;
                        var r = {};
                        var n = {};

                        function i(t) {
                            var i = n[t.localCandidateId];
                            var o = r[t.remoteCandidateId];
                            if (i) {
                                e.localAddress = i.ipAddress;
                                e.localPort = Number(i.portNumber)
                            } else if (typeof t.googLocalAddress === "string") {
                                i = t.googLocalAddress.split(":");
                                e.localAddress = i[0];
                                e.localPort = Number(i[1])
                            }
                            e._debug("connect local: %s:%s", e.localAddress, e.localPort);
                            if (o) {
                                e.remoteAddress = o.ipAddress;
                                e.remotePort = Number(o.portNumber);
                                e.remoteFamily = "IPv4"
                            } else if (typeof t.googRemoteAddress === "string") {
                                o = t.googRemoteAddress.split(":");
                                e.remoteAddress = o[0];
                                e.remotePort = Number(o[1]);
                                e.remoteFamily = "IPv4"
                            }
                            e._debug("connect remote: %s:%s", e.remoteAddress, e.remotePort)
                        }
                        t.forEach(function(e) {
                            if (e.type === "remotecandidate") r[e.id] = e;
                            if (e.type === "localcandidate") n[e.id] = e
                        });
                        t.forEach(function(e) {
                            var t = e.type === "googCandidatePair" && e.googActiveConnection === "true" || e.type === "candidatepair" && e.selected;
                            if (t) i(e)
                        });
                        if (e._chunk) {
                            try {
                                e.send(e._chunk)
                            } catch (o) {
                                return e._onError(o)
                            }
                            e._chunk = null;
                            e._debug('sent chunk from "write before connect"');
                            var a = e._cb;
                            e._cb = null;
                            a(null)
                        }
                        e._interval = setInterval(function() {
                            if (!e._cb || !e._channel || e._channel.bufferedAmount > e._maxBufferedAmount) return;
                            e._debug("ending backpressure: bufferedAmount %d", e._channel.bufferedAmount);
                            var t = e._cb;
                            e._cb = null;
                            t(null)
                        }, 150);
                        if (e._interval.unref) e._interval.unref();
                        e._debug("connect");
                        e.emit("connect")
                    })
                };
                u.prototype._onSignalingStateChange = function() {
                    var e = this;
                    if (e.destroyed) return;
                    e._debug("signalingStateChange %s", e._pc.signalingState);
                    e.emit("signalingStateChange", e._pc.signalingState)
                };
                u.prototype._onIceCandidate = function(e) {
                    var t = this;
                    if (t.destroyed) return;
                    if (e.candidate && t.trickle) {
                        t.emit("signal", {
                            candidate: {
                                candidate: e.candidate.candidate,
                                sdpMLineIndex: e.candidate.sdpMLineIndex,
                                sdpMid: e.candidate.sdpMid
                            }
                        })
                    } else if (!e.candidate) {
                        t._iceComplete = true;
                        t.emit("_iceComplete")
                    }
                };
                u.prototype._onChannelMessage = function(e) {
                    var t = this;
                    if (t.destroyed) return;
                    var n = e.data;
                    t._debug("read: %d bytes", n.byteLength || n.length);
                    if (n instanceof ArrayBuffer) n = new r(n);
                    t.push(n)
                };
                u.prototype._onChannelOpen = function() {
                    var e = this;
                    if (e.connected || e.destroyed) return;
                    e._debug("on channel open");
                    e._channelReady = true;
                    e._maybeReady()
                };
                u.prototype._onChannelClose = function() {
                    var e = this;
                    if (e.destroyed) return;
                    e._debug("on channel close");
                    e._destroy()
                };
                u.prototype._onAddStream = function(e) {
                    var t = this;
                    if (t.destroyed) return;
                    t._debug("on add stream");
                    t.emit("stream", e.stream)
                };
                u.prototype._onError = function(e) {
                    var t = this;
                    if (t.destroyed) return;
                    t._debug("error %s", e.message || e);
                    t._destroy(e)
                };
                u.prototype._debug = function() {
                    var e = this;
                    var t = [].slice.call(arguments);
                    var r = e.channelName && e.channelName.substring(0, 7);
                    t[0] = "[" + r + "] " + t[0];
                    n.apply(null, t)
                };

                function c() {}
            }).call(this, e("buffer").Buffer)
        }, {
            buffer: 2,
            debug: 9,
            "get-browser-rtc": 12,
            hat: 13,
            inherits: 14,
            once: 16,
            "readable-stream": 27
        }]
    }, {}, [])("/")
});
