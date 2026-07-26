/* ============================================================
   AZURITA B · Privada Lanka — script.js
   ============================================================ */

const LANKA = {
  whatsapp: "524444116075",
  defaultMsg: "Hola, me interesa el modelo Azurita B de Privada Lanka."
};

function waLink(msg) {
  return "https://wa.me/" + LANKA.whatsapp + "?text=" + encodeURIComponent(msg || LANKA.defaultMsg);
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* enlaces de WhatsApp con mensaje personalizado */
  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.setAttribute("href", waLink(el.dataset.wa));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
  const waFloat = document.getElementById("waFloat");
  if (waFloat) waFloat.setAttribute("href", waLink());

  /* nav: fondo sólido al hacer scroll */
  const nav = document.getElementById("mainNav");
  const onScroll = () => { if (nav) nav.classList.toggle("is-solid", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* menú móvil */
  const burger = document.getElementById("navBurger");
  if (burger) {
    burger.addEventListener("click", () => document.body.classList.toggle("menu-open"));
    document.querySelectorAll("#navLinks a").forEach((a) =>
      a.addEventListener("click", () => document.body.classList.remove("menu-open"))
    );
  }

  /* animaciones al hacer scroll */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* tabs de plantas */
  const tabs = document.querySelectorAll(".plans__tab");
  const planImgs = document.querySelectorAll("[data-plan-img]");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      const plan = tab.dataset.plan;
      planImgs.forEach((img) => img.classList.toggle("is-active", img.dataset.planImg === plan));
    });
  });

  /* lightbox de galería */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const items = Array.from(document.querySelectorAll(".gallery__item img"));
  let current = 0;

  const openLightbox = (index) => {
    current = index;
    lightboxImg.src = items[current].dataset.full;
    lightboxImg.alt = items[current].alt;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };
  const showDelta = (delta) => {
    current = (current + delta + items.length) % items.length;
    lightboxImg.src = items[current].dataset.full;
    lightboxImg.alt = items[current].alt;
  };

  items.forEach((img, i) => img.addEventListener("click", () => openLightbox(i)));
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", () => showDelta(-1));
  document.getElementById("lightboxNext").addEventListener("click", () => showDelta(1));
  lightbox.addEventListener("click", (ev) => { if (ev.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (ev) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (ev.key === "Escape") closeLightbox();
    if (ev.key === "ArrowLeft") showDelta(-1);
    if (ev.key === "ArrowRight") showDelta(1);
  });
});
