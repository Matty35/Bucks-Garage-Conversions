/* Bucks Garage Conversions — progressive enhancement only.
   The site is fully usable with JavaScript disabled. */
(function () {
  "use strict";

  /* Mobile navigation toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
        toggle.focus();
      }
    });
  }

  /* Mark the current page in the nav for assistive tech + styling */
  var here = window.location.pathname.replace(/\/index\.html$/, "/");
  document.querySelectorAll(".site-nav a").forEach(function (link) {
    var target = link.getAttribute("href");
    if (target === here || (target === "/" && here === "/")) {
      link.setAttribute("aria-current", "page");
    }
  });

  /* Footer year */
  var year = document.getElementById("footer-year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* Our Work gallery: render photos listed in /images/photos.txt.
     Format: one per line, "filename | caption". Lines starting # ignored.
     Editable through the GitHub website — see images/README.md. */
  var gallery = document.getElementById("photo-gallery");
  if (gallery) {
    fetch("/images/photos.txt")
      .then(function (r) { return r.ok ? r.text() : ""; })
      .then(function (text) {
        var photos = text.split("\n")
          .map(function (line) { return line.trim(); })
          .filter(function (line) { return line && line.charAt(0) !== "#" && line.indexOf("|") > 0; })
          .map(function (line) {
            var i = line.indexOf("|");
            return { file: line.slice(0, i).trim(), caption: line.slice(i + 1).trim() };
          })
          .filter(function (p) { return p.file && p.caption; });
        if (!photos.length) return; /* keep the "photos coming soon" message */
        gallery.innerHTML = "";
        photos.forEach(function (p) {
          var fig = document.createElement("figure");
          var img = document.createElement("img");
          img.src = "/images/" + p.file;
          img.alt = p.caption;
          img.loading = "lazy";
          img.decoding = "async";
          img.addEventListener("error", function () { fig.remove(); });
          var cap = document.createElement("figcaption");
          /* bold a leading "Before:" / "After:" label if the caption has one */
          var m = p.caption.match(/^(Before|After):\s*(.*)$/i);
          if (m) {
            var strong = document.createElement("strong");
            strong.textContent = m[1] + ": ";
            cap.appendChild(strong);
            cap.appendChild(document.createTextNode(m[2]));
          } else {
            cap.textContent = p.caption;
          }
          fig.appendChild(img);
          fig.appendChild(cap);
          gallery.appendChild(fig);
        });
      })
      .catch(function () { /* leave the fallback message in place */ });
  }

  /* Scrollable tables: add a visible swipe affordance, drop it at scroll end */
  document.querySelectorAll(".table-wrap").forEach(function (wrap) {
    function update() {
      var scrollable = wrap.scrollWidth > wrap.clientWidth + 1;
      wrap.classList.toggle("is-scrollable", scrollable);
      var atEnd = wrap.scrollLeft + wrap.clientWidth >= wrap.scrollWidth - 1;
      wrap.classList.toggle("is-scrolled-end", scrollable && atEnd);
    }
    update();
    /* the stylesheet loads async, so re-check once everything has arrived */
    window.addEventListener("load", update);
    wrap.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  });
})();
