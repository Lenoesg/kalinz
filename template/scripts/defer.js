<script>
    //<![CDATA[
    /* template option */
    var linkMagzSetting;
    function optionLinkMagz(i) {
      if (void 0 !== linkMagzSetting)
        for (var n in linkMagzSetting)
          linkMagzSetting.hasOwnProperty(n) &&
            void 0 !== linkMagzSetting[n] &&
            (i[n] = linkMagzSetting[n]);
    }
    /* shinsenter/defer.js */
    !(function () {
      !(function (n, t, e) {
        function c(n, t, o) {
          k
            ? S(n, t)
            : ((o = o === e ? c.lazy : o) ? N : C).push(
                n,
                Math.max(o ? 350 : 0, t),
              );
        }
        function o(n) {
          j.head.appendChild(n);
        }
        function i(n, t) {
          n.forEach(function (n) {
            t(n);
          });
        }
        function u(t, e, c, o) {
          i(e.split(" "), function (e) {
            (o || n)[t + "EventListener"](e, c || d);
          });
        }
        function r(n, t, c, o) {
          return (
            (o = t ? j.getElementById(t) : e) ||
              ((o = j.createElement(n)), t && (o.id = t)),
            c && u(y, p, c, o),
            o
          );
        }
        function f(n, t) {
          i(q.call(n.attributes), function (n) {
            t(n.name, n.value);
          });
        }
        function s(n, t) {
          return q.call((t || j).querySelectorAll(n));
        }
        function a(n, t) {
          (i(s("source,img", n), a),
            f(n, function (t, e, c) {
              (c = /^data-(.+)/.exec(t)) && n[x](c[1], e);
            }),
            t && (n.className += " " + t),
            n[p] && n[p]());
        }
        function l(n, t, e) {
          c(
            function (t) {
              (i((t = s(n || "script[type=deferjs]")), function (n, t) {
                n.src &&
                  ((t = r(h)),
                  f(n, function (n, e) {
                    n != A && t[x]("src" == n ? "href" : n, e);
                  }),
                  (t.rel = "preload"),
                  (t.as = m),
                  o(t));
              }),
                (function n(e, c) {
                  (e = t[E]()) &&
                    ((c = r(m)),
                    f(e, function (n, t) {
                      n != A && c[x](n, t);
                    }),
                    (c.text = e.text),
                    e.parentNode.replaceChild(c, e),
                    c.src && !c.getAttribute("async")
                      ? u(y, p + " error", n, c)
                      : n());
                })());
            },
            t,
            e,
          );
        }
        function d(n, t) {
          for (
            t = k ? (u(b, g), N) : (u(b, w), (k = c), N[0] && u(y, g), C);
            t[0];
          )
            S(t[E](), t[E]());
        }
        var h = "link",
          m = "script",
          p = "load",
          v = "pageshow",
          y = "add",
          b = "remove",
          g = "touchstart mousemove mousedown keydown wheel",
          w = "on" + v in n ? v : p,
          x = "setAttribute",
          E = "shift",
          A = "type",
          I = n.IntersectionObserver,
          j = n.document || n,
          k = /p/.test(j.readyState),
          C = [],
          N = [],
          S = n.setTimeout,
          q = C.slice;
        ((c.all = l),
          (c.dom = function (n, o, u, r, f) {
            c(
              function (o) {
                function l(n) {
                  (r && !1 === r(n)) || a(n, u);
                }
                ((o = I
                  ? new I(function (n) {
                      i(n, function (n, t) {
                        n.isIntersecting && (o.unobserve((t = n.target)), l(t));
                      });
                    }, f)
                  : e),
                  i(s(n || "[data-src]"), function (n) {
                    n[t] || ((n[t] = c), o ? o.observe(n) : l(n));
                  }));
              },
              o,
              !1,
            );
          }),
          (c.css = function (n, t, e, i, u) {
            c(
              function (e) {
                (((e = r(h, t, i)).rel = "stylesheet"), (e.href = n), o(e));
              },
              e,
              u,
            );
          }),
          (c.js = function (n, t, e, i, u) {
            c(
              function (e) {
                (((e = r(m, t, i)).src = n), o(e));
              },
              e,
              u,
            );
          }),
          (c.reveal = a),
          (n[t] = c),
          k || u(y, w),
          l());
      })(this, "Defer");
    })();
    //]]>
  </script>