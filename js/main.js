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
