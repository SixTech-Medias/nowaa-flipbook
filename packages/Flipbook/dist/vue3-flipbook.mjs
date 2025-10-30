var Zt = Object.defineProperty;
var qt = (l, e, t) => e in l ? Zt(l, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : l[e] = t;
var ot = (l, e, t) => (qt(l, typeof e != "symbol" ? e + "" : e, t), t);
import { getCurrentInstance as st, ref as h, computed as p, defineComponent as Ut, reactive as jt, onMounted as Gt, onBeforeUnmount as Jt, watch as G, openBlock as re, createElementBlock as se, renderSlot as De, normalizeProps as Kt, guardReactiveProps as Qt, unref as k, createElementVNode as A, normalizeClass as at, normalizeStyle as z, createCommentVNode as lt, Fragment as Vt, renderList as eo, withDirectives as to, vShow as oo } from "vue";
/*! @license Rematrix v0.7.2

	Copyright 2021 Julian Lloyd.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
function $e(l) {
  if (l && l.constructor === Array) {
    var e = l.filter(function(n) {
      return typeof n == "number";
    }).filter(function(n) {
      return !isNaN(n);
    });
    if (l.length === 6 && e.length === 6) {
      var t = J();
      return t[0] = e[0], t[1] = e[1], t[4] = e[2], t[5] = e[3], t[12] = e[4], t[13] = e[5], t;
    } else if (l.length === 16 && e.length === 16)
      return l;
  }
  throw new TypeError("Expected a `number[]` with length 6 or 16.");
}
function J() {
  for (var l = [], e = 0; e < 16; e++)
    e % 5 == 0 ? l.push(1) : l.push(0);
  return l;
}
function ao(l, e) {
  for (var t = $e(l), n = $e(e), o = [], s = 0; s < 4; s++)
    for (var u = [t[s], t[s + 4], t[s + 8], t[s + 12]], r = 0; r < 4; r++) {
      var i = r * 4, m = [n[i], n[i + 1], n[i + 2], n[i + 3]], _ = u[0] * m[0] + u[1] * m[1] + u[2] * m[2] + u[3] * m[3];
      o[s + i] = _;
    }
  return o;
}
function lo(l) {
  var e = J();
  return e[11] = -1 / l, e;
}
function no(l) {
  var e = Math.PI / 180 * l, t = J();
  return t[0] = t[10] = Math.cos(e), t[2] = t[8] = Math.sin(e), t[2] *= -1, t;
}
function ro(l) {
  return "matrix3d(" + $e(l).join(", ") + ")";
}
function so(l, e) {
  var t = J();
  return t[12] = l, e && (t[13] = e), t;
}
function io(l, e, t) {
  var n = J();
  return l !== void 0 && e !== void 0 && t !== void 0 && (n[12] = l, n[13] = e, n[14] = t), n;
}
class Re {
  constructor(e) {
    ot(this, "m");
    e ? this.m = [...e] : this.m = J();
  }
  clone() {
    return new Re(this.m);
  }
  multiply(e) {
    this.m = ao(this.m, e);
  }
  perspective(e) {
    this.multiply(lo(e));
  }
  transformX(e) {
    return (e * this.m[0] + this.m[12]) / (e * this.m[3] + this.m[15]);
  }
  translate(e, t) {
    this.multiply(so(e, t));
  }
  translate3d(e, t, n) {
    this.multiply(io(e, t, n));
  }
  rotateY(e) {
    this.multiply(no(e));
  }
  toString() {
    return ro(this.m);
  }
}
const uo = (l, e, t) => {
  let n = 0;
  return l > 0.5 && (n = -(l - 0.5) * 2 * 180), e === "left" && (n = -n), t === "back" && (n += 180), n;
}, it = (l) => Math.pow(l, 2), co = (l) => 1 - it(1 - l), ut = (l) => l < 0.5 ? it(l * 2) / 2 : 0.5 + co((l - 0.5) * 2) / 2, vo = (l, e, t, n, o, s, u) => {
  let r = t, i = !1;
  return n === 1 ? o === "right" ? l === "back" && (i = !0, r = t - s) : e === "left" ? l === "back" ? r = s - t : i = !0 : l === "front" ? r = s - t : i = !0 : e === "left" ? l === "back" ? r = u / 2 : i = !0 : l === "front" ? r = u / 2 : i = !0, {
    pageX: r,
    originRight: i
  };
}, po = (l, e, t, n, o, s, u) => {
  const r = new Re();
  return r.translate(n / 2), r.perspective(o), r.translate(-n / 2), r.translate(l, s), t && (e && r.translate(u), r.rotateY(t), e && r.translate(-u)), r;
}, fo = (l, e) => {
  let t;
  l < 0.5 ? t = l * 2 * Math.PI : t = (1 - (l - 0.5) * 2) * Math.PI, t == 0 && (t = 1e-9);
  const n = e / t;
  return {
    theta: t,
    radius: n
  };
}, go = (l, e, t) => t ? -l / Math.PI * 180 + e / 2 / Math.PI * 180 : e / 2 / Math.PI * 180, ho = (l, e, t, n) => {
  const o = [], s = [-0.5, -0.25, 0, 0.25, 0.5];
  if (t < 1) {
    const u = 1 - t, r = s.map(
      (i) => (1 - Math.cos((l - e * i) / 180 * Math.PI)) * u
    );
    o.push(
      `linear-gradient(to right, rgba(0, 0, 0, ${r[0]}), rgba(0, 0, 0, ${r[1]}) 25%, rgba(0, 0, 0, ${r[2]}) 50%, rgba(0, 0, 0, ${r[3]}) 75%, rgba(0, 0, 0, ${r[4]}))`
    );
  }
  if (n > 0) {
    const i = s.map(
      (m) => Math.max(
        Math.cos((l + 30 - e * m) / 180 * Math.PI) ** 200,
        Math.cos((l - 30 - e * m) / 180 * Math.PI) ** 200
      )
    );
    o.push(
      `linear-gradient(to right, rgba(255, 255, 255, ${i[0] * n}), rgba(255, 255, 255, ${i[1] * n}) 25%, rgba(255, 255, 255, ${i[2] * n}) 50%, rgba(255, 255, 255, ${i[3] * n}) 75%, rgba(255, 255, 255, ${i[4] * n}))`
    );
  }
  return o.join(",");
}, mo = (l, e, t, n, o) => {
  let s = Math.sin(l) * e;
  t && (s = o - s);
  let u = (1 - Math.cos(l)) * e;
  return n === "back" && (u = -u), { x: s, z: u };
};
function yo(l, e) {
  const t = st();
  if (!t)
    throw new Error("useDrawer() can only be used inside setup() or functional components!");
  const n = t.props, o = h(1);
  let s = 0;
  const u = h(!1), r = h(0), i = h(0), m = (f) => {
    H.value && (s += 1, n.zooms && F(n.zooms[s], f));
  }, _ = (f) => {
    E.value && (s -= 1, n.zooms && F(n.zooms[s], f));
  }, F = (f, b) => {
    const L = l == null ? void 0 : l.value;
    if (L) {
      let P, v;
      if (b) {
        const W = L.getBoundingClientRect();
        P = b.pageX - W.left, v = b.pageY - W.top;
      } else
        P = L.clientWidth / 2, v = L.clientHeight / 2;
      const I = o.value, O = f, Z = L.scrollLeft, q = L.scrollTop, K = P + Z, y = v + q, Q = K / I * O - P, V = y / I * O - v, ie = Date.now();
      u.value = !0, t == null || t.emit("zoom-start", f);
      const ue = () => {
        requestAnimationFrame(() => {
          const W = Date.now() - ie;
          let R = W / n.zoomDuration;
          R = R > 1 ? 1 : R, R = ut(R), o.value = I + (O - I) * R, r.value = Z + (Q - Z) * R, i.value = q + (V - q) * R, W < n.zoomDuration ? ue() : (t == null || t.emit("zoom-end", f), u.value = !1, o.value = f, r.value = Q, i.value = V);
        });
      };
      ue(), O > 1 && e(!0);
    }
  }, X = (f) => {
    s = (s + 1) % n.zooms.length, F(n.zooms[s], f);
  }, H = p(() => !u.value && s < n.zooms.length - 1), E = p(() => !u.value && s > 0);
  return {
    zoom: o,
    zooming: u,
    canZoomIn: H,
    canZoomOut: E,
    zoomIn: m,
    zoomOut: _,
    zoomAt: X,
    onWheel: (f, b) => {
      n.wheel === "scroll" && o.value > 1 && !b && l.value && (r.value = l.value.scrollLeft + f.deltaX, i.value = l.value.scrollTop + f.deltaY, f.cancelable && f.preventDefault()), n.wheel === "zoom" && (f.deltaY >= 100 ? (_(f), f.preventDefault()) : f.deltaY <= -100 && (m(f), f.preventDefault()));
    },
    scrollLeft: r,
    scrollTop: i
  };
}
function wo(l, e, t) {
  const n = h({}), o = h(0), s = h(0), u = h(), r = h(null), i = h(null), m = st();
  if (!m)
    throw new Error("useDrawer() can only be used inside setup() or functional components!");
  const _ = m.props, F = (d, f = !1) => {
    var b, L;
    return d < 1 ? "" : f && e.value > 1 && !t.value ? (d < _.pagesHiRes.length ? (b = _.pagesHiRes) == null ? void 0 : b[d] : "") || "" : (d < _.pages.length ? (L = _.pages) == null ? void 0 : L[d] : "") || "";
  }, X = (d) => {
    if (r.value === null)
      return d;
    if (n.value[d])
      return d;
    {
      const f = new Image();
      return f.onload = () => {
        n.value[d] = !0;
      }, f.src = d, _.loadingImage || "";
    }
  };
  return {
    imageWidth: r,
    imageHeight: i,
    pageUrl: F,
    loadImage: X,
    pageUrlLoading: (d, f = !1) => {
      const b = F(d, f);
      return f && e.value > 1 && !t.value ? b : b && X(b);
    },
    // onImageLoad,
    didLoadImage: (d) => {
      r.value === null && (r.value = d.target.naturalWidth, i.value = d.target.naturalHeight, l()), u.value && (++o.value >= s.value && u.value(), u.value = void 0);
    }
  };
}
const D = {
  silent: Number.NEGATIVE_INFINITY,
  fatal: 0,
  error: 0,
  warn: 1,
  log: 2,
  info: 3,
  success: 3,
  fail: 3,
  ready: 3,
  start: 3,
  box: 3,
  debug: 4,
  trace: 5,
  verbose: Number.POSITIVE_INFINITY
}, nt = {
  // Silent
  silent: {
    level: -1
  },
  // Level 0
  fatal: {
    level: D.fatal
  },
  error: {
    level: D.error
  },
  // Level 1
  warn: {
    level: D.warn
  },
  // Level 2
  log: {
    level: D.log
  },
  // Level 3
  info: {
    level: D.info
  },
  success: {
    level: D.success
  },
  fail: {
    level: D.fail
  },
  ready: {
    level: D.info
  },
  start: {
    level: D.info
  },
  box: {
    level: D.info
  },
  // Level 4
  debug: {
    level: D.debug
  },
  // Level 5
  trace: {
    level: D.trace
  },
  // Verbose
  verbose: {
    level: D.verbose
  }
};
function Fe(l) {
  return l !== null && typeof l == "object";
}
function Ee(l, e, t = ".", n) {
  if (!Fe(e))
    return Ee(l, {}, t, n);
  const o = Object.assign({}, e);
  for (const s in l) {
    if (s === "__proto__" || s === "constructor")
      continue;
    const u = l[s];
    u != null && (n && n(o, s, u, t) || (Array.isArray(u) && Array.isArray(o[s]) ? o[s] = [...u, ...o[s]] : Fe(u) && Fe(o[s]) ? o[s] = Ee(
      u,
      o[s],
      (t ? `${t}.` : "") + s.toString(),
      n
    ) : o[s] = u));
  }
  return o;
}
function bo(l) {
  return (...e) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    e.reduce((t, n) => Ee(t, n, "", l), {})
  );
}
const _o = bo();
function Mo(l) {
  return Object.prototype.toString.call(l) === "[object Object]";
}
function Lo(l) {
  return !(!Mo(l) || !l.message && !l.args || l.stack);
}
let Se = !1;
const rt = [];
class M {
  constructor(e = {}) {
    const t = e.types || nt;
    this.options = _o(
      {
        ...e,
        defaults: { ...e.defaults },
        level: Ae(e.level, t),
        reporters: [...e.reporters || []]
      },
      {
        types: nt,
        throttle: 1e3,
        throttleMin: 5,
        formatOptions: {
          date: !0,
          colors: !1,
          compact: !0
        }
      }
    );
    for (const n in t) {
      const o = {
        type: n,
        ...this.options.defaults,
        ...t[n]
      };
      this[n] = this._wrapLogFn(o), this[n].raw = this._wrapLogFn(
        o,
        !0
      );
    }
    this.options.mockFn && this.mockTypes(), this._lastLog = {};
  }
  get level() {
    return this.options.level;
  }
  set level(e) {
    this.options.level = Ae(
      e,
      this.options.types,
      this.options.level
    );
  }
  prompt(e, t) {
    if (!this.options.prompt)
      throw new Error("prompt is not supported!");
    return this.options.prompt(e, t);
  }
  create(e) {
    const t = new M({
      ...this.options,
      ...e
    });
    return this._mockFn && t.mockTypes(this._mockFn), t;
  }
  withDefaults(e) {
    return this.create({
      ...this.options,
      defaults: {
        ...this.options.defaults,
        ...e
      }
    });
  }
  withTag(e) {
    return this.withDefaults({
      tag: this.options.defaults.tag ? this.options.defaults.tag + ":" + e : e
    });
  }
  addReporter(e) {
    return this.options.reporters.push(e), this;
  }
  removeReporter(e) {
    if (e) {
      const t = this.options.reporters.indexOf(e);
      if (t >= 0)
        return this.options.reporters.splice(t, 1);
    } else
      this.options.reporters.splice(0);
    return this;
  }
  setReporters(e) {
    return this.options.reporters = Array.isArray(e) ? e : [e], this;
  }
  wrapAll() {
    this.wrapConsole(), this.wrapStd();
  }
  restoreAll() {
    this.restoreConsole(), this.restoreStd();
  }
  wrapConsole() {
    for (const e in this.options.types)
      console["__" + e] || (console["__" + e] = console[e]), console[e] = this[e].raw;
  }
  restoreConsole() {
    for (const e in this.options.types)
      console["__" + e] && (console[e] = console["__" + e], delete console["__" + e]);
  }
  wrapStd() {
    this._wrapStream(this.options.stdout, "log"), this._wrapStream(this.options.stderr, "log");
  }
  _wrapStream(e, t) {
    e && (e.__write || (e.__write = e.write), e.write = (n) => {
      this[t].raw(String(n).trim());
    });
  }
  restoreStd() {
    this._restoreStream(this.options.stdout), this._restoreStream(this.options.stderr);
  }
  _restoreStream(e) {
    e && e.__write && (e.write = e.__write, delete e.__write);
  }
  pauseLogs() {
    Se = !0;
  }
  resumeLogs() {
    Se = !1;
    const e = rt.splice(0);
    for (const t of e)
      t[0]._logFn(t[1], t[2]);
  }
  mockTypes(e) {
    const t = e || this.options.mockFn;
    if (this._mockFn = t, typeof t == "function")
      for (const n in this.options.types)
        this[n] = t(n, this.options.types[n]) || this[n], this[n].raw = this[n];
  }
  _wrapLogFn(e, t) {
    return (...n) => {
      if (Se) {
        rt.push([this, e, n, t]);
        return;
      }
      return this._logFn(e, n, t);
    };
  }
  _logFn(e, t, n) {
    if ((e.level || 0) > this.level)
      return !1;
    const o = {
      date: /* @__PURE__ */ new Date(),
      args: [],
      ...e,
      level: Ae(e.level, this.options.types)
    };
    !n && t.length === 1 && Lo(t[0]) ? Object.assign(o, t[0]) : o.args = [...t], o.message && (o.args.unshift(o.message), delete o.message), o.additional && (Array.isArray(o.additional) || (o.additional = o.additional.split(`
`)), o.args.push(`
` + o.additional.join(`
`)), delete o.additional), o.type = typeof o.type == "string" ? o.type.toLowerCase() : "log", o.tag = typeof o.tag == "string" ? o.tag : "";
    const s = (r = !1) => {
      const i = (this._lastLog.count || 0) - this.options.throttleMin;
      if (this._lastLog.object && i > 0) {
        const m = [...this._lastLog.object.args];
        i > 1 && m.push(`(repeated ${i} times)`), this._log({ ...this._lastLog.object, args: m }), this._lastLog.count = 1;
      }
      r && (this._lastLog.object = o, this._log(o));
    };
    clearTimeout(this._lastLog.timeout);
    const u = this._lastLog.time && o.date ? o.date.getTime() - this._lastLog.time.getTime() : 0;
    if (this._lastLog.time = o.date, u < this.options.throttle)
      try {
        const r = JSON.stringify([
          o.type,
          o.tag,
          o.args
        ]), i = this._lastLog.serialized === r;
        if (this._lastLog.serialized = r, i && (this._lastLog.count = (this._lastLog.count || 0) + 1, this._lastLog.count > this.options.throttleMin)) {
          this._lastLog.timeout = setTimeout(
            s,
            this.options.throttle
          );
          return;
        }
      } catch {
      }
    s(!0);
  }
  _log(e) {
    for (const t of this.options.reporters)
      t.log(e, {
        options: this.options
      });
  }
}
function Ae(l, e = {}, t = 3) {
  return l === void 0 ? t : typeof l == "number" ? l : e[l] && e[l].level !== void 0 ? e[l].level : t;
}
M.prototype.add = M.prototype.addReporter;
M.prototype.remove = M.prototype.removeReporter;
M.prototype.clear = M.prototype.removeReporter;
M.prototype.withScope = M.prototype.withTag;
M.prototype.mock = M.prototype.mockTypes;
M.prototype.pause = M.prototype.pauseLogs;
M.prototype.resume = M.prototype.resumeLogs;
function Io(l = {}) {
  return new M(l);
}
class Po {
  constructor(e) {
    this.options = { ...e }, this.defaultColor = "#7f8c8d", this.levelColorMap = {
      0: "#c0392b",
      // Red
      1: "#f39c12",
      // Yellow
      3: "#00BCD4"
      // Cyan
    }, this.typeColorMap = {
      success: "#2ecc71"
      // Green
    };
  }
  _getLogFn(e) {
    return e < 1 ? console.__error || console.error : e === 1 ? console.__warn || console.warn : console.__log || console.log;
  }
  log(e) {
    const t = this._getLogFn(e.level), n = e.type === "log" ? "" : e.type, o = e.tag || "", u = `
      background: ${this.typeColorMap[e.type] || this.levelColorMap[e.level] || this.defaultColor};
      border-radius: 0.5em;
      color: white;
      font-weight: bold;
      padding: 2px 0.5em;
    `, r = `%c${[o, n].filter(Boolean).join(":")}`;
    typeof e.args[0] == "string" ? t(
      `${r}%c ${e.args[0]}`,
      u,
      // Empty string as style resets to default console style
      "",
      ...e.args.slice(1)
    ) : t(r, u, ...e.args);
  }
}
function ct(l = {}) {
  return Io({
    reporters: l.reporters || [new Po({})],
    prompt(t, n = {}) {
      return n.type === "confirm" ? Promise.resolve(confirm(t)) : Promise.resolve(prompt(t));
    },
    ...l
  });
}
ct();
const To = {
  pages: {
    type: Array,
    required: !0
  },
  pagesHiRes: {
    type: Array,
    default: () => []
  },
  flipDuration: {
    type: Number,
    default: 1e3
  },
  zoomDuration: {
    type: Number,
    default: 500
  },
  zooms: {
    type: Array,
    default: () => [1, 2, 4]
  },
  perspective: {
    type: Number,
    default: 2400
  },
  nPolygons: {
    type: Number,
    default: 10
  },
  ambient: {
    type: Number,
    default: 0.4
  },
  gloss: {
    type: Number,
    default: 0.6
  },
  swipeMin: {
    type: Number,
    default: 3
  },
  singlePage: {
    type: Boolean,
    default: !1
  },
  forwardDirection: {
    validator: (l) => l === "right" || l === "left",
    default: "right"
  },
  centering: {
    type: Boolean,
    default: !0
  },
  startPage: {
    type: Number,
    default: null
  },
  loadingImage: {
    type: String,
    default: "spinner"
  },
  clickToZoom: {
    type: Boolean,
    default: !0
  },
  dragToFlip: {
    type: Boolean,
    default: !0
  },
  wheel: {
    type: String,
    default: "scroll"
  },
  pageHotspots: {
    type: Object,
    default: () => ({})
  }
}, xo = { class: "vue3-flipbook" }, ko = ["src"], zo = ["src"], Do = ["data-img"], Ce = /* @__PURE__ */ Ut({
  __name: "Flipbook",
  props: To,
  emits: ["flip-left-start", "flip-left-end", "flip-right-start", "flip-right-end", "zoom-start", "zoom-end"],
  setup(l, { emit: e }) {
    const t = ct({
      level: 4
      // 设置日志级别为 silent
    });
    t.info("This will not be logged");
    const n = e, o = l, s = h(0), u = h(0), r = h(0), i = h(0), m = h(0), _ = h(1), F = h(null), X = h(null), H = h(0), E = h(null), d = h(!1), f = h(!1), b = h(1 / 0), L = h(-1 / 0), P = h(), v = jt({
      progress: 0,
      direction: "right",
      frontImage: "",
      backImage: "",
      auto: !1,
      opacity: 1
    }), I = h(0), O = h(!1), Z = h(0), q = h(0), K = (a = !1) => {
      for (let c = i.value - 3; c <= i.value + 3; c++)
        ye(c, !1);
      if (a)
        for (let c = i.value; c < i.value + r.value; c++) {
          const g = o.pagesHiRes[c];
          g && typeof g == "string" && (new Image().src = g);
        }
    }, {
      zoom: y,
      zooming: Q,
      canZoomIn: V,
      canZoomOut: ie,
      zoomIn: ue,
      zoomOut: W,
      zoomAt: R,
      onWheel: vt,
      scrollLeft: Ne,
      scrollTop: Xe
    } = yo(P, K), { imageWidth: ee, imageHeight: ce, pageUrl: S, loadImage: pt, pageUrlLoading: ye, didLoadImage: ve } = wo(
      K,
      y,
      Q
    ), ft = p(() => ({
      zoom: Q.value || y.value > 1,
      "drag-to-scroll": !d.value
    })), gt = p(() => ({
      cursor: Ye.value == "grabbing" ? "grabbing" : "auto"
    })), pe = p(() => o.forwardDirection === "left" ? He.value : Oe.value), fe = p(() => o.forwardDirection === "right" ? He.value : Oe.value), ht = p(() => o.pages[0] === null ? o.pages.length - 1 : o.pages.length), U = p(() => o.pages[0] !== null ? i.value + 1 : Math.max(1, i.value)), He = p(() => i.value < o.pages.length - r.value), Oe = p(
      () => i.value >= r.value && !(r.value === 1 && !S(m.value - 1))
    ), te = p(() => o.forwardDirection === "right" || r.value === 1 ? m.value : _.value), oe = p(() => o.forwardDirection === "right" || r.value === 1 ? _.value : m.value), dt = p(() => S(te.value)), mt = p(() => S(oe.value) && r.value === 2), yt = p(() => o.pageHotspots[te.value] || []), wt = p(() => o.pageHotspots[oe.value] || []), Ye = p(() => E.value ? E.value : o.clickToZoom && V.value ? "zoom-in" : o.clickToZoom && ie.value ? "zoom-out" : o.dragToFlip ? "grab" : "auto"), j = p(() => (s.value - C.value * r.value) / 2), Y = p(() => (u.value - N.value) / 2), bt = p(() => {
      let a = C.value / o.nPolygons;
      return a = Math.ceil(a + 1 / y.value), a + "px";
    }), _t = p(() => N.value + "px"), Mt = p(() => `${C.value}px ${N.value}px`), Lt = p(() => Ue("front").concat(Ue("back"))), B = p(() => {
      if (r.value === 1)
        return j.value;
      {
        let a;
        return S(te.value) ? a = j.value : a = s.value / 2, a < b.value ? a : b.value;
      }
    }), ae = p(() => {
      if (r.value === 1)
        return s.value - j.value;
      {
        let a = S(oe.value) ? s.value - j.value : s.value / 2;
        return a > L.value ? a : L.value;
      }
    }), It = p(() => {
      let a = (ae.value - B.value) * y.value;
      return a < s.value ? (B.value + (I.value ?? 0)) * y.value - (s.value - a) / 2 : (B.value + (I.value ?? 0)) * y.value;
    }), Pt = p(() => {
      let a = (ae.value - B.value) * y.value;
      return a < s.value ? (B.value + (I.value ?? 0)) * y.value - (s.value - a) / 2 : (ae.value + (I.value ?? 0)) * y.value - s.value;
    }), Tt = p(() => {
      let a = N.value * y.value;
      return a < u.value ? Y.value * y.value - (u.value - a) / 2 : Y.value * y.value;
    }), xt = p(() => {
      let a = N.value * y.value;
      return a < u.value ? Y.value * y.value - (u.value - a) / 2 : (Y.value + N.value) * y.value - u.value;
    });
    Gt(() => {
      be(o.forwardDirection), we(), window.addEventListener("resize", we, {
        passive: !0
      }), y.value = o.zooms[0], t.info("props.startPage", o.startPage), Ke(o.startPage);
    }), Jt(() => {
      window.removeEventListener("resize", we);
    });
    const Be = p(() => {
      const a = s.value / r.value, c = ee.value ? a / ee.value : 1, g = ce.value ? u.value / ce.value : 1, w = c < g ? c : g;
      return w < 1 ? w : 1;
    }), C = p(
      () => ee.value ? Math.round(ee.value * Be.value) : 1
    ), N = p(
      () => ce.value ? Math.round(ce.value * Be.value) : 1
    ), we = () => {
      const a = P.value;
      a && (s.value = a.clientWidth, u.value = a.clientHeight, r.value = s.value > u.value && !o.singlePage ? 2 : 1, r.value === 2 && (i.value &= -2), We(), b.value = 1 / 0, L.value = -1 / 0);
    }, We = () => {
      r.value === 1 && i.value === 0 && o.pages.length && !S(0) && i.value++;
    }, Ze = () => {
      pe.value && _e("left", !0);
    }, qe = () => {
      fe.value && _e("right", !0);
    }, Ue = (a) => {
      let c = v.progress, g = v.direction;
      r.value === 1 && g !== o.forwardDirection && (c = 1 - c, g = o.forwardDirection), v.opacity = r.value === 1 && c > 0.7 ? 1 - (c - 0.7) / 0.3 : 1;
      let w = a === "front" ? v.frontImage : v.backImage;
      t.info("flip.backImage", v.backImage), t.info("flip.frontImage", v.frontImage), t.info("face", a), t.info("image", w);
      const $ = C.value / o.nPolygons, { pageX: T, originRight: x } = vo(
        a,
        g,
        j.value,
        r.value,
        o.forwardDirection,
        C.value,
        s.value
      ), he = uo(c, g, a), Xt = po(
        T,
        x,
        he,
        s.value,
        o.perspective,
        Y.value,
        C.value
      ), { theta: Pe, radius: Ht } = fo(c, C.value);
      let Te = 0, xe = Pe / o.nPolygons, le = go(Pe, xe, x), de = xe / Math.PI * 180;
      a === "back" && (le = -le, de = -de), b.value = 1 / 0, L.value = -1 / 0;
      const Qe = [];
      let ke = 1 / 0, ze = -1 / 0;
      for (let me = 0; me < o.nPolygons; me++) {
        const Ot = `${me / (o.nPolygons - 1) * 100}% 0px`, ne = Xt.clone(), Yt = x ? Pe - Te : Te, { x: Bt, z: Ve } = mo(Yt, Ht, x, a, C.value);
        ne.translate3d(Bt, 0, Ve), ne.rotateY(-le);
        const et = ne.transformX(0), tt = ne.transformX($);
        ke = Math.min(ke, et, tt), ze = Math.max(ze, et, tt);
        const Wt = ho(he - le, de, o.ambient, o.gloss) || "";
        Te += xe, le += de, Qe.push([
          `${a}${me}`,
          w,
          Wt,
          Ot,
          ne.toString(),
          Math.abs(Math.round(Ve))
        ]);
      }
      return L.value = ze, b.value = ke, Qe;
    }, be = (a) => {
      a !== o.forwardDirection ? (v.frontImage = r.value === 1 ? S(i.value - 1) : S(m.value), v.backImage = r.value === 1 ? "" : S(i.value - r.value + 1)) : (v.frontImage = r.value === 1 ? S(i.value) : S(_.value), v.backImage = r.value === 1 ? "" : S(i.value + r.value));
    }, _e = (a, c) => {
      be(a), v.direction = a, v.progress = 0, requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          v.direction !== o.forwardDirection ? r.value === 2 && (m.value = i.value - r.value) : r.value === 1 ? m.value = i.value + r.value : _.value = i.value + 1 + r.value, c && je(!0);
        });
      });
    }, je = (a) => {
      const c = Date.now(), g = o.flipDuration * (1 - v.progress), w = v.progress;
      v.auto = !0, v.direction === "left" ? n("flip-left-start", U.value) : n("flip-right-start", U.value);
      const $ = () => {
        const T = Date.now() - c;
        let x = w + T / g;
        x = x > 1 ? 1 : x, v.progress = a ? ut(x) : x, x < 1 ? requestAnimationFrame($) : (v.direction !== o.forwardDirection ? i.value -= r.value : i.value += r.value, v.direction === "left" ? n("flip-left-end", U.value) : n("flip-right-end", U.value), v.auto = !1);
      };
      $();
    }, kt = () => {
      const a = Date.now(), c = o.flipDuration * v.progress, g = v.progress;
      v.auto = !0;
      const w = () => {
        requestAnimationFrame(() => {
          const $ = Date.now() - a;
          let T = g - g * $ / c;
          T = T < 0 ? 0 : T, v.progress = T, T > 0 ? w() : (m.value = i.value, _.value = i.value + 1, v.auto = !1);
        });
      };
      w();
    }, zt = (a, c) => {
      Ne.value = Z.value - a, Xe.value = q.value - c;
    }, Dt = p(() => Math.min(Pt.value, Math.max(It.value, Ne.value))), Ft = p(() => Math.min(xt.value, Math.max(Tt.value, Xe.value)));
    G(Dt, (a) => {
      P.value && (P.value.scrollLeft = a);
    }), G(Ft, (a) => {
      P.value && (P.value.scrollTop = a);
    });
    const Me = (a) => {
      P.value && (F.value = a.pageX, X.value = a.pageY, H.value = 0, y.value <= 1 ? o.dragToFlip && (E.value = "grab") : (Z.value = P.value.scrollLeft, q.value = P.value.scrollTop, E.value = "all-scroll"));
    }, Le = (a) => {
      if (!F.value || !X.value)
        return;
      const c = a.pageX - F.value, g = a.pageY - X.value;
      if (H.value = Math.max(H.value, Math.abs(c), Math.abs(g)), y.value > 1) {
        zt(c, g);
        return;
      }
      if (!o.dragToFlip || Math.abs(g) > Math.abs(c))
        return;
      E.value = "grabbing";
      const w = c > 0 ? "left" : "right", $ = c > 0 ? pe.value : fe.value, T = c > 0 ? o.swipeMin : -o.swipeMin;
      return $ && c >= T && _e(w, !1), v.direction === w && (v.progress = Math.abs(c) / C.value, v.progress > 1 && (v.progress = 1)), !0;
    }, Ie = (a) => {
      F.value && (o.clickToZoom && H.value < o.swipeMin && R(a), v.direction !== null && !v.auto && (v.progress > 1 / 4 ? je(!1) : kt()), F.value = null, E.value = null);
    }, St = (a) => {
      d.value = !0, Me(a.changedTouches[0]);
    }, At = (a) => {
      Le(a.changedTouches[0]) && a.preventDefault();
    }, Ge = (a) => {
      Ie(a.changedTouches[0]);
    }, Ct = (a) => {
      f.value = !0, !d.value && a.button === 0 && (Me(a), a.target && a.target.setPointerCapture(a.pointerId));
    }, $t = (a) => {
      d.value || Le(a);
    }, Je = (a) => {
      d.value || (Ie(a), a.target && a.target.releasePointerCapture(a.pointerId));
    }, Et = (a) => {
      d.value || f.value || a.button === 0 && Me(a);
    }, Rt = (a) => {
      (!d.value || !f.value) && Le(a);
    }, Nt = (a) => {
      (!d.value || !f.value) && Ie(a);
    }, Ke = (a) => {
      a === null || a === U.value || (i.value = (o.pages ?? [])[0] === null && r.value === 2 && a === 1 ? 0 : a - 1, b.value = 1 / 0, L.value = -1 / 0, I.value = ge.value);
    };
    G(i, () => {
      m.value = i.value, _.value = i.value + 1, K();
    });
    const ge = p(() => o.centering ? Math.round(s.value / 2 - (B.value + ae.value) / 2) : 0);
    return G(ge, (a) => {
      if (O.value)
        return;
      I.value === 0 && ee.value !== null && (I.value = a);
      const c = () => {
        requestAnimationFrame(() => {
          const w = ge.value - I.value;
          Math.abs(w) < 0.5 ? (I.value = ge.value, O.value = !1) : (I.value += w * 0.1, c());
        });
      };
      O.value = !0, c();
    }), G(
      () => o.pages,
      (a, c) => {
        be(o.forwardDirection), We(), !(c != null && c.length) && (a != null && a.length) && o.startPage > 1 && a[0] == null && i.value++;
      }
    ), G(
      () => o.startPage,
      (a) => {
        Ke(a);
      }
    ), (a, c) => (re(), se("div", xo, [
      De(a.$slots, "default", Kt(Qt({
        canFlipLeft: pe.value,
        canFlipRight: fe.value,
        canZoomIn: k(V),
        canZoomOut: k(ie),
        page: U.value,
        numPages: ht.value,
        flipLeft: Ze,
        flipRight: qe,
        zoomIn: k(ue),
        zoomOut: k(W)
      }))),
      A("div", {
        ref_key: "refViewport",
        ref: P,
        class: at(["viewport", ft.value]),
        style: z(gt.value),
        onTouchmove: At,
        onPointermove: $t,
        onMousemove: Rt,
        onTouchend: Ge,
        onTouchcancel: Ge,
        onPointerup: Je,
        onPointercancel: Je,
        onMouseup: Nt,
        onWheel: c[2] || (c[2] = (g) => k(vt)(g, d.value))
      }, [
        A("div", {
          class: "flipbook-container",
          style: z({ transform: `scale(${k(y)})` })
        }, [
          A("div", {
            class: "click-to-flip left",
            style: z({ cursor: pe.value ? "pointer" : "auto" }),
            onClick: Ze
          }, null, 4),
          A("div", {
            class: "click-to-flip right",
            style: z({ cursor: fe.value ? "pointer" : "auto" }),
            onClick: qe
          }, null, 4),
          A("div", {
            style: z({ transform: `translateX(${I.value}px)` })
          }, [
            dt.value ? (re(), se("div", {
              key: 0,
              class: "page-container fixed",
              style: z({
                width: C.value + "px",
                height: N.value + "px",
                left: j.value + "px",
                top: Y.value + "px",
                position: "absolute"
              })
            }, [
              A("img", {
                class: "page-image",
                style: {
                  width: "100%",
                  height: "100%"
                },
                src: k(ye)(te.value, !0),
                onLoad: c[0] || (c[0] = //@ts-ignore
                (...g) => k(ve) && k(ve)(...g))
              }, null, 40, ko),
              A("div", {
                class: "page-hotspots",
                style: z({
                  opacity: 1 - v.opacity,
                  pointerEvents: v.opacity > 0.1 ? "none" : "auto",
                  zIndex: v.opacity > 0.1 ? 1 : 10
                })
              }, [
                De(a.$slots, "hotspot", {
                  hotspots: yt.value,
                  page: te.value
                })
              ], 4)
            ], 4)) : lt("", !0),
            mt.value ? (re(), se("div", {
              key: 1,
              class: "page-container fixed",
              style: z({
                width: C.value + "px",
                height: N.value + "px",
                left: s.value / 2 + "px",
                top: Y.value + "px",
                position: "absolute"
              })
            }, [
              A("img", {
                class: "page-image",
                style: {
                  width: "100%",
                  height: "100%"
                },
                src: k(ye)(oe.value, !0),
                onLoad: c[1] || (c[1] = //@ts-ignore
                (...g) => k(ve) && k(ve)(...g))
              }, null, 40, zo),
              A("div", {
                class: "page-hotspots",
                style: z({
                  opacity: 1 - v.opacity,
                  pointerEvents: v.opacity > 0.1 ? "none" : "auto",
                  zIndex: v.opacity > 0.1 ? 1 : 10
                })
              }, [
                De(a.$slots, "hotspot", {
                  hotspots: wt.value,
                  page: oe.value
                })
              ], 4)
            ], 4)) : lt("", !0),
            A("div", {
              style: z({ opacity: v.opacity })
            }, [
              (re(!0), se(Vt, null, eo(Lt.value, ([g, w, $, T, x, he]) => (re(), se("div", {
                key: g,
                class: at(["polygon", { blank: !w }]),
                "data-img": w,
                style: z({
                  backgroundImage: w && `url(${k(pt)(w)})`,
                  backgroundSize: Mt.value,
                  backgroundPosition: T,
                  width: bt.value,
                  height: _t.value,
                  transform: x,
                  zIndex: he
                })
              }, [
                to(A("div", {
                  class: "lighting",
                  style: z({ backgroundImage: $ })
                }, null, 4), [
                  [oo, $.length]
                ])
              ], 14, Do))), 128))
            ], 4),
            A("div", {
              class: "bounding-box",
              style: z({
                left: B.value + "px",
                top: Y.value + "px",
                width: ae.value - B.value + "px",
                height: N.value + "px",
                cursor: Ye.value
              }),
              onTouchstart: St,
              onPointerdown: Ct,
              onMousedown: Et
            }, null, 36)
          ], 4)
        ], 4)
      ], 38)
    ]));
  }
});
Ce.install = (l) => (l.component(Ce.name, Ce), l);
export {
  Ce as default
};
//# sourceMappingURL=vue3-flipbook.mjs.map
