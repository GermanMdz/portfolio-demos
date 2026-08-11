const modal = document.getElementById("demo-modal");
const frame = document.getElementById("demo-frame");
const openButtons = document.querySelectorAll("[data-demo-url]");
const refreshButton = document.getElementById("refresh-demo");
const closeButton = document.getElementById("close-demo");
const demoStatus = document.getElementById("demo-status");
const demosOrigin = (window.PORTFOLIO_CONFIG?.demosOrigin ?? "").replace(/\/$/, "");
let activeDemoUrl = "";
let activeOpenButton = null;
let availabilityTimer = null;

function getDemoUrl(path) {
  return `${demosOrigin}${path}`;
}

fetch("/demos/warmup").catch(() => {});

function showDemoLoading() {
  demoStatus.hidden = false;
  demoStatus.className = "demo-status loading";
  demoStatus.textContent = "Conectando con la demo...";
}

function showDemoUnavailable() {
  demoStatus.hidden = false;
  demoStatus.className = "demo-status unavailable";
  demoStatus.innerHTML = "<strong>Demo no disponible</strong><span>El contenedor Docker puede estar detenido. Probá levantarlo y refrescar.</span>";
}

function clearDemoStatus() {
  window.clearTimeout(availabilityTimer);
  demoStatus.hidden = true;
}

function refreshDemo() {
  showDemoLoading();
  frame.src = `${activeDemoUrl}?refresh=${Date.now()}`;
  refreshButton.classList.add("is-refreshing");
  window.setTimeout(() => refreshButton.classList.remove("is-refreshing"), 600);
  availabilityTimer = window.setTimeout(showDemoUnavailable, 7000);
}

function openDemo() {
  refreshDemo();
  modal.hidden = false;
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeDemo() {
  clearDemoStatus();
  modal.hidden = true;
  frame.src = "about:blank";
  document.body.classList.remove("modal-open");
  activeOpenButton?.focus();
}

frame.addEventListener("load", () => {
  clearDemoStatus();
});

frame.addEventListener("error", () => {
  window.clearTimeout(availabilityTimer);
  showDemoUnavailable();
});

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeOpenButton = button;
    activeDemoUrl = getDemoUrl(button.dataset.demoUrl);
    document.getElementById("modal-title").textContent = button.dataset.demoTitle;
    openDemo();
  });
});

refreshButton.addEventListener("click", refreshDemo);
closeButton.addEventListener("click", closeDemo);
modal.querySelector("[data-close-modal]").addEventListener("click", closeDemo);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeDemo();
});

/* ---- Subtle reveal-on-scroll for major sections ---- */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll("[data-reveal]");

if (!prefersReducedMotion && "IntersectionObserver" in window && revealTargets.length) {
  revealTargets.forEach((el) => el.classList.add("reveal-ready"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));
}