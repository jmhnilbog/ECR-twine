/**
 * fitty v2.4.2 - Snugly resizes text to fit its parent container
 * Copyright (c) 2023 Rik Schennink <rik@pqina.nl> (https://pqina.nl/)
 */

!(function (e, t) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
        ? define(t)
        : ((e =
              'undefined' != typeof globalThis ? globalThis : e || self).fitty =
              t());
})(this, function () {
    'use strict';
    return (function (e) {
        if (e) {
            var t = function (e) {
                    return [].slice.call(e);
                },
                n = 0,
                i = 1,
                r = 2,
                o = 3,
                l = [],
                u = null,
                a =
                    'requestAnimationFrame' in e
                        ? function () {
                              var t =
                                  arguments.length > 0 &&
                                  void 0 !== arguments[0]
                                      ? arguments[0]
                                      : { sync: !1 };
                              e.cancelAnimationFrame(u);
                              var n = function () {
                                  return s(
                                      l.filter(function (e) {
                                          return e.dirty && e.active;
                                      })
                                  );
                              };
                              if (t.sync) return n();
                              u = e.requestAnimationFrame(n);
                          }
                        : function () {},
                c = function (e) {
                    return function (t) {
                        l.forEach(function (t) {
                            return (t.dirty = e);
                        }),
                            a(t);
                    };
                },
                s = function (e) {
                    e
                        .filter(function (e) {
                            return !e.styleComputed;
                        })
                        .forEach(function (e) {
                            e.styleComputed = y(e);
                        }),
                        e.filter(m).forEach(v);
                    var t = e.filter(p);
                    t.forEach(d),
                        t.forEach(function (e) {
                            v(e), f(e);
                        }),
                        t.forEach(S);
                },
                f = function (e) {
                    return (e.dirty = n);
                },
                d = function (e) {
                    (e.availableWidth = e.element.parentNode.clientWidth),
                        (e.currentWidth = e.element.scrollWidth),
                        (e.previousFontSize = e.currentFontSize),
                        (e.currentFontSize = Math.min(
                            Math.max(
                                e.minSize,
                                (e.availableWidth / e.currentWidth) *
                                    e.previousFontSize
                            ),
                            e.maxSize
                        )),
                        (e.whiteSpace =
                            e.multiLine && e.currentFontSize === e.minSize
                                ? 'normal'
                                : 'nowrap');
                },
                p = function (e) {
                    return (
                        e.dirty !== r ||
                        (e.dirty === r &&
                            e.element.parentNode.clientWidth !==
                                e.availableWidth)
                    );
                },
                y = function (t) {
                    var n = e.getComputedStyle(t.element, null);
                    return (
                        (t.currentFontSize = parseFloat(
                            n.getPropertyValue('font-size')
                        )),
                        (t.display = n.getPropertyValue('display')),
                        (t.whiteSpace = n.getPropertyValue('white-space')),
                        !0
                    );
                },
                m = function (e) {
                    var t = !1;
                    return (
                        !e.preStyleTestCompleted &&
                        (/inline-/.test(e.display) ||
                            ((t = !0), (e.display = 'inline-block')),
                        'nowrap' !== e.whiteSpace &&
                            ((t = !0), (e.whiteSpace = 'nowrap')),
                        (e.preStyleTestCompleted = !0),
                        t)
                    );
                },
                v = function (e) {
                    (e.element.style.whiteSpace = e.whiteSpace),
                        (e.element.style.display = e.display),
                        (e.element.style.fontSize = e.currentFontSize + 'px');
                },
                S = function (e) {
                    e.element.dispatchEvent(
                        new CustomEvent('fit', {
                            detail: {
                                oldValue: e.previousFontSize,
                                newValue: e.currentFontSize,
                                scaleFactor:
                                    e.currentFontSize / e.previousFontSize,
                            },
                        })
                    );
                },
                h = function (e, t) {
                    return function (n) {
                        (e.dirty = t), e.active && a(n);
                    };
                },
                b = function (e) {
                    return function () {
                        (l = l.filter(function (t) {
                            return t.element !== e.element;
                        })),
                            e.observeMutations && e.observer.disconnect(),
                            (e.element.style.whiteSpace =
                                e.originalStyle.whiteSpace),
                            (e.element.style.display = e.originalStyle.display),
                            (e.element.style.fontSize =
                                e.originalStyle.fontSize);
                    };
                },
                w = function (e) {
                    return function () {
                        e.active || ((e.active = !0), a());
                    };
                },
                z = function (e) {
                    return function () {
                        return (e.active = !1);
                    };
                },
                g = function (e) {
                    e.observeMutations &&
                        ((e.observer = new MutationObserver(h(e, i))),
                        e.observer.observe(e.element, e.observeMutations));
                },
                F = {
                    minSize: 16,
                    maxSize: 512,
                    multiLine: !0,
                    observeMutations: 'MutationObserver' in e && {
                        subtree: !0,
                        childList: !0,
                        characterData: !0,
                    },
                },
                W = null,
                E = function () {
                    e.clearTimeout(W),
                        (W = e.setTimeout(c(r), C.observeWindowDelay));
                },
                M = ['resize', 'orientationchange'];
            return (
                Object.defineProperty(C, 'observeWindow', {
                    set: function (t) {
                        var n = ''.concat(
                            t ? 'add' : 'remove',
                            'EventListener'
                        );
                        M.forEach(function (t) {
                            e[n](t, E);
                        });
                    },
                }),
                (C.observeWindow = !0),
                (C.observeWindowDelay = 100),
                (C.fitAll = c(o)),
                C
            );
        }
        function x(e, t) {
            var n = Object.assign({}, F, t),
                i = e.map(function (e) {
                    var t = Object.assign({}, n, { element: e, active: !0 });
                    return (
                        (function (e) {
                            (e.originalStyle = {
                                whiteSpace: e.element.style.whiteSpace,
                                display: e.element.style.display,
                                fontSize: e.element.style.fontSize,
                            }),
                                g(e),
                                (e.newbie = !0),
                                (e.dirty = !0),
                                l.push(e);
                        })(t),
                        {
                            element: e,
                            fit: h(t, o),
                            unfreeze: w(t),
                            freeze: z(t),
                            unsubscribe: b(t),
                        }
                    );
                });
            return a(), i;
        }
        function C(e) {
            var n =
                arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
            return 'string' == typeof e
                ? x(t(document.querySelectorAll(e)), n)
                : x([e], n)[0];
        }
    })('undefined' == typeof window ? null : window);
});