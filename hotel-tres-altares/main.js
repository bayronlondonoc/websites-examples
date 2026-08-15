/* Hotel Tres Altares — runtime.
   IIFE clásica, sin import/export. Funciona en file:// y en cualquier hosting. */
(function () {
  "use strict";

  const data = window.__BRAND__ || {};

  const $  = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const escHTML = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* ---------- 1. Splash ------------------------------------- */
  function initSplash() {
    const splash = $("[data-splash]");
    if (!splash) return;
    const hide = () => splash.classList.add("is-out");
    if (document.readyState === "complete") setTimeout(hide, 520);
    else window.addEventListener("load", () => setTimeout(hide, 380));
    setTimeout(hide, 3600);
  }

  /* ---------- 2. Nav ---------------------------------------- */
  function initNav() {
    const nav = $(".nav");
    if (!nav) return;

    const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $(".nav-toggle");
    const mobile = $(".nav-mobile");
    if (toggle && mobile) {
      toggle.addEventListener("click", () => {
        document.body.classList.toggle("is-menu-open");
        const open = document.body.classList.contains("is-menu-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        mobile.setAttribute("aria-hidden", open ? "false" : "true");
      });
      $$("a", mobile).forEach(a => a.addEventListener("click", () => {
        document.body.classList.remove("is-menu-open");
        toggle.setAttribute("aria-expanded", "false");
        mobile.setAttribute("aria-hidden", "true");
      }));
    }

    const path = location.pathname.split("/").pop() || "index.html";
    $$(".nav-link, .nav-mobile-link").forEach(a => {
      const href = (a.getAttribute("href") || "").split("/").pop().split("#")[0];
      if (href && href === path) a.classList.add("is-active");
    });
  }

  /* ---------- 3. Reveal on scroll --------------------------- */
  function initReveals() {
    const els = $$("[data-reveal]");
    if (!els.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("is-revealed"); io.unobserve(e.target); }
      });
    }, { threshold: 0.03, rootMargin: "0px 0px -3% 0px" });
    els.forEach(el => io.observe(el));

    setTimeout(() => {
      $$("[data-reveal]:not(.is-revealed)").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight + 200) el.classList.add("is-revealed");
      });
    }, 6000);
  }

  /* ---------- 4. Smooth anchors ----------------------------- */
  function initSmoothAnchors() {
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({
        top: el.getBoundingClientRect().top + scrollY - 86,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ---------- 5. Hero parallax ------------------------------ */
  function initHeroParallax() {
    if (!window.gsap || !window.ScrollTrigger) return;
    const hero = $(".hero");
    if (!hero) return;
    const bg = $(".hero-bg", hero);
    const content = $(".hero-content", hero);
    if (bg) {
      gsap.to(bg, {
        yPercent: 16, ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
      });
    }
    if (content) {
      gsap.to(content, {
        yPercent: -26, opacity: 0.08, ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
      });
    }
  }

  /* ---------- 6. Marquee ------------------------------------ */
  function initMarquee() {
    $$("[data-marquee]").forEach(track => {
      if (track.dataset.marqueeBound) return;

      if (!track.children.length && data.keywords) {
        track.innerHTML = data.keywords
          .map(k => `<span>${escHTML(k)}</span><span class="dot">◆</span>`).join("");
      }
      if (!track.children.length) return;

      track.dataset.marqueeBound = "1";
      const clone = track.cloneNode(true);
      clone.removeAttribute("data-marquee");
      clone.setAttribute("aria-hidden", "true");
      track.parentNode.appendChild(clone);

      if (window.gsap) {
        const distance = track.scrollWidth;
        if (!distance) return;
        gsap.to([track, clone], {
          x: -distance, duration: distance / 58, ease: "none", repeat: -1,
          modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % distance) }
        });
      }
    });
  }

  /* ---------- 7. Carousel ----------------------------------- */
  function initCarousels() {
    $$("[data-carousel]").forEach(carousel => {
      if (carousel.dataset.carouselBound) return;
      carousel.dataset.carouselBound = "1";
      const track = $(".carousel-track", carousel);
      const prev  = $(".carousel-prev", carousel);
      const next  = $(".carousel-next", carousel);
      const dotsHost = $(".carousel-dots", carousel);
      if (!track) return;
      const slides = $$(".carousel-slide", track);
      if (!slides.length) return;

      if (dotsHost) {
        dotsHost.innerHTML = slides.map((_, i) =>
          `<button class="carousel-dot${i === 0 ? " is-active" : ""}" aria-label="Ir a la imagen ${i + 1}"></button>`
        ).join("");
      }
      const dots = $$(".carousel-dot", carousel);
      let idx = 0;

      function goTo(t) {
        idx = Math.max(0, Math.min(slides.length - 1, t));
        track.style.transform = `translate3d(${-idx * 100}%,0,0)`;
        dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
        if (prev) prev.disabled = idx <= 0;
        if (next) next.disabled = idx >= slides.length - 1;
      }
      prev && prev.addEventListener("click", () => goTo(idx - 1));
      next && next.addEventListener("click", () => goTo(idx + 1));
      dots.forEach((d, i) => d.addEventListener("click", () => goTo(i)));

      let startX = null;
      track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
      track.addEventListener("touchend", e => {
        if (startX == null) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) goTo(dx > 0 ? idx - 1 : idx + 1);
        startX = null;
      }, { passive: true });

      carousel.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(idx - 1); }
        if (e.key === "ArrowRight") { e.preventDefault(); goTo(idx + 1); }
      });
      goTo(0);
    });
  }

  /* ---------- 8. Lightbox ----------------------------------- */
  function initLightbox() {
    const triggers = $$("[data-lightbox] img");
    if (!triggers.length) return;

    const groups = new Map();
    triggers.forEach(img => {
      const parent = img.closest("[data-lightbox]");
      const key = parent ? (parent.getAttribute("data-lightbox") || "default") : "single";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(img);
    });

    let lb = $(".lightbox");
    if (!lb) {
      lb = document.createElement("div");
      lb.className = "lightbox";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-modal", "true");
      lb.setAttribute("aria-hidden", "true");
      lb.innerHTML =
        '<button class="lightbox-close" aria-label="Cerrar">✕</button>' +
        '<button class="lightbox-prev" aria-label="Anterior">‹</button>' +
        '<button class="lightbox-next" aria-label="Siguiente">›</button>' +
        '<img class="lightbox-img" alt="" />' +
        '<div class="lightbox-counter"></div>';
      document.body.appendChild(lb);
    }
    const lbImg = $(".lightbox-img", lb);
    const lbCount = $(".lightbox-counter", lb);
    let group = null, i = 0;

    function show(idx) {
      i = (idx + group.length) % group.length;
      const img = group[i];
      lbImg.src = img.getAttribute("src");
      lbImg.alt = img.getAttribute("alt") || "";
      lbCount.textContent = `${i + 1} / ${group.length}`;
    }
    function open(g, idx) {
      group = g; show(idx);
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    triggers.forEach(img => img.addEventListener("click", () => {
      const parent = img.closest("[data-lightbox]");
      const key = parent ? (parent.getAttribute("data-lightbox") || "default") : "single";
      const g = groups.get(key);
      open(g, g.indexOf(img));
    }));
    $(".lightbox-close", lb).addEventListener("click", close);
    $(".lightbox-prev", lb).addEventListener("click", () => show(i - 1));
    $(".lightbox-next", lb).addEventListener("click", () => show(i + 1));
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", e => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(i - 1);
      if (e.key === "ArrowRight") show(i + 1);
    });
  }

  /* ---------- 9. Mounts desde el manifest ------------------- */
  function mountAmenities() {
    const host = $("[data-amenities]");
    if (!host || host.children.length || !data.amenities) return;
    host.innerHTML = data.amenities.map(a => `
      <div class="amenity">
        <svg class="amenity-mark" viewBox="0 0 60 40" aria-hidden="true"><use href="#arch-3"/></svg>
        <p class="amenity-t">${escHTML(a.t)}</p>
        <p class="amenity-d">${escHTML(a.d)}</p>
      </div>`).join("");
  }

  function mountEntorno() {
    const host = $("[data-entorno]");
    if (!host || host.children.length || !data.entorno) return;
    host.innerHTML = data.entorno.map(e => `
      <div class="entorno-card">
        <p class="entorno-mode">${escHTML(e.mode)}</p>
        <p class="entorno-place">${escHTML(e.place)}</p>
        <p class="entorno-note">${escHTML(e.note)}</p>
      </div>`).join("");
  }

  function mountFaqs() {
    const host = $("[data-faqs]");
    if (!host || host.children.length || !data.faqs) return;
    host.innerHTML = data.faqs.map(f => `
      <details class="faq-item">
        <summary class="faq-q">${escHTML(f.q)}</summary>
        <p class="faq-a">${escHTML(f.a)}</p>
      </details>`).join("");
  }

  function mountTours() {
    const host = $("[data-tours]");
    if (!host || host.children.length || !data.tours) return;
    host.innerHTML = data.tours.map((t, n) => {
      const media = t.img
        ? `<div class="card-figure"><span class="card-num">${escHTML(t.num)}</span>
             <img src="${escHTML(t.img)}" alt="${escHTML(t.alt)}" loading="lazy" decoding="async" /></div>`
        : `<div class="card-figure arch-ph"><span class="card-num">${escHTML(t.num)}</span>
             <svg class="arch-ph-mark" viewBox="0 0 60 40" aria-hidden="true"><use href="#arch-3"/></svg>
             <span class="arch-ph-label">Foto pendiente</span></div>`;
      return `<article class="card" data-reveal data-delay="${n % 3}">
          ${media}
          <div class="card-body">
            <h3 class="h-card">${escHTML(t.name)}</h3>
            <p class="card-tagline">${escHTML(t.tagline)}</p>
            <p class="card-text">${escHTML(t.text)}</p>
          </div>
        </article>`;
    }).join("");
  }

  /* ---------- 10. Datos de contacto ------------------------- */
  function mountContact() {
    $$("[data-address]").forEach(el => { el.textContent = data.address || ""; });
    $$("[data-address-short]").forEach(el => { el.textContent = data.addressShort || ""; });
    $$("[data-phone]").forEach(el => {
      el.textContent = data.phoneDisplay || "";
      if (el.tagName === "A" && data.whatsapp) el.href = "tel:+" + data.whatsapp.number;
    });
    $$("[data-email]").forEach(el => {
      el.textContent = data.email || "";
      if (el.tagName === "A") el.href = "mailto:" + data.email;
    });
    $$("[data-ig-link]").forEach(el => {
      if (!data.instagram) return;
      el.href = data.instagram; el.target = "_blank"; el.rel = "noopener";
    });
    $$("[data-map-link]").forEach(el => {
      if (!data.maps) return;
      el.href = data.maps; el.target = "_blank"; el.rel = "noopener";
    });
    $$("[data-booking-link]").forEach(el => {
      if (!data.booking) return;
      el.href = data.booking; el.target = "_blank"; el.rel = "noopener";
    });
    $$("[data-wa-link]").forEach(a => {
      if (!data.whatsapp || !data.whatsapp.link) return;
      const msg = a.dataset.waMessage || "Hola Tres Altares, me gustaría reservar.";
      a.href = `${data.whatsapp.link}&text=${encodeURIComponent(msg)}`;
      a.target = "_blank"; a.rel = "noopener";
    });
    $$("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- 11. Formulario demo --------------------------- */
  function initForms() {
    $$("[data-demo-form]").forEach(form => {
      form.addEventListener("submit", e => {
        e.preventDefault();
        if (!form.reportValidity()) return;
        const note = $(".form-note", form.parentNode) || $(".form-note", form);
        if (note) {
          note.textContent = "Este formulario es de demostración: no envía nada todavía. En la versión final llega al correo del hotel.";
          note.style.color = "var(--clay)";
        }
      });
    });
  }

  /* ---------- Boot ------------------------------------------ */
  function boot() {
    safe(mountAmenities, "mountAmenities");
    safe(mountEntorno,   "mountEntorno");
    safe(mountFaqs,      "mountFaqs");
    safe(mountTours,     "mountTours");
    safe(mountContact,   "mountContact");

    safe(initSplash,        "initSplash");
    safe(initNav,           "initNav");
    safe(initReveals,       "initReveals");
    safe(initSmoothAnchors, "initSmoothAnchors");
    safe(initCarousels,     "initCarousels");
    safe(initLightbox,      "initLightbox");
    safe(initForms,         "initForms");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
      safe(initHeroParallax, "initHeroParallax");
    }
    safe(initMarquee, "initMarquee");

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
