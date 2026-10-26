/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <head> (template.xml baris ke 135 - 138) */
/* template option */
var linkMagzSetting;
function optionLinkMagz(i) {
  if (linkMagzSetting !== undefined) {
    for (var n in linkMagzSetting) {
      if (linkMagzSetting.hasOwnProperty(n) && linkMagzSetting[n] !== undefined) {
        i[n] = linkMagzSetting[n];
      }
    }
  }
}
/* shinsenter/defer.js */
(function () {
  (function (n, t, e) {
    function c(n, t, o) {
      if (k) {
        S(n, t);
      } else {
        ((o = o === e ? c.lazy : o) ? N : C).push(n, Math.max(o ? 350 : 0, t));
      }
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
      if (!(o = t ? j.getElementById(t) : e)) {
        o = j.createElement(n);
        if (t) {
          o.id = t;
        }
      }
      if (c) {
        u(y, p, c, o);
      }
      return o;
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
      i(s("source,img", n), a);
      f(n, function (t, e, c) {
        if (c = /^data-(.+)/.exec(t)) {
          n[x](c[1], e);
        }
      });
      if (t) {
        n.className += " " + t;
      }
      if (n[p]) {
        n[p]();
      }
    }
    function l(n, t, e) {
      c(function (t) {
        i(t = s(n || "script[type=deferjs]"), function (n, t) {
          if (n.src) {
            t = r(h);
            f(n, function (n, e) {
              if (n != A) {
                t[x](n == "src" ? "href" : n, e);
              }
            });
            t.rel = "preload";
            t.as = m;
            o(t);
          }
        });
        (function n(e, c) {
          if (e = t[E]()) {
            c = r(m);
            f(e, function (n, t) {
              if (n != A) {
                c[x](n, t);
              }
            });
            c.text = e.text;
            e.parentNode.replaceChild(c, e);
            if (c.src && !c.getAttribute("async")) {
              u(y, p + " error", n, c);
            } else {
              n();
            }
          }
        })();
      }, t, e);
    }
    function d(n, t) {
      for (t = k ? (u(b, g), N) : (u(b, w), k = c, N[0] && u(y, g), C); t[0];) {
        S(t[E](), t[E]());
      }
    }
    var h = "link";
    var m = "script";
    var p = "load";
    var v = "pageshow";
    var y = "add";
    var b = "remove";
    var g = "touchstart mousemove mousedown keydown wheel";
    var w = "on" + v in n ? v : p;
    var x = "setAttribute";
    var E = "shift";
    var A = "type";
    var I = n.IntersectionObserver;
    var j = n.document || n;
    var k = /p/.test(j.readyState);
    var C = [];
    var N = [];
    var S = n.setTimeout;
    var q = C.slice;
    c.all = l;
    c.dom = function (n, o, u, r, f) {
      c(function (o) {
        function l(n) {
          if (!r || r(n) !== false) {
            a(n, u);
          }
        }
        o = I ? new I(function (n) {
          i(n, function (n, t) {
            if (n.isIntersecting) {
              o.unobserve(t = n.target);
              l(t);
            }
          });
        }, f) : e;
        i(s(n || "[data-src]"), function (n) {
          if (!n[t]) {
            n[t] = c;
            if (o) {
              o.observe(n);
            } else {
              l(n);
            }
          }
        });
      }, o, false);
    };
    c.css = function (n, t, e, i, u) {
      c(function (e) {
        (e = r(h, t, i)).rel = "stylesheet";
        e.href = n;
        o(e);
      }, e, u);
    };
    c.js = function (n, t, e, i, u) {
      c(function (e) {
        (e = r(m, t, i)).src = n;
        o(e);
      }, e, u);
    };
    c.reveal = a;
    n[t] = c;
    if (!k) {
      u(y, w);
    }
    l();
  })(this, "Defer");
})();


/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <b:includable id='relatedPostScript'> (template.xml baris ke 770 - 771) */
// Related Post — simplified, 1 request, label pertama
(function () {
  var e = {
    relatedTitleOuterOpen: "<div class=\"related-title\"><p class=\"ms-title\">",
    relatedTitleOuterClose: "</p></div>",
    relatedTitleText: "Artikel Terkait",
    relatedOuter: "ms-related-post"
  };
  for (var t in relatedConfig) {
    if (relatedConfig[t] !== undefined) {
      e[t] = relatedConfig[t];
    }
  }
  var l = {
    relatedPosts: true,
    jumlahRelatedPosts: 3,
    judulRelatedPosts: e.relatedTitleText
  };
  optionLinkMagz(l);
  if (l.relatedPosts && typeof postLabels != "undefined" && postLabels.length) {
    var r = (postLabels[1] || postLabels[0]).replace(/&amp;/g, "&");
    window.msRelatedPosts = function (t) {
      if (t.feed && t.feed.entry) {
        var r = t.feed.entry;
        var a = document.getElementById(e.relatedOuter);
        if (a) {
          var n = e.relatedTitleOuterOpen + l.judulRelatedPosts + e.relatedTitleOuterClose;
          n += "<ul class=\"ms-related-nothumb\">";
          for (var s = 0, o = 0; o < r.length && s < l.jumlahRelatedPosts; o++) {
            var i = "#";
            for (var u = 0; u < r[o].link.length; u++) {
              if (r[o].link[u].rel === "alternate") {
                i = r[o].link[u].href;
                break;
              }
            }
            if (i !== e.postUrl) {
              n += "<li><div class=\"related-title-outer\"><a href=\"" + i + "\">" + d(r[o].title.$t) + "</a></div></li>";
              s++;
            }
          }
          n += "</ul>";
          if (s > 0) {
            a.innerHTML = n;
          }
        }
      }
    };
    var a = function () {
      var t = document.createElement("script");
      t.async = true;
      t.src = e.homePageUrl.replace(/\/$/, "") + "/feeds/posts/default/-/" + encodeURIComponent(r) + "?alt=json-in-script&orderby=updated&max-results=" + (l.jumlahRelatedPosts + 1) + "&callback=msRelatedPosts";
      document.head.appendChild(t);
    };
    var n = document.getElementById(e.relatedOuter);
    if (n && "IntersectionObserver" in window) {
      var s = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) {
          s.disconnect();
          a();
        }
      }, {
        rootMargin: "600px 0px"
      });
      s.observe(n);
    } else {
      a();
    }
  }
  function d(e) {
    return (e || "").replace(/[&<>'"]/g, function (e) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        "\"": "&quot;"
      }[e] || e;
    });
  }
})();
(function () {
  var t;
  var o;
  var d;
  d = {
    fullwidthImage: true
  };
  optionLinkMagz(d);
  if (d.fullwidthImage == 1) {
    t = document.querySelector(".post-body img");
    if (o = document.querySelector(".post-body > .tr-caption-container")) {
      o.classList.add("fullwidth");
    } else if (t) {
      t.classList.add("fullwidth");
    }
  }
})();


/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <b:includable id='allJavaScripts'> (template.xml baris ke 779 - 786) */
function copyShareLink(t) {
  var i = t.getAttribute("data-url");
  return !!i && (navigator.clipboard && window.isSecureContext ? navigator.clipboard.writeText(i).catch(function () {
    window.prompt("Copy link:", i);
  }) : window.prompt("Copy link:", i), false);
}
/*! smooth-scroll js from Chris Ferdinandi (http://github.com/cferdinandi/smooth-scroll) */
(function () {
  var e = typeof global != "undefined" ? global : typeof window != "undefined" ? window : this;
  var t = function (E) {
    "use strict";

    function b() {
      var n = {};
      Array.prototype.forEach.call(arguments, function (e) {
        for (var t in e) {
          if (!e.hasOwnProperty(t)) {
            return;
          }
          n[t] = e[t];
        }
      });
      return n;
    }
    function i(e) {
      if (e.charAt(0) === "#") {
        e = e.substr(1);
      }
      var t;
      var n = String(e);
      for (var o = n.length, a = -1, r = "", i = n.charCodeAt(0); ++a < o;) {
        if ((t = n.charCodeAt(a)) === 0) {
          throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
        }
        r += t >= 1 && t <= 31 || t == 127 || a === 0 && t >= 48 && t <= 57 || a === 1 && t >= 48 && t <= 57 && i === 45 ? "\\" + t.toString(16) + " " : t >= 128 || t === 45 || t === 95 || t >= 48 && t <= 57 || t >= 65 && t <= 90 || t >= 97 && t <= 122 ? n.charAt(a) : "\\" + n.charAt(a);
      }
      return "#" + r;
    }
    function O() {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    }
    function I(e, t, n, o) {
      if (t.emitEvents && typeof E.CustomEvent == "function") {
        t = new CustomEvent(e, {
          bubbles: true,
          detail: {
            anchor: n,
            toggle: o
          }
        });
        document.dispatchEvent(t);
      }
    }
    var M = {
      ignore: "[data-scroll-ignore]",
      header: null,
      topOnEmptyHash: true,
      speed: 500,
      speedAsDuration: false,
      durationMax: null,
      durationMin: null,
      clip: true,
      offset: 0,
      easing: "easeInOutCubic",
      customEasing: null,
      updateURL: true,
      popstate: true,
      emitEvents: true
    };
    return function (a, e) {
      function t(e) {
        if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && "closest" in e.target && (r = e.target.closest(a)) && r.tagName.toLowerCase() === "a" && !e.target.closest(y.ignore) && r.hostname === E.location.hostname && r.pathname === E.location.pathname && /#/.test(r.href)) {
          var t;
          try {
            n = i(decodeURIComponent(r.hash));
          } catch (e) {
            n = i(r.hash);
          }
          if (n === "#") {
            if (!y.topOnEmptyHash) {
              return;
            }
            t = document.documentElement;
          } else {
            t = document.querySelector(n);
          }
          if (t = t || n !== "#top" ? t : document.documentElement) {
            e.preventDefault();
            n = y;
            if (history.replaceState && n.updateURL && !history.state) {
              o = (o = E.location.hash) || "";
              history.replaceState({
                smoothScroll: JSON.stringify(n),
                anchor: o || E.pageYOffset
              }, document.title, o || E.location.href);
            }
            v.animateScroll(t, r);
          }
        }
        var n;
        var o;
      }
      function n(e) {
        var t;
        if (history.state !== null && !!history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(y) && (typeof (t = history.state.anchor) != "string" || !t || !!(t = document.querySelector(i(history.state.anchor))))) {
          v.animateScroll(t, null, {
            updateURL: false
          });
        }
      }
      var y;
      var r;
      var o;
      var S;
      var v = {
        cancelScroll: function (e) {
          cancelAnimationFrame(S);
          S = null;
          if (!e) {
            I("scrollCancel", y);
          }
        },
        animateScroll: function (a, r, e) {
          v.cancelScroll();
          var i;
          var s;
          var c;
          var u;
          var l;
          var d;
          var f;
          var m;
          var h;
          var t;
          var p = b(y || M, e || {});
          var g = Object.prototype.toString.call(a) === "[object Number]";
          var e = g || !a.tagName ? null : a;
          if (g || e) {
            i = E.pageYOffset;
            if (p.header && !o) {
              o = document.querySelector(p.header);
            }
            t = (t = o) ? parseInt(E.getComputedStyle(t).height, 10) + t.offsetTop : 0;
            u = g ? a : function (e, t, n, o) {
              var a = 0;
              if (e.offsetParent) {
                while (a += e.offsetTop, e = e.offsetParent);
              }
              a = Math.max(a - t - n, 0);
              return a = o ? Math.min(a, O() - E.innerHeight) : a;
            }(e, t, parseInt(typeof p.offset == "function" ? p.offset(a, r) : p.offset, 10), p.clip);
            l = u - i;
            d = O();
            f = 0;
            t = (e = p).speedAsDuration ? e.speed : Math.abs(l / 1000 * e.speed);
            m = e.durationMax && t > e.durationMax ? e.durationMax : e.durationMin && t < e.durationMin ? e.durationMin : parseInt(t, 10);
            h = function (e) {
              var t;
              var n;
              var o;
              f += e - (s = s || e);
              c = i + l * (o = (c = m === 0 ? 0 : f / m) > 1 ? 1 : c, p.easing === "easeInQuad" && (t = o * o), p.easing === "easeOutQuad" && (t = o * (2 - o)), p.easing === "easeInOutQuad" && (t = o < 0.5 ? o * 2 * o : (4 - o * 2) * o - 1), p.easing === "easeInCubic" && (t = o * o * o), p.easing === "easeOutCubic" && (t = --o * o * o + 1), p.easing === "easeInOutCubic" && (t = o < 0.5 ? o * 4 * o * o : (o - 1) * (o * 2 - 2) * (o * 2 - 2) + 1), p.easing === "easeInQuart" && (t = o * o * o * o), p.easing === "easeOutQuart" && (t = 1 - --o * o * o * o), p.easing === "easeInOutQuart" && (t = o < 0.5 ? o * 8 * o * o * o : 1 - --o * 8 * o * o * o), p.easing === "easeInQuint" && (t = o * o * o * o * o), p.easing === "easeOutQuint" && (t = 1 + --o * o * o * o * o), p.easing === "easeInOutQuint" && (t = o < 0.5 ? o * 16 * o * o * o * o : 1 + --o * 16 * o * o * o * o), (t = p.customEasing ? p.customEasing(o) : t) || o);
              E.scrollTo(0, Math.floor(c));
              t = u;
              o = E.pageYOffset;
              if (c != t && o != t && !((i < t && E.innerHeight + o) >= d) || (v.cancelScroll(true), o = t, t = g, (n = a) === 0 && document.body.focus(), t || (n.focus(), document.activeElement !== n && (n.setAttribute("tabindex", "-1"), n.focus(), n.style.outline = "none"), E.scrollTo(0, o)), I("scrollStop", p, a, r), S = s = null)) {
                S = E.requestAnimationFrame(h);
                s = e;
              }
            };
            if (E.pageYOffset === 0) {
              E.scrollTo(0, 0);
            }
            e = a;
            if (!g) {
              if (history.pushState && p.updateURL) {
                history.pushState({
                  smoothScroll: JSON.stringify(p),
                  anchor: e.id
                }, document.title, e === document.documentElement ? "#top" : "#" + e.id);
              }
            }
            if ("matchMedia" in E && E.matchMedia("(prefers-reduced-motion)").matches) {
              E.scrollTo(0, Math.floor(u));
            } else {
              I("scrollStart", p, a, r);
              v.cancelScroll(true);
              E.requestAnimationFrame(h);
            }
          }
        }
      };
      v.destroy = function () {
        if (y) {
          document.removeEventListener("click", t, false);
          E.removeEventListener("popstate", n, false);
          v.cancelScroll();
          S = o = r = y = null;
        }
      };
      if ("querySelector" in document && "addEventListener" in E && "requestAnimationFrame" in E && "closest" in E.Element.prototype) {
        v.destroy();
        y = b(M, e || {});
        o = y.header ? document.querySelector(y.header) : null;
        document.addEventListener("click", t, false);
        if (y.updateURL && y.popstate) {
          E.addEventListener("popstate", n, false);
        }
        return v;
      }
      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
    };
  };
  if (typeof define == "function" && define.amd) {
    define([], function () {
      return t(e);
    });
  } else if (typeof exports == "object") {
    module.exports = t(e);
  } else {
    e.SmoothScroll = t(e);
  }
})();
(function () {
  var t;
  var n;
  var e;
  var i;
  var o;
  var r;
  var s;
  var c;
  var l = {
    menuSticky: true
  };
  optionLinkMagz(l);
  if (l.menuSticky == 1) {
    t = document.querySelector("#header-outer").getBoundingClientRect().height;
    n = document.querySelector("#navmenu-wrap-sticky");
    l = document.querySelector(".nav-copy");
    e = document.querySelector(".nav-original");
    i = document.querySelector(".sidebar-sticky");
    o = "navsticky-show";
    r = "navsticky-hide";
    s = 0;
    if (e != null) {
      l.innerHTML = e.innerHTML;
    }
    if ((c = document.querySelector("#header .widget a")) && l) {
      (c = c.cloneNode(true)).classList.add("sticky-logo-link");
      l.insertBefore(c, l.firstChild);
    }
    if (e != null) {
      window.addEventListener("resize", function () {
        t = document.querySelector("#header-outer").getBoundingClientRect().height;
      });
      window.addEventListener("scroll", function () {
        var e = Math.round(window.pageYOffset);
        if (t <= e) {
          if (e < s) {
            n.classList.remove(r);
            n.classList.add(o);
          } else {
            n.classList.remove(o);
            n.classList.add(r);
          }
        } else {
          n.classList.remove(o);
          n.classList.remove(r);
        }
        s = e;
      }, {
        passive: true
      });
    }
    if (i != null) {
      i.style.top = "88px";
    }
    for (var a = document.querySelectorAll(".menu-sticky a"), d = 0; d < a.length; d++) {
      a[d].setAttribute("tabindex", "-1");
    }
  }
})();
(function () {
  var e = document.querySelector(".navmenu-content");
  var t = document.querySelector("#navmenu-sidebar-body");
  var n = document.querySelectorAll(".navmenu-button");
  var l = document.querySelector("#navmenu-overlay");
  var u = document.querySelector("#navmenu-sidebar-closebtn");
  var s = document.querySelector("#navmenu");
  var r = "navmenu-activated";
  if (e !== null) {
    t.innerHTML = e.innerHTML;
  }
  function c(e) {
    e.preventDefault();
    s.classList.add(r);
  }
  for (var i = 0; i < n.length; i++) {
    n[i].addEventListener("click", c);
  }
  function o(e) {
    e.preventDefault();
    s.classList.remove(r);
  }
  if (l !== null) {
    l.addEventListener("click", o);
  }
  if (u !== null) {
    u.addEventListener("click", o);
  }
})();
(function () {
  "use strict";

  for (var e = document.querySelectorAll("#navmenu-sidebar-body > ul > li.has-sub"), t = function (e) {
      var t = this.nextElementSibling;
      var n = t.scrollHeight;
      if (t.clientHeight) {
        t.style.height = "0px";
        this.classList.remove("ms-submenu-shown");
      } else {
        t.style.height = n + "px";
        this.classList.add("ms-submenu-shown");
      }
    }, n = 0; n < e.length; n++) {
    l = undefined;
    (l = document.createElement("span")).setAttribute("class", "ms-submenu-button");
    var l;
    var u = e[n].querySelector("ul");
    e[n].insertBefore(l, e[n].lastElementChild);
    if (u) {
      u.style.height = "0";
      u.style.overflow = "hidden";
    }
    l.addEventListener("click", t);
  }
})();
(function () {
  var n = document.getElementById("searchcontainer");
  var t = document.getElementById("search-terms");
  var e = document.querySelectorAll(".iconsearch-label");
  if (n != null && t != null) {
    for (var c = 0; c < e.length; c++) {
      e[c].addEventListener("click", function (e) {
        n.classList.toggle("opensearch");
        if (!n.classList.contains("opensearch")) {
          t.blur();
          e.preventDefault();
        }
        e.stopPropagation();
      }, false);
    }
    t.addEventListener("click", function (e) {
      e.stopPropagation();
    }, false);
    document.addEventListener("click", function (e) {
      n.classList.remove("opensearch");
      t.blur();
      e.stopPropagation();
    }, false);
    document.addEventListener("keydown", function (e) {
      if (e.key == "Escape") {
        n.classList.remove("opensearch");
        t.blur();
      }
    });
  }
})();
(function () {
  var r;
  var e = document.querySelector(".featured-img-bg");
  function t(e) {
    let t = r.getAttribute(e);
    if (t) {
      t = t.replace(/-p-k-no-nu/g, "-c-rw");
      r.setAttribute(e, t);
    }
  }
  if (e) {
    r = e.querySelector("img");
    t("data-src");
    t("srcset");
  }
})();
Defer(function () {
  var e = document.getElementById("comment-editor");
  if (e) {
    let n = e.src.split("#");
    let i = document.getElementById("comment-editor");
    let c = document.getElementById("custom-comment-form");
    document.addEventListener("click", function (e) {
      var t;
      if (e.target.className === "btn-reply") {
        e = e.target.dataset.commentId;
        t = document.getElementById("c" + e).querySelector(".comment-starter");
        i.style.visibility = "hidden";
        i.src = n[0] + "&parentID=" + e + "#" + n[1];
        t.appendChild(c);
        i.onload = function () {
          this.style.visibility = "visible";
        };
      }
    });
    document.addEventListener("click", function (e) {
      if (e.target.className === "btn-cancel") {
        e = document.querySelector(".toplevel-thread");
        i.style.visibility = "hidden";
        i.src = n[0] + "#" + n[1];
        e.parentNode.insertBefore(c, e.nextSibling);
        i.onload = function () {
          this.style.visibility = "visible";
        };
      }
    });
  }
}, 0, true);


/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <b:if cond='data:view.isHomepage'> (template.xml baris ke 790 - 791) */
/*! Simple AJAX infinite scroll from dte.web.id */
(function () {
  var t;
  var e;
  var n;
  n = {
    infiniteScrollNav: true
  };
  optionLinkMagz(n);
  if (n.infiniteScrollNav == 1) {
    t = window;
    e = document;
    t.InfiniteScroll = function (n) {
      function r(t, n) {
        return (n = n || e).querySelectorAll(t);
      }
      function o(t) {
        return t !== undefined;
      }
      function a(t) {
        return typeof t == "function";
      }
      function i(t, e) {
        if (o(c[t])) {
          for (var n in c[t]) {
            c[t][n](e);
          }
        }
      }
      function s() {
        v.innerHTML = d.text.loading;
        g = true;
        if (T) {
          H.classList.add(d.state.loading);
          i("loading", [d]);
          u(T, function (t, n) {
            H.className = M + " " + d.state.load;
            (f = e.createElement("div")).innerHTML = t;
            var o = r("title", f);
            var a = r(d.target.post, f);
            var s = r(d.target.anchors + " " + d.target.anchor, f);
            var c = r(d.target.post, h);
            o = o && o[0] ? o[0].innerHTML : "";
            if (a.length && c.length) {
              var u = c[c.length - 1];
              e.title = o;
              u.insertAdjacentHTML("afterend", "<span class=\"fi\" id=\"#fi:" + S + "\"></span>");
              f = e.createElement("div");
              for (var p = 0, v = a.length; v > p; ++p) {
                f.appendChild(a[p]);
              }
              u.insertAdjacentHTML("afterend", f.innerHTML);
              l();
              T = !!s.length && s[0].href;
              g = false;
              S++;
              i("load", [d, t, n]);
            }
          }, function (t, e) {
            H.classList.add(d.state.error);
            g = false;
            l(1);
            i("error", [d, t, e]);
          });
          return;
        } else {
          H.classList.add(d.state.loaded);
          v.innerHTML = d.text.loaded;
          return i("loaded", [d]);
        }
      }
      function l(t) {
        v.innerHTML = "";
        if (p) {
          f.innerHTML = d.text[t ? "error" : "load"];
          var e = f.firstChild;
          e.onclick = function () {
            if (d.type === 2) {
              p = false;
            }
            s();
            return false;
          };
          v.appendChild(e);
        }
      }
      var d = {
        target: {
          posts: ".posts",
          post: ".post",
          anchors: ".anchors",
          anchor: ".anchor"
        },
        text: {
          load: "%s",
          loading: "%s",
          loaded: "%s",
          error: "%s"
        },
        state: {
          load: (u = "infinite-scroll-state-") + "load",
          loading: u + "loading",
          loaded: u + "loaded",
          error: u + "error"
        }
      };
      var c = {
        load: [],
        loading: [],
        loaded: [],
        error: []
      };
      d = function t(e, n) {
        e = e || {};
        for (var r in n) {
          e[r] = typeof n[r] == "object" ? t(e[r], n[r]) : n[r];
        }
        return e;
      }(d, n || {});
      d.on = function (t, e, n) {
        if (o(t)) {
          if (o(e)) {
            if (o(n)) {
              c[t][n] = e;
            } else {
              c[t].push(e);
            }
            return;
          } else {
            return c[t];
          }
        } else {
          return c;
        }
      };
      d.off = function (t, e) {
        if (o(e)) {
          delete c[t][e];
        } else {
          c[t] = [];
        }
      };
      var f = null;
      var u = function (e, n, r) {
        if (t.XMLHttpRequest) {
          var o = new XMLHttpRequest();
          o.onreadystatechange = function () {
            if (o.readyState === 4) {
              if (o.status !== 200) {
                if (r && a(r)) {
                  r(o.responseText, o);
                }
                return;
              }
              if (n && a(n)) {
                n(o.responseText, o);
              }
            }
          };
          o.open("GET", e);
          o.send();
        }
      };
      var p = d.type !== 1;
      var g = false;
      var h = r(d.target.posts)[0];
      var v = r(d.target.anchors)[0];
      var T = r(d.target.anchor, v);
      var L = e.body;
      var H = e.documentElement;
      var M = H.className || "";
      var m = h.offsetTop + h.offsetHeight;
      var y = t.innerHeight;
      var x = 0;
      var E = null;
      var S = 1;
      if (T.length) {
        T = T[0].href;
        h.insertAdjacentHTML("afterbegin", "<span class=\"fi\" id=\"#fi:0\"></span>");
        f = e.createElement("div");
        l();
        var j = function () {
          m = h.offsetTop + h.offsetHeight;
          y = t.innerHeight;
          x = L.scrollTop || H.scrollTop;
          if (!g && !(m > x + y)) {
            s();
          }
        };
        j();
        if (d.type !== 0) {
          t.addEventListener("scroll", function () {
            if (!p) {
              if (E) {
                t.clearTimeout(E);
              }
              E = t.setTimeout(j, 500);
            }
          }, false);
        }
      }
      return d;
    };
  }
})();

/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <b:if cond='data:view.isPost or data:view.isPage'> (template.xml baris ke 813 - 814) */
/* TOC js from www.cssscript.com/generating-a-table-of-contents-with-pure-javascript-toc */
(function () {
  (function (e) {
    var t = function (e) {
      if (typeof e != "string") {
        return 0;
      }
      var t = e.match(/\d/g);
      if (t) {
        return Math.min.apply(null, t);
      } else {
        return 1;
      }
    };
    var n = function (e, t) {
      if (t < 0) {
        return n(e.parentElement, t + 1);
      } else if (t > 0) {
        return function (e, t) {
          while (t--) {
            var n = document.createElement("ol");
            e.appendChild(n);
            e = n;
          }
          return e;
        }(e, t);
      } else {
        return e.parentElement;
      }
    };
    var o = function (e) {
      var o = (e = function (e, t) {
        for (var n in t) {
          if (t.hasOwnProperty(n) && t[n]) {
            e[n] = t[n];
          }
        }
        return e;
      }({
        selector: "h1, h2, h3, h4, h5, h6",
        scope: "body",
        overwrite: false,
        prefix: "toc"
      }, e)).selector;
      if (typeof o != "string") {
        throw new TypeError("selector must be a string");
      }
      if (!o.match(/^(?:h[1-6],?\s*)*$/g)) {
        throw new TypeError("selector must contains only h1-6");
      }
      var r = location.hash;
      if (r) {
        setTimeout(function () {
          location.hash = "";
          location.hash = r;
        }, 0);
      }
      return function (e) {
        var o;
        var r;
        var i = e.selector;
        var c = e.scope;
        var l = document.createElement("ol");
        var a = l;
        o = e.overwrite;
        r = e.prefix;
        var u = function (e, t, n) {
          e.textContent;
          var i = r + "-" + n;
          t.textContent = e.textContent;
          var c = o ? i : e.id || i;
          c = encodeURIComponent(c);
          e.id = c;
          t.href = "#" + c;
        };
        (function (e, t) {
          var n = [];
          var o = document.querySelectorAll(t);
          Array.prototype.forEach.call(o, function (t) {
            var o = t.querySelectorAll(e);
            n = n.concat(Array.prototype.slice.call(o));
          });
          return n;
        })(i, c).reduce(function (e, o, r) {
          var i = t(o.tagName);
          var c = n(a, i - e) || l;
          var h = document.createElement("li");
          var d = document.createElement("a");
          u(o, d, r);
          c.appendChild(h).appendChild(d);
          a = h;
          return i;
        }, t(i));
        return l;
      }(e);
    };
    if (typeof define == "function" && define.amd) {
      define("toc", [], function () {
        return o;
      });
    } else {
      e.initTOC = o;
    }
  })(window);
  var e;
  var t;
  var n = document.getElementById("toc");
  var o = initTOC({
    selector: "h2, h3",
    scope: ".post-body"
  });
  if (n != null) {
    n.appendChild(o);
    e = document.querySelector(".toc");
    t = {
      judulTOC: "Daftar Isi",
      showHideTOC: true
    };
    optionLinkMagz(t);
    if (e != null) {
      e.innerHTML = t.judulTOC;
    }
    (function () {
      var e = {
        tocHide: true,
        showText: "(show)",
        hideText: "(hide)"
      };
      optionLinkMagz(e);
      var t = document.querySelector(".toc");
      var n = document.createElement("button");
      var o = document.querySelector("#toc ol");
      t.appendChild(n);
      o.style.height = "0";
      o.style.overflow = "hidden";
      n.innerHTML = e.showText;
      n.addEventListener("click", function () {
        var t = o.scrollHeight;
        if (o.clientHeight) {
          o.style.height = "0";
          n.innerHTML = e.showText;
        } else {
          o.style.height = t + "px";
          n.innerHTML = e.hideText;
        }
      });
    })();
  }
})();

/* INI ADALAH POTONGAN KODE JAVASCRIPT SETELAH BLOK <b:if cond='data:view.isPost or data:view.isPage'> ... </b:if> (template.xml baris ke 818) */
Defer.dom("img.lazyload", 100, "loaded", null, {
  rootMargin: "1px"
});
if (typeof infinite_scroll != "undefined") {
  infinite_scroll.on("load", function () {
    Defer.dom("img.lazyload", 100, "loaded", null, {
      rootMargin: "1px"
    });
  });
}
new SmoothScroll("a[href*=\"#\"]", {
  speed: 600,
  speedAsDuration: true,
  easing: "easeInOutCubic"
});


/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <b:if cond='data:view.isPost'> (template.xml baris ke 4081 - 4082) */
(function (e) {
  var n = e.querySelector(".post-body");
  if (n) {
    var l;
    var t = null;
    for (var r = 0; r < n.children.length; r++) {
      if (n.children[r].tagName === "ARTICLE") {
        t = n.children[r];
        break;
      }
    }
    if (t) {
      l = [];
      for (var i = 0; i < t.children.length; i++) {
        var a = t.children[i];
        if (!!/^(P|UL|OL|TABLE|BLOCKQUOTE|FIGURE|SECTION|DIV|H2|H3)$/.test(a.tagName) && !a.classList.contains("widget-content") && !a.classList.contains("iklan-wrapper")) {
          l.push(a);
        }
      }
    } else {
      l = n.querySelectorAll("div > br, span > br, div > p, span > p");
    }
    var o = t ? 5 : 2;
    var c = Math.min(Math.ceil(l.length * 0.2), l.length - 1);
    var d = Math.min(Math.ceil(l.length * 0.7), l.length - 1);
    var h = e.querySelector("#iklan-tengah1 .widget-content");
    var u = e.querySelector("#iklan-tengah2 .widget-content");
    var s = e.querySelector("#iklan-atas .widget-content");
    var g = e.querySelector("#iklan-bawah .widget-content");
    var p = n.querySelector("#iklan1");
    var v = n.querySelector("#iklan2");
    if (s != null && s.innerHTML != "\n") {
      n.insertBefore(s, n.childNodes[0]);
    }
    if (g != null && g.innerHTML != "\n") {
      n.appendChild(g);
    }
    var y = function (n, t, r) {
      var i;
      var a;
      if (l.length >= o) {
        if (n != null && n.innerHTML != "\n") {
          i = n;
          if ((a = t !== null ? t : l[r]) !== undefined) {
            a.parentNode.insertBefore(i, a.nextSibling);
          }
        }
        (function () {
          var n;
          for (var l = e.querySelectorAll(".post-body-artikel .kode-iklan-tengah"), t = 0; t < l.length; t++) {
            if ((n = l[t].previousElementSibling) !== null && n.tagName === "BR") {
              n.style.display = "none";
            }
          }
        })();
      } else if (n != null && n.parentNode != null) {
        n.parentNode.removeChild(n);
      }
    };
    y(h, p, c);
    y(u, v, d);
  }
})(document);
(function () {
  var n;
  var e;
  var t;
  t = {
    iklanMatched: true
  };
  if (typeof optionLinkMagz == "function") {
    optionLinkMagz(t);
  }
  n = document.querySelector("#ms-matched-content");
  e = document.querySelector("#matched-content .widget-content");
  if (n != null) {
    if (t.iklanMatched == 1 && e != null && e.innerHTML != "\n") {
      n.appendChild(e);
    }
  } else if (e != null && e.parentNode != null) {
    e.parentNode.removeChild(e);
  }
})();


/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <b:elseif cond='data:view.isHomepage'/> (template.xml baris ke 4087) */
(function () {
  var e;
  var n;
  var t;
  var l;
  var o;
  var a;
  a = {
    IklanInFeed: true,
    lokasiIklanInFeed: 3
  };
  optionLinkMagz(a);
  if ((t = document.querySelector(".content")) != null) {
    l = t.querySelectorAll(".post-outer")[a.lokasiIklanInFeed - 1];
    o = document.querySelector("#iklan-infeed .widget-content");
    e = document.createElement("article");
    n = document.createElement("div");
    e.setAttribute("class", "post-outer infeedads");
    n.setAttribute("class", "post-content");
    e.appendChild(n);
    if (a.IklanInFeed == 1 && o != null && o.innerHTML != "\n" && l != null) {
      n.appendChild(o);
      t.insertBefore(e, l);
    }
  }
})();


/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <script type='text/javascript'> (template.xml baris ke 4586) */
var lazyadsense = false;
function loadAdsenseOnScroll() {
  if (lazyadsense === false && (document.documentElement.scrollTop != 0 || document.body.scrollTop != 0)) {
    lazyadsense = true;
    window.removeEventListener("scroll", loadAdsenseOnScroll, true);
    (function () {
      var e = document.createElement("script");
      e.setAttribute("data-ad-client", "ca-pub-8813103182865992");
      e.setAttribute("crossorigin", "anonymous");
      e.async = true;
      e.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      var n = document.getElementsByTagName("script")[0] || document.getElementsByTagName("head")[0];
      n.parentNode.insertBefore(e, n);
    })();
  }
}
window.addEventListener("scroll", loadAdsenseOnScroll, {
  capture: true,
  passive: true
});
