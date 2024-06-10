"use strict";
var ReflectOwnKeys,
    R = "object" == typeof Reflect ? Reflect : null,
    ReflectApply =
    R && "function" == typeof R.apply ?
    R.apply :
    function e(t, n, r) {
        return Function.prototype.apply.call(t, n, r);
    };

function ProcessEmitWarning(e) {
    console && console.warn && console.warn(e);
}
ReflectOwnKeys =
    R && "function" == typeof R.ownKeys ?
    R.ownKeys :
    Object.getOwnPropertySymbols ?
    function e(t) {
        return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
    } :
    function e(t) {
        return Object.getOwnPropertyNames(t);
    };
var NumberIsNaN =
    Number.isNaN ||
    function e(t) {
        return t != t;
    };

function EventEmitter() {
    EventEmitter.init.call(this);
}
(EventEmitter),
(once = once),
(EventEmitter.EventEmitter = EventEmitter),
(EventEmitter.prototype._events = void 0),
(EventEmitter.prototype._eventsCount = 0),
(EventEmitter.prototype._maxListeners = void 0);
var defaultMaxListeners = 10;

function checkListener(e) {
    if ("function" != typeof e)
        throw TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}

function _getMaxListeners(e) {
    return void 0 === e._maxListeners ? EventEmitter.defaultMaxListeners : e._maxListeners;
}

function _addListener(e, t, n, r) {
    if (
        (checkListener(n),
            void 0 === (s = e._events) ?
            ((s = e._events = Object.create(null)), (e._eventsCount = 0)) :
            (void 0 !== s.newListener &&
                (e.emit("newListener", t, n.listener ? n.listener : n), (s = e._events)),
                (o = s[t])),
            void 0 === o)
    )
        (o = s[t] = n), ++e._eventsCount;
    else if (
        ("function" == typeof o ? (o = s[t] = r ? [n, o] : [o, n]) : r ? o.unshift(n) : o.push(n),
            (i = _getMaxListeners(e)) > 0 && o.length > i && !o.warned)
    ) {
        o.warned = !0;
        var i,
            s,
            o,
            u = Error(
                "Possible EventEmitter memory leak detected. " +
                o.length +
                " " +
                String(t) +
                " listeners added. Use emitter.setMaxListeners() to increase limit"
            );
        (u.name = "MaxListenersExceededWarning"),
        (u.emitter = e),
        (u.type = t),
        (u.count = o.length),
        ProcessEmitWarning(u);
    }
    return e;
}

function onceWrapper() {
    if (!this.fired)
        return (this.target.removeListener(this.type, this.wrapFn),
                (this.fired = !0),
                0 === arguments.length) ?
            this.listener.call(this.target) :
            this.listener.apply(this.target, arguments);
}

function _onceWrap(e, t, n) {
    var r = {
            fired: !1,
            wrapFn: void 0,
            target: e,
            type: t,
            listener: n
        },
        i = onceWrapper.bind(r);
    return (i.listener = n), (r.wrapFn = i), i;
}

function _listeners(e, t, n) {
    var r = e._events;
    if (void 0 === r) return [];
    var i = r[t];
    return void 0 === i ?
        [] :
        "function" == typeof i ?
        n ?
        [i.listener || i] :
        [i] :
        n ?
        unwrapListeners(i) :
        arrayClone(i, i.length);
}

function listenerCount(e) {
    var t = this._events;
    if (void 0 !== t) {
        var n = t[e];
        if ("function" == typeof n) return 1;
        if (void 0 !== n) return n.length;
    }
    return 0;
}

function arrayClone(e, t) {
    for (var n = Array(t), r = 0; r < t; ++r) n[r] = e[r];
    return n;
}

function spliceOne(e, t) {
    for (; t + 1 < e.length; t++) e[t] = e[t + 1];
    e.pop();
}

function unwrapListeners(e) {
    for (var t = Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
    return t;
}

function once(e, t) {
    return new Promise(function(n, r) {
        function i(n) {
            e.removeListener(t, s), r(n);
        }

        function s() {
            "function" == typeof e.removeListener && e.removeListener("error", i),
                n([].slice.call(arguments));
        }
        eventTargetAgnosticAddListener(e, t, s, {
                once: !0
            }),
            "error" !== t && addErrorHandlerIfEventEmitter(e, i, {
                once: !0
            });
    });
}

function addErrorHandlerIfEventEmitter(e, t, n) {
    "function" == typeof e.on && eventTargetAgnosticAddListener(e, "error", t, n);
}

function eventTargetAgnosticAddListener(e, t, n, r) {
    if ("function" == typeof e.on) r.once ? e.once(t, n) : e.on(t, n);
    else if ("function" == typeof e.addEventListener)
        e.addEventListener(t, function i(s) {
            r.once && e.removeEventListener(t, i), n(s);
        });
    else
        throw TypeError(
            'The "emitter" argument must be of type EventEmitter. Received type ' + typeof e
        );
}
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        enumerable: !0,
        get: function() {
            return defaultMaxListeners;
        },
        set: function(e) {
            if ("number" != typeof e || e < 0 || NumberIsNaN(e))
                throw RangeError(
                    'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                    e +
                    "."
                );
            defaultMaxListeners = e;
        },
    }),
    (EventEmitter.init = function() {
        (void 0 === this._events || this._events === Object.getPrototypeOf(this)._events) &&
        ((this._events = Object.create(null)), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    }),
    (EventEmitter.prototype.setMaxListeners = function e(t) {
        if ("number" != typeof t || t < 0 || NumberIsNaN(t))
            throw RangeError(
                'The value of "n" is out of range. It must be a non-negative number. Received ' + t + "."
            );
        return (this._maxListeners = t), this;
    }),
    (EventEmitter.prototype.getMaxListeners = function e() {
        return _getMaxListeners(this);
    }),
    (EventEmitter.prototype.emit = function e(t) {
        for (var n = [], r = 1; r < arguments.length; r++) n.push(arguments[r]);
        var i = "error" === t,
            s = this._events;
        if (void 0 !== s) i = i && void 0 === s.error;
        else if (!i) return !1;
        if (i) {
            if ((n.length > 0 && (o = n[0]), o instanceof Error)) throw o;
            var o,
                u = Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
            throw ((u.context = o), u);
        }
        var f = s[t];
        if (void 0 === f) return !1;
        if ("function" == typeof f) ReflectApply(f, this, n);
        else
            for (var v = f.length, a = arrayClone(f, v), r = 0; r < v; ++r) ReflectApply(a[r], this, n);
        return !0;
    }),
    (EventEmitter.prototype.addListener = function e(t, n) {
        return _addListener(this, t, n, !1);
    }),
    (EventEmitter.prototype.on = EventEmitter.prototype.addListener),
    (EventEmitter.prototype.prependListener = function e(t, n) {
        return _addListener(this, t, n, !0);
    }),
    (EventEmitter.prototype.once = function e(t, n) {
        return checkListener(n), this.on(t, _onceWrap(this, t, n)), this;
    }),
    (EventEmitter.prototype.prependOnceListener = function e(t, n) {
        return checkListener(n), this.prependListener(t, _onceWrap(this, t, n)), this;
    }),
    (EventEmitter.prototype.removeListener = function e(t, n) {
        var r, i, s, o, u;
        if ((checkListener(n), void 0 === (i = this._events) || void 0 === (r = i[t]))) return this;
        if (r === n || r.listener === n)
            0 == --this._eventsCount ?
            (this._events = Object.create(null)) :
            (delete i[t], i.removeListener && this.emit("removeListener", t, r.listener || n));
        else if ("function" != typeof r) {
            for (s = -1, o = r.length - 1; o >= 0; o--)
                if (r[o] === n || r[o].listener === n) {
                    (u = r[o].listener), (s = o);
                    break;
                }
            if (s < 0) return this;
            0 === s ? r.shift() : spliceOne(r, s),
                1 === r.length && (i[t] = r[0]),
                void 0 !== i.removeListener && this.emit("removeListener", t, u || n);
        }
        return this;
    }),
    (EventEmitter.prototype.off = EventEmitter.prototype.removeListener),
    (EventEmitter.prototype.removeAllListeners = function e(t) {
        var n, r, i;
        if (void 0 === (r = this._events)) return this;
        if (void 0 === r.removeListener)
            return (
                0 === arguments.length ?
                ((this._events = Object.create(null)), (this._eventsCount = 0)) :
                void 0 !== r[t] &&
                (0 == --this._eventsCount ? (this._events = Object.create(null)) : delete r[t]),
                this
            );
        if (0 === arguments.length) {
            var s,
                o = Object.keys(r);
            for (i = 0; i < o.length; ++i) "removeListener" !== (s = o[i]) && this.removeAllListeners(s);
            return (
                this.removeAllListeners("removeListener"),
                (this._events = Object.create(null)),
                (this._eventsCount = 0),
                this
            );
        }
        if ("function" == typeof(n = r[t])) this.removeListener(t, n);
        else if (void 0 !== n)
            for (i = n.length - 1; i >= 0; i--) this.removeListener(t, n[i]);
        return this;
    }),
    (EventEmitter.prototype.listeners = function e(t) {
        return _listeners(this, t, !0);
    }),
    (EventEmitter.prototype.rawListeners = function e(t) {
        return _listeners(this, t, !1);
    }),
    (EventEmitter.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : listenerCount.call(e, t);
    }),
    (EventEmitter.prototype.listenerCount = listenerCount),
    (EventEmitter.prototype.eventNames = function e() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    });

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const calcWinsize = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
};

// Gets the mouse position
const getMousePos = (e) => {
    return {
        x: e.clientX,
        y: e.clientY,
    };
};

// Calculate the viewport size
let winsize = calcWinsize();
window.addEventListener("resize", () => {
    winsize = calcWinsize();
});

// Track the mouse position
let mouse = {
    x: 0,
    y: 0
};
window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));

export default class Cursor extends EventEmitter {
    constructor(el) {
        super();
        this.DOM = {
            el: el
        };
        this.DOM.el.style.opacity = 0;
        this.DOM.circleInner = this.DOM.el.querySelector(".cursor__inner");

        this.filterId = "#filter-1";
        this.DOM.feTurbulence = document.querySelector(`${this.filterId} > feTurbulence`);

        this.primitiveValues = {
            turbulence: 0
        };

        this.createTimeline();

        this.bounds = this.DOM.el.getBoundingClientRect();

        this.renderedStyles = {
            tx: {
                previous: 0,
                current: 0,
                amt: 0.16
            },
            ty: {
                previous: 0,
                current: 0,
                amt: 0.16
            },
            radius: {
                previous: 60,
                current: 60,
                amt: 0.16
            },
        };

        this.listen();

        this.onMouseMoveEv = () => {
            this.renderedStyles.tx.previous = this.renderedStyles.tx.current =
                mouse.x - this.bounds.width / 2;
            this.renderedStyles.ty.previous = this.renderedStyles.ty.current =
                mouse.y - this.bounds.height / 2;
            gsap.to(this.DOM.el, {
                duration: 0.9,
                ease: "Power3.easeOut",
                opacity: 1
            });
            requestAnimationFrame(() => this.render());
            window.removeEventListener("mousemove", this.onMouseMoveEv);
        };
        window.addEventListener("mousemove", this.onMouseMoveEv);
    }
    render() {
        this.renderedStyles["tx"].current = mouse.x - this.bounds.width / 2;
        this.renderedStyles["ty"].current = mouse.y - this.bounds.height / 2;

        for (const key in this.renderedStyles) {
            this.renderedStyles[key].previous = lerp(
                this.renderedStyles[key].previous,
                this.renderedStyles[key].current,
                this.renderedStyles[key].amt
            );
        }

        this.DOM.el.style.transform = `translateX(${this.renderedStyles["tx"].previous}px) translateY(${this.renderedStyles["ty"].previous}px)`;
        this.DOM.circleInner.setAttribute("r", this.renderedStyles["radius"].previous);

        requestAnimationFrame(() => this.render());
    }
    createTimeline() {
        // init timeline
        this.tl = gsap
            .timeline({
                paused: true,
                onStart: () => {
                    this.DOM.circleInner.style.filter = `url(${this.filterId}`;
                },
                onUpdate: () => {
                    this.DOM.feTurbulence.setAttribute("baseFrequency", this.primitiveValues.turbulence);
                },
                onComplete: () => {
                    this.DOM.circleInner.style.filter = "none";
                },
            })
            .to(this.primitiveValues, {
                duration: 0.4,
                ease: "Expo.easeOut",
                startAt: {
                    turbulence: 0
                },
                turbulence: 0.5,
            });
    }
    enter() {
        this.renderedStyles["radius"].current = 80;
        this.tl.restart();
    }
    leave() {
        this.renderedStyles["radius"].current = 60;
        this.tl.progress(1).kill();
    }
    listen() {
        this.on("enter", () => this.enter());
        this.on("leave", () => this.leave());
    }
}

const cursor = new Cursor(document.querySelector(".cursor"));

[...document.querySelectorAll("a")].forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.emit("enter"));
    el.addEventListener("mouseleave", () => cursor.emit("leave"));
});