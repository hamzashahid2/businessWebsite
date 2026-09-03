/* ============================================================
   AURELIA INTERIORS — Interaction Layer
   Demonstrates: DOM manipulation, mouse events, keyboard events,
   form events, sliders, filters, counters, modals and storage.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 0. TINY HELPERS ---------- */
  const qs  = (s, c) => (c || document).querySelector(s);
  const qsa = (s, c) => Array.from((c || document).querySelectorAll(s));
  const on  = (t, ev, fn, o) => t && t.addEventListener(ev, fn, o);
  const PAGE = document.body.dataset.page || "";

  /** Build an inline SVG string from the ICO library. */
  function svg(name, size) {
    const s = size || 24;
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s +
           '" fill="none" stroke="currentColor" stroke-width="1.6" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
           (ICO[name] || "") + "</svg>";
  }
  function starSvg(n) {
    let out = "";
    for (let i = 0; i < n; i++) {
      out += '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICO.star + "</svg>";
    }
    return out;
  }
  /** Escape user-facing strings before injecting them into markup. */
  function esc(str) {
    return String(str).replace(/[&<>"']/g, c => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));
  }
  const money = n => n.toLocaleString("en-PK");

  /* ---------- 1. PRELOADER ---------- */
  (function preloader() {
    const pl = qs("#preloader");
    if (!pl) return;
    const hide = () => pl.classList.add("off");
    on(window, "load", () => setTimeout(hide, 350));
    setTimeout(hide, 3500);                       // safety net
  })();

  /* ---------- 2. THEME TOGGLE (click + localStorage) ---------- */
  (function theme() {
    const root = document.documentElement;
    const KEY  = "aurelia-theme";
    let saved;
    try { saved = localStorage.getItem(KEY); } catch (e) { saved = null; }
    if (saved) root.setAttribute("data-theme", saved);

    qsa(".theme-toggle").forEach(btn => on(btn, "click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      toast(next === "dark" ? "Dark theme enabled" : "Light theme enabled", "ok");
    }));
  })();

  /* ---------- 3. HEADER STATE + SCROLL PROGRESS + BACK TO TOP ---------- */
  (function scrollUI() {
    const header = qs("#header");
    const bar    = qs("#progress");
    const top    = qs("#toTop");
    let ticking  = false;

    function paint() {
      const y   = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (header) header.classList.toggle("is-stuck", y > 60);
      if (bar)    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      if (top)    top.classList.toggle("on", y > 550);
      ticking = false;
    }
    on(window, "scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(paint); }
    }, { passive: true });
    paint();

    on(top, "click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  })();

  /* ---------- 4. MOBILE DRAWER (click + Escape key) ---------- */
  (function drawer() {
    const burger = qs("#burger");
    const panel  = qs("#drawer");
    if (!burger || !panel) return;

    function setOpen(open) {
      panel.classList.toggle("on", open);
      burger.classList.toggle("on", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("no-scroll", open);
      if (open) {
        qsa(".drawer__link", panel).forEach((l, i) => {
          l.style.transitionDelay = (0.08 + i * 0.06) + "s";
        });
      }
    }
    on(burger, "click", () => setOpen(!panel.classList.contains("on")));
    qsa(".drawer__link", panel).forEach(l => on(l, "click", () => setOpen(false)));
    on(document, "keydown", e => {
      if (e.key === "Escape" && panel.classList.contains("on")) setOpen(false);
    });
  })();

  /* ---------- 5. ACTIVE NAV LINK ---------- */
  (function activeNav() {
    let file = location.pathname.split("/").pop();
    if (!file) file = "index.html";
    qsa(".nav__link, .drawer__link").forEach(a => {
      const href = a.getAttribute("href");
      if (href === file) { a.classList.add("is-active"); a.setAttribute("aria-current", "page"); }
    });
  })();

  /* ---------- 6. SCROLL REVEAL ---------- */
  /* Elements are rendered by JS after this module runs, so the observer is
     exposed as observeReveal(scope) and re-applied after every render. */
  const revealIO = ("IntersectionObserver" in window)
    ? new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -50px 0px" })
    : null;

  function observeReveal(scope) {
    const items = qsa("[data-reveal]:not(.in)", scope || document);
    if (!revealIO) { items.forEach(i => i.classList.add("in")); return; }
    items.forEach(i => revealIO.observe(i));
  }
  observeReveal();

  /* ---------- 7. ANIMATED COUNTERS ---------- */
  function initCounters(scope) {
    const nums = qsa("[data-count]", scope || document);
    if (!nums.length || !("IntersectionObserver" in window)) {
      nums.forEach(n => n.textContent = n.dataset.count);
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el     = en.target;
        const target = parseFloat(el.dataset.count);
        const dec    = (el.dataset.count.split(".")[1] || "").length;
        const dur    = 1600;
        const t0     = performance.now();
        (function step(now) {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);          // ease-out cubic
          el.textContent = (target * eased).toFixed(dec);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target.toFixed(dec);
        })(t0);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
  }

  /* ---------- 8. TOAST NOTIFICATIONS ---------- */
  function toast(msg, kind) {
    let box = qs("#toasts");
    if (!box) {
      box = document.createElement("div");
      box.id = "toasts";
      box.className = "toasts";
      box.setAttribute("role", "status");
      box.setAttribute("aria-live", "polite");
      document.body.appendChild(box);
    }
    const t = document.createElement("div");
    t.className = "toast" + (kind ? " toast--" + kind : "");
    t.innerHTML = svg(kind === "err" ? "alert" : "checkCir", 19) + "<span>" + esc(msg) + "</span>";
    box.appendChild(t);
    requestAnimationFrame(() => t.classList.add("on"));
    setTimeout(() => {
      t.classList.add("out");
      setTimeout(() => t.remove(), 500);
    }, 3200);
  }

  /* ---------- 9. HERO SLIDER (auto + mouse + arrow keys) ---------- */
  (function heroSlider() {
    const root = qs("#heroSlider");
    if (!root) return;

    const media = qs("#heroMedia", root);
    const panel = qs("#heroPanel", root);
    const dots  = qs("#heroDots", root);
    let i = 0, timer = null;

    // Build slides from the SLIDES data array
    media.innerHTML = SLIDES.map((s, n) =>
      '<div class="hero__slide' + (n === 0 ? " on" : "") + '">' +
        '<img src="assets/img/' + s.img + '" alt="' + esc(s.h.replace(/<[^>]+>/g, "")) +
        '" ' + (n === 0 ? 'fetchpriority="high"' : 'loading="lazy"') + '>' +
      "</div>").join("");
    dots.innerHTML = SLIDES.map((s, n) =>
      '<button class="hero__dot' + (n === 0 ? " on" : "") + '" data-i="' + n +
      '" aria-label="Show slide ' + (n + 1) + '"></button>').join("");

    const slides = qsa(".hero__slide", media);
    const dotEls = qsa(".hero__dot", dots);

    function render(n) {
      i = (n + SLIDES.length) % SLIDES.length;
      slides.forEach((s, k) => s.classList.toggle("on", k === i));
      dotEls.forEach((d, k) => d.classList.toggle("on", k === i));
      const s = SLIDES[i];
      panel.innerHTML =
        '<span class="eyebrow hero__panel" data-d="1">' + esc(s.eyebrow) + "</span>" +
        '<h1 class="hero__panel" data-d="2">' + s.h + "</h1>" +
        '<p class="hero__text hero__panel" data-d="3">' + esc(s.p) + "</p>" +
        '<div class="btn-row hero__panel" data-d="3">' +
          '<a class="btn btn--light" href="portfolio.html"><span>View our work</span>' + svg("arrow", 16) + "</a>" +
          '<a class="btn btn--outline-light" href="contact.html"><span>Book a consultation</span></a>' +
        "</div>";
    }
    const next  = () => render(i + 1);
    const prev  = () => render(i - 1);
    const start = () => { stop(); timer = setInterval(next, 6500); };
    const stop  = () => timer && clearInterval(timer);

    on(qs("#heroNext"), "click", () => { next(); start(); });
    on(qs("#heroPrev"), "click", () => { prev(); start(); });
    dotEls.forEach(d => on(d, "click", () => { render(+d.dataset.i); start(); }));

    // MOUSE EVENTS — pause the carousel while the pointer rests on it
    on(root, "mouseenter", stop);
    on(root, "mouseleave", start);

    // KEYBOARD EVENTS — left/right arrows step through slides
    on(document, "keydown", e => {
      if (qs(".lb.on") || qs(".modal.on")) return;      // let overlays own the keys
      if (e.key === "ArrowRight") { next(); start(); }
      if (e.key === "ArrowLeft")  { prev(); start(); }
    });

    render(0);
    start();
  })();

  /* ---------- 10. MOUSE-MOVE TILT ON CARDS ---------- */
  /* Also exposed, because service cards are built by JS after this runs. */
  function bindTilt(scope) {
    if (window.matchMedia("(hover: none)").matches) return;
    qsa("[data-tilt]", scope || document).forEach(card => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = "1";
      on(card, "mousemove", e => {
        const r  = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width  - 0.5;
        const py = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" + (-py * 5).toFixed(2) + "deg) rotateY(" +
          (px * 5).toFixed(2) + "deg) translateY(-6px)";
      });
      on(card, "mouseleave", () => { card.style.transform = ""; });
    });
  }
  bindTilt();

  /* ---------- 11. FOOTER YEAR + WHATSAPP LINKS ---------- */
  (function chrome() {
    qsa("[data-year]").forEach(e => e.textContent = new Date().getFullYear());

    const msg = encodeURIComponent(
      "Hello " + SITE.name + "! I found you on your website and I'd like to discuss an interior project."
    );
    qsa("[data-wa]").forEach(a => {
      a.href = "https://wa.me/" + SITE.whatsapp + "?text=" + msg;
      a.target = "_blank";
      a.rel = "noopener";
    });

    // Highlight today's row in the opening-hours list
    const day = new Date().getDay();                       // 0 = Sunday
    const row = day === 0 ? 2 : (day === 6 ? 1 : 0);
    const hours = qsa("#hours li");
    if (hours[row]) hours[row].classList.add("today");
  })();

  /* ---------- 12. COPY TO CLIPBOARD (mouse click) ---------- */
  qsa("[data-copy]").forEach(btn => on(btn, "click", async () => {
    const value = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      toast("Copied: " + value, "ok");
    } catch (e) {
      toast("Press Ctrl+C to copy: " + value, "err");
    }
  }));

  /* expose small utilities to the rest of the file */
  window.__aurelia = { qs, qsa, on, svg, esc, toast, initCounters, observeReveal, bindTilt, starSvg, money, PAGE };
})();

/* ============================================================
   PART 2 — Content rendering, filtering, and forms
   ============================================================ */
(function () {
  "use strict";
  const A = window.__aurelia;
  const { qs, qsa, on, svg, esc, toast, initCounters, observeReveal, bindTilt, starSvg, money, PAGE } = A;

  /* ---------- 13. SHORTLIST (localStorage + click events) ---------- */
  const FAV_KEY = "aurelia-shortlist";
  function favGet() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
    catch (e) { return []; }
  }
  function favSet(list) {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(list)); } catch (e) {}
    paintFavCount();
  }
  function paintFavCount() {
    const n = favGet().length;
    qsa("[data-fav-count]").forEach(b => {
      b.textContent = n;
      b.classList.toggle("on", n > 0);
    });
  }
  function favToggle(id) {
    const list = favGet();
    const at = list.indexOf(id);
    if (at > -1) { list.splice(at, 1); favSet(list); return false; }
    list.push(id); favSet(list); return true;
  }
  paintFavCount();

  /* ---------- 14. RENDERERS ---------- */

  /* Services */
  (function renderServices() {
    const grid = qs("#servicesGrid");
    if (!grid) return;
    const limit = parseInt(grid.dataset.limit, 10) || SERVICES.length;
    grid.innerHTML = SERVICES.slice(0, limit).map((s, i) =>
      '<article class="card" data-reveal data-delay="' + (i % 4) + '" data-tilt>' +
        '<span class="card__num">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<div class="card__ico">' + svg(s.icon, 25) + "</div>" +
        "<h3>" + esc(s.title) + "</h3>" +
        "<p>" + esc(s.text) + "</p>" +
        '<ul class="card__list">' + s.points.map(p => "<li>" + esc(p) + "</li>").join("") + "</ul>" +
      "</article>").join("");
    observeReveal(grid);
    bindTilt(grid);
  })();

  /* Products */
  (function renderProducts() {
    const grid = qs("#productsGrid");
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map((p, i) =>
      '<article class="prod" data-reveal data-delay="' + (i % 4) + '">' +
        '<div class="prod__img"><img src="assets/img/' + p.img + '" alt="' + esc(p.name) + '" loading="lazy"></div>' +
        '<div class="prod__body">' +
          '<span class="prod__cat">' + esc(p.cat) + "</span>" +
          "<h3>" + esc(p.name) + "</h3><p>" + esc(p.text) + "</p>" +
          '<div class="prod__foot">' +
            '<span class="prod__price">' + (p.was ? "<s>" + esc(p.was) + "</s>" : "") + esc(p.price) + "</span>" +
            '<a class="tlink" data-wa href="#">Enquire</a>' +
          "</div>" +
        "</div>" +
      "</article>").join("");
    // re-bind WhatsApp links created after the initial pass
    const msg = encodeURIComponent("Hello " + SITE.name + "! I'd like to enquire about a furniture piece.");
    qsa("[data-wa]", grid).forEach(a => {
      a.href = "https://wa.me/" + SITE.whatsapp + "?text=" + msg;
      a.target = "_blank"; a.rel = "noopener";
    });
    observeReveal(grid);
  })();

  /* Team */
  (function renderTeam() {
    const grid = qs("#teamGrid");
    if (!grid) return;
    const socials = ["linkedin", "instagram"];
    const SOC = {
      linkedin:'<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4V8h4v1.5A5 5 0 0116 8z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
      instagram:'<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>'
    };
    grid.innerHTML = TEAM.map((m, i) =>
      '<article class="tcard" data-reveal data-delay="' + (i % 4) + '">' +
        '<div class="tcard__img"><img src="assets/img/' + m.img + '" alt="Portrait of ' + esc(m.name) + '" loading="lazy">' +
          '<div class="tcard__social">' + socials.map(s =>
            '<a href="' + SITE.social[s] + '" target="_blank" rel="noopener" aria-label="' +
            esc(m.name) + ' on ' + s + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
            SOC[s] + "</svg></a>").join("") +
          "</div>" +
        "</div>" +
        "<h3>" + esc(m.name) + "</h3><span>" + esc(m.role) + "</span><p>" + esc(m.bio) + "</p>" +
      "</article>").join("");
    observeReveal(grid);
  })();

  /* Testimonial slider (auto-advance + dots + keyboard) */
  (function renderQuotes() {
    const box = qs("#quotes");
    if (!box) return;
    box.innerHTML = TESTIMONIALS.map((t, i) =>
      '<blockquote class="quote' + (i === 0 ? " on" : "") + '">' +
        '<div class="quote__stars">' + starSvg(t.stars) + "</div>" +
        '<p class="quote__text">' + esc(t.text) + "</p>" +
        '<footer class="quote__who">' +
          '<img src="assets/img/' + t.img + '" alt="Photo of ' + esc(t.name) + '" loading="lazy">' +
          "<div><b>" + esc(t.name) + "</b><span>" + esc(t.role) + "</span></div>" +
        "</footer>" +
      "</blockquote>").join("");

    const nav = qs("#quotesNav");
    nav.innerHTML = TESTIMONIALS.map((t, i) =>
      '<button class="qdot' + (i === 0 ? " on" : "") + '" data-i="' + i +
      '" aria-label="Show testimonial ' + (i + 1) + '"></button>').join("");

    const items = qsa(".quote", box);
    const dots  = qsa(".qdot", nav);
    let i = 0, timer;
    function show(n) {
      i = (n + items.length) % items.length;
      items.forEach((q, k) => q.classList.toggle("on", k === i));
      dots.forEach((d, k) => d.classList.toggle("on", k === i));
    }
    const play = () => { clearInterval(timer); timer = setInterval(() => show(i + 1), 7000); };
    dots.forEach(d => on(d, "click", () => { show(+d.dataset.i); play(); }));
    on(qs("#quotePrev"), "click", () => { show(i - 1); play(); });
    on(qs("#quoteNext"), "click", () => { show(i + 1); play(); });
    on(box, "mouseenter", () => clearInterval(timer));   // MOUSE EVENT
    on(box, "mouseleave", play);
    play();
  })();

  /* Timeline + Awards table (About page) */
  (function renderAbout() {
    const tl = qs("#timeline");
    if (tl) {
      tl.innerHTML = MILESTONES.map(m =>
        "<li data-reveal><b>" + esc(m.y) + "</b><h4>" + esc(m.t) + "</h4><p>" + esc(m.d) + "</p></li>"
      ).join("");
      observeReveal(tl);
    }
    const tb = qs("#awardsBody");
    if (tb) {
      tb.innerHTML = AWARDS.map(a =>
        "<tr><td><b>" + esc(a.year) + "</b></td><td>" + esc(a.award) + "</td><td>" + esc(a.body) +
        "</td><td>" + esc(a.project) + '</td><td><span class="badge">' + esc(a.result) + "</span></td></tr>"
      ).join("");
    }
  })();

  /* Pricing comparison table (Services page) */
  (function renderPackages() {
    const head = qs("#pkgHead"), body = qs("#pkgBody");
    if (!head || !body) return;

    head.innerHTML = "<tr><th scope=\"col\">What's included</th>" + PACKAGES.map(p =>
      '<th scope="col">' + esc(p.name) + (p.best ? ' <span class="badge">Popular</span>' : "") + "</th>"
    ).join("") + "</tr>";

    let rows = '<tr><th scope="row">Starting price</th>' + PACKAGES.map(p =>
      '<td><span class="t-price">' + (p.price === "On request" ? "" : "PKR ") + esc(p.price) +
      '</span><br><small style="color:var(--text-3)">' + esc(p.unit) + "</small></td>"
    ).join("") + "</tr>";

    rows += PACKAGE_ROWS.map(r =>
      '<tr><th scope="row">' + esc(r.label) + "</th>" + PACKAGES.map(p =>
        "<td>" + (p.f[r.key]
          ? '<span class="t-yes" title="Included">&#10003;</span>'
          : '<span class="t-no" title="Not included">&mdash;</span>') + "</td>"
      ).join("") + "</tr>").join("");

    rows += '<tr><th scope="row">Typical delivery</th>' + PACKAGES.map(p =>
      "<td>" + esc(p.delivery) + "</td>").join("") + "</tr>";
    rows += '<tr><th scope="row">Best suited to</th>' + PACKAGES.map(p =>
      '<td style="font-size:.85rem;color:var(--text-2)">' + esc(p.for) + "</td>").join("") + "</tr>";
    rows += '<tr><th scope="row"></th>' + PACKAGES.map(p =>
      '<td><a class="btn btn--sm ' + (p.best ? "btn--accent" : "btn--ghost") +
      '" href="contact.html?package=' + encodeURIComponent(p.name) + '"><span>Choose</span></a></td>'
    ).join("") + "</tr>";

    body.innerHTML = rows;
  })();

  /* FAQ accordion (click + Enter/Space keyboard support) */
  (function renderFaq() {
    const box = qs("#faq");
    if (!box) return;
    box.innerHTML = FAQS.map((f, i) =>
      '<div class="acc__item">' +
        '<button class="acc__btn" type="button" aria-expanded="false" aria-controls="faq-p' + i + '">' +
          "<span>" + esc(f.q) + '</span><span class="acc__ico" aria-hidden="true"></span>' +
        "</button>" +
        '<div class="acc__panel" id="faq-p' + i + '" role="region"><p>' + esc(f.a) + "</p></div>" +
      "</div>").join("");

    qsa(".acc__btn", box).forEach(btn => on(btn, "click", () => {
      const item  = btn.parentElement;
      const panel = btn.nextElementSibling;
      const open  = item.classList.contains("on");
      // close every panel, then open the clicked one (single-open accordion)
      qsa(".acc__item", box).forEach(it => {
        it.classList.remove("on");
        qs(".acc__panel", it).style.maxHeight = null;
        qs(".acc__btn", it).setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("on");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    }));
  })();

  /* ---------- 15. PROJECT GRID, FILTER, SEARCH, LIGHTBOX ---------- */
  (function projects() {
    const grid = qs("#projectsGrid");
    if (!grid) return;

    const isPortfolio = grid.dataset.mode === "full";
    const source = isPortfolio ? PROJECTS : PROJECTS.filter(p => p.featured).slice(0, 6);
    const PAGE_SIZE = 9;
    let filter = "all", term = "", shown = PAGE_SIZE;

    function card(p, i) {
      const fav = favGet().indexOf(p.id) > -1;
      return '<article class="pcard" data-reveal data-delay="' + (i % 3) +
             '" data-id="' + p.id + '" data-cat="' + p.cat + '" tabindex="0" role="button" ' +
             'aria-label="Open details for ' + esc(p.title) + '">' +
        '<img src="assets/img/' + p.img + '" alt="' + esc(p.title) + ' — ' + esc(p.catLabel) +
          ' interior project in ' + esc(p.location) + '" loading="lazy">' +
        '<div class="pcard__veil"></div>' +
        (p.tag ? '<span class="pcard__tag">' + esc(p.tag) + "</span>" : "") +
        '<button class="pcard__fav' + (fav ? " on" : "") + '" data-fav="' + p.id +
          '" type="button" aria-pressed="' + fav + '" aria-label="Save ' + esc(p.title) +
          ' to shortlist">' + svg("heart", 17) + "</button>" +
        '<div class="pcard__body">' +
          '<span class="pcard__cat">' + esc(p.catLabel) + "</span>" +
          "<h3>" + esc(p.title) + "</h3>" +
          '<div class="pcard__meta">' + esc(p.location) + "<span>&bull;</span>" + p.year +
            "<span>&bull;</span>" + esc(p.area) + "</div>" +
          '<div class="pcard__more"><span class="tlink">View project' + "</span></div>" +
        "</div>" +
      "</article>";
    }

    function visible() {
      return source.filter(p => {
        const okCat = filter === "all" || p.cat === filter;
        const hay = (p.title + " " + p.location + " " + p.catLabel + " " + p.scope + " " + p.text).toLowerCase();
        return okCat && (!term || hay.indexOf(term) > -1);
      });
    }

    function paint() {
      const list = visible();
      const slice = isPortfolio ? list.slice(0, shown) : list;

      grid.innerHTML = slice.length
        ? slice.map(card).join("")
        : '<div class="empty-state" style="grid-column:1/-1">' + svg("search", 44) +
          "<h3>No projects match that search</h3><p>Try a different keyword, or clear the filters to see all " +
          source.length + " projects.</p></div>";

      const note = qs("#resultNote");
      if (note) {
        note.innerHTML = "Showing <b>" + slice.length + "</b> of <b>" + list.length + "</b> project" +
                         (list.length === 1 ? "" : "s");
      }
      const more = qs("#loadMore");
      if (more) more.style.display = (isPortfolio && list.length > shown) ? "" : "none";

      // reveal + wire the freshly built cards
      observeReveal(grid);
      bindCards(slice);
    }

    function bindCards(list) {
      qsa(".pcard", grid).forEach(c => {
        on(c, "click", e => {
          if (e.target.closest("[data-fav]")) return;      // heart handled separately
          openDetail(c.dataset.id, list);
        });
        // KEYBOARD EVENT — Enter or Space opens the focused card
        on(c, "keydown", e => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDetail(c.dataset.id, list); }
        });
      });
      qsa("[data-fav]", grid).forEach(b => on(b, "click", e => {
        e.stopPropagation();
        const added = favToggle(b.dataset.fav);
        b.classList.toggle("on", added);
        b.setAttribute("aria-pressed", String(added));
        toast(added ? "Added to your shortlist" : "Removed from shortlist", added ? "ok" : "");
      }));
    }

    /* Filter chips */
    const chipBar = qs("#filterBar");
    if (chipBar) {
      chipBar.innerHTML = FILTERS.map((f, i) => {
        const n = f.key === "all" ? source.length : source.filter(p => p.cat === f.key).length;
        return '<button class="chip' + (i === 0 ? " on" : "") + '" data-f="' + f.key + '" type="button">' +
               esc(f.label) + " (" + n + ")</button>";
      }).join("");
      qsa(".chip", chipBar).forEach(c => on(c, "click", () => {
        qsa(".chip", chipBar).forEach(x => x.classList.remove("on"));
        c.classList.add("on");
        filter = c.dataset.f;
        shown = PAGE_SIZE;
        paint();
      }));
    }

    /* Live search — KEYBOARD EVENTS */
    const search = qs("#projectSearch");
    if (search) {
      on(search, "keyup", e => {
        term = search.value.trim().toLowerCase();
        shown = PAGE_SIZE;
        if (e.key === "Escape") { search.value = ""; term = ""; search.blur(); }
        paint();
      });
      // "/" anywhere on the page jumps focus into the search box
      on(document, "keydown", e => {
        if (e.key === "/" && document.activeElement !== search &&
            !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
          e.preventDefault();
          search.focus();
        }
      });
    }

    on(qs("#loadMore"), "click", () => {
      shown += PAGE_SIZE;
      paint();
      toast("More projects loaded", "ok");
    });

    /* ----- Project detail modal ----- */
    const dm = qs("#detailModal");
    function openDetail(id, list) {
      const p = PROJECTS.find(x => x.id === id);
      if (!p || !dm) return;
      qs("#detailBody", dm).innerHTML =
        '<div class="pdetail">' +
          '<div class="pdetail__img"><img src="assets/img/' + p.img + '" alt="' + esc(p.title) + '"></div>' +
          '<div class="pdetail__body">' +
            '<span class="eyebrow">' + esc(p.catLabel) + "</span>" +
            "<h2>" + esc(p.title) + "</h2>" +
            "<p>" + esc(p.text) + "</p>" +
            "<table><caption>Project facts</caption><tbody>" +
              '<tr><th scope="row">Location</th><td>'  + esc(p.location) + "</td></tr>" +
              '<tr><th scope="row">Completed</th><td>' + p.year + "</td></tr>" +
              '<tr><th scope="row">Floor area</th><td>'+ esc(p.area) + "</td></tr>" +
              '<tr><th scope="row">Scope</th><td>'     + esc(p.scope) + "</td></tr>" +
              '<tr><th scope="row">Duration</th><td>'  + esc(p.duration) + "</td></tr>" +
              '<tr><th scope="row">Project value</th><td><b>' + esc(p.budget) + "</b></td></tr>" +
            "</tbody></table>" +
            '<div class="btn-row" style="margin-top:26px">' +
              '<button class="btn btn--accent" type="button" id="lbOpen"><span>View full image</span></button>' +
              '<a class="btn btn--ghost" href="contact.html"><span>Start a similar project</span></a>' +
            "</div>" +
          "</div>" +
        "</div>";
      openModal(dm);
      on(qs("#lbOpen"), "click", () => { closeModal(dm); openLb(list, list.findIndex(x => x.id === id)); });
    }

    /* ----- Lightbox (click + arrow keys + Escape) ----- */
    const lb = qs("#lightbox");
    let lbList = [], lbAt = 0;
    function openLb(list, at) {
      if (!lb) return;
      lbList = list.length ? list : source;
      lbAt = Math.max(0, at);
      paintLb();
      lb.classList.add("on");
      document.body.classList.add("no-scroll");
    }
    function paintLb() {
      const p = lbList[lbAt];
      qs("#lbImg", lb).src = "assets/img/" + p.img;
      qs("#lbImg", lb).alt = p.title;
      qs("#lbCap", lb).innerHTML = "<b>" + esc(p.title) + "</b>" + esc(p.location) + " &middot; " +
                                   esc(p.catLabel) + " &middot; " + p.year;
      qs("#lbCount", lb).textContent = (lbAt + 1) + " / " + lbList.length;
    }
    function stepLb(d) { lbAt = (lbAt + d + lbList.length) % lbList.length; paintLb(); }
    function closeLb() { lb && lb.classList.remove("on"); document.body.classList.remove("no-scroll"); }

    if (lb) {
      on(qs("#lbNext"), "click", () => stepLb(1));
      on(qs("#lbPrev"), "click", () => stepLb(-1));
      on(qs("#lbClose"), "click", closeLb);
      on(lb, "click", e => { if (e.target === lb) closeLb(); });
      on(document, "keydown", e => {
        if (!lb.classList.contains("on")) return;
        if (e.key === "Escape")     closeLb();
        if (e.key === "ArrowRight") stepLb(1);
        if (e.key === "ArrowLeft")  stepLb(-1);
      });
    }

    paint();
  })();

  /* ---------- 16. GENERIC MODAL OPEN/CLOSE ---------- */
  function openModal(m) {
    if (!m) return;
    m.classList.add("on");
    document.body.classList.add("no-scroll");
  }
  function closeModal(m) {
    if (!m) return;
    m.classList.remove("on");
    if (!qs(".modal.on") && !qs(".lb.on")) document.body.classList.remove("no-scroll");
  }
  qsa(".modal").forEach(m => {
    qsa("[data-close]", m).forEach(b => on(b, "click", () => closeModal(m)));
    on(qs(".modal__bd", m), "click", () => closeModal(m));
  });
  on(document, "keydown", e => {
    if (e.key === "Escape") qsa(".modal.on").forEach(closeModal);
  });

  /* ---------- 17. INSTANT ESTIMATE CALCULATOR ---------- */
  (function estimator() {
    const box = qs("#estimator");
    if (!box) return;

    const RATES = { design: 180, essential: 2200, signature: 3400 };
    const TYPES = { apartment: 1.00, house: 1.08, office: 1.15, retail: 1.22 };
    const area  = qs("#estArea"), type = qs("#estType"), pkg = qs("#estPkg");
    const extras = qsa("[data-extra]", box);

    function compute() {
      const sqft = +area.value;
      const rate = RATES[pkg.value];
      const mult = TYPES[type.value];
      let base = sqft * rate * mult;

      let addPct = 0;
      const chosen = [];
      extras.forEach(x => {
        if (x.checked) { addPct += +x.dataset.extra; chosen.push(x.dataset.label); }
      });
      const extraAmt = base * (addPct / 100);
      const total = Math.round((base + extraAmt) / 1000) * 1000;

      const weeks = pkg.value === "design"
        ? Math.max(3, Math.round(3 + sqft / 1400))
        : Math.max(6, Math.round(6 + sqft / 230));

      qs("#estAreaOut").textContent = money(sqft) + " sq ft";
      qs("#estTotal").textContent = "PKR " + money(total);
      qs("#estRange").textContent =
        "Indicative range: PKR " + money(Math.round(total * 0.92 / 1000) * 1000) +
        " – " + money(Math.round(total * 1.10 / 1000) * 1000);
      qs("#estLines").innerHTML =
        "<li><span>Base rate</span><b>PKR " + money(rate) + " / sq ft</b></li>" +
        "<li><span>Property factor</span><b>&times;" + mult.toFixed(2) + "</b></li>" +
        "<li><span>Add-ons</span><b>" + (addPct ? "+" + addPct + "%" : "None") + "</b></li>" +
        "<li><span>Estimated programme</span><b>" + weeks + " weeks</b></li>";

      // Push the live numbers into the WhatsApp deep link
      const wa = qs("#estWa");
      if (wa) {
        const text =
          "Hello " + SITE.name + "! I used the estimate tool on your website:%0A" +
          "%E2%80%A2 Area: " + money(sqft) + " sq ft%0A" +
          "%E2%80%A2 Property: " + type.options[type.selectedIndex].text + "%0A" +
          "%E2%80%A2 Package: " + pkg.options[pkg.selectedIndex].text + "%0A" +
          (chosen.length ? "%E2%80%A2 Add-ons: " + encodeURIComponent(chosen.join(", ")) + "%0A" : "") +
          "%E2%80%A2 Indicative total: PKR " + money(total) + "%0A%0APlease can you confirm a firm quote?";
        wa.href = "https://wa.me/" + SITE.whatsapp + "?text=" + text;
      }
    }

    // MOUSE + KEYBOARD: `input` fires for drags and for arrow-key nudges alike
    on(area, "input", compute);
    on(type, "change", compute);
    on(pkg,  "change", compute);
    extras.forEach(x => on(x, "change", compute));
    compute();
  })();

  /* ---------- 18. FORM VALIDATION ---------- */
  const RX = {
    name:  /^[A-Za-zÀ-ɏ][A-Za-zÀ-ɏ .'-]{2,49}$/,
    email: /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/,
    phone: /^(\+92|0092|0)?3\d{9}$/
  };

  /** Each rule returns "" when valid, or the message to display. */
  const RULES = {
    fullname: v => !v.trim() ? "Please tell us your name."
                 : !RX.name.test(v.trim()) ? "Use letters only, at least 3 characters." : "",
    email:    v => !v.trim() ? "An email address is required."
                 : !RX.email.test(v.trim()) ? "That email doesn't look right (e.g. you@example.com)." : "",
    phone:    v => !v.trim() ? "A phone number is required."
                 : !RX.phone.test(v.replace(/[\s()-]/g, "")) ? "Enter a Pakistani mobile, e.g. 0300 1234567." : "",
    city:     v => !v ? "Please choose your city." : "",
    service:  v => !v ? "Please choose the service you need." : "",
    property: v => !v ? "Please select a property type." : "",
    areasize: v => !v.trim() ? "Approximate area is required."
                 : (isNaN(v) || +v < 100) ? "Enter a number of at least 100 sq ft."
                 : (+v > 100000) ? "That looks too large — please contact us directly." : "",
    visitdate:v => {
      if (!v) return "Pick a preferred date.";
      const today = new Date(); today.setHours(0, 0, 0, 0);
      return new Date(v) < today ? "Please choose today or a future date." : "";
    },
    slot:     v => !v ? "Choose a time that suits you." : "",
    message:  v => !v.trim() ? "Tell us a little about the project."
                 : v.trim().length < 20 ? "Please add a bit more detail (at least 20 characters)." : "",
    consent:  v => v ? "" : "Please accept the privacy terms to continue."
  };

  (function contactForm() {
    const form = qs("#bookingForm");
    if (!form) return;

    const MAXLEN = 600;

    /** Read a field's value regardless of its input type. */
    function valueOf(name) {
      const nodes = qsa('[name="' + name + '"]', form);
      if (!nodes.length) return "";
      const first = nodes[0];
      if (first.type === "checkbox" && nodes.length === 1) return first.checked ? "yes" : "";
      if (first.type === "radio") {
        const hit = nodes.find(n => n.checked);
        return hit ? hit.value : "";
      }
      return first.value;
    }
    function wrapOf(name) {
      const node = qs('[name="' + name + '"]', form);
      return node ? node.closest(".field") || node.closest(".field--full") : null;
    }
    function setState(name, msg) {
      const wrap = wrapOf(name);
      if (!wrap) return !msg;
      const slot = qs(".field__msg", wrap);
      wrap.classList.toggle("invalid", !!msg);
      wrap.classList.toggle("valid", !msg && !!valueOf(name));
      if (slot) slot.innerHTML = msg ? svg("alert", 13) + "<span>" + esc(msg) + "</span>" : "";
      return !msg;
    }
    function check(name) { return setState(name, RULES[name](valueOf(name))); }

    // live validation: validate on blur, then re-validate as the user types
    Object.keys(RULES).forEach(name => {
      qsa('[name="' + name + '"]', form).forEach(node => {
        on(node, "blur",   () => check(name));
        on(node, "change", () => check(name));
        on(node, "input",  () => { if (wrapOf(name) && wrapOf(name).classList.contains("invalid")) check(name); });
      });
    });

    // KEYBOARD EVENT — live character counter on the message box
    const msg = qs('[name="message"]', form);
    const cnt = qs("#msgCount");
    if (msg && cnt) {
      msg.setAttribute("maxlength", MAXLEN);
      const paint = () => {
        const n = msg.value.length;
        cnt.textContent = n + " / " + MAXLEN;
        cnt.classList.toggle("warn", n > MAXLEN - 60);
      };
      on(msg, "keyup", paint);
      on(msg, "input", paint);
      paint();
    }

    // KEYBOARD EVENT — Ctrl/Cmd + Enter submits from anywhere in the form
    on(form, "keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        form.requestSubmit ? form.requestSubmit() : form.querySelector("[type=submit]").click();
      }
    });

    // No past dates in the picker
    const dateInput = qs('[name="visitdate"]', form);
    if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

    // Pre-select a package when arriving from the pricing table
    const wanted = new URLSearchParams(location.search).get("package");
    const svcSel = qs('[name="service"]', form);
    if (wanted && svcSel) {
      const hit = Array.from(svcSel.options).find(o => o.text.toLowerCase().indexOf(wanted.toLowerCase()) > -1);
      if (hit) { svcSel.value = hit.value; toast("Pre-filled for the " + wanted + " package", "ok"); }
    }

    // Drop any shortlisted projects into the message for the user
    const favs = favGet();
    if (favs.length && msg && !msg.value) {
      const names = PROJECTS.filter(p => favs.indexOf(p.id) > -1).map(p => p.title);
      msg.value = "I have shortlisted these projects on your site: " + names.join(", ") +
                  ". I'd like something in a similar direction for my own space.";
      if (cnt) cnt.textContent = msg.value.length + " / " + MAXLEN;
    }

    on(form, "submit", e => {
      e.preventDefault();

      // validate every field, remember the first one that failed
      let firstBad = null;
      Object.keys(RULES).forEach(name => {
        if (!check(name) && !firstBad) firstBad = name;
      });

      if (firstBad) {
        const wrap = wrapOf(firstBad);
        if (wrap) {
          wrap.scrollIntoView({ behavior: "smooth", block: "center" });
          const focusable = qs("input,select,textarea", wrap);
          if (focusable) setTimeout(() => focusable.focus(), 420);
        }
        toast("Please correct the highlighted fields.", "err");
        return;
      }

      const data = {
        name: valueOf("fullname"), email: valueOf("email"), phone: valueOf("phone"),
        city: valueOf("city"), service: valueOf("service"), property: valueOf("property"),
        area: valueOf("areasize"), date: valueOf("visitdate"), slot: valueOf("slot"),
        message: valueOf("message"), at: new Date().toISOString()
      };

      // "Send" — persisted locally, since a static site has no server
      try {
        const all = JSON.parse(localStorage.getItem("aurelia-bookings") || "[]");
        all.push(data);
        localStorage.setItem("aurelia-bookings", JSON.stringify(all));
      } catch (err) {}

      const ref = "AUR-" + String(Date.now()).slice(-6);
      const btn = qs("#submitBtn", form);
      const label = btn.querySelector("span");
      const original = label.textContent;
      label.textContent = "Sending…";
      btn.disabled = true;

      setTimeout(() => {
        label.textContent = original;
        btn.disabled = false;

        const niceDate = new Date(data.date + "T00:00:00").toLocaleDateString("en-GB",
          { weekday: "short", day: "numeric", month: "long", year: "numeric" });

        qs("#recap").innerHTML =
          "<div><span>Reference</span><b>" + ref + "</b></div>" +
          "<div><span>Name</span><b>" + esc(data.name) + "</b></div>" +
          "<div><span>Service</span><b>" + esc(data.service) + "</b></div>" +
          "<div><span>Site visit</span><b>" + esc(niceDate) + "<br>" + esc(data.slot) + "</b></div>" +
          "<div><span>We'll reply to</span><b>" + esc(data.email) + "</b></div>";

        const wa = qs("#recapWa");
        if (wa) {
          wa.href = "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(
            "Hello " + SITE.name + "! I just submitted an enquiry (ref " + ref + ") for " +
            data.service + " at " + data.area + " sq ft in " + data.city + "."
          );
        }
        openModal(qs("#successModal"));
        form.reset();
        qsa(".field", form).forEach(f => f.classList.remove("valid", "invalid"));
        if (cnt) { cnt.textContent = "0 / " + MAXLEN; cnt.classList.remove("warn"); }
        toast("Enquiry sent — reference " + ref, "ok");
      }, 900);
    });
  })();

  /* ---------- 19. NEWSLETTER (footer, every page) ---------- */
  qsa(".newsletter").forEach(form => on(form, "submit", e => {
    e.preventDefault();
    const input = qs("input", form);
    const note  = qs(".news-msg", form.parentElement) || qs(".news-msg", form);
    const val   = input.value.trim();
    if (!RX.email.test(val)) {
      if (note) { note.textContent = "Please enter a valid email address."; note.className = "news-msg bad"; }
      input.focus();
      return;
    }
    if (note) { note.textContent = "Thank you — you're on the list. Look out for our next studio journal."; note.className = "news-msg ok"; }
    toast("Subscribed with " + val, "ok");
    form.reset();
  }));

  /* ---------- 20. COUNTERS ---------- */
  initCounters();

})();
