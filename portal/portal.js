const modal = document.getElementById("demo-modal");
const frame = document.getElementById("demo-frame");
const openButton = document.getElementById("open-demo");
const refreshButton = document.getElementById("refresh-demo");
const closeButton = document.getElementById("close-demo");
const demoUrl = "/demos/inscripcion-ferias/";

function refreshDemo() {
  frame.src = `${demoUrl}?refresh=${Date.now()}`;
  refreshButton.classList.add("is-refreshing");
  window.setTimeout(() => refreshButton.classList.remove("is-refreshing"), 420);
}

function openDemo() {
  frame.src = `${demoUrl}?refresh=${Date.now()}`;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeDemo() {
  modal.hidden = true;
  frame.src = "about:blank";
  document.body.classList.remove("modal-open");
  openButton.focus();
}

openButton.addEventListener("click", openDemo);
refreshButton.addEventListener("click", refreshDemo);
closeButton.addEventListener("click", closeDemo);
modal.querySelector("[data-close-modal]").addEventListener("click", closeDemo);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeDemo();
});