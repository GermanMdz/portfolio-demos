const modal = document.getElementById("demo-modal");
const frame = document.getElementById("demo-frame");
const openButtons = document.querySelectorAll("[data-demo-url]");
const refreshButton = document.getElementById("refresh-demo");
const closeButton = document.getElementById("close-demo");
let activeDemoUrl = "";
let activeOpenButton = null;

function refreshDemo() {
  frame.src = `${activeDemoUrl}?refresh=${Date.now()}`;
  refreshButton.classList.add("is-refreshing");
  window.setTimeout(() => refreshButton.classList.remove("is-refreshing"), 420);
}

function openDemo() {
  frame.src = `${activeDemoUrl}?refresh=${Date.now()}`;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeDemo() {
  modal.hidden = true;
  frame.src = "about:blank";
  document.body.classList.remove("modal-open");
  activeOpenButton?.focus();
}

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeOpenButton = button;
    activeDemoUrl = button.dataset.demoUrl;
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