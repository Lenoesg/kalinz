/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <head> (baris ke 135 - 138) */
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

/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <b:includable id='blogPostBody'> (baris ke 626 - 654) */
// Baca Juga — hanya definisi fungsi, request dilakukan di relatedPostScript
function showBacaJuga(json) {
  if (!json.feed || !json.feed.entry) {
    return;
  }
  var cfg = {
    bacaJuga: true,
    jumlahBacaJuga: 3,
    judulBacaJuga: "Baca Juga"
  };
  optionLinkMagz(cfg);
  if (!cfg.bacaJuga) {
    return;
  }
  var currentUrl = "<data:post.url/>";
  var entries = json.feed.entry;
  var html = "";
  var count = 0;
  for (var i = 0; i < entries.length && count < cfg.jumlahBacaJuga; i++) {
    var url = "#";
    for (var j = 0; j < entries[i].link.length; j++) {
      if (entries[i].link[j].rel === "alternate") {
        url = entries[i].link[j].href;
        break;
      }
    }
    if (url === currentUrl) {
      continue;
    }
    html += "<li><a href=\"" + url + "\">" + escapeHTML(entries[i].title.$t) + "</a></li>";
    count++;
  }
  if (count > 0) {
    var wrap = document.createElement("div");
    wrap.className = "baca-juga-wrap";
    wrap.innerHTML = "<strong>" + cfg.judulBacaJuga + "</strong><ul>" + html + "</ul>";
    var body = document.querySelector(".post-body-artikel");
    if (!body) {
      return;
    }
    var elems = body.querySelectorAll("div > br, span > br, div > p, span > p");
    var idx = Math.ceil(elems.length * 0.5);
    if (elems[idx]) {
      elems[idx].parentNode.insertBefore(wrap, elems[idx].nextSibling);
    }
  }
}

/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <b:includable id='relatedPostScript'> (baris ke 806 - 862) */
// Related Post — simplified, 1 request, label pertama
(function () {
  var e = {
    relatedTitleOuterOpen: "<div class=\"related-title\"><p class=\"ms-title\">",
    relatedTitleOuterClose: "</p></div>",
    relatedTitleText: "Artikel Terkait",
    relatedOuter: "ms-related-post"
  };
  for (var t in relatedConfig) {
    if (typeof relatedConfig[t] !== "undefined") {
      e[t] = relatedConfig[t];
    }
  }
  var a = {
    relatedPosts: true,
    jumlahRelatedPosts: 3,
    judulRelatedPosts: e.relatedTitleText
  };
  optionLinkMagz(a);
  if (!a.relatedPosts || typeof postLabels === "undefined" || !postLabels.length) {
    return;
  }
  var label = (postLabels[1] || postLabels[0]).replace(/&amp;/g, "&");
  function escapeHTML(str) {
    return (str || "").replace(/[&<>'"]/g, function (tag) {
      var chars = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        "\"": "&quot;"
      };
      return chars[tag] || tag;
    });
  }
  window.msRelatedPosts = function (json) {
    if (!json.feed || !json.feed.entry) {
      return;
    }
    var entries = json.feed.entry;
    var container = document.getElementById(e.relatedOuter);
    if (!container) {
      return;
    }
    var html = e.relatedTitleOuterOpen + a.judulRelatedPosts + e.relatedTitleOuterClose;
    html += "<ul class=\"ms-related-nothumb\">";
    var count = 0;
    for (var i = 0; i < entries.length && count < a.jumlahRelatedPosts; i++) {
      var entryUrl = "#";
      for (var j = 0; j < entries[i].link.length; j++) {
        if (entries[i].link[j].rel === "alternate") {
          entryUrl = entries[i].link[j].href;
          break;
        }
      }
      if (entryUrl === e.postUrl) {
        continue;
      }
      html += "<li><div class=\"related-title-outer\"><a href=\"" + entryUrl + "\">" + escapeHTML(entries[i].title.$t) + "</a></div></li>";
      count++;
    }
    html += "</ul>";
    if (count > 0) {
      container.innerHTML = html;
    }
  };
  var s = document.createElement("script");
  s.src = e.homePageUrl.replace(/\/$/, "") + "/feeds/posts/default/-/" + encodeURIComponent(label) + "?alt=json-in-script&orderby=updated&max-results=" + (a.jumlahRelatedPosts + 1) + "&callback=msRelatedPosts";
  document.head.appendChild(s);
})(); // fullwidthImage — dipertahankan
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


/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <b:includable id='allJavaScripts'> (baris ke 870 - 891) */
function copyShareLink(element) {
  var url = element.getAttribute("data-url");
  if (!url) {
    return false;
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).catch(function () {
      window.prompt("Copy link:", url);
    });
  } else {
    window.prompt("Copy link:", url);
  }
  return false;
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


/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <b:if cond='data:view.isHomepage'> (baris ke 895 - 896) */
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


/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <b:if cond='data:view.isPost'> (baris ke 4173 - 4231) */
(function (e) {
  var n = e.querySelector(".post-body");
  if (!n) {
    return;
  }
  var l = n.querySelectorAll("div > br, span > br, div > p, span > p");
  var t = Math.ceil(l.length * 0.2);
  var r = Math.ceil(l.length * 0.7);
  var i = e.querySelector("#iklan-tengah1 .widget-content");
  var o = e.querySelector("#iklan-tengah2 .widget-content");
  var a = e.querySelector("#iklan-atas .widget-content");
  var u = e.querySelector("#iklan-bawah .widget-content");
  var c = n.querySelector("#iklan1");
  var d = n.querySelector("#iklan2");
  if (a != null && a.innerHTML != "\n") {
    n.insertBefore(a, n.childNodes[0]);
  }
  if (u != null && u.innerHTML != "\n") {
    n.appendChild(u);
  }
  var g = function (n, t, r) {
    var i;
    var o;
    if (l.length > 1) {
      if (n != null && n.innerHTML != "\n") {
        i = n;
        if ((o = t !== null ? t : l[r]) !== undefined) {
          o.parentNode.insertBefore(i, o.nextSibling);
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
  g(i, c, t);
  g(o, d, r);
})(document);
(function () {
  var e;
  var n;
  var t;
  t = {
    iklanMatched: true
  };
  if (typeof optionLinkMagz === "function") {
    optionLinkMagz(t);
  }
  e = document.querySelector("#ms-matched-content");
  n = document.querySelector("#matched-content .widget-content");
  if (e != null) {
    if (t.iklanMatched == 1 && n != null && n.innerHTML != "\n") {
      e.appendChild(n);
    }
  } else if (n != null && n.parentNode != null) {
    n.parentNode.removeChild(n);
  }
})();


/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <b:elseif cond='data:view.isHomepage'/> (baris ke 4236) */
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


/* INI ADALAH POTONGAN KODE JAVASCRIPT DALAM BLOK <script type='text/javascript'> (baris ke 4735 - 4749) */
var lazyadsense = false;
window.addEventListener("scroll", function () {
  if (document.documentElement.scrollTop != 0 && lazyadsense === false || document.body.scrollTop != 0 && lazyadsense === false) {
    (function () {
      var ad = document.createElement("script");
      ad.setAttribute("data-ad-client", "ca-pub-8813103182865992");
      ad.setAttribute("crossorigin", "anonymous");
      ad.async = true;
      ad.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      var sc = document.getElementsByTagName("script")[0] || document.getElementsByTagName("head")[0];
      sc.parentNode.insertBefore(ad, sc);
    })();
    lazyadsense = true;
  }
}, true);


