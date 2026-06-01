<b:includable id='allJavaScripts'>
  <script>
            //<![CDATA[
            /*! smooth-scroll js from Chris Ferdinandi (http://github.com/cferdinandi/smooth-scroll) */
            !(function () {
              var e, t;
              ((e =
                "undefined" != typeof global
                  ? global
                  : "undefined" != typeof window
                    ? window
                    : this),
                (t = function (e) {
                  "use strict";
                  var t = {
                      ignore: "[data-scroll-ignore]",
                      header: null,
                      topOnEmptyHash: !0,
                      speed: 500,
                      speedAsDuration: !1,
                      durationMax: null,
                      durationMin: null,
                      clip: !0,
                      offset: 0,
                      easing: "easeInOutCubic",
                      customEasing: null,
                      updateURL: !0,
                      popstate: !0,
                      emitEvents: !0,
                    },
                    n = function () {
                      var e = {};
                      return (
                        Array.prototype.forEach.call(arguments, function (t) {
                          for (var n in t) {
                            if (!t.hasOwnProperty(n)) return;
                            e[n] = t[n];
                          }
                        }),
                        e
                      );
                    },
                    o = function (e) {
                      "#" === e.charAt(0) && (e = e.substr(1));
                      for (
                        var t,
                          n = String(e),
                          o = n.length,
                          a = -1,
                          r = "",
                          i = n.charCodeAt(0);
                        ++a < o;
                      ) {
                        if (0 === (t = n.charCodeAt(a)))
                          throw new InvalidCharacterError(
                            "Invalid character: the input contains U+0000.",
                          );
                        r +=
                          (1 <= t && t <= 31) ||
                          127 == t ||
                          (0 === a && 48 <= t && t <= 57) ||
                          (1 === a && 48 <= t && t <= 57 && 45 === i)
                            ? "\\" + t.toString(16) + " "
                            : 128 <= t ||
                                45 === t ||
                                95 === t ||
                                (48 <= t && t <= 57) ||
                                (65 <= t && t <= 90) ||
                                (97 <= t && t <= 122)
                              ? n.charAt(a)
                              : "\\" + n.charAt(a);
                      }
                      return "#" + r;
                    },
                    a = function () {
                      return Math.max(
                        document.body.scrollHeight,
                        document.documentElement.scrollHeight,
                        document.body.offsetHeight,
                        document.documentElement.offsetHeight,
                        document.body.clientHeight,
                        document.documentElement.clientHeight,
                      );
                    },
                    r = function (t, n, o, a) {
                      if (n.emitEvents && "function" == typeof e.CustomEvent) {
                        var r = new CustomEvent(t, {
                          bubbles: !0,
                          detail: { anchor: o, toggle: a },
                        });
                        document.dispatchEvent(r);
                      }
                    };
                  return function (i, s) {
                    var c,
                      u,
                      l,
                      d,
                      f = {
                        cancelScroll: function (e) {
                          (cancelAnimationFrame(d), (d = null), e || r("scrollCancel", c));
                        },
                        animateScroll: function (o, i, s) {
                          f.cancelScroll();
                          var u = n(c || t, s || {}),
                            m = "[object Number]" === Object.prototype.toString.call(o),
                            h = m || !o.tagName ? null : o;
                          if (m || h) {
                            var p = e.pageYOffset;
                            u.header && !l && (l = document.querySelector(u.header));
                            var g,
                              y,
                              v,
                              S,
                              E,
                              b,
                              O,
                              I,
                              M = (function (t) {
                                return t
                                  ? ((n = t),
                                    parseInt(e.getComputedStyle(n).height, 10) +
                                      t.offsetTop)
                                  : 0;
                                var n;
                              })(l),
                              A = m
                                ? o
                                : (function (t, n, o, r) {
                                    var i = 0;
                                    if (t.offsetParent)
                                      for (; (i += t.offsetTop), (t = t.offsetParent); );
                                    return (
                                      (i = Math.max(i - n - o, 0)),
                                      r && (i = Math.min(i, a() - e.innerHeight)),
                                      i
                                    );
                                  })(
                                    h,
                                    M,
                                    parseInt(
                                      "function" == typeof u.offset
                                        ? u.offset(o, i)
                                        : u.offset,
                                      10,
                                    ),
                                    u.clip,
                                  ),
                              C = A - p,
                              w = a(),
                              L = 0,
                              H =
                                ((g = C),
                                (v = (y = u).speedAsDuration
                                  ? y.speed
                                  : Math.abs((g / 1e3) * y.speed)),
                                y.durationMax && v > y.durationMax
                                  ? y.durationMax
                                  : y.durationMin && v < y.durationMin
                                    ? y.durationMin
                                    : parseInt(v, 10)),
                              q = function (t) {
                                var n, a, s;
                                (S || (S = t),
                                  (L += t - S),
                                  (b =
                                    p +
                                    C *
                                      ((a = E = 1 < (E = 0 === H ? 0 : L / H) ? 1 : E),
                                      "easeInQuad" === (n = u).easing && (s = a * a),
                                      "easeOutQuad" === n.easing && (s = a * (2 - a)),
                                      "easeInOutQuad" === n.easing &&
                                        (s = a < 0.5 ? 2 * a * a : (4 - 2 * a) * a - 1),
                                      "easeInCubic" === n.easing && (s = a * a * a),
                                      "easeOutCubic" === n.easing && (s = --a * a * a + 1),
                                      "easeInOutCubic" === n.easing &&
                                        (s =
                                          a < 0.5
                                            ? 4 * a * a * a
                                            : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1),
                                      "easeInQuart" === n.easing && (s = a * a * a * a),
                                      "easeOutQuart" === n.easing &&
                                        (s = 1 - --a * a * a * a),
                                      "easeInOutQuart" === n.easing &&
                                        (s =
                                          a < 0.5
                                            ? 8 * a * a * a * a
                                            : 1 - 8 * --a * a * a * a),
                                      "easeInQuint" === n.easing && (s = a * a * a * a * a),
                                      "easeOutQuint" === n.easing &&
                                        (s = 1 + --a * a * a * a * a),
                                      "easeInOutQuint" === n.easing &&
                                        (s =
                                          a < 0.5
                                            ? 16 * a * a * a * a * a
                                            : 1 + 16 * --a * a * a * a * a),
                                      n.customEasing && (s = n.customEasing(a)),
                                      s || a)),
                                  e.scrollTo(0, Math.floor(b)),
                                  (function (t, n) {
                                    var a,
                                      s,
                                      c,
                                      l = e.pageYOffset;
                                    if (
                                      t == n ||
                                      l == n ||
                                      (p < n && e.innerHeight + l) >= w
                                    )
                                      return (
                                        f.cancelScroll(!0),
                                        (s = n),
                                        (c = m),
                                        0 === (a = o) && document.body.focus(),
                                        c ||
                                          (a.focus(),
                                          document.activeElement !== a &&
                                            (a.setAttribute("tabindex", "-1"),
                                            a.focus(),
                                            (a.style.outline = "none")),
                                          e.scrollTo(0, s)),
                                        r("scrollStop", u, o, i),
                                        !(d = S = null)
                                      );
                                  })(b, A) || ((d = e.requestAnimationFrame(q)), (S = t)));
                              };
                            (0 === e.pageYOffset && e.scrollTo(0, 0),
                              (O = o),
                              (I = u),
                              m ||
                                (history.pushState &&
                                  I.updateURL &&
                                  history.pushState(
                                    { smoothScroll: JSON.stringify(I), anchor: O.id },
                                    document.title,
                                    O === document.documentElement ? "#top" : "#" + O.id,
                                  )),
                              "matchMedia" in e &&
                              e.matchMedia("(prefers-reduced-motion)").matches
                                ? e.scrollTo(0, Math.floor(A))
                                : (r("scrollStart", u, o, i),
                                  f.cancelScroll(!0),
                                  e.requestAnimationFrame(q)));
                          }
                        },
                      },
                      m = function (t) {
                        if (
                          !t.defaultPrevented &&
                          !(0 !== t.button || t.metaKey || t.ctrlKey || t.shiftKey) &&
                          "closest" in t.target &&
                          (u = t.target.closest(i)) &&
                          "a" === u.tagName.toLowerCase() &&
                          !t.target.closest(c.ignore) &&
                          u.hostname === e.location.hostname &&
                          u.pathname === e.location.pathname &&
                          /#/.test(u.href)
                        ) {
                          var n, a;
                          try {
                            n = o(decodeURIComponent(u.hash));
                          } catch (t) {
                            n = o(u.hash);
                          }
                          if ("#" === n) {
                            if (!c.topOnEmptyHash) return;
                            a = document.documentElement;
                          } else a = document.querySelector(n);
                          (a = a || "#top" !== n ? a : document.documentElement) &&
                            (t.preventDefault(),
                            (function (t) {
                              if (history.replaceState && t.updateURL && !history.state) {
                                var n = e.location.hash;
                                ((n = n || ""),
                                  history.replaceState(
                                    {
                                      smoothScroll: JSON.stringify(t),
                                      anchor: n || e.pageYOffset,
                                    },
                                    document.title,
                                    n || e.location.href,
                                  ));
                              }
                            })(c),
                            f.animateScroll(a, u));
                        }
                      },
                      h = function (e) {
                        if (
                          null !== history.state &&
                          history.state.smoothScroll &&
                          history.state.smoothScroll === JSON.stringify(c)
                        ) {
                          var t = history.state.anchor;
                          ("string" == typeof t &&
                            t &&
                            !(t = document.querySelector(o(history.state.anchor)))) ||
                            f.animateScroll(t, null, { updateURL: !1 });
                        }
                      };
                    return (
                      (f.destroy = function () {
                        c &&
                          (document.removeEventListener("click", m, !1),
                          e.removeEventListener("popstate", h, !1),
                          f.cancelScroll(),
                          (d = l = u = c = null));
                      }),
                      (function () {
                        if (
                          !(
                            "querySelector" in document &&
                            "addEventListener" in e &&
                            "requestAnimationFrame" in e &&
                            "closest" in e.Element.prototype
                          )
                        )
                          throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                        (f.destroy(),
                          (c = n(t, s || {})),
                          (l = c.header ? document.querySelector(c.header) : null),
                          document.addEventListener("click", m, !1),
                          c.updateURL &&
                            c.popstate &&
                            e.addEventListener("popstate", h, !1));
                      })(),
                      f
                    );
                  };
                }),
                "function" == typeof define && define.amd
                  ? define([], function () {
                      return t(e);
                    })
                  : "object" == typeof exports
                    ? (module.exports = t(e))
                    : (e.SmoothScroll = t(e)));
            })();
            !(function () {
              var e, t, n, o, i, r, u;
              ((u = { menuSticky: !0 }),
                optionLinkMagz(u),
                1 == u.menuSticky &&
                  ((e = document
                    .querySelector("#header-outer")
                    .getBoundingClientRect().height),
                  (t = document.querySelector("#navmenu-wrap-sticky")),
                  (n = document.querySelector(".nav-copy")),
                  (o = document.querySelector(".nav-original")),
                  (i = document.querySelector(".sidebar-sticky")),
                  (r = "navsticky-show"),
                  null != o && (n.innerHTML = o.innerHTML),
                  null != o &&
                    (window.addEventListener("resize", function () {
                      e = document
                        .querySelector("#header-outer")
                        .getBoundingClientRect().height;
                    }),
                    window.addEventListener("scroll", function () {
                      Math.round(window.pageYOffset) >= e
                        ? t.classList.add(r)
                        : t.classList.remove(r);
                    })),
                  null != i && (i.style.top = "88px"),
                  (function () {
                    for (
                      var e = document.querySelectorAll(".menu-sticky a"), t = 0;
                      t < e.length;
                      t++
                    )
                      e[t].setAttribute("tabindex", "-1");
                  })()));
            })();
            ((function () {
              var e = document.querySelector(".navmenu-content"),
                t = document.querySelector("#navmenu-sidebar-body"),
                n = document.querySelectorAll(".navmenu-button"),
                l = document.querySelector("#navmenu-overlay"),
                u = document.querySelector("#navmenu-sidebar-closebtn"),
                r = document.querySelector("#navmenu"),
                s = "navmenu-activated";
              null !== e && (t.innerHTML = e.innerHTML);
              for (
                var c = function (e) {
                    (e.preventDefault(), r.classList.add(s));
                  },
                  i = 0;
                i < n.length;
                i++
              )
                n[i].addEventListener("click", c);
              var o = function (e) {
                (e.preventDefault(), r.classList.remove(s));
              };
              (null !== l && l.addEventListener("click", o),
                null !== u && u.addEventListener("click", o));
            })(),
              (function () {
                "use strict";
                for (
                  var e = document.querySelectorAll(
                      "#navmenu-sidebar-body > ul > li.has-sub",
                    ),
                    t = function (e) {
                      var t = this.nextElementSibling,
                        n = t.scrollHeight;
                      t.clientHeight
                        ? ((t.style.height = "0px"),
                          this.classList.remove("ms-submenu-shown"))
                        : ((t.style.height = n + "px"),
                          this.classList.add("ms-submenu-shown"));
                    },
                    n = function () {
                      var e = document.createElement("span");
                      return (e.setAttribute("class", "ms-submenu-button"), e);
                    },
                    l = 0;
                  l < e.length;
                  l++
                ) {
                  var u = n(),
                    r = e[l].querySelector("ul");
                  (e[l].insertBefore(u, e[l].lastElementChild),
                    r && ((r.style.height = "0"), (r.style.overflow = "hidden")),
                    u.addEventListener("click", t));
                }
              })());
            !(function () {
              var e = document.getElementById("searchcontainer"),
                n = document.getElementById("search-terms"),
                t = document.querySelectorAll(".iconsearch-label");
              if (null != e && null != n) {
                for (var c = 0; c < t.length; c++)
                  t[c].addEventListener(
                    "click",
                    function (t) {
                      (e.classList.toggle("opensearch"),
                        e.classList.contains("opensearch") ||
                          (n.blur(), t.preventDefault()),
                        t.stopPropagation());
                    },
                    !1,
                  );
                (n.addEventListener(
                  "click",
                  function (e) {
                    e.stopPropagation();
                  },
                  !1,
                ),
                  document.addEventListener(
                    "click",
                    function (t) {
                      (e.classList.remove("opensearch"), n.blur(), t.stopPropagation());
                    },
                    !1,
                  ),
                  document.addEventListener("keydown", function (t) {
                    "Escape" == t.key && (e.classList.remove("opensearch"), n.blur());
                  }));
              }
            })();
            !(function () {
              var e = document.querySelector(".featured-img-bg");
              if (e) {
                var t = e.querySelector("img");
                (r("data-src"), r("srcset"));
              }
              function r(e) {
                let r = t.getAttribute(e);
                r && ((r = r.replace(/-p-k-no-nu/g, "-c-rw")), t.setAttribute(e, r));
              }
            })();
            Defer(
              function () {
                let e = document.getElementById("comment-editor");
                if (!e) return;
                let t = e.src.split("#"),
                  n = document.getElementById("comment-editor"),
                  i = document.getElementById("custom-comment-form");
                (document.addEventListener("click", function (e) {
                  if ("btn-reply" !== e.target.className) return;
                  let l = e.target.dataset.commentId,
                    c = document.getElementById("c" + l).querySelector(".comment-starter");
                  ((n.style.visibility = "hidden"),
                    (n.src = t[0] + "&parentID=" + l + "#" + t[1]),
                    c.appendChild(i),
                    (n.onload = function () {
                      this.style.visibility = "visible";
                    }));
                }),
                  document.addEventListener("click", function (e) {
                    if ("btn-cancel" !== e.target.className) return;
                    let l = document.querySelector(".toplevel-thread");
                    ((n.style.visibility = "hidden"),
                      (n.src = t[0] + "#" + t[1]),
                      l.parentNode.insertBefore(i, l.nextSibling),
                      (n.onload = function () {
                        this.style.visibility = "visible";
                      }));
                  }));
              },
              0,
              !0,
            );

            //]]>
            <b:if cond='data:view.isHomepage'>
                //<![CDATA[
                /*! Simple AJAX infinite scroll from dte.web.id */
                !(function () {
                  var t, e, n;
                  ((n = { infiniteScrollNav: !0 }),
                    optionLinkMagz(n),
                    1 == n.infiniteScrollNav &&
                      ((t = window),
                      (e = document),
                      (t.InfiniteScroll = function (n) {
                        function r(t, n) {
                          return (n = n || e).querySelectorAll(t);
                        }
                        function o(t) {
                          return void 0 !== t;
                        }
                        function a(t) {
                          return "function" == typeof t;
                        }
                        function i(t, e) {
                          if (o(c[t])) for (var n in c[t]) c[t][n](e);
                        }
                        function s() {
                          return (
                            (v.innerHTML = d.text.loading),
                            (g = !0),
                            T
                              ? (H.classList.add(d.state.loading),
                                i("loading", [d]),
                                void u(
                                  T,
                                  function (t, n) {
                                    ((H.className = M + " " + d.state.load),
                                      ((f = e.createElement("div")).innerHTML = t));
                                    var o = r("title", f),
                                      a = r(d.target.post, f),
                                      s = r(d.target.anchors + " " + d.target.anchor, f),
                                      c = r(d.target.post, h);
                                    if (
                                      ((o = o && o[0] ? o[0].innerHTML : ""),
                                      a.length && c.length)
                                    ) {
                                      var u = c[c.length - 1];
                                      ((e.title = o),
                                        u.insertAdjacentHTML(
                                          "afterend",
                                          '<span class="fi" id="#fi:' + S + '"></span>',
                                        ),
                                        (f = e.createElement("div")));
                                      for (var p = 0, v = a.length; v > p; ++p)
                                        f.appendChild(a[p]);
                                      (u.insertAdjacentHTML("afterend", f.innerHTML),
                                        l(),
                                        (T = !!s.length && s[0].href),
                                        (g = !1),
                                        S++,
                                        i("load", [d, t, n]));
                                    }
                                  },
                                  function (t, e) {
                                    (H.classList.add(d.state.error),
                                      (g = !1),
                                      l(1),
                                      i("error", [d, t, e]));
                                  },
                                ))
                              : (H.classList.add(d.state.loaded),
                                (v.innerHTML = d.text.loaded),
                                i("loaded", [d]))
                          );
                        }
                        function l(t) {
                          if (((v.innerHTML = ""), p)) {
                            f.innerHTML = d.text[t ? "error" : "load"];
                            var e = f.firstChild;
                            ((e.onclick = function () {
                              return (2 === d.type && (p = !1), s(), !1);
                            }),
                              v.appendChild(e));
                          }
                        }
                        var d = {
                            target: {
                              posts: ".posts",
                              post: ".post",
                              anchors: ".anchors",
                              anchor: ".anchor",
                            },
                            text: { load: "%s", loading: "%s", loaded: "%s", error: "%s" },
                            state: {
                              load: (u = "infinite-scroll-state-") + "load",
                              loading: u + "loading",
                              loaded: u + "loaded",
                              error: u + "error",
                            },
                          },
                          c = { load: [], loading: [], loaded: [], error: [] };
                        ((d = (function t(e, n) {
                          for (var r in ((e = e || {}), n))
                            e[r] = "object" == typeof n[r] ? t(e[r], n[r]) : n[r];
                          return e;
                        })(d, n || {})),
                          (d.on = function (t, e, n) {
                            return o(t)
                              ? o(e)
                                ? void (o(n) ? (c[t][n] = e) : c[t].push(e))
                                : c[t]
                              : c;
                          }),
                          (d.off = function (t, e) {
                            o(e) ? delete c[t][e] : (c[t] = []);
                          }));
                        var f = null,
                          u = function (e, n, r) {
                            if (t.XMLHttpRequest) {
                              var o = new XMLHttpRequest();
                              ((o.onreadystatechange = function () {
                                if (4 === o.readyState) {
                                  if (200 !== o.status)
                                    return void (r && a(r) && r(o.responseText, o));
                                  n && a(n) && n(o.responseText, o);
                                }
                              }),
                                o.open("GET", e),
                                o.send());
                            }
                          },
                          p = 1 !== d.type,
                          g = !1,
                          h = r(d.target.posts)[0],
                          v = r(d.target.anchors)[0],
                          T = r(d.target.anchor, v),
                          L = e.body,
                          H = e.documentElement,
                          M = H.className || "",
                          m = h.offsetTop + h.offsetHeight,
                          y = t.innerHeight,
                          x = 0,
                          E = null,
                          S = 1;
                        if (T.length) {
                          ((T = T[0].href),
                            h.insertAdjacentHTML(
                              "afterbegin",
                              '<span class="fi" id="#fi:0"></span>',
                            ),
                            (f = e.createElement("div")),
                            l());
                          var j = function () {
                            ((m = h.offsetTop + h.offsetHeight),
                              (y = t.innerHeight),
                              (x = L.scrollTop || H.scrollTop),
                              g || m > x + y || s());
                          };
                          (j(),
                            0 !== d.type &&
                              t.addEventListener(
                                "scroll",
                                function () {
                                  p || (E && t.clearTimeout(E), (E = t.setTimeout(j, 500)));
                                },
                                !1,
                              ));
                        }
                        return d;
                      })));
                })();
                //]]>
                if(typeof InfiniteScroll !== &#39;undefined&#39;) {
                    var infinite_scroll = new InfiniteScroll({
                        type: 0,
                        target: {
                            posts: &quot;.content&quot;,
                            post: &quot;.post-outer&quot;,
                            anchors: &quot;.blog-pager&quot;,
                            anchor: &quot;.blog-pager-older-link&quot;
                        },
                        text: {
                            load: &quot;<a class='js-load' href='javascript:;'><data:messages.morePosts/></a>&quot;,
                            loading: &quot;<span class='js-loading'><data:messages.loading/></span>&quot;,
                            loaded: &quot;<span class='js-loaded' style='display:none'>Habis.</span>&quot;,
                            error: &quot;<a class='js-error' href='javascript:;'>Error.</a>&quot;
                        }
                    });
                }
            </b:if>
            <b:if cond='data:view.isMultipleItems'>
                //<![CDATA[
                !(function () {
                  function e() {
                    for (
                      var e, n, t = document.querySelectorAll(".post-outer"), r = 0;
                      r < t.length;
                      r++
                    )
                      ((e = t[r].querySelector(".post-snippet")),
                        null !== (n = t[r].querySelector(".js-post-snippet")) &&
                          (e.innerHTML = n.innerHTML.slice(4, -3)));
                  }
                  var n, t;
                  ((n = document.querySelector(".featured-info .featured-desc")),
                    null !== (t = document.querySelector(".featured-info .js-featured-desc")) &&
                      (n.innerHTML = t.innerHTML.slice(4, -3)),
                    e(),
                    "undefined" != typeof infinite_scroll &&
                      infinite_scroll.on("load", function () {
                        e();
                      }));
                })();
                //]]>
            </b:if>
            <b:if cond='data:view.isPost or data:view.isPage'>
                //<![CDATA[
                /* TOC js from www.cssscript.com/generating-a-table-of-contents-with-pure-javascript-toc */
                !(function () {
                  !(function (e) {
                    var t = function (e) {
                        if ("string" != typeof e) return 0;
                        var t = e.match(/\d/g);
                        return t ? Math.min.apply(null, t) : 1;
                      },
                      n = function (e, t) {
                        return t < 0
                          ? n(e.parentElement, t + 1)
                          : t > 0
                            ? (function (e, t) {
                                for (; t--; ) {
                                  var n = document.createElement("ol");
                                  (e.appendChild(n), (e = n));
                                }
                                return e;
                              })(e, t)
                            : e.parentElement;
                      },
                      o = function (e) {
                        var o = (e = (function (e, t) {
                          for (var n in t) t.hasOwnProperty(n) && t[n] && (e[n] = t[n]);
                          return e;
                        })(
                          {
                            selector: "h1, h2, h3, h4, h5, h6",
                            scope: "body",
                            overwrite: !1,
                            prefix: "toc",
                          },
                          e,
                        )).selector;
                        if ("string" != typeof o)
                          throw new TypeError("selector must be a string");
                        if (!o.match(/^(?:h[1-6],?\s*)*$/g))
                          throw new TypeError("selector must contains only h1-6");
                        var r = location.hash;
                        return (
                          r &&
                            setTimeout(function () {
                              ((location.hash = ""), (location.hash = r));
                            }, 0),
                          (function (e) {
                            var o,
                              r,
                              i = e.selector,
                              c = e.scope,
                              l = document.createElement("ol"),
                              a = l,
                              u =
                                ((o = e.overwrite),
                                (r = e.prefix),
                                function (e, t, n) {
                                  e.textContent;
                                  var i = r + "-" + n;
                                  t.textContent = e.textContent;
                                  var c = o ? i : e.id || i;
                                  ((c = encodeURIComponent(c)), (e.id = c), (t.href = "#" + c));
                                });
                            return (
                              (function (e, t) {
                                var n = [],
                                  o = document.querySelectorAll(t);
                                return (
                                  Array.prototype.forEach.call(o, function (t) {
                                    var o = t.querySelectorAll(e);
                                    n = n.concat(Array.prototype.slice.call(o));
                                  }),
                                  n
                                );
                              })(i, c).reduce(function (e, o, r) {
                                var i = t(o.tagName),
                                  c = n(a, i - e) || l,
                                  h = document.createElement("li"),
                                  d = document.createElement("a");
                                return (
                                  u(o, d, r),
                                  c.appendChild(h).appendChild(d),
                                  (a = h),
                                  i
                                );
                              }, t(i)),
                              l
                            );
                          })(e)
                        );
                      };
                    "function" == typeof define && define.amd
                      ? define("toc", [], function () {
                          return o;
                        })
                      : (e.initTOC = o);
                  })(window);
                  var e,
                    t,
                    n = document.getElementById("toc"),
                    o = initTOC({ selector: "h2, h3", scope: ".post-body" });
                  null != n &&
                    (n.appendChild(o),
                    (e = document.querySelector(".toc")),
                    (t = { judulTOC: "Daftar Isi", showHideTOC: !0 }),
                    optionLinkMagz(t),
                    null != e && (e.innerHTML = t.judulTOC),
                    (function () {
                      var e = { tocHide: !0, showText: "(show)", hideText: "(hide)" };
                      optionLinkMagz(e);
                      var t = document.querySelector(".toc"),
                        n = document.createElement("button"),
                        o = document.querySelector("#toc ol");
                      (t.appendChild(n),
                        (o.style.height = "0"),
                        (o.style.overflow = "hidden"),
                        (n.innerHTML = e.showText),
                        n.addEventListener("click", function () {
                          var t = o.scrollHeight;
                          o.clientHeight
                            ? ((o.style.height = "0"), (n.innerHTML = e.showText))
                            : ((o.style.height = t + "px"), (n.innerHTML = e.hideText));
                        }));
                    })());
                })();
                //]]>
            </b:if>
            //<![CDATA[
                (Defer.dom("img.lazyload", 100, "loaded", null, { rootMargin: "1px" }),
                "undefined" != typeof infinite_scroll &&
                  infinite_scroll.on("load", function () {
                    Defer.dom("img.lazyload", 100, "loaded", null, { rootMargin: "1px" });
                  }),
                new SmoothScroll('a[href*="#"]', {
                  speed: 600,
                  speedAsDuration: !0,
                  easing: "easeInOutCubic",
                }));
            //]]>
        </script>
</b:includable>